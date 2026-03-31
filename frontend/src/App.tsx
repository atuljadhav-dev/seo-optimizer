import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/protectedRoute.jsx";
import SignIn from "./pages/auth/SignIn.js";
import SignUp from "./pages/auth/SignUp.js";

// Placeholder view elements for landing and dashboard pages
const HomePlaceholder = () => (
    <div className="p-8 text-center dark:text-white">
        <h1 className="text-3xl font-bold">SEO Optimizer Landing Page</h1>
        <a href="/signin" className="text-cyan-500 underline mt-4 inline-block">
            Go to Sign In
        </a>
    </div>
);

const DashboardPlaceholder = () => (
    <div className="p-8 text-center dark:text-white">
        <h1 className="text-3xl font-bold text-green-500">
            🔒 Secure SEO Dashboard
        </h1>
        <p className="mt-2 text-slate-400">
            Welcome to your metrics console panel.
        </p>
        <button
            onClick={() => {
                document.cookie =
                    "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                window.location.href = "/signin";
            }}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
            Log Out
        </button>
    </div>
);

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<HomePlaceholder />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />

                {/* Protected Dashboard Routes */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <DashboardPlaceholder />
                        </ProtectedRoute>
                    }
                />

                {/* Fallback Catch-All Redirect */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
