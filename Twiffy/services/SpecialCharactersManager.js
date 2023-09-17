

module.exports={


        reformatSearchTerm : function(searchKeyword) {
        if (searchKeyword.substring(0, 1) === "#") {
            searchKeyword = searchKeyword.replace('#', '')
        }
        else if (searchKeyword.substring(0, 1) === "@") {
            searchKeyword = searchKeyword.replace('@', '')
        }
        else {
            searchKeyword.replace(/[^\w\s]/gi, '');
        }
        return searchKeyword;
        },




        reformatTweetTexts: function(getTweet)
        {
            var extract_tweet="";
            //replace white space
            getTweet=getTweet.replace(/\s/g, " ");
            var tweet_text=getTweet.split(' ');
            if(tweet_text[0]==="RT") tweet_text.splice(0, 1);
            tweet_text.map(word => {
                var tempword=null;
                //remove all the special characters if they are not # and @
                if(word.substring(0, 1) ==="#" || word.substring(0, 1) ==="@")
                {
                    tempword=word;
                }else
                {
                    word=word.replace(/[^\w\s]/gi, '');
                }
                //if there are hyperlinks, do not include them
                word = (word.substring(0, 4) === 'http' || word.substring(0, 5) === 'https'
                    || word.substring(0, 3) === 'www'
                    ) ? "" : word;
                //extract texts out of each word
                (tempword===null)?extract_tweet+=word+" ":extract_tweet+=(tempword)+" ";
            });
            return extract_tweet;
        }


};