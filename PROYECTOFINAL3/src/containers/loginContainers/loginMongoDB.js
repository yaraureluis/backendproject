import logger from "../../../logger/logger.js";

class LoginContainerMongoDB {
  getLogin = (logged) => {
    if (logged) {
      return true;
    } else {
      return { error: "Usuario NO logueado, loguearse con post a /login" };
    }
  };

  postLogin = (username, session) => {
    if (username) {
      session.username = username;
      logger.info("Logueado el Usuario ---> ", username);
      return true;
    } else return { error: "Error al loguearse" };
  };

  failLogin = (messages) => {
    logger.warn("error en login");
    return { error: messages.pop() };
  };

  getLogout = (session) => {
    if (session.username) {
      req.logout(function (err) {
        if (err) return { error: err };
        req.session.destroy();
        return { message: "Deslogueado el Usuario: " + session.username };
      });
    } else return { error: "No existe usuario para desloguear" };
  };
}

export default LoginContainerMongoDB;
