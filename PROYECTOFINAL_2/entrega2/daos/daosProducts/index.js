import config from "../../config.js";

let productsDao;

switch (config.PERS) {
  case "local":
    const { default: ProductsDAOLocal } = await import("./productsDAOFile.js");
    productsDao = new ProductsDAOLocal(config.fileSystem.path);
    productsDao.setProductos();
    break;
  case "firebase":
    const { default: ProductsDAOFirebase } = await import("./productsDAOFirebase.js");
    productsDao = new ProductsDAOFirebase();
    productsDao.setProductos();
    // PRUEBA DE ADD PRODUCT
    // productsDao.addProduct({ title: "Sony Xperia Pro-I", description: "MODIFICADA XXX", price: 25300, stock: 11, thumbnail: "https://fdn2.gsmarena.com/vv/bigpic/sony-xperia-pro-i.jpg", id: 1 });
    break;
  case "mongodb":
    const { default: ProductsDAOMongoDB } = await import("./productsDAOMongoDB.js");
    productsDao = new ProductsDAOMongoDB();
    break;
  default:
    const { default: ProductsDAOMemory } = await import("./productsDAOMemory.js");
    productsDao = new ProductsDAOMemory();
    break;
}

export { productsDao };
