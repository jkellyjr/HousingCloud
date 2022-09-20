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
 * TODO: Better way to wait for connections
 */
// for (let i = 0; i < configs.DB.MAX_STARTUP_CONNECTION_RETRIES; i++) {
//     setTimeout(() => {
//         db.sequelize.authenticate()
//             .then(() => {
//                 db.sequelize.sync()
//                     .then(() => {
//                         console.log("Successfully connected to DB.");
//                         return;
//                     })
//                     .catch((e) => {
//                         console.log(`Failed to establish DB connection: ${e}`)
//                     });
//             })
//             .catch((e) => {
//                 console.log(`DB rejected connection attempt: ${i}`)
//             });
//     }, 1000);
// }

const forceSync = configs.APP.ENV == "dev" ? true : false;

// setTimeout(() => { 
//     console.log("executed");
//     db.sequelize.sync({ force: forceSync})
//         .then(()=> {
//             console.log("DB synced")

//             /**
//              * Make configurable or move to run.sh
//              */
//             try {
//                 require("./scripts/add-db-test-data");
//             }
//             catch (e) {
//                 console.log(e);
//             }
            
//         })
//         .catch((e) => {
//         console.log(`Failed to sync db: ${e}`);
//     }); 
// }, 3000);

app.listen(configs.APP.PORT, () => {
    console.log(`Example app listening on port ${configs.APP.PORT}`);
});

