import { User } from '../models/user.model.js';
import { generateToken } from '../utils/generateToken.js';
import bcrypt from 'bcrypt';
export const registerUser = async (
	name: string,
	email: string,
	password: string,
) => {
	const existingUser = await User.findOne({ email });

	if (existingUser) {
		return {
			success: false,
			message: 'User already exists with this email address',
		};
	}

	const user = await User.create({ name, email, password });

	return {
		success: true,
		data: {
			_id: user._id,
			name: user.name,
			email: user.email,
			token: generateToken(user._id.toString()),
		},
	};
};

export const signInUser = async (email: string, password: string) => {
	const user = await User.findOne({ email });

	if (!user || !user.password) {
		return { success: false, message: 'Invalid email or password' };
	}

	const isPasswordMatch = await bcrypt.compare(password, user.password);

	if (!isPasswordMatch) {
		return { success: false, message: 'Invalid email or password' };
	}

	return {
		success: true,
		data: {
			_id: user._id,
			name: user.name,
			email: user.email,
			token: generateToken(user._id.toString()),
		},
	};
};
