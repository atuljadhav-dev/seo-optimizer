import { Router } from "express";
import {
    trackKeywordsList,
    getUserKeywords,
} from "../controllers/keyword.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

router
    .route("/")
    .post(protect, trackKeywordsList)
    .get(protect, getUserKeywords);

export default router;
