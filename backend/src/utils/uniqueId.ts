let issueCounter = 1;

const nextIssueId = () => {
	return `issue_${String(issueCounter++).padStart(4, '0')}`;
};
export default nextIssueId;
