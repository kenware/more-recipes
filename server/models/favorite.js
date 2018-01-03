'use strict';
module.exports = (sequelize, DataTypes) => {
  var favorite = sequelize.define('favorite', {
    recipeId: DataTypes.INTEGER
  });
  favorite.associate = (models) => {
    favorite.belongsTo(models.user, {
      foreignKey: 'UserId',
      onDelete: 'CASCADE'
    });
 }
  return favorite;
};