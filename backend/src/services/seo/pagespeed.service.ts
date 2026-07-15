const PAGESPEED_URL =
	'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';

type PageSpeedStrategy = 'mobile' | 'desktop';

const CATEGORIES = ['performance', 'accessibility', 'best-practices', 'seo'];

export const getPageSpeedReport = async (
	url: string,
	strategy: PageSpeedStrategy,
) => {
	const params = new URLSearchParams({ url, strategy });

	for (const category of CATEGORIES) {
		params.append('category', category);
	}

	if (process.env.PAGESPEED_API_KEY) {
		params.set('key', process.env.PAGESPEED_API_KEY);
	}

	const response = await fetch(`${PAGESPEED_URL}?${params.toString()}`);
	if (!response.ok) {
		const errorText = await response.text();

		throw new Error(
			`PageSpeed API failed: ${response.status} ${errorText}`,
		);
	}

	return response.json();
};

export const normalizePageSpeedReport = (data: any) => {
	const categories = data.lighthouseResult?.categories ?? {};
	const audits = data.lighthouseResult?.audits ?? {};

	return {
		strategy: data.lighthouseResult?.configSettings?.formFactor,

		scores: {
			performance: categories.performance?.score ?? null,
			accessibility: categories.accessibility?.score ?? null,
			bestPractices: categories['best-practices']?.score ?? null,
			seo: categories.seo?.score ?? null,
		},

		metrics: {
			fcp: audits['first-contentful-paint']?.numericValue ?? null,
			lcp: audits['largest-contentful-paint']?.numericValue ?? null,
			cls: audits['cumulative-layout-shift']?.numericValue ?? null,
			tbt: audits['total-blocking-time']?.numericValue ?? null,
			speedIndex: audits['speed-index']?.numericValue ?? null,
		},

		audits: Object.values(audits).map((audit: any) => ({
			id: audit.id,
			title: audit.title,
			description: audit.description,
			score: audit.score,
			displayValue: audit.displayValue ?? null,
		})),
	};
};
export const analyzePageSpeed = async (url: string) => {
	const [mobileRaw, desktopRaw] = await Promise.all([
		getPageSpeedReport(url, 'mobile'),
		getPageSpeedReport(url, 'desktop'),
	]);
	return {
		mobile: normalizePageSpeedReport(mobileRaw),
		desktop: normalizePageSpeedReport(desktopRaw),
	};
};
