import type { SeoIssue, SeoSectionResult, RobotsData } from './types.js';

import { createIssue } from './issue.service.js';
import { SEO_SECTION_SCORE } from '../../constants/seoSectionScore.js';
import { deductScore } from './deductScore.js';

export async function analyzeRobots(url: string): Promise<SeoSectionResult> {
	let score:number = SEO_SECTION_SCORE.TECHNICAL;

	const issues: SeoIssue[] = [];

	const robotsUrl = new URL('/robots.txt', url).toString();

	try {
		const response = await fetch(robotsUrl);

		const text = await response.text();

		const lines = text
			.split('\n')
			.map((line) => line.trim())
			.filter(Boolean);

		const data: RobotsData = {
			exists: response.ok,

			status: response.status,

			hasSitemap: lines.some((line) =>
				line.toLowerCase().startsWith('sitemap:'),
			),

			hasUserAgent: lines.some((line) =>
				line.toLowerCase().startsWith('user-agent:'),
			),

			hasDisallow: lines.some((line) =>
				line.toLowerCase().startsWith('disallow:'),
			),

			hasAllow: lines.some((line) =>
				line.toLowerCase().startsWith('allow:'),
			),

			hasCrawlDelay: lines.some((line) =>
				line.toLowerCase().startsWith('crawl-delay:'),
			),

			lines: lines.length,
		};

		if (!data.exists) {
			return {
				score: 0,

				maxScore: SEO_SECTION_SCORE.TECHNICAL,

				issues: [
					createIssue(
						'ROBOTS_NOT_FOUND',
						'robots.txt not found',
						'The website does not provide a robots.txt file.',
						'high',
						'Create a robots.txt file.',
					),
				],

				data: { ...data }
			};
		}

		if (!data.hasUserAgent) {
			score = deductScore(score, 'medium');

			issues.push(
				createIssue(
					'ROBOTS_USER_AGENT',
					'User-agent missing',
					'No user-agent rule found.',
					'medium',
					'Add at least one User-agent directive.',
					true
				),
			);
		}

		if (!data.hasSitemap) {
			score = deductScore(score, 'low');

			issues.push(
				createIssue(
					'ROBOTS_SITEMAP',
					'Sitemap missing',
					'No Sitemap directive found.',
					'low',
					'Reference your sitemap.xml.',
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
					'ROBOTS_FETCH_FAILED',
					'Unable to fetch robots.txt',
					'The robots.txt file could not be downloaded.',
					'high',
					'Verify the website is reachable.',
				),
			],

			data: {
				exists: false,

				status: 0,

				hasSitemap: false,

				hasUserAgent: false,

				hasDisallow: false,

				hasAllow: false,

				hasCrawlDelay: false,

				lines: 0,
			},
		};
	}
}
