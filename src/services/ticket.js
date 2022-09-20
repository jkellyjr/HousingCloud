"use strict";

const db = require("../models");
const enums = require("../data/enums");

let service = {};

service.createTicket = async (data) => {
    console.log("src/services/ticket/createTicket");

    /**
     * Assuming that anyone can create a ticket
     */
    const [instance, created] = await db.Ticket.upsert(data).catch((e) => { throw e.message; });
    return created ? instance : undefined;
}

service.updateTicket = async (ticketId, data) => {
    console.log("src/services/ticket/updateTicket");
    
    const res = await db.Ticket.update(
        data,
        {where: {id: ticketId}}
    )
    .catch((e) => { 
        throw e.message; 
    });
    
    /**
     * The update() function returns the number of rows affected
     */
    return res[0] == 1;
}

service.getTickets = async ({ userRole, userId, prioritySort, includeComments }) => {
    console.log("src/services/ticket/getTickets");

    let args = {
        where:{ 
            state: { [db.Sequelize.Op.ne]: enums.TICKET_STATE.VALUES.DELETED } 
        },
        order: [
            ["updatedAt", "DESC"]
        ]
    }

    if (userId) {
        args.where.requestor = userId
    }
    
    if (prioritySort) {
        if (prioritySort == enums.TICKET_API.PRIORITY_SORT.VALUES.DESC) {
            args.order.unshift(
                [db.Sequelize.literal(`priority="${enums.TICKET_PRIORITY.VALUES.LOW}", priority="${enums.TICKET_PRIORITY.VALUES.MEDIUM}", priority="${enums.TICKET_PRIORITY.VALUES.HIGH}"`)]
            );
        }
        else if (prioritySort == enums.TICKET_API.PRIORITY_SORT.VALUES.ASC) {
            args.order.unshift(
                [db.Sequelize.literal(`priority="${enums.TICKET_PRIORITY.VALUES.HIGH}", priority="${enums.TICKET_PRIORITY.VALUES.MEDIUM}", priority="${enums.TICKET_PRIORITY.VALUES.LOW}"`)]
            );
        }
    }

    if (includeComments) {
        args.include = {
            model: db.TicketComment,
            required: false
        };

        /**
         * Students cannot see internal comments
         */
        if (userRole == enums.USER_TYPES.VALUES.STUDENT) {
            args.include.where = {
                visibility: {
                    [db.Sequelize.Op.ne]: enums.TICKET_COMMENT_VISIBILITY.VALUES.INTERNAL
                }
            }
        }
        args.order.push([db.TicketComment, "createdAt", "ASC"]);
    }
    
    return await db.Ticket.findAll(args).catch((e) => { throw e.message; });
}

service.deleteTicket = async (ticketId) => {
    console.log("src/services/ticket/deleteTicket");

    const res = await db.Ticket.update(
        {state: enums.TICKET_STATE.VALUES.DELETED},
        {
            where: {
                id: ticketId,
                state: {
                    [db.Sequelize.Op.ne]: enums.TICKET_STATE.VALUES.DELETED
                }
            }
        }
    )
    .catch((e) => { 
        throw e.message; 
    });

    /**
     * The update() function returns the number of rows affected
     */
    return res[0] == 1;
}

module.exports = service;