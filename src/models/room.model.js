"use strict";

module.exports = (sequelize, Sequelize) => {
    
    const Room = sequelize.define("Room", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        buildingName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        number: {
            type: Sequelize.STRING,
            allowNull: false
        },
        bedNumber: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        type: {
            type: Sequelize.STRING,
            allowNull: false
        },
        pupose: {
            type: Sequelize.STRING,
            allowNull: true
        }
    });

    return Room;
}