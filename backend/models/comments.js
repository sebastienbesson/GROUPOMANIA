const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model{}
  Comment.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, 
  {
    sequelize,
    modelName: 'Comment',
  })
  Comment.associate = (models) => {
    Comment.belongsTo(models.Post, {
      as: 'post',
      foreignKey: 'id'
    });
  }
  return Comment;
};