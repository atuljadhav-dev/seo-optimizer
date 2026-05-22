import { type Request, type Response } from "express";
import aiService from "../services/ai.service.js";

export const processChatInstruction = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            res.status(400).json({
                message: "A chat prompt is required to process request.",
            });
            return;
        }

        const aiResponse = await aiService({
            content: prompt,
            config: {
                systemInstruction:
                    "You are an expert AI SEO Optimizer assistant. Provide concise, highly actionable growth strategies regarding meta configurations, keywords, content density, and backlink outreach pipelines. Keep answers short and technical.",
                temperature: 0.7,
                maxOutputTokens: 500,
            },
        });
        res.status(200).json({
            reply: aiResponse,
        });
    } catch (error) {
        console.error("Gemini API Integration Failure:", error);
        res.status(500).json({
            message: "Failed to process AI optimization request.",
        });
    }
};
