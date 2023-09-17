var mysql = require('promise-mysql');

/*
var pool = mysql.createPool({
    connectionLimit : 1000,
    connectTimeout  : 60 * 60 * 1000,
    acquireTimeout   : 60 * 60 * 1000,
    timeout         : 60 * 60 * 1000,
    host: "cloudcomputingassignment.mysql.database.azure.com",
    user: "Joshua@cloudcomputingassignment",
    password: "cab432@@",
    database: "twiffy",
    ssl:true,
    port: '3306'
});
*/




/*
var pool = mysql.createPool({
    connectionLimit : 1000,
    connectTimeout  : 60 * 60 * 1000,
    acquireTimeout   : 60 * 60 * 1000,
    timeout         : 60 * 60 * 1000,
    host: "localhost",
    user: "root",
    password: "0713",
    database: "twiffy",
    port: '3306'
});
*/

//create mysql pool connection
var pool = mysql.createPool({
    connectionLimit : 1000,
    connectTimeout  : 60 * 60 * 1000,
    acquireTimeout   : 60 * 60 * 1000,
    timeout         : 60 * 60 * 1000,
    host: "cab432twiffy1.c2cf0iwydoch.us-west-2.rds.amazonaws.com",
    user: "CAB432",
    password: "cab432123",
    database: "twiffy",
    port: '3306'
});

//get connection and send it to make it available for other classes
function getSqlConnection() {
    return pool.getConnection().disposer(function(connection) {
        pool.releaseConnection(connection);
    });
}

module.exports = getSqlConnection;