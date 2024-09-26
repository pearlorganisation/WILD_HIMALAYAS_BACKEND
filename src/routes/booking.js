import express from "express";
import { bookingOrder, getAllBookings, getParticularBookings, verifyOrder } from "../controllers/booking.js";

const bookingRouter = express.Router();

bookingRouter.route("/").post(bookingOrder).get(getAllBookings);
bookingRouter.route("/verifyOrder/:id").post(verifyOrder);
bookingRouter.route("/:id").get(getParticularBookings);

export default bookingRouter;
