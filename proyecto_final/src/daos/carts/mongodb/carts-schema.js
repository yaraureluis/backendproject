import config from "../../../config.js";
import mongoose from "mongoose";

await mongoose.connect(config.mongodb.cnxStr, config.mongodb.options);

const mongooseCartsSchema = new mongoose.model("carts", {
  id: { type: String, required: true },
  products: { type: Array, required: true },
});

export default mongooseCartsSchema;
