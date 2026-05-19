import Assessment from "./assessment";
import api from "../../shared/api/apiClient";
import EmptyState from "../../shared/ui/EmptyState";
import { ShimmerRow } from "../../shared/ui/Shimmer";
import { API_URL } from "../../platform/config/api.config";
import React, { useEffect, useMemo, useState } from "react";


const ASSESSMENT_GRID_COLUMNS = "1.5fr 1.2fr 1.2fr 1.2fr 1.2fr 1.2fr 1.2fr 1.2fr";


function formatDate(value, { includeTime = false } = {}) {
    if (value == null || value === "") {
        return "—";
    }
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) {
        return String(value);
    }
    if (includeTime) {
        return d.toLocaleString('en-IN', {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
        });
    }

    return d.toLocaleDateString('en-IN', {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
}

function SessionRow({ sessionData, idx, onView }) {
    const [hovered, setHovered] = useState(false);
    const dateCellStyle = {
        fontSize: 12,
        fontWeight: 600,
        overflow: "hidden",
        color: "#6B7280",
        lineHeight: 1.4,
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
    };

    return (
        <div
            style={{
                padding: "18px 24px",
                display: "grid",
                gridTemplateColumns:
                    ASSESSMENT_GRID_COLUMNS,
                alignItems: "center",
                borderBottom: "1px solid #F1F5F9",
                background: hovered
                    ? "#F8FAFF"
                    : idx % 2 === 0
                        ? "#fff"
                        : "#FAFBFC",
                transition: "background .15s",
                fontSize: 10,
                fontWeight: 500,
                letterSpacing: "0.18em",
            }}
            onClick={() => onView?.(sessionData)}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    minWidth: 0,
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        minWidth: 0,
                    }}
                >
                    {/* Copy Icon */}
                    <button
                        type="button"
                        title="Copy Session ID"
                        onClick={(e) => {
                            e.stopPropagation();

                            navigator.clipboard.writeText(
                                String(sessionData.id || "")
                            );
                        }}
                        style={{
                            border: "none",
                            background: "transparent",
                            padding: 0,
                            margin: 0,
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                        }}
                    >
                        <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                d="M8 8V5C8 3.89543 8.89543 3 10 3H19C20.1046 3 21 3.89543 21 5V14C21 15.1046 20.1046 16 19 16H16"
                                stroke="#64748B"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <rect
                                x="3"
                                y="8"
                                width="13"
                                height="13"
                                rx="2"
                                stroke="#64748B"
                                strokeWidth="2"
                            />
                        </svg>
                    </button>

                    {/* Short UUID */}
                    <div
                        title={sessionData.id}
                        style={{
                            fontSize: 12,
                            fontWeight: 700,
                            color: hovered
                            ? "#1D4ED8"
                            : "#2563EB",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            minWidth: 0,
                            textDecoration: hovered
                            ? "underline"
                            : "none",
                            cursor: 'pointer'
                        }}
                    >
                        {sessionData.id
                            ? `${String(sessionData.id).slice(0, 8)}...`
                            : "—"}
                    </div>
                </div>
            </div>

            <div style={dateCellStyle}>
                {sessionData.visit_type}
            </div>
            <div style={dateCellStyle}>
                {sessionData?.department || '-'}
            </div>
            <div style={dateCellStyle}>
                {sessionData.is_completed ? 'Yes' : 'No'}
            </div>
            <div style={dateCellStyle}>
                {sessionData?.duration || '-'}
            </div>
            <div style={dateCellStyle}>
                {sessionData?.total_score || 0}
            </div>
            <div style={dateCellStyle}>
                {sessionData?.progress_percentage || 0}
            </div>
            <div style={{
                fontSize: 12,
                fontWeight: 600,
                color: "#6B7280",
                lineHeight: 1.4,
                whiteSpace: "nowrap",
                overflow: "visible",
            }}>
                {formatDate(sessionData.updated_at, { includeTime: true })}
            </div>
        </div>
    );
}

