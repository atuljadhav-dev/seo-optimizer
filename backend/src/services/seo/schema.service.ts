import * as cheerio from 'cheerio';
import type {
	SeoIssue,
	SeoSectionResult,
	SchemaData,
	SchemaInfo,
} from './types.js';
import { createIssue } from './issue.service.js';
import { SEO_SECTION_SCORE } from '../../constants/seoSectionScore.js';
import { deductScore } from './deductScore.js';

export const analyzeSchema = ($: cheerio.CheerioAPI): SeoSectionResult => {
	let score: number = SEO_SECTION_SCORE.TECHNICAL;

	const issues: SeoIssue[] = [];

	const schemas: SchemaInfo[] = [];

	$('script[type="application/ld+json"]').each((_, element) => {
		try {
			const raw = $(element).html() ?? '';

			const json = JSON.parse(raw);

			schemas.push({
				type: json['@type'] ?? 'Unknown',
				context: json['@context'] ?? '',
				valid: true,
			});

			if (!json['@context']) {
				score = deductScore(score, 'medium');

				issues.push(
					createIssue(
						'SCHEMA_CONTEXT_MISSING',
						'Schema context missing',
						'JSON-LD schema is missing @context.',
						'medium',
						'Add @context to the JSON-LD object.',
						true
					),
				);
			}

			if (!json['@type']) {
				score = deductScore(score, 'medium');

				issues.push(
					createIssue(
						'SCHEMA_TYPE_MISSING',
						'Schema type missing',
						'JSON-LD schema is missing @type.',
						'medium',
						'Add @type to the JSON-LD object.',
						true
					),
				);
			}
		} catch {
			score = deductScore(score, 'high');

			issues.push(
				createIssue(
					'SCHEMA_INVALID',
					'Invalid JSON-LD',
					'Failed to parse JSON-LD schema.',
					'high',
					'Ensure the schema contains valid JSON.',
					true,
				),
			);
		}
	});

	const data: SchemaData = {
		totalSchemas: schemas.length,
		jsonLdCount: schemas.length,
		microdataCount: $('[itemscope]').length,
		rdfaCount: $('[typeof]').length,
		schemas,
	};

	if (data.totalSchemas === 0) {
		score = deductScore(score, 'medium');

		issues.push(
			createIssue(
				'SCHEMA_NOT_FOUND',
				'No structured data found',
				'The page does not contain structured data.',
				'medium',
				'Add JSON-LD schema for better search engine understanding.',
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
