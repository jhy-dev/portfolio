//======================================================================================================================SETTINGS
var express = require('express');
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var analysisRouter = require('./routes/pastsearches');
var pastRouter = require('./routes/pastsearch');
var sentiment = require('node-sentiment');
var Promise = require("bluebird");

const port = 3000;
var app = express();
var http = require('http'),
    server = http.createServer(app),
    io = require('socket.io').listen(server);
server.listen(port, function () {
    console.log('http://localhost:%s',port);
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/pastsearches', analysisRouter);
app.use('/pastsearch', pastRouter);
//======================================================================================================================SETTINGS

//customized services
var getSqlConnection = require('./services/databaseConnection');
var specialCharacters=require('./services/SpecialCharactersManager');
var databaseHandler=require('./services/DatabaseLogic');
var socketHandler=require('./services/SocketManager');
var client = require('./services/TwitterClient');
var MultipleClients=[];




Promise.using(getSqlConnection(), function(connection) {

    //==================================================================Manage all the sockets
    io.on('connection', (socket) => {

        console.log('Socket Connection with Socket id: ', socket.id);

        //==================================================================each socket
        socket.on('searchTerm', function (searchKeyword) {

            //reform search keyword to make it easier to handle

            searchKeyword = specialCharacters.reformatSearchTerm(searchKeyword);

            //create an object array to contain information about each socket
            const clientElements= {
                socketId: socket.id,
                searchTerm: searchKeyword,
            };
            MultipleClients.push(clientElements);
            //if there are multiple keywords, delete them
            MultipleClients=socketHandler.allowOnlyOneKeyword(MultipleClients, socket, searchKeyword);
            let currentTimestamp = Date.now();
            let limitSpeed = 50;
                    client.stream('statuses/filter', {track: searchKeyword, language:'en'}, function(stream) {
                        stream.on('error', function(err) {
                            console.log("Twitter API Limit Exceeded: "+err);
                        });
                        stream.on('data', function(tweet) {

                            //find the current socket
                            var currentSocket=socketHandler.getCurrentSocket(MultipleClients, socket, searchKeyword);
                            //find the latest socket
                            var latestSocket=socketHandler.getLatestSocket(MultipleClients, socket);

                            //if the current socket is not searching the latest search keyword or tweet is not valid, then disconnect
                            if(currentSocket !== latestSocket || typeof (tweet) === 'undefined')
                            {
                                stream.destroy();
                            }
                            //if certain time is passed
                            else if(tweet.timestamp_ms - currentTimestamp > limitSpeed){

                                    //console.log(searchKeyword);
                                    //reset the time
                                    currentTimestamp = Date.now();
                                    //remove all the special characters except for # and @
                                    var extract_tweet=specialCharacters.reformatTweetTexts(tweet.text);
                                    connection.query('SELECT count(*) as counter FROM tweets where searchkeyword=? and text=?',[searchKeyword, extract_tweet]).then(function(hateDuplicatedTexts)
                                    {
                                        //if there is no duplicated tweet text, insert or update database
                                        if( parseInt(hateDuplicatedTexts[0].counter)<= 0)
                                        {
                                            //check if any other socket is searching the same keyword
                                            var MinimumNoDuplication=socketHandler.samekeywordDifferentSockets(MultipleClients, searchKeyword);

                                            //only one socket can push data to database
                                            if(MultipleClients[MinimumNoDuplication].socketId === socket.id)
                                            {
                                                var sentimentResult = sentiment(extract_tweet);
                                                var getScore= parseFloat(sentimentResult.score);
                                                //==================================================================================after inserting
                                                const params = {
                                                    username: tweet.user.screen_name,
                                                    profileimage: tweet.user.profile_image_url,
                                                    text: extract_tweet,
                                                    created_at: new Date(Date.now()),
                                                    score: getScore,
                                                    searchkeyword: searchKeyword
                                                };
                                                //update only when sentiment score is either positive or negative
                                                if(getScore !== 0)
                                                {
                                                    //insert tweet into database
                                                    connection.query('INSERT INTO tweets set ?', [params]).then(function(result){
                                                        //if tweet is successfully inserted, history can be updated
                                                        if(parseInt(result.affectedRows) === 1)
                                                        {
                                                            //check if there is any existing history then choose to insert or update
                                                            connection.query('SELECT * FROM history where searchkeyword=? limit 1',searchKeyword).then(function(getHistory) {
                                                                databaseHandler.InsertOrUpdateHistory(getHistory, getScore, searchKeyword, connection);
                                                            });
                                                        }
                                                    }).then(function () {
                                                        //send to database once database is updated
                                                        databaseHandler.sendToBrowser(connection, searchKeyword, client, socket);
                                                    });
                                                }
                                            }
                                            //the other sockets cannot push data to database
                                            else if(MultipleClients[MinimumNoDuplication].socketId !== socket.id)
                                            {
                                                databaseHandler.sendToBrowser(connection, searchKeyword, client, socket);
                                            }
                                        }//no duplicate
                                    });
                            }//allow tweet streaming

                        });//stream
                        //========================================================================Disconnected
                        socket.on('disconnect', function() {
                            console.log("socket id: "+socket.id+" disconnected");
                            MultipleClients=socketHandler.removeSocketClients(stream, socket, MultipleClients);
                            console.log('Disconnected');
                        });//disconnect
                    });//client

        });//searchTerm Socket
    });//Main Socket
}).catch(function(err) {
    console.log("SQL Database Error:"+err);
});

app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
