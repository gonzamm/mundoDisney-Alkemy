const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../database/db.js");

class Pelicula extends Model {}
Pelicula.init(
  {
    titulo: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },

    imagen: DataTypes.STRING,
    fecha: { type: DataTypes.DATE, allowNull: false },
    calificacion: {
      type: DataTypes.INTEGER,
      validate: { min: 1, max: 5 },
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Pelicula",
    timestamps: false,
  }
);

module.exports = Pelicula;
