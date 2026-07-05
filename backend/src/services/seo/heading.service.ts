import * as cheerio from 'cheerio';
import { createIssue } from './issue.service.js';
import {
	type SeoIssue,
	type SeoSectionResult,
	type HeadingInfo,
	type HeadingSummary,
} from './types.js';
import { deductScore } from './deductScore.js';
import { SEO_SECTION_SCORE } from '../../constants/seoSectionScore.js';
export function analyzeHeadings($: cheerio.CheerioAPI): SeoSectionResult {
	let score: number = SEO_SECTION_SCORE.HEADING;

	const issues: SeoIssue[] = [];

	const headings: HeadingInfo[] = [];

	const summary: HeadingSummary = {
		total: 0,
		h1: 0,
		h2: 0,
		h3: 0,
		h4: 0,
		h5: 0,
		h6: 0,
	};

	$('h1,h2,h3,h4,h5,h6').each((_, element) => {
		const tag = element.tagName.toLowerCase();

		const level = Number(tag.replace('h', ''));

		const text = $(element).text().trim();

		headings.push({ level, text ,uid: $(element).attr('id') ?? ''});

		summary.total++;

		summary[tag as keyof HeadingSummary]++;
	});

	// Missing H1

	if (summary.h1 === 0) {
		score = deductScore(score, 'high');

		issues.push(
			createIssue(
				'H1_MISSING',
				'Missing H1 heading',
				'No H1 heading was found.',
				'high',
				'Add one descriptive H1 heading.',
				true
			),
		);
	}

	// Multiple H1

	if (summary.h1 > 1) {
		score = deductScore(score, 'medium');

		issues.push(
			createIssue(
				'MULTIPLE_H1',
				'Multiple H1 headings',
				`${summary.h1} H1 headings detected.`,
				'medium',
				'Use only one H1 per page.',
			),
		);
	}
	for (const heading of headings) {
		if (!heading.text) {
			score = deductScore(score, 'medium');

			issues.push(
				createIssue(
					'EMPTY_HEADING',
					'Empty heading detected',
					'A heading element contains no text.',
					'medium',
					'Remove the heading or add descriptive text.',
				),
			);
		}
	}
	const duplicates = new Set<string>();

	for (const heading of headings) {
		const normalized = heading.text.toLowerCase();

		if (!normalized) continue;

		if (duplicates.has(normalized)) {
			score = deductScore(score, 'low');

			issues.push(
				createIssue(
					'DUPLICATE_HEADING',
					'Duplicate heading',
					`"${heading.text}" appears multiple times.`,
					'low',
					'Use unique heading text where possible.',
				),
			);

			continue;
		}

		duplicates.add(normalized);
	}
	let previous = 0;

	for (const heading of headings) {
		if (previous !== 0 && heading.level > previous + 1) {
			score = deductScore(score, 'medium');

			issues.push(
				createIssue(
					'SKIPPED_HEADING_LEVEL',
					'Heading hierarchy skipped',
					`H${previous} jumps directly to H${heading.level}.`,
					'medium',
					'Use headings sequentially.',
				),
			);
		}

		previous = heading.level;
	}
	return {
		score,
		maxScore: SEO_SECTION_SCORE.HEADING,
		issues,
		data: { summary, headings },
	};
}
