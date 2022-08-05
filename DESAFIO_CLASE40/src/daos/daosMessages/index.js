import { sqlite3Config } from "../../config/sqlite3config.js";
import MessageDaoSQLite from "./messagesDaoSQLite.js";
let persitencia = "sqlite";
let messageDaos;
switch (persitencia) {
  case "sqlite":
    console.log("Persistencia SQLite---------------------------");
    // **************  REVISAR  **************************************************
    // const { default: MessageDaoSQLite } = await import("./messagesDaoSQLite.js");
    messageDaos = new MessageDaoSQLite(sqlite3Config);
    console.log("Persistencia SQLite +++++++ PASÓ +++++++");

    break;
  default:
    console.log("No se encontro el tipo de persistencia");
    break;

  // NO HAY NADA PREPARADO POR DEFECTO PARA ESTE CASO DE PRUEBA
}
export { messageDaos };
