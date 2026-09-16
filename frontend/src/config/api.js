// Centralized API Base URL configuration for Music Vibes Frontend
// In production (Vercel), set REACT_APP_API_URL in Vercel environment variables.
const API_BASE_URL = process.env.REACT_APP_API_URL
  ? process.env.REACT_APP_API_URL.replace(/\/$/, '')
  : 'http://localhost:5000';

export default API_BASE_URL;
export { API_BASE_URL };
