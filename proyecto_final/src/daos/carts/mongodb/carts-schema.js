import mongoose from "mongoose";

const mongooseCartsSchema = new mongoose.model("carts", {
  id: { type: String, required: true },
  products: { type: Array, required: true },
});

export default mongooseCartsSchema;
