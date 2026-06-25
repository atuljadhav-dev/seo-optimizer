import aiService from './ai.service.js';
import type { SeoReport } from '../seo/types.js';
import { buildOptimizationPlanPrompt } from './prompts.js';

export async function generateOptimizationPlan(report: SeoReport) {
	const response = await aiService({
		content: buildOptimizationPlanPrompt(report),

		config: {
			temperature: 0.2,

			maxOutputTokens: 1800,

			responseMimeType: 'application/json',
		},
	});

	return JSON.parse(response);
}
