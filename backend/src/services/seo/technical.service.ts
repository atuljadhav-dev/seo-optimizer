import * as cheerio from 'cheerio';
import { createIssue } from './issue.service.js';
import {
	type SeoIssue,
	type SeoSectionResult,
	type TechnicalSeoData,
} from './types.js';
import { SEO_SECTION_SCORE } from '../../constants/seoSectionScore.js';
import { deductScore } from './deductScore.js';
import { tr } from 'zod/locales';

export const analyzeTechnicalSeo = (
	$: cheerio.CheerioAPI,
	url: string,
): SeoSectionResult => {
	let score: number = SEO_SECTION_SCORE.TECHNICAL;

	const issues: SeoIssue[] = [];

	const data: TechnicalSeoData = {
		hasViewport: $('meta[name="viewport"]').length > 0,

		hasCanonical: $('link[rel="canonical"]').length > 0,

		hasRobotsMeta: $('meta[name="robots"]').length > 0,

		hasFavicon:
			$('link[rel="icon"]').length > 0 ||
			$('link[rel="shortcut icon"]').length > 0,

		hasLanguage: $('html').attr('lang') !== undefined,

		hasCharset: $('meta[charset]').length > 0,

		hasOpenGraph: $('meta[property^="og:"]').length > 0,

		hasTwitterCard: $('meta[name^="twitter:"]').length > 0,

		https: url.startsWith('https://'),
	};
	if (!data.hasViewport) {
		score = deductScore(score, 'medium');

		issues.push(
			createIssue(
				'VIEWPORT_MISSING',
				'Viewport meta missing',
				'Responsive viewport tag was not found.',
				'medium',
				'Add <meta name="viewport"...>.',
			),
		);
	}
	if (!data.hasCanonical) {
		score = deductScore(score, 'medium');

		issues.push(
			createIssue(
				'CANONICAL_MISSING',
				'Canonical tag missing',
				'No canonical URL specified.',
				'medium',
				'Add a canonical link element.',
			),
		);
	}
	if (!data.hasLanguage) {
		score = deductScore(score, 'medium');

		issues.push(
			createIssue(
				'LANGUAGE_MISSING',
				'HTML language missing',
				'<html> has no lang attribute.',
				'medium',
				'Add lang="en" or appropriate language.',
			),
		);
	}
	if (!data.https) {
		score = deductScore(score, 'high');

		issues.push(
			createIssue(
				'HTTPS_DISABLED',
				'Website is not using HTTPS',
				'Connection is not secure.',
				'high',
				'Serve the website over HTTPS.',
			),
		);
	}
	if (!data.hasCharset) {
		score = deductScore(score, 'low');

		issues.push(
			createIssue(
				'CHARSET_MISSING',
				'Charset declaration missing',
				'No charset meta tag found.',
				'low',
				'Add <meta charset="UTF-8">.',
			),
		);
	}
	if (!data.hasOpenGraph) {
		score = deductScore(score, 'low');

		issues.push(
			createIssue(
				'OPEN_GRAPH_MISSING',
				'Open Graph tags missing',
				'Social sharing metadata was not found.',
				'low',
				'Add Open Graph meta tags.',
				true,
			),
		);
	}
	if (!data.hasTwitterCard) {
		score = deductScore(score, 'low');

		issues.push(
			createIssue(
				'TWITTER_CARD_MISSING',
				'Twitter Card missing',
				'No Twitter Card metadata found.',
				'low',
				'Add Twitter Card meta tags.',
				true,
			),
		);
	}
	return {
		score,

		maxScore: SEO_SECTION_SCORE.TECHNICAL,

		issues,

		data: { ...data },
	};
}
