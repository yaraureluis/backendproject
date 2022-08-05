import knexLib from "knex";
import { mariaDBconfig } from "../../config/mariaDBconfig.js";
import logger from "../../logger/logger.js";
import { io } from "../../main.js";

class PorductsControllersMariaDB {
  constructor(config) {
    this.knex = knexLib(config);
    this.products = [];
  }

  async createTable() {
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
      logger.error("No se pudo crear la tabla mensajes - ", err);
    }
  }
  add = async (req, res) => {
    let product = req.body;
    this.products.push(product);
    await this.knex("productos").insert([product]);
    io.emit("HISTORIAL", this.products);
    res.redirect("/");
  };

  async getAll() {
    let all_products = await this.knex("productos").select("*");
    this.products = all_products;
    return all_products;
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

// export const products_container = new ContainerProductos(mariaDBconfig);
export default PorductsControllersMariaDB;
