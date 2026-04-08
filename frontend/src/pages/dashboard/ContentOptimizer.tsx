import React, { useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";

const ContentOptimizer: React.FC = () => {
    const [text, setText] = useState<string>("");
    const [targetKeyword, setTargetKeyword] = useState<string>("");

    // Live NLP Metrics Calculations
    const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
    const characterCount = text.length;

    // Calculate keyword density ratios safely
    const keywordOccurrences =
        targetKeyword.trim() && text
            ? (
                  text.match(
                      new RegExp(`\\b${targetKeyword.trim()}\\b`, "gi")
                  ) || []
              ).length
            : 0;
    const density =
        wordCount > 0
            ? ((keywordOccurrences / wordCount) * 100).toFixed(1)
            : "0.0";

    // Readability heuristics: check for long sentences (over 20 words)
    const longSentencesCount = text
        ? text
              .split(/[.!?]+/)
              .filter((sentence) => sentence.trim().split(/\s+/).length > 20)
              .length
        : 0;

    return (
        <DashboardLayout>
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        On-Page Content Optimizer
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Analyze your copy in real time to match search intent
                        and improve reading scores.
                    </p>
                </div>

                {/* Input Settings Deck */}
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-800">
                    <div className="max-w-md space-y-1">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            Target SEO Focus Keyword
                        </label>
                        <input
                            type="text"
                            value={targetKeyword}
                            onChange={(e) => setTargetKeyword(e.target.value)}
                            placeholder="e.g., full stack web developer"
                            className="w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-2 text-sm outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 dark:border-slate-700 dark:bg-slate-900"
                        />
                    </div>
                </div>

                {/* Two-Column Editor Layout Workspace */}
                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Main Content Workspace Input */}
                    <div className="lg:col-span-2">
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Paste or draft your article copy here to begin deep analytical evaluation..."
                            className="h-112.5 w-full resize-none rounded-xl border border-slate-200 bg-white p-5 text-base leading-relaxed outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 dark:border-slate-800 dark:bg-slate-800 font-sans"
                        />
                    </div>

                    {/* Real-Time Metrics Sidebar */}
                    <div className="space-y-6">
                        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-800">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">
                                Live Metrics
                            </h3>

                            <div className="space-y-4">
                                <div className="flex justify-between border-b border-slate-100 pb-3 dark:border-slate-700">
                                    <span className="text-sm text-slate-500 dark:text-slate-400">
                                        Total Words
                                    </span>
                                    <span className="font-mono text-sm font-bold">
                                        {wordCount}
                                    </span>
                                </div>
                                <div className="flex justify-between border-b border-slate-100 pb-3 dark:border-slate-700">
                                    <span className="text-sm text-slate-500 dark:text-slate-400">
                                        Characters
                                    </span>
                                    <span className="font-mono text-sm font-bold">
                                        {characterCount}
                                    </span>
                                </div>
                                <div className="flex justify-between border-b border-slate-100 pb-3 dark:border-slate-700">
                                    <span className="text-sm text-slate-500 dark:text-slate-400">
                                        Keyword Density
                                    </span>
                                    <span
                                        className={`font-mono text-sm font-bold ${
                                            Number(density) >= 1 &&
                                            Number(density) <= 2.5
                                                ? "text-green-500"
                                                : "text-yellow-500"
                                        }`}>
                                        {density}% ({keywordOccurrences}x)
                                    </span>
                                </div>
                                <div className="flex justify-between pb-1">
                                    <span className="text-sm text-slate-500 dark:text-slate-400">
                                        Long Sentences
                                    </span>
                                    <span
                                        className={`font-mono text-sm font-bold ${
                                            longSentencesCount > 2
                                                ? "text-red-400"
                                                : "text-slate-900 dark:text-white"
                                        }`}>
                                        {longSentencesCount}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Smart SEO Optimization Checklist Recommendation Box */}
                        <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-6 dark:border-slate-800 dark:bg-slate-800/50">
                            <h4 className="text-sm font-semibold mb-3">
                                Live Optimization Rules
                            </h4>
                            <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
                                <li className="flex items-center gap-2">
                                    <span
                                        className={
                                            wordCount >= 300
                                                ? "text-green-500"
                                                : "text-slate-300"
                                        }>
                                        ✓
                                    </span>
                                    Minimum 300 words required for deep search
                                    indexing.
                                </li>
                                <li className="flex items-center gap-2">
                                    <span
                                        className={
                                            Number(density) >= 1 &&
                                            Number(density) <= 2.5
                                                ? "text-green-500"
                                                : "text-slate-300"
                                        }>
                                        ✓
                                    </span>
                                    Maintain targeted focus keyword density
                                    between 1% and 2.5%.
                                </li>
                                <li className="flex items-center gap-2">
                                    <span
                                        className={
                                            longSentencesCount === 0 && text
                                                ? "text-green-500"
                                                : "text-slate-300"
                                        }>
                                        ✓
                                    </span>
                                    Break down long, wordy sentences to improve
                                    readability scores.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default ContentOptimizer;
