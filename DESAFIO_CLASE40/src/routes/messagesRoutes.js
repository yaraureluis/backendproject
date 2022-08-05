import { Router } from "express";
// import { messages_container } from "../controllers/messages/messagesControllersSQLite.js";
import { messageDaos } from "../daos/daosMessages/index.js";
export const messages_router = new Router();

messages_router.post("/chat", messageDaos.add);
