import { type Request, type Response } from "express";

interface ParsedSeoMetrics {
    title: string;
    description: string;
    h1Count: number;
    h2Count: number;
    ogTitle: string;
    ogImage: string;
    sslSecure: boolean;
}

export const analyzeExternalUrl = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { url } = req.body;

        if (!url) {
            res.status(400).json({
                success: false,
                message: "A valid target URL is required.",
            });
            return;
        }

        // Validate absolute URL format
        let targetUrl: URL;
        try {
            targetUrl = new URL(url);
        } catch {
            res.status(400).json({
                success: false,
                message: "Invalid URL formatting. Include http:// or https://",
            });
            return;
        }

        // Fetch the target webpage's raw HTML safely
        const response = await fetch(targetUrl.href, {
            headers: { "User-Agent": "SEO-Optimizer-Crawler/1.0" },
            signal: AbortSignal.timeout(8000), // 8 second strict timeout guard rail
        });

        if (!response.ok) {
            res.status(422).json({
                success: false,
                message: `Failed to reach target. Status: ${response.status}`,
            });
            return;
        }

        const html = await response.text();

        const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
        const descMatch =
            html.match(
                /<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i
            ) ||
            html.match(
                /<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["']/i
            );

        const ogTitleMatch = html.match(
            /<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']*)["']/i
        );
        const ogImageMatch = html.match(
            /<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']*)["']/i
        );

        const h1Count = (html.match(/<h1[^>]*>/gi) || []).length;
        const h2Count = (html.match(/<h2[^>]*>/gi) || []).length;

        const metrics: ParsedSeoMetrics = {
            title:
                titleMatch && titleMatch[1]
                    ? titleMatch[1].trim()
                    : "Missing Title Tag",
            description:
                descMatch && descMatch[1]
                    ? descMatch[1].trim()
                    : "Missing Meta Description",
            h1Count,
            h2Count,
            ogTitle:
                ogTitleMatch && ogTitleMatch[1]
                    ? ogTitleMatch[1].trim()
                    : "Missing OG Title",
            ogImage:
                ogImageMatch && ogImageMatch[1] ? ogImageMatch[1].trim() : "",
            sslSecure: targetUrl.protocol === "https:",
        };
        res.status(200).json({
            success: true,
            url: targetUrl.href,
            data: metrics,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Scraping engine failed to process the destination site.",
            error: error.message,
        });
    }
};
