import express from 'express';
import dotenv from 'dotenv';
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import cors from "cors";
import routes from "./src/routes/index.js"

dotenv.config();
const app = express();

// ✅ CORS first — before everything
app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Too many requests, slow down' }
});
app.use(limiter);

app.use('/api', routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});