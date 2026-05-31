import { type Request, type Response } from 'express';
import Outreach from '../models/outreach.model.js';
import { errorResponse, successResponse } from '../utils/apiResponse.js';
import { getUserId } from '../middleware/guards.js';
export const createOutreachPipeline = async (
	req: Request,
	res: Response,
): Promise<void> => {
	try {
		const userId = getUserId(req); // Extract user ID from request context
		const { targetDomain, contactEmail, category } = req.body;

		if (!targetDomain || !contactEmail) {
			errorResponse(
				res,
				'Target domain and contact email are explicitly required.',
				400,
			);
			return;
		}

		const cleanDomain = targetDomain
			.replace(/^(https?:\/\/)?(www\.)?/, '')
			.trim();

		const outreachEntry = await Outreach.create({
			user: userId,
			targetDomain: cleanDomain,
			contactEmail,
			category,
			status: 'Pending',
		});
		successResponse(
			res,
			'Outreach pipeline entry created successfully.',
			outreachEntry,
			201,
		);
	} catch (error) {
		console.error('Outreach Log Insertion Failure:', error);
		errorResponse(
			res,
			'Internal server error tracking pipeline entry.',
			500,
		);
	}
};

export const getUserOutreachPipelines = async (
	req: Request,
	res: Response,
): Promise<void> => {
	const userId = getUserId(req); // Extract user ID from request context
	try {
		const pipelines = await Outreach.find({ user: userId }).sort({
			createdAt: -1,
		});
		successResponse(
			res,
			'Outreach pipelines retrieved successfully.',
			pipelines,
			200,
		);
	} catch (error) {
		console.error('Outreach Pipelines Query Failure:', error);
		errorResponse(
			res,
			'Internal server error fetching pipeline summaries.',
			500,
		);
	}
};
