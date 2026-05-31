import { type Request, type Response, type NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { errorResponse } from '../utils/apiResponse.js';
export const protect = async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	let token: string | undefined;

	// Check if token exists in Authorization header (Bearer <token>)
	if (req.headers.authorization?.startsWith('Bearer')) {
		token = req.headers.authorization.split(' ')[1]; // Extract the token from the header
	}

	if (!token) {
		// If no token is provided, respond with a 401 Unauthorized status
		errorResponse(res, 'Not authorized, no token provided', 401);
		return;
	}

	try {
		const jwtSecret = process.env.JWT_SECRET;
		if (!jwtSecret) {
			throw new Error('JWT_SECRET environmental variable is missing.');
		}

		// Verify token payload structural validity
		const decoded = jwt.verify(token, jwtSecret) as { _id: string };
		if (!decoded || !decoded._id) {
			throw new Error('Invalid token payload structure.');
		}
		// Inject the decoded user information dynamically into the request context
		req.user = { _id: decoded._id };
		// Call the next middleware or route handler in the chain
		next();
	} catch (error) {
		errorResponse(res, 'Not authorized, invalid token', 401);
	}
};
