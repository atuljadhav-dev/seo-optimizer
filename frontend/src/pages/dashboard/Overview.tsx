import React, { useState, type FormEvent } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";

interface ScanResult {
    domain: string;
    seoScore: number;
    loadSpeed: string;
    sslValid: boolean;
    indexedPages: number;
}

const Overview: React.FC = () => {
    const [domain, setDomain] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [result, setResult] = useState<ScanResult | null>(null);

    const handleScan = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        // Simulating API domain audit data processing pipeline
        setTimeout(() => {
            setResult({
                domain: domain.replace(/^(https?:\/\/)?(www\.)?/, ""),
                seoScore: Math.floor(Math.random() * (98 - 72 + 1)) + 72, // Generates optimal realistic range
                loadSpeed: (Math.random() * (1.8 - 0.4) + 0.4).toFixed(2) + "s",
                sslValid: true,
                indexedPages: Math.floor(Math.random() * 450) + 50,
            });
            setLoading(false);
        }, 1200);
    };

    return (
        <DashboardLayout>
            <div className="space-y-8">
                {/* Header Summary Profile */}
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        SEO Workspace Analyzer
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Audit domains dynamically to evaluate structural
                        metadata efficiency.
                    </p>
                </div>

                {/* Form Submission Deck */}
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-800">
                    <form
                        onSubmit={handleScan}
                        className="flex flex-col gap-4 sm:flex-row">
                        <div className="flex-1">
                            <input
                                type="text"
                                required
                                pattern="^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$"
                                value={domain}
                                onChange={(e) => setDomain(e.target.value)}
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

                {/* Conditional Analysis Matrix Summary Grid */}
                {result && (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {/* Health Score Wrapper Block */}
                        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-800">
                            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                SEO Score
                            </span>
                            <div className="mt-2 flex items-baseline space-x-2">
                                <span
                                    className={`text-4xl font-extrabold ${
                                        result.seoScore >= 85
                                            ? "text-green-500"
                                            : "text-yellow-500"
                                    }`}>
                                    {result.seoScore}/100
                                </span>
                            </div>
                        </div>

                        {/* Performance Speeds Card */}
                        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-800">
                            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                Load Velocity
                            </span>
                            <div className="mt-2 flex items-baseline space-x-2">
                                <span className="text-4xl font-extrabold text-slate-900 dark:text-white">
                                    {result.loadSpeed}
                                </span>
                            </div>
                        </div>

                        {/* Index Coverage Count */}
                        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-800">
                            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                Indexed Pages
                            </span>
                            <div className="mt-2 flex items-baseline space-x-2">
                                <span className="text-4xl font-extrabold text-slate-900 dark:text-white">
                                    {result.indexedPages}
                                </span>
                            </div>
                        </div>

                        {/* SSL Certificates Handshake Flag */}
                        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-800">
                            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                SSL Certificate
                            </span>
                            <div className="mt-2 flex items-center space-x-2">
                                <span className="text-lg font-bold text-green-500 flex items-center gap-1.5">
                                    🛡️ Active & Secure
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default Overview;
