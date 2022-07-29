import express from "express";
import session from "express-session";
import passport from "passport";
import mongoDBconfig from "./config/mongoDBconfig.js";
import conectarDB from "./controllers/mongoDBcontrollers.js";
import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";
import exphbs from "express-handlebars";
import { products_container } from "./controllers/productsControllers.js";
import { messages_container } from "./controllers/messagesControllers.js";
import MongoStore from "connect-mongo";
import { login_router, failRoute_router, register_router, products_router, messages_router } from "./routes/index.js";
import { checkAuthentication } from "./middlewares/checkAuthenticaction.js";
import cluster from "cluster";
import logger from "./logger/logger.js";
import { usuario_prueba } from "./controllers/loginControllers.js";
import path from "path";
const __dirname = path.resolve();
import CpuInfo from "os";
const numCpus = CpuInfo.cpus().length;
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

const app = express();

const httpServer = new HttpServer(app);
export const io = new IOServer(httpServer);
await products_container.createTable();
const productos = await products_container.getAll();
await messages_container.createTable();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const mensajes = await messages_container.getAll();
const handlebarsConfig = {
  defaultLayout: "index.html",
};
app.engine("handlebars", exphbs(handlebarsConfig));

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: mongoDBconfig.URL_BASE_DE_DATOS,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
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
} else {
  app.use(express.static("public"));

  io.on("connection", async (socket) => {
    console.log(`Nuevo cliente conectado! - PID: ${process.pid} - ${new Date().toLocaleString()}`);

    socket.emit("HISTORIAL", productos);
    socket.emit("MENSAJES", mensajes);
    socket.emit("NOMBRE_USUARIO", usuario_prueba);

    app.use("/", login_router);
    app.use("/", register_router);
    app.use("/", products_router);
    app.use("/", messages_router);
    app.get("/ruta-protegida", checkAuthentication, (req, res) => res.send("<h1>Ruta OK!</h1>"));
    app.use("*", failRoute_router);
  });
  conectarDB(mongoDBconfig.URL_BASE_DE_DATOS, (err) => {
    if (err) return console.log("error en conexión de base de datos", err);
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
