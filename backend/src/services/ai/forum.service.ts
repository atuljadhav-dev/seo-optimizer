import aiService from './ai.service.js';
import { generateForumPost, generateForumReply } from './prompts.js';

export const createForumPost = async (
	title: string,
	content: string,
): Promise<string> => {
	const prompt = await generateForumPost(title, content);
	const response = await aiService({
		content: prompt,
		config: {
			temperature: 0.7,
			maxOutputTokens: 1000,
			responseMimeType: 'text/plain',
		},
	});
	return response;
};

export const createForumReply = async (
	replyTo: string,
	content: string,
): Promise<string> => {
	const prompt = await generateForumReply(replyTo, content);
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
