import mongoose from "mongoose";
import config from "../../config.js";

await mongoose.connect(config.mongodb.cnxStr, config.mongodb.options);

class ProductsContainerMongoDB {
  constructor(nombreColeccion, esquema) {
    this.coleccion = mongoose.model(nombreColeccion, esquema);
  }

  save = async (product) => {
    try {
      await this.coleccion.create(product);
      return true;
    } catch (err) {
      return { error: "Product not added" };
    }
  };

  getAll = async () => {
    try {
      let products = await this.coleccion.find();
      console.log(products);
      return products;
    } catch (err) {
      return { error: "Error getting products" };
    }
  };

  getById = async (id) => {
    try {
      let product = await this.coleccion.findById(id);
      if (product) return product;
      else throw new Error("Product not found");
    } catch (err) {
      return { error: "Error getting products" };
    }
  };

  updateById = async (id, product_changes) => {
    try {
      await this.coleccion.findByIdAndUpdate(id, product_changes);

      return true;
    } catch (err) {
      return { error: "Product not updated" };
    }
  };

  deleteById = async (id) => {
    try {
      await this.coleccion.findByIdAndDelete(id);
      return true;
    } catch (err) {
      return { error: "Error deleting product" };
    }
  };
}

export default ProductsContainerMongoDB;
