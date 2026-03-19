/**
 * Smart API Base URL Detection
 * - Production: uses VITE_API_URL env variable (set on Vercel)
 * - Development: uses localhost
 */
const getApiBaseUrl = () => {
  if (import.meta.env.PROD) {
    // Set VITE_API_URL in Vercel Frontend environment variables
    return import.meta.env.VITE_API_URL || "https://naqsh-protfolio-b.vercel.app";
  }

  // Local development
  return import.meta.env.VITE_API_URL || "http://localhost:7000";
};

export const API_BASE_URL = getApiBaseUrl();

// Specific API endpoints
export const PROJECTS_API_URL = `${API_BASE_URL}/api/projects`;
export const AUTH_API_URL = `${API_BASE_URL}/api/auth`;
export const PROFILE_API_URL = `${API_BASE_URL}/api/profile`;
