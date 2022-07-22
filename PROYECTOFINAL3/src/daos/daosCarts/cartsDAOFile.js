import { CartsContainerLocal } from "../../containers/cartsContainers/cartsLocal.js";

class CartsDAOLocal extends CartsContainerLocal {
  constructor(dirRoute) {
    super(`${dirRoute}/carts.json`);
  }
}

export default CartsDAOLocal;
