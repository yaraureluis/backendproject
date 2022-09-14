import dotenv from "dotenv";
dotenv.config();

const config = {
  fileSystem: {
    path: "./database",
  },
  mongodb: {
    cnxStr: process.env.MONGO_CONN_STRING,
    options: {
      serverSelectionTimeoutMS: 5000,
    },
    sessionTimeOut: 100000,
  },
  persistence: "mongodb",
};

export default config;
