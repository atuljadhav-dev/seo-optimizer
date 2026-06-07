import { type SeoIssue, type SeoSectionResult } from './types.js';
import { createIssue } from './issue.service.js';
import { SEO_SECTION_SCORE } from '../../constants/seoSectionScore.js';
import { deductScore } from './deductScore.js';

export function analyzeMetaDescription(description: string): SeoSectionResult {
	const issues: SeoIssue[] = [];

	let score: number = SEO_SECTION_SCORE.META;

	const meta = description.trim();

	if (!meta) {
		return {
			score: deductScore(score, 'high'),
			maxScore: 20,
			issues: [
				createIssue(
					'META_MISSING',
					'Meta description is missing',
					'The page does not contain a meta description.',
					'high',
					'Add a unique meta description between 120 and 160 characters.',
				),
			],
			data: { description: '', length: 0 },
		};
	}

	if (meta.length < 120) {
		score = deductScore(score, 'medium');

		issues.push(
			createIssue(
				'META_SHORT',
				'Meta description is too short',
				`Current length is ${meta.length} characters.`,
				'medium',
				'Increase the description length to around 120–160 characters.',
			),
		);
	}

	if (meta.length > 160) {
		score = deductScore(score, 'medium');

		issues.push(
			createIssue(
				'META_LONG',
				'Meta description is too long',
				`Current length is ${meta.length} characters.`,
				'medium',
				'Keep the description below 160 characters.',
			),
		);
	}

	if (/\s{2,}/.test(meta)) {
		score = deductScore(score, 'low');

		issues.push(
			createIssue(
				'META_SPACING',
				'Extra whitespace detected',
				'The meta description contains multiple consecutive spaces.',
				'low',
				'Remove unnecessary whitespace.',
			),
		);
	}

	return {
		score: Math.max(score, 0),
		maxScore: 20,
		issues,
		data: { description: meta, length: meta.length },
	};
}
