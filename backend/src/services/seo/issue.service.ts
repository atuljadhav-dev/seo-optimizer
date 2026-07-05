import nextIssueId from '../../utils/uniqueId.js';
import { type SeoIssue } from './types.js';
export function createIssue(
	id: string,
	title: string,
	description: string,
	severity: 'low' | 'medium' | 'high',
	recommendation: string,
	aiFix: boolean = false,
): SeoIssue {
	return {
		id,
		_id: nextIssueId(),
		title,
		description,
		severity,
		recommendation,
		aiFix,
	};
}
