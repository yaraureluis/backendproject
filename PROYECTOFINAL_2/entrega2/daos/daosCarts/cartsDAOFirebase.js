import { CartsContainerFirebase } from "../../containers/cartsContainers/cartsFirebase.js";

class CartsDAOFirebase extends CartsContainerFirebase {
  constructor() {
    super("carts");
  }
}

export default CartsDAOFirebase;
