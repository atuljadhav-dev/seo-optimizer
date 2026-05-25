import express, { type Request, type Response } from "express";
import dotenv from "dotenv";
import { connectDatabase } from "./config/db.config.js";
import authRoutes from "./routers/auth.route.js";
import aiRoutes from "./routers/ai.route.js";
import domainRoutes from "./routers/domain.route.js";
import keywordRoutes from "./routers/keyword.route.js";
import outreachRoutes from "./routers/outreach.route.js";
import serpRoutes from "./routers/serp.route.js";
import parserRoutes from "./routers/parser.route.js";
import backlinkRoutes from "./routers/backlink.route.js";
import cors from "cors";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;

app.use(express.json());
app.use((req, res, next) => {
    console.log(`Incoming Request: [${req.method}] ${req.originalUrl}`);
    next();
});
app.use(
    cors({
        origin: process.env.FRONTEND_URL || "http://localhost:5173", // Allow your Vite dev server
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true, // Crucial for reading/writing secure cookie layers across origins
    })
);

connectDatabase();

app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/domains", domainRoutes);
app.use("/api/keywords", keywordRoutes);
app.use("/api/outreach", outreachRoutes);
app.use("/api/serp", serpRoutes);
app.use("/api/parser", parserRoutes);
app.use("/api/backlink", backlinkRoutes);

app.get("/", (req: Request, res: Response) => {
    res.json({ message: "SEO Optimizer API Backend Running Smoothly." });
});

app.listen(PORT, () => {
    console.log(`🚀 Server listening dynamically on http://localhost:${PORT}`);
});
