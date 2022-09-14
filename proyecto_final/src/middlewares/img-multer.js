import multer from "multer";

const multerConfig = {
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/images");
    },
    filename: (req, file, cb) => {
      const extension = file.mimetype.split("/")[1];
      cb(null, `${file.fieldname}-${Date.now()}.${extension}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
      cb(null, true);
    } else {
      cb(new Error("Formato de imagen inválido"), false);
    }
  },
};

const upload = multer(multerConfig).single("image");

export const uploadImage = (req, res, next) => {
  upload(req, res, (error) => {
    if (error) {
      res.status(400).json({ error: error.message });
    } else {
      next();
    }
  });
};
