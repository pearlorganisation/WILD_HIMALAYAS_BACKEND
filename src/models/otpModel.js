import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    otp: {
      type: Number,
      required: true,
    },
    email: {
      type: email,
    },
  },
  { timestamps: true }
);

export default mongoose.model("otp", otpSchema);
