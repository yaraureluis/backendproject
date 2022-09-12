import express from "express";
import session from "express-session";
import dotenv from "dotenv";
import config from "./config.js";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import { productsRouter } from "./routes/products-routes.js";
import { cartsRouter } from "./routes/carts-routes.js";
import { usersRouter } from "./routes/user-routes.js";
import { loginRouter } from "./routes/login-routes.js";
import passport from "passport";
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//CONEXION A MONGO DB SI LA PERSISTENCIA ES EN MONGO DB
if (config.persistence == "mongodb") {
  mongoose.connect(config.mongodb.cnxStr, config.mongodb.options);

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
        maxAge: config.sessionTimeOut,
      },
      rolling: true,
      resave: true,
      saveUninitialized: false,
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());
}

app.use("/api/products", productsRouter);
app.use("/api/shoppingcartproducts", cartsRouter);
app.use("/api/users", usersRouter);
app.use("/login", loginRouter);

app.all("*", (req, res) => {
  res.status(404).json({ error: "404 Not Found", description: `Método ${req.method} no disponible - Ruta ${req.url} inexistente` });
});

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${server.address().port} - PID: ${process.pid} - ${new Date().toLocaleString()}`);
});

server.on("error", (error) => logger.error(`Error en el servidor ${error}`));