export default function SOAPSession({
    patient,
    onBack,
}) {
    const [search, setSearch] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [sessionData, setSessionData] = useState([]);
    const [selectedSession, setSelectedSession] = useState(null);

    useEffect(() => {
        if (!patient?.id) {
            setLoading(false);
            setSessionData([]);
            setError("Patient data is missing.");
            return;
        }

        const fetchSessions = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await api.get(
                    API_URL.patientAssessments(patient.id)
                );

                setSessionData(
                    response?.data?.results || []
                );
            } catch (e) {
                setSessionData([]);
                setError(
                    "Failed to load SOAP sessions for this patient."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchSessions();
    }, [patient]);

    const filtered = useMemo(() => {
        const q = search.trim().toLowerCase();
        if (!q) {
            return sessionData;
        }

        return sessionData.filter((a) => {
            return (
                String(a.id || '-').includes(q) ||
                String(a.visit_type || '-').includes(q) ||
                String(a.department || '-').includes(q) ||
                String(a.is_completed || '').includes(q) ||
                String(a.duration || '-').includes(q) ||
                String(a.total_score || 0).includes(q) ||
                String(a.progress_percentage || 0).includes(q) ||
                String(formatDate(
                    a.updated_at, { includeTime: true }).toLowerCase()|| '-'
                ).includes(q) 
            );
        });
    }, [sessionData, search]);

    if (selectedSession) {
        return (
            <Assessment
                sessionData={selectedSession}
                onBack={() => setSelectedSession(null)}d
            />
        )
    }

    return (
        <div
            style={{
                padding: "28px 28px 32px",
                minHeight: "100vh",
                fontFamily:
                    "Inter, Roboto, sans-serif",
            }}
        >
            {/* Header */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 20,
                    marginBottom: 20,
                    flexWrap: "wrap",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 16,
                    }}
                >
                    <button
                        type="button"
                        onClick={onBack}
                        className="dash-btn-outline"
                        style={{
                            padding: "8px 14px",
                            borderRadius: 999,
                            fontSize: 13,
                            fontWeight: 600,
                            cursor: "pointer",
                            boxShadow:
                                "0 8px 20px rgba(15,23,42,0.08)",
                        }}
                    >
                        ← Back
                    </button>

                    <div>
                        <h1
                            style={{
                                fontSize: 24,
                                fontWeight: 800,
                                color: "#0F172A",
                                margin: "0 0 4px 0",
                            }}
                        >
                            {patient?.name ||
                                patient?.email ||
                                "Patient"}
                        </h1>

                        <p
                            style={{
                                fontSize: 13,
                                color: "#475569",
                                margin: 0,
                            }}
                        >
                            SOAP Session
                            {patient?.id
                                ? ` · ID ${patient.id}`
                                : ""}
                        </p>
                    </div>
                </div>

                {/* Search */}
                <div
                    style={{
                        width: "100%",
                        maxWidth: 520,
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        background: "#fff",
                        border: "1px solid #D1D5DB",
                        borderRadius: 16,
                        boxShadow:
                            "0 10px 30px rgba(15,23,42,0.08)",
                    }}
                >
                    <svg
                        style={{
                            position: "absolute",
                            left: 16,
                            pointerEvents: "none",
                        }}
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                    >
                        <circle
                            cx="8"
                            cy="8"
                            r="6"
                            stroke="#64748B"
                            strokeWidth="1.8"
                        />
                        <path
                            d="M12.5 12.5l3 3"
                            stroke="#64748B"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                        />
                    </svg>

                    <input
                        style={{
                            width: "100%",
                            padding: "12px 44px",
                            border: "none",
                            borderRadius: 16,
                            fontSize: 13,
                            fontWeight: 500,
                            color: "#111827",
                            background: "transparent",
                            outline: "none",
                        }}
                        placeholder="Search name, form type, or date"
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                    {search && (
                        <button
                            type="button"
                            style={{
                                position: "absolute",
                                right: 10,
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                color: "#64748B",
                                fontSize: 13,
                            }}
                            onClick={() => setSearch("")}
                        >
                            ✕
                        </button>
                    )}
                </div>
            </div>

            {/* Table */}
            <div
                style={{
                    background: "#fff",
                    borderRadius: 28,
                    border: "1px solid #E5E7EB",
                    overflow: "hidden",
                    boxShadow:
                        "0 24px 80px rgba(15,23,42,0.08)",
                }}
            >
                {/* Header */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            ASSESSMENT_GRID_COLUMNS,
                        padding: "18px 24px",
                        background: "#F8FAFC",
                        borderBottom:
                            "1px solid #E6E8F0",
                    }}
                >
                    {[
                        "Session ID",
                        "Visit Type",
                        "Department",
                        "Completed",
                        "Duration",
                        "Score",
                        "Progress (%)",
                        "Last Updated",
                    ].map((h) => (
                        <div
                            key={h}
                            style={{
                                fontSize: 10,
                                fontWeight: 500,
                                color: "#64748B",
                                textTransform:
                                    "uppercase",
                                letterSpacing: "0.18em",
                            }}
                        >
                            {h}
                        </div>
                    ))}
                </div>

                {/* Body */}
                {loading ? (
                    Array.from(
                        { length: 5 },
                        (_, i) => (
                            <ShimmerRow key={i} />
                        )
                    )
                ) : error ? (
                    <EmptyState
                        icon="⚠️"
                        title="Unable to load SOAP sessions"
                        message={error}
                    />
                ) : filtered.length === 0 ? (
                    <EmptyState
                        icon="📋"
                        title={
                            search
                                ? "No SOAP sessions match your search"
                                : "No SOAP sessions found"
                        }
                        message={
                            search
                                ? "Try a different SOAP session id or form type."
                                : "This patient has no SOAP sessions recorded yet."
                        }
                    />
                ) : (
                    filtered.map((a, idx) => (
                        <SessionRow
                            key={
                                a.id ??
                                a.form_data_id ??
                                a.assessment_id ??
                                `row-${idx}`
                            }
                            sessionData={a}
                            idx={idx}
                            onView={setSelectedSession}
                        />
                    ))
                )}
            </div>

            {!loading &&
                !error &&
                filtered.length > 0 && (
                    <div
                        style={{
                            marginTop: 12,
                            fontSize: 12,
                            color: "#94A3B8",
                            textAlign: "right",
                        }}
                    >
                        Showing{" "}
                        <strong>
                            {filtered.length}
                        </strong>{" "}
                        of{" "}
                        <strong>
                            {sessionData.length}
                        </strong>{" "}
                        SOAP Session
                        {sessionData.length !== 1
                            ? "s"
                            : ""}
                    </div>
                )}
        </div>
    );
}