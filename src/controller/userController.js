const bcrypt = require("bcrypt");
const { generateJWT } = require("../helpers/generateJWT");
const nodemailerConfig = require("../services/nodemailerConfig")
const User = require("../models/MySQL/UserModel");

const saltRounds = 10;

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    //Check user and password
    const usuarioCheck = await User.findOne({
      where: { email },
    });
    if (usuarioCheck && bcrypt.compareSync(password, usuarioCheck.password)) {
      //User ok, generate token
      const token = await generateJWT(usuarioCheck.id);
      res.status(200).json({ token });
    } else {
      res.status(400).json({ msg: "usuario o password incorrecto" });
    }
  } catch (error) {
    console.error("error en userLogin ", error);
    res.status(500).json({ msg: "Ups algo salio mal... vuelve a intentarlo" });
  }
};

const userRegister = async (req, res) => {
  try {
    const { email, password } = req.body;

    if([email, password].includes('')){
      res.status(400).json({ msg: "Todos los campos son obligatorios" });
      return
    }
    //Check if user exist
    const usuarioCheck = await User.findOne({
      where: { email },
    });
    if (usuarioCheck) {
      res.status(400).json({ msg: `Usuario con email ${email} ya existe` });
      return;
    }

    //User no existe, lo creo
    const hash = bcrypt.hashSync(password, saltRounds);
    const usuario = await User.create({
      email,
      password: hash,
    });

    //Envio de email
    const mailOptions = {
      from: "Servidor node.js",
      to: email,
      subject: "Bienvenido a mundoDisney!",
      html: "Felicitaciones ya sos parte de mundoDisney, a partir de ahora podes disfrutar nuestros servicios"
    };
    await nodemailerConfig.sendMail(mailOptions);

    res.status(201).json({msg: `Usuario con email ${email} creado`})
  } catch (error) {
    console.error("error en userRegister ", error);
    res.status(500).json({ msg: "Ups algo salio mal... vuelve a intentarlo" });
  }
};

module.exports = { userLogin, userRegister };
