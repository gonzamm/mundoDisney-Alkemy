const dotenv = require("dotenv").config();
const sequelize = require("./src/database/db");
const configDB = require("./src/database/configDB");
const mysql = require("mysql2/promise");
const Genero = require("./src/models/MySQL/GenreModel");
const Personaje = require("./src/models/MySQL/CharacterModel");
const Pelicula = require("./src/models/MySQL/MovieModel");
require("./src/models/MySQL/associations");

const generos = [
  { nombre: "Fantastico", imagen: "url img fantastico" },
  { nombre: "Animacion", imagen: "url img animacion" },
  { nombre: "Documental", imagen: "url img documental" },
  { nombre: "Musical", imagen: "url img musical" },
  { nombre: "Aventura", imagen: "url img aventura" },
];

const personajes = [
  {
    id: 1,
    nombre: "Mickey",
    imagen: "url img mickey",
    edad: 94,
    peso: 1,
    historia: "El ratón mas conocido",
  },
  {
    id: 2,
    nombre: "Blancanieves",
    imagen: "url img Blancanieves",
    edad: 50,
    peso: 50,
    historia: "La amiga de los 7 enanitos",
  },
  {
    id: 3,
    nombre: "Elsa",
    imagen: "url img Elsa",
    edad: 20,
    peso: 2,
    historia: "Una princesa del frío",
  },
  {
    id: 4,
    nombre: "Rapunzel",
    imagen: "url img Rapunzel",
    edad: 32,
    peso: 50,
    historia: "La princesa de pelo largo",
  },
  {
    id: 5,
    nombre: "Anna",
    imagen: "url img Anna",
    edad: 18,
    peso: 45,
    historia: "Hermana de Elsa",
  },
];

const peliculas = [
  {
    id: 1,
    titulo: "Fantasía",
    imagen: "url img Fantasía",
    fecha: "01/01/1940",
    calificacion: 3,
    GeneroId: 1,
  },
  {
    id: 2,
    titulo: "Frozen 1",
    imagen: "url img Frozen",
    fecha: "01/01/2013",
    calificacion: 4,
    GeneroId: 2,
  },
  {
    id: 3,
    titulo: "Frozen 2",
    imagen: "url img Frozen2",
    fecha: "01/01/2019",
    calificacion: 2,
    GeneroId: 2,
  },
  {
    id: 4,
    titulo: "Blancanieves",
    imagen: "url img Cenicienta",
    fecha: "01-01-1937",
    calificacion: 3,
    GeneroId: 4,
  },
];

const personajes_x_peliculas = [
  { peliculaId: 1, personajeId: 1 },
  { peliculaId: 2, personajeId: 3 },
  { peliculaId: 2, personajeId: 5 },
  { peliculaId: 3, personajeId: 3 },
  { peliculaId: 3, personajeId: 5 },
  { peliculaId: 4, personajeId: 2 },
];

function seed() {
  console.log("Reset DB y llenado con datos de prueba");
  sequelize.sync({ force: true }).then(() => {
    setTimeout(() => {
      /*Brinda un tiempo extra al servidor mySQL para garantizar que terminó todas sus 
      indexaciones asíncronas relativas al borrado y re creación de tablas */
      console.log("LLenando generos");
      generos.forEach((genero) => Genero.create(genero));

      console.log("LLenando personajes");
      personajes.forEach((personaje) => Personaje.create(personaje));

      console.log("LLenando peliculas");
      peliculas.forEach((pelicula) => Pelicula.create(pelicula));

      setTimeout(() => {
        /*Brinda un tiempo extra al servidor mySQL para garantizar que terminó todas sus 
      indexaciones asíncronas relativas a la inserción de registros y que no dé errores
      de validación */
        console.log("Llenando las asosiaciones películas X personajes");

        personajes_x_peliculas.forEach(async (unElemento) => {
          let consulta =
            "INSERT INTO pelicula_x_personaje (`PeliculaId`, `PersonajeId`) VALUES (" +
            unElemento.peliculaId +
            "," +
            unElemento.personajeId +
            ")";

          try {
            sequelize.query(consulta);
          } catch (error) {
            console.log(error);
          }
        });
        console.log("Finalizo el Reseteo + llenado de la DB");
      }, 1000);
    }, 5000);
  });
}

const main = async () => {
  //Sino existe la DB la creo, luego la reseteo y la lleno con datos de prueba
  try {
    const environment = process.env.NODE_ENV;
    const DBNAME = configDB[environment].database;
    const DBUSER = configDB[environment].username;
    const DBPASS = configDB[environment].password;
    const DBHOST = configDB[environment].host;

    const conn = await mysql.createConnection({
      host: DBHOST,
      port: 3306,
      user: DBUSER,
      password: DBPASS,
    });
    await conn.query(`CREATE DATABASE IF NOT EXISTS \`${DBNAME}\`;`);
    seed();
  } catch (error) {
    console.error(error);
  }
};

main();
