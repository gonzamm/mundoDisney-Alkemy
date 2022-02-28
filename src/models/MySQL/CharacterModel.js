const { Model, DataTypes } = require("sequelize");
const sequelize = require('../../database/db')

class Personaje extends Model {}
Personaje.init(
  {
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },

    imagen: DataTypes.STRING,
    edad: DataTypes.INTEGER,
    peso: DataTypes.INTEGER,
    historia: DataTypes.TEXT,
  },
  {
    sequelize,
    modelName: "Personaje",
    timestamps: false,
  }
);

module.exports = Personaje;
