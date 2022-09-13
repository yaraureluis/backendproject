import mongoose from "mongoose";

export default mongoose.model(
  "Users",
  {
    id: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    phone: { type: String, required: true },
    image: { type: String, required: true },
  },
  "users"
);
