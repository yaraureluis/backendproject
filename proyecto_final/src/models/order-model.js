import { generateId } from "../utilities/generate-id.js";

class NewOrderModel {
  #email;
  #id;
  #name;
  #lastname;
  #phone;
  #image;
  #userId;
  #products;
  #date;

  constructor(email, name, lastname, phone, image, userId, products) {
    this.email = email;
    this.id = generateId();
    this.name = name;
    this.lastname = lastname;
    this.phone = phone;
    this.image = image;
    this.userId = userId;
    this.products = products;
    this.date = new Date().getTime();
  }

  set email(email) {
    if (!email) {
      throw { message: "El email no puede estar vacío" };
    }
    if (typeof email !== "string") {
      throw { message: "El email debe ser un string" };
    }

    this.#email = email;
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
    this.#id = id;
  }

  set name(name) {
    if (!name) {
      throw { message: "El nombre no puede estar vacío" };
    }
    if (name.length === 0) {
      throw { message: "El nombre no puede estar vacío" };
    }
    if (typeof name !== "string") {
      throw { message: "El nombre debe ser un string" };
    }
    this.#name = name;
  }

  set lastname(lastname) {
    if (!lastname) {
      throw { message: "El apellido no puede estar vacío" };
    }
    if (lastname.length === 0) {
      throw { message: "El apellido no puede estar vacío" };
    }
    if (typeof lastname !== "string") {
      throw { message: "El apellido debe ser un string" };
    }
    this.#lastname = lastname;
  }

  set phone(phone) {
    if (!phone) {
      throw { message: "El teléfono no puede estar vacío" };
    }
    if (phone.length === 0) {
      throw { message: "El teléfono no puede estar vacío" };
    }
    if (typeof phone !== "string") {
      throw { message: "El teléfono debe ser un string" };
    }
    this.#phone = phone;
  }

  set image(image) {
    if (!image) {
      throw { message: "La imagen no puede estar vacía" };
    }
    if (image.length === 0) {
      throw { message: "La imagen no puede estar vacía" };
    }
    if (typeof image !== "string") {
      throw { message: "La imagen debe ser un string" };
    }
    this.#image = image;
  }

  set userId(userId) {
    if (!userId) {
      throw { message: "El userId no puede estar vacío" };
    }
    if (userId.length === 0) {
      throw { message: "El userId no puede estar vacío" };
    }
    if (typeof userId !== "string") {
      throw { message: "El userId debe ser un string" };
    }
    this.#userId = userId;
  }

  set products(products) {
    if (!products) {
      throw { message: "Debe agregar al menos un producto" };
    }
    if (products.length === 0) {
      throw { message: "Debe agregar al menos un producto" };
    }
    if (!Array.isArray(products)) {
      throw { message: "Los productos deben ser tipo array" };
    }
    this.#products = products;
  }

  set date(date) {
    if (!date) {
      throw { message: "La fecha no puede estar vacía" };
    }
    if (date.length === 0) {
      throw { message: "La fecha no puede estar vacía" };
    }
    if (typeof date !== "number") {
      throw { message: "La fecha debe ser un numero" };
    }
    this.#date = date;
  }

  get dto() {
    const NewOrder = {
      email: this.#email,
      id: this.#id,
      name: this.#name,
      lastname: this.#lastname,
      phone: this.#phone,
      image: this.#image,
      userId: this.#userId,
      products: this.#products,
      date: this.#date,
    };
    return JSON.parse(JSON.stringify(NewOrder));
  }
}

export default NewOrderModel;
