import { z } from 'zod';

export const registerSchema = z.object({
	name: z
		.string()
		.trim()
		.min(3, 'name must contain at least 3 characters')
		.max(30),

	email: z.string().trim().email('Invalid email address'),

	password: z
		.string()
		.min(6, 'Password must contain at least 6 characters')
		.max(100),
});

export const loginSchema = z.object({
	email: z.string().trim().email('Invalid email address'),

	password: z.string().min(1, 'Password is required'),
});
