import config from "../../../config.js";
import mongoose from "mongoose";

await mongoose.connect(config.mongodb.cnxStr, config.mongodb.options);

const mongooseProductsSchema = new mongoose.model("products", {
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  // stock: { type: Number, required: true },
  id: { type: String, required: true },
});

export default mongooseProductsSchema;
