import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import api from "../../../shared/api/apiClient";
import { API_URL } from "../../../platform/config/api.config";
import OptometryAssessment from "../components/OptometryAssessment";
import SidebarNav from "../../../components/SidebarNav";
import TopToolbar from "../../../components/TopToolbar";
import StyleBlock from "../../../components/StyleBlock";
import { ShimmerForm } from "../../../shared/ui/Shimmer";

/**
 * Direct-link: /optometry/assessment/:sessionId
 *
 * 1. Fetches the Assessment session by ID
 * 2. Uses session.patient to fetch the patient record automatically
 * 3. Renders the full app shell + OptometryAssessment pre-loaded
 */
export default function SessionAssessmentPage() {
  const { sessionId, patientId: patientIdFromUrl } = useParams();
  const history             = useHistory();

  const [session,         setSession]         = useState(null);
  const [patient,         setPatient]         = useState(null);
  const [error,           setError]           = useState(null);
  const [loading,         setLoading]         = useState(true);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const username = localStorage.getItem("username") || "";

  useEffect(() => {
    if (!sessionId) {
      setError("No session ID in URL.");
      setLoading(false);
      return;
    }

    // Step 1 — fetch the session
    api.get(API_URL.ASSESSMENT + `session/${sessionId}/`)
      .then(res => {
        const sess = res.data;
        setSession(sess);

        const patientId = sess.patient;

        // Push patientId into URL if not already there
        if (!patientIdFromUrl && patientId) {
          history.replace(`/optometry/assessment/${sessionId}/${patientId}`);
        }

        // Step 2 — fetch the patient record
        return api.get(API_URL.PATIENT + `?department=Optometry`)
          .then(pr => {
            const found = (pr.data.results || []).find(p => p.id === patientId);
            setPatient(found || { id: patientId });
          });
      })
      .catch(err => {
        setError(
          err?.response?.status === 404
            ? `Session "${sessionId}" not found.`
            : "Failed to load session. Check your connection or re-login."
        );
      })
      .finally(() => setLoading(false));
  }, [sessionId]);

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
                Loading session <code>{sessionId}</code>…
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
              <button style={S.backBtn} onClick={handleBack}>← Back to Optometry</button>
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
