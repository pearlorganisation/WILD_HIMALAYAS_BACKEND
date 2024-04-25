import auth from "../models/auth.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
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
