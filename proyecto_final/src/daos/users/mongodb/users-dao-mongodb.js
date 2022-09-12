export default class UsersDaoMongo {
  #mongooseUsersSchema;

  constructor(mongooseUsersSchema) {
    this.#mongooseUsersSchema = mongooseUsersSchema;
  }

  createUser = async (user) => {
    try {
      const newUser = new this.#mongooseUsersSchema(user);
      return await newUser.save();
    } catch (err) {
      throw err;
    }
  };

  getUserByEmail = async (email) => {
    try {
      return await this.#mongooseUsersSchema.findOne({ email: email });
    } catch (err) {
      throw err;
    }
  };
}
