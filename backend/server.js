const express = require("express");
const connectDB = require("./config/db");
const authRouter = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");
const productAdminRouter = require("./routes/productAdminRoutes");
const productUserRouter = require("./routes/productUserRoutes");
const cartRouter = require("./routes/cartRoutes");
const checkRouter = require("./routes/checkRoutes");
const cleanCheckouts = require("./utils/cronjobs");
const orderRouter = require("./routes/orderRoutes");
const orderAdminRoutes = require("./routes/adminOrderRoute");
const reviewRouter = require("./routes/reviewRoutes");
require("dotenv").config();

require("./utils/cronjobs");

// Database connection
connectDB();

const PORT = process.env.PORT || 5000;

// CORS Configuration - MUST come before other middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Hardcode for development
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Cookie parser - should come after CORS but before routes
app.use(cookieParser());

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRouter);
app.use("/api/admin", productAdminRouter);
app.use("/api/products", productUserRouter);
app.use("/api/cart", cartRouter);
app.use("/api/checkout", checkRouter);
app.use("/api/order", orderRouter);
app.use("/api/adminOrder", orderAdminRoutes);
app.use("/api/reviews", reviewRouter)
// Test endpoint for cookies
app.get("/api/test-cookies", (req, res) => {
  try {
    res.json({
      success: true,
      cookies: req.cookies.token,
      headers: req.headers.cookie,
    });
  } catch (error) {
    console.error("Error in /api/test-cookies:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port http://localhost:${PORT}`);
});
