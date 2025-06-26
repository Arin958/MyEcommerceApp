const express = require("express");
const { createProduct, editProduct, deleteProduct, fetchAllProducts } = require("../controller/productAdminControllers");
const { verifyToken } = require("../middleware/verifyToken");
const admin = require("../middleware/admin");
const upload = require("../middleware/uploadMiddleware");

const productAdminRouter = express.Router();

productAdminRouter.get("/", verifyToken, admin, fetchAllProducts);

productAdminRouter.post(
  "/",
  verifyToken,
  admin,
  upload.array("images", 5),
  createProduct
);

productAdminRouter.put(
  "/:id",
  verifyToken,
  admin,
  upload.array("images", 5),
  editProduct
);

productAdminRouter.delete(
  "/:id",
  verifyToken,
  admin,
  deleteProduct
);

module.exports = productAdminRouter;
