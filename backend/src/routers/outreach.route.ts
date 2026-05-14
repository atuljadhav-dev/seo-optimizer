import { Router } from "express";
import {
    createOutreachPipeline,
    getUserOutreachPipelines,
} from "../controllers/outreach.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

router
    .route("/")
    .post(protect, createOutreachPipeline)
    .get(protect, getUserOutreachPipelines);

export default router;
