import { Router } from "express";
import {
    getSerpMetrics,
    logSerpCheck,
} from "../controllers/serp.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();
router.route("/").get(protect, getSerpMetrics).post(protect, logSerpCheck);
export default router;