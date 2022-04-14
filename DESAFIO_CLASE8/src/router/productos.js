const { Router } = require("express");

const routerProductos = Router();

class Contenedor {
  constructor() {
    this.productos = [
      { title: "Samsung Galaxy A73 5G", price: 3000, thumbnail: "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-a73-5g-1.jpg", id: 1 },
      { title: "Samsung Galaxy s21 5G", price: 4000, thumbnail: "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-a73-5g-1.jpg", id: 2 },
      { title: "Apple iPhone 13 Pro Max", price: 3000, thumbnail: "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-13-pro-max.jpg", id: 3 },
      { title: "Sony Xperia Pro-I", price: 2500, thumbnail: "https://fdn2.gsmarena.com/vv/bigpic/sony-xperia-pro-i.jpg", id: 4 },
    ];
  }

  async save({ title, price, thumbnail }) {
    try {
      let ultimo;
      if (this.productos.length < 1) ultimo = 1;
      else {
        ultimo = this.productos[this.productos.length - 1].id;
      }
      const nuevo_id = ultimo + 1;
      const producto_nuevo = { title: title, price: price, thumbnail: thumbnail, id: nuevo_id };
      this.productos.push(producto_nuevo);

      return producto_nuevo;
    } catch (err) {
      console.log("Catch err: ---->", err);
    }
  }

  async getById(id_consultado) {
    try {
      let producto_buscado = this.productos.find((item) => item.id == id_consultado);
      if (producto_buscado) return producto_buscado;
      else return { error: "No existe un producto con id: " + id_consultado };
    } catch (err) {
      console.log("Catch err: ---->", err);
    }
  }

  async getAll() {
    try {
      let archivo = this.productos;
      return archivo;
    } catch (err) {
      console.log("Catch err: ---->", err);
    }
  }

  async updateById(id_modificar, { title, price, thumbnail }) {
    let index_a_modificar = this.productos.findIndex((item) => item.id == id_modificar);
    if (index_a_modificar >= 0) {
      const producto_modificado = { title, price, thumbnail, id: id_modificar };
      this.productos[index_a_modificar] = producto_modificado;
    } else return { error: "No existe un producto con id: " + id_modificar };
  }

  async deleteById(id_borrar) {
    try {
      let producto_a_borrar = this.productos.findIndex((item) => item.id == id_borrar);
      if (producto_a_borrar >= 0) {
        this.productos.splice(producto_a_borrar, 1);
      } else
        return {
          error: "No existe un producto con id: " + id_borrar,
        };
    } catch (err) {
      console.log("Catch err: ---->", err);
    }
  }
}

const producto_nuevo = new Contenedor();

routerProductos.get("/", async (req, res) => {
  res.json(await producto_nuevo.getAll());
});

routerProductos.get("/:id", async (req, res) => {
  res.json(await producto_nuevo.getById(req.params.id));
});

routerProductos.post("/", async (req, res) => {
  res.json(await producto_nuevo.save(req.body));
});

routerProductos.put("/:id", async (req, res) => {
  res.json(await producto_nuevo.updateById(req.params.id, req.body));
});

routerProductos.delete("/:id", async (req, res) => {
  res.json(await producto_nuevo.deleteById(req.params.id));
});

exports.routerProductos = routerProductos;
