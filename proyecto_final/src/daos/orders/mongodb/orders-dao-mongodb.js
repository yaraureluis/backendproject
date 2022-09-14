export default class OrdersDaoMongo {
  #mongooseOrdersSchema;

  constructor(mongooseOrdersSchema) {
    this.#mongooseOrdersSchema = mongooseOrdersSchema;
  }

  getOrders = async (userId) => {
    try {
      return await this.#mongooseOrdersSchema.find({ userId });
    } catch (err) {
      throw err;
    }
  };

  addOrder = async (order) => {
    try {
      const newOrder = new this.#mongooseOrdersSchema(order);
      return await newOrder.save();
    } catch (err) {
      throw err;
    }
  };
}
