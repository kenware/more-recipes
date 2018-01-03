//'use strict';
import bcrypt from 'bcryptjs';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    fullName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING
    },
    image: {
      type: DataTypes.STRING
    },
    
  });

  user.associate = (models) => {
    user.hasMany(models.recipesDetail, {
      foreignKey: 'UserId',
      as: 'recipesDetails'
      });
    user.hasMany(models.favorite, {
      foreignKey: 'UserId',
      as: 'favorites'
      });
  }
  return user;
};