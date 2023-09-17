var express = require('express');
var router = express.Router();
var Promise = require("bluebird");
var client = require('.././services/TwitterClient');


//returns homepage
router.get('/', function(req, res)
{
    getTrends(client).then(function (risingtrends) {
        res.render('index', {aussieTrends:JSON.stringify(risingtrends[0].trends)});
    });
});





//get trends of Australia
function getTrends (client) {
    return new Promise( function( resolve, reject )
    {
        //Australia Location
        const params = { id: '23424748' };
        client.get('trends/place', params, function(error, trends){
            if (!error) {
                return resolve(trends);
            }
            else{
                return reject(error);
            }
        })
    })
}


module.exports = router;
