import { type Response } from "express";
import type { AuthenticatedRequest } from "../middleware/auth.middleware.js";
import { Serp } from "../models/serp.model.js";

export const getSerpMetrics = async (
    req: AuthenticatedRequest,
    res: Response
): Promise<void> => {
    if (!req.user?._id) {
        res.status(401).json({
            success: false,
            message: "Unauthorized: User not authenticated",
        });
        return;
    }
    try {
        const metrics = await Serp.find({ userId: req.user._id }).sort({
            checkedAt: -1,
        });
        res.status(200).json({ success: true, data: metrics });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch SERP metrics",
            error,
        });
    }
};

export const logSerpCheck = async (
    req: AuthenticatedRequest,
    res: Response
): Promise<void> => {
    if (!req.user) {
        res.status(401).json({
            success: false,
            message: "Unauthorized: User not authenticated",
        });
        return;
    }
    try {
        const { keyword, rank, targetUrl } = req.body;
        const newEntry = new Serp({
            userId: req.user._id,
            keyword,
            rank,
            targetUrl,
        });
        await newEntry.save();
        res.status(201).json({ success: true, data: newEntry });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to log SERP metric",
        });
    }
};
