'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comment.belongsTo(models.User, {foreignKey: 'userId'})
      Comment.belongsTo(models.Post, {foreignKey:'postId'})
    }
  };
  Comment.init({
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    /*userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },*/
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};