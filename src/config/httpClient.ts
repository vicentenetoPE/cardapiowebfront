import axios from "axios";

export const httpClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:10000",
})


const authInterceptor = (config: any) => {
    const token = localStorage.getItem("authUser");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}

httpClient.interceptors.request.use(authInterceptor, (error) => {
    console.error("Error in request interceptor", error);
    return Promise.reject(error);
});
    