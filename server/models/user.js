//'use strict';
import bcrypt from 'bcryptjs';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
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
    
  });

  User.associate = (models) => {
    User.hasMany(models.recipesDetail, {
      foreignKey: 'recipesDetailId',
      as: 'recipesDetail'
      });
  }
  return User;
};