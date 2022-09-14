import mongoose from "mongoose";

const mongooseOrdersSchema = new mongoose.model("orders", {
  email: { type: String, required: true },
  id: { type: String, required: true },
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  phone: { type: String, required: true },
  image: { type: String, required: true },
  userId: { type: String, required: true },
  products: { type: Array, required: true },
  date: { type: Number, required: true },
});

export default mongooseOrdersSchema;
