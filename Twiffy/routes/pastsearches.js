var express = require('express');
var router = express.Router();
var Promise = require("bluebird");
var getSqlConnection = require('./../services/databaseConnection');


//returns a page (table of previous searches)
router.get('/', function(req, res)
{

    Promise.using(getSqlConnection(), function(connection) {
        connection.query('SELECT * FROM history order by created_at desc').then(function(getHistory) {
            res.render('pastsearches', {pasthistory:JSON.stringify(getHistory)});
        })
    });


});





module.exports = router;
