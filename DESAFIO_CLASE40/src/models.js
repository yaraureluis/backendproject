import mongoose from "mongoose";

export default mongoose.model("Usuarios", {
  username: String,
  password: String,
});
