const mysql = require("mysql2");
require('dotenv').config()
const dbConfig = {
    host: `${process.env.MYSQL_HOST}`,
    user: "sopesuser",
    password: "password",
    database: "dbproy1sopes",
};

const mysqlClient = mysql.createConnection(dbConfig);

module.exports = mysqlClient;
