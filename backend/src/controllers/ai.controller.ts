import { type Request, type Response } from "express";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config(); //why dotenv is used even though it is already used in index.ts? Because this controller might be used independently or in a different context where the environment variables need to be loaded again.
const aiApiKey = process.env.GEMINI_API_KEY || "";
console.log("Gemini API Key Loaded:", aiApiKey ? "✅" : "❌");
const aiClient = new GoogleGenAI({ apiKey: aiApiKey });

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

        if (!aiApiKey) {
            res.status(500).json({
                message:
                    "Gemini API key configuration is missing on the server.",
            });
            return;
        }

        const contextResponse = await aiClient.models.generateContent({
            model: "gemini-2.5-flash",
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            config: {
                systemInstruction:
                    "You are an expert AI SEO Optimizer assistant. Provide concise, highly actionable growth strategies regarding meta configurations, keywords, content density, and backlink outreach pipelines. Keep answers short and technical.",
            },
        });
        if (
            !contextResponse.candidates ||
            contextResponse.candidates.length === 0
        ) {
            res.status(500).json({
                message: "No valid response received from AI model.",
            });
            return;
        }

        const firstCandidate = contextResponse.candidates[0];
        if (!firstCandidate || !firstCandidate.content) {
            res.status(500).json({
                message: "AI model response structure is invalid.",
            });
            return;
        }
        const firstPart = firstCandidate.content?.parts?.[0];
        const replyText =
            firstPart?.text || "No response generated from AI model.";
        res.status(200).json({ reply: replyText });
    } catch (error) {
        console.error("Gemini API Integration Failure:", error);
        res.status(500).json({
            message: "Failed to process AI optimization request.",
        });
    }
};
