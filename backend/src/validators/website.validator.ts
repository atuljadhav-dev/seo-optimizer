import { z } from 'zod';

export const websiteSchema = z.object({
	url: z.string().trim().url('Please enter a valid URL'),
});
