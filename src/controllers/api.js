"use strict";

const express = require("express");
const auth = require("../services/authorization");
// const db = require("../models");
const ticketController = require("../controllers/api/ticket");
const ticketCommentController = require("../controllers/api/ticket-comment");

const router = express.Router();

router.use(auth.userAuthorization);

router.get("/ping", (req, res) => {
    console.log("src/controllers/api/ping");

    res.statusCode = 200;
    res.send({ok: "true"});
});

router.get("/reports/tickets", ticketController.get);
router.post("/reports/tickets", ticketController.post);
router.patch("/reports/tickets/:ticketId?", ticketController.patch);
router.delete("/reports/tickets/:ticketId?", ticketController.delete);

router.post("/reports/ticketComments", ticketCommentController.post);


/**
 * TODO: 
 * 1.) Create API methods to expose enum values
 * 2.) Create API method to expose available locations
 */
module.exports = router;