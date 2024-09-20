import express from "express";
import { bookingOrder, getAllBookings, verifyOrder } from "../controllers/booking.js";

const bookingRouter = express.Router();

bookingRouter.route("/").post(bookingOrder).get(getAllBookings);
bookingRouter.route("/verifyOrder/:id").post(verifyOrder);

export default bookingRouter;
