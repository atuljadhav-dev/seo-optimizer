import { XMLParser } from 'fast-xml-parser';
import type { SeoIssue, SeoSectionResult, SitemapData } from './types.js';
import { createIssue } from './issue.service.js';
import { SEO_SECTION_SCORE } from '../../constants/seoSectionScore.js';
import { deductScore } from './deductScore.js';

export async function analyzeSitemap(url: string): Promise<SeoSectionResult> {
	let score: number = SEO_SECTION_SCORE.TECHNICAL;

	const issues: SeoIssue[] = [];

	const sitemapUrl = new URL('/sitemap.xml', url).toString();

	try {
		const response = await fetch(sitemapUrl);

		if (!response.ok) {
			return {
				score: 0,

				maxScore: SEO_SECTION_SCORE.TECHNICAL,

				issues: [
					createIssue(
						'SITEMAP_NOT_FOUND',

						'Sitemap missing',

						'No sitemap.xml found.',

						'high',

						'Create a sitemap.xml.',
					),
				],

				data: {
					exists: false,

					status: response.status,

					urlCount: 0,

					isIndex: false,

					urls: [],
				},
			};
		}

		const xml = await response.text();

		const parser = new XMLParser();

		const parsed = parser.parse(xml);

		const sitemap = parsed.urlset?.url ?? [];

		const sitemapArray = Array.isArray(sitemap) ? sitemap : [sitemap];

		const urls = sitemapArray.map((item: any) => item.loc).filter(Boolean);

		const data: SitemapData = {
			exists: true,

			status: response.status,

			urlCount: urls.length,

			isIndex: !!parsed.sitemapindex,

			urls,
		};

		if (data.urlCount === 0) {
			score = deductScore(score, 'medium');

			issues.push(
				createIssue(
					'SITEMAP_EMPTY',

					'Empty sitemap',

					'No URLs found.',

					'medium',

					'Add URLs to sitemap.',
				),
			);
		}

		return {
			score,

			maxScore: SEO_SECTION_SCORE.TECHNICAL,

			issues,

			data: { ...data },
		};
	} catch {
		return {
			score: 0,

			maxScore: SEO_SECTION_SCORE.TECHNICAL,

			issues: [
				createIssue(
					'SITEMAP_FETCH_FAILED',

					'Sitemap unavailable',

					'Unable to download sitemap.',

					'high',

					'Verify sitemap URL.',
				),
			],

			data: {
				exists: false,

				status: 0,

				urlCount: 0,

				isIndex: false,

				urls: [],
			},
		};
	}
}
