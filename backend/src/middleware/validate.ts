import { ZodError, type ZodTypeAny } from 'zod';
import { type Request, type Response, type NextFunction } from 'express';
import { errorResponse } from '../utils/apiResponse.js';
export const validate =
	(schema: ZodTypeAny) =>
	(req: Request, res: Response, next: NextFunction) => {
		try {
			schema.parse(req.body);
			next();
		} catch (error) {
			if (error instanceof ZodError) {
				const validationErrors = error.issues.map((err) => ({
					field: err.path.join('.'),
					message: err.message,
				}));
				return errorResponse(
					res,
					'Validation failed',
					400,
					validationErrors,
				);
			}

			next(error);
		}
	};
