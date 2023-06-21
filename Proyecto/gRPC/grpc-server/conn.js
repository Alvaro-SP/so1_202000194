// here we do the connection to the database
var mysql = require("mysql2");
require('dotenv').config()
var mysqlClient = mysql.createConnection({
    // host: "127.0.0.1",
    host: process.env.MYSQL_HOST,
    // host: "172.17.0.2",
    user: "sopesuser",
    password: "password",
    database: "dbproy1sopes",
    port: 3306,
});
mysqlClient.connect(function (error) {
    if (error) {
        console.log("ERORR CONECTANDOSE A LA BASE DE DATOS: ", error)
    } else {
        console.log("Connected to mysql");
    }
});
module.exports = mysqlClient;