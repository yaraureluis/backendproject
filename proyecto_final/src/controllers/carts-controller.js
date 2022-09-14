import { cartsService } from "../service/carts-service.js";

class Controller {
  constructor() {}

  create = async (req, res) => {
    try {
      const cart = await cartsService.create(req);
      res.status(201).json(cart);
    } catch (err) {
      res.status(500).json(err);
    }
  };

  getProducts = async (req, res) => {
    try {
      const cart = await cartsService.getProducts(req);
      res.status(200).json(cart);
    } catch (err) {
      res.status(err.status || 500).json(err);
    }
  };

  addProduct = async (req, res) => {
    try {
      const cart = await cartsService.addProduct(req);
      res.status(200).json(cart);
    } catch (err) {
      res.status(err.status || 500).json(err);
    }
  };

  deleteProduct = async (req, res) => {
    try {
      await cartsService.deleteProduct(req);
      res.status(200).json({ message: "Producto eliminado" });
    } catch (err) {
      res.status(err.status || 500).json(err);
    }
  };
}

export const cartsController = new Controller();
