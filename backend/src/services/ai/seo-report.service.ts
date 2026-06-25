import type { SeoReport } from '../seo/types.js';
import aiService from './ai.service.js';
import { buildSeoReportPrompt } from './prompts.js';

export async function explainSeoReport(report: SeoReport) {
	const aiInput = {
		overallScore: report.overallScore,
		grade: report.grade,
		topIssues: report.issues.slice(0, 10),
		recommendations: report.recommendations.slice(0, 10),
	};
	const prompt = buildSeoReportPrompt(aiInput);

	const response = await aiService({
		content: prompt,
		config: {
			temperature: 0.2,
			maxOutputTokens: 1200,
			responseMimeType: 'application/json',
		},
	});

	return JSON.parse(response);
}
