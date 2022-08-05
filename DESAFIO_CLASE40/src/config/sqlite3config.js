const sqlite3Config = {
  client: "sqlite3",
  connection: {
    filename: process.cwd() + "/src/database/mensajes.sqlite",
  },
  useNullAsDefault: true,
};

export { sqlite3Config };
