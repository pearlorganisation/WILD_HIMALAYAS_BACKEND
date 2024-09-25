import express from "express";
import {OrderMail, verifySignupOtp } from "../controllers/mail.js";

const router = express.Router();


router.route("/verifySignupOtp/:token").post(verifySignupOtp);
router.route("/sendOrderMail/:id").post(OrderMail);

export default router;