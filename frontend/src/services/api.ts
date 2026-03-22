import axios from "axios";
import Cookies from "js-cookie";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5002/api",
    headers: {
        "Content-Type": "application/json",
    },
});

// Interceptor automatically pulls the token from cookies for every outgoing request
API.interceptors.request.use((config) => {
    const token = Cookies.get("token");
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default API;
