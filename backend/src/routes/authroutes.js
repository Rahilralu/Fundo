import express from "express"
import {
  register,
  login,
  refresh,
  logout,
  me
} from "../controllers/auth.controllers.js"
import { authenticate_token,cookie_validator } from "../middleware/auth.js"
import { sendOtp,verifyOtp } from "../controllers/otp.controllers.js";
import { authLimiter } from "../middleware/ratelimiter.js"

const router = express.Router()
// Register

router.post("/register",authLimiter, register)
// Login
router.post("/login", authLimiter,login)
// Refresh access token
router.post("/refresh", cookie_validator,refresh) 
// Logout
router.post("/logout", logout)
// Get current user (protected)
router.get("/me", authenticate_token, me)

router.post('/send-otp',authLimiter,sendOtp)

router.post('/verify-otp',authLimiter,verifyOtp);

export default router