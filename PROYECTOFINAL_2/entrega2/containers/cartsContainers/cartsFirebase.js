import admin from "firebase-admin";
import { db, serverTimeStamp } from "../../firebase_start.js";
import { productsDao } from "../../daos/daosProducts/index.js";

export const CartsContainerFirebase = class CartsContainer {
  constructor(nombreColeccion) {
    this.coleccion = db.collection(nombreColeccion);
  }

  createCart = async () => {
    try {
      let date = serverTimeStamp;
      let products = [];
      let newCart = await this.coleccion.add({ createdDate: date, products });
      return newCart.id;
    } catch (err) {
      return { error: "Product not added" };
    }
  };

  getAllCarts = async () => {
    try {
      let carts = await this.coleccion.get();
      let allCarts = carts.docs.map((doc) => doc.data());
      console.log(allCarts);
      return allCarts;
    } catch (err) {
      return { error: "Error getting carts" };
    }
  };

  getCartById = async (cart_id) => {
    try {
      let selectedCart = await this.coleccion.doc(cart_id).get();
      if (selectedCart.exists) return selectedCart.data();
      else throw new Error("Cart not found");
    } catch (err) {
      return { error: "Error getting cart" };
    }
  };

  getProductsByCartId = async (cart_id) => {
    try {
      let selectedCart = await this.coleccion.doc(cart_id).get();
      if (selectedCart.exists) return selectedCart.data().products;
      else throw new Error("Cart not found");
    } catch (err) {
      return { error: "Error getting carts products" };
    }
  };

  addToCart = async (id_cart, id_product) => {
    try {
      let cartProducts = await this.getProductsByCartId(id_cart);
      let productToAdd = await productsDao.getById(id_product);
      let index = cartProducts.findIndex((product) => product.id == id_product);

      if (index === -1) {
        delete productToAdd.stock;
        await this.coleccion.doc(id_cart).update({
          products: admin.firestore.FieldValue.arrayUnion({ ...productToAdd, id: id_product, qty: 1 }),
        });
      } else {
        delete cartProducts[index].stock;
        if (productToAdd.stock >= cartProducts[index].qty + 1) {
          await this.coleccion.doc(id_cart).update({
            products: admin.firestore.FieldValue.arrayRemove(cartProducts[index]),
          });
          await this.coleccion.doc(id_cart).update({
            products: admin.firestore.FieldValue.arrayUnion({ ...cartProducts[index], qty: cartProducts[index].qty + 1 }),
          });
        } else throw new Error("Product off stock");
      }
      return true;
    } catch (err) {
      return { error: "Product not added" };
    }
  };

  deleteProduct = async (id_cart, id_product) => {
    try {
      let cartProducts = await this.getProductsByCartId(id_cart);
      let indexProductToDelete = cartProducts.findIndex((product) => product.id == id_product);
      if (indexProductToDelete === -1) {
        throw new Error("Product not found, delete not complete");
      } else {
        await this.coleccion.doc(id_cart).update({
          products: admin.firestore.FieldValue.arrayRemove(cartProducts[indexProductToDelete]),
        });
        return true;
      }
    } catch (err) {
      return { error: "Product not deleted" };
    }
  };
  deleteAllProducts = async (id_cart) => {
    try {
      await this.coleccion.doc(id_cart).update({ products: [] });

      return true;
    } catch (err) {
      return { error: "Products not deleted" };
    }
  };
};

export default CartsContainerFirebase;
