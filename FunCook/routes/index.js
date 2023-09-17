var express = require('express');
var router = express.Router();
var request=require('request');

/* parse flickr json data */
function parsePhotoRsp(rsp) {

    var flickrArray = [];

    for (let i = 0; i < rsp.photos.photo.length; i++) {
        var photo = rsp.photos.photo[i];

        //parsing flickr json data to image url
        var flickrLink =
            `http://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_c.jpg`;
        //parsing flickr json data to image url and then enter it as the parameter of food AI url
        var foodaiLink =
            `http://api.foodai.org/v1/classify?image_url=https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_c.jpg&qid=1&num_tag=10&api_key=06089a35d05273920e26a9240a94ec7823d57e04`;

        //this object will be pushed into an array and go to front-end side to display food images embedded with food ai link on the index.ejs
        var flickrElements = {
                'foodai' : "/loading/"+encodeURIComponent(foodaiLink),
                'image_src' : flickrLink
        };
        flickrArray.push(flickrElements);

    }

    return flickrArray;
}
/* GET home page */
router.get('/', function(req, res, next) {

    //get request for flickr photos
    request({
        method: "GET",
        url: "https://api.flickr.com/services/rest/?",
        qs:{
            "method":"flickr.groups.pools.getPhotos",
            "api_key":"c0d6b039f49eeb748bcb756e71cc8551",
            "group_id":"49325528@N00",
            "per_page":"500",
            "format":"json",
            "nojsoncallback":"1"
        }
    }, (error, response, body) => {

        //if exceeding the limit of api calls or there is no internet connection, an error occurs and the response is not normal
        if (error || response.statusCode != 200) {
            res.statusCode(500);
            res.end("FLICKR API ERROR");
        }

        //pass the flickr image url and food ai link to index.ejs (homepage) and display the page
        res.render('index', { flickrphotos: JSON.stringify(parsePhotoRsp(JSON.parse(body))) });
        //no need for res.end() as res.render() automatically ends
    });





});

module.exports = router;
