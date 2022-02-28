const jwt = require("jsonwebtoken");
const Usuario = require("../models/MySQL/UserModel");

const validarJWT = async (req, res, next) => {
  const token = req.header("token");
  if (!token) {
    return res.status(401).json({
      msg: "No posee autorizacion para realizar esta accion",
    });
  }
  try {
    const { uid } = jwt.verify(token, process.env.JWT_SECRET_WORD);
    const userAuth = await Usuario.findByPk(uid);

    if (!userAuth) {
      return res.status(401).json({
        msg: "Token no valido usuario inexistente",
      });
    }
    req.userAuth = userAuth; // lo paso a las siguientes funciones
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Ups... algo salio mal vuelve a intentarlo",
    });
  }
};

module.exports = { validarJWT };
