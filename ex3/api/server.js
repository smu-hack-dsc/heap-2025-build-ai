import cors from 'cors';
import morgan from 'morgan';
import express from "express";
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import chatRouter from './routes/chat.js';
import healthRouter from './routes/health.js';
import { config } from './config/index.js';

const app = express();

// Security Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'X-Forwarded-Host',
    'X-Forwarded-Proto',
    'X-Forwarded-For',
    'Cookie',
    'X-XSRF-TOKEN',
  ],
}));
app.use(
  rateLimit({
    windowMs: config.rateLimitWindow,
    max: config.rateLimitMax,
  })
);

// Utility middleware
app.use(express.json());
app.use(compression());
app.use(morgan('dev'));

// Routes
// Exercise 3 part 1b
// Mount the chatRouter on the /api/v1 route prefix so that all routes inside chatRouter are accessible under /api/v1.
// TODO
app.use('/api/health', healthRouter);

app.listen(config.port, () => {
    console.log(`Server running on port ${config.port} in ${config.nodeEnv} mode`);
  });