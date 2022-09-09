import NewProductModel from "../models/product-model.js";
import { productsDao } from "../daos/products/index.js";
import { v4 as uuidv4 } from "uuid";

class ProductsService {
  #productsDao;
  #newProductModel;

  constructor(productsDao, NewProductModel) {
    this.#productsDao = productsDao;
    this.#newProductModel = NewProductModel;
  }

  add = async (req) => {
    try {
      const id = uuidv4();
      const product = new this.#newProductModel(req.body);
      const newProductDto = product.dto;
      console.log("newProductDto =======", { ...newProductDto, id });
      return await this.#productsDao.add({ ...newProductDto, id });
      //return await this.#repo.add(req, id);
    } catch (err) {
      throw err;
    }
  };

  getAll = async () => {
    try {
      return await this.#productsDao.getAll();
      // return await this.#repo.getAll();
    } catch (err) {
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
      // return await this.#repo.getById(req);
    } catch (err) {
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
      // return await this.#repo.updateById(req);
    } catch (err) {
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
      // return await this.#repo.deleteById(req);
    } catch (err) {
      throw err;
    }
  };
}

export const productsService = new ProductsService(productsDao, NewProductModel);
