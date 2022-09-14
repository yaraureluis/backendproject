export default class CartsDaoMongo {
  #mongooseCartsSchema;

  constructor(mongooseCartsSchema) {
    this.#mongooseCartsSchema = mongooseCartsSchema;
  }
  create = async (cart) => {
    try {
      const newCart = new this.#mongooseCartsSchema(cart);
      return await newCart.save();
    } catch (err) {
      throw err;
    }
  };

  getCartById = async (cartId) => {
    try {
      return await this.#mongooseCartsSchema.findOne({ id: cartId });
    } catch (err) {
      throw err;
    }
  };

  addProduct = async (cartId, product) => {
    try {
      return await this.#mongooseCartsSchema.findOneAndUpdate({ id: cartId }, { $push: { products: product } }, { new: true });
    } catch (err) {
      throw err;
    }
  };

  deleteProduct = async (cartId, productId) => {
    try {
      return await this.#mongooseCartsSchema.findOneAndUpdate({ id: cartId }, { $pull: { products: { id: productId } } });
    } catch (err) {
      throw err;
    }
  };

  deleteAllProducts = async (cartId) => {
    try {
      return await this.#mongooseCartsSchema.findOneAndUpdate({ id: cartId }, { $set: { products: [] } });
    } catch (err) {
      throw err;
    }
  };
}
