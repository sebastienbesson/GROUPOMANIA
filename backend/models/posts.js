'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      Post.belongsTo(models.User, {foreignkey: 'userId'})
      Post.hasMany(models.Comment, {foreignKey: 'postId'})
    }
  };
  Post.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    contentUrl: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};