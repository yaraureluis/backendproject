import NewCartModel from "../models/cart-model.js";
import { cartsDao } from "../daos/carts/index.js";
import { productsDao } from "../daos/products/index.js";
import logger from "../../logger/logger.js";
class CartsService {
  #cartsDao;
  #newCartModel;

  constructor(cartsDao, NewCartModel) {
    this.#cartsDao = cartsDao;
    this.#newCartModel = NewCartModel;
  }

  create = async (id) => {
    try {
      const cart = new this.#newCartModel(id);
      const newCartDto = cart.dto;
      return await this.#cartsDao.create(newCartDto);
    } catch (err) {
      logger.error(err);
      throw err;
    }
  };

  getProducts = async (req) => {
    try {
      const cart = await this.#cartsDao.getCartById(req.user.id);
      if (!cart) {
        throw { message: "Error al obtener los productos del carrito", status: 404 };
      }
      return cart.products;
    } catch (err) {
      logger.error(err);
      throw err;
    }
  };

  addProduct = async (req) => {
    try {
      const product = await productsDao.getById(req.body.productId);
      if (!product) {
        throw { message: "Producto no encontrado", status: 404 };
      }
      return await this.#cartsDao.addProduct(req.user.id, product);
    } catch (err) {
      logger.error(err);
      throw err;
    }
  };

  deleteProduct = async (req) => {
    try {
      return await this.#cartsDao.deleteProduct(req.user.id, req.params.productId);
    } catch (err) {
      logger.error(err);
      throw err;
    }
  };
}

export const cartsService = new CartsService(cartsDao, NewCartModel);
