interface CoIssue {
	_id: string;
	title: string;
	description: string;
}

export function buildSeoFixPrompt(issues: CoIssue[], about: string): string {
	return `
You are an experienced technical SEO consultant.

You are given SEO issues detected by a deterministic SEO engine.

Your task is to generate a specific, actionable fix for each provided issue.

STRICT RULES:

1. Never invent new issues.
2. Process every issue provided in the input.
3. Return exactly one result for each input issue.
4. Preserve the "_id" of every issue exactly as provided.
5. Never create, modify, rename, or remove an "_id".
6. The "_id" in the response must match an input issue "_id".
7. The "fix" must contain the actual fix value or exact action required.
8. Do not return general SEO advice.
9. Do not explain your reasoning.
10. Return valid JSON only.
11. Do not use markdown code fences.
12. If a useful fix cannot be determined from the provided information, return an empty string for "fix".

Examples:

Missing H1:
{
	"_id": "issue_001",
	"fix": "<h1>Professional SEO Services</h1>"
}

Weak title:
{
	"_id": "issue_003",
	"fix": "Professional SEO Audit Tool | Analyze and Improve Website SEO"
}

Input SEO issues:
${JSON.stringify(issues, null, 2)}

Website information:
${JSON.stringify(about, null, 2)}

Return exactly this JSON structure:

[
	{
    "_id": "issue_id_from_input",
    "fix": "specific actionable fix"
	}
]
`;
}
