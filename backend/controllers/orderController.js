import orderModel from "../models/orderModel.js";


const createOrder = async (req, res) => {
  try {
    const { userId, items, totalAmount } = req.body; 
      if (!userId || !items || !totalAmount) {
        return res.status(400).json({ message: "Missing data" });
      }
    const order = new orderModel({
      user: userId || "6804375d216c5b4f2cc86712", 
      items,
      totalAmount,
    });

    await order.save();

    res.status(201).json({ success: true, message: "Order placed successfully." });
  } catch (error) {
    console.log("Error while placing order:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is required." });
    }

    const orders = await orderModel
      .find({ user: userId })
      .populate("items.product");

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.log("Error while fetching user orders:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("user")
      .populate("items.product");

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.log("Error while fetching all orders:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { createOrder, getUserOrders, getAllOrders };
