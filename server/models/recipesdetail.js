'use strict';
module.exports = (sequelize, DataTypes) => {
  const recipesDetail = sequelize.define('recipesDetail', {
    tittle: { 
      type: DataTypes.STRING,
      allowNull: false
    },

    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ingredients: { 
      type: DataTypes.STRING,
      allowNull: false
    },
    
    favorite: {
      type: DataTypes.BOOLEAN
    },

    category: {
      type: DataTypes.STRING
    }
  });

  recipesDetail.associate = (models) => {
    recipesDetail.hasMany(models.recipeReview, {
      foreignKey: 'recipeReviewId',
      as: 'recipeReviews',
    });
    recipesDetail.belongsTo(models.User, {
      foreignKey: 'UserId',
      onDelete: 'CASCADE',
    });
  }
  return recipesDetail;
};