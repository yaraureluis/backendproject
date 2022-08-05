import { Router } from "express";
import path from "path";
import logger from "../logger/logger.js";
const __dirname = path.resolve();
import failRoutesControllers from "../controllers/failRoutesControllers.js";

export const failRoute_router = new Router();

failRoute_router.all("*", failRoutesControllers.failRoute);
