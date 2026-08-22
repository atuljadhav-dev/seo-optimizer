import { type NextFunction, type Request, type Response } from 'express';
import { errorResponse } from '../utils/apiResponse.js';
import { logger } from '../utils/logger.js';

export const errorMiddleware = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	logger.error(err);
	return errorResponse(res, 'Internal Server Error', 500);
};
