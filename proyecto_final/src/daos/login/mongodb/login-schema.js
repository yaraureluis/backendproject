import mongoose from "mongoose";

export default mongoose.model(
  "Login",
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    id: String,
  },
  "users"
);
