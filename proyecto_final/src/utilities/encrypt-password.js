import bcrypt from "bcrypt";

export const encryptPassword = async (password) => {
  const encrypt = await bcrypt.hash(password, 9);
  return encrypt;
};
