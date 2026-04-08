import axios from "axios";
import { BASE_API, API_URL } from "../../platform/config/api.config";

// Store the access token in memory for security reasons (not in localStorage/sessionStorage)
let accessToken = null;   
let refreshInterval = null;  // Set refresh interval for access token (e.g., every 5 minutes)

// Create an Axios instance with default settings
const api = axios.create({
  baseURL: BASE_API,
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

// Start automatic refresh of access token every 5 minutes 
export const startTokenRefresh = () => {
  refreshInterval = setInterval(() => {
    try{
      const res = api.post(
        BASE_API + API_URL.REFRESH,
        {},
        { withCredentials: true }
      )
      setAccessToken(res.data.access.access_token);
    }catch(err){
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
      startTokenRefresh();
    }
    return Promise.reject(error);
  }
);

export default api;
