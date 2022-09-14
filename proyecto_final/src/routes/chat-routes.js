import { Router } from "express";
import { chatController } from "../controllers/chat-controller.js";

export const chatRouter = new Router();

chatRouter.get("/", chatController.getChat);
