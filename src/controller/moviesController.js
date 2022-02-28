const Personaje = require("../models/MySQL/CharacterModel");
const Pelicula = require("../models/MySQL/MovieModel");
require("../models/MySQL/associations");

const getAllMovies = async (req, res) => {
  try {
    if (!req.query.name && !req.query.genre && !req.query.order) {
      const movies = await Pelicula.findAll({
        attributes: { exclude: ["id", "calificacion", "GeneroId"] },
      });
      res.status(200).json(movies);
    }
    //Busqueda por el titulo
    else if (req.query.name) {
      const movies = await Pelicula.findAll({
        where: { titulo: req.query.name },
      });
      //Check si existen peliculas con ese titulo
      if (movies[0]) {
        res.status(200).json(movies);
        return;
      } else {
        res
          .status(400)
          .json({ msg: `Pelicula con titulo ${req.query.name} no existe` });
      }
    }
    // Busqueda por el genero
    else if (req.query.genre) {
      const movies = await Pelicula.findAll({
        where: { GeneroId: req.query.genre },
      });
      //Check si existen peliculas con ese titulo
      if (movies[0]) {
        res.status(200).json(movies);
        return;
      } else {
        res.status(400).json({
          msg: `Pelicula con Id de genero ${req.query.genre} no existe`,
        });
      }
    }
    //Ordenado segun parametro (ASC-DESC)
    else if (req.query.order) {
      if (req.query.order == "ASC" || req.query.order == "DESC") {
        const movies = await Pelicula.findAll({
          order: [["fecha", req.query.order]],
        });
        res.status(200).json(movies);
      } else {
        res.status(400).json({
          msg: `No se puede ordenar por ${req.query.order}, prueba con ASC o DESC`,
        });
      }
    }
  } catch (error) {
    console.error("error en getAllMovies ", error);
    res.status(500).json({ msg: "Ups... algo salio mal vuelve a intentarlo" });
  }
};

const getMovieById = async (req, res) => {
  try {
    const id = req.params.id;
    const movie = await Pelicula.findOne({
      where: { id },
      include: { model: Personaje },
    });
    if (movie) {
      res.status(200).json(movie);
      return;
    }
    res.status(400).json({ msg: `Pelicula con id ${id} no existe` });
  } catch (error) {
    console.error("error en getMovieById ", error);
    res.status(500).json({ msg: "Ups... algo salio mal vuelve a intentarlo" });
  }
};

const createMovie = async (req, res) => {
  try {
    const { titulo, imagen, fecha, calificacion, GeneroId } = req.body;

    if ([titulo, imagen, fecha, calificacion, GeneroId].includes("")) {
      res.status(400).json({ msg: "Todos los campos son obligatorios" });
      return;
    }
    if (calificacion > 5 || calificacion < 1) {
      res.status(400).json({ msg: "La calificacion es de 1 a 5" });
      return;
    }

    const movieCheck = await Pelicula.findOne({
      where: { titulo },
    });
    if (movieCheck) {
      res.status(400).json({ msg: `Pelicula con titulo ${titulo} ya existe` });
      return;
    }

    //Creo la pelicula
    const newMovie = await Pelicula.create({
      titulo,
      imagen,
      fecha,
      calificacion,
      GeneroId,
    });

    res.status(201).json(newMovie);
  } catch (error) {
    console.error("error en createMovie ", error);
    res.status(500).json({ msg: "Ups... algo salio mal vuelve a intentarlo" });
  }
};

const updateMovie = async (req, res) => {
  try {
    const id = req.params.id;
    const { titulo, imagen, fecha, calificacion, GeneroId } = req.body;

    if ([titulo, imagen, fecha, calificacion, GeneroId].includes("")) {
      res.status(400).json({ msg: "Todos los campos son obligatorios" });
      return;
    }

    if (await checkMovie(id)) {
      const updMovie = await Pelicula.update(
        { titulo, imagen, fecha, calificacion, GeneroId },
        { where: { id } }
      );
      res.status(201).json({ msg: `Pelicula con id ${id} actualizado` });
    } else {
      res.status(400).json({ msg: `Pelicula con id ${id} no existe` });
    }
  } catch (error) {
    console.error("error en updateMovie ", error);
    res.status(500).json({ msg: "Ups... algo salio mal vuelve a intentarlo" });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const id = req.params.id;

    if (await checkMovie(id)) {
      const delMovie = await Pelicula.destroy({ where: { id } });
      res.json({ msg: `Pelicula con id ${id} eliminada exitosamente` });
    } else {
      res.status(400).json({ msg: `Pelicula con id ${id} no existe` });
    }
  } catch (error) {
    console.error("error en deleteMovie ", error);
    res.status(500).json({ msg: "Ups... algo salio mal vuelve a intentarlo" });
  }
};

const checkMovie = async (id) => {
  try {
    const movie = await Pelicula.findOne({
      where: { id },
    });

    if (movie) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error en checkMovie: ", error);
  }
};

module.exports = {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
};
