//https://github.com/mysqljs/mysql#running-tests
const mysql = require('mysql');

/**
 * Connection to the database
 */
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT,
});

pool.getConnection((err, connection) => {
    if (err) {
        console.log("Something went wrong connecting to the database ...");
    }
    if (connection) {
        connection.release();
    }
    return;
});

module.exports = pool;