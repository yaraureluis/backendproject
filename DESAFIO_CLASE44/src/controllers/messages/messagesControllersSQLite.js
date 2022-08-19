import knexLib from "knex";
import { sqlite3Config } from "../../config/sqlite3config.js";
import logger from "../../logger/logger.js";
import { io } from "../../main.js";

class MessageControllerSQLite {
  constructor(config) {
    this.knex = knexLib(config);
    this.messages = [];
  }

  async createTable() {
    try {
      let existe = await this.knex.schema.hasTable("mensajes");
      if (!existe) {
        console.log("Tabla mensajes creada");
        return await this.knex.schema.createTable("mensajes", (table) => {
          table.increments("id").primary();
          table.string("nombre", 150).notNullable();
          table.string("mensaje", 1500).notNullable();
        });
      } else {
        console.log("YA EXISTE LA TABLA MENSAJES");
      }
    } catch (err) {
      logger.error("No se pudo crear la tabla mensajes - ", err);
      console.log("No se pudo crear la tabla", err);
    }
  }
  add = async (req, res) => {
    let message = req.body;
    this.messages.push(message);
    await this.knex("mensajes").insert(message);
    io.emit("MENSAJES", this.messages);
    res.redirect("/");
    return;
  };

  async getAll() {
    let all_messages = await this.knex("mensajes").select("*");
    this.messages = all_messages;
    return all_messages;
  }

  cerrar() {
    this.knex.destroy();
  }
}
export default MessageControllerSQLite;
