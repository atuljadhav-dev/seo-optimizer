import type { LinkInfo, SeoReport } from './types.js';
export const fixStaticSeoIssues = (report: SeoReport) => {
	const { issues } = report;
	const staticIssues = issues.filter((issue) => !issue.aiFix);
	if (staticIssues.length === 0) {
		return [];
	}
	return generateSitemapXmlFix(report);
};

const generateRobotsTxtFix = (report: SeoReport) => {
	return `# *
User-agent: *
Allow: /

# Googlebot
User-agent: Googlebot
Allow: /

# Bingbot
User-agent: Bingbot
Allow: /

# Host
Host: ${report.url}

# Sitemaps
Sitemap: ${report.url}/sitemap.xml`;
};

const generateSitemapXmlFix = (report: SeoReport) => {
	const links: LinkInfo[] = report.sections.link?.data?.links as LinkInfo[];

	let link = links
		.filter((link) => link.internal && link.href.startsWith('/') && link.href !== '/')
		.map((link) => link.href);
	link = [...new Set(link)];
	return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
    <url>
        <loc>${report.url.endsWith('/') ? report.url.slice(0, -1) : report.url}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
    </url>
	${link
		.map(
			(link) => `<url>
						<loc>${report.url.endsWith('/') ? report.url.slice(0, -1) : report.url}${link}</loc>
						<lastmod>${new Date().toISOString()}</lastmod>
						<changefreq>daily</changefreq>
						<priority>0.8</priority>
					</url>`,
		)
		.join('\n')}
</urlset>`;
};
