import { Router } from 'express';
import { processChatInstruction } from '../controllers/ai.controller.js';
import { protect } from '../middleware/auth.middleware.js'; // Protect route using JWT cookie validation
import { validate } from '../middleware/validate.js';
import { aiPromptSchema } from '../validators/ai.validator.js';

const router = Router();

// Secure the route so only logged-in dashboard profiles can issue prompt instructions
router.post('/chat',validate(aiPromptSchema), protect, processChatInstruction);

export default router;
