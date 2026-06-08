import express from 'express';
import dotenv from 'dotenv';
import helmet from "helmet";
import { createServer } from 'http';
import { Server } from 'socket.io';
import cookieParser from "cookie-parser";
import cors from "cors";
import routes from "./src/routes/index.js"
import { redisConnection } from './src/config/redis.js';
import { cleanPending } from './src/jobs/cleaningPending.js';
import { globalLimiter } from './src/middleware/ratelimiter.js';
import passport from "./src/config/passport.js"

dotenv.config();
const app = express();

const httpServer = createServer(app);

export const io = new Server(httpServer, {
  cors: {
    origin: [
      'http://localhost:5173',
      'http://localhost:3000',
      'https://fundo-doe.pages.dev'
    ],
    credentials: true
  }
})


// ✅ CORS first — before everything
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://fundo-doe.pages.dev'
  ],
  credentials: true,
}));


app.use(express.json({ limit: '10kb'}));
app.use(cookieParser());
app.use(passport.initialize()) 
app.use(helmet());
app.set('trust proxy', 1)  
app.use(globalLimiter)

app.use('/api', routes);
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
});

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT,async () => {
  cleanPending();
  await redisConnection();
  console.log(`🚀 Server running on port ${PORT}`);
});