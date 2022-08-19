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

  addProduct = async (req, res) => {
    let product = req.body;
    this.products.push(product);
    await this.knex("productos").insert([product]);
    io.emit("HISTORIAL", this.products);
    res.status(200).send("Ok, producto agregado correctamente");
  };

  getAll = async () => {
    let all_products = await this.knex("productos").select("*");
    this.products = all_products;
    return all_products;
  };

  getAllProducts = async (req, res) => {
    let all_products = await this.knex("productos").select("*");
    this.products = all_products;
    res.json(all_products);
  };

  getProductById = async (req, res) => {
    let id = req.params.id;
    let product = await this.knex("productos")
      .where({ id: +id })
      .select("*");
    res.json(product);
  };

  //   borrarArticuloPorId(id) {
  //     return this.knex.from("articulos").where("id", id).del();
  //   }

  borrarArticuloPorId = async (req, res) => {
    try {
      let id = req.params.id;
      await this.knex("productos").where("id", id).del();
      io.emit("HISTORIAL", this.products);
      res.status(200).send("Ok, producto borrado correctamente");
    } catch (err) {
      res.status(500).send("Error, no se pudo borrar el producto con id " + id);
    }
  };

  borrarTodos = async (req, res) => {
    try {
      await this.knex("productos").del();
      io.emit("HISTORIAL", this.products);
      res.status(200).send("Ok, productos borrados correctamente");
    } catch {
      res.status(500).send("Error, no se pudo borrar los productos");
    }
  };

  //   actualizarStockPorId(stock, id) {
  //     return this.knex.from("articulos").where("id", id).update({ stock: stock });
  //   }

  actualizarPrecioPorId = async (req, res) => {
    let id = req.params.id;
    let precio = req.body.precio;
    let product = await this.knex("productos").where("id", id).update({ precio: precio });
    io.emit("HISTORIAL", this.products);
    res.status(200).send("Ok, producto actualizado correctamente");
  };

  cerrar() {
    this.knex.destroy();
  }
}

// export const products_container = new ContainerProductos(mariaDBconfig);
export default PorductsControllersMariaDB;
