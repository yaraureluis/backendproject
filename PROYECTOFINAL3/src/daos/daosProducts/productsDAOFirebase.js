import { ProductsContainerFirebase } from "../../containers/productsContainers/productsFirebase.js";

class ProductsDAOFirebase extends ProductsContainerFirebase {
  constructor() {
    super("products");
  }
}

export default ProductsDAOFirebase;
