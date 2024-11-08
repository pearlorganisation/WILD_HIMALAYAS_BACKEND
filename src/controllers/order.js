import { razorpayInstance } from "../../configs/razorpay.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import crypto from "crypto";
import order from "../models/order.js";


export const createOrder = asyncHandler(async (req, res, next) => {

    const {amount,orderById,email,product,address} = req?.body
    const newBooking = await order.create({
      amount,
      orderById,
      email,
      paymentType: "Online Paid",
      product,
      address,
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
        await order.findByIdAndDelete(newBooking._id);
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
        await order.findByIdAndDelete(req?.params?.id);
        return res.redirect(`${process.env.FRONTEND_LIVE_URL}/paymentFailed/`);
      }
  
      const updateBooking = await order.findByIdAndUpdate(req?.params?.id, {
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
      await order.findByIdAndDelete(req?.params?.id);
      res
        .status(400)
        .json({ status: false, message: e?.message || "Internal server error" });
    }
  });

  export const codOrder= asyncHandler(async(req,res)=>{
    const {amount,orderById,email,product,address} = req?.body
    const newBooking = await order.create({
      amount,
      orderById,
      email,
      paymentType: "Cash on delivery",
      product,
      address,
    });

    res.status(201).json({
      status:true,
      message:"Cash on Delivery order is placed.",
      data : newBooking
    })
  })

  export const getAllOrders = asyncHandler(async(req,res)=>{
    const data = await order.find({
      $or:[
        {isBookedSuccessfully:true},
        {isBookedSuccessfully:{$exists:false}}
      ]
    }).sort({createdAt:-1}).populate("product.productId").populate("orderById")
    
    res.status(200).json({
      status: true,
      message:
        data?.length >= 1 ? "data found successfully!!" : "No data found!!",
      data,
    });
  })

  export const getParticularOrders = asyncHandler(async(req,res)=>{
    const {id}= req?.params
    const data = await order.find({
      $and:[
        {orderById:id},
        {
          $or: [
            { isBookedSuccessfully: true },
            { isBookedSuccessfully: { $exists: false } }
          ]
        }
      ]
    }).sort({createdAt:-1}).populate("product.productId")
    
    res.status(200).json({
      status: true,
      message:
        data?.length >= 1 ? "data found successfully!!" : "No data found!!",
      data,
    });
  })