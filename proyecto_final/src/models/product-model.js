import { generateId } from "../utilities/generate-id.js";

class NewProductModel {
  #id;
  #name;
  #price;
  #description;
  #image;

  constructor({ name, price, description, image }) {
    this.id = generateId();
    this.name = name;
    this.price = price;
    this.description = description;
    this.image = image;
  }

  set id(id) {
    if (!id) {
      throw { message: "El id no puede estar vacío" };
    }
    if (id.length === 0) {
      throw { message: "El id no puede estar vacío" };
    }
    if (typeof id !== "string") {
      throw { message: "El id debe ser un string" };
    }
    if (id.length < 3) {
      throw { message: "El id debe tener al menos 3 caracteres" };
    }
    this.#id = id;
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
    const validExtensions = ["jpg", "png", "jpeg"];
    const extension = image.split(".").pop();
    if (!validExtensions.includes(extension)) {
      throw { message: "La imagen debe tener una de las siguientes extensiones: jpg, png, jpeg" };
    }

    this.#image = image;
  }

  get dto() {
    const NewProduct = {
      id: this.#id,
      name: this.#name,
      price: this.#price,
      description: this.#description,
      image: this.#image,
    };

    return JSON.parse(JSON.stringify(NewProduct));
  }
}

export default NewProductModel;
