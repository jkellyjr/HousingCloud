"use strict";

const db = require("../models");

let service = {};

service.createTicketComment = async (data) => {
    console.log("src/services/ticket-comment/createTicketComment");

    const [instance, created] = await db.TicketComment.upsert(data).catch((e) => { throw e.message; });
    
    return created ? instance : undefined;
};



module.exports = service;