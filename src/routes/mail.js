import express from "express";
import {verifySignupOtp } from "../controllers/mail.js";

const router = express.Router();


router.route("/verifySignupOtp/:otp").post(verifySignupOtp);

export default router;