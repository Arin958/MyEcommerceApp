const express = require("express");
const {
  addToCart,
  getCart,
  removeFromCart,
  mergeCarts,
  updateCartItem,
} = require("../controller/cartController");
const { verifyToken } = require("../middleware/verifyToken");

const cartRouter = express.Router();

const optionalAuth = async (req, res, next) => {
  console.log("🔍 [optionalAuth] Cookies:", req.cookies);

  if (req.cookies.token) {
    console.log("✅ Token found, verifying...");
    await verifyToken(req, res, next);
  } else {
    console.log("🚫 No token, guest access");
    next();
  }
};



cartRouter.post("/", optionalAuth, addToCart);
cartRouter.get("/", optionalAuth, getCart);
cartRouter.delete("/", optionalAuth, removeFromCart);
cartRouter.put("/", optionalAuth, updateCartItem);
cartRouter.post(
  "/merge",

  verifyToken,
  mergeCarts
);

module.exports = cartRouter;
