import mongoose from "mongoose";
import config from "../../config.js";
import { productsDao } from "../../daos/daosProducts/index.js";

await mongoose.connect(config.mongodb.cnxStr, config.mongodb.options);

class CartsContainerMongoDB {
  constructor(nombreColeccion, esquema) {
    this.coleccion = mongoose.model(nombreColeccion, esquema);
  }

  createCart = async () => {
    try {
      let products = [];
      let newCart = await this.coleccion.create({ products });
      return newCart._id;
    } catch (err) {
      return { error: "Product not added" };
    }
  };

  getAllCarts = async () => {
    try {
      let carts = await this.coleccion.find();
      console.log(carts);
      return carts;
    } catch (err) {
      return { error: "Error getting carts" };
    }
  };

  getCartById = async (cart_id) => {
    try {
      let cart = await this.coleccion.findById(cart_id);
      if (cart) return cart;
      else throw new Error("cart not found");
    } catch (err) {
      return { error: "Error getting carts" };
    }
  };

  getProductsByCartId = async (cart_id) => {
    try {
      let selectedCart = await this.coleccion.findById(cart_id);
      if (selectedCart.exists) return selectedCart.products;
      else throw new Error("Cart not found");
    } catch (err) {
      return { error: "Error getting carts products" };
    }
  };

  addToCart = async (id_cart, id_product) => {
    try {
      let selectedCart = await this.getCartById(id_cart);
      let productToAdd = await productsDao.getById(id_product);
      console.log("PRODUCT TO ADD", productToAdd);
      console.log("SELECTED CART . PROD", selectedCart.products);

      let index = selectedCart.products.findIndex((product) => product._id == id_product);
      console.log("INDEX", index);

      if (index === -1) {
        //delete productToAdd.stock;
        selectedCart.products.push({ ...productToAdd, qty: 1 });
        await selectedCart.save();
      } else {
        // delete selectedCart.products[index].stock;
        if (productToAdd.stock >= selectedCart.products[index].qty + 1) {
          selectedCart.products[index].qty++;
          await selectedCart.save();
        } else throw new Error("Product off stock");
      }
      return true;
    } catch (err) {
      return { error: "Product not added", err };
    }
  };
}

export default CartsContainerMongoDB;
