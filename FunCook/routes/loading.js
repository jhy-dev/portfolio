var express = require('express');
var router = express.Router();



/* GET loading page */
router.get('/:foodlink', function(req, res, next) {



    //get the food ai link from the parameter
    var foodailink=decodeURIComponent(req.params.foodlink);
    //pass food ai link to loading.ejs and display the page
    res.render('loading', { getfoodlink: foodailink });
    //no need for res.end() as res.render() automatically ends






});
module.exports = router;
