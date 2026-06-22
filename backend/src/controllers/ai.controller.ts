import { type Request, type Response } from 'express';
import aiService from '../services/ai/ai.service.js';
import { successResponse, errorResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const processChatInstruction = asyncHandler(
	async (req: Request, res: Response): Promise<void> => {
		const { prompt } = req.body;

		if (!prompt) {
			errorResponse(
				res,
				'A chat prompt is required to process request.',
				400,
			);
			return;
		}

		const aiResponse = await aiService({
			content: prompt,
			config: {
				systemInstruction:
					'You are an expert AI SEO Optimizer assistant. Provide concise, highly actionable growth strategies regarding meta configurations, keywords, content density, and backlink outreach pipelines. Keep answers short and technical.',
				temperature: 0.7,
				maxOutputTokens: 500,
			},
		});

		successResponse(res, 'AI response generated successfully', {
			reply: aiResponse,
		});
	},
);
