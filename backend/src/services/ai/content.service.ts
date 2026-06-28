import aiService from "./ai.service.js";
import type { SeoReport } from "../seo/types.js";
import { buildMetaGenerationPrompt } from "./prompts.js";

interface GenerateMetaInput {
	url: string;
	currentTitle: string;
	currentMetaDescription: string;
	report: SeoReport;
}

export async function generateMetaContent(
	input: GenerateMetaInput,
) {
	const response = await aiService({
		content: buildMetaGenerationPrompt(input),
		config: {
			temperature: 0.4,
			maxOutputTokens: 800,
			responseMimeType: "application/json",
		},
	});

	return JSON.parse(response);
}