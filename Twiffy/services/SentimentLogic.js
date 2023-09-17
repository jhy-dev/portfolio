var specialCharacters=require('./../services/SpecialCharactersManager');
var sentiment = require('node-sentiment');


module.exports={
    //analyze sentiment score for overall history
    sentimentForHistory : function (scoreOfcurrentTweet, searchKeyword, newpositive, newnegative, newtotal, newtotalscore) {
    var getpos = parseFloat(newpositive);
    var getneg = parseFloat(newnegative);
    var gettotal = parseFloat(newtotal);
    var gettotalscore = parseFloat(newtotalscore);
    if (scoreOfcurrentTweet > 0) {
        getpos++;
    }
    else{
        getneg++;
    }
    gettotal++;
    gettotalscore+=scoreOfcurrentTweet;
    var getaveragescore=(gettotalscore/gettotal);

    const params = {
        total: gettotal,
        positive: getpos,
        negative: getneg,
        averagescore: getaveragescore,
        totalscore: gettotalscore,
        created_at: new Date(Date.now()),
        searchkeyword: searchKeyword
    };
    return params;
    },
    //analyze sentiment score for each word
    sentimentForEveryWord : function (updatedTweets) {
        return new Promise( function( resolve)
        {
            var eachwordScore=[];
            for(let i = 0; i < updatedTweets.length; i++) {
                var getsingleTweet=updatedTweets[i].text;
                getsingleTweet.split(" ").map(word => {
                    word=word.replace(/^[-\d\s]*/,"");
                    word=specialCharacters.reformatSearchTerm(word);
                    var sentimentScore=sentiment(word);
                    const params={
                        score: sentimentScore.score,
                        text: word
                    };
                    eachwordScore.push(params);

                });
            }
            return resolve(eachwordScore);
            });
        }
};