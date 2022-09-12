import NewUserModel from "../models/user-model.js";
import { usersDao } from "../daos/users/index.js";
import { cartsService } from "./carts-service.js";
import { generateId } from "../utilities/generate-id.js";
import { generateToken } from "../utilities/generate-token.js";
import dotenv from "dotenv";
dotenv.config();

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

        req.token = generateToken(newUser.email, newUser.id);
        console.log("token-----", req.token);
        console.log("user.id", newUser.id);
        await cartsService.create(newUser.id);

        return { user: newUser.email, id: newUser.id, token: req.token };
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
