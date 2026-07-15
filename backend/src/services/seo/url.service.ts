import {
	type SeoSectionResult,
	type SeoIssue,
	type UrlAnalysisData,
} from './types.js';
import { createIssue } from './issue.service.js';
import { SEO_SECTION_SCORE } from '../../constants/seoSectionScore.js';
import { deductScore } from './deductScore.js';

export const analyzeUrl = (url: string): SeoSectionResult => {
	let score: number = SEO_SECTION_SCORE.URL;

	const issues: SeoIssue[] = [];

	const parsed = new URL(url);

	const pathname = parsed.pathname;

	const data: UrlAnalysisData = {
		url,

		length: url.length,

		hasHttps: parsed.protocol === 'https:',

		hasQueryParameters: parsed.search.length > 0,

		hasFragment: parsed.hash.length > 0,

		hasUppercase: /[A-Z]/.test(pathname),

		hasUnderscore: pathname.includes('_'),

		hasFileExtension: /\.[a-zA-Z0-9]+$/.test(pathname),

		segments: pathname.split('/').filter(Boolean),
	};
	if (data.length > 100) {
		score = deductScore(score, 'medium');

		issues.push(
			createIssue(
				'URL_TOO_LONG',
				'URL is too long',
				`Current URL length is ${data.length} characters.`,
				'medium',
				'Keep URLs short and descriptive.',
			),
		);
	}
	if (data.hasQueryParameters) {
		score = deductScore(score, 'low');

		issues.push(
			createIssue(
				'URL_QUERY_PARAMETERS',
				'Query parameters detected',
				parsed.search,
				'low',
				'Prefer clean URLs where possible.',
			),
		);
	}
	if (data.hasFragment) {
		score = deductScore(score, 'low');

		issues.push(
			createIssue(
				'URL_FRAGMENT',
				'Fragment identifier detected',
				parsed.hash,
				'low',
				'Fragments are usually ignored by search engines.',
			),
		);
	}
	if (data.hasUppercase) {
		score = deductScore(score, 'medium');

		issues.push(
			createIssue(
				'URL_UPPERCASE',
				'Uppercase letters detected',
				pathname,
				'medium',
				'Use lowercase URLs.',
			),
		);
	}
	if (data.hasUnderscore) {
		score = deductScore(score, 'low');

		issues.push(
			createIssue(
				'URL_UNDERSCORE',
				'Underscore detected',
				pathname,
				'low',
				'Use hyphens instead of underscores.',
			),
		);
	}
	if (data.hasFileExtension) {
		score = deductScore(score, 'low');

		issues.push(
			createIssue(
				'URL_FILE_EXTENSION',
				'File extension detected',
				pathname,
				'low',
				'Prefer extensionless URLs.',
			),
		);
	}
	return {
		score,

		maxScore: SEO_SECTION_SCORE.URL,

		issues,

		data: { ...data },
	};
}
