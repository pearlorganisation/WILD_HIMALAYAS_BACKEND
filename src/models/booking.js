import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    amount: {
      type: String,
      required: true,
    },
    orderById: {
      type: mongoose.Types.ObjectId,
      required: [true, "order by is required field!!"],
      ref: "auth",
    },
    email: {
      type: String,
      required: [true, "Email required "],
    },
    tourId:{
      type:mongoose.Types.ObjectId,
      required:[true,"Tour Id is required"],
      ref:"tour"
    },
    tourDate: {
      startDate: String,
      endDate: String,
    },
    memberNames: [{}],
    isBookedSuccessfully: {
      type: Boolean,
      default: false,
    },
    orderStatus: {
      type: String,
      enum: ["Pending", "Completed", "Cancelled"],
      default: "Pending",
    },
    razorpay_payment_id: {
      type: String,
    },
    razorpay_order_id: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("booking", bookingSchema);
