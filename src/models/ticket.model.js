"use strict";

const { TICKET_STATE } = require("../data/enums");

module.exports = (sequelize, Sequelize) => {

    const Ticket = sequelize.define("Ticket", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        requestor: {
            type: Sequelize.UUID,
            allowNull: false
        },
        subject: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        category: {
            type: Sequelize.STRING,
            allowNull: false
        },
        priority: {
            type: Sequelize.STRING,
            allowNull: false
        },
        state: {
            type: Sequelize.STRING,
            defaultValue: TICKET_STATE.VALUES.OPEN,
            allowNull: false
        },
        location: {
            type: Sequelize.TEXT,
            allowNull: true
        }
        /**
         * Implicit:
         * - comments
         */

    });

    return Ticket;
}