const { Router } = require("express");
const { validarJWT } = require("../middlewares/validarJWT");
const {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
} = require("../controller/moviesController");

const router = Router();

router.get("/", getAllMovies); //Lista todos las peliculas
router.get("/:id", getMovieById); //Busca una pelicula segun su id
router.post("/", validarJWT, createMovie); //Crea una nueva pelicula
router.put("/:id", validarJWT, updateMovie); //Modifica una pelicula segun su id
router.delete("/:id", validarJWT, deleteMovie); //Borra una pelicula segun su id

module.exports = router;
