import { cartsService } from "../service/carts-service.js";

class Controller {
  constructor() {}

  create = async (req, res) => {
    try {
      req.user = { id: "123456789" };
      const cart = await cartsService.create(req);
      res.status(201).json(cart);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  };

  getProducts = async (req, res) => {
    try {
      req.user = { id: "123456789" };
      const cart = await cartsService.getProducts(req);
      res.status(200).json(cart);
    } catch (err) {
      console.log(err);
      res.status(err.status || 500).json(err);
    }
  };

  addProduct = async (req, res) => {
    try {
      req.user = { id: "123456789" };
      const cart = await cartsService.addProduct(req);
      res.status(200).json(cart);
    } catch (err) {
      console.log(err);
      res.status(err.status || 500).json(err);
    }
  };

  deleteProduct = async (req, res) => {
    try {
      req.user = { id: "123456789" };
      await cartsService.deleteProduct(req);
      res.status(200).json({ message: "Producto eliminado" });
    } catch (err) {
      console.log(err);
      res.status(err.status || 500).json(err);
    }
  };
}

export const cartsController = new Controller();
