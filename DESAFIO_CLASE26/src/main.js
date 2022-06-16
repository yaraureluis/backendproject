import express from "express";
import session from "express-session";
// import bCrypt from "bcrypt"; QUEDA PARA DESPUES DEL AFTER
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import mongoDBconfig from "./config/mongoDBconfig.js";
import conectarDB from "./controllers/mongoDBcontrollers.js";
import routesFunctions from "./routesFunctions.js";
import User from "./models.js";
// LocalStrategy = LocalStrategy.Strategy;
import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";
import exphbs from "express-handlebars";
import { producto_instancia } from "./controllers/productsControllers.js";
import { mensaje_instancia } from "./controllers/messageControllers.js";
import MongoStore from "connect-mongo";
import path from "path";
const __dirname = path.resolve();
//-----------------CONEXIÓN MONGO -------------------------------------/
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
//---------------------------------------------------------------------/
const app = express();

const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
await producto_instancia.crearTabla();
const productos = await producto_instancia.listar();
await mensaje_instancia.crearTabla();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const mensajes = await mensaje_instancia.listar();
const handlebarsConfig = {
  defaultLayout: "index.html",
};
app.engine("handlebars", exphbs(handlebarsConfig));

// --------------------------------------------------------------------/
// --------------------------- RUTAS ENTREGA --------------------------/
// --------------------------------------------------------------------/

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: mongoDBconfig.URL_BASE_DE_DATOS,
      mongoOptions: advancedOptions,
    }),
    secret: "keyboard cat",
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: mongoDBconfig.TIEMPO_EXPIRACION,
    },
    rolling: true,
    resave: true,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  "signup",
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    (req, username, password, done) => {
      User.findOne({ username: username }, function (err, user) {
        if (err) {
          console.log("Error al registrar usuario: " + err);
          return done(err);
        }

        if (user) {
          console.log("Usuario existe");
          return done(null, false);
        }

        const newUser = {
          username: req.body.username,
          password: password,
          // password: createHash(password) QUEDA PARA CUANDO VEA BCRYPT,
        };

        User.create(newUser, (err, userWithId) => {
          if (err) {
            console.log("Error in Saving user: " + err);
            return done(err);
          }
          console.log(user);
          console.log("User Registration succesful");
          return done(null, userWithId);
        });
      });
    }
  )
);

passport.use(
  "login",
  new LocalStrategy((username, password, done) => {
    User.findOne({ username }, (err, user) => {
      if (err) return done(err);

      if (!user) {
        console.log("User Not Found with username " + username);
        return done(null, false);
      }

      if (!isValidPassword(user, password)) {
        console.log("Invalid Password");
        return done(null, false);
      }

      return done(null, user);
    });
  })
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, done);
});

function isValidPassword(user, password) {
  return password == user.password;
}

//----------------------------------------------------------------/

// MAGIA
app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado!");
  socket.emit("HISTORIAL", productos);
  socket.emit("MENSAJES", mensajes);

  app.get("/index_logueado", (req, res) => {
    console.log("entrando");
    console.log("linea 166", req.session);

    if (!req.user.username) {
      console.log("main 143---- Sr. no esta logueado");
      res.json({ message: "Error al loguear, CREDENCIALES NO VÁLIDAS" });
    } else {
      res.sendFile(__dirname + "/public/index.html");
      console.log("+++", req.session);
      setTimeout(() => {
        io.sockets.emit("NOMBRE_USUARIO", req.session.username);
      }, 2000);
    }
  });

  // -------------------------SINGUP-------------------------------------/
  app.get("/signup", routesFunctions.getSignup);
  app.post("/signup", passport.authenticate("signup", { failureRedirect: "/failsignup" }), routesFunctions.postSignup);
  app.get("/failsignup", routesFunctions.getFailSignup);
  app.get("/error_registro", (req, res) => {
    res.sendFile(__dirname + "/public/error_registro.html");
  });
  // -------------------------LOGIN-------------------------------------/

  app.get("/login", routesFunctions.getLogin);
  app.post("/login", passport.authenticate("login", { failureRedirect: "/faillogin" }), routesFunctions.postLogin);
  app.get("/faillogin", routesFunctions.getFaillogin);
  app.get("/error_login", (req, res) => {
    res.sendFile(__dirname + "/public/error_login.html");
  });
  function checkAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
      req.session.username = req.body.username;
      console.log("username en autenticación", req.session.username);
      next();
    } else {
      res.redirect("/login");
    }
  }

  app.get("/ruta-protegida", checkAuthentication, (req, res) => {
    const { user } = req;
    console.log(user);
    res.send("<h1>Ruta OK!</h1>");
  });

  // -------------------------LOGOUT-------------------------------------/
  app.get("/logout", routesFunctions.getLogout);

  // ------------------------- FAIL ROUTE-----------------------------------------------/
  app.get("*", routesFunctions.failRoute);

  // app.get("/", (req, res) => {
  //   console.log("entrando");
  //   res.sendFile(__dirname + "/public/index.html");
  // });

  app.post("/productos", (req, res) => {
    productos.push(req.body);
    producto_instancia.agregar([req.body]);
    io.sockets.emit("HISTORIAL", productos);
    console.log(productos);
    res.redirect("/");
  });

  app.post("/chat", (req, res) => {
    mensajes.push(req.body);
    mensaje_instancia.agregar(req.body);
    io.sockets.emit("MENSAJES", mensajes);
    console.log(mensajes);
    res.redirect("/");
  });

  app.get("/productos", (req, res) => {
    res.render("historial", { productos });
  });

  app.use(express.static("public"));
});
conectarDB(mongoDBconfig.URL_BASE_DE_DATOS, (err) => {
  if (err) return console.log("error en conexión de base de datos", err);
  console.log("BASE DE DATOS CONECTADA");
  const PORT = 8080;
  const connectedServer = httpServer.listen(PORT, function () {
    console.log(`Servidor Http con Websockets escuchando en el puerto ${connectedServer.address().port}`);
  });
  connectedServer.on("error", (error) => console.log(`Error en servidor ${error}`));
});
