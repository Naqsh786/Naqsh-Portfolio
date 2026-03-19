/**
 * Smart API Base URL Detection
 * Yeh code automatically check karega ke aap local pe hain ya live.
 */
const getApiBaseUrl = () => {
  // 1. Check if we're on localhost for local development
  const isLocalhost = 
    window.location.hostname === "localhost" || 
    window.location.hostname === "127.0.0.1";

  // 2. Priority: VITE_API_URL ENV variable
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL.replace(/\/$/, "");
  }

  // 3. Fallback for Local vs Production
  if (isLocalhost) {
    return "http://localhost:7000"; // Local Backend
  }

  // Production/Vercel Backend
  return "https://naqsh-protfolio-b.vercel.app".replace(/\/$/, "");
};

export const API_BASE_URL = getApiBaseUrl();

// Specific API endpoints
export const PROJECTS_API_URL = `${API_BASE_URL}/api/projects`;
export const AUTH_API_URL = `${API_BASE_URL}/api/auth`;
export const PROFILE_API_URL = `${API_BASE_URL}/api/profile`;
