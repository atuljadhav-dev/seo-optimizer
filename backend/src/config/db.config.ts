import mongoose from 'mongoose';
import { logger } from '../utils/logger.js';
export const connectDatabase = async (): Promise<void> => {
	try {
		const mongoUri = process.env.MONGO_URI;
		logger.info(`Attempting to connect to MongoDB at: ${mongoUri}`);
		if (!mongoUri) {
			throw new Error(
				'MONGO_URI environmental variable is missing inside your configuration.',
			);
		}

		const connection = await mongoose.connect(mongoUri);
		logger.info(
			`Successfully connected to MongoDB at: ${connection.connection.host}:${connection.connection.port}`,
		);
	} catch (error) {
		logger.error(`❌ Failed to connect to MongoDB: ${error}`);
		process.exit(1);
	}
};
