import { SEO_SECTION_SCORE } from '../../constants/seoSectionScore.js';
import { deductScore } from './deductScore.js';
import { createIssue } from './issue.service.js';
import { type SeoIssue, type SeoSectionResult } from './types.js';

export const analyzeTitle = (title: string, url: string): SeoSectionResult => {
	const issues: SeoIssue[] = [];

	let score: number = SEO_SECTION_SCORE.TITLE;

	const trimmedTitle = title.trim();

	if (!trimmedTitle) {
		score = deductScore(score, 'high');
		issues.push(
			createIssue(
				'TITLE_MISSING',
				'Missing title',
				'This page does not contain a title tag.',
				'high',
				'Add a unique title describing the page.',
				true
			),
		);

		return { score, maxScore: 20, issues, data: { title: '' } };
	}

	if (trimmedTitle.length < 30) {
		score =deductScore(score, 'medium');

		issues.push(
			createIssue(
				'TITLE_SHORT',
				'Title is too short',
				`Current length is ${trimmedTitle.length} characters.`,
				'medium',
				'Use a title between 30 and 60 characters.',
				true
			),
		);
	}

	if (trimmedTitle.length > 60) {
		score = deductScore(score, 'medium');

		issues.push(
			createIssue(
				'TITLE_LONG',
				'Title is too long',
				`Current length is ${trimmedTitle.length} characters.`,
				'medium',
				'Keep the title under 60 characters.',
				true
			),
		);
	}

	return {
		score: Math.max(score, 0),
		maxScore: 20,
		issues,
		data: { title: trimmedTitle, length: trimmedTitle.length, url },
	};
}
