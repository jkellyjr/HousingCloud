"use strict";

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Welcome to HousingCloud");
});

const db = require("../models");

router.get("/ping", async (req, res) => {
    
    const r = await db.Ticket.findAll({
        include: db.TicketComment,
            
        order: [
                [db.TicketComment, "createdAt", "ASC"]
            ]

    });

    console.log(`\n${JSON.stringify(r)}\n`);


    res.statusCode = 200;
    res.send({ok: "true"});
});

module.exports = router;
