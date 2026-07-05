import { Router } from 'express';
import {
	getFullWebsiteAuditReport,
	getPageAuditReport,
	processFixStaticSeoIssues,
} from '../controllers/seo.controller.js';
import { validate } from '../middleware/validate.js';
import { websiteSchema } from '../validators/website.validator.js';

const router = Router();

router.post(
	'/audit/website',
	validate(websiteSchema),
	getFullWebsiteAuditReport,
);
router.post('/audit/page', validate(websiteSchema), getPageAuditReport);
router.post('/fix', processFixStaticSeoIssues);
export default router;
