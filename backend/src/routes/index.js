import express from "express"
import authRoutes from "./authroutes.js"

const router = express.Router()

// Group routes
router.use("/auth", authRoutes)

export default router