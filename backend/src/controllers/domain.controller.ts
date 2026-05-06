import { type Request, type Response } from "express";
import Domain from "../models/domain.model.js";
import type { AuthenticatedRequest } from "../middleware/auth.middleware.js";



export const trackNewDomain = async (
    req: AuthenticatedRequest,
    res: Response
): Promise<void> => {
    try {
        const { url, seoScore, loadSpeed, sslValid, indexedPages } = req.body;
        if (!req.user) {
            res.status(401).json({
                message: "Unauthorized: User not authenticated.",
            });
            return;
        }
        if (!url) {
            res.status(400).json({ message: "Domain URL is required." });
            return;
        }

        const cleanUrl = url.replace(/^(https?:\/\/)?(www\.)?/, "").trim();
        const domainEntry = await Domain.create({
            user: req.user?._id,
            url: cleanUrl,
            seoScore: seoScore || 0,
            loadSpeed: loadSpeed || "0.0s",
            sslValid: !!sslValid,
            indexedPages: indexedPages || 0,
        });

        res.status(201).json(domainEntry);
    } catch (error) {
        console.error("Domain Analytics Tracking Failure:", error);
        res.status(500).json({
            message: "Internal server error while tracking asset.",
        });
    }
};

export const getUserDomains = async (
    req: AuthenticatedRequest,
    res: Response
): Promise<void> => {
    if (!req.user) {
        res.status(401).json({
            message: "Unauthorized: User not authenticated.",
        });
        return;
    }
    try {
        const historicalEntries = await Domain.find({
            user: req.user?._id,
        }).sort({ createdAt: -1 });
        res.status(200).json(historicalEntries);
    } catch (error) {
        console.error("Domain History Query Failure:", error);
        res.status(500).json({
            message: "Internal server error retrieving history.",
        });
    }
};
