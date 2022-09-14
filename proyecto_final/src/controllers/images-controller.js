import dotenv from "dotenv";
dotenv.config();
class Controller {
  constructor() {}

  postImage(req, res) {
    try {
      req.file.filePublicPath = `http://localhost:${process.env.PORT}/api/images/${req.file.filename}`;
      res.json({ imageRoute: req.file.filePublicPath });
    } catch (err) {
      throw err;
    }
  }
}

export const imagesController = new Controller();
