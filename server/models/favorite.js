'use strict';
module.exports = (sequelize, DataTypes) => {
  var favorite = sequelize.define('favorite', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    ingredients: DataTypes.STRING,
    category: DataTypes.STRING
  });
  favorite.associate = (models) => {
    favorite.belongsTo(models.User, {
      foreignKey: 'UserId',
      onDelete: 'CASCADE'
    });
 }
  return favorite;
};