import { z } from 'zod';

export const aiPromptSchema = z.object({
	prompt: z
		.string()
		.trim()
		.min(5, 'Prompt is too short')
		.max(500, 'Prompt is too long'),
});
