const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {}
  Post.init({
    name: {
      type: DataTypes.STRING,
      allownull: false
    },
    title: {
      type: DataTypes.STRING,
      allownull: false
    },
    content: {
      type: DataTypes.STRING,
      allownull: false
    },
    contentURL: {
      type: DataTypes.STRING,
      allownull: true
    },
    likes: {
      type: DataTypes.STRING,
      allownull: true
    },
  }, 
  {
    sequelize,
    modelName: 'Post',
  })
  return Post
};