import express from "express";
import { graphqlMiddleware } from "./graphqlMiddleware.js";

const app = express();

app.use(express.static("publicGraphQL"));

app.use("/graphql", graphqlMiddleware);

const PORT = 8082;
app.listen(PORT, () => {
  const msg = `Servidor corriendo en puerto: ${PORT}`;
  console.log(msg);
});
