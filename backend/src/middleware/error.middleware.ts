import { type NextFunction, type Request, type Response } from 'express';
import { errorResponse } from '../utils/apiResponse.js';

export const errorMiddleware = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	console.error(err);

	return errorResponse(res, 'Internal Server Error', 500, err.message);
};
