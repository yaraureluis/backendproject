import { mariaDBconfig } from "../../config/mariaDBconfig.js";
import ProductsDaoMariaDB from "./productsDaoMariaDb.js";
let persitencia = "mariaDB";
let productsDaos;
switch (persitencia) {
  case "mariaDB":
    console.log("Persistencia MariaDB---------------------------");
    // **************  REVISAR  **************************************************
    // const { default: ProductsDaoMariaDB } = await import("./productsDaoMariaDb.js");

    productsDaos = new ProductsDaoMariaDB(mariaDBconfig);
    console.log("Persistencia MariaDB +++++++ PASÓ +++++++");
    break;
  default:
    console.log("No se encontro el tipo de persistencia");
    break;
}
export { productsDaos };
