'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('recipesDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      content: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      ingredients: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      image: {
        type: Sequelize.STRING
      },
      upvote: {type: Sequelize.INTEGER
              },
      downvote: {type: Sequelize.INTEGER
              },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      UserId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'users',
          key: 'id',
          as: 'UserId',
        },
      }
    });
  },
  down: (queryInterface/*, Sequelize*/) => {
    return queryInterface.dropTable('recipesDetails');
  }
};