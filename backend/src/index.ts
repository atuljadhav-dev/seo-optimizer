import express, { type Request, type Response } from 'express';
import dotenv from 'dotenv';
import { connectDatabase } from './config/db.config.js';
import authRoutes from './routes/auth.route.js';
import aiRoutes from './routes/ai.route.js';
import seoRoutes from './routes/seo.route.js';
import cors from 'cors';
import { logger } from './utils/logger.js';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import { errorMiddleware } from './middleware/error.middleware.js';
import { protect } from './middleware/auth.middleware.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;

app.use(express.json({ limit: '1mb' })); // Parse incoming JSON requests with a limit of 1MB
app.use(helmet()); // Security headers
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use((req, res, next) => {
	logger.info(`Incoming Request: [${req.method}] ${req.originalUrl}`);
	next();
});
app.use(
	cors({
		origin: process.env.FRONTEND_URL || 'http://localhost:5173', // Allow  Vite dev server
		methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
		allowedHeaders: ['Content-Type', 'Authorization'],
		credentials: true, // Crucial for reading/writing secure cookie layers across origins
	}),
);

connectDatabase();
app.get('/', (req: Request, res: Response) => {
	res.json({
		success: true,
		message: 'SEO Optimizer API is running.',
		version: '1.0.0',
	});
});
app.get('/health', (req: Request, res: Response) => {
	res.json({
		success: true,
		message: 'API is healthy and operational.',
		timestamp: new Date().toISOString(),
	});
});
app.use('/api/auth', authRoutes);
app.use('/api/ai', protect, aiRoutes);
app.use('/api/seo', protect, seoRoutes); // SEO routes are public for now, but can be protected later if needed
app.use((req: Request, res: Response) => {
	res.status(404).json({ success: false, message: 'Route not found' });
});
app.use(errorMiddleware); // Global error handling middleware
app.listen(PORT, () => {
	logger.info(`Server listening dynamically on http://localhost:${PORT}`);
});
