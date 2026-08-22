import * as cheerio from 'cheerio';
import {
	type SeoSectionResult,
	type SeoIssue,
	type ImageInfo,
} from './types.js';
import { createIssue } from './issue.service.js';
import { SEO_SECTION_SCORE } from '../../constants/seoSectionScore.js';
import { deductScore } from './deductScore.js';
export const analyzeImages = ($: cheerio.CheerioAPI): SeoSectionResult => {
	let score: number = SEO_SECTION_SCORE.IMAGE;

	const issues: SeoIssue[] = [];

	const images: ImageInfo[] = [];
	let count = 0;
	$('img').each((_, element) => {
		const image: ImageInfo = {
			src: $(element).attr('src') ?? '',

			alt: $(element).attr('alt') ?? '',

			lazy: $(element).attr('loading') === 'lazy',
			uid: `image-${count++}`,
		};

		const width = $(element).attr('width');
		if (width !== undefined) {
			image.width = width;
		}

		const height = $(element).attr('height');
		if (height !== undefined) {
			image.height = height;
		}

		images.push(image);
	});
	for (const image of images) {
		if (!image.alt.trim()) {
			score = deductScore(score, 'medium');

			issues.push(
				createIssue(
					'IMAGE_ALT_MISSING',
					'Missing ALT attribute',
					`Image ${image.src} has no ALT text.`,
					'medium',
					'Provide descriptive ALT text.',
				),
			);
		}
	}
	const altSet = new Set<string>();

	for (const image of images) {
		const alt = image.alt.trim().toLowerCase();

		if (!alt) continue;

		if (altSet.has(alt)) {
			score = deductScore(score, 'low');

			issues.push(
				createIssue(
					'IMAGE_DUPLICATE_ALT',
					'Duplicate ALT text',
					`"${image.alt}" is used multiple times.`,
					'low',
					'Use unique ALT text.',
				),
			);

			continue;
		}

		altSet.add(alt);
	}
	for (const image of images) {
		if (!image.lazy) {
			score = deductScore(score, 'low');

			issues.push(
				createIssue(
					'IMAGE_LAZY_LOADING',
					'Lazy loading missing',
					`Image ${image.src} is not lazy loaded.`,
					'low',
					'Add loading="lazy" for non-critical images.',
				),
			);
		}
	}
	for (const image of images) {
		if (!image.width || !image.height) {
			score = deductScore(score, 'low');

			issues.push(
				createIssue(
					'IMAGE_DIMENSIONS',
					'Image dimensions missing',
					`${image.src} has no width or height.`,
					'low',
					'Specify width and height to reduce layout shifts.',
				),
			);
		}
	}
	return {
		score,

		maxScore: SEO_SECTION_SCORE.IMAGE,

		issues,

		data: {
			totalImages: images.length,

			images,
		},
	};
};
