import type { SeoIssue } from "../seo/types.js";
import aiService from "./ai.service.js";
import { buildSeoFixPrompt } from "./prompts.js";

export async function generateFixSuggestions(issues: SeoIssue[]) {
	if (issues.length === 0) {
		return [];
	}

	const prompt = buildSeoFixPrompt(issues.slice(0, 10));

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
