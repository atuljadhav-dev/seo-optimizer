import { extractWebsite } from './extractor.service.js';
import { analyzeTitle } from './title.service.js';
import { analyzeMetaDescription } from './meta.service.js';
import { buildSeoReport } from './report.service.js';
import { analyzeHeadings } from './heading.service.js';
import { analyzeImages } from './image.service.js';
import { analyzeLinks } from './link.service.js';
import { analyzeTechnicalSeo } from './technical.service.js';
import { analyzeUrl } from './url.service.js';
export async function auditWebsite(url: string) {
	const website = await extractWebsite(url);

	const title = website.$('title').first().text();

	const titleAnalysis = analyzeTitle(title, url);
	const metaDescription =
		website.$('meta[name="description"]').attr('content') ?? '';
	const metaAnalysis = analyzeMetaDescription(metaDescription);
	const headingAnalysis = analyzeHeadings(website.$);
	const imageAnalysis = analyzeImages(website.$);
	const linkAnalysis = analyzeLinks(website.$, url);
	const technicalAnalysis = analyzeTechnicalSeo(website.$, website.finalUrl);
	const urlAnalysis = analyzeUrl(url);
	const report = buildSeoReport({
		title: titleAnalysis,
		meta: metaAnalysis,
		heading: headingAnalysis,
		image: imageAnalysis,
		link: linkAnalysis,
		technical: technicalAnalysis,
		url: urlAnalysis,
	});

	return report;
}
