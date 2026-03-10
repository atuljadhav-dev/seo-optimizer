import express, { type Request, type Response } from "express";
import dotenv from "dotenv";
import { connectDatabase } from "./config/db.config.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;

app.use(express.json());

connectDatabase();
app.get("/", (req: Request, res: Response) => {
    res.json({ message: "SEO Optimizer API Backend Running Smoothly." });
});

app.listen(PORT, () => {
    console.log(`🚀 Server listening dynamically on http://localhost:${PORT}`);
});
