import NewProductModel from "../models/product-model.js";
import { productsDao } from "../daos/products/index.js";

class Repository {
  #productsDao;
  #newProductModel;

  constructor(productsDao, NewProductModel) {
    this.#productsDao = productsDao;
    this.#newProductModel = NewProductModel;
  }

  add = async (req, id) => {
    try {
      console.log("req.body =======", req.body);
      const product = new this.#newProductModel(req.body);
      const newProductDto = product.dto;
      console.log("newProductDto =======", { ...newProductDto, id });
      return await this.#productsDao.add({ ...newProductDto, id });
    } catch (err) {
      throw err;
    }
  };

  getAll = async () => {
    try {
      return await this.#productsDao.getAll();
    } catch (err) {
      throw err;
    }
  };

  getById = async (req) => {
    try {
      const product = await this.#productsDao.getById(req.params.id);
      if (!product) {
        throw { message: "Producto no encontrado" };
      }
      return product;
    } catch (err) {
      throw err;
    }
  };

  updateById = async (req) => {
    try {
      return await this.#productsDao.updateById(req.params.id, req.body);
    } catch (err) {
      throw err;
    }
  };

  deleteById = async (req) => {
    try {
      return await this.#productsDao.deleteById(req.params.id);
    } catch (err) {
      throw err;
    }
  };
}

export const ProductsRepository = new Repository(productsDao, NewProductModel);
