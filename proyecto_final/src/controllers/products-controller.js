import { productsService } from "../service/products-service.js";

class Controller {
  constructor() {}

  add = async (req, res) => {
    try {
      const product = await productsService.add(req);
      res.status(201).json(product);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  };

  getAll = async (req, res) => {
    try {
      const products = await productsService.getAll();
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json(err);
    }
  };

  getById = async (req, res) => {
    try {
      const product = await productsService.getById(req);
      res.status(200).json(product);
    } catch (err) {
      res.status(err.status || 500).json(err);
    }
  };

  updateById = async (req, res) => {
    try {
      const product = await productsService.updateById(req);
      res.status(200).json(product);
    } catch (err) {
      res.status(err.status || 500).json(err);
    }
  };

  deleteById = async (req, res) => {
    try {
      await productsService.deleteById(req);
      res.status(200).json({ message: "Producto eliminado" });
    } catch (err) {
      res.status(err.status || 500).json(err);
    }
  };
}

export const productsController = new Controller();
