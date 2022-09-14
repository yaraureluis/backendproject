import { Router } from "express";
import { loginController } from "../controllers/login-controller.js";
import dotenv from "dotenv";
dotenv.config();
export const loginRouter = new Router();

loginRouter.post("/", loginController.login);

