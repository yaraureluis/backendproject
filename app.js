class Usuario {
  constructor(nombre, apellido, libros = [], mascotas = []) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = libros;
    this.mascotas = mascotas;
  }
  getFullName() {
    let fullName = this.nombre + " " + this.apellido;
    return fullName;
  }
  addMascota(mascota) {
    this.mascotas.push(mascota);
  }
  countMascotas() {
    let cantMascotas = this.mascotas.length;
    return cantMascotas;
  }
  addBook(nombre, autor) {
    this.libros.push({ nombre, autor });
  }
  getBookNames() {
    let nombreslibros = this.libros.map((libro) => libro.nombre);
    return nombreslibros;
  }
}

const usuario1 = new Usuario("Luis", "Yaraure", [{ nombre: "Juan Salvador Gaviota", autor: "Gabriel García Marquéz" }], ["perro"]);

console.log("Nombre de usuario: ", usuario1.getFullName());
usuario1.addMascota("gato");
console.log("Cantidad de mascotas: ", usuario1.countMascotas());
usuario1.addBook("Termodinámica", "Yunes Cengel");
console.log("Nombres de libros: ", usuario1.getBookNames());
