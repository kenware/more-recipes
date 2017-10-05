'use strict';
module.exports = (sequelize, DataTypes) => {
  const recipeReview = sequelize.define('recipeReview', {
    reviews: { 
      type: DataTypes.STRING,
      allowNull: false
    },

    upvote: {
      type: DataTypes.INTEGER
    },

    downvote: {
      type: DataTypes.INTEGER
    }

  });
  
  recipeReview.associate = (models) => {
    recipeReview.belongsTo(models.recipesDetail, {
      foreignKey: 'recipesDetailId',
      onDelete: 'CASCADE'
    });
  };
  return recipeReview;
};