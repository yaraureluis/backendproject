import axios from "axios";
import assert from "assert";

describe("comportamiento del servidor", () => {
  describe("comportamiento de peticiones POST", () => {
    describe("Si envio un producto", () => {
      it("Devuelve un respuesta con Ok.", async () => {
        const body = {
          nombre: "Producto test MOCHA",
          precio: 1000,
          foto: "https://cdn4.iconfinder.com/data/icons/emoji-18/61/23-256.png",
        };
        const response = await axios.post("http://localhost:8080/products", body);
        const productAdded = response.data;
        assert.ok(productAdded);
      });
    });
  });

  describe("comportamiento de peticiones GET", () => {
    describe("si le pido todos los productos", () => {
      it("devuelve una array de productos", async () => {
        const response = await axios.get("http://localhost:8080/products");
        const productos = response.data;
        assert.ok(productos);
      });
    });
    describe("si le paso un id en params", () => {
      it("devuelve el producto con ese id", async () => {
        const id = 46;
        const response = await axios.get("http://localhost:8080/products/" + id);
        const producto_obtenido = response.data[0];
        const producto_esperado = {
          id: 46,
          nombre: "Producto test MOCHA",
          precio: 1000,
          foto: "https://cdn4.iconfinder.com/data/icons/emoji-18/61/23-256.png",
        };
        assert.deepStrictEqual(producto_obtenido, producto_esperado);
      });
    });
  });

  describe("comportamiento de peticiones PUT", () => {
    describe("Si envio un id en params y precio en el body", () => {
      it("Devuelve un respuesta con Ok.", async () => {
        const body = {
          precio: "1999",
        };
        const response = await axios.put("http://localhost:8080/products/45", body);
        const productUpdated = response.data;
        assert.ok(productUpdated);
      });
    });
  });
  describe("comportamiento de peticiones DELETE", () => {
    describe("Si envio un id en params", () => {
      it("Devuelve un respuesta con Ok, producto borrado.", async () => {
        const response = await axios.delete("http://localhost:8080/products/15");
        const productDeleted = response.data;
        assert.ok(productDeleted);
      });
    });
  });
});
