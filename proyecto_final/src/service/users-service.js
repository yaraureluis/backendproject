import NewUserModel from "../models/user-model.js";
import { usersDao } from "../daos/users/index.js";
import { cartsService } from "./carts-service.js";
import { generateToken } from "../utilities/generate-token.js";

class UsersService {
  #usersDao;
  #newUserModel;

  constructor(usersDao, NewUserModel) {
    this.#usersDao = usersDao;
    this.#newUserModel = NewUserModel;
  }

  createUser = async (req) => {
    try {
      console.log("req.body", req.body);
      const existUser = await this.getUserByEmail(req.body.email);
      console.log("existUser", existUser);
      if (existUser) {
        throw { message: "El usuario ya existe", status: 400 };
      } else {
        const user = new this.#newUserModel(req.body);
        const newUserDto = await user.dto();
        console.log("newUserDto", newUserDto);
        const newUser = await this.#usersDao.createUser(newUserDto);

        console.log("user.id", newUser.id);
        await cartsService.create(newUser.id);

        const token = generateToken(newUser);
        return { user: newUser.email, id: newUser.id, token };
      }
    } catch (err) {
      throw err;
    }
  };

  getUserByEmail = async (email) => {
    try {
      return await this.#usersDao.getUserByEmail(email);
    } catch (err) {
      throw err;
    }
  };
}

export const usersService = new UsersService(usersDao, NewUserModel);
