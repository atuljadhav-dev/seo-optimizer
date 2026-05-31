import { type Request, type Response } from 'express';
import Keyword from '../models/keyword.model.js';
import { errorResponse, successResponse } from '../utils/apiResponse.js';
import { getUserId } from '../middleware/guards.js';
export const trackKeywordsList = async (
	req: Request,
	res: Response,
): Promise<void> => {
	try {
		const userId = getUserId(req); // Extract user ID from request context
		const { phrasesList } = req.body; // Expecting an array of computed keyword objects

		if (!phrasesList || !Array.isArray(phrasesList)) {
			errorResponse(
				res,
				'A valid array of keywords data payload is required.',
				400,
			);
			return;
		}

		// Map user identifier into every item to align schema query bindings
		const payloadData = phrasesList.map((item) => ({
			...item,
			user: userId,
		}));

		const storedKeywords = await Keyword.insertMany(payloadData);
		successResponse(
			res,
			'Keywords tracked successfully.',
			storedKeywords,
			201,
		);
	} catch (error) {
		console.error('Keyword Analytics Ingestion Failure:', error);
		errorResponse(
			res,
			'Internal server error processing keyword dataset.',
			500,
		);
	}
};

export const getUserKeywords = async (
	req: Request,
	res: Response,
): Promise<void> => {
	try {
		const userId = getUserId(req); // Extract user ID from request context
        
		const savedPhrases = await Keyword.find({ user: userId }).sort({
			createdAt: -1,
		});
		successResponse(
			res,
			'Tracked keywords retrieved successfully.',
			savedPhrases,
			200,
		);
	} catch (error) {
		console.error('Keywords Dataset Retrieval Failure:', error);
		errorResponse(
			res,
			'Internal server error pulling tracked metadata profiles.',
			500,
		);
	}
};
