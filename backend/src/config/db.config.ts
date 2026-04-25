import mongoose from "mongoose";
export const connectDatabase = async (): Promise<void> => {
    try {
        const mongoUri = process.env.MONGO_URI;
        console.log(
            "Attempting MongoDB Connection with URI:",
            mongoUri ? "✅" : "❌"
        );
        if (!mongoUri) {
            throw new Error(
                "MONGO_URI environmental variable is missing inside your configuration."
            );
        }

        const connection = await mongoose.connect(mongoUri);
        console.log(
            `MongoDB Connected Successfully: ${connection.connection.host}`
        );
    } catch (error) {
        console.error(
            `❌ Database Connection Error: ${(error as Error).message}`
        );
        process.exit(1);
    }
};
