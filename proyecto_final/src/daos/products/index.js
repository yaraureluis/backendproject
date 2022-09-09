import config from "../../config.js";

let productsDao;

switch (config.persistence) {
  case "mongodb":
    const { default: ProductsDaoMongo } = await import("./mongodb/products-dao-mongodb.js");
    const { default: mongooseProductsSchema } = await import("./mongodb/products-schema.js");
    productsDao = new ProductsDaoMongo(mongooseProductsSchema);
    break;
  default:
    throw new Error("No se ha definido un tipo de persistencia");
}

export { productsDao };
