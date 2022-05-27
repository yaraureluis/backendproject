import {CartsContainerMongoDB} from "../../containers/cartsContainers/cartsMongoDB.js";

class CartsDAOMongoDB extends CartsContainerMongoDB {
  constructor() {
    super("carts", {
      id: { type: String, required: true },
      products: { type: Array, required: true },
    });
  }
}

export default CartsDAOMongoDB;
