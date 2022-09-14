import config from "../../config.js";

let ordersDao;

switch (config.persistence) {
  case "mongodb":
    const { default: OrdersDaoMongo } = await import("./mongodb/orders-dao-mongodb.js");
    const { default: mongooseOrdersSchema } = await import("./mongodb/orders-schema.js");
    ordersDao = new OrdersDaoMongo(mongooseOrdersSchema);
    break;
  default:
    throw new Error("No se ha definido un tipo de persistencia");
}

export { ordersDao };
