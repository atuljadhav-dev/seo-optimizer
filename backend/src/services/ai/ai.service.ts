import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import { logger } from '../../utils/logger.js';
dotenv.config();
const aiApiKey = process.env.GEMINI_API_KEY || '';
if (!aiApiKey) {
	throw new Error(
		'Gemini API key configuration is missing. Please set GEMINI_API_KEY in your environment variables.',
	);
}

const aiClient = new GoogleGenAI({ apiKey: aiApiKey });
logger.info('Gemini API client initialized successfully.');
interface AIServiceParams {
	content: string;
	config?: {
		systemInstruction?: string;
		temperature?: number;
		maxOutputTokens?: number;
		responseMimeType?: string;
	};
}
const aiService = async ({ content, config }: AIServiceParams) => {
	const response = await aiClient.models.generateContent({
		model: 'gemini-2.5-flash',
		contents: content,
		config: {
			systemInstruction:
				config?.systemInstruction ||
				'You are an expert AI SEO Optimizer assistant.',
			temperature: config?.temperature || 0.7,
			maxOutputTokens: config?.maxOutputTokens || 500,
			responseMimeType: config?.responseMimeType || 'text/plain',
		},
	});
	if (!response.candidates || response.candidates.length === 0) {
		throw new Error('No valid response received from AI model.');
	}
	const firstCandidate = response.candidates[0];
	if (!firstCandidate || !firstCandidate.content) {
		throw new Error('AI model response structure is invalid.');
	}
	const firstPart = firstCandidate.content?.parts?.[0];
	const replyText = firstPart?.text || 'No response generated from AI model.';
	return replyText;
};
export default aiService;
