import mongoose, { Schema, Document } from "mongoose";

export interface IOutreach extends Document {
    user: mongoose.Types.ObjectId;
    targetDomain: string;
    contactEmail: string;
    category: "Guest Post" | "Resource Page" | "PR Outreach" | "Broken Link";
    status: "Pending" | "Contacted" | "Acquired" | "Rejected";
    createdAt: Date;
}

const OutreachSchema: Schema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        targetDomain: {
            type: String,
            required: [true, "Target domain is required."],
            trim: true,
        },
        contactEmail: {
            type: String,
            required: [true, "Contact email address is required."],
            trim: true,
        },
        category: {
            type: String,
            enum: ["Guest Post", "Resource Page", "PR Outreach", "Broken Link"],
            default: "Guest Post",
        },
        status: {
            type: String,
            enum: ["Pending", "Contacted", "Acquired", "Rejected"],
            default: "Pending",
        },
    },
    { timestamps: true }
);

export default mongoose.model<IOutreach>("Outreach", OutreachSchema);
