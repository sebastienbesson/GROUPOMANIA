'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      Post.belongsTo(models.User, {foreignkey: 'userdId'})
      //Post.hasMany(models.Comments, {foreignKey: 'postId'})
    }
  };
  Post.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING,
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
      allowNull: true
    },
    likes: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};