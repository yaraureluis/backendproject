class Controller {
  constructor() {}
  postLogin = async (req, res) => {
    try {
      req.session.token = req.token;
      res.status(200).json({ message: "Usuario logueado", token: req.token });
    } catch (err) {
      console.log(err);
      res.status(err.status || 500).json(err);
    }
  };
  faillogin(req, res) {
    res.status(400).json({ message: req.session.messages.pop() });
  }
}
export const loginController = new Controller();
