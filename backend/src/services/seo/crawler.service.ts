import { chromium } from 'playwright';
import * as cheerio from 'cheerio';
import type { CrawlOptions, CrawledPage, CrawlResult } from './types.js';

export const crawlWebsite = async (
	startUrl: string,
	options: CrawlOptions = { maxDepth: 2, maxPages: 20 },
): Promise<CrawlResult> => {
	const browser = await chromium.launch({ headless: true });

	const page = await browser.newPage();

	const queue: { url: string; depth: number }[] = [
		{ url: startUrl, depth: 0 },
	];

	const visited = new Set<string>();
	const discoveredLinks = new Set<string>();
	const pages: CrawledPage[] = [];

	const baseHost = new URL(startUrl).hostname;

	try {
		while (queue.length > 0 && pages.length < options.maxPages) {
			const current = queue.shift();

			if (!current) {
				continue;
			}

			if (visited.has(current.url)) {
				continue;
			}

			visited.add(current.url);

			try {
				const start = Date.now();
				const response = await page.goto(current.url, {
					waitUntil: 'networkidle',
					timeout: 30000,
				});
				const loadTime = Date.now() - start;
				const html = await page.content();

				const $ = cheerio.load(html);
				pages.push({
					url: current.url,

					finalUrl: page.url(),

					status: response?.status() ?? 0,

					loadTime,

					html,

					$,

					depth: current.depth,
				});

				if (current.depth >= options.maxDepth) {
					continue;
				}

				$('a').each((_, element) => {
					const href = $(element).attr('href')?.trim();

					if (!href) {
						return;
					}

					try {
						const absoluteUrl = new URL(href, current.url);

						if (absoluteUrl.hostname !== baseHost) {
							return;
						}

						absoluteUrl.hash = '';

						absoluteUrl.search = '';

						let normalized =
							absoluteUrl.origin + absoluteUrl.pathname;

						normalized = normalized.replace(/\/+$/, '');

						if (normalized === '') {
							normalized = absoluteUrl.origin;
						}
						discoveredLinks.add(normalized);
						if (!visited.has(normalized)) {
							const alreadyQueued = queue.some(
								(page) => page.url === normalized,
							);

							if (!visited.has(normalized) && !alreadyQueued) {
								queue.push({
									url: normalized,
									depth: current.depth + 1,
								});
							}
						}
					} catch {
						// Ignore invalid URLs
					}
				});
			} catch {
				continue;
			}
		}

		return {
			pages,
			visitedUrls: [...visited],
			totalPages: pages.length,
			totalInternalLinks: discoveredLinks.size,
		};
	} finally {
		await browser.close();
	}
};
