import * as products from "./productService.js";

export function getProducts({ campo, valor }) {
  return products.getProducts(campo, valor);
}

export function getProduct({ id }) {
  return products.getProduct(id);
}

export function createProduct({ datos }) {
  return products.createProduct(datos);
}

export function updateProduct({ id, datos }) {
  return products.updateProduct(id, datos);
}

export function deleteProduct({ id }) {
  return products.deleteProduct(id);
}
