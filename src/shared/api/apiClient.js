import axios from "axios";
import { API_URL } from "../../platform/config/api.config";

// Store the access token in memory for security reasons (not in localStorage/sessionStorage)
let accessToken = null;   
let refreshInterval = null;  // Set refresh interval for access token (e.g., every 5 minutes)

// Create an Axios instance with default settings
const api = axios.create({
  withCredentials: true,
  headers: { "Content-Type": "application/json" }
});

// Function to set the access token after login
export const setAccessToken = (token) => {
  accessToken = token;
};

// Function to clear the access token and refresh interval on logout
export const clearAccessToken = () => {
  accessToken = null;
  if (refreshInterval) {
    clearInterval(refreshInterval);
  }
}

// Generate new access token using refresh token
const refreshAccessToken = () => {
  try{
    api.post(
      API_URL.REFRESH,
      { withCredentials: true }
    ).then(res => {
        setAccessToken(res.data.access.token);
     })
  }catch(err){
    return Promise.reject(err);
  }
}

// Start automatic refresh of access token every 5 minutes 
export const startTokenRefresh = () => {
  refreshInterval = setInterval( async () => {
    try {
      refreshAccessToken();
    } catch (err) {
      clearInterval(refreshInterval);
    }    
  }, 4.5 * 60 * 1000)
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
