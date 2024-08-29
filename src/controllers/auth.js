import { asyncHandler } from "../../utils/asyncHandler.js";
import errorResponse from "../../utils/errorResponse.js";
import auth from "../models/auth.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { generateSignupToken } from "../../utils/other.js";
import { sendMail } from "../../utils/sendMail.js";
import signupOtp from "../models/signupOtp.js";

// @desc - register new user
// @route - POST api/v1/auth/signup
export const signup = asyncHandler(async (req, res, next) => {
  const {
    email
  } = req?.body;

  const existingUser = await auth.findOne({ email });
  if (existingUser)
    return next(new errorResponse("User already exists!!", 400));

  const url =
    process.env.NODE_ENV === "PRODUCTION"
      ? process.env.FRONTEND_LIVE_URL
      : process.env.FRONTEND_LOCAL_URL;

  const token = generateSignupToken(req?.body);

  const finalUrl = `${url}${token}`;
  ///// nodemailer ////////

  sendMail(email, finalUrl, token)
    .then(() => {
      return res
        .status(200)
        .json({ success: true, message: "Mail sent successfully" });
    })
    .catch((error) => {
      res.status(400).json({
        success: false,
        message: `Unable to send mail! ${error.message}`,
      });
    });
});

// @desc - login user
// @route - POST api/v1/auth/login
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req?.body;
  const existingUser = await auth.findOne({ email });

  if (!existingUser) return next(new errorResponse("No user found!!", 400));
  const isValidPassword = await bcrypt.compare(
    password,
    existingUser?.password
  );
  if (!isValidPassword) return next(new errorResponse("Wrong password!!", 400));

  const token = jwt.sign(
    { userId: existingUser?._id },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );

  const cookieValidity = new Date(
    new Date().getTime() + 15 * 24 * 60 * 60 * 1000
  ); //// 15 days

  res
    .cookie("WH_TOKEN", token, {
      httpOnly: true,
      expires: cookieValidity,
    })
    .status(200)
    .json({ status: true, message: "Logged in successfully!!" , data: existingUser });
});

// @desc - logout user
// @route - POST api/v1/auth/logout
export const logout = asyncHandler(async (req, res, next) => {
  res.clearCookie("WH_TOKEN");
  res.status(200).json({ status: true, message: "Logout successfully!!" });
});

// @desc - refreshing expire jwt token(Creating new token(refresh token))
// @route - POST api/v1/auth/refreshToken
export const refreshToken = asyncHandler(async (req, res, next) => {
  res.clearCookie("WH_TOKEN"); //removing existing token

  const token = jwt.sign(
    { userId: existingUser?._id },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );

  const cookieValidity = new Date(
    new Date().getTime() + 15 * 24 * 60 * 60 * 1000
  ); //15 days

  res.cookie("WH_TOKEN", token, {
    httpOnly: true,
    expires: cookieValidity,
  }); // saving new token(refresh token) in cookie

  res
    .status(200)
    .json({ status: true, message: "Refresh token created successfully!!" });
});
