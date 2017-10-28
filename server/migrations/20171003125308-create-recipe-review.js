'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('recipeReviews', {
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
      reviews: {
        allowNull: false,
        type: Sequelize.STRING
      },
      reviewedBy: {
        allowNull: false,
        type: Sequelize.STRING
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
    return queryInterface.dropTable('recipeReviews');
  }
};