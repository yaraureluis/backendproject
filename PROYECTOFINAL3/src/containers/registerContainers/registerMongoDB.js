import mongoose from "mongoose";
import config from "../../config.js";
import { cartsDao } from "../../daos/daosCarts/index.js";
import { emailConfig } from "../../messageSenders/email/emailConfig.js";
import { emailRegisterModel } from "../../messageSenders/email/emailRegisterModel.js";
import logger from "../../../logger/logger.js";
await mongoose.connect(config.mongodb.cnxStr, config.mongodb.options);

class RegisterContainerMongoDB {
  constructor(nombreColeccion, esquema) {
    this.coleccion = mongoose.model(nombreColeccion, esquema);
  }
  postRegister = async (user, user_id) => {
    try {
      // -------  CREAMOS UN CARRITO PARA ESTE USUARIO --------
      await cartsDao.createCart(user_id);

      // --------- ENVIAMOS EL MAIL PARA NOTIFICARLE QUE SE HA REGISTRADO --------
      const emailData = emailRegisterModel(user);

      const info = await emailConfig.sendMail(emailData);
      logger.info("Mail enviado: " + info);
      return true;
    } catch (error) {
      logger.warn("Error al registrar usuario: " + error);
      return { error: "Error en registro: " + error };
    }
  };

  failRegister = (messages) => {
    logger.warn("error en registro");
    return { error: "Error en registro: " + messages.pop() };
  };
}

export default RegisterContainerMongoDB;
