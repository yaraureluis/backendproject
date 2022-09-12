import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const generateToken = (user, id) => {
  return jwt.sign({ email: user, id }, process.env.PRIVATE_WORD_JWT, {
    expiresIn: 86400, // expires in 24 hours
  });
};
