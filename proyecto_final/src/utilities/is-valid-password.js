import bcrypt from "bcrypt";

export const isValidPassword = async (password, dbPassword) => {
  const decrypt = await bcrypt.compare(password, dbPassword);
  return decrypt;
};
