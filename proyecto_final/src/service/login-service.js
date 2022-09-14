import NewLoginModel from "../models/login-model.js";
import { loginDao } from "../daos/login/index.js";
import { generateToken } from "../utilities/generate-token.js";
import { isValidPassword } from "../utilities/is-valid-password.js";

class LoginService {
  #loginDao;
  #newLoginModel;

  constructor(loginDao, NewLoginModel) {
    this.#loginDao = loginDao;
    this.#newLoginModel = NewLoginModel;
  }

  login = async (req) => {
    try {
      const loginUser = new this.#newLoginModel(req.body);
      const loginDto = loginUser.dto;
      const user = await this.#loginDao.getUserByEmail(loginDto.email);

      if (!user) {
        throw { message: "No se encuentra un usuario con ese email", status: 400 };
      } else {
        if (await isValidPassword(loginDto.password, user.password)) {
          const token = generateToken(user);
          return { email: user.email, id: user.id, token };
        } else {
          throw { message: "Contraseña incorrecta", status: 400 };
        }
      }
    } catch (err) {
      throw err;
    }
  };

  getUserByEmail = async (email) => {
    try {
      return await this.#loginDao.getUserByEmail(email);
    } catch (err) {
      throw err;
    }
  };
}

export const loginService = new LoginService(loginDao, NewLoginModel);
