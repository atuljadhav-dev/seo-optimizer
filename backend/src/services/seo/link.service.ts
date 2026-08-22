import * as cheerio from 'cheerio';
import {
	type SeoIssue,
	type SeoSectionResult,
	type LinkInfo,
} from './types.js';
import { createIssue } from './issue.service.js';
import { SEO_SECTION_SCORE } from '../../constants/seoSectionScore.js';
import { deductScore } from './deductScore.js';

export const analyzeLinks = (
	$: cheerio.CheerioAPI,
	baseUrl: string,
): SeoSectionResult => {
	let score: number = SEO_SECTION_SCORE.LINK;

	const issues: SeoIssue[] = [];

	const links: LinkInfo[] = [];

	const baseHost = new URL(baseUrl).hostname;
	let count = 0;
	$('a').each((_, element) => {
		const href = ($(element).attr('href') ?? '').trim();

		const text = $(element).text().trim();

		let internal = false;
		let external = false;

		try {
			if (href.startsWith('/') || href.startsWith('#')) {
				internal = true;
			} else {
				const url = new URL(href);

				internal = url.hostname === baseHost;

				external = !internal;
			}
		} catch {
			internal = false;

			external = false;
		}

		links.push({
			href,

			text,

			internal,

			external,

			noFollow: $(element).attr('rel')?.includes('nofollow') ?? false,

			noOpener: $(element).attr('rel')?.includes('noopener') ?? false,

			noReferrer: $(element).attr('rel')?.includes('noreferrer') ?? false,
		uid:`link-uid`
		});
	});
	for (const link of links) {
		if (!link.href) {
			score = deductScore(score, 'high');

			issues.push(
				createIssue(
					'LINK_EMPTY_HREF',
					'Empty link',
					'A link has no href attribute.',
					'high',
					'Provide a valid destination.',
				),
			);
		}
	}
	for (const link of links) {
		if (!link.text) {
			score = deductScore(score, 'medium');

			issues.push(
				createIssue(
					'LINK_EMPTY_TEXT',
					'Missing anchor text',
					`${link.href} contains no visible text.`,
					'medium',
					'Add descriptive anchor text.',
				),
			);
		}
	}
	const hrefs = new Set<string>();

	for (const link of links) {
		if (!link.href) continue;

		if (hrefs.has(link.href)) {
			score = deductScore(score, 'low');

			issues.push(
				createIssue(
					'LINK_DUPLICATE',
					'Duplicate link',
					`${link.href} appears multiple times.`,
					'low',
					'Remove unnecessary duplicate links.',
				),
			);

			continue;
		}

		hrefs.add(link.href);
	}
	for (const link of links) {
		if (link.href.startsWith('javascript:')) {
			score = deductScore(score, 'medium');

			issues.push(
				createIssue(
					'LINK_JAVASCRIPT',
					'JavaScript link detected',
					link.href,
					'medium',
					'Prefer real URLs instead of javascript: links.',
				),
			);
		}
	}

	return {
		score,

		maxScore: SEO_SECTION_SCORE.LINK,

		issues,

		data: {
			totalLinks: links.length,

			internalLinks: links.filter((l) => l.internal).length,

			externalLinks: links.filter((l) => l.external).length,

			links,
		},
	};
};
