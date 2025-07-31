"use client";
import { apiBaseUrl } from "@/config/config";
import axios from "axios";


const axiosClient = axios.create({
    baseURL: apiBaseUrl,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
});


axiosClient.interceptors.request.use((config) => {
    const token =
        typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

    if (token) {
        config.headers = config.headers ?? {};
        config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
});

// Response interceptor for token refresh
axiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response?.status === 403 &&
            !originalRequest._retry &&
            !originalRequest.url.includes("/refresh")
        ) {
            originalRequest._retry = true;

            try {
                const res = await axiosClient.post<{ accessToken: string }>("/refresh");
                const newAccessToken = res?.data?.accessToken;

                if (newAccessToken) {
                    localStorage.setItem("accessToken", newAccessToken);
                    originalRequest.headers = originalRequest.headers ?? {};
                    originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
                    return axiosClient(originalRequest);
                }
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosClient;
