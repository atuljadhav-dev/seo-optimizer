import React, { useState, useEffect } from "react";
import api from "../../services/api";
import DashboardLayout from "../../layouts/DashboardLayout";

interface SerpData {
    _id: string;
    keyword: string;
    rank: number;
    targetUrl: string;
    checkedAt: string;
}

const SerpTracker: React.FC = () => {
    const [metrics, setMetrics] = useState<SerpData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        api.get("/serp")
            .then((res) => {
                if (res.data.success) setMetrics(res.data.data);
            })
            .catch((err) => console.error("SERP fetch error:", err))
            .finally(() => setLoading(false));
    }, []);

    if (loading)
        return (
            <div className="p-6 text-gray-400">
                Loading tracking engine data...
            </div>
        );

    return (
        <DashboardLayout>
            <div className="p-6 bg-slate-900 rounded-xl border border-slate-800">
                <h2 className="text-xl font-bold text-white mb-4">
                    Target SERP Rankings
                </h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-300">
                        <thead className="bg-slate-800 text-slate-400 uppercase text-xs">
                            <tr>
                                <th className="p-3">Keyword</th>
                                <th className="p-3">Target Domain</th>
                                <th className="p-3">Position</th>
                                <th className="p-3">Timestamp</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {metrics.map((item) => (
                                <tr
                                    key={item._id}
                                    className="hover:bg-slate-800/50 transition">
                                    <td className="p-3 font-medium text-white">
                                        {item.keyword}
                                    </td>
                                    <td className="p-3 text-slate-400">
                                        {item.targetUrl}
                                    </td>
                                    <td className="p-3">
                                        <span
                                            className={`px-2 py-1 rounded text-xs font-semibold ${
                                                item.rank <= 3
                                                    ? "bg-emerald-500/20 text-emerald-400"
                                                    : "bg-amber-500/20 text-amber-400"
                                            }`}>
                                            #{item.rank}
                                        </span>
                                    </td>
                                    <td className="p-3 text-xs text-slate-500">
                                        {new Date(
                                            item.checkedAt
                                        ).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </DashboardLayout>
    );
};
export default SerpTracker;
