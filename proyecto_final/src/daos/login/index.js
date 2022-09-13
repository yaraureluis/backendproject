import config from "../../config.js";

let loginDao;

switch (config.persistence) {
  case "mongodb":
    const { default: LoginDaoMongo } = await import("./mongodb/login-dao-mongodb.js");
    const { default: mongooseLoginSchema } = await import("./mongodb/login-schema.js");
    loginDao = new LoginDaoMongo(mongooseLoginSchema);
    break;
  default:
    throw new Error("No se ha definido un tipo de persistencia");
}

export { loginDao };
