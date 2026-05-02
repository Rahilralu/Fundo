import express from "express"
import {
  register,
  login,
  refresh,
  logout,
  me
} from "../controllers/auth.controller.js"

import { authenticate_token } from "../middlewares/auth.middleware.js"

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

export default router