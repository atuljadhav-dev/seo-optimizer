import { type Request, type Response } from 'express';
import { successResponse, errorResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { registerUser, signInUser } from '../services/auth.service.js';
export const signUp = asyncHandler(
	async (req: Request, res: Response): Promise<void> => {
		const { name, email, password } = req.body;
		const result = await registerUser(name, email, password);
		if (!result.success) {
			errorResponse(res, result.message!, 400);
			return;
		}
		successResponse(res, 'User registered successfully', result.data, 201);
	},
);

export const signIn = asyncHandler(
	async (req: Request, res: Response): Promise<void> => {
		const { email, password } = req.body;
		const result = await signInUser(email, password);
		if (!result.success) {
			console.log('Sign-in failed:', result.message);
			errorResponse(res, result.message!, 401);
			return;
		}
		successResponse(res, 'User signed in successfully', result.data, 200);
	},
);
