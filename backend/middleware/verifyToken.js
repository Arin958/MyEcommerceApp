const jwt = require("jsonwebtoken");
const User = require("../model/User");
const verifyToken = async (req, res, next) => {
  const token = req.cookies.token;

  
  if (!token) {
    console.log("No token provided");
    return res.status(401).json({ success: false, message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("name email role isVerified lastLogin");
    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }
    req.user = user;
    req.id = decoded.id;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
};

const admin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  next();
};


module.exports = { verifyToken, admin };
