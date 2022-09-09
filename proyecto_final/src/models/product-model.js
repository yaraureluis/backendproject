class NewProductModel {
  #title;
  #price;
  #description;
  #thumbnail;
  #stock;

  constructor({ title, price, description, thumbnail, stock }) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.thumbnail = thumbnail;
    this.stock = stock;
  }

  set title(title) {
    if (!title) {
      throw { message: "El título no puede estar vacío" };
    }
    if (title.length === 0) {
      throw { message: "El título no puede estar vacío" };
    }
    if (typeof title !== "string") {
      throw { message: "El título debe ser un string" };
    }
    if (title.length < 3) {
      throw { message: "El título debe tener al menos 3 caracteres" };
    }
    this.#title = title;
  }

  set price(price) {
    if (!price) {
      throw { message: "El precio no puede estar vacío" };
    }
    if (price.length === 0) {
      throw { message: "El precio no puede estar vacío" };
    }
    if (typeof price !== "number") {
      throw { message: "El precio debe ser un número" };
    }
    if (!price > 0) {
      throw { message: "El precio debe ser mayor a 0" };
    }
    this.#price = price;
  }

  set description(description) {
    if (!description) {
      throw { message: "La descripción no puede estar vacía" };
    }
    if (description.length === 0) {
      throw { message: "La descripción no puede estar vacía" };
    }
    if (typeof description !== "string") {
      throw { message: "La descripción debe ser un string" };
    }
    if (description.length < 3) {
      throw { message: "La descripción debe tener al menos 3 caracteres" };
    }
    this.#description = description;
  }

  set thumbnail(thumbnail) {
    if (!thumbnail) {
      throw { message: "El thumbnail no puede estar vacío" };
    }
    if (thumbnail.length === 0) {
      throw { message: "El thumbnail no puede estar vacío" };
    }
    if (typeof thumbnail !== "string") {
      throw { message: "El thumbnail debe ser un string" };
    }
    if (thumbnail.length < 3) {
      throw { message: "El thumbnail debe tener al menos 3 caracteres" };
    }
    // validar que thumbnail tenga alguna de las siguientes extensiones jpg png jpeg
    const validExtensions = ["jpg", "png", "jpeg"];
    const extension = thumbnail.split(".").pop();
    if (!validExtensions.includes(extension)) {
      throw { message: "El thumbnail debe tener una de las siguientes extensiones: jpg, png, jpeg" };
    }

    this.#thumbnail = thumbnail;
  }

  set stock(stock) {
    if (!stock) {
      throw { message: "El stock no puede estar vacío" };
    }
    if (stock.length === 0) {
      throw { message: "El stock no puede estar vacío" };
    }
    if (typeof stock !== "number") {
      throw { message: "El stock debe ser un número" };
    }
    if (!stock > 0) {
      throw { message: "El stock debe ser mayor a 0" };
    }
    this.#stock = stock;
  }

  get dto() {
    const NewProduct = {
      title: this.#title,
      price: this.#price,
      description: this.#description,
      thumbnail: this.#thumbnail,
      stock: this.#stock,
    };

    return JSON.parse(JSON.stringify(NewProduct));
  }
}

export default NewProductModel;
