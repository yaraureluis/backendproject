class NewProductModel {
  #name;
  #price;
  #description;
  #image;
  // #stock;

  constructor({ name, price, description, image }) {
    this.name = name;
    this.price = price;
    this.description = description;
    this.image = image;
    // this.stock = stock;
  }

  set name(name) {
    if (!name) {
      throw { message: "El título no puede estar vacío" };
    }
    if (name.length === 0) {
      throw { message: "El título no puede estar vacío" };
    }
    if (typeof name !== "string") {
      throw { message: "El título debe ser un string" };
    }
    if (name.length < 3) {
      throw { message: "El título debe tener al menos 3 caracteres" };
    }
    this.#name = name;
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

  set image(image) {
    if (!image) {
      throw { message: "Debe incluir una ruta de imagen" };
    }
    if (image.length === 0) {
      throw { message: "Debe incluir una ruta de imagen" };
    }
    if (typeof image !== "string") {
      throw { message: "La imagen debe ser un string" };
    }
    if (image.length < 3) {
      throw { message: "La imagen debe tener al menos 3 caracteres" };
    }
    // validar que image tenga alguna de las siguientes extensiones jpg png jpeg
    const validExtensions = ["jpg", "png", "jpeg"];
    const extension = image.split(".").pop();
    if (!validExtensions.includes(extension)) {
      throw { message: "La imagen debe tener una de las siguientes extensiones: jpg, png, jpeg" };
    }

    this.#image = image;
  }

  // set stock(stock) {
  //   if (!stock) {
  //     throw { message: "El stock no puede estar vacío" };
  //   }
  //   if (stock.length === 0) {
  //     throw { message: "El stock no puede estar vacío" };
  //   }
  //   if (typeof stock !== "number") {
  //     throw { message: "El stock debe ser un número" };
  //   }
  //   if (!stock > 0) {
  //     throw { message: "El stock debe ser mayor a 0" };
  //   }
  //   this.#stock = stock;
  // }

  get dto() {
    const NewProduct = {
      name: this.#name,
      price: this.#price,
      description: this.#description,
      image: this.#image,
      // stock: this.#stock,
    };

    return JSON.parse(JSON.stringify(NewProduct));
  }
}

export default NewProductModel;
