const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /*static associate({post}) {
            this.hasMany(post, {foreignKey: 'userId'})
        }*/
    }
    User.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, 
    {
        sequelize,
        modelName: 'User',
    })
    /*User.associate = (models) => {
        User.hasMany(models.Post, {
            as: 'posts',
            foreignKey: 'UserId',
        });
    }*/
    return User
}; 


 