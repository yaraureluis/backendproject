import { usersService } from "../service/users-service.js";

class Controller {
  constructor() {}

  createUser = async (req, res) => {
    try {
      const user = await usersService.createUser(req);
      res.status(201).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  };
}
export const usersController = new Controller();
