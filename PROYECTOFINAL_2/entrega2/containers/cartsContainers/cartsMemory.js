import axios from "axios";
export const CartsContainerMemory = class Carts {
  constructor() {
    this.carts = [];
  }
  async allProducts() {
    let request = await axios.get("http://localhost:8080/api/productos");
    return await request.data;
  }

  async createCart() {
    try {
      let ultimo;
      if (this.carts.length < 1) ultimo = 0;
      else {
        ultimo = this.carts[this.carts.length - 1].id;
      }
      const new_id = ultimo + 1;
      const new_cart = { id: new_id, products: [] };
      this.carts.push(new_cart);
      return { id: new_cart.id };
    } catch (err) {
      console.log("Catch err: ---->", err);
      return { error: "Error al crear carrito" };
    }
  }

  // METODO PARA OBTENER UN CARRITO POR ID DE CARRITO
  async getCartById(cart_id) {
    try {
      let find_cart = this.carts.find((item) => item.id == cart_id);
      if (find_cart) return find_cart;
      else return { error: "No exist un carrito con id: " + cart_id };
    } catch (err) {
      console.log("Catch err: ---->", err);
      return { error: "Error al buscar carrito" };
    }
  }

  // METODO PARA OBTENER LOS PRODUCTOS DE UN CARRITO POR ID DE CARRITO
  async getProductsByCartId(cart_id) {
    try {
      let find_cart = this.carts.find((item) => item.id == cart_id);
      if (find_cart) return find_cart.products;
      else return { error: "No exist un carrito con id: " + cart_id };
    } catch (err) {
      console.log("Catch err: ---->", err);
      return { error: "Error al buscar productos" };
    }
  }

  async addToCart(id_cart, id_product) {
    // Traigo el producto con un metodo de la clase productos
    let products = await this.allProducts();
    console.log(products);
    let add_product = products.find((item) => item.id == id_product);
    try {
      let find_cart_index = this.carts.findIndex((item) => item.id == id_cart);
      if (find_cart_index >= 0 && add_product.id) {
        this.carts[find_cart_index].products.push(add_product);
        console.log(this.carts);
        return true;
      } else return { error: "Error al agregar producto" };
    } catch (err) {
      console.log("Catch err: ---->", err);
      return { error: "Error al agregar producto" };
    }
  }

  async deleteProduct(id_cart, id_product) {
    let selected_cart_index = this.carts.findIndex((item) => item.id == id_cart);
    try {
      let index_producto_a_borrar = this.carts[selected_cart_index].products.findIndex((item) => item.id == id_product);
      if (index_producto_a_borrar >= 0 && selected_cart_index >= 0) {
        this.carts[selected_cart_index].products.splice(index_producto_a_borrar, 1);

        return true;
      } else return { error: "Id incorrecto" };
    } catch (err) {
      console.log("Catch err: ---->", err);
      return { error: "Error al borrar producto" };
    }
  }

  async deleteAllProducts(id_cart) {
    let selected_cart_index = this.carts.findIndex((item) => item.id == id_cart);
    try {
      if (selected_cart_index >= 0) {
        this.carts[selected_cart_index].products = [];

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
  }
};
