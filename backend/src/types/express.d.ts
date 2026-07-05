import { Request } from 'express';
// Extend the Express Request interface to include a user property
declare global {
	namespace Express {
		interface Request {
			user?: { _id: string };
		}
	}
}
