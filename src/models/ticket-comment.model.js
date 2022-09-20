"use strict";

const enums = require("../data/enums");

module.exports = (sequelize, Sequelize) => {
    
    const TicketComment = sequelize.define("TicketComment", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        ticketId: {
            type: Sequelize.UUID,
            allowNull: false
        },
        text: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        author: {
            type: Sequelize.UUID,
            allowNull: false
        },
        /**
         * This field will allow staff and admins to add internal/private comments
         * to tickets that students cannot see.
         */
        visibility: {
            type: Sequelize.STRING,
            defaultValue: enums.TICKET_COMMENT_VISIBILITY.VALUES.PUBLIC,
            allowNull: false
        }
    });

    return TicketComment;
}