import { Router } from "express";
// import { products_container } from "../controllers/products/productsControllersMariaDB.js";
import { productsDaos } from "../daos/daosProducts/index.js";
export const products_router = new Router();

products_router.post("/products", productsDaos.add);
