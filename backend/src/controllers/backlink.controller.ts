import { type Request, type Response } from "express";

interface AnalyzedLink {
    url: string;
    text: string;
    isExternal: boolean;
    relAttribute: string;
    isNoFollow: boolean;
}

interface BacklinkReport {
    totalLinks: number;
    internalCount: number;
    externalCount: number;
    doFollowCount: number;
    noFollowCount: number;
    links: AnalyzedLink[];
}

export const analyzePageLinks = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { url } = req.body;

        if (!url) {
            res.status(400).json({
                success: false,
                message: "A target URL is required for link analysis.",
            });
            return;
        }

        let targetUrl: URL;
        try {
            targetUrl = new URL(url);
        } catch {
            res.status(400).json({
                success: false,
                message: "Invalid URL formatting context.",
            });
            return;
        }

        const response = await fetch(targetUrl.href, {
            headers: { "User-Agent": "SEO-Optimizer-LinkScanner/1.0" },
            signal: AbortSignal.timeout(10000),
        });

        if (!response.ok) {
            res.status(422).json({
                success: false,
                message: `Could not reach site. Code: ${response.status}`,
            });
            return;
        }

        const html = await response.text();

        // Global matching for anchor tags: <a ... href="..." ...>text</a>
        const anchorRegex =
            /<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1[^>]*>([\s\S]*?)<\/a>/gi;

        // 1. Explicitly type the match tracker variable as RegExpExecArray or null
        let match: RegExpExecArray | null = null;

        const links: AnalyzedLink[] = [];
        let internalCount = 0;
        let externalCount = 0;
        let noFollowCount = 0;
        let doFollowCount = 0;

        // 2. Wrap the assignment cleanly inside the condition expressions
        while ((match = anchorRegex.exec(html)) !== null) {
            const fullTag = match[0];

            // 1. Safely evaluate match[2] and match[3] capture parameters
            const rawLinkUrl = match[2] ? match[2].trim() : "";
            const rawAnchorText = match[3]
                ? match[3].replace(/<[^>]*>/g, "").trim()
                : "";

            // Skip structural empty hash anchors or javascript routes
            if (
                !rawLinkUrl ||
                rawLinkUrl.startsWith("#") ||
                rawLinkUrl.startsWith("javascript:")
            ) {
                continue;
            }

            // Check structural host to determine relationship
            let isExternal = true;
            try {
                const parsedLink = new URL(rawLinkUrl, targetUrl.href);
                isExternal = parsedLink.hostname !== targetUrl.hostname;
            } catch {
                isExternal = false;
            }

            // Detect search spider relational rules
            const relMatch = fullTag.match(/rel=["']([^"']*)["']/i);

            // 2. Protect relAttribute from returning undefined or crashing on null relMatch
            const relAttribute = relMatch && relMatch[1] ? relMatch[1] : "";
            const isNoFollow = relAttribute
                ? relAttribute.toLowerCase().includes("nofollow")
                : false;

            if (isExternal) externalCount++;
            else internalCount++;
            if (isNoFollow) noFollowCount++;
            else doFollowCount++;

            links.push({
                url: rawLinkUrl,
                text: rawAnchorText || "[Image / Empty Link Title]",
                isExternal,
                relAttribute,
                isNoFollow,
            });
        }

        const report: BacklinkReport = {
            totalLinks: links.length,
            internalCount,
            externalCount,
            doFollowCount,
            noFollowCount,
            links: links.slice(0, 100), // Bound sample footprint data array frame cleanly
        };

        res.status(200).json({
            success: true,
            url: targetUrl.href,
            data: report,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Link profile scanning system error.",
            error: error.message,
        });
    }
};
