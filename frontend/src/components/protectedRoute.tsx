import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const token = Cookies.get("token");

    if (!token) {
        // Declaratively redirect to signin without triggering a full page reload
        return <Navigate to="/signin" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
