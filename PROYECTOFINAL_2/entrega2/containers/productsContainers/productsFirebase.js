import admin from "firebase-admin";
import config from "../../config.js";

admin.initializeApp({
  credential: admin.credential.cert(config.firebase),
});

const db = admin.firestore();

export const ProductsContainerFirebase = class ProductsContainer {
  constructor(nombreColeccion) {
    this.coleccion = db.collection(nombreColeccion);
  }

  save = async (product) => {
    try {
      await this.coleccion.add(product);
      return true;
    } catch (err) {
      return { error: "Product not added" };
    }
  };

  getAll = async () => {
    try {
      let products = await this.coleccion.get();
      let allProducts = products.docs.map((doc) => doc.data());
      console.log(allProducts);
      return allProducts;
    } catch (err) {
      return { error: "Error getting products" };
    }
  };

  getById = async (id) => {
    try {
      let selectedProduct = await this.coleccion.doc(id).get();
      if (selectedProduct.exists) return selectedProduct.data();
      else throw new Error("Product not found");
    } catch (err) {
      return { error: "Error getting products" };
    }
  };

  updateById = async (id, product_changes) => {
    try {
      await this.coleccion.doc(id).update(product_changes);

      return true;
    } catch (err) {
      return { error: "Product not updated" };
    }
  };

  deleteById = async (id) => {
    try {
      await this.coleccion.doc(id).delete();
      return true;
    } catch (err) {
      return { error: "Error deleting product" };
    }
  };
};
