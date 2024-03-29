import mongoose from "mongoose";

const mongooseProductsSchema = new mongoose.model("products", {
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  id: { type: String, required: true },
});

export default mongooseProductsSchema;
