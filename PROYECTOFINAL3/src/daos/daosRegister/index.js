import config from "../../config.js";

let registerDao;

switch (config.PERS) {
  case "mongodb":
    const { default: RegisterDAOMongoDB } = await import("./registerDAOMongoDB.js");
    registerDao = new RegisterDAOMongoDB();
    break;
}

export { registerDao };
