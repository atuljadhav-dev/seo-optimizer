import aiService from './ai.service.js';
import type { SeoIssue } from '../seo/types.js';
import { buildIssueExplanationPrompt } from './prompts.js';

export async function explainIssues(issues: SeoIssue[]) {
	if (!issues.length) {
		return [];
	}

	const response = await aiService({
		content: buildIssueExplanationPrompt(issues.slice(0, 10)),

		config: {
			temperature: 0.2,

			maxOutputTokens: 1500,

			responseMimeType: 'application/json',
		},
	});

	return JSON.parse(response);
}
