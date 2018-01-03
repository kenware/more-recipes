'use strict';
module.exports = (sequelize, DataTypes) => {
  const recipesDetail = sequelize.define('recipesDetail', {
    title: { 
      type: DataTypes.STRING,
      allowNull: false
    },

    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    ingredients: { 
      type: DataTypes.TEXT,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING
    },
    upvote: {
      type: DataTypes.INTEGER
    },
    downvote: {
      type: DataTypes.INTEGER
    }
  });

  recipesDetail.associate = (models) => {
    recipesDetail.hasMany(models.recipeReview, {
      foreignKey: 'recipesDetailId',
      as: 'recipeReviews',
    });
    recipesDetail.hasOne(models.vote, {
      foreignKey: 'recipesDetailId',
      as: 'votes',
    });
    recipesDetail.belongsTo(models.user, {
      foreignKey: 'UserId',
      onDelete: 'CASCADE',
    });
  }
  return recipesDetail;
};