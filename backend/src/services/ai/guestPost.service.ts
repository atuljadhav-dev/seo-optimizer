import aiService from './ai.service.js';
import { generateGuestPost } from './prompts.js';

export const createGuestPost = async (
	title: string,
	content: string,
): Promise<string> => {
	const prompt = await generateGuestPost(title, content);
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
