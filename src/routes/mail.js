import express from "express";
import {verifySignupOtp } from "../controllers/mail.js";

const router = express.Router();


router.route("/verifySignupOtp/:token").post(verifySignupOtp);

export default router;