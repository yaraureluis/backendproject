import { usersService } from "../service/users-service.js";

class Controller {
  constructor() {}

  createUser = async (req, res) => {
    try {
      const user = await usersService.createUser(req);
      res.status(201).json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  };

  failRegister = async (req, res) => {
    res.status(400).json({ message: req.session.messages.pop() });
  };
}
export const usersController = new Controller();
