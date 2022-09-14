import logger from "../../logger/logger.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const generateToken = ({ id, email, name, lastname, phone, image }) => {
  logger.info("USER EN GENERATE TOKEN: ", { id, email, name, lastname, phone, image });
  return jwt.sign({ id, email, name, lastname, phone, image }, process.env.PRIVATE_WORD_JWT, {
    expiresIn: process.env.TOKKEN_EXPIRES_IN,
  });
};
