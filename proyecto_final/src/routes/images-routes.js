import { Router } from "express";
import { imagesController } from "../controllers/images-controller.js";
import { uploadImage } from "../middlewares/img-multer.js";

export const imagesRouter = new Router();

imagesRouter.post("/", uploadImage, imagesController.postImage);
