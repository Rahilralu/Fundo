import express from "express"
import {
  register,
  login,
  refresh,
  logout,
  me
} from "../controllers/auth.controllers.js"
import { otpStore, verifiedEmails } from '../store/otpStore.js';
import { authenticate_token,cookie_validator } from "../middleware/auth.js"
import { generateOTP } from "../utils/otp.js";
import { sendEmail } from "../services/mailer.js";
import { sendOtp,verifyOtp } from "../controllers/otp.controllers.js";

const router = express.Router()
// Register

router.post("/register", register)
// Login
router.post("/login", login)
// Refresh access token
router.post("/refresh", cookie_validator) 
router.post("/refresh", refresh)
// Logout
router.post("/logout", logout)
// Get current user (protected)
router.get("/me", authenticate_token, me)


// router.post('/send-otp',sendOtp)

// router.post('/verify-otp',verifyOtp);

export default router