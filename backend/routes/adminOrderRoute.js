const express = require("express");
const {
  getAllOrders,
  updateOrderStatus,
  deleteOrder,
} = require("../controller/adminOrderController");
const { verifyToken, admin } = require("../middleware/verifyToken");

const orderAdminRoutes = express.Router();

orderAdminRoutes.get("/", verifyToken, admin, getAllOrders);

orderAdminRoutes.put("/:id", verifyToken, admin, updateOrderStatus);
orderAdminRoutes.delete("/:id", verifyToken, admin, deleteOrder);

module.exports = orderAdminRoutes;
