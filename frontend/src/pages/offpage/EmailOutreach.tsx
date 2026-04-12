import React, { useState } from "react";
import { DashboardLayout } from "../../layouts/DashboardLayout.js";

interface Campaign {
    targetDomain: string;
    contactEmail: string;
    status: "Pending" | "Contacted" | "Acquired" | "Rejected";
    category: string;
}

const EmailOutreach: React.FC = () => {
    const [targetDomain, setTargetDomain] = useState("");
    const [contactEmail, setContactEmail] = useState("");
    const [category, setCategory] = useState("Guest Post");
    const [campaigns, setCampaigns] = useState<Campaign[]>([
        {
            targetDomain: "techcrunch.com",
            contactEmail: "editor@techcrunch.com",
            status: "Contacted",
            category: "PR Outreach",
        },
        {
            targetDomain: "dev.to",
            contactEmail: "backlinks@dev.to",
            status: "Acquired",
            category: "Guest Post",
        },
        {
            targetDomain: "medium.com",
            contactEmail: "partner@medium.com",
            status: "Pending",
            category: "Resource Page",
        },
    ]);

    const handleAddCampaign = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newCampaign: Campaign = {
            targetDomain: targetDomain.replace(/^(https?:\/\/)?(www\.)?/, ""),
            contactEmail,
            category,
            status: "Pending",
        };
        setCampaigns([newCampaign, ...campaigns]);
        setTargetDomain("");
        setContactEmail("");
    };

    return (
        <DashboardLayout>
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Off-Page Outreach & Backlinks
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Manage your link-building pipelines, monitor domain
                        relationships, and track email campaign conversions.
                    </p>
                </div>

                {/* Campaign Adder Form */}
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-800">
                    <h3 className="text-sm font-semibold mb-4 text-slate-700 dark:text-slate-300">
                        Add New Outreach Pipeline
                    </h3>
                    <form
                        onSubmit={handleAddCampaign}
                        className="grid gap-4 sm:grid-cols-3 items-end">
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-slate-500">
                                Target Domain
                            </label>
                            <input
                                type="text"
                                required
                                value={targetDomain}
                                onChange={(e) =>
                                    setTargetDomain(e.target.value)
                                }
                                placeholder="e.g., github.com"
                                className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 dark:border-slate-700 dark:bg-slate-900"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-slate-500">
                                Contact Email
                            </label>
                            <input
                                type="email"
                                required
                                value={contactEmail}
                                onChange={(e) =>
                                    setContactEmail(e.target.value)
                                }
                                placeholder="e.g., outreach@github.com"
                                className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 dark:border-slate-700 dark:bg-slate-900"
                            />
                        </div>
                        <div className="flex gap-2">
                            <div className="flex-1 space-y-1">
                                <label className="text-xs font-medium text-slate-500">
                                    Type
                                </label>
                                <select
                                    value={category}
                                    onChange={(e) =>
                                        setCategory(e.target.value)
                                    }
                                    className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-900">
                                    <option>Guest Post</option>
                                    <option>Resource Page</option>
                                    <option>PR Outreach</option>
                                    <option>Broken Link</option>
                                </select>
                            </div>
                            <button
                                type="submit"
                                className="rounded-lg bg-cyan-600 px-5 py-2 text-sm font-semibold text-white hover:bg-cyan-500 dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400 transition-colors">
                                Track
                            </button>
                        </div>
                    </form>
                </div>

                {/* Live Pipelines Tracking Dashboard Table */}
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-800">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm border-collapse">
                            <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-500 dark:bg-slate-900/50 dark:text-slate-400">
                                <tr>
                                    <th className="px-6 py-4">
                                        Target Website
                                    </th>
                                    <th className="px-6 py-4">Contact</th>
                                    <th className="px-6 py-4">Category</th>
                                    <th className="px-6 py-4">
                                        Pipeline Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                                {campaigns.map((item, idx) => (
                                    <tr
                                        key={idx}
                                        className="hover:bg-slate-50/50 dark:hover:bg-slate-900/20 transition-colors">
                                        <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                                            {item.targetDomain}
                                        </td>
                                        <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                                            {item.contactEmail}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-xs bg-slate-100 dark:bg-slate-700 px-2.5 py-1 rounded-md font-medium">
                                                {item.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                                                    item.status === "Acquired"
                                                        ? "bg-green-100 text-green-800 dark:bg-green-950/40 dark:text-green-400"
                                                        : item.status ===
                                                          "Contacted"
                                                        ? "bg-blue-100 text-blue-800 dark:bg-blue-950/40 dark:text-blue-400"
                                                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-950/40 dark:text-yellow-400"
                                                }`}>
                                                {item.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default EmailOutreach;
