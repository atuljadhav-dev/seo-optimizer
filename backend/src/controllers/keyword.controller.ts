import { type Response } from "express";
import Keyword from "../models/keyword.model.js";
import type { AuthenticatedRequest } from "../middleware/auth.middleware.js";

export const trackKeywordsList = async (
    req: AuthenticatedRequest,
    res: Response
): Promise<void> => {
    try {
        const { phrasesList } = req.body; // Expecting an array of computed keyword objects

        if (!req.user?._id) {
            res.status(401).json({
                message: "Not authorized, user credentials missing.",
            });
            return;
        }

        if (!phrasesList || !Array.isArray(phrasesList)) {
            res.status(400).json({
                message: "A valid array of keywords data payload is required.",
            });
            return;
        }

        // Map user identifier into every item to align schema query bindings
        const payloadData = phrasesList.map((item) => ({
            ...item,
            user: req.user?._id,
        }));

        const storedKeywords = await Keyword.insertMany(payloadData);
        res.status(201).json(storedKeywords);
    } catch (error) {
        console.error("Keyword Analytics Ingestion Failure:", error);
        res.status(500).json({
            message: "Internal server error processing keyword dataset.",
        });
    }
};

export const getUserKeywords = async (
    req: AuthenticatedRequest,
    res: Response
): Promise<void> => {
    try {
        if (!req.user?._id) {
            res.status(401).json({
                message: "Not authorized, user identification token missing.",
            });
            return;
        }

        const savedPhrases = await Keyword.find({ user: req.user._id }).sort({
            createdAt: -1,
        });
        res.status(200).json(savedPhrases);
    } catch (error) {
        console.error("Keywords Dataset Retrieval Failure:", error);
        res.status(500).json({
            message: "Internal server error pulling tracked metadata profiles.",
        });
    }
};
