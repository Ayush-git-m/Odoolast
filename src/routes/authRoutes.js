const express = require("express");
const router = express.Router();

const {
    register,
    verifyOtp,
    login,
    forgotPasswordController,
    verifyResetOtpController,
    resetPasswordController
} = require("../controllers/authController");

router.post("/register", register);
router.post("/verify-otp", verifyOtp);
router.post("/login", login);
router.post("/forgot-password", forgotPasswordController);
router.post("/verify-reset-otp", verifyResetOtpController);
router.post("/reset-password", resetPasswordController);
module.exports = router;