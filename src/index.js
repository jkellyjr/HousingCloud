"use strict";

const express = require("express");
const configs = require("./configs");

const app = express();

/**
 * Add app level middleware
 */
app.use(express.json());


/**
 * Hoist Routers
 */
const baseRoutes = require("./controllers/index");
const apiRoutes = require("./controllers/api");

app.use("/", baseRoutes);
app.use("/api/v1", apiRoutes);

/**
 * Configure DB
 */
const db = require("./models");

/**
 * Feel free to comment out
 */
require("./scripts/add-db-test-data");

app.listen(configs.APP.PORT, () => {
    console.log(`Example app listening on port ${configs.APP.PORT}`);
});

