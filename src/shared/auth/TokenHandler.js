import { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { setAccessToken } from "../api/apiClient";
import api from "../api/apiClient";
import { API_URL } from "../../platform/config/api.config";

/**
 * TokenHandler
 *
 * Runs on every route. If ?token=<jwt> is present in the URL:
 *   1. Authenticates the user with that token
 *   2. Fetches their profile and stores in localStorage
 *   3. Strips ?token= from the URL (clean URL after login)
 *   4. Stays on the same page — no redirect needed
 *
 * Usage examples:
 *   https://www.tps-ind.com/menu/optometry?token=eyJ...
 *   https://www.tps-ind.com/Doctor?token=eyJ...
 *   https://www.tps-ind.com?token=eyJ...
 */
export default function TokenHandler() {
  const location = useLocation();
  const history  = useHistory();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token  = params.get("token");

    if (!token) return;  // no token in URL — nothing to do

    // 1. Set the token immediately so all subsequent API calls are authenticated
    setAccessToken({
      access: {
        token,
        expire_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()  // assume 24h
      }
    });

    // 2. Strip ?token= from the URL right away (keep other params if any)
    params.delete("token");
    const cleanSearch = params.toString() ? `?${params.toString()}` : "";
    history.replace({ pathname: location.pathname, search: cleanSearch });

    // 3. Fetch user profile to populate localStorage
    api.get(API_URL.ME)
      .then(res => {
        const user = res.data;
        localStorage.setItem("user",     JSON.stringify(user));
        localStorage.setItem("username", user.username?.trim() || "");
        localStorage.setItem("userRole", user.user_type || "DOCTOR");
      })
      .catch(() => {
        // Token invalid — clear it
        localStorage.removeItem("access_token");
        localStorage.removeItem("access_token_expiry");
        history.replace("/");  // back to login
      });

  }, [location.search]);  // re-run if query string changes

  return null;  // renders nothing
}
