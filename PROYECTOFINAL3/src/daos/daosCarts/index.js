import config from "../../config.js";

let cartsDao;

switch (config.PERS) {
  case "local":
    const { default: CartsDAOLocal } = await import("./cartsDAOFile.js");
    cartsDao = new CartsDAOLocal(config.fileSystem.path);
    cartsDao.setCarts();
    break;
  case "firebase":
    const { default: CartsDAOFirebase } = await import("./cartsDAOFirebase.js");
    cartsDao = new CartsDAOFirebase();
    break;
  case "mongodb":
    const { default: CartsDAOMongoDB } = await import("./cartsDAOMongoDB.js");
    cartsDao = new CartsDAOMongoDB();
    break;
  default:
    const { default: CartsDAOMemory } = await import("./cartsDAOMemory.js");
    cartsDao = new CartsDAOMemory();
    break;
}

export { cartsDao };
