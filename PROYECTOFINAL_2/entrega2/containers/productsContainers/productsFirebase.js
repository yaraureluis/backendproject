import admin from "firebase-admin";
import config from "../../config.js";

admin.initializeApp({
  credential: admin.credential.cert(config.firebase),
});

const db = admin.firestore();

export const ProductsContainerFirebase = class ProductsContainer {
  constructor(nombreColeccion) {
    this.coleccion = db.collection(nombreColeccion);
    this.productos = [];
  }

  async setProductos() {
    this.productos = await this.getAll();
  }

  // Agrega un producto de pueba
  addProduct = async (product) => {
    try {
      await this.coleccion.add(product);
      return true;
    } catch (err) {
      console.log("add ERROR::: ", err);
      return { error: "Product not added" };
    }
  };

  getAll = async () => {
    try {
      let products = await this.coleccion.get();
      let allProducts = products.docs.map((doc) => doc.data());
      this.productos = allProducts;
      console.log(this.productos);
      return this.productos;
    } catch (err) {
      console.log("getAll ERROR::: ", err);
      return { error: "Error getting products" };
    }
  };
};
