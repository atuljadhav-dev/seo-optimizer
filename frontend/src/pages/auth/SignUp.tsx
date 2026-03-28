import React, { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import API from "../../services/api.js";
import axios from "axios";

export const SignUp: React.FC = () => {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await API.post("/auth/signup", {
                name,
                email,
                password,
            });

            Cookies.set("token", response.data.token, {
                expires: 30,
                secure: true,
                sameSite: "strict",
            });

            navigate("/dashboard");
        } catch (err) {
            if (axios.isAxiosError(err)) {
                const serverMessage = err.response?.data?.message;
                setError(serverMessage || "An unexpected error occurred.");
            } else {
                setError("An unexpected error occurred.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 text-slate-900 transition-colors duration-200 dark:bg-slate-900 dark:text-white">
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl ring-1 ring-slate-200 transition-colors duration-200 dark:bg-slate-800 dark:ring-slate-700">
                <div className="text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-cyan-600 dark:text-cyan-400">
                        Get Started
                    </h1>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                        Optimize your content with automated AI tools
                    </p>
                </div>

                {error && (
                    <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/30 dark:text-red-400">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                    <div className="space-y-1">
                        <label
                            htmlFor="name"
                            className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            Full Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full rounded-lg bg-slate-100 px-4 py-2.5 text-sm border border-slate-300 text-slate-900 placeholder-slate-400 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 dark:bg-slate-900 dark:border-slate-700 dark:text-white dark:placeholder-slate-500"
                            placeholder="Atul Jadhav"
                            disabled={loading}
                        />
                    </div>

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
                            disabled={loading}
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
                            minLength={6}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded-lg bg-slate-100 px-4 py-2.5 text-sm border border-slate-300 text-slate-900 placeholder-slate-400 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 dark:bg-slate-900 dark:border-slate-700 dark:text-white dark:placeholder-slate-500"
                            placeholder="At least 6 characters"
                            disabled={loading}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-cyan-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 dark:bg-cyan-500 dark:text-slate-900 dark:hover:bg-cyan-400 dark:focus:ring-offset-slate-800 disabled:opacity-50">
                        {loading ? "Creating Account..." : "Create Account"}
                    </button>
                </form>

                <p className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
                    Already have an account?{" "}
                    <a
                        href="/signin"
                        className="font-medium text-cyan-600 hover:underline dark:text-cyan-400">
                        Log in
                    </a>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
