import { Router } from "express";
import { signUp, signIn } from "../controllers/auth.controller.js";
import { validate } from "../middleware/validate.js";
import { loginSchema } from "../validators/auth.validator.js";
import { registerSchema } from "../validators/auth.validator.js";

const router = Router();

router.post("/signup",validate(registerSchema), signUp);
router.post("/signin",validate(loginSchema), signIn);

export default router;
