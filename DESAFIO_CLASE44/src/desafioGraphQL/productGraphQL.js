export default class Product {
  #id;
  #nombre;
  #precio;
  #foto;

  constructor(id, { nombre, precio, foto }) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.foto = foto;
  }

  set id(value) {
    if (!value) throw new Error("el campo id es obligatorio");
    this.#id = value;
  }

  set nombre(value) {
    if (!value) throw new Error("el campo nombre es obligatorio");
    this.#nombre = value;
  }

  set precio(value) {
    if (!value) throw new Error("el campo precio es obligatorio");
    this.#precio = value;
  }

  set foto(value) {
    if (!value) throw new Error("el campo foto es obligatorio");
    this.#foto = value;
  }

  datos() {
    return Object.freeze({
      id: this.#id,
      nombre: this.#nombre,
      precio: this.#precio,
      foto: this.#foto,
    });
  }
}
