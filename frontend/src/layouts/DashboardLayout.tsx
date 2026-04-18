import React, { type ReactNode } from "react";
import { useNavigate, NavLink } from "react-router-dom"; // 1. Swap in NavLink
import Cookies from "js-cookie";
import AIAssistant from "../components/AIAssistant";

interface DashboardLayoutProps {
    children: ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
    children,
}) => {
    const navigate = useNavigate();

    const handleSignOut = () => {
        Cookies.remove("token", { path: "/" });
        navigate("/signin");
    };

    const navLinkClass = ({ isActive }: { isActive: boolean }) =>
        `flex items-center space-x-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
            isActive
                ? "bg-cyan-50 text-cyan-600 dark:bg-cyan-950/40 dark:text-cyan-400"
                : "text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800/50"
        }`;

    return (
        <div className="flex h-screen w-full overflow-hidden bg-slate-50 transition-colors duration-200 dark:bg-slate-900 text-slate-900 dark:text-white">
            <aside className="hidden md:flex w-64 flex-col border-r border-slate-200 bg-white p-5 transition-colors duration-200 dark:border-slate-800 dark:bg-slate-800">
                <div className="flex items-center space-x-2 pb-6 border-b border-slate-100 dark:border-slate-700">
                    <div className="h-8 w-8 rounded-lg bg-cyan-500 flex items-center justify-center font-bold text-slate-950">
                        S
                    </div>
                    <span className="text-xl font-bold tracking-tight text-cyan-600 dark:text-cyan-400">
                        SEO Optimizer
                    </span>
                </div>

                <nav className="mt-6 flex-1 space-y-2">
                    <NavLink to="/dashboard" end className={navLinkClass}>
                        <span>📊 Overview Matrix</span>
                    </NavLink>
                    <NavLink to="/dashboard/keywords" className={navLinkClass}>
                        <span>🔑 Keywords</span>
                    </NavLink>
                    <NavLink to="/dashboard/content" className={navLinkClass}>
                        <span>📝 Content Optimizer</span>
                    </NavLink>
                    <NavLink to="/dashboard/outreach" className={navLinkClass}>
                        <span>🤝 Outreach Pipelines</span>
                    </NavLink>
                </nav>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-700">
                    <button
                        onClick={handleSignOut}
                        className="w-full flex items-center space-x-3 rounded-lg px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/20 transition-all">
                        <span>🚪 Close Session</span>
                    </button>
                </div>
            </aside>

            <div className="flex flex-1 flex-col overflow-hidden">
                <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6 transition-colors duration-200 dark:border-slate-800 dark:bg-slate-800">
                    <h2 className="text-lg font-semibold tracking-tight">
                        Performance Workspace
                    </h2>
                    <div className="flex items-center space-x-4">
                        <span className="text-xs bg-cyan-100 text-cyan-800 dark:bg-cyan-950/50 dark:text-cyan-300 px-2.5 py-1 rounded-full font-medium">
                            Production Environment
                        </span>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-6 md:p-8">
                    <div className="mx-auto max-w-7xl">{children}</div>
                </main>
            </div>

            <AIAssistant />
        </div>
    );
};

export default DashboardLayout;
