import { Router } from "express";
// import { products_container } from "../controllers/products/productsControllersMariaDB.js";
import { productsDaos } from "../daos/daosProducts/index.js";
export const products_router = new Router();

products_router.post("/products", productsDaos.addProduct);
products_router.get("/products", productsDaos.getAllProducts);
products_router.put("/products/:id", productsDaos.actualizarPrecioPorId);
products_router.delete("/products/:id", productsDaos.borrarArticuloPorId);
products_router.delete("/products", productsDaos.borrarTodos);
products_router.get("/products/:id", productsDaos.getProductById);
