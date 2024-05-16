import mongoose from "mongoose";

const overViewSchema = new mongoose.Schema({
  overview: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
});

export default mongoose.model("overview", overViewSchema);
