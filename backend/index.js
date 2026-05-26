import express from 'express';
import dotenv from 'dotenv';
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import cors from "cors";
import routes from "./src/routes/index.js"
import { connectRedis } from './src/config/redis.js';

dotenv.config();
const app = express();

// ✅ CORS first — before everything
app.use(cors({
  origin: function(origin, callback) {
    const allowed = ['http://localhost:5173', 'http://localhost:3000'];
    if (!origin || allowed.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, true); // allow all for now including file://
    }
  },
  credentials: true,
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
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT,async () => {
  await connectRedis();
  console.log(`🚀 Server running on port ${PORT}`);
});