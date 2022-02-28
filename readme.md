# Mundo disney alkemy
## _Una simple API para explorar el mundo de disney_

## Tecnologia
#### Backend
- NodeJS - Version 14.17.6
- Express - Version 4.17.3
- Sequelize - Version 6.15.1
- mysql2 - Version 2.3.3
- jsonwebtoken - Version 8.5.1
- Nodemailer - Version 6.7.2
- bcrypt - Version 5.0.1
- Cors - Version 2.8.5
- Dotenv - Version 12.0.3

## Instalacion

Esta app require [Node.js](https://nodejs.org/)

Instalar las dependencias antes de inicar el servidor, tambien puedes sembrar la DB para el test

```sh
npm i
npm run feelDB
npm start
```

## El archivo .env requiere
- PORT= 'El puerto donde iniciara el servidor'  
- NODE_ENV = 'El entorno de desarollo en el que iniciara el servidor, puede ser test, development, production'  
- JWT_SECRET_WORD = 'Una palabra secreta para el token'  
- NODEMMAILER_USER = 'Una email de gmail'  
- NODEMAILER_PASS = 'La contraseña del mail'

## Documentacion
https://documenter.getpostman.com/view/17626076/UVkqtFXV 
- En la documentacion podran ver ejemplos de los endpoints
