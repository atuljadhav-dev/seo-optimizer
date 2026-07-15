import { type Request } from 'express';

export const getUserId = (req: Request): string => {
	if (!req.user) {
		throw new Error('Authentication required');
	}

	return req.user._id;
};
