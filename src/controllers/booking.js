import { razorpayInstance } from "../../configs/razorpay.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import booking from "../models/booking.js";
import crypto from "crypto";


export const bookingOrder = asyncHandler(async (req, res, next) => {

    const {amount,orderById,email,memberNames,tourDate} = req?.body
    const newBooking = await booking.create({
      amount: amount,
      memberNames: memberNames,
      orderById: orderById,
      email: email,
      tourDate:tourDate
    });
  
    const options = {
      amount: Number(amount * 100),
      currency: "INR",
    };
  
    razorpayInstance.orders
      .create(options)
      .then((order) => {
        res.status(200).json({
          success: true,
          order,
          bookingId: newBooking?._id,
        });
      })
      .catch(async (err) => {
        await booking.findByIdAndDelete(newBooking._id);
        return res.status(400).json({
          status: false,
          message: err?.message || err,
        });
      });
  });


  export const verifyOrder = asyncHandler(async (req, res) => {
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      await req.body;
      console.log(req.body)
  
      const body = razorpay_order_id + "|" + razorpay_payment_id;
  
      const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest("hex");
  
      const isAuthentic = expectedSignature === razorpay_signature;
  
      if (!isAuthentic) {
        await booking.findByIdAndDelete(req?.params?.id);
        return res.redirect(`${process.env.FRONTEND_LIVE_URL}/paymentFailed/`);
      }
  
      const updateBooking = await booking.findByIdAndUpdate(req?.params?.id, {
        razorpay_order_id,
        isBookedSuccessfully: true,
        razorpay_payment_id,
      });
  
      res.status(200).json({
        status: true,
        message: "Payment verified successfully!!",
        data: updateBooking,
      });
    } catch (e) {
      await booking.findByIdAndDelete(req?.params?.id);
      res
        .status(400)
        .json({ status: false, message: e?.message || "Internal server error" });
    }
  });