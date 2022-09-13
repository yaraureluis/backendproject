export default class LoginDaoMongo {
  #mongooseLoginSchema;

  constructor(mongooseLoginSchema) {
    this.#mongooseLoginSchema = mongooseLoginSchema;
  }

  getUserByEmail = async (email) => {
    try {
      return await this.#mongooseLoginSchema.findOne({ email: email });
    } catch (err) {
      throw err;
    }
  };
}
