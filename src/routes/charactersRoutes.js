const { Router } = require("express");
const { validarJWT } = require("../middlewares/validarJWT");
const {
  getAllCharacters,
  createCharacter,
  getCharacterById,
  updateCharacter,
  deleteCharacter,
} = require("../controller/charactersController");

const router = Router();

router.get("/", getAllCharacters); //Lista todos los personajes
router.post("/", validarJWT, createCharacter); //Crea un nuevo personaje
router.get("/:id", getCharacterById); //Busca un personaje segun su id
router.put("/:id", validarJWT, updateCharacter); //Modifica un personaje segun su id
router.delete("/:id", validarJWT, deleteCharacter); //Borra un personaje segun su id

module.exports = router;
