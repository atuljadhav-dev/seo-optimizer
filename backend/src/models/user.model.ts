import mongoose from "mongoose";
import bcrypt from "bcrypt";

interface IUser extends mongoose.Document {
    name: string;
    email: string;
    password?: string;
}

const userSchema = new mongoose.Schema<IUser>(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [6, "Password must be at least 6 characters long"],
        },
    },
    {
        timestamps: true,
    }
);

// Pre-save hook to hash the password before saving the user document
userSchema.pre<IUser>("save", async function (this: IUser) {
    if (!this.isModified("password")) {
        return;
    }

    try {
        if (this.password) {
            // Generate a salt and hash the password using bcrypt
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
        }
    } catch (error) {
        throw error as mongoose.CallbackError; // Rethrow the error to be handled by Mongoose's error handling mechanism
    }
});

export const User = mongoose.model<IUser>("User", userSchema);
