const fs = require("fs");

class Contenedor {
  constructor(ruta) {
    this.ruta = ruta;
    this.productos = [];
  }

  async exist() {
    let existe = fs.existsSync(this.ruta);
    return existe;
  }

  async read() {
    let archivo = JSON.parse(await fs.promises.readFile(this.ruta, "utf-8"));
    return archivo;
  }

  async save({ title, price, thumbnail }) {
    let archivo;
    let existe = await this.exist();
    if (existe) {
      try {
        archivo = await this.read();

        let ultimo;
        if (archivo.length < 1) ultimo = 1;
        else {
          ultimo = archivo[archivo.length - 1].id;
        }
        this.productos = [...archivo, { title: title, price: price, thumbnail: thumbnail, id: ultimo + 1 }];

        await fs.promises.writeFile(this.ruta, JSON.stringify(this.productos));
        console.log("Producto cargado!");
        return ultimo++;
      } catch (err) {
        console.log("Catch err: ---->", err);
      }
    } else console.log("No existe el archivo");
  }

  async getById(id_consultado) {
    let existe = await this.exist();
    if (existe) {
      try {
        let archivo = await this.read();
        let producto_buscado = archivo.find((item) => item.id === id_consultado);
        if (producto_buscado) return producto_buscado;
        else return null;
      } catch (err) {
        console.log("Catch err: ---->", err);
      }
    } else console.log("No existe el archivo");
  }

  async getAll() {
    let existe = await this.exist();
    if (existe) {
      try {
        let archivo = await this.read();
        return archivo;
      } catch (err) {
        console.log("Catch err: ---->", err);
      }
    } else console.log("No existe el archivo");
  }

  async deleteById(id_borrar) {
    let existe = await this.exist();
    if (existe) {
      try {
        let archivo = await this.read();
        let producto_a_borrar = archivo.findIndex((item) => item.id === id_borrar);
        if (producto_a_borrar >= 0) {
          archivo.splice(producto_a_borrar, 1);
          this.productos = [...archivo];
          await fs.promises.writeFile(this.ruta, JSON.stringify(this.productos));
          console.log("Producto borrado!");
        } else console.log("No existe producto con el id indicado");
      } catch (err) {
        console.log("Catch err: ---->", err);
      }
    } else console.log("No existe el archivo");
  }

  async deleteAll() {
    try {
      this.productos = [];
      await fs.promises.writeFile(this.ruta, JSON.stringify(this.productos));
      console.log("Todos los datos eliminados");
    } catch (err) {
      console.log("Catch err: ---->", err);
    }
  }
}

const probar = async () => {
  const producto_nuevo = new Contenedor("productos.txt");
  await producto_nuevo.save({ title: "monopatin", price: 100, thumbnail: "moto.jpg" });
  console.log(await producto_nuevo.getById(6));
  console.log("Trae todo", await producto_nuevo.getAll());
  await producto_nuevo.deleteById(4);
  await producto_nuevo.deleteAll();
};

// probar();
