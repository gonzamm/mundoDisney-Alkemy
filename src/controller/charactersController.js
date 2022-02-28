const Personaje = require("../models/MySQL/CharacterModel");
const Peliculas = require("../models/MySQL/MovieModel");
require("../models/MySQL/associations");

const getAllCharacters = async (req, res) => {
  try {
    if (!req.query.name && !req.query.age && !req.query.movies) {
      const personajes = await Personaje.findAll({
        attributes: { exclude: ["id", "edad", "peso", "historia"] },
      });
      res.status(200).json(personajes);
    }
    //Busqueda por el nombre
    else if (req.query.name) {
      const personajes = await Personaje.findAll({
        where: { nombre: req.query.name },
      });
      //Check si existen personajes con ese nombre
      if (personajes[0]) {
        res.status(200).json(personajes);
        return;
      } else {
        res
          .status(400)
          .json({ msg: `Personaje con nombre ${req.query.name} no existe` });
      }
    }
    //Busqueda por la edad
    else if (req.query.age) {
      const personajes = await Personaje.findAll({
        where: { edad: req.query.age },
      });
      //Check si existen personajes con esa edad
      if (personajes[0]) {
        res.status(200).json(personajes);
        return;
      } else {
        res
          .status(400)
          .json({ msg: `No existen personajes con ${req.query.age} años` });
      }
    }
    //Busqueda por peliculas
    else if (req.query.movies) {
      const personajes = await Personaje.findAll({
        attributes: {
          exclude: ["id", "edad", "peso", "historia", "Peliculas"],
        },
        include: {
          model: Peliculas,
          where: { id: req.query.movies },
          attributes: {
            exclude: [
              "Peliculas",
              "id",
              "imagen",
              "titulo",
              "fecha",
              "calificacion",
              "GeneroId",
            ],
          },
        },
      });
      //Check si existen personajes en esa pelicula
      if (personajes[0]) {
        res.status(200).json(personajes);
        return;
      } else {
        res.status(400).json({
          msg: `Pelicula con id ${req.query.movies} no existe, o no tiene personajes cargados`,
        });
      }
    }
  } catch (error) {
    console.error("error en getAllCharacters ", error);
    res.status(500).json({ msg: "Ups... algo salio mal vuelve a intentarlo" });
  }
};

const createCharacter = async (req, res) => {
  try {
    const { imagen, nombre, edad, peso, historia } = req.body;

    //Check datos enviados
    if([imagen,nombre,edad,peso,historia].includes('')){
      res.status(400).json({ msg: "Todos los campos son obligatorios" });
      return;
    }

    const characterCheck = await Personaje.findOne({
      where: { nombre },
    });
    if (characterCheck) {
      res.status(400).json({ msg: `El personaje con nombre ${nombre} ya existe` });
      return;
    }

    //Creo el personaje
    const newCharacter = await Personaje.create({
      imagen,
      nombre,
      edad,
      peso,
      historia,
    });

    //Agrego las peliculas asociadas
    const listaPeliculas = req.body.peliculas ? req.body.peliculas : [];
    listaPeliculas.forEach(async (element) => {
      await newCharacter.addPelicula(element);
    });

    res.status(201).json(newCharacter);
  } catch (error) {
    console.error("error en createCharacter ", error);
    res.status(500).json({ msg: "Ups... algo salio mal vuelve a intentarlo" });
  }
};

const getCharacterById = async (req, res) => {
  try {
    const id = req.params.id;
    const character = await Personaje.findOne({
      where: { id },
      include: { model: Peliculas },
    });
    if (character) {
      res.status(200).json(character);
      return;
    }
    res.status(400).json({ msg: `Personaje con id ${id} no existe` });
  } catch (error) {
    console.error("error en getCharacterById ", error);
    res.status(500).json({ msg: "Ups... algo salio mal vuelve a intentarlo" });
  }
};

const updateCharacter = async (req, res) => {
  try {
    const id = req.params.id;
    const { imagen, nombre, edad, peso, historia } = req.body;

    if ([imagen, nombre, edad, peso, historia].includes("")) {
      res.status(400).json({ msg: "Todos los campos son obligatorios" });
    }

    if (await checkCharacter(id)) {
      const updCharacter = await Personaje.update(
        { imagen, nombre, edad, peso, historia },
        { where: { id } }
      );

      //Agrego las peliculas asociadas
      const character = await Personaje.findOne({
        where: { id },
        include: { model: Peliculas },
      });

      const listaPeliculas = req.body.peliculas ? req.body.peliculas : [];
      listaPeliculas.forEach(async (element) => {
        await character.addPelicula(element);
      });

      res.status(201).json({ msg: `Personaje con id ${id} actualizado` });
    } else {
      res.status(400).json({ msg: `Personaje con id ${id} no existe` });
    }
  } catch (error) {
    console.error("error en updateCharacter ", error);
    res.status(500).json({ msg: "Ups... algo salio mal vuelve a intentarlo" });
  }
};

const deleteCharacter = async (req, res) => {
  try {
    const id = req.params.id;

    if (await checkCharacter(id)) {
      const delCharacter = await Personaje.destroy({ where: { id } });
      res.json({ msg: `Personaje con id ${id} eliminado exitosamente` });
    } else {
      res.status(400).json({ msg: `Personaje con id ${id} no existe` });
    }
  } catch (error) {
    console.error("error en deleteCharacter ", error);
    res.status(500).json({ msg: "Ups... algo salio mal vuelve a intentarlo" });
  }
};

const checkCharacter = async (id) => {
  try {
    const character = await Personaje.findOne({
      where: { id },
    });

    if (character) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error en checkCaracter: ", error);
  }
};

module.exports = {
  getAllCharacters,
  createCharacter,
  getCharacterById,
  updateCharacter,
  deleteCharacter,
};
