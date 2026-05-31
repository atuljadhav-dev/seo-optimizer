import { Router } from "express";
import { protect } from "../middleware/auth.middleware.js";
import { analyzeExternalUrl } from "../controllers/parser.controller.js";

const router = Router();

router.post("/parse-site", protect, analyzeExternalUrl);

export default router;
