import NewUserModel from "../models/user-model.js";
import { usersDao } from "../daos/users/index.js";
import { cartsService } from "./carts-service.js";
import { generateToken } from "../utilities/generate-token.js";
import logger from "../../logger/logger.js";

class UsersService {
  #usersDao;
  #newUserModel;

  constructor(usersDao, NewUserModel) {
    this.#usersDao = usersDao;
    this.#newUserModel = NewUserModel;
  }

  createUser = async (req) => {
    try {
      const existUser = await this.getUserByEmail(req.body.email);
      if (existUser) {
        throw { message: "El usuario ya existe", status: 400 };
      } else {
        const user = new this.#newUserModel(req.body);
        const newUserDto = await user.dto();
        const newUser = await this.#usersDao.createUser(newUserDto);

        await cartsService.create(newUser.id);

        const token = generateToken(newUser);
        return { user: newUser.email, id: newUser.id, token };
      }
    } catch (err) {
      logger.error(err);
      throw err;
    }
  };

  getUserByEmail = async (email) => {
    try {
      return await this.#usersDao.getUserByEmail(email);
    } catch (err) {
      logger.error(err);
      throw err;
    }
  };
}

export const usersService = new UsersService(usersDao, NewUserModel);
