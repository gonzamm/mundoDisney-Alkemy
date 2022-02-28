const nodemailer = require("nodemailer");

//Transporter de nodemailer
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: `${process.env.NODEMMAILER_USER}`,
        pass: `${process.env.NODEMAILER_PASS}`
    }
  });

  module.exports = transporter;