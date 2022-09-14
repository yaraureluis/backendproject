class Controller {
  constructor() {}

  getChat = async (req, res) => {
    try {
      res.render("chat");
    } catch (err) {
      res.status(err.status || 500).json(err);
    }
  };
}

export const chatController = new Controller();
