import express from 'express';
import dotenv from 'dotenv';
import helmet from "helmet";
import { pool } from './src/config/psql.js';
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(helmet());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,  // 15 minutes
    max: 100,                    // 100 requests per window
    message: { error: 'Too many requests, slow down' }
});

app.use(limiter);

app.use(cors({
    origin: [
        'http://localhost:5173/'
    ],
    credentials: true
}));

app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.send({
      message: 'Server running',
      time: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB connection failed' });
  }
});

// app.use('/api',routes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});