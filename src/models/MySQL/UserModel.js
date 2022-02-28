const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../database/db.js");

class User extends Model{}
User.init(
    {
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            validate: {isEmail: true}
        },
        password: DataTypes.STRING,
    },
    {
        sequelize,
        modelName: 'Usuario',
        timestamps: false
    }
)

module.exports = User