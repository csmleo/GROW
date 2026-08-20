import axios from 'axios';
import { STORAGE_KEYS } from '../utils/authUtils';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

const isPublicAuthRequest = (url = '') =>
    url.includes('/auth/login') || url.includes('/auth/register');

api.interceptors.request.use((config) => {
    const token = localStorage.getItem(STORAGE_KEYS.token);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    // FormData must use multipart boundary set by the runtime
    if (typeof FormData !== 'undefined' && config.data instanceof FormData) {
        if (config.headers) {
            delete config.headers['Content-Type'];
            delete config.headers['content-type'];
        }
    }

    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status;
        const requestUrl = error.config?.url || '';

        if (status === 401 && !isPublicAuthRequest(requestUrl)) {
            localStorage.removeItem(STORAGE_KEYS.token);
            localStorage.removeItem(STORAGE_KEYS.user);
            window.dispatchEvent(new Event('auth:logout'));

            if (!window.location.pathname.startsWith('/login')) {
                window.location.assign('/login');
            }
        }

        return Promise.reject(error);
    }
);

export default api;
