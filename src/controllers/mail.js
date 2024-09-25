import auth from "../models/auth.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import { sendOrderMail } from "../../utils/sendOrderMail.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
// -----------------------------------------------------------------------------------------------------------

export const verifySignupOtp = async (req, res) => {
  try {
    const { token } = req?.params;

    const isValidToken = jwt.verify(token, process.env.VERIFY_EMAIL_SECRET);

    if (!isValidToken) {
      return res.status(400).json({
        status: "FAILURE",
        message: "Email not verified/Invalid token",
      });
    }
    const { payload } = isValidToken;
    const {password,...rest} = payload

    const hashedPassword = await bcrypt.hash(password, 10);

    await auth.create({
      password:hashedPassword,
      ...rest,
      emailVerified: true,
    });

    res
      .status(200)
      .json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Internal Server Error! ${error.message}`,
    });
  }
};

export const OrderMail = asyncHandler(async (req, res, next) => {
  const { id } = req?.params;
 
  const { paymentType, createdAt, amount, email } = req?.body;

  // date conversion of createdAt
  let date = "";
  try {
    const dateParts = createdAt.split("T")[0].split("-"); // Split date part and then split by hyphen
    date = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`; // Rearrange to 'dd-mm-yyyy'
  } catch (error) {
    return res.status(400).json({ message: "Invalid date format" });
  }

  sendOrderMail(email, id, amount, date, paymentType).then(()=>{
    res.status(200).json({
      status: true,
      message: "Mail Sent Successfully",
    });
  }).catch((error)=>{
    console.log(error)
  })
 
});



