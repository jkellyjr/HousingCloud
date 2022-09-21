"use strict";

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Welcome to HousingCloud");
});

const db = require("../models");

router.get("/ping", async (req, res) => {
    res.statusCode = 200;
    res.send({ok: "true"});
});

module.exports = router;
