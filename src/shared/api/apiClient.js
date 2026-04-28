import axios from "axios";
import { API_URL } from "../../platform/config/api.config";

let expireAt = null      // Set expire time to schedule refresh token
let accessToken = null;  // Store the access token in memory for security reasons.
let isRefreshing = false // Stop duplicate call check
let refreshInterval = null;  // Set refresh interval for access token (e.g., every 5 minutes)

// Rehydrate from localStorage on module load (handles page refresh)
const _storedToken  = localStorage.getItem("access_token");
const _storedExpiry = localStorage.getItem("access_token_expiry");
if (_storedToken && _storedExpiry && new Date(_storedExpiry) > new Date()) {
  accessToken = _storedToken;
  expireAt    = _storedExpiry;
}

// Create an Axios instance with default settings
const api = axios.create({
  withCredentials: true,
  headers: { "Content-Type": "application/json" }
});

// Set access token and expire at
export const setAccessToken = (data) => {
  accessToken = data.access.token;
  expireAt = data.access.expire_at;
  // Persist so the token survives a page refresh
  localStorage.setItem("access_token", data.access.token);
  localStorage.setItem("access_token_expiry", data.access.expire_at);
  startTokenRefresh(expireAt);
};

// Clear access token and expire at
export const clearAccessToken = () => {
  expireAt = null;
  accessToken = null;
  localStorage.removeItem("access_token");
  localStorage.removeItem("access_token_expiry");
  if (refreshInterval) {
    clearTimeout(refreshInterval);
  }
}

// Generate new access token using refresh token
const refreshAccessToken = () => {
  if(isRefreshing) return null; // Prevent duplicate calls
  
  isRefreshing = true
  try{
    api.post(
      API_URL.REFRESH,
      { withCredentials: true }
    ).then(res => {
        setAccessToken(res.data);
     })
  }catch(err){
    isRefreshing = false
    clearAccessToken();
    return Promise.reject(err);
  }
}

// Schedule refresh access token
const startTokenRefresh = (expireAt) => {
  if (refreshInterval) clearTimeout(refreshInterval)
    const currentTime = Date.now()
    const expiryTime = new Date(expireAt).getTime()  

    // Schedule 30 sec before expiry
    const scheduleTime = Math.max(expiryTime - currentTime - 30 * 1000, 0)

    refreshInterval = setTimeout(() => {
      refreshAccessToken()
    }, scheduleTime)
};


// Attach token automatically (if available)
api.interceptors.request.use(
  (config) => {
    // Use in-memory token first; fall back to localStorage (survives page refresh)
    const token = accessToken || localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


// Global response error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      isRefreshing = false
      refreshAccessToken();
    }
    return Promise.reject(error);
  }
);

export default api;
