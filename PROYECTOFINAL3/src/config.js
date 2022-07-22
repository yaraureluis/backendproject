export default {
  fileSystem: {
    path: "./database",
  },
  mongodb: {
    cnxStr: "mongodb+srv://xxxx:xxxx@cluster0.xjcx5.mongodb.net/API_BACKEND?retryWrites=true&w=majority",
    options: {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // useCreateIndex: true,
      serverSelectionTimeoutMS: 5000,
    },
  },
  firebase: {},
  PERS: "mongodb",
};
