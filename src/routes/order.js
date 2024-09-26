import express from "express";
import { codOrder, createOrder, getAllOrders, getParticularOrders, verifyOrder } from "../controllers/order.js";


const orderRouter = express.Router();

orderRouter.route("/onlineOrder").post(createOrder)
orderRouter.route("/verifyOrder/:id").post(verifyOrder);
orderRouter.route("/codOrder").post(codOrder);
orderRouter.route("/").get(getAllOrders);
orderRouter.route("/:id").get(getParticularOrders);

export default orderRouter;
