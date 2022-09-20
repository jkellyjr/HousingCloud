"use strict";

const APP = {
    PORT: process.env.PORT,
    ENV: process.env.NODE_ENV
}

const DB = {
    HOST: process.env.MYSQL_HOST,
    USER: process.env.MYSQL_USER,
    PASSWORD: process.env.MYSQL_PASSWORD,
    NAME: process.env.MYSQL_DB_NAME,
    DIALECT: "mysql",
    MAX_STARTUP_CONNECTION_RETRIES: 25
}

module.exports = {
    APP,
    DB
}