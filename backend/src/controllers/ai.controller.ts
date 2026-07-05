import { type Request, type Response } from 'express';
import aiService from '../services/ai/ai.service.js';
import { successResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { generateFixSuggestions } from '../services/ai/seo-fix.service.js';

export const processChatInstruction = asyncHandler(
	async (req: Request, res: Response): Promise<void> => {
		const { prompt } = req.body;
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

export const processSeoFixSuggestions = asyncHandler(
	async (req: Request, res: Response): Promise<void> => {
		const { issues, about } = req.body;
		const aiResponse = await generateFixSuggestions(issues, about);
		successResponse(res, 'AI response generated successfully', {
			reply: aiResponse,
		});
	},
);
