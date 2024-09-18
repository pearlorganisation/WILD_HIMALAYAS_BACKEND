import express from "express";
import { bookingOrder, verifyOrder } from "../controllers/booking.js";

const bookingRouter = express.Router();

bookingRouter.route("/").post(bookingOrder);
bookingRouter.route("/verifyOrder/:id").post(verifyOrder);

export default bookingRouter;
