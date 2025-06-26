const express = require("express");
const { verifyToken } = require("../middleware/verifyToken");
const {
  newCheckout,
  updateCheckout,
  finalizeCheckout,
} = require("../controller/checkController");

const checkRouter = express.Router();

checkRouter.post("/", verifyToken, newCheckout);
checkRouter.put("/pay/:id", verifyToken, updateCheckout);
checkRouter.post("/finalize/:id", verifyToken, finalizeCheckout);

module.exports = checkRouter;
