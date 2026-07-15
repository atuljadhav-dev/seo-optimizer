import aiService from './ai.service.js';
import { generateOutreachEmail } from './prompts.js';

export const createOutreachEmail = async (
	subject: string,
	content: string,
): Promise<string> => {
	const prompt = await generateOutreachEmail(subject, content);
	const response = await aiService({
		content: prompt,
		config: {
			temperature: 0.7,
			maxOutputTokens: 1000,
			responseMimeType: 'text/plain',
		},
	});
	return response;
}
