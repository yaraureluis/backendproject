import dotenv from "dotenv";
dotenv.config();

export const isAdmin = (req, res, next) => {
  if (req.user.email === process.env.ADM_USER_EMAIL) {
    next();
  } else {
    res.status(401).json({ message: "No autorizado", error: "Nivel de acceso insuficiente." });
  }
};
