import mongoose, { Schema, Document } from "mongoose";

export interface IDomain extends Document {
    user: mongoose.Types.ObjectId;
    url: string;
    seoScore: number;
    loadSpeed: string;
    sslValid: boolean;
    indexedPages: number;
    createdAt: Date;
}

const DomainSchema: Schema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        url: {
            type: String,
            required: [true, "Domain URL is required."],
            trim: true,
        },
        seoScore: {
            type: Number,
            default: 0,
        },
        loadSpeed: {
            type: String,
            default: "0.0s",
        },
        sslValid: {
            type: Boolean,
            default: false,
        },
        indexedPages: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

export default mongoose.model<IDomain>("Domain", DomainSchema);
