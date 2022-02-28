const express = require("express");
const dotenv = require("dotenv").config();
const sequelize = require("./src/database/db");
const cors = require("cors")

//ROUTES IMPORT
const charactersRoutes = require("./src/routes/charactersRoutes");
const moviesRoutes = require("./src/routes/moviesRoutes");
const usersRoutes = require("./src/routes/usersRoutes");

app = express();
PORT = process.env.PORT || 8080;

//MIDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())
  //Routes
app.use('/characters', charactersRoutes);
app.use('/movies', moviesRoutes);
app.use('/auth', usersRoutes);
  //Handle error 404
app.use((req, res, next) => {
  res.status(404).json({error: -2, descripcion: `ruta ${req.originalUrl} metodo ${req.method} no implementada`});
});

//SERVER START
app.listen(PORT, () => {
  console.log(`Server is run on port ${PORT}`);
  sequelize
    .sync({ force: false })
    .then(() => {
      console.log("Connection to DB ok");
    })
    .catch((error) => {
      console.error("Error connecting to DB", error);
    });
});
