
const mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "2412",
    database: "practica2sopes",
    port: "3306"
});

module.exports = { con };
