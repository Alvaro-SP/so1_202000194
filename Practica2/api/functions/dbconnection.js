
const mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "myuser",
    password: "24122001.",
    database: "practica2sopes1",
    port: "3306"
});

module.exports = { con };
