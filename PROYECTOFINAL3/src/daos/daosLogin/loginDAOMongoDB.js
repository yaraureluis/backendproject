import LoginContainerMongoDB from "../../containers/loginContainers/loginMongoDB.js";

class LoginDAOMongoDB extends LoginContainerMongoDB {
  constructor() {
    super("login", {
      username: { type: String, required: true },
      password: { type: String, required: true },
    });
  }
}

export default LoginDAOMongoDB;
