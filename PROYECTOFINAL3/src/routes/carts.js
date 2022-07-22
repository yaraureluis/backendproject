import Router from "express";
import { cartsDao } from "../daos/daosCarts/index.js";
import { checkAuthenticated } from "../middlewares/isAuthenticated.js";

export const routerCarts = new Router();

routerCarts.post("/", checkAuthenticated, async (req, res) => {
  let user = req.user;
  let existCart_id = await cartsDao.getCartByUserId(user._id);
  if (existCart_id) res.status(200).json({ existCart_id });
  else res.status(201).json(await cartsDao.createCart(user._id));
});

routerCarts.post("/:id/productos", checkAuthenticated, async (req, res) => {
  let response = await cartsDao.addToCart(req.params.id, req.body.id);
  response.error ? res.status(400).json(response) : res.status(200).send();
});

routerCarts.get("/:id/productos", checkAuthenticated, async (req, res) => {
  let response = await cartsDao.getProductsByCartId(req.params.id);
  response.error ? res.status(400).json(response) : res.json(response);
});

routerCarts.delete("/:id/productos/:id_prod", checkAuthenticated, async (req, res) => {
  let response = await cartsDao.deleteProduct(req.params.id, req.params.id_prod);
  response.error ? res.status(400).json(response) : res.status(200).send();
});

routerCarts.delete("/:id", checkAuthenticated, async (req, res) => {
  let response = await cartsDao.deleteAllProducts(req.params.id);
  response.error ? res.status(400).json(response) : res.status(200).send();
});

routerCarts.post("/:id/venta", checkAuthenticated, async (req, res) => {
  try {
    let newOrder = await cartsDao.createOrder(req.params.id, req.user);
    if (newOrder) await cartsDao.deleteAllProducts(req.params.id);
    res.status(201).send();
  } catch (error) {
    res.status(400).json(response);
  }
});
