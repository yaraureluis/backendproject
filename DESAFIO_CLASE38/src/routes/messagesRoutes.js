import { Router } from "express";
import { messages_container } from "../controllers/messagesControllers.js";
export const messages_router = new Router();

messages_router.post("/chat", messages_container.add);
