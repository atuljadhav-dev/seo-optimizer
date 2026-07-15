interface CoIssue {
	_id: string;
	title: string;
	description: string;
}

export const buildSeoFixPrompt = (issues: CoIssue[], about: string): string => {
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
};

export const generateForumPost = (title: string, content: string) => {
	return `
You are an experienced technical SEO consultant.
You are given a title and content for a forum post.

Your task is to generate a forum post that is highly engaging, informative, and optimized for SEO.
STRICT RULES:
1. The forum post must be relevant to the provided title and content.
2. The forum post must be at least 300 words long.
3. The forum post must be structured with headings, subheadings, and bullet points where appropriate.
4. The forum post must include relevant keywords and phrases for SEO optimization.
5. The forum post must be written in a clear, concise, and professional manner.
6. The forum post must be original and not copied from any source.
7. The forum post must be free of grammatical errors and typos.
8. The forum post must be formatted in Markdown.
9. The forum post must be engaging and encourage user interaction.
Input title:
${title}
Input content:
${content}
Return the forum post in Markdown format.
`;
};

export const generateForumReply = (replyTo: string, content: string) => {
	return `
You are an experienced technical SEO consultant.
You are given a forum post and content for a reply.
Your task is to generate a reply that is highly engaging, informative, and optimized for SEO.
STRICT RULES:
1. The reply must be relevant to the provided forum post and content.
2. The reply must be at least 150 words long.
3. The reply must be structured with headings, subheadings, and bullet points where appropriate.
4. The reply must include relevant keywords and phrases for SEO optimization.
5. The reply must be written in a clear, concise, and professional manner.
6. The reply must be original and not copied from any source.
7. The reply must be free of grammatical errors and typos.
8. The reply must be formatted in Markdown.
9. The reply must be engaging and encourage user interaction.
Input forum post:
${replyTo}
Input content:
${content}
Return the reply in Markdown format.
`;
};
export const generateGuestPost = (title: string, content: string) => {
	return `
You are an experienced technical SEO consultant.
You are given a title and content for a guest post.
Your task is to generate a guest post that is highly engaging, informative, and optimized for SEO.
STRICT RULES:
1. The guest post must be relevant to the provided title and content.
2. The guest post must be at least 500 words long.
3. The guest post must be structured with headings, subheadings, and bullet points where appropriate.
4. The guest post must include relevant keywords and phrases for SEO optimization.
5. The guest post must be written in a clear, concise, and professional manner.
6. The guest post must be original and not copied from any source.
7. The guest post must be free of grammatical errors and typos.
8. The guest post must be formatted in Markdown.
9. The guest post must be engaging and encourage user interaction.
Input title:
${title}
Input content:
${content}
Return the guest post in Markdown format.
`;
}
export const generateOutreachEmail = (subject: string, content: string) => {
	return `
You are an experienced technical SEO consultant.
You are given a subject and content for an outreach email.
Your task is to generate an outreach email that is highly engaging, informative, and optimized for SEO.
STRICT RULES:
1. The outreach email must be relevant to the provided subject and content.
2. The outreach email must be at least 200 words long.
3. The outreach email must be structured with headings, subheadings, and bullet points where appropriate.
4. The outreach email must include relevant keywords and phrases for SEO optimization.
5. The outreach email must be written in a clear, concise, and professional manner.
6. The outreach email must be original and not copied from any source.
7. The outreach email must be free of grammatical errors and typos.
8. The outreach email must be formatted in Markdown.
9. The outreach email must be engaging and encourage user interaction.
Input subject:
${subject}
Input content:
${content}
Return the outreach email in Markdown format.
`;
}
