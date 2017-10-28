'use strict';
module.exports = (sequelize, DataTypes) => {
  const recipeReview = sequelize.define('recipeReview', {
    title: { 
      type: DataTypes.STRING,
      allowNull: false
    },
    reviews: { 
      type: DataTypes.STRING,
      allowNull: false
    },
    reviewedBy: { 
      type: DataTypes.STRING,
      allowNull: false
    },
  });
  
  recipeReview.associate = (models) => {
    recipeReview.belongsTo(models.recipesDetail, {
      foreignKey: 'recipesDetailId',
      onDelete: 'CASCADE'
    });
  };
  return recipeReview;
};