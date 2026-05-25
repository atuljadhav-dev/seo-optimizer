import { Router } from "express";
import { protect } from "../middleware/auth.middleware.js";
import { analyzePageLinks } from "../controllers/backlink.controller.js";

const router = Router();

router.post("/analyze-profile", protect, analyzePageLinks);

export default router;
