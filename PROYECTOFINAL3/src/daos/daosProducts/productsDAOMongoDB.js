import ProductsContainerMongoDB from "../../containers/productsContainers/productsMongoDB.js";

class ProductsDAOMongoDB extends ProductsContainerMongoDB {
  constructor() {
    super("products", {
      title: { type: String, required: true },
      price: { type: Number, required: true },
      description: { type: String, required: true },
      thumbnail: { type: String, required: true },
      stock: { type: Number, required: true },
    });
  }
}

export default ProductsDAOMongoDB;
