import { Router } from "express";
import { cartsController } from "../controllers/carts-controllers.js";
import { isAuth } from "../middlewares/isAuth.js";
export const cartsRouter = new Router();
cartsRouter.get("/", isAuth, cartsController.getProducts);
cartsRouter.post("/", isAuth, cartsController.addProduct);
cartsRouter.delete("/:productId", isAuth, cartsController.deleteProduct);
