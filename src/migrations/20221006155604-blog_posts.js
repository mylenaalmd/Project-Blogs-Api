'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.createTable('blog_posts', { 
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      content: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: "user_id",
        references: {
          model: "users",
          key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      published: {
        type: Sequelize.DATE,
      },
      updated: {
        type: Sequelize.DATE,
      }
     });
  },

  async down (queryInterface, _Sequelize) {
     await queryInterface.dropTable('blog_posts');
  }
};
