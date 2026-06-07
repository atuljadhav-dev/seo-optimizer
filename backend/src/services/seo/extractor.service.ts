import { chromium } from 'playwright';
import * as cheerio from 'cheerio';
import { type WebsiteContent } from './types.js';

export async function extractWebsite(url: string): Promise<WebsiteContent> {
	const browser = await chromium.launch({ headless: true });

	const page = await browser.newPage({
		viewport: { width: 1366, height: 768 },
	});

	try {
		const start = Date.now();
		const response = await page.goto(url, {
			waitUntil: 'networkidle',
			timeout: 30000,
		});

		const loadTime = Date.now() - start;

		const html = await page.content();

		const $ = cheerio.load(html);

		return {
			url,
			html,
			$,
			finalUrl: page.url(),
			status: response?.status() ?? 0,
			loadTime,
		};
	} finally {
		await browser.close();
	}
}
