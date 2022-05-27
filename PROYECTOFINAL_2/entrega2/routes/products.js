import Router from "express";
import { productsDao } from "../daos/daosProducts/index.js";
import { adminUser } from "../server.js";

export const routerProducts = new Router();

routerProducts.get("/", async (req, res) => {
  res.json(await productsDao.getAll());
});

routerProducts.get("/:id", async (req, res) => {
  let response = await productsDao.getById(req.params.id);
  response.error ? res.status(400).json(response) : res.json(response);
});

routerProducts.post("/", async (req, res) => {
  if (adminUser) {
    let response = await productsDao.save(req.body);
    response.error ? res.status(400).json(response) : res.status(200).send();
  } else {
    res.status(403).send({ error: 1, description: "Ruta /, método POST no autorizado. Disponible solo para administrador. " });
  }
});

routerProducts.put("/:id", async (req, res) => {
  if (adminUser) {
    let response = await productsDao.updateById(req.params.id, req.body);
    response.error ? res.status(400).json(response) : res.status(200).send();
  } else {
    res.status(403).send({ error: 1, description: "Ruta /id, método PUT no autorizado. Disponible solo para administrador. " });
  }
});

routerProducts.delete("/:id", async (req, res) => {
  if (adminUser) {
    let response = await productsDao.deleteById(req.params.id);
    response.error ? res.status(400).json(response) : res.status(200).send();
  } else {
    res.status(403).send({ error: 1, description: "Ruta /id, método DELETE No autorizado. Disponible solo para administrador. " });
  }
});
