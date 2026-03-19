/**
 * Smart API Base URL Detection
 * Yeh code automatically check karega ke aap local pe hain ya live.
 */
const getApiBaseUrl = () => {
  // 1. Pehle check karega ke kya Vercel/Environment variable mein URL set hai?
  if (import.meta.env.VITE_API_URL) {
    // Automatically remove trailing slash if present
    return import.meta.env.VITE_API_URL.replace(/\/$/, "");
  }

  // 2. Agar variable nahi milta (Development mode), toh fallback URL:
  return "https://naqsh-protfolio-b.vercel.app".replace(/\/$/, "");
};

export const API_BASE_URL = getApiBaseUrl();

// Specific API endpoints
export const PROJECTS_API_URL = `${API_BASE_URL}/api/projects`;
export const AUTH_API_URL = `${API_BASE_URL}/api/auth`;
export const PROFILE_API_URL = `${API_BASE_URL}/api/profile`;
