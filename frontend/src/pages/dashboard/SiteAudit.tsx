import React, { useState } from "react";
import api from "../../services/api";
import DashboardLayout from "../../layouts/DashboardLayout";
import axios from "axios";
interface AuditReport {
    title: string;
    description: string;
    h1Count: number;
    h2Count: number;
    sslSecure: boolean;
    ogTitle: string;
    ogImage: string;
}

const SiteAudit: React.FC = () => {
    const [targetUrl, setTargetUrl] = useState("");
    const [report, setReport] = useState<AuditReport | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleAudit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setReport(null);

        try {
            const res = await api.post("/parser/parse-site", {
                url: targetUrl,
            });
            if (res.data.success) {
                console.log("Audit report received:", res.data.data);
                setReport(res.data.data);
            }
        } catch (err) {
            if (axios.isAxiosError(err) && err.response?.data?.message) {
                setError(err.response.data.message);
            } else {
                setError("An unexpected error occurred during the audit.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <DashboardLayout>
            <div className="p-6 space-y-6 max-w-4xl">
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
                    <h2 className="text-xl font-bold text-white mb-2">
                        Real-time SEO Spider Crawler
                    </h2>
                    <p className="text-sm text-slate-400 mb-4">
                        Analyze live meta tags, headings hierarchies, and link
                        parameters directly.
                    </p>

                    <form onSubmit={handleAudit} className="flex gap-3">
                        <input
                            type="text"
                            placeholder="https://example.com"
                            value={targetUrl}
                            onChange={(e) => setTargetUrl(e.target.value)}
                            className="flex-1 bg-slate-950 border border-slate-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 text-sm"
                            disabled={loading}
                        />
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-5 py-2 rounded-lg transition disabled:opacity-50"
                            disabled={loading}>
                            {loading ? "Crawling..." : "Run Diagnostics"}
                        </button>
                    </form>
                    {error && (
                        <p className="text-red-400 text-xs mt-3">{error}</p>
                    )}
                </div>

                {report && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fadeIn">
                        {/* Visual Score Check Overview */}
                        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-4">
                            <h3 className="text-white font-semibold text-md">
                                On-Page Diagnostics
                            </h3>
                            <div className="space-y-3">
                                <div>
                                    <span className="text-xs text-slate-400 block mb-1">
                                        Title Tag
                                    </span>
                                    <p className="text-sm font-medium text-white p-2.5 bg-slate-950 rounded border border-slate-800">
                                        {report.title}
                                    </p>
                                </div>
                                <div>
                                    <span className="text-xs text-slate-400 block mb-1">
                                        Meta Description
                                    </span>
                                    <p className="text-sm font-medium text-white p-2.5 bg-slate-950 rounded border border-slate-800">
                                        {report.description}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Technical Structural Health Elements */}
                        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl flex flex-col justify-between">
                            <h3 className="text-white font-semibold text-md mb-4">
                                Structural Elements
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg text-center">
                                    <span className="text-2xl font-bold text-white">
                                        {report.h1Count}
                                    </span>
                                    <p className="text-xs text-slate-400 mt-1">
                                        H1 Headings
                                    </p>
                                </div>
                                <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg text-center">
                                    <span className="text-2xl font-bold text-white">
                                        {report.h2Count}
                                    </span>
                                    <p className="text-xs text-slate-400 mt-1">
                                        H2 Headings
                                    </p>
                                </div>
                            </div>

                            <div className="mt-4 p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
                                <span className="text-xs text-slate-300 font-medium">
                                    SSL Security Protocol
                                </span>
                                <span
                                    className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                                        report.sslSecure
                                            ? "bg-emerald-500/10 text-emerald-400"
                                            : "bg-red-500/10 text-red-400"
                                    }`}>
                                    {report.sslSecure
                                        ? "HTTPS Secure"
                                        : "Insecure Connection"}
                                </span>
                            </div>
                        </div>

                        {/* NEW MODULE: Open Graph Social Graph Preview Layout Card */}
                        <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl md:col-span-2 space-y-4">
                            <h3 className="text-white font-semibold text-md">
                                Social Graph Metrics (Open Graph)
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-950 border border-slate-800 p-4 rounded-lg">
                                {/* Render Preview Image Component if found */}
                                <div className="md:col-span-1 flex items-center justify-center bg-slate-900 rounded border border-slate-800 min-h-30 overflow-hidden">
                                    {report.ogImage ? (
                                        <img
                                            src={report.ogImage}
                                            alt="OG Share Preview"
                                            className="object-cover w-full h-full max-h-40"
                                            onError={(e) => {
                                                // Fallback rendering UI path if link fails to resolve out-of-bounds
                                                (
                                                    e.target as HTMLImageElement
                                                ).style.display = "none";
                                            }}
                                        />
                                    ) : (
                                        <span className="text-xs text-slate-500 italic">
                                            No OG Image Scraped
                                        </span>
                                    )}
                                </div>

                                {/* Text Details Panel */}
                                <div className="md:col-span-2 space-y-3 flex flex-col justify-center">
                                    <div>
                                        <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-0.5">
                                            og:title
                                        </span>
                                        <p className="text-sm font-medium text-white">
                                            {report.ogTitle ||
                                                "Missing OG Title Tag"}
                                        </p>
                                    </div>
                                    <div>
                                        <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-0.5">
                                            og:image URL Source
                                        </span>
                                        <p className="text-xs font-mono text-slate-400 break-all select-all bg-slate-900/50 p-1.5 rounded border border-slate-850">
                                            {report.ogImage ||
                                                "No og:image property value declared."}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};
export default SiteAudit;
