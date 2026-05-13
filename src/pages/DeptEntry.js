import { useEffect } from "react";
import { useParams, useLocation, useHistory } from "react-router-dom";
import { setAccessToken } from "../shared/api/apiClient";
import api from "../shared/api/apiClient";
import { API_URL } from "../platform/config/api.config";

/*
  Deep-link URL format:
    /React/dept/<department>?token=<jwt_access_token>

  Examples:
    /React/dept/audiology?token=eyJ...
    /React/dept/physiotherapy?token=eyJ...
    /React/dept/psychology?token=eyJ...

  Supported department slugs (case-insensitive):
    audiology, physiotherapy, occupational-therapy, psychology,
    optometry, nursing, dietetics, speech, prosthetics,
    vocational, doctor, medical-assistant
*/

/* slug → exact tab name used in Menu.js switch */
const SLUG_TO_TAB = {
  "audiology":           "Audiology",
  "physiotherapy":       "Physiotherapy",
  "occupational-therapy":"Occupational Therapy",
  "psychology":          "Psychology",
  "optometry":           "Optometry",
  "nursing":             "Nursing",
  "dietetics":           "Dietetics",
  "speech":              "Speech & Language Therapy",
  "prosthetics":         "Prosthetics & Orthotics",
  "vocational":          "Work & Vocational Rehab",
  "doctor":              "Doctor",
  "medical-assistant":   "Medical Assistant",
};

export default function DeptEntry() {
  const { department } = useParams();          // slug from URL
  const location       = useLocation();
  const history        = useHistory();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token  = params.get("token");

    if (!token) {
      // No token — go to login, preserve intended department
      history.replace("/", { intendedDept: department });
      return;
    }

    /* Set the token in memory so apiClient attaches it to all requests.
       The backend returns { access: { token, expire_at } } on login;
       here we only have the raw access token string, so we construct
       a minimal object that matches setAccessToken's expected shape. */
    setAccessToken({
      access: {
        token,
        expire_at: new Date(Date.now() + 60 * 60 * 1000).toISOString() // assume 1h if unknown
      }
    });

    /* Fetch user profile to get role + username */
    api.get(API_URL.ME)
      .then(res => {
        const user = res.data;
        localStorage.setItem("user",     JSON.stringify(user));
        localStorage.setItem("username", user.username?.trim() || "");
        localStorage.setItem("userRole", user.user_type || "");

        const tab = SLUG_TO_TAB[department?.toLowerCase()] || "";

        /* Push to /menu and pass the department tab via location state */
        history.replace("/menu", { initialTab: tab });
      })
      .catch(() => {
        /* Token invalid / expired — back to login */
        history.replace("/");
      });
  }, []);   // run once on mount

  return null; // renders nothing — pure redirect logic
}
