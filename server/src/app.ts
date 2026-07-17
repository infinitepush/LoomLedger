import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { env } from './config/env';
import { errorMiddleware, notFoundHandler } from './middlewares/error.middleware';
import routes from './routes';
import { logger } from './utils/logger';

const app = express();

// Security Headers
app.use(helmet());

// CORS config
app.use(
  cors({
    origin: [env.FRONTEND_URL, 'http://localhost:3000'],
    credentials: true,
  })
);

// Compression
app.use(compression());

// Logging Requests
const morganFormat = env.NODE_ENV === 'development' ? 'dev' : 'combined';
app.use(morgan(morganFormat, { stream: { write: (message) => logger.info(message.trim()) } }));

// JSON / Urlencoded parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate Limiting
const limiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  max: env.RATE_LIMIT_MAX_REQUESTS,
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', limiter);

// Register API Routes
app.use('/api', routes);

// Base Route
app.get('/', (_req, res) => {
  res.json({ message: 'LoomLedger API Server Running' });
});

// Not Found Handler
app.use(notFoundHandler);

// Centralized Error Middleware
app.use(errorMiddleware);

export default app;
