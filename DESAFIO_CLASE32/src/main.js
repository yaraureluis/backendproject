import express from "express";
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import mongoDBconfig from "./config/mongoDBconfig.js";
import conectarDB from "./controllers/mongoDBcontrollers.js";
import routesFunctions from "./routesFunctions.js";
import User from "./models.js";
import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";
import exphbs from "express-handlebars";
import { producto_instancia } from "./controllers/productsControllers.js";
import { mensaje_instancia } from "./controllers/messageControllers.js";
import MongoStore from "connect-mongo";
// ----------------- IMPORTACIONES DESAFIO 30 ---------------------/
import cluster from "cluster";
import CpuInfo from "os";
const numCpus = CpuInfo.cpus().length;
//------------------------------------------------------------------/
// ----------------- UTILIZANDO YARGS ------------------------------/
import parse from "yargs";
const yargs = parse(process.argv.slice(2));
const { puerto, modo, _ } = yargs
  .alias({
    p: "puerto",
    m: "modo",
  })
  .default({
    puerto: 8080,
    modo: "FORK",
  }).argv;
// ----------------- FIN UTILIZANDO YARGS --------------------------/
//------------------------------------------------------------------/

// ---------- UTILIZANDO COMPRESSION Y LOGGER ----------------------/
import compression from "compression";
import logger from "./logger/logger.js";
// ------------- FIN UTILIZANDO COMPRESSION Y LOGGER ----------------/

//------------------------------------------------------------------/
//------------------ OBJETO CON DATOS PARA INFO ---------------------/

const datos = {
  argumentos_de_entrada: process.argv.slice(2),
  nombre_del_sist_operativo: process.env.OS,
  version_de_node_js: process.versions.node,
  memoria_total_reservada: process.memoryUsage().rss,
  path_de_ejecucion: process.execPath,
  process_id: process.pid,
  carpeta_del_proyecto: process.cwd(),
  numero_de_procesadores: numCpus,
};

//------------------ FIN OBJETO CON DATOS PARA INFO ----------------/
//------------------------------------------------------------------/
import { fork } from "child_process";
import path from "path";
const __dirname = path.resolve();
//-----------------CONEXI??N MONGO -------------------------------------/
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

//--------------------------- P R I N C I P A L ------------------------/
if (cluster.isPrimary && modo == "CLUSTER") {
  console.log(numCpus);
  console.log(`PID MASTER ${process.pid}`);

  for (let i = 0; i < numCpus; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker) => {
    console.log("Worker", worker.process.pid, "died", new Date().toLocaleString());
    cluster.fork();
  });
}
// ------------------------------------------------------------------------------------------ /
else {
  // ----------------------------------------------------------------------------------------/
  // MAGIA
  app.use(express.static("public"));

  io.on("connection", (socket) => {
    console.log(`Nuevo cliente conectado! - PID: ${process.pid} - ${new Date().toLocaleString()}`);

    socket.emit("HISTORIAL", productos);
    socket.emit("MENSAJES", mensajes);

    app.get("/index_logueado", (req, res) => {
      logger.info(`Petici??n hecha a ${req.url} con el m??todo ${req.method}`);
      console.log("entrando");
      console.log("linea 166", req.session);

      if (!req.user.username) {
        console.log("main 143---- Sr. no esta logueado");
        res.json({ message: "Error al loguear, CREDENCIALES NO V??LIDAS" });
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
        console.log("username en autenticaci??n", req.session.username);
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
    app.get("/logout", routesFunctions.getLogout, (req, res) => {});

    // ------------------------- INFO ROUTE-----------------------------------------------/
    app.get("/info", (req, res) => {
      logger.info(`Petici??n hecha a ${req.url} con el m??todo ${req.method}`);
      console.log("DATOS", datos);
      res.json(datos);
    });

    // ------------------------- INFO ROUTE USING COMPRESS -----------------------------------------------/
    app.get("/info-compress", compression(), (req, res) => {
      logger.info(`Petici??n hecha a ${req.url} con el m??todo ${req.method}`);
      console.log("DATOS", datos);
      res.json(datos);
    });

    // ----------------------- NUMEROS ALEATORIOS NO BLOQUEANTE ------------------------- /

    app.get("/api/randoms/", (req, res) => {
      logger.info(`Petici??n hecha a ${req.url} con el m??todo ${req.method}`);
      const computo = fork(path.resolve(process.cwd(), "src/controllers/randomControllers.js"));
      let cantidad = req.query.cant || 100000000;
      computo.on("message", (resultado) => {
        if (resultado === "listo") {
          computo.send(cantidad);
        } else {
          res.json(resultado);
        }
      });
    });

    // ----------------------- NUMEROS ALEATORIOS NO BLOQUEANTE COMPRESS ------------------------- /

    app.get("/api/randoms-compress/", compression(), (req, res) => {
      logger.info(`Petici??n hecha a ${req.url} con el m??todo ${req.method}`);
      const computo = fork(path.resolve(process.cwd(), "src/controllers/randomControllers.js"));
      let cantidad = req.query.cant || 100000000;
      computo.on("message", (resultado) => {
        if (resultado === "listo") {
          computo.send(cantidad);
        } else {
          res.json(resultado);
        }
      });
    });

    app.post("/productos", (req, res) => {
      logger.info(`Petici??n hecha a ${req.url} con el m??todo ${req.method}`);
      productos.push(req.body);
      producto_instancia.agregar([req.body]);
      io.sockets.emit("HISTORIAL", productos);
      console.log(productos);
      res.redirect("/");
    });

    app.post("/chat", (req, res) => {
      logger.info(`Petici??n hecha a ${req.url} con el m??todo ${req.method}`);
      mensajes.push(req.body);
      mensaje_instancia.agregar(req.body);
      io.sockets.emit("MENSAJES", mensajes);
      console.log(mensajes);
      res.redirect("/");
    });

    app.get("/productos", (req, res) => {
      logger.info(`Petici??n hecha a ${req.url} con el m??todo ${req.method}`);
      res.render("historial", { productos });
    });

    // ------------------------- FAIL ROUTE-----------------------------------------------/
    app.all("*", routesFunctions.failRoute, (req, res) => {
      logger.info(`Petici??n hecha a ${req.url} con el m??todo ${req.method}`);
    });

    app.use(express.static("public"));
  });
  conectarDB(mongoDBconfig.URL_BASE_DE_DATOS, (err) => {
    if (err) return console.log("error en conexi??n de base de datos", err);
    console.log("BASE DE DATOS CONECTADA");
    const PORT = puerto;
    const connectedServer = httpServer.listen(PORT, function () {
      console.log(`Servidor Http con Websockets escuchando en el puerto: ${connectedServer.address().port} - PID: ${process.pid} - ${new Date().toLocaleString()}`);
    });
    connectedServer.on("error", (error) => {
      logger.error(`Error en servidor ${error}`);
      console.log(`Error en servidor ${error}`);
    });
  });
}
