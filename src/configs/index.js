"use strict";

const APP = {
    PORT: process.env.PORT,
    ENV: process.env.NODE_ENV
}

const DB = {
    host: process.env.MYSQL_HOST,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB_NAME,
    dialect: "mysql",
    max_startup_connection_retries: 25,
    logging: false
}

module.exports = {
    APP,
    DB
}