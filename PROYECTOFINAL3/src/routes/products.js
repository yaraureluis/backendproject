import Router from "express";
import { productsDao } from "../daos/daosProducts/index.js";
import { isAdmin } from "../middlewares/isAdmin.js";

export const routerProducts = new Router();

routerProducts.get("/", async (req, res) => {
  res.json(await productsDao.getAll());
});

routerProducts.get("/:id", async (req, res) => {
  let response = await productsDao.getById(req.params.id);
  response.error ? res.status(400).json(response) : res.status(200).json(response);
});

routerProducts.post("/", isAdmin, async (req, res) => {
  let response = await productsDao.save(req.body);
  response.error ? res.status(400).json(response) : res.status(200).send();
});

routerProducts.put("/:id", isAdmin, async (req, res) => {
  let response = await productsDao.updateById(req.params.id, req.body);
  response.error ? res.status(400).json(response) : res.status(200).send();
});

routerProducts.delete("/:id", isAdmin, async (req, res) => {
  let response = await productsDao.deleteById(req.params.id);
  response.error ? res.status(400).json(response) : res.status(200).send();
});
