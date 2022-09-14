import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const generateToken = ({ id, email, name, lastname, phone, image }) => {
  console.log("USER EN GENERATE TOKEN: ", { id, email, name, lastname, phone, image });
  // const token_data = { id: user.id, email: user.email, name: user.name, lastname: user.lastname, phone: user.phone, image: user.image };
  // console.log("TOKEN DATA en GENERATE TOKEN", token_data);
  return jwt.sign({ id, email, name, lastname, phone, image }, process.env.PRIVATE_WORD_JWT, {
    expiresIn: process.env.TOKKEN_EXPIRES_IN,
  });
};
