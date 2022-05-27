import { ProductsContainerLocal } from "../../containers/productsContainers/productsLocal.js";

class ProductsDAOLocal extends ProductsContainerLocal {
  constructor(dirRoute) {
    super(`${dirRoute}/products.json`);
  }
}

export default ProductsDAOLocal;
