import express from "express";
import { codOrder, createOrder, getAllOrders, verifyOrder } from "../controllers/order.js";


const orderRouter = express.Router();

orderRouter.route("/onlineOrder").post(createOrder)
orderRouter.route("/verifyOrder/:id").post(verifyOrder);
orderRouter.route("/codOrder").post(codOrder);
orderRouter.route("/").get(getAllOrders);

export default orderRouter;
