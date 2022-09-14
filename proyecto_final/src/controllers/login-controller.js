import { loginService } from "../service/login-service.js";

class Controller {
  constructor() {}

  login = async (req, res) => {
    try {
      const user = await loginService.login(req);
      res.status(200).json(user);
    } catch (err) {
      console.log(err);
      res.status(err.status || 500).json(err);
    }
  };
}
export const loginController = new Controller();
