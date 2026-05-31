import { type Request, type Response } from 'express';
import Domain from '../models/domain.model.js';
import { errorResponse, successResponse } from '../utils/apiResponse.js';
import { getUserId } from '../middleware/guards.js';
export const trackNewDomain = async (
	req: Request,
	res: Response,
): Promise<void> => {
	try {
		const userId = getUserId(req); // Extract user ID from request context
		const { url, seoScore, loadSpeed, sslValid, indexedPages } = req.body;

		if (!url) {
			errorResponse(res, 'Domain URL is required.', 400);
			return;
		}

		const cleanUrl = url.replace(/^(https?:\/\/)?(www\.)?/, '').trim();
		const domainEntry = await Domain.create({
			user: userId,
			url: cleanUrl,
			seoScore: seoScore || 0,
			loadSpeed: loadSpeed || '0.0s',
			sslValid: !!sslValid,
			indexedPages: indexedPages || 0,
		});

		successResponse(res, 'Domain tracked successfully.', domainEntry, 201);
	} catch (error) {
		console.error('Domain Analytics Tracking Failure:', error);
		errorResponse(res, 'Internal server error while tracking asset.', 500);
	}
};

export const getUserDomains = async (
	req: Request,
	res: Response,
): Promise<void> => {
	const userId = getUserId(req); // Extract user ID from request context
	try {
		const historicalEntries = await Domain.find({
			user: userId,
		}).sort({ createdAt: -1 });
		successResponse(
			res,
			'Domain history retrieved successfully.',
			historicalEntries,
			200,
		);
	} catch (error) {
		console.error('Domain History Query Failure:', error);
		errorResponse(res, 'Internal server error retrieving history.', 500);
	}
};
