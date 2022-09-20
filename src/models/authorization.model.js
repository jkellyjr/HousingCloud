"use strict";

module.exports = (sequelize, Sequelize) => {

    const Authorization = sequelize.define("Authorization", {
        token: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        userId: {
            type: Sequelize.UUID,
            allowNull: false
        },
        sessionExpiration: {
            type: Sequelize.DATE,
            allowNull: false
        }
    });

    return Authorization;
}