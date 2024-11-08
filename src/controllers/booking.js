import { razorpayInstance } from "../../configs/razorpay.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import booking from "../models/booking.js";
import crypto from "crypto";
import tour from "../models/tour.js";


export const bookingOrder = asyncHandler(async (req, res, next) => {

    const {amount,orderById,email,memberNames,tourDate,tourId} = req?.body
    const newBooking = await booking.create({
      amount: amount,
      memberNames: memberNames,
      orderById: orderById,
      email: email,
      tourDate:tourDate,
      tourId:tourId
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
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature, tourDate,tourId,memberNames } =
      await req.body;

      const {startDate,endDate} = tourDate
      // console.log(req.body)
  
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

          // Find the tour by the startDate and endDate in availableDates
    const tourData = await tour.findById(tourId);

console.log(tourData, "hsdvbsdvsdbvsdv")
     // Find the specific date in the availableDates array
     const dateToUpdate = tourData.availableDates.find(
      (date) => date.startDate === startDate && date.endDate === endDate
    );
    console.log(dateToUpdate)
        if (dateToUpdate) {
          // Update totalBooked and vacantSeats
          dateToUpdate.totalBooked = (dateToUpdate.totalBooked || 0) + memberNames;
          // Save the updated tour document
          await tourData.save();
        }
  
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

  export const getParticularBookings = asyncHandler(async(req,res)=>{
    const {id}= req?.params
    const data = await booking.find({
      $and:[
       { orderById:id},
       { isBookedSuccessfully:true}
    ]
    }).sort({createdAt:-1}).populate("tourId")
    
    res.status(200).json({
      status: true,
      message:
        data?.length >= 1 ? "data found successfully!!" : "No data found!!",
      data,
    });
  })
  export const getAllBookings = asyncHandler(async(req,res)=>{
    const data = await booking.find({isBookedSuccessfully:true}).sort({createdAt:-1}).populate("tourId")
    
    res.status(200).json({
      status: true,
      message:
        data?.length >= 1 ? "data found successfully!!" : "No data found!!",
      data,
    });
  })