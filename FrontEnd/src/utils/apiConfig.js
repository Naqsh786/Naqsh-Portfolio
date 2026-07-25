/**
 * Smart API Base URL Detection
 * Yeh code automatically check karega ke aap local pe hain ya live Vercel URL par.
 */
const getApiBaseUrl = () => {
    if (import.meta.env.VITE_API_URL) {
        return import.meta.env.VITE_API_URL.replace(/\/$/, "");
    }
    // Fallback for local development
    return "http://localhost:5000/api";
};

export const API_BASE_URL = getApiBaseUrl();
