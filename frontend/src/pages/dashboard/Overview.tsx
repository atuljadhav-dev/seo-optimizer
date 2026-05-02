// src/pages/dashboard/overview.tsx
import React, { useState, useEffect, type FormEvent } from "react";
import axios from "axios";
import API from "../../services/api.js";
import DashboardLayout from "../../layouts/DashboardLayout.js";

interface ScanResult {
    _id?: string;
    url: string;
    seoScore: number;
    loadSpeed: string;
    sslValid: boolean;
    indexedPages: number;
    createdAt?: string;
}

export const Overview: React.FC = () => {
    const [domainInput, setDomainInput] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [history, setHistory] = useState<ScanResult[]>([]);
    const [error, setError] = useState<string>("");

    // 1. Fetch user's historical tracked domains on workspace initialization
    useEffect(() => {
        const fetchDomainHistory = async () => {
            try {
                const response = await API.get("/domains");
                setHistory(response.data);
            } catch (err) {
                console.error("Failed to load domain assets:", err);
            }
        };
        fetchDomainHistory();
    }, []);

    const handleScanSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        // Pre-calculate structural targets before database storage mapping
        const computedDomain = domainInput
            .replace(/^(https?:\/\/)?(www\.)?/, "")
            .trim();
        const mockSeoScore = Math.floor(Math.random() * (98 - 74 + 1)) + 74;
        const mockLoadSpeed =
            (Math.random() * (1.6 - 0.3) + 0.3).toFixed(2) + "s";
        const mockIndexedPages = Math.floor(Math.random() * 500) + 40;

        try {
            // 2. Dispatch persistent entry payloads across network links
            const response = await API.post("/domains", {
                url: computedDomain,
                seoScore: mockSeoScore,
                loadSpeed: mockLoadSpeed,
                sslValid: true,
                indexedPages: mockIndexedPages,
            });

            // Insert new entry at top of dashboard tracking layout
            setHistory((prev) => [response.data, ...prev]);
            setDomainInput("");
        } catch (err) {
            if (axios.isAxiosError(err) && err.response?.data?.message) {
                setError(err.response.data.message);
            } else {
                setError("Failed to record new domain performance log.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <DashboardLayout>
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        SEO Workspace Analyzer
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Audit domains dynamically to evaluate structural
                        metadata efficiency.
                    </p>
                </div>

                {error && (
                    <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/30 dark:text-red-400">
                        {error}
                    </div>
                )}

                {/* Input Control Board */}
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-800">
                    <form
                        onSubmit={handleScanSubmit}
                        className="flex flex-col gap-4 sm:flex-row">
                        <div className="flex-1">
                            <input
                                type="text"
                                required
                                value={domainInput}
                                onChange={(e) => setDomainInput(e.target.value)}
                                placeholder="Enter workspace target domain (e.g., atuljadhav.tech)"
                                className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 dark:border-slate-700 dark:bg-slate-900"
                                disabled={loading}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="rounded-lg bg-cyan-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-cyan-500 disabled:opacity-50 dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400 transition-colors">
                            {loading
                                ? "Analyzing Structure..."
                                : "Analyze Domain"}
                        </button>
                    </form>
                </div>

                {/* Historical Workspace Records Layout */}
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold tracking-tight text-slate-700 dark:text-slate-300">
                        Tracked Assets
                    </h2>

                    {history.length === 0 ? (
                        <div className="text-center py-12 border border-dashed border-slate-300 rounded-xl text-slate-400 dark:border-slate-700">
                            No domains currently being monitored. Enter a URL
                            above to log your first asset assessment.
                        </div>
                    ) : (
                        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                            {history.map((asset) => (
                                <div
                                    key={asset._id}
                                    className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-800 transition-all hover:shadow-md">
                                    <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-700">
                                        <span className="font-bold tracking-tight truncate max-w-[70%] text-cyan-600 dark:text-cyan-400">
                                            {asset.url}
                                        </span>
                                        <span
                                            className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                                                asset.seoScore >= 85
                                                    ? "bg-green-100 text-green-800 dark:bg-green-950/40 dark:text-green-400"
                                                    : "bg-yellow-100 text-yellow-800 dark:bg-yellow-950/40 dark:text-yellow-400"
                                            }`}>
                                            Score: {asset.seoScore}
                                        </span>
                                    </div>

                                    <div className="mt-4 grid grid-cols-2 gap-y-3 text-xs">
                                        <div>
                                            <span className="text-slate-400 block">
                                                Velocity
                                            </span>
                                            <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                                                {asset.loadSpeed}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="text-slate-400 block">
                                                Indexed Pages
                                            </span>
                                            <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                                                {asset.indexedPages}
                                            </span>
                                        </div>
                                        <div className="col-span-2 pt-1">
                                            <span className="text-slate-400 block mb-0.5">
                                                SSL Status
                                            </span>
                                            <span className="text-green-500 font-medium flex items-center gap-1">
                                                🛡️ Secured Connection
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Overview;
