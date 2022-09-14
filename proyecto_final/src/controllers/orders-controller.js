import { ordersService } from "../service/orders-service.js";

class Controller {
  constructor() {}

  getOrders = async (req, res) => {
    try {
      const orders = await ordersService.getOrders(req);
      res.status(200).json(orders);
    } catch (err) {
      console.log(err);
      res.status(err.status || 500).json(err);
    }
  };

  addOrder = async (req, res) => {
    try {
      const order = await ordersService.addOrder(req);
      res.status(201).json(order);
    } catch (err) {
      console.log(err);
      res.status(err.status || 500).json(err);
    }
  };
}

export const ordersController = new Controller();
