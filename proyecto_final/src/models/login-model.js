class NewLoginModel {
  #email;
  #password;

  constructor({ email, password }) {
    this.email = email;
    this.password = password;
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

  get dto() {
    const loginUser = {
      email: this.#email,
      password: this.#password,
    };
    return JSON.parse(JSON.stringify(loginUser));
  }
}

export default NewLoginModel;
