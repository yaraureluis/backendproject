import { ProductsContainerMongoDB } from "../../containers/productsContainers/productsMongoDB.js";

class ProductsDAOMongoDB extends ProductsContainerMongoDB {
  constructor() {
    super("products", {
      id: { type: String, required: true },
      products: { type: Array, required: true },
    });
  }
}

export default ProductsDAOMongoDB;
