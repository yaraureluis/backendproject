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
      if (selectedCart) return selectedCart.products;
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
        delete productToAdd.stock;
        selectedCart.products.push({ ...productToAdd._doc, qty: 1 });
        await selectedCart.save();
      } else {
        delete selectedCart.products[index].stock;
        let qty_to_set = selectedCart.products[index].qty + 1;
        console.log("stock---", productToAdd.stock);
        console.log("qty-----", qty_to_set);
        if (productToAdd.stock >= qty_to_set) {
          console.log("ENTRÓ");
          await this.coleccion.findByIdAndUpdate(id_cart, { $inc: { [`products.${index}.qty`]: 1 } });
          await selectedCart.save();
        } else return { ERR: "SIN STOCK" };
      }
      return true;
    } catch (err) {
      return { error: "Product not added", err };
    }
  };

  deleteProduct = async (id_cart, id_product) => {
    try {
      let cart = await this.getProductsByCartId(id_cart);
      console.log(cart);
      await cart.findByIdAndDelete(id_product);
      return true;
    } catch (err) {
      return { error: "Error deleting product" };
    }
  };
}

export default CartsContainerMongoDB;
