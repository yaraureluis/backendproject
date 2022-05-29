export default {
  fileSystem: {
    path: "./database",
  },
  mongodb: {
    cnxStr: "mongodb+srv://yaraureluis:0000@cluster0.xjcx5.mongodb.net/?retryWrites=true&w=majority",
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
