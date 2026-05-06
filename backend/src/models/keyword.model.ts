import mongoose, { Schema, Document } from "mongoose";

export interface IKeyword extends Document {
    user: mongoose.Types.ObjectId;
    phrase: string;
    volume: number;
    difficulty: number;
    density: string;
    createdAt: Date;
}

const KeywordSchema: Schema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        phrase: {
            type: String,
            required: [true, "Keyword phrase value annotation is required."],
            trim: true,
        },
        volume: {
            type: Number,
            default: 0,
        },
        difficulty: {
            type: Number,
            default: 0,
        },
        density: {
            type: String,
            default: "0.0%",
        },
    },
    { timestamps: true }
);

export default mongoose.model<IKeyword>("Keyword", KeywordSchema);
