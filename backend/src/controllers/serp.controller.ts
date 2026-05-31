import { type Request,type Response } from 'express';
import { Serp } from '../models/serp.model.js';
import { errorResponse, successResponse } from '../utils/apiResponse.js';
import { getUserId } from '../middleware/guards.js';
export const getSerpMetrics = async (
	req: Request,
	res: Response,
): Promise<void> => {
	try {
		const userId = getUserId(req); // Extract user ID from request context
		const metrics = await Serp.find({ userId }).sort({
			checkedAt: -1,
		});
		successResponse(
			res,
			'SERP metrics retrieved successfully.',
			metrics,
			200,
		);
	} catch (error) {
		errorResponse(res, 'Failed to fetch SERP metrics', 500);
	}
};

export const logSerpCheck = async (
	req: Request,
	res: Response,
): Promise<void> => {
	try {
		const { keyword, rank, targetUrl } = req.body;
		const userId = getUserId(req); // Extract user ID from request context
		const newEntry = new Serp({
			userId,
			keyword,
			rank,
			targetUrl,
		});
		await newEntry.save();
		successResponse(res, 'SERP metric logged successfully.', newEntry, 201);
	} catch (error) {
		errorResponse(res, 'Failed to log SERP metric', 500);
	}
};
