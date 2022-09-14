import { Router } from "express";
import { ordersController } from "../controllers/orders-controller.js";
import { isAuth } from "../middlewares/isAuth.js";
export const ordersRouter = new Router();

ordersRouter.get("/", isAuth, ordersController.getOrders);
ordersRouter.post("/", isAuth, ordersController.addOrder);
