import * as cheerio from 'cheerio';
export interface SeoIssue {
	id: string;
	_id: string;
	title: string;
	description: string;
	severity: 'low' | 'medium' | 'high';
	recommendation: string;
	aiFix: boolean;
	uid?: string;
}

export interface SeoSectionResult {
	score: number;
	maxScore: number;
	issues: SeoIssue[];
	data?: Record<string, unknown>;
}

export interface WebsiteContent {
	url: string;
	html: string;
	$: cheerio.CheerioAPI;
	finalUrl: string;
	status: number;
	loadTime: number;
}

export interface HeadingInfo {
	level: number;
	text: string;
	uid: string;
}

export interface HeadingSummary {
	total: number;
	h1: number;
	h2: number;
	h3: number;
	h4: number;
	h5: number;
	h6: number;
}
export interface ImageInfo {
	src: string;
	alt: string;
	lazy: boolean;
	width?: string;
	height?: string;
}
export interface LinkInfo {
	href: string;
	text: string;
	internal: boolean;
	external: boolean;
	noFollow: boolean;
	noOpener: boolean;
	noReferrer: boolean;
}
export interface TechnicalSeoData {
	hasViewport: boolean;
	hasCanonical: boolean;
	hasRobotsMeta: boolean;
	hasFavicon: boolean;
	hasLanguage: boolean;
	hasCharset: boolean;
	hasOpenGraph: boolean;
	hasTwitterCard: boolean;
	https: boolean;
}
export interface UrlAnalysisData {
	url: string;
	length: number;
	hasHttps: boolean;
	hasQueryParameters: boolean;
	hasFragment: boolean;
	hasUppercase: boolean;
	hasUnderscore: boolean;
	hasFileExtension: boolean;
	segments: string[];
}
export interface SeoSummary {
	passedChecks: number;

	warningChecks: number;

	failedChecks: number;
}

export interface SeoRecommendation {
	title: string;

	description: string;

	priority: 'low' | 'medium' | 'high';
}

export interface SeoReport {
	overallScore: number;
	url: string;
	grade: string;

	summary: SeoSummary;

	sections: Record<string, SeoSectionResult>;

	totalIssues: number;

	issues: SeoIssue[];

	recommendations: SeoRecommendation[];
}
export interface WebsiteAuditReport {
	websiteUrl: string;
	totalPages: number;
	averageScore: number;
	pageReports: { url: string; report: SeoReport }[];
	summary: { passedPages: number; failedPages: number };
}
export interface RobotsData {
	exists: boolean;
	status: number;
	hasSitemap: boolean;
	hasUserAgent: boolean;
	hasDisallow: boolean;
	hasAllow: boolean;
	hasCrawlDelay: boolean;
	lines: number;
}
export interface SitemapData {
	exists: boolean;
	status: number;
	urlCount: number;
	isIndex: boolean;
	urls: string[];
}
export interface SchemaInfo {
	type: string;
	context: string;
	valid: boolean;
}

export interface SchemaData {
	totalSchemas: number;
	jsonLdCount: number;
	microdataCount: number;
	rdfaCount: number;
	schemas: SchemaInfo[];
}
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
