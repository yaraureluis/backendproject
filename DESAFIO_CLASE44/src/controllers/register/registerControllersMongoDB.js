import path from "path";
import logger from "../../logger/logger.js";
const __dirname = path.resolve();

//REGISTER

// REGISTRO
function getSignup(req, res) {
  logger.info(`Petición hecha a ${req.url} con el método ${req.method}`);

  res.sendFile(__dirname + "/public/register.html");
}

function postSignup(req, res) {
  logger.info(`Petición hecha a ${req.url} con el método ${req.method}`);

  let user = req.user;
  console.log(user);
  res.redirect("/login");
  //   res.sendFile(__dirname + "index.html");
}

function getFailSignup(req, res) {
  logger.info(`Petición hecha a ${req.url} con el método ${req.method}`);

  console.log("error en signup");
  res.sendFile(__dirname + "/public/error_registro.html");
  // res.json({ error: "USUARIO YA REGISTRADO" });
}

export default { getSignup, postSignup, getFailSignup };
