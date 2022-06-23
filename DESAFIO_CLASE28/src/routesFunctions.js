import path from "path";
const __dirname = path.resolve();

// PARA LA RUTA RAÍZ, NO HACE NADA
function getRoot(req, res) {}

// REGISTRO
function getSignup(req, res) {
  res.sendFile(__dirname + "/public/register.html");
}

function postSignup(req, res) {
  let user = req.user;
  console.log(user);
  res.redirect("/login");
  //   res.sendFile(__dirname + "index.html");
}

function getFailSignup(req, res) {
  console.log("error en signup");
  res.redirect("/error_registro");
  // res.json({ error: "USUARIO YA REGISTRADO" });
}

// LOGIN
function getLogin(req, res) {
  if (req.isAuthenticated() && req.session.username) {
    var user = req.user;
    console.log("Usuario logueado", user);
    res.redirect("/index_logueado");
  } else {
    console.log("Usuario NO logueado");
    res.sendFile(__dirname + "/public/login.html");
  }
}

function postLogin(req, res) {
  console.log("COMIENZA LOGIN");
  var user = req.user;
  req.session.username = user.username;

  console.log("poslogin linea43---", user.username);
  res.redirect("/index_logueado");
  // res.sendFile(__dirname + "/views/index.html");
}

function getFaillogin(req, res) {
  console.log("error en login");
  res.redirect("/error_login");

  // res.json({ error: "CREDENCIALES NO VALIDAS << Revise su usuario y password >>" });
}

function getLogout(req, res) {
  req.logout();
  req.session.destroy();
  res.redirect("/login");
}

function failRoute(req, res) {
  res.status(404).json({ error: "RUTA INVALIDA" });
}

export default { getRoot, getSignup, getLogin, postSignup, getFailSignup, postLogin, getFaillogin, getLogout, failRoute };
