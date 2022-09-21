"use strict";

const db = require("../models");
const apiMessages = require("../data/api-strings");

async function userAuthorization (req, res, next) {
    let validToken = false;

    if (req.headers.authorization) {
        const reqToken = req.headers.authorization.replace("Bearer ", "");

        const authRecord = await db.Authorization.findByPk(reqToken, {
            include: db.User
        });
 
        if (authRecord && authRecord.User && new Date() < authRecord.dataValues.sessionExpiration) {
            req.user = authRecord.User.dataValues
            validToken = true;
        }
    }

    if (validToken) {
        await next();
    }
    else {
        res.statusCode = apiMessages.INVALID_AUTH.STATUS_CODE
        res.send(apiMessages.INVALID_AUTH.PAYLOAD);
    }
}

module.exports = {
    userAuthorization
}