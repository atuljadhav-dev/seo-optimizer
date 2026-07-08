import { Router } from 'express';
import {
	getFullWebsiteAuditReport,
	getPageAuditReport,
	processAnalyzePageSpeed,
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
router.post('/analyze/pagespeed', processAnalyzePageSpeed);
export default router;
