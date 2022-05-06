import express from "express";
import { routerProducts } from "./routes/products.js";
import { routerCarts } from "./routes/carts.js";
import { ProductsClass } from "./controllers/products.js";
import { CartsClass } from "./controllers/carts.js";

export const new_product = new ProductsClass("./database/products.json");
await new_product.setProductos();

export const new_cart = new CartsClass("./database/carts.json");
await new_cart.setCarts();
export const adminUser = true;

const app = express();
app.use(express.json());
app.use("/api/productos", routerProducts);
app.use("/api/carritos", routerCarts);

const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${server.address().port}`);
});

server.on("error", (error) => console.log(`Error en el servidor ${error}`));
