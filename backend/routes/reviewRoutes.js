const express = require("express");
const { verifyToken } = require("../middleware/verifyToken");
const { createReview, getReviewsByProduct } = require("../controller/reviewController");

const reviewRouter = express.Router();

reviewRouter.get("/:productId",getReviewsByProduct)
reviewRouter.post("/", verifyToken, createReview)

module.exports = reviewRouter