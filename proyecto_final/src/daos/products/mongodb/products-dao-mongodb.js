export default class ProductsDaoMongo {
  #mongooseProductsSchema;

  constructor(mongooseProductsSchema) {
    this.#mongooseProductsSchema = mongooseProductsSchema;
  }
  add = async (product) => {
    try {
      const newProduct = new this.#mongooseProductsSchema(product);
      return await newProduct.save();
    } catch (err) {
      throw err;
    }
  };
  getAll = async () => {
    try {
      return await this.#mongooseProductsSchema.find();
    } catch (err) {
      throw err;
    }
  };
  getById = async (productId) => {
    try {
      return await this.#mongooseProductsSchema.findOne({ id: productId });
    } catch (err) {
      throw err;
    }
  };
  updateById = async (productId, productData) => {
    try {
      return await this.#mongooseProductsSchema.findOneAndUpdate({ id: productId }, productData, { new: true });
    } catch (err) {
      throw err;
    }
  };
  deleteById = async (productId) => {
    try {
      return await this.#mongooseProductsSchema.findOneAndDelete({ id: productId });
    } catch (err) {
      throw err;
    }
  };
}
