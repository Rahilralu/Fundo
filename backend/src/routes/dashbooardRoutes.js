import express from "express";
import { getDashboardStats } from "../controllers/dashboard.controllers.js";
import { authenticate_token } from "../middleware/auth.js";

const router = express.Router();

router.get('/stats',authenticate_token,getDashboardStats);

export default router;