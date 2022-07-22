import RegisterContainerMongoDB from "../../containers/registerContainers/registerMongoDB.js";

class RegisterDAOMongoDB extends RegisterContainerMongoDB {
  constructor() {
    super("users", {
      username: { type: String, required: true },
      password: { type: String, required: true },
      name: { type: String, required: true },
      address: { type: String, required: true },
      age: { type: String, required: true },
      phone: { type: String, required: true },
      avatar: { type: String, required: true },
    });
  }
}

export default RegisterDAOMongoDB;
