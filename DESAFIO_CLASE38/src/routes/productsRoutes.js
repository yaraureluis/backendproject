import { Router } from "express";
import { products_container } from "../controllers/productsControllers.js";
export const products_router = new Router();

products_router.post("/products", products_container.add);
