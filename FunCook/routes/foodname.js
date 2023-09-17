var express = require('express');
var router = express.Router();
var request=require('request');



/* GET foodname page */
router.get('/:foodlink', function(req, res, next) {



    //get food ai link from the parameter
    var foodailink=decodeURIComponent(req.params.foodlink);

    //get request for food ai image recognition
    var foodResults;
    var AnticipatedFood="";
    var options = {
        method: 'GET',
        url: foodailink
    };
    request(options, function (error, response, body) {

        //if exceeding the limit of api calls or there is no internet connection, an error occurs and the response is not normal
        if (error || response.statusCode != 200) {
            res.statusCode(500);
            res.end("FOOD AI API ERROR");
        }

        foodResults = JSON.parse(body);

        //sometimes food AI api returns Unknown as the most anticipated food name (first element of returned results)
        if (foodResults.food_results[0][0].toUpperCase() == "UNKNOWN") {
            //if the most anticipated food name is unknown, get the second most anticipated food name
            AnticipatedFood = foodResults.food_results[1][0];
        }
        else {
            AnticipatedFood = foodResults.food_results[0][0];
        }

        //redirect to the recipe.ejs passing the food name as the parameter
        res.redirect("/recipe/"+AnticipatedFood);
        res.end();

    });





});
module.exports = router;
