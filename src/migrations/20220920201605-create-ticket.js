'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tickets', {
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
          allowNull: false
      },
      location: {
          type: Sequelize.TEXT,
          allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Tickets');
  }
};