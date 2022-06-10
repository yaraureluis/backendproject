import express from "express";
import session from "express-session";
import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";
import exphbs from "express-handlebars";
import { producto_instancia } from "./controllers/productsControllers.js";
import { mensaje_instancia } from "./controllers/messageControllers.js";
import path from "path";
const __dirname = path.resolve();
//-----------------CONEXIÓN MONGO -------------------------------------/
import MongoStore from "connect-mongo";
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
app.use(
  session({
    store: MongoStore.create({
      //En Atlas connect App :  Make sure to change the node version to 2.2.12:
      mongoUrl: "mongodb+srv://yaraureluis:yaraureluis@cluster0.xjcx5.mongodb.net/sesiones?retryWrites=true&w=majority",

      mongoOptions: advancedOptions,
    }),
    /* ----------------------------------------------------- */

    secret: "shhhhhhhhhhhhhhhhhhhhh",
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 60000,
    },
  })
);
// app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado!");

  socket.emit("HISTORIAL", productos);
  socket.emit("MENSAJES", mensajes);
  console.log("----", session.nombre_usuario);

  // app.get("/", (req, res) => {
  //   console.log("entrando");
  //   res.sendFile(__dirname + "/public/index.html");
  // });

  app.get("/", (req, res) => {
    if (!req.session.nombre_usuario) res.redirect("/login");
    res.sendFile(__dirname + "/public/index.html");
    console.log("+++", req.session.nombre_usuario);
    setTimeout(() => {
      io.sockets.emit("NOMBRE_USUARIO", req.session.nombre_usuario);
    }, 2000);
  });

  app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/public/login.html");
  });

  app.post("/productos", (req, res) => {
    productos.push(req.body);
    producto_instancia.agregar([req.body]);
    io.sockets.emit("HISTORIAL", productos);
    console.log(productos);
    res.redirect("/");
  });

  app.post("/login", (req, res) => {
    if (req.session.contador) {
      req.session.contador++;
    } else {
      req.session.nombre_usuario = req.body.nombre_usuario;
      req.session.contador = 1;
    }
    res.redirect("/");
    console.log("NOMBRE USUARIO", req.session.nombre_usuario);
  });

  app.get("/logout", (req, res) => {
    io.sockets.emit("NOMBRE_USUARIO_OUT", req.session.nombre_usuario);
    req.session.destroy((err) => {
      if (!err) {
        setTimeout(() => {
          res.redirect("/login");
        }, 2000);
      } else console.log("session no eliminada");
    });
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

const PORT = 8080;
const connectedServer = httpServer.listen(PORT, function () {
  console.log(`Servidor Http con Websockets escuchando en el puerto ${connectedServer.address().port}`);
});
connectedServer.on("error", (error) => console.log(`Error en servidor ${error}`));
