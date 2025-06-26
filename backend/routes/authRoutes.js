const express = require("express");
const { signUp, checkAuth, login, logout, forgotPassoword, resetPassword, verifyEmail } = require("../controller/authController");
const { verifyToken } = require("../middleware/verifyToken");
const authRouter = express.Router();

authRouter.get("/check-auth", verifyToken, checkAuth);
authRouter.post("/signup", signUp);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/forgot-password", forgotPassoword)
authRouter.post("/reset-password:token", resetPassword)
authRouter.post("/verify-email", verifyEmail)


module.exports = authRouter;
