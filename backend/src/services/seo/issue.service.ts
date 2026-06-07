import { type SeoIssue } from './types.js';
export function createIssue(
	id: string,
	title: string,
	description: string,
	severity: 'low' | 'medium' | 'high',
	recommendation: string,
): SeoIssue {
	return { id, title, description, severity, recommendation };
}
