class NewCartModel {
  #id;
  #products;

  constructor(id) {
    this.#id = id;
    this.#products = [];
  }

  set id(id) {
    if (!id) {
      throw { message: "El id del carrito no puede estar vacío" };
    }
    if (id.length === 0) {
      throw { message: "El id del carrito no puede estar vacío" };
    }
    if (typeof id !== "string") {
      throw { message: "El id debe ser un string" };
    }

    this.#id = id;
  }

  //   set products(products) {
  //     if (!products) {
  //       throw { message: "Productos es requerido" };
  //     }
  //     if (!Array.isArray(products)) {
  //       throw { message: "Productos debe ser un array" };
  //     }

  //     this.#products = products;
  //   }

  get dto() {
    const NewCart = {
      id: this.#id,
      products: this.#products,
    };

    return JSON.parse(JSON.stringify(NewCart));
  }
}

export default NewCartModel;
