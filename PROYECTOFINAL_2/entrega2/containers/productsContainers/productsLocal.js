import fs from "fs";

export const ProductsContainerLocal = class Productos {
  constructor(route) {
    this.route = route;
    this.productos = [];
  }

  async exist() {
    let exist = fs.existsSync(this.route);
    return exist;
  }

  async read() {
    let archivo = JSON.parse(await fs.promises.readFile(this.route, "utf-8"));
    return archivo;
  }

  async setProductos() {
    this.productos = await this.read();
  }

  async save({ title, description, price, stock, thumbnail }) {
    let exist = await this.exist();
    if (exist) {
      try {
        let ultimo;
        if (this.productos.length < 1) ultimo = 0;
        else {
          ultimo = this.productos[this.productos.length - 1].id;
        }
        const nuevo_id = ultimo + 1;
        const producto_nuevo = { title: title, description: description, price: price, stock: stock, thumbnail: thumbnail, id: nuevo_id };
        this.productos.push(producto_nuevo);
        await fs.promises.writeFile(this.route, JSON.stringify(this.productos));
        return true;
      } catch (err) {
        console.log("Catch err: ---->", err);
        return { error: "Error al cargar el producto" };
      }
    } else return { error: "No existe el archivo" };
  }

  async getById(id_consultado) {
    let exist = await this.exist();
    if (exist) {
      try {
        let producto_buscado = this.productos.find((item) => item.id == id_consultado);
        if (producto_buscado) return producto_buscado;
        else return { error: "No existe un producto con id: " + id_consultado };
      } catch (err) {
        console.log("Catch err: ---->", err);
        return { error: "Error al buscar producto" };
      }
    } else console.log("No existe el archivo");
  }

  async getAll() {
    let exist = await this.exist();
    if (exist) {
      try {
        return this.productos;
      } catch (err) {
        console.log("Catch err: ---->", err);
        return { error: "Error al listar productos" };
      }
    } else console.log("No exist el archivo");
  }

  async updateById(id_modificar, { title, description, price, stock, thumbnail }) {
    let exist = await this.exist();
    if (exist) {
      try {
        let index_a_modificar = this.productos.findIndex((item) => item.id == id_modificar);
        if (index_a_modificar >= 0) {
          const producto_modificado = { title, description, price, stock, thumbnail, id: +id_modificar };
          this.productos[index_a_modificar] = producto_modificado;
          await fs.promises.writeFile(this.route, JSON.stringify(this.productos));
          return true;
        } else return { error: "No existe un producto con id: " + id_modificar };
      } catch (err) {
        console.log("Catch err: ---->", err);
        return { error: "Error al modificar el producto" };
      }
    } else console.log("No existe el archivo");
  }

  async deleteById(id_borrar) {
    let exist = await this.exist();
    if (exist) {
      try {
        let producto_a_borrar = this.productos.findIndex((item) => item.id == id_borrar);
        if (producto_a_borrar >= 0) {
          this.productos.splice(producto_a_borrar, 1);
          await fs.promises.writeFile(this.route, JSON.stringify(this.productos));
          return true;
        } else
          return {
            error: "No existe un producto con id: " + id_borrar,
          };
      } catch (err) {
        console.log("Catch err: ---->", err);
        return { error: "Error al borrar producto" };
      }
    } else console.log("No existe el archivo");
  }
};
