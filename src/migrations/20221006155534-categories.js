'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.createTable('categories', { 
      id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      }
     });
  },

  async down (queryInterface, _Sequelize) {
     await queryInterface.dropTable('categories');
  }
};
