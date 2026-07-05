let issueCounter = 1;

export default function nextIssueId() {
	return `issue_${String(issueCounter++).padStart(4, '0')}`;
}
