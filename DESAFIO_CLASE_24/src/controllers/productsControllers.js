import knexLib from "knex";
import { mariaDBconfig } from "../config/mariaDBconfig.js";

class ContainerProductos {
  constructor(config) {
    this.knex = knexLib(config);
  }

  async crearTabla() {
    try {
      let existe = await this.knex.schema.hasTable("productos");
      if (!existe) {
        console.log("Tabla productos creada");
        return await this.knex.schema.createTable("productos", (table) => {
          table.increments("id").primary();
          table.string("nombre", 150).notNullable();
          table.float("precio").notNullable();
          table.string("foto", 800).notNullable();
        });
      } else {
        console.log("YA EXISTE LA TABLA PRODUCTOS");
      }
    } catch (err) {
      console.log("No se pudo crear la tabla", err);
    }
  }
  async agregar(productos) {
    return await this.knex("productos").insert(productos);
  }

  async listar() {
    return await this.knex("productos").select("*");
  }

  //   borrarArticuloPorId(id) {
  //     return this.knex.from("articulos").where("id", id).del();
  //   }

  //   actualizarStockPorId(stock, id) {
  //     return this.knex.from("articulos").where("id", id).update({ stock: stock });
  //   }

  cerrar() {
    this.knex.destroy();
  }
}

export const producto_instancia = new ContainerProductos(mariaDBconfig);
