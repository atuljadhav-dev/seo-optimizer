import React, { useState } from "react";

const SignIn: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Sign In Submission:", { email, password });
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 text-slate-900 transition-colors duration-200 dark:bg-slate-900 dark:text-white">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl ring-1 ring-slate-200 transition-colors duration-200 dark:bg-slate-800 dark:ring-slate-700">
                <div className="text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-cyan-600 dark:text-cyan-400">
                        Welcome Back
                    </h1>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                        Sign in to monitor your SEO performance
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div className="space-y-1">
                        <label
                            htmlFor="email"
                            className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded-lg bg-slate-100 px-4 py-2.5 text-sm border border-slate-300 text-slate-900 placeholder-slate-400 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 dark:bg-slate-900 dark:border-slate-700 dark:text-white dark:placeholder-slate-500"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div className="space-y-1">
                        <label
                            htmlFor="password"
                            className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded-lg bg-slate-100 px-4 py-2.5 text-sm border border-slate-300 text-slate-900 placeholder-slate-400 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 dark:bg-slate-900 dark:border-slate-700 dark:text-white dark:placeholder-slate-500"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-lg bg-cyan-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 dark:bg-cyan-500 dark:text-slate-900 dark:hover:bg-cyan-400 dark:focus:ring-offset-slate-800">
                        Sign In
                    </button>
                </form>

                <p className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
                    Don't have an account?{" "}
                    <a
                        href="/signup"
                        className="font-medium text-cyan-600 hover:underline dark:text-cyan-400">
                        Create one
                    </a>
                </p>
            </div>
        </div>
    );
};

export default SignIn;
