import { Router } from "express";
import {
    trackNewDomain,
    getUserDomains,
} from "../controllers/domain.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/").post(protect, trackNewDomain).get(protect, getUserDomains);

export default router;
