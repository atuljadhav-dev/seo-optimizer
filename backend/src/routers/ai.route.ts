import { Router } from "express";
import { processChatInstruction } from "../controllers/ai.controller.js";
import { protect } from "../middleware/auth.middleware.js"; // Protect route using JWT cookie validation

const router = Router();

// Secure the route so only logged-in dashboard profiles can issue prompt instructions
router.post("/chat", protect, processChatInstruction);

export default router;
