import path from "path";
import logger from "./logger/logger.js";
const __dirname = path.resolve();

// PARA LA RUTA RAÍZ, NO HACE NADA
function getRoot(req, res) {}

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
  res.redirect("/error_registro");
  // res.json({ error: "USUARIO YA REGISTRADO" });
}

// LOGIN
function getLogin(req, res) {
  logger.info(`Petición hecha a ${req.url} con el método ${req.method}`);

  if (req.isAuthenticated() && req.session.username) {
    var user = req.user;
    console.log("Usuario logueado", user);
    res.redirect("/index_logueado");
  } else {
    console.log("Usuario NO logueado");
    logger.error("usuario no logueado");
    res.sendFile(__dirname + "/public/login.html");
  }
}

function postLogin(req, res) {
  logger.info(`Petición hecha a ${req.url} con el método ${req.method}`);

  console.log("COMIENZA LOGIN");
  var user = req.user;
  req.session.username = user.username;

  console.log("poslogin linea43---", user.username);
  res.redirect("/index_logueado");
  // res.sendFile(__dirname + "/views/index.html");
}

function getFaillogin(req, res) {
  logger.info(`Petición hecha a ${req.url} con el método ${req.method}`);

  console.log("error en login");
  res.redirect("/error_login");

  // res.json({ error: "CREDENCIALES NO VALIDAS << Revise su usuario y password >>" });
}

function getLogout(req, res) {
  logger.info(`Petición hecha a ${req.url} con el método ${req.method}`);

  req.logout();
  req.session.destroy();
  res.redirect("/login");
}

function failRoute(req, res) {
  logger.info(`Petición hecha a ${req.url} con el método ${req.method}`);
  logger.warn(`Petición hecha a ruta inexistente: ${req.url}, con el método ${req.method}`);
  `Petición hecha a ${req.url} con el método ${req.method}`;

  res.status(404).json({ error: "RUTA INVALIDA" });
}

export default { getRoot, getSignup, getLogin, postSignup, getFailSignup, postLogin, getFaillogin, getLogout, failRoute };
