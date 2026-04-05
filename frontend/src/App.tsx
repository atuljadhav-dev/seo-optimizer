import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/protectedRoute.jsx";
import SignIn from "./pages/auth/SignIn.js";
import SignUp from "./pages/auth/SignUp.js";
import Overview from "./pages/dashboard/overview.js";
import Keywords from "./pages/dashboard/Keywords.js";

// Placeholder view elements for landing and dashboard pages
const HomePlaceholder = () => (
    <div className="p-8 text-center dark:text-white">
        <h1 className="text-3xl font-bold">SEO Optimizer Landing Page</h1>
        <a href="/signin" className="text-cyan-500 underline mt-4 inline-block">
            Go to Sign In
        </a>
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
                            <Overview />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/dashboard/keywords"
                    element={
                        <ProtectedRoute>
                            <Keywords />
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
