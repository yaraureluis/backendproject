import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const isAuth = (req, res, next) => {
  const authHeader = req.headers["authorization"] || req.headers["Authorization"] || "";

  if (!authHeader) {
    return res.status(401).json({
      error: "Se requiere autenticacion.",
      message: "No se encontró token de autenticación.",
    });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      error: "Se requiere autenticacion.",
      message: "Formato de token invalido.",
    });
  }

  try {
    req.user = jwt.verify(token, process.env.PRIVATE_WORD_JWT);
    console.log("<<<USUARIO SETEADO EN AUTH>>> ", req.user);
  } catch (ex) {
    console.log(ex);
    return res.status(403).json({
      error: "Token invalido.",
      message: "Nivel de acceso insuficiente.",
    });
  }

  next();
};
