import path from "path";
import logger from "../logger/logger.js";
const __dirname = path.resolve();
export let usuario_prueba = "";

// LOGIN
function getLogin(req, res) {
  logger.info(`Petición hecha a ${req.url} con el método ${req.method}`);

  if (req.isAuthenticated() && req.session.username) {
    var user = req.user;
    console.log("Usuario logueado", user);
    res.redirect("/");
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
  usuario_prueba = user.username;
  req.session.username = user.username;
  res.locals.user = user;

  console.log("poslogin linea 27 ---", user.username);
  res.redirect("/");
}

function getFaillogin(req, res) {
  logger.info(`Petición hecha a ${req.url} con el método ${req.method}`);

  console.log("error en login");
  res.sendFile(__dirname + "/public/error_login.html");
}

function getLogout(req, res) {
  logger.info(`Petición hecha a ${req.url} con el método ${req.method}`);
  usuario_prueba = "";
  req.logout();
  req.session.destroy();
  res.redirect("/login");
}

export default { getLogin, postLogin, getFaillogin, getLogout };
