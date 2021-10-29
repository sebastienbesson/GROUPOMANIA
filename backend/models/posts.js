const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /*static associate ({User}) {
      this.belongsTo(User, {foreignKey: 'userId'})
    }*/
  }
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
  /*Post.associate = (models) => {
    Post.belongsTo(models.User, {
        as: 'user',
        foreignKey: 'userId'
    });
    Post.hasMany(models.Comment, {
        as: 'post',
        foreignKey: 'id'
    });
  }*/
  return Post
};