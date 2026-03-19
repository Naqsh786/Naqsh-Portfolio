/**
 * Smart API Base URL Detection
 * - Production: uses VITE_API_URL env variable (set on Vercel)
 * - Development: uses localhost
 */
const getApiBaseUrl = () => {
  let url = "";
  if (import.meta.env.PROD) {
    // Set VITE_API_URL in Vercel Frontend environment variables
    url = import.meta.env.VITE_API_URL || "https://naqsh-protfolio-b.vercel.app";
  } else {
    // Local development
    url = import.meta.env.VITE_API_URL || "http://localhost:7000";
  }

  // Sanitize: ensure no trailing slash
  return url.replace(/\/$/, "");
};

export const API_BASE_URL = getApiBaseUrl();

// Specific API endpoints
export const PROJECTS_API_URL = `${API_BASE_URL}/api/projects`;
export const AUTH_API_URL = `${API_BASE_URL}/api/auth`;
export const PROFILE_API_URL = `${API_BASE_URL}/api/profile`;
