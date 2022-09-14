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
      const user = await this.#mongooseUsersSchema.findOne({ email: email });
      return user;
    } catch (err) {
      throw err;
    }
  };
}
