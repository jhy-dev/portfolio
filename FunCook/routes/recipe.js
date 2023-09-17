var express = require('express');
var router = express.Router();
var request=require('request');

/* parse edamam json data */
function parseRecipeResults(recipeResults)
{
    var recipeArray=[];

    for(let i=0;i<recipeResults.length;i++)
    {

        //this object will be pushed into an array and go to front-end side to display recipes on the recipes.ejs
        var recipeElements = {
            'title' : recipeResults[i].recipe.label,
            'image' : recipeResults[i].recipe.image,
            'recipe' : recipeResults[i].recipe.url,
            'calories' : recipeResults[i].recipe.calories,
            'time' : recipeResults[i].recipe.totalTime,
            'ingredients' : recipeResults[i].recipe.ingredientLines.length
        };


        recipeArray.push(recipeElements);
    }


    return recipeArray;
}


/* GET recipe page */
router.get('/:foodname', function(req, res, next) {

    //get food name from the parameter
    var AnticipatedFood=req.params.foodname;

    //get request for edamam recipe search api
    var options = {
    method: 'GET',
    url: 'https://api.edamam.com/search',
    qs:
        {
            "q":AnticipatedFood,
            "app_id":"82a6a6b7",
            "to":"100",
            "app_key":"c0a4d41293e61a9079155ea846efc49c"
        }
};
request(options, function (error, response, body) {

    //if exceeding the limit of api calls or there is no internet connection, an error occurs and the response is not normal
    if (error || response.statusCode != 200) {
        res.statusCode(500);
        res.end("EDAMAM API ERROR");
    }

    //pass the recipes (including number of ingredients, cooking time and calories) and food name to recipe.ejs and display the page
    res.render('recipe', { recipeResults: JSON.stringify(parseRecipeResults(JSON.parse(body).hits)), getfoodname: AnticipatedFood });
    //no need for res.end() as res.render() automatically ends
});












});
module.exports = router;
