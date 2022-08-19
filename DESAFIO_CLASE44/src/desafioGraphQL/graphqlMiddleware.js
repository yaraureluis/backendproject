import { buildSchema } from "graphql";
import { graphqlHTTP } from "express-graphql";

import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from "./productController.js";

const schema = buildSchema(`
  input ProductInput {
    nombre: String
    precio: Int
    foto: String
  }

  type Product {
    id: ID!
    nombre: String
    precio: Int
    foto: String
  }
  type Query {
    getProduct(id: ID!): Product
    getProducts(campo: String, valor: String): [Product]
  }
  type Mutation {
    createProduct(datos: ProductInput!): Product
    updateProduct(id: ID!, datos: ProductInput!): Product
    deleteProduct(id: ID!): Product
  }
`);

export const graphqlMiddleware = graphqlHTTP({
  schema,
  rootValue: {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
  },
  graphiql: true,
});
