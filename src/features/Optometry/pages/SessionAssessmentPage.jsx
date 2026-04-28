import React, { useEffect, useState } from "react";
import { useParams, useLocation, useHistory } from "react-router-dom";
import api, { setAccessToken } from "../../../shared/api/apiClient";
import { API_URL } from "../../../platform/config/api.config";
import OptometryAssessment from "../components/OptometryAssessment";
import SidebarNav from "../../../components/SidebarNav";
import TopToolbar from "../../../components/TopToolbar";
import StyleBlock from "../../../components/StyleBlock";
import { ShimmerForm } from "../../../shared/ui/Shimmer";

/**
 * SSO Direct-link: /optometry/assessment/:sessionId?token=<jwt>
 *
 * Flow:
 *  1. Extract ?token from URL → call setAccessToken (authenticates the recipient)
 *  2. Fetch /user/me to populate localStorage (username, userRole)
 *  3. Fetch the Assessment session by ID
 *  4. Auto-fetch patient from session.patient
 *  5. Render full app shell + OptometryAssessment pre-loaded
 *
 * If no token in URL, uses existing localStorage token (already logged-in user).
 */
export default function SessionAssessmentPage() {
  const { sessionId }       = useParams();
  const location            = useLocation();
  const history             = useHistory();

  const [session,         setSession]         = useState(null);
  const [patient,         setPatient]         = useState(null);
  const [error,           setError]           = useState(null);
  const [loading,         setLoading]         = useState(true);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const [username, setUsername] = useState(localStorage.getItem("username") || "");

  useEffect(() => {
    if (!sessionId) {
      setError("No session ID in URL.");
      setLoading(false);
      return;
    }

    const params = new URLSearchParams(location.search);
    const token  = params.get("token");

    // Step 1 — if token in URL, authenticate the recipient (SSO)
    const authReady = token
      ? (() => {
          setAccessToken({
            access: {
              token,
              expire_at: new Date(Date.now() + 60 * 60 * 1000).toISOString()
            }
          });
          // Fetch profile to populate localStorage
          return api.get(API_URL.ME).then(res => {
            const user = res.data;
            localStorage.setItem("user",     JSON.stringify(user));
            localStorage.setItem("username", user.username?.trim() || "");
            localStorage.setItem("userRole", user.user_type || "");
            setUsername(user.username?.trim() || "");
          });
        })()
      : Promise.resolve();   // already authenticated — skip

    // Step 2 — fetch session + patient after auth is ready
    authReady
      .then(() => api.get(API_URL.ASSESSMENT + `session/${sessionId}/`))
      .then(res => {
        const sess = res.data;
        setSession(sess);

        const patientId = sess.patient;

        // Reflect patientId in URL (clean up token param too)
        history.replace(`/optometry/assessment/${sessionId}/${patientId}`);

        return api.get(API_URL.PATIENT + `?department=Optometry`).then(pr => {
          const found = (pr.data.results || []).find(p => p.id === patientId);
          setPatient(found || { id: patientId });
        });
      })
      .catch(err => {
        const status = err?.response?.status;
        setError(
          status === 401
            ? "Authentication failed. The token may be invalid or expired."
            : status === 404
            ? `Session "${sessionId}" not found.`
            : "Failed to load session. Check your connection."
        );
      })
      .finally(() => setLoading(false));
  }, [sessionId]);   // run once on mount

  const handleBack = () => history.push("/menu/optometry");

  return (
    <>
      <StyleBlock />
      <div className="page">

        {/* ── Sidebar ── */}
        <SidebarNav
          tab="Optometry"
          setTab={t => history.push(`/menu/${t.toLowerCase().replace(/ /g, "-")}`)}
          rapPercent={0}
          username={username}
        />

        {/* ── Main ── */}
        <main className="main">
          <TopToolbar
            showProfileMenu={showProfileMenu}
            toggleProfileMenu={() => setShowProfileMenu(p => !p)}
            onBook={() => {}}
            onOrder={() => {}}
            onSaveAll={() => {}}
          />

          {/* Loading */}
          {loading && (
            <div style={{ padding: 32, maxWidth: 640, margin: "0 auto" }}>
              <ShimmerForm rows={8} />
              <p style={{ textAlign: "center", color: "#64748b", fontSize: 13, marginTop: 16 }}>
                Loading session…
              </p>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div style={S.errorCard}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>⚠️</div>
              <div style={S.errorTitle}>Unable to open session</div>
              <div style={S.errorMsg}>{error}</div>
              <code style={S.errorId}>{sessionId}</code>
              <br />
              <button style={S.backBtn} onClick={() => history.push("/")}>
                Go to Login
              </button>
            </div>
          )}

          {/* Assessment */}
          {!loading && !error && session && patient && (
            <OptometryAssessment
              patient={patient}
              mode={session.visit_type === "FOLLOW_UP" ? "followup" : "initial"}
              initialSessionId={sessionId}
              initialAssessmentIds={session.assessment_ids || []}
              onBack={handleBack}
            />
          )}
        </main>
      </div>
    </>
  );
}

const S = {
  errorCard: {
    margin: "48px auto", maxWidth: 460,
    background: "#fff", borderRadius: 14,
    border: "1px solid #fecaca", padding: "36px 40px",
    textAlign: "center", boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
    fontFamily: "'Inter', system-ui, sans-serif",
  },
  errorTitle: { fontSize: 18, fontWeight: 700, color: "#0f172a", marginBottom: 8 },
  errorMsg:   { fontSize: 14, color: "#64748b", marginBottom: 8, lineHeight: 1.6 },
  errorId:    { fontSize: 12, color: "#94a3b8", display: "block", marginBottom: 20 },
  backBtn: {
    padding: "9px 22px", borderRadius: 8, background: "#2563eb",
    color: "#fff", border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer",
  },
};
