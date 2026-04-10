import axios from "axios";
import { API_URL } from "../../platform/config/api.config";

let expireAt = null      // Set expire time to schedule refresh token
let accessToken = null;  // Store the access token in memory for security reasons.
let isRefreshing = false // Stop duplicate call check
let refreshInterval = null;  // Set refresh interval for access token (e.g., every 5 minutes)

// Create an Axios instance with default settings
const api = axios.create({
  withCredentials: true,
  headers: { "Content-Type": "application/json" }
});

// Set access token and expire at
export const setAccessToken = (data) => {
  accessToken = data.access.token;
  expireAt = data.access.expire_at
  startTokenRefresh(expireAt)
};

// Clear access token and expire at
export const clearAccessToken = () => {
  expireAt = null;
  accessToken = null;
  if (refreshInterval) {
    clearInterval(refreshInterval);
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
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
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
      refreshAccessToken();
    }
    return Promise.reject(error);
  }
);

export default api;
