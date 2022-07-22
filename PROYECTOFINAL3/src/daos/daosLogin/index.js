import config from "../../config.js";

let loginDao;

switch (config.PERS) {
  case "mongodb":
    const { default: LoginDAOMongoDB } = await import("./loginDAOMongoDB.js");
    loginDao = new LoginDAOMongoDB();
    break;
}

export { loginDao };
