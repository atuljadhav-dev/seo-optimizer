import { type Request, type Response, type NextFunction } from 'express';

export const asyncHandler =
	(
		fn: (
			req: Request | Request,
			res: Response,
			next: NextFunction,
		) => Promise<void>,
	) =>
	(req: Request | Request, res: Response, next: NextFunction) => {
		Promise.resolve(fn(req, res, next)).catch(next);
	};
