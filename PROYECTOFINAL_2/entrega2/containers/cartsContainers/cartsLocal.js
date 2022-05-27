import axios from "axios";
import fs from "fs";

export const CartsContainerLocal = class Carts {
  constructor(route) {
    this.route = route;
    this.carts = [];
  }

  async allProducts() {
    let request = await axios.get("http://localhost:8080/api/productos");
    return await request.data;
  }

  async exist() {
    let exist = fs.existsSync(this.route);
    return exist;
  }

  async read() {
    let archivo = JSON.parse(await fs.promises.readFile(this.route, "utf-8"));
    return archivo;
  }

  async setCarts() {
    this.carts = await this.read();
  }

  async createCart() {
    let exist = await this.exist();
    if (exist) {
      try {
        let ultimo;
        if (this.carts.length < 1) ultimo = 0;
        else {
          ultimo = this.carts[this.carts.length - 1].id;
        }
        const new_id = ultimo + 1;
        const new_cart = { id: new_id, products: [] };
        this.carts.push(new_cart);
        await fs.promises.writeFile(this.route, JSON.stringify(this.carts));
        return { id: new_cart.id };
      } catch (err) {
        console.log("Catch err: ---->", err);
        return { error: "Error al crear carrito" };
      }
    } else console.log("No exist el archivo");
  }

  // METODO PARA OBTENER UN CARRITO POR ID DE CARRITO
  async getCartById(cart_id) {
    let exist = await this.exist();
    if (exist) {
      try {
        let find_cart = this.carts.find((item) => item.id == cart_id);
        if (find_cart) return find_cart;
        else return { error: "No exist un carrito con id: " + cart_id };
      } catch (err) {
        console.log("Catch err: ---->", err);
        return { error: "Error al buscar carrito" };
      }
    } else console.log("No exist el archivo");
  }

  // METODO PARA OBTENER LOS PRODUCTOS DE UN CARRITO POR ID DE CARRITO
  async getProductsByCartId(cart_id) {
    let exist = await this.exist();
    if (exist) {
      try {
        let find_cart = this.carts.find((item) => item.id == cart_id);
        if (find_cart) return find_cart.products;
        else return { error: "No exist un carrito con id: " + cart_id };
      } catch (err) {
        console.log("Catch err: ---->", err);
        return { error: "Error al buscar productos" };
      }
    } else console.log("No exist el archivo");
  }

  async addToCart(id_cart, id_product) {
    let exist = await this.exist();
    if (exist) {
      // Traigo el producto con un metodo de la clase productos
      let products = await this.allProducts();
      console.log(products);
      let add_product = products.find((item) => item.id == id_product);
      try {
        let find_cart_index = this.carts.findIndex((item) => item.id == id_cart);
        if (find_cart_index >= 0 && add_product.id) {
          this.carts[find_cart_index].products.push(add_product);
          await fs.promises.writeFile(this.route, JSON.stringify(this.carts));
          console.log(this.carts);
          return true;
        } else return { error: "Error al agregar producto" };
      } catch (err) {
        console.log("Catch err: ---->", err);
        return { error: "Error al agregar producto" };
      }
    } else console.log("No exist el archivo");
  }

  async deleteProduct(id_cart, id_product) {
    let exist = await this.exist();
    if (exist) {
      let selected_cart_index = this.carts.findIndex((item) => item.id == id_cart);
      try {
        let index_producto_a_borrar = this.carts[selected_cart_index].products.findIndex((item) => item.id == id_product);
        if (index_producto_a_borrar >= 0 && selected_cart_index >= 0) {
          this.carts[selected_cart_index].products.splice(index_producto_a_borrar, 1);
          await fs.promises.writeFile(this.route, JSON.stringify(this.carts));
          return true;
        } else return { error: "Id incorrecto" };
      } catch (err) {
        console.log("Catch err: ---->", err);
        return { error: "Error al borrar producto" };
      }
    } else console.log("No exist el archivo");
  }

  async deleteAllProducts(id_cart) {
    let exist = await this.exist();
    if (exist) {
      let selected_cart_index = this.carts.findIndex((item) => item.id == id_cart);
      try {
        if (selected_cart_index >= 0) {
          this.carts[selected_cart_index].products = [];
          await fs.promises.writeFile(this.route, JSON.stringify(this.carts));
          return true;
        } else {
          return {
            error: "Id incorrecto",
          };
        }
      } catch (err) {
        console.log("Catch err: ---->", err);
        return { error: "Error al vaciar carrito" };
      }
    } else console.log("No exist el archivo");
  }
};
