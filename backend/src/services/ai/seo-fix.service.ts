import type { SeoIssue } from '../seo/types.js';
import aiService from './ai.service.js';
import { buildSeoFixPrompt } from './prompts.js';

export const generateFixSuggestions = async (
	issues: SeoIssue[],
	about: string,
): Promise<any> => {
	if (issues.length === 0) {
		return [];
	}
	issues = issues.filter((issue) => issue.aiFix);
	const coissues = issues.map((issue) => ({
		_id: issue._id,
		title: issue.title,
		description: issue.description,
	}));
	let response: any;
	if (coissues.length === 0) {
		return [];
	}
	if (coissues.length < 10) {
		const prompt = buildSeoFixPrompt(coissues, about);
		response = await aiService({
			content: prompt,
			config: {
				temperature: 0.2,
				maxOutputTokens: 1500,
				responseMimeType: 'application/json',
			},
		});
	} else {
		let batchSize = 10;
		let batchResponses: any[] = [];
		for (let i = 0; i < coissues.length; i += batchSize) {
			const batch = coissues.slice(i, i + batchSize);
			const prompt = buildSeoFixPrompt(batch, about);
			const batchResponse = await aiService({
				content: prompt,
				config: {
					temperature: 0.2,
					maxOutputTokens: 1500,
					responseMimeType: 'application/json',
				},
			});
			batchResponses.push(...JSON.parse(batchResponse));
		}
		response = JSON.stringify(batchResponses);
	}

	return JSON.parse(response);
};
