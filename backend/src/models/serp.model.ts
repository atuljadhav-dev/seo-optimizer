import mongoose, { Schema, Document } from "mongoose";

export interface ISerp extends Document {
    userId: mongoose.Types.ObjectId;
    keyword: string;
    rank: number;
    engine: string;
    targetUrl: string;
    checkedAt: Date;
}

const SerpSchema = new Schema<ISerp>({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    keyword: { type: String, required: true },
    rank: { type: Number, required: true },
    engine: { type: String, default: "google" },
    targetUrl: { type: String, required: true },
    checkedAt: { type: Date, default: Date.now },
});

export const Serp = mongoose.model<ISerp>("Serp", SerpSchema);
