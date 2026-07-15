import { analyzeTitle } from './title.service.js';
import { analyzeMetaDescription } from './meta.service.js';
import { buildSeoReport } from './report.service.js';
import { analyzeHeadings } from './heading.service.js';
import { analyzeImages } from './image.service.js';
import { analyzeLinks } from './link.service.js';
import { analyzeTechnicalSeo } from './technical.service.js';
import { analyzeUrl } from './url.service.js';
import type { SeoReport } from './types.js';
import { crawlWebsite } from './crawler.service.js';
import { analyzeRobots } from './robots.service.js';
import { analyzeSitemap } from './sitemap.service.js';
import { analyzeSchema } from './schema.service.js';
export const analyzePage = async (url: string): Promise<SeoReport> => {
	const crawlResult = await crawlWebsite(url, { maxDepth: 0, maxPages: 1 });

	if (crawlResult.pages.length === 0) {
		throw new Error('Unable to analyze website.');
	}

	const website = crawlResult.pages[0];
	

	if (!website) {
		throw new Error('Unable to analyze website.');
	}
	const title = website.$('title').first().text();

	const titleAnalysis = analyzeTitle(title, website.finalUrl);
	const metaDescription =
		website.$('meta[name="description"]').attr('content') ?? '';
	const metaAnalysis = analyzeMetaDescription(metaDescription);
	const headingAnalysis = analyzeHeadings(website.$);
	const imageAnalysis = analyzeImages(website.$);
	const linkAnalysis = analyzeLinks(website.$, website.finalUrl);
	const technicalAnalysis = analyzeTechnicalSeo(website.$, website.finalUrl);
	const urlAnalysis = analyzeUrl(website.finalUrl);
	const robots= await analyzeRobots(website.finalUrl);
	const sitemap= await analyzeSitemap(website.finalUrl);
	const schemaAnalysis = analyzeSchema(website.$);
	const report = buildSeoReport({
		title: titleAnalysis,
		meta: metaAnalysis,
		heading: headingAnalysis,
		image: imageAnalysis,
		link: linkAnalysis,
		technical: technicalAnalysis,
		url: urlAnalysis,
		robots: robots,
		sitemap: sitemap,
		schema: schemaAnalysis,
	});

	return report;
}
