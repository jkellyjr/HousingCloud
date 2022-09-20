"use strict";

const { Sequelize, DataTypes } = require("sequelize");
const configs = require("../configs");

const sequelize = new Sequelize({
    database: configs.DB.NAME, 
    username: configs.DB.USER, 
    password: configs.DB.PASSWORD,
    host: configs.DB.HOST,
    dialect: configs.DB.DIALECT

    /**
     * TODO: Add connection pool info
     */
});

let db = {}

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./user.model")(sequelize, Sequelize);
db.Authorization = require("./authorization.model")(sequelize, Sequelize);
db.Ticket = require("./ticket.model")(sequelize, Sequelize);
db.Room = require("./room.model")(sequelize, Sequelize);
db.TicketComment = require("./ticket-comment.model")(sequelize, Sequelize);

db.User.hasOne(db.Authorization, {
    sourceKey: "id",
    foreignKey: "userId"
});

db.Authorization.belongsTo(db.User, {
    foreignKey: "userId"
});

db.User.hasMany(db.Ticket, {
    sourceKey: "id",
    foreignKey: "requestor"
});

db.Ticket.belongsTo(db.User, {
    foreignKey: "requestor"
});

db.Room.hasMany(db.User, {
    sourceKey: "id",
    foreignKey: "roomId"
});

db.User.belongsTo(db.Room, {
    foreignKey: "roomId"
});

db.Ticket.hasMany(db.TicketComment, {
    sourceKey: "id",
    foreignKey: "ticketId"
});

db.TicketComment.belongsTo(db.Ticket, {
    foreignKey: "ticketId"
});

db.User.hasMany(db.TicketComment, {
    sourceKey: "id",
    foreignKey: "author"
});

db.TicketComment.belongsTo(db.User, {
    foreignKey: "author"
});

module.exports = db;