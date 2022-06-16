import knexLib from "knex";
import { sqlite3Config } from "../config/sqlite3config.js";

class ContainerMensajes {
  constructor(config) {
    this.knex = knexLib(config);
  }

  async crearTabla() {
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
      console.log("No se pudo crear la tabla", err);
    }
  }
  async agregar(mensajes) {
    return await this.knex("mensajes").insert(mensajes);
  }

  async listar() {
    return await this.knex("mensajes").select("*");
  }

  cerrar() {
    this.knex.destroy();
  }
}

export const mensaje_instancia = new ContainerMensajes(sqlite3Config);
