import config from "../../config.js";

let usersDao;

switch (config.persistence) {
  case "mongodb":
    const { default: UsersDaoMongo } = await import("./mongodb/users-dao-mongodb.js");
    const { default: mongooseUsersSchema } = await import("./mongodb/users-schema.js");
    usersDao = new UsersDaoMongo(mongooseUsersSchema);
    break;
  default:
    throw new Error("No se ha definido un tipo de persistencia");
}

export { usersDao };
