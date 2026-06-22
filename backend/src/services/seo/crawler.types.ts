import * as cheerio from 'cheerio';
export interface CrawlOptions {
	maxDepth: number;
	maxPages: number;
}

export interface CrawledPage {
	url: string;

	finalUrl: string;

	status: number;

	loadTime: number;

	html: string;

	$: cheerio.CheerioAPI;

	depth: number;
}

export interface CrawlResult {
	pages: CrawledPage[];
	visitedUrls: string[];
	totalPages: number;
	totalInternalLinks: number;
}
