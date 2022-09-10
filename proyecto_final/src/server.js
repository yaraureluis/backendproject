import express from "express";
import dotenv from "dotenv";
import { productsRouter } from "./routes/productsRoutes.js";
import { cartsRouter } from "./routes/cartsRoutes.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productsRouter);
app.use("/api/shoppingcartproducts", cartsRouter);
app.all("*", (req, res) => {
  res.status(404).json({ error: "404 Not Found", description: `Método ${req.method} no disponible - Ruta ${req.url} inexistente` });
});

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${server.address().port} - PID: ${process.pid} - ${new Date().toLocaleString()}`);
});

server.on("error", (error) => logger.error(`Error en el servidor ${error}`));
