import React, { useState } from "react";
import api from "../../services/api"; // Using your Axios instance engine configuration layer
import axios from "axios";
import DashboardLayout from "../../layouts/DashboardLayout";

interface LinkData {
    url: string;
    text: string;
    isExternal: boolean;
    isNoFollow: boolean;
}

interface BacklinkReport {
    totalLinks: number;
    internalCount: number;
    externalCount: number;
    doFollowCount: number;
    noFollowCount: number;
    links: LinkData[];
}

const LinkAnalyzer: React.FC = () => {
    const [url, setUrl] = useState("");
    const [data, setData] = useState<BacklinkReport | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleScan = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setData(null);

        try {
            const res = await api.post("/backlink/analyze-profile", {
                url,
            });
            if (res.data.success) {
                setData(res.data.data);
                console.log("Backlink analysis result:", res.data.data);
            }
        } catch (err) {
            if (axios.isAxiosError(err) && err.response?.data?.message) {
                setError(err.response.data.message);
            } else {
                setError("An unexpected error occurred during analysis.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <DashboardLayout>
            <div className="p-6 space-y-6 max-w-5xl">
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
                    <h2 className="text-xl font-bold text-white mb-2">
                        Backlink & Anchor Metric Analyzer
                    </h2>
                    <p className="text-sm text-slate-400 mb-4">
                        Scan destination paths to crawl index rules and isolate
                        dofollow distributions.
                    </p>

                    <form onSubmit={handleScan} className="flex gap-3">
                        <input
                            type="text"
                            placeholder="https://myblogsite.com/post"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className="flex-1 bg-slate-950 border border-slate-800 text-white rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500"
                        />
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-5 py-2 rounded-lg transition disabled:opacity-50"
                            disabled={loading}>
                            {loading
                                ? "Analyzing Profile..."
                                : "Scan Anchor Network"}
                        </button>
                    </form>
                    {error && (
                        <p className="text-red-400 text-xs mt-2">{error}</p>
                    )}
                </div>

                {data && (
                    <div className="space-y-6">
                        {/* Summary Stat Cards Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-center">
                                <span className="text-2xl font-bold text-white">
                                    {data.totalLinks}
                                </span>
                                <p className="text-xs text-slate-400 mt-1">
                                    Found Links
                                </p>
                            </div>
                            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-center">
                                <span className="text-2xl font-bold text-emerald-400">
                                    {data.doFollowCount}
                                </span>
                                <p className="text-xs text-slate-400 mt-1">
                                    Dofollow (Equity Passes)
                                </p>
                            </div>
                            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-center">
                                <span className="text-2xl font-bold text-amber-400">
                                    {data.noFollowCount}
                                </span>
                                <p className="text-xs text-slate-400 mt-1">
                                    Nofollow (Blocked)
                                </p>
                            </div>
                            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-center">
                                <span className="text-2xl font-bold text-blue-400">
                                    {data.externalCount}
                                </span>
                                <p className="text-xs text-slate-400 mt-1">
                                    Outbound / External
                                </p>
                            </div>
                        </div>

                        {/* Details Table View */}
                        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                            <div className="p-4 bg-slate-800/50 border-b border-slate-800">
                                <h3 className="text-white font-semibold text-sm">
                                    Sample Anchor Mappings Profile
                                </h3>
                            </div>
                            <div className="overflow-x-auto max-h-100">
                                <table className="w-full text-left text-xs text-slate-300">
                                    <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider sticky top-0 border-b border-slate-800">
                                        <tr>
                                            <th className="p-3">
                                                Anchor Text String
                                            </th>
                                            <th className="p-3">
                                                Destination Link Path
                                            </th>
                                            <th className="p-3">Type</th>
                                            <th className="p-3">
                                                Spider Directives
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-800">
                                        {data.links.map((link, idx) => (
                                            <tr
                                                key={idx}
                                                className="hover:bg-slate-800/30 transition">
                                                <td className="p-3 font-medium text-white truncate max-w-45">
                                                    {link.text}
                                                </td>
                                                <td className="p-3 text-slate-400 font-mono truncate max-w-45">
                                                    {link.url}
                                                </td>
                                                <td className="p-3">
                                                    <span
                                                        className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                                                            link.isExternal
                                                                ? "bg-blue-500/10 text-blue-400"
                                                                : "bg-slate-800 text-slate-300"
                                                        }`}>
                                                        {link.isExternal
                                                            ? "External"
                                                            : "Internal"}
                                                    </span>
                                                </td>
                                                <td className="p-3">
                                                    <span
                                                        className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                                                            link.isNoFollow
                                                                ? "bg-amber-500/10 text-amber-400"
                                                                : "bg-emerald-500/10 text-emerald-400"
                                                        }`}>
                                                        {link.isNoFollow
                                                            ? 'rel="nofollow"'
                                                            : "dofollow"}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};
export default LinkAnalyzer;
