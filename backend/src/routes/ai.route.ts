import { Router } from 'express';
import {
	processChatInstruction,
	processSeoFixSuggestions,
} from '../controllers/ai.controller.js';
import { validate } from '../middleware/validate.js';
import { aiPromptSchema } from '../validators/ai.validator.js';

const router = Router();

router.post('/chat', validate(aiPromptSchema), processChatInstruction);
router.post('/seo-fix', processSeoFixSuggestions);
export default router;
