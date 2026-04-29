import { useEffect } from "react";
import { SSO_TOKEN, SSO_TOKEN_EXPIRY } from "../../platform/config/auth.config";
import { setAccessToken } from "../api/apiClient";
import api from "../api/apiClient";
import { API_URL } from "../../platform/config/api.config";

/**
 * SSOProvider
 *
 * Runs once on app load. If SSO_TOKEN is set in auth.config.js,
 * it authenticates the user automatically — no login required.
 *
 * Just wrap your app with this component.
 */
export default function SSOProvider({ children }) {
  useEffect(() => {
    if (!SSO_TOKEN) return;  // no token configured — normal login flow

    // Already authenticated with this token — skip
    const existing = localStorage.getItem("access_token");
    if (existing === SSO_TOKEN) return;

    // Set the token
    setAccessToken({
      access: {
        token: SSO_TOKEN,
        expire_at: SSO_TOKEN_EXPIRY || new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
      }
    });

    // Fetch user profile to populate localStorage
    api.get(API_URL.ME)
      .then(res => {
        const user = res.data;
        localStorage.setItem("user",     JSON.stringify(user));
        localStorage.setItem("username", user.username?.trim() || "");
        localStorage.setItem("userRole", user.user_type || "DOCTOR");
      })
      .catch(() => {
        // Token invalid — clear it so normal login shows
        localStorage.removeItem("access_token");
        localStorage.removeItem("access_token_expiry");
      });
  }, []);

  return children;
}
