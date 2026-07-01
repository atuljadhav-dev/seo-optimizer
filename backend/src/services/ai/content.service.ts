import aiService from './ai.service.js';
import type { SeoReport } from '../seo/types.js';
import { buildHeadingGenerationPrompt, buildMetaGenerationPrompt } from './prompts.js';

interface GenerateMetaInput {
	url: string;
	currentTitle: string;
	currentMetaDescription: string;
	report: SeoReport;
}

export async function generateMetaContent(input: GenerateMetaInput) {
	const response = await aiService({
		content: buildMetaGenerationPrompt(input),
		config: {
			temperature: 0.4,
			maxOutputTokens: 800,
			responseMimeType: 'application/json',
		},
	});

	return JSON.parse(response);
}
interface GenerateHeadingInput {
	url: string;
	currentTitle: string;
	currentHeadings: { level: number; text: string }[];
	report: SeoReport;
}

export async function generateHeadingStructure(input: GenerateHeadingInput) {
	const response = await aiService({
		content: buildHeadingGenerationPrompt(input),
		config: {
			temperature: 0.4,
			maxOutputTokens: 1200,
			responseMimeType: 'application/json',
		},
	});

	return JSON.parse(response);
}
