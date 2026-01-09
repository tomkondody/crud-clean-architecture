import axios, { type AxiosInstance } from 'axios';

// API Client configuration
export class ApiClient {
    private static instance: AxiosInstance;

    static getInstance(): AxiosInstance {
        if (!ApiClient.instance) {
            ApiClient.instance = axios.create({
                baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1',
                timeout: 10000,
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Request interceptor
            ApiClient.instance.interceptors.request.use(
                (config) => {
                    // You can add auth tokens here
                    return config;
                },
                (error) => {
                    return Promise.reject(error);
                }
            );

            // Response interceptor
            ApiClient.instance.interceptors.response.use(
                (response) => response,
                (error) => {
                    // Handle errors globally
                    console.error('API Error:', error);
                    return Promise.reject(error);
                }
            );
        }

        return ApiClient.instance;
    }
}
