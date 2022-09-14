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

  get dto() {
    const NewCart = {
      id: this.#id,
      products: this.#products,
    };

    return JSON.parse(JSON.stringify(NewCart));
  }
}

export default NewCartModel;
