import express, { type Request, type Response } from 'express';
import dotenv from 'dotenv';
import { connectDatabase } from './config/db.config.js';
import authRoutes from './routes/auth.route.js';
import aiRoutes from './routes/ai.route.js';
import domainRoutes from './routes/domain.route.js';
import keywordRoutes from './routes/keyword.route.js';
import outreachRoutes from './routes/outreach.route.js';
import serpRoutes from './routes/serp.route.js';
import parserRoutes from './routes/parser.route.js';
import backlinkRoutes from './routes/backlink.route.js';
import cors from 'cors';
import { logger } from './utils/logger.js';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import { errorMiddleware } from './middleware/error.middleware.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;

app.use(express.json({ limit: '1mb' }));
app.use(helmet());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use((req, res, next) => {
	logger.info(`Incoming Request: [${req.method}] ${req.originalUrl}`);
	next();
});
app.use(
	cors({
		origin: process.env.FRONTEND_URL || 'http://localhost:5173', // Allow your Vite dev server
		methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
		allowedHeaders: ['Content-Type', 'Authorization'],
		credentials: true, // Crucial for reading/writing secure cookie layers across origins
	}),
);

connectDatabase();

app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/domains', domainRoutes);
app.use('/api/keywords', keywordRoutes);
app.use('/api/outreach', outreachRoutes);
app.use('/api/serp', serpRoutes);
app.use('/api/parser', parserRoutes);
app.use('/api/backlink', backlinkRoutes);

app.get('/', (req: Request, res: Response) => {
	res.json({
		success: true,
		message: 'SEO Optimizer API is running.',
		version: '1.0.0',
	});
});
app.use(errorMiddleware);
app.listen(PORT, () => {
	logger.info(`Server listening dynamically on http://localhost:${PORT}`);
});
