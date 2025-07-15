import express from "express";
import {
  createOrder,
  getUserOrders,
  getAllOrders,
} from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/new", createOrder);
orderRouter.get("/user-orders", getUserOrders);
orderRouter.get("/all", getAllOrders);

export default orderRouter;
