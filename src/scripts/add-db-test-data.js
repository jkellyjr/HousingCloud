"use strict";

const db = require("../models/index");
const enums  = require("../data/enums");

try {
    db.Room.upsert({
        id: "fakeRoomID",
        buildingName: "nordy",
        number: "c300",
        bedNumber: 2,
        type: enums.ROOM_TYPE.VALUES.SINGLE,
        pupose: enums.ROOM_PURPOSE.VALUES.HONORS
    });

    db.User.upsert({
        id: "fakeId",
        firstName: "Jane",
        lastName: "Doe",
        email: "jane@housingcloud.com",
        role: enums.USER_TYPES.VALUES.STUDENT,
        roomId: "fakeRoomID"
    });

    db.Authorization.upsert({
        token: "studentToken1",
        sessionExpiration: "2022-10-01T00:00:00",
        userId: "fakeId"
    });



    db.User.upsert({
        id: "fakeId2",
        firstName: "Bob",
        lastName: "Smith",
        email: "bob@housingcloud.com",
        role: enums.USER_TYPES.VALUES.STAFF
    });

    db.Authorization.upsert({
        token: "staffToken1",
        sessionExpiration: "2022-10-01T00:00:00",
        userId: "fakeId2"
    });


    db.User.upsert({
        id: "fakeId3",
        firstName: "Oprah",
        lastName: "Winfrey",
        email: "oprah@housingcloud.com",
        role: enums.USER_TYPES.VALUES.ADMIN
    });

    db.Authorization.upsert({
        token: "adminToken1",
        sessionExpiration: "2022-10-07T00:00:00",
        userId: "fakeId3"
    });



    db.Ticket.upsert({
        id: "faketicketIdStudent",
        requestor: "fakeId",
        subject: "adding testing data is so fun",
        category: enums.TICKET_CATEGORY.VALUES.LEAKS,
        priority: enums.TICKET_PRIORITY.VALUES.HIGH,
        state: enums.TICKET_STATE.VALUES.OPEN
    });

    db.Ticket.upsert({
        requestor: "fakeId",
        subject: "trying again",
        category: enums.TICKET_CATEGORY.VALUES.ACCOUNTING,
        priority: enums.TICKET_PRIORITY.VALUES.LOW,
        state: enums.TICKET_STATE.VALUES.PENDING
    });

    db.Ticket.upsert({
        requestor: "fakeId",
        subject: "trying deleted",
        category: enums.TICKET_CATEGORY.VALUES.ACCOUNTING,
        priority: enums.TICKET_PRIORITY.VALUES.LOW,
        state: enums.TICKET_STATE.VALUES.DELETED
    });


    db.Ticket.upsert({
        id: "fakeTicketIdAdmin",
        requestor: "fakeId2",
        subject: "trying another combo",
        category: enums.TICKET_CATEGORY.VALUES.OTHER,
        priority: enums.TICKET_PRIORITY.VALUES.MEDIUM,
        state: enums.TICKET_STATE.VALUES.DELETED
    });

    db.TicketComment.upsert({
        ticketId: "faketicketIdStudent",
        text: "please help im drowning",
        author: "fakeId"
    });

    db.TicketComment.upsert({
        ticketId: "faketicketIdStudent",
        text: "oh no!",
        author: "fakeId2"
    });

    db.TicketComment.upsert({
        ticketId: "faketicketIdStudent",
        text: "(internal) hope he can swim",
        author: "fakeId2",
        visibility: enums.TICKET_COMMENT_VISIBILITY.VALUES.INTERNAL
    });

    db.TicketComment.upsert({
        ticketId: "fakeTicketIdAdmin",
        text: "we need action on this",
        author: "fakeId2"
    });


    console.log("Finished adding test data to the database");
} 
catch (e) {
    console.log(e)
}