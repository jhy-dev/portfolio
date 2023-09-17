var express = require('express');
var router = express.Router();
var Promise = require("bluebird");
var getSqlConnection = require('./../services/databaseConnection');
var sentimentLogic=require('./../services/SentimentLogic');

//fetch result of previous search from db and send it to the front-end
router.get('/:searchedkeyword', function(req, res)
{
    var searchKeyword=req.params.searchedkeyword;
    Promise.using(getSqlConnection(), function(connection) {
        connection.query('SELECT * FROM tweets where searchkeyword=? and score!=0 order by created_at desc limit 500', [searchKeyword]).then(function (updatedTweets) {
            connection.query('SELECT * FROM history where searchkeyword=? limit 1', [searchKeyword]).then(function (updatedHistory) {
                if (typeof(updatedTweets) !== 'undefined' && typeof(updatedHistory) !== 'undefined') {
                    sentimentLogic.sentimentForEveryWord(updatedTweets).then(function (TweetData) {
                        const params={
                            tweetcomponents: updatedTweets,
                            analysis: updatedHistory,
                            everyword: TweetData,
                            searchkeyword: searchKeyword
                        };
                        res.render('pastsearch', {tweets_JSON:JSON.stringify(params)});
                    });
                }
            });
        });
    });




});




module.exports = router;
