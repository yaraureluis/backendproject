import express from "express";
import session from "express-session";
import passport from "passport";
import { routerProducts } from "./routes/products.js";
import { routerCarts } from "./routes/carts.js";
import { routerRegister } from "./routes/register.js";
import { routerLogin } from "./routes/login.js";
import MongoStore from "connect-mongo";
import config from "./config.js";
import User from "./models/modelsUsers.js";
import dotenv from "dotenv";
dotenv.config();
import logger from "../logger/logger.js";

export const adminUser = true;
//----- PARA INICIAR EN MODO CLUSTER CON LA VARIABLE DE ENTORNO SERVER_MODE=CLUSTER -------
import cluster from "cluster";
import CpuInfo from "os";
const numCpus = CpuInfo.cpus().length;

if (cluster.isPrimary && process.env.SERVER_MODE == "CLUSTER") {
  logger.info(`PID MASTER ${process.pid}`);

  for (let i = 0; i < numCpus; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker) => {
    logger.info("Worker", worker.process.pid, "died", new Date().toLocaleString());
    cluster.fork();
  });
  //---------------------------------------------------------------------------------
} else {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(
    session({
      store: MongoStore.create({
        mongoUrl: config.mongodb.cnxStr,
        mongoOptions: config.mongodb.options,
      }),
      secret: "keyboard cat",
      cookie: {
        httpOnly: false,
        secure: false,
        maxAge: 600000,
      },
      rolling: true,
      resave: true,
      saveUninitialized: false,
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, done);
  });

  app.use(passport.initialize());
  app.use(passport.session());

  app.use("/api/productos", routerProducts);
  app.use("/api/carritos", routerCarts);
  app.use("/", routerRegister);
  app.use("/", routerLogin);

  app.all("*", (req, res) => {
    res.status(404).json({ error: "404 Not Found", description: `Método ${req.method} no disponible - Ruta ${req.url} inexistente` });
  });

  const PORT = process.env.PORT || 8080;
  const server = app.listen(PORT, () => {
    logger.info(`Servidor escuchando en el puerto ${server.address().port} - PID: ${process.pid} - ${new Date().toLocaleString()}`);
  });

  server.on("error", (error) => logger.error(`Error en el servidor ${error}`));
}
