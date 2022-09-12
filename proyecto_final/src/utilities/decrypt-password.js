import bcrypt from "bcrypt";

export const decryptPassword = async (password, dbPassword) => {
  const decrypt = await bcrypt.compare(password, dbPassword);
  console.log("decrypt", decrypt);
  return decrypt;
};
