import { type Request } from 'express';

export function getUserId(req: Request): string {
	if (!req.user) {
		throw new Error('Authentication required');
	}

	return req.user._id;
}
