const { Sequelize } = require("sequelize");
const configDB = require("./configDB")

const environment = process.env.NODE_ENV
const DBNAME = configDB[environment].database;
const DBUSER = configDB[environment].username;
const DBPASS = configDB[environment].password;
const DBHOST = configDB[environment].host;
const DBDIALECT = configDB[environment].dialect;

const sequelize = new Sequelize(DBNAME, DBUSER, DBPASS, {
  host: DBHOST,
  dialect: DBDIALECT,
  logging: false //Evita console.log de querys
});

module.exports = sequelize
