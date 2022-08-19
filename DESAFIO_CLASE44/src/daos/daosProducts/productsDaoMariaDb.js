import PorductsControllersMariaDB from "../../controllers/products/productsControllersMariaDB.js";
class ProductsDaoMariaDB extends PorductsControllersMariaDB {
  constructor(config) {
    super(config);
  }
}
export default ProductsDaoMariaDB;
