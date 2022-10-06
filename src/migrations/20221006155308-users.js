'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      displayName: {
        allowNull: false,
        type: Sequelize.STRING,
        field: "display_name"
      },
      email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      image: {
        type: Sequelize.STRING
      },
    });
  },
  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('users');
  }
};