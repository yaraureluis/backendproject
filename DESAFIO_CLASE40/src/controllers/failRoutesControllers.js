import path from "path";
import logger from "../logger/logger.js";
const __dirname = path.resolve();

function failRoute(req, res) {
  console.log("-----FAIL ROUTE-----");
  logger.info(`Petición hecha a ${req.url} con el método ${req.method}`);
  logger.warn(`Petición hecha a ruta inexistente: ${req.url}, con el método ${req.method}`);
  `Petición hecha a ${req.url} con el método ${req.method}`;

  res.status(404).json({ error: "RUTA INVALIDA" });
}

export default { failRoute };
