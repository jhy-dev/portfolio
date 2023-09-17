var sentimentLogic=require('./../services/SentimentLogic');

module.exports={
    //history table
    InsertOrUpdateHistory : function (getHistory, getScore, searchKeyword, connection) {
        var numofHistory = getHistory.length;
        //if there is no history, insert
        if (numofHistory <= 0) {
            const params = sentimentLogic.sentimentForHistory(getScore, searchKeyword, 0, 0, 0, 0);
            connection.query('INSERT INTO history set ?', params);
        }
        //if there is any history, update
        else {
            const params = sentimentLogic.sentimentForHistory(getScore, searchKeyword, getHistory[0].positive,
                getHistory[0].negative, getHistory[0].total, getHistory[0].totalscore);
            connection.query('update history set ? where searchkeyword=?', [params, searchKeyword]);
        }
    },

    sendToBrowser : function(connection, searchKeyword, client, socket) {

        //fetch data from tweets and history
        return connection.query('SELECT * FROM tweets where searchkeyword=? and score!=0 order by created_at desc limit 500', searchKeyword).then(function (updatedTweets) {
            connection.query('SELECT * FROM history where searchkeyword=? limit 1', searchKeyword).then(function (updatedHistory) {

                //if tweet is valid, analyze sentiment score for each word of texts, then use socket to send the data
                if (typeof(updatedTweets) !== 'undefined' && typeof(updatedHistory) !== 'undefined') {
                    sentimentLogic.sentimentForEveryWord(updatedTweets).then(function (TweetData) {
                        socket.emit('getTweet', {
                            tweetcomponents: updatedTweets,
                            analysis: updatedHistory,
                            everyword: TweetData,
                            searchkeyword: searchKeyword
                        });
                    });
                }


            });
        });
    }
};