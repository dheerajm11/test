import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL || "/api";
console.log("API Base URL:", baseUrl);

const api = axios.create({
    baseURL: baseUrl,
});

api.interceptors.request.use(
    (config) => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (userInfo && userInfo.token) {
            config.headers.Authorization = `Bearer ${userInfo.token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
