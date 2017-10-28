'use strict';
module.exports = (sequelize, DataTypes) => {
  const vote = sequelize.define('vote', {
    upvote: DataTypes.INTEGER,
    downvote: DataTypes.INTEGER
  });
  vote.associate = (models) => {
    vote.belongsTo(models.recipesDetail, {
      foreignKey: 'recipesDetailId',
      onDelete: 'CASCADE'
      });
  }
  return vote;
};