const express = require("express");
const { getMyOrders, getOrderById } = require("../controller/orderController");
const { verifyToken } = require("../middleware/verifyToken");

const orderRouter = express.Router();

orderRouter.get("/", verifyToken, getMyOrders);
orderRouter.get("/:id", verifyToken, getOrderById);

module.exports = orderRouter;
