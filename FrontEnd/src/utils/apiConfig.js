/**
 * Smart API Base URL Detection
 * Yeh code automatically check karega ke aap local pe hain ya live.
 */
const getApiBaseUrl = () => {
  const hostname = window.location.hostname;

  // 1. Check if we're on localhost or a local IP (for mobile testing)
  const isLocal = 
    hostname === "localhost" || 
    hostname === "127.0.0.1" || 
    /^(\d{1,3}\.){3}\d{1,3}$/.test(hostname); // Regex for IP addresses

  // 2. Priority: VITE_API_URL ENV variable
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL.replace(/\/$/, "");
  }

  // 3. Fallback for Local vs Production
  if (isLocal) {
    // Dynamically use the same hostname as the frontend for local testing
    return `http://${hostname}:7000`; 
  }

  // Production/Vercel Backend
  return "https://naqsh-protfolio-b.vercel.app".replace(/\/$/, "");
};

export const API_BASE_URL = getApiBaseUrl();

// Specific API endpoints
export const PROJECTS_API_URL = `${API_BASE_URL}/api/projects`;
export const AUTH_API_URL = `${API_BASE_URL}/api/auth`;
export const PROFILE_API_URL = `${API_BASE_URL}/api/profile`;
