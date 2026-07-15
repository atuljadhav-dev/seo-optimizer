import { logger } from '../../utils/logger.js';
import { crawlWebsite } from './crawler.service.js';
import { analyzePage } from './page-audit.service.js';
import type { WebsiteAuditReport } from './types.js';

export const auditWebsites = async (url: string): Promise<WebsiteAuditReport> => {
	const crawlResult = await crawlWebsite(url, { maxDepth: 2, maxPages: 20 });

	const pageReports: WebsiteAuditReport['pageReports'] = [];

	let totalScore = 0;

	for (const page of crawlResult.pages) {
		const report = await analyzePage(page.finalUrl);
		totalScore += report.overallScore;
		pageReports.push({ url: page.url, report });
	}

	const averageScore =
		pageReports.length === 0
			? 0
			: Math.round(totalScore / pageReports.length);

	return {
		websiteUrl: url,

		totalPages: pageReports.length,

		averageScore,

		pageReports,

		summary: {
			passedPages: pageReports.filter((p) => p.report.overallScore >= 70)
				.length,

			failedPages: pageReports.filter((p) => p.report.overallScore < 70)
				.length,
		},
	};
}
