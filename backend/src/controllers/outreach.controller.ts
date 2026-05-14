import { type Response } from "express";
import Outreach from "../models/outreach.model.js";
import type { AuthenticatedRequest } from "../middleware/auth.middleware.js";

export const createOutreachPipeline = async (
    req: AuthenticatedRequest,
    res: Response
): Promise<void> => {
    try {
        const { targetDomain, contactEmail, category } = req.body;

        if (!req.user?._id) {
            res.status(401).json({
                message: "Not authorized, user profile missing.",
            });
            return;
        }

        if (!targetDomain || !contactEmail) {
            res.status(400).json({
                message:
                    "Target domain and contact email are explicitly required.",
            });
            return;
        }

        const cleanDomain = targetDomain
            .replace(/^(https?:\/\/)?(www\.)?/, "")
            .trim();

        const outreachEntry = await Outreach.create({
            user: req.user._id,
            targetDomain: cleanDomain,
            contactEmail,
            category,
            status: "Pending",
        });

        res.status(201).json(outreachEntry);
    } catch (error) {
        console.error("Outreach Log Insertion Failure:", error);
        res.status(500).json({
            message: "Internal server error tracking pipeline entry.",
        });
    }
};

export const getUserOutreachPipelines = async (
    req: AuthenticatedRequest,
    res: Response
): Promise<void> => {
    try {
        if (!req.user?._id) {
            res.status(401).json({
                message: "Not authorized, access token validation missing.",
            });
            return;
        }

        const pipelines = await Outreach.find({ user: req.user._id }).sort({
            createdAt: -1,
        });
        res.status(200).json(pipelines);
    } catch (error) {
        console.error("Outreach Pipelines Query Failure:", error);
        res.status(500).json({
            message: "Internal server error fetching pipeline summaries.",
        });
    }
};
