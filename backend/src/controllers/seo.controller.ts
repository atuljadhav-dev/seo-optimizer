import { type Request, type Response } from 'express';
import { successResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { auditWebsites } from '../services/seo/website-audit.service.js';
import { analyzePage } from '../services/seo/page-audit.service.js';
import { fixStaticSeoIssues } from '../services/seo/seo-fix.service.js';
import { analyzePageSpeed } from '../services/seo/pagespeed.service.js';
export const getFullWebsiteAuditReport = asyncHandler(
	async (req: Request, res: Response): Promise<void> => {
		const { url } = req.body;
		const report = await auditWebsites(url);
		successResponse(
			res,
			'Website audit report generated successfully',
			report,
			200,
		);
	},
);

export const getPageAuditReport = asyncHandler(
	async (req: Request, res: Response): Promise<void> => {
		const { url } = req.body;
		const report = await analyzePage(url);
		successResponse(
			res,
			'Page audit report generated successfully',
			report,
			200,
		);
	},
);

export const processFixStaticSeoIssues = async (
	req: Request,
	res: Response,
) => {
	const { report } = req.body;
	const staticIssues = fixStaticSeoIssues(report);
	successResponse(
		res,
		'Static SEO issues fixed successfully',
		staticIssues,
		200,
	);
};

export const processAnalyzePageSpeed = async (req: Request, res: Response) => {
	const { url } = req.body;
	const report = await analyzePageSpeed(url);
	successResponse(
		res,
		'Page speed analysis completed successfully',
		report,
		200,
	);
};
