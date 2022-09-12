import mongoose from "mongoose";

export default mongoose.model("Users", {
  password: String,
  email: String,
});
