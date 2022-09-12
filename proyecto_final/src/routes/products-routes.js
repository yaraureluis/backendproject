import { Router } from "express";
import { productsController } from "../controllers/products-controller.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { isAuth } from "../middlewares/isAuth.js";

export const productsRouter = new Router();
productsRouter.get("/", productsController.getAll);
productsRouter.get("/:id", productsController.getById);
productsRouter.post("/", isAdmin, productsController.add);
productsRouter.put("/:id", isAdmin, productsController.updateById);
productsRouter.delete("/:id", isAdmin, productsController.deleteById);
