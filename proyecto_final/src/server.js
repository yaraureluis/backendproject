import express from "express";
import dotenv from "dotenv";
import logger from "../logger/logger.js";
import mongoose from "mongoose";
import config from "./config.js";
import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";
import exphbs from "express-handlebars";
import { productsRouter } from "./routes/products-routes.js";
import { cartsRouter } from "./routes/carts-routes.js";
import { usersRouter } from "./routes/user-routes.js";
import { loginRouter } from "./routes/login-routes.js";
import { ordersRouter } from "./routes/orders-routes.js";
import { imagesRouter } from "./routes/images-routes.js";
import { chatRouter } from "./routes/chat-routes.js";
import { infoRouter } from "./routes/info-routes.js";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config();
const PORT = process.env.PORT || 8080;
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const messages = [];

if (config.persistence === "mongodb") {
  mongoose.connect(config.mongodb.cnxStr, config.mongodb.options);
}

app.set("views", join(__dirname, "/views"));
const hbs = exphbs.create({
  extname: ".handlebars",
  defaultLayout: "index",
  layoutsDir: join(__dirname, "/views/layouts"),
  partialsDir: join(__dirname, "/views/partials"),
});
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

io.on("connection", async (socket) => {
  logger.info("Nuevo cliente conectado!");
  socket.emit("MESSAGES", messages);
  socket.on("MESSAGE", async (message) => {
    messages.push(message);
    io.emit("MESSAGES", messages);
  });
});

app.use("/api/products", productsRouter);
app.use("/api/shoppingcartproducts", cartsRouter);
app.use("/api/users", usersRouter);
app.use("/login", loginRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/images", imagesRouter, express.static("public/images"));
app.use("/", chatRouter);
app.use("/info", infoRouter);

app.all("*", (req, res) => {
  res.status(404).json({ error: "404 Not Found", description: `Método ${req.method} no disponible - Ruta ${req.url} inexistente` });
});

const server = httpServer.listen(PORT, () => {
  logger.info(`Servidor escuchando en el puerto ${server.address().port} - PID: ${process.pid} - ${new Date().toLocaleString()}`);
});

server.on("error", (error) => logger.error(`Error en el servidor ${error}`));
