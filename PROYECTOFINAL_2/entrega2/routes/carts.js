import Router from "express";
import { cartsDao } from "../daos/daosCarts/index.js";

export const routerCarts = new Router();

routerCarts.post("/", async (req, res) => {
  res.json(await cartsDao.createCart());
});

routerCarts.post("/:id/productos", async (req, res) => {
  let response = await cartsDao.addToCart(req.params.id, req.body.id);
  response.error ? res.status(400).json(response) : res.status(200).send();
});

routerCarts.get("/:id/productos", async (req, res) => {
  let response = await cartsDao.getProductsByCartId(req.params.id);
  response.error ? res.status(400).json(response) : res.json(response);
});

routerCarts.delete("/:id/productos/:id_prod", async (req, res) => {
  let response = await cartsDao.deleteProduct(req.params.id, req.params.id_prod);
  response.error ? res.status(400).json(response) : res.status(200).send();
});

routerCarts.delete("/:id", async (req, res) => {
  let response = await cartsDao.deleteAllProducts(req.params.id, req.params.id_prod);
  response.error ? res.status(400).json(response) : res.status(200).send();
});
