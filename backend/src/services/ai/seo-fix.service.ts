import type { SeoIssue } from '../seo/types.js';
import aiService from './ai.service.js';
import { buildSeoFixPrompt } from './prompts.js';

export const generateFixSuggestions = async (issues: SeoIssue[],about:string): Promise<any> => {
	if (issues.length === 0) {
		return [];
	}
	issues = issues.filter((issue) => issue.aiFix);
	const coissues = issues.map((issue) => ({
		_id: issue._id,
		title: issue.title,
		description: issue.description,
	}));
	const prompt = buildSeoFixPrompt(coissues.slice(0, 10),about);
	const response = await aiService({
		content: prompt,
		config: {
			temperature: 0.2,
			maxOutputTokens: 1500,
			responseMimeType: 'application/json',
		},
	});

	return JSON.parse(response);
}
