import config from "../../config.js";

let cartsDao;

switch (config.persistence) {
  case "mongodb":
    const { default: cartsDaoMongo } = await import("./mongodb/carts-dao-mongodb.js");
    const { default: mongooseCartsSchema } = await import("./mongodb/carts-schema.js");
    cartsDao = new cartsDaoMongo(mongooseCartsSchema);
    break;
  default:
    throw new Error("No se ha definido un tipo de persistencia");
}

export { cartsDao };
