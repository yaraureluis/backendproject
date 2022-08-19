import Product from "./productGraphQL.js";
import crypto from "crypto";

const productsMap = {};

export function getProducts(campo, valor) {
  const products = Object.values(productsMap);
  if (campo && valor) {
    return products.filter((p) => p[campo] == valor);
  } else {
    return products;
  }
}

export function getProduct(id) {
  if (!productsMap[id]) {
    throw new Error("Product not found.");
  }
  return productsMap[id];
}

export function createProduct(datos) {
  const id = crypto.randomBytes(10).toString("hex");
  const newProduct = new Product(id, datos);
  productsMap[id] = newProduct.datos();
  return newProduct.datos();
}

export function updateProduct(id, datosNuevos) {
  if (!productsMap[id]) {
    throw new Error("Product not found");
  }
  const datosAnteriores = productsMap[id];
  const datos = { ...datosAnteriores, ...datosNuevos };
  const UpdatedProduct = new Product(id, datos);
  productsMap[id] = UpdatedProduct.datos();
  return UpdatedProduct.datos();
}

export function deleteProduct(id) {
  if (!productsMap[id]) {
    throw new Error("Product not found");
  }
  const DeletedProduct = productsMap[id];
  delete productsMap[id];
  return DeletedProduct;
}
