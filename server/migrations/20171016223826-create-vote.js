'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('votes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      upvote: {
        type: Sequelize.INTEGER
      },
      downvote: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
     recipesDetailId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'recipesDetails',
          key: 'id',
          as: 'recipesDetailId',
        },
      },
    });
  },
  down: (queryInterface/*, Sequelize*/) => {
    return queryInterface.dropTable('votes');
  }
};