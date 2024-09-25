import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    amount: {
      type: String,
      required: true,
    },
    paymentType:{
        type:String,
        required:true,
        enum:["Cash on delivery","Online Paid"]
    },
    address:{
        type:{},
        required:true
    },
    product:[  {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product", // Correctly defined ref to the product model
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      size: {
        type: String,
      },
      totalItem: {
        type: Number,
        required: true,
      },
    },
    ],
    orderById: {
      type: mongoose.Types.ObjectId,
      required: [true, "order by is required field!!"],
      ref: "Auth",
    },
    email: {
      type: String,
      required: [true, "Email required "],
    },
    isBookedSuccessfully: {
      type: Boolean
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

export default mongoose.model("order", orderSchema);
