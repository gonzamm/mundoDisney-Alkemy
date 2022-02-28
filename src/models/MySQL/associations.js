const Personaje = require("./CharacterModel");
const Pelicula = require("./MovieModel");
const Genero = require("./GenreModel");

Genero.hasMany(Pelicula, {
  foreignKey: {
    allowNull: false,
  },
});

Pelicula.belongsTo(Genero);

Pelicula.belongsToMany(Personaje, { through: "pelicula_x_personaje", timestamps: false });
Personaje.belongsToMany(Pelicula, { through: "pelicula_x_personaje" });
