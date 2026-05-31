import jwt from 'jsonwebtoken';

export const generateToken = (id: string): string => {
	const secret = process.env.JWT_SECRET;
	if (!secret) {
		throw new Error('JWT_SECRET environmental variable is missing.');
	}
	return jwt.sign({ _id: id }, secret, { expiresIn: '30d' });
};
