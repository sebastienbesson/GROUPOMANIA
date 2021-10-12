const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class User extends Model {}
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
        modelName: "User"
    })
    return User
}; 


 