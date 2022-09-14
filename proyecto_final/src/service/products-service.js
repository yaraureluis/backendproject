import NewProductModel from "../models/product-model.js";
import { productsDao } from "../daos/products/index.js";
import logger from "../../logger/logger.js";

class ProductsService {
  #productsDao;
  #newProductModel;

  constructor(productsDao, NewProductModel) {
    this.#productsDao = productsDao;
    this.#newProductModel = NewProductModel;
  }

  add = async (req) => {
    try {
      const product = new this.#newProductModel(req.body);
      const newProductDto = product.dto;
      return await this.#productsDao.add(newProductDto);
    } catch (err) {
      logger.error(err);
      throw err;
    }
  };

  getAll = async () => {
    try {
      return await this.#productsDao.getAll();
    } catch (err) {
      logger.error(err);
      throw err;
    }
  };

  getById = async (req) => {
    try {
      const product = await this.#productsDao.getById(req.params.id);
      if (!product) {
        throw { message: "Producto no encontrado", status: 404 };
      }
      return product;
    } catch (err) {
      logger.error(err);
      throw err;
    }
  };

  updateById = async (req) => {
    try {
      const product = await this.#productsDao.getById(req.params.id);
      if (!product) {
        throw { message: "Producto no encontrado", status: 404 };
      }
      return await this.#productsDao.updateById(req.params.id, req.body);
    } catch (err) {
      logger.error(err);
      throw err;
    }
  };

  deleteById = async (req) => {
    try {
      const product = await this.#productsDao.getById(req.params.id);
      if (!product) {
        throw { message: "Producto no encontrado", status: 404 };
      }
      return await this.#productsDao.deleteById(req.params.id);
    } catch (err) {
      logger.error(err);
      throw err;
    }
  };
}

export const productsService = new ProductsService(productsDao, NewProductModel);
