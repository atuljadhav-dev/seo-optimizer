import { type SeoReport, type SeoSectionResult } from './types.js';

export const buildSeoReport = (sections: {
	title: SeoSectionResult;
	meta: SeoSectionResult;
	heading: SeoSectionResult;
	image: SeoSectionResult;
	link: SeoSectionResult;
	technical: SeoSectionResult;
	url: SeoSectionResult;
	robots: SeoSectionResult;
	sitemap: SeoSectionResult;
	schema: SeoSectionResult;
}): SeoReport => {
	const allSections = Object.values(sections);

	const totalScore = allSections.reduce(
		(total, section) => total + section.score,
		0,
	);

	const maxScore = allSections.reduce(
		(total, section) => total + section.maxScore,
		0,
	);

	const issues = allSections.flatMap((section) => section.issues);
	const overallScore =
		maxScore === 0 ? 0 : Math.round((totalScore / maxScore) * 100);
	const grade =
		overallScore >= 90
			? 'A+'
			: overallScore >= 80
				? 'A'
				: overallScore >= 70
					? 'B'
					: overallScore >= 60
						? 'C'
						: overallScore >= 50
							? 'D'
							: 'F';
	const passedChecks = allSections.reduce(
		(total, section) => total + (section.maxScore - section.issues.length),
		0,
	);

	const warningChecks = issues.filter((i) => i.severity === 'low').length;

	const failedChecks = issues.filter((i) => i.severity === 'high').length;
	const recommendations = issues.map((issue) => ({
		title: issue.title,

		description: issue.recommendation,

		priority: issue.severity,
	}));
	const severityOrder = {
		high: 0,

		medium: 1,

		low: 2,
	};

	issues.sort(
		(a, b) => severityOrder[a.severity] - severityOrder[b.severity],
	);
	return {
		overallScore,
		url: sections.title.data?.url as string ?? '',
		grade,

		summary: {
			passedChecks,

			warningChecks,

			failedChecks,
		},

		sections,

		totalIssues: issues.length,

		issues,

		recommendations,
	};
}
