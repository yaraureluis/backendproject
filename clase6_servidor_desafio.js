const fs = require("fs");
const express = require("express");
const app = express();

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

  async setProductos() {
    this.productos = await this.read();
  }

  async getRandom() {
    let existe = await this.exist();
    if (existe) {
      try {
        let archivo = this.productos;
        let random = archivo[Math.floor(Math.random() * archivo.length)];
        return random;
      } catch (err) {
        console.log("Catch err: ---->", err);
      }
    } else console.log("No existe el archivo");
  }

  async getAll() {
    let existe = await this.exist();
    if (existe) {
      try {
        let archivo = this.productos;
        return archivo;
      } catch (err) {
        console.log("Catch err: ---->", err);
      }
    } else console.log("No existe el archivo");
  }
}

const producto_nuevo = new Contenedor("productos_c6.txt");

(async () => await producto_nuevo.setProductos())();

app.get("/productos", async (req, res) => {
  res.json(await producto_nuevo.getAll());
});

app.get("/productoRandom", async (req, res) => {
  res.json(await producto_nuevo.getRandom());
});

const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${server.address().port}`);
});

server.on("error", (error) => console.log(`Error en el servidor ${error}`));
