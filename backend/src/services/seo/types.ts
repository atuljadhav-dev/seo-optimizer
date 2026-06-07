import * as cheerio from 'cheerio';
export interface SeoIssue {
	id: string;
	title: string;
	description: string;
	severity: 'low' | 'medium' | 'high';
	recommendation: string;
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
// export interface SeoReport {
// 	overallScore: number;

// 	sections: {
// 		title: SeoSectionResult;

// 		meta: SeoSectionResult;
// 	};

// 	totalIssues: number;

// 	issues: SeoIssue[];
// }
export interface HeadingInfo {
	level: number;
	text: string;
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

	grade: string;

	summary: SeoSummary;

	sections: Record<string, SeoSectionResult>;

	totalIssues: number;

	issues: SeoIssue[];

	recommendations: SeoRecommendation[];
}
