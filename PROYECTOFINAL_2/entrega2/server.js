import express from "express";
import { routerProducts } from "./routes/products.js";
import { routerCarts } from "./routes/carts.js";

export const adminUser = true;

const app = express();
app.use(express.json());
app.use("/api/productos", routerProducts);
app.use("/api/carritos", routerCarts);

app.all("*", (req, res) => {
  res.json({ error: "404 Not Found", description: `Método ${req.method} no disponible - Ruta inexistente` });
});

const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${server.address().port}`);
});

server.on("error", (error) => console.log(`Error en el servidor ${error}`));
