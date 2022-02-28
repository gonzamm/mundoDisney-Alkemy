const jwt = require("jsonwebtoken");


const generateJWT = (uid = "") => {
  return new Promise((resolve, reject) => {
    const payload = {uid};
    jwt.sign(
      payload,
      process.env.JWT_SECRET_WORD,
      {
        expiresIn: 60 * 60 * 24,
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("Token no generado");
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = {generateJWT};
