import NewOrderModel from "../models/order-model.js";
import { ordersDao } from "../daos/orders/index.js";
import { cartsDao } from "../daos/carts/index.js";
import { emailConfig } from "../senders/email-config.js";
import { emailOrderModelAdm } from "../senders/email-order-model-adm.js";
import { emailOrderModelUser } from "../senders/email-order-model-user.js";
import logger from "../../logger/logger.js";

class OrdersService {
  #ordersDao;
  #newOrderModel;

  constructor(ordersDao, newOrderModel) {
    this.#ordersDao = ordersDao;
    this.#newOrderModel = newOrderModel;
  }

  getOrders = async (req) => {
    try {
      return await this.#ordersDao.getOrders(req.user.id);
    } catch (err) {
      logger.error(err);
      throw err;
    }
  };

  addOrder = async (req) => {
    try {
      const cart = await cartsDao.getCartById(req.user.id);

      if (!cart) {
        throw { message: "Error al obtener los productos del carrito", status: 404 };
      }

      const order = new this.#newOrderModel(req.user.email, req.user.name, req.user.lastname, req.user.phone, req.user.image, req.user.id, cart.products);
      const newOrderDto = order.dto;

      const newOrderGenerated = await this.#ordersDao.addOrder(newOrderDto);

      if (!newOrderGenerated) {
        throw { message: "Error al generar la orden", status: 500 };
      }
      this.#notifyOrder(newOrderDto);
      await cartsDao.deleteAllProducts(req.user.id);
      return newOrderGenerated;
    } catch (err) {
      logger.error(err);
      throw err;
    }
  };

  #notifyOrder = async (order) => {
    try {
      const emailAdminData = emailOrderModelAdm(order);
      await emailConfig.sendMail(emailAdminData);
      const emailUserData = emailOrderModelUser(order);
      await emailConfig.sendMail(emailUserData);
    } catch (err) {
      logger.error(err);
      throw err;
    }
  };
}

export const ordersService = new OrdersService(ordersDao, NewOrderModel);
