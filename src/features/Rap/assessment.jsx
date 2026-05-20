import api from "../../shared/api/apiClient";
import EmptyState from "../../shared/ui/EmptyState";
import { ShimmerRow } from "../../shared/ui/Shimmer";
import { API_URL } from "../../platform/config/api.config";
import React, { useEffect, useMemo, useState } from "react";


const ASSESSMENT_GRID_COLUMNS = "2fr 2fr 2fr";


function AssessmentRow({ sessionData, idx, onView }) {
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
            <div style={dateCellStyle}>
                {sessionData.name}
            </div>
            <div style={dateCellStyle}>
                {sessionData?.type}
            </div>
            <div style={dateCellStyle}>
                {sessionData.form_type}
            </div>
        </div>
    );
}

export default function Assessment({
    patient,
    session,
    onBack,
}) {
    const [search, setSearch] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [sessionData, setSessionData] =
        useState(
            session && typeof(session) === "object"
            ? session.assessment_ids: {}
        );
    
    const filtered = useMemo(() => {
        const q = search.trim().toLowerCase();
        if (!q) {
            return sessionData;
        }
        return sessionData.filter((a) => {
            return (
                String(a.id || '-').includes(q) ||
                String(a.name || '-').includes(q) ||
                String(a.type || '-').includes(q) ||
                String(a.form_type || '-').includes(q)
            );
        });
    }, [sessionData, search]);

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
                        "Assessment Name",
                        "Assessment Type",
                        "Form Type"
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
                        title="Unable to load assessment"
                        message={error}
                    />
                ) : filtered.length === 0 ? (
                    <EmptyState
                        icon="📋"
                        title={
                            search
                                ? "No assessment match your search"
                                : "No assessment found"
                        }
                        message={
                            search
                                ? "Try a different assessment id or form type."
                                : "This patient has no assessment recorded yet."
                        }
                    />
                ) : (
                    filtered.map((a, idx) => (
                        <AssessmentRow
                            key={
                                a.id ??
                                a.name ??
                                a.type ??
                                a.form_type ??
                                `row-${idx}`
                            }
                            sessionData={a}
                            idx={idx}
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
                        assessment
                        {sessionData.length !== 1
                            ? "s"
                            : ""}
                    </div>
                )}
        </div>
    );
}