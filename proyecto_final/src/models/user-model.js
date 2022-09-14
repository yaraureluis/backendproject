import { encryptPassword } from "../utilities/encrypt-password.js";
import { generateId } from "../utilities/generate-id.js";
class NewUserModel {
  #email;
  #password;
  #name;
  #lastname;
  #phone;
  #image;
  #id;

  constructor({ email, password, name, lastname, phone, image }) {
    this.id = generateId();
    this.email = email;
    this.password = password;
    this.name = name;
    this.lastname = lastname;
    this.phone = phone;
    this.image = image;
  }

  set email(email) {
    if (!email) {
      throw { message: "El email no puede estar vacío" };
    }
    if (email.length === 0) {
      throw { message: "El email no puede estar vacío" };
    }
    if (typeof email !== "string") {
      throw { message: "El email debe ser un string" };
    }
    if (email.length < 5) {
      throw { message: "El email debe tener al menos 5 caracteres" };
    }
    this.#email = email;
  }

  set password(password) {
    if (!password) {
      throw { message: "El password no puede estar vacío" };
    }
    if (password.length === 0) {
      throw { message: "El password no puede estar vacío" };
    }
    if (typeof password !== "string") {
      throw { message: "El password debe ser un string" };
    }
    if (password.length < 4) {
      throw { message: "El password debe tener al menos 4 caracteres" };
    }
    this.#password = password;
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
    if (name.length < 3) {
      throw { message: "El nombre debe tener al menos 3 caracteres" };
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
    if (lastname.length < 3) {
      throw { message: "El apellido debe tener al menos 3 caracteres" };
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
    if (image.length < 3) {
      throw { message: "La imagen debe tener al menos 3 caracteres" };
    }
    this.#image = image;
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

  dto = async () => {
    const newUser = {
      id: this.#id,
      email: this.#email,
      password: await encryptPassword(this.#password),
      name: this.#name,
      lastname: this.#lastname,
      phone: this.#phone,
      image: this.#image,
    };

    return JSON.parse(JSON.stringify(newUser));
  };
}

export default NewUserModel;
