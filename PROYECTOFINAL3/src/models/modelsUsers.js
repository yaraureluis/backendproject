import mongoose from "mongoose";

export default mongoose.model("Users", {
  username: String,
  password: String,
  name: String,
  address: String,
  age: String,
  phone: String,
  avatar: String,
});
