import express from "express";
import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";
import { engine } from "express-handlebars";

import dotenv from "dotenv";
import { productsRouter } from "./routes/products-routes.js";
import { cartsRouter } from "./routes/carts-routes.js";
import { usersRouter } from "./routes/user-routes.js";
import { loginRouter } from "./routes/login-routes.js";
import { ordersRouter } from "./routes/orders-routes.js";
import { uploadImage } from "./middlewares/img-multer.js";
dotenv.config();
const PORT = process.env.PORT || 8080;

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const handlebarsConfig = {
  defaultLayout: "index.html",
};
const messages = [];
app.engine("handlebars", engine(handlebarsConfig));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado!");
  socket.emit("MESSAGE", messages);
  socket.on("MESSAGE", (message) => {
    message.date = new Date().toLocaleString();
    console.log(message);
    messages.push(message);
    io.emit("MESSAGE", messages);
  });

  app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
  });
});

app.use("/api/products", productsRouter);
app.use("/api/shoppingcartproducts", cartsRouter);
app.use("/api/users", usersRouter);
app.use("/login", loginRouter);
app.use("/api/orders", ordersRouter);
app.post("/api/images", uploadImage, (req, res) => {
  req.file.filePublicPath = `http://localhost:${PORT}/images/${req.file.filename}`;
  res.json({ imageRoute: req.file.filePublicPath });
});

app.all("*", (req, res) => {
  res.status(404).json({ error: "404 Not Found", description: `Método ${req.method} no disponible - Ruta ${req.url} inexistente` });
});

const server = httpServer.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${server.address().port} - PID: ${process.pid} - ${new Date().toLocaleString()}`);
});

server.on("error", (error) => logger.error(`Error en el servidor ${error}`));
