import CartsContainerMongoDB from "../../containers/cartsContainers/cartsMongoDB.js";

class CartsDAOMongoDB extends CartsContainerMongoDB {
  constructor() {
    super("carts", {
      products: { type: Array, required: true },
      user_id: { type: String, required: true },
      timestamps: {
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
      },
    });
  }
}

export default CartsDAOMongoDB;
