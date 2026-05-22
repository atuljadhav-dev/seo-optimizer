import React, { useState, useEffect, type FormEvent } from "react";
import axios from "axios";
import API from "../../services/api.js";
import DashboardLayout from "../../layouts/DashboardLayout.js";

interface Campaign {
    _id?: string;
    targetDomain: string;
    contactEmail: string;
    category:
        | "Guest Post"
        | "Resource Page"
        | "PR Outreach"
        | "Broken Link"
        | string;
    status: "Pending" | "Contacted" | "Acquired" | "Rejected";
}

const EmailOutreach: React.FC = () => {
    const [targetDomain, setTargetDomain] = useState<string>("");
    const [contactEmail, setContactEmail] = useState<string>("");
    const [category, setCategory] = useState<string>("Guest Post");
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const fetchPipelines = async () => {
            try {
                const response = await API.get("/outreach");
                setCampaigns(response.data);
            } catch (err) {
                console.error("Failed to load outreach pipelines:", err);
            }
        };
        fetchPipelines();
    }, []);

    const handleAddCampaignSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const response = await API.post("/outreach", {
                targetDomain,
                contactEmail,
                category,
            });
            setCampaigns((prev) => [response.data, ...prev]);
            setTargetDomain("");
            setContactEmail("");
        } catch (err) {
            if (axios.isAxiosError(err) && err.response?.data?.message) {
                setError(err.response.data.message);
            } else {
                setError(
                    "Failed to record the outreach profile inside the database."
                );
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
                        Off-Page Outreach & Backlinks
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Manage your link-building pipelines, monitor domain
                        relationships, and track email campaign conversions.
                    </p>
                </div>

                {error && (
                    <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/30 dark:text-red-400">
                        {error}
                    </div>
                )}

                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-800">
                    <h3 className="text-sm font-semibold mb-4 text-slate-700 dark:text-slate-300">
                        Add New Outreach Pipeline
                    </h3>
                    <form
                        onSubmit={handleAddCampaignSubmit}
                        className="grid gap-4 sm:grid-cols-3 items-end">
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-slate-500">
                                Target Domain
                            </label>
                            <input
                                type="text"
                                required
                                disabled={loading}
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
                                disabled={loading}
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
                                    disabled={loading}
                                    onChange={(e) =>
                                        setCategory(e.target.value)
                                    }
                                    className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-900">
                                    <option value="Guest Post">
                                        Guest Post
                                    </option>
                                    <option value="Resource Page">
                                        Resource Page
                                    </option>
                                    <option value="PR Outreach">
                                        PR Outreach
                                    </option>
                                    <option value="Broken Link">
                                        Broken Link
                                    </option>
                                </select>
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="rounded-lg bg-cyan-600 px-5 py-2 text-sm font-semibold text-white hover:bg-cyan-500 disabled:opacity-50 dark:bg-cyan-50 dark:text-slate-950 dark:hover:bg-cyan-400 transition-colors">
                                {loading ? "Saving..." : "Track"}
                            </button>
                        </div>
                    </form>
                </div>

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
                                {campaigns.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={4}
                                            className="px-6 py-8 text-center text-slate-400 bg-white dark:bg-slate-800">
                                            No outreach links recorded yet.
                                        </td>
                                    </tr>
                                ) : (
                                    campaigns.map((item) => (
                                        <tr
                                            key={item._id || item.targetDomain}
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
                                                        item.status ===
                                                        "Acquired"
                                                            ? "bg-green-100 text-green-800 dark:bg-green-950/40 dark:text-green-400"
                                                            : item.status ===
                                                              "Contacted"
                                                            ? "bg-blue-100 text-blue-800 dark:bg-blue-950/40 dark:text-blue-400"
                                                            : item.status ===
                                                              "Rejected"
                                                            ? "bg-red-100 text-red-800 dark:bg-red-950/40 dark:text-red-400"
                                                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-950/40 dark:text-yellow-400"
                                                    }`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default EmailOutreach;
