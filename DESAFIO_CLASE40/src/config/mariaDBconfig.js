import "dotenv/config";

const MARIADB_USER = process.env.MARIADB_USER;
const MARIADB_USER_PASSWORD = process.env.MARIADB_USER_PASSWORD;

const objectConfig = {
  host: "localhost",
  port: 3306,
  user: MARIADB_USER,
  password: MARIADB_USER_PASSWORD,
  database: "desafio16_coder",
};

export const mariaDBconfig = {
  client: "mysql2",
  connection: objectConfig, //Se puede usar objectConfig o objectConfigString;
};
