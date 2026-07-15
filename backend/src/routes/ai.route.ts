import { Router } from 'express';
import {
	processChatInstruction,
	processSeoFixSuggestions,
	processForumPost,
	processForumReply,
	processGuestPost,
	processOutreachEmail
} from '../controllers/ai.controller.js';
import { validate } from '../middleware/validate.js';
import { aiPromptSchema } from '../validators/ai.validator.js';

const router = Router();

router.post('/chat', validate(aiPromptSchema), processChatInstruction);
router.post('/seo-fix', processSeoFixSuggestions);
router.post('/forum/post', processForumPost);
router.post('/forum/reply', processForumReply);
router.post('/guest-post', processGuestPost);
router.post('/outreach-email', processOutreachEmail);
export default router;
