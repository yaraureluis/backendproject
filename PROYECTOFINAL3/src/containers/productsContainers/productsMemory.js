export const ProductsContainerMemory = class Productos {
  constructor() {
    this.productos = [];
  }

  async save({ title, description, price, stock, thumbnail }) {
    try {
      let ultimo;
      if (this.productos.length < 1) ultimo = 0;
      else {
        ultimo = this.productos[this.productos.length - 1].id;
      }
      const nuevo_id = ultimo + 1;
      const producto_nuevo = { title: title, description: description, price: price, stock: stock, thumbnail: thumbnail, id: nuevo_id };
      this.productos.push(producto_nuevo);
      return true;
    } catch (err) {
      return { error: "Error al cargar el producto" };
    }
  }

  async getById(id_consultado) {
    try {
      let producto_buscado = this.productos.find((item) => item.id == id_consultado);
      if (producto_buscado) return producto_buscado;
      else return { error: "No existe un producto con id: " + id_consultado };
    } catch (err) {
      return { error: "Error al buscar producto" };
    }
  }

  async getAll() {
    try {
      return this.productos;
    } catch (err) {
      return { error: "Error al listar productos" };
    }
  }

  async updateById(id_modificar, { title, description, price, stock, thumbnail }) {
    try {
      let index_a_modificar = this.productos.findIndex((item) => item.id == id_modificar);
      if (index_a_modificar >= 0) {
        const producto_modificado = { title, description, price, stock, thumbnail, id: +id_modificar };
        this.productos[index_a_modificar] = producto_modificado;

        return true;
      } else return { error: "No existe un producto con id: " + id_modificar };
    } catch (err) {
      return { error: "Error al modificar el producto" };
    }
  }

  async deleteById(id_borrar) {
    try {
      let producto_a_borrar = this.productos.findIndex((item) => item.id == id_borrar);
      if (producto_a_borrar >= 0) {
        this.productos.splice(producto_a_borrar, 1);

        return true;
      } else
        return {
          error: "No existe un producto con id: " + id_borrar,
        };
    } catch (err) {
      return { error: "Error al borrar producto" };
    }
  }
};
