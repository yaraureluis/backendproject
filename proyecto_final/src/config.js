import dotenv from "dotenv";
dotenv.config();

const config = {
  fileSystem: {
    path: "./database",
  },
  mongodb: {
    cnxStr: process.env.MONGO_CONN_STRING,
    options: {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // useCreateIndex: true,
      serverSelectionTimeoutMS: 5000,
    },
  },
  persistence: "mongodb",
};

export default config;
