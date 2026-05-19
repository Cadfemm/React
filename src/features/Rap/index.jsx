import SOAPSession from "./session";
import api from "../../shared/api/apiClient";
import React, { useState, useMemo } from "react";
import EmptyState from "../../shared/ui/EmptyState";
import { ShimmerRow } from "../../shared/ui/Shimmer";
import { API_URL } from "../../platform/config/api.config";


/* ── Status palette ────────────────────────────────────── */
const STATUS = {
  new: {
    bg: "#ECFDF5",
    color: "#166534",
    border: "#A7F3D0",
    dot: "#22C55E",
  },
  ongoing: {
    bg: "#EFF6FF",
    color: "#1D4ED8",
    border: "#BFDBFE",
    dot: "#3B82F6",
  },
  done: {
    bg: "#F0FDF4",
    color: "#15803D",
    border: "#BBF7D0",
    dot: "#22C55E",
  },
  inactive: {
    bg: "#F8FAFC",
    color: "#64748B",
    border: "#E2E8F0",
    dot: "#94A3B8",
  },
};

function StatusPill({ status }) {
  const n = (status || "New").trim().toLowerCase();
  const s = STATUS[n] || STATUS.inactive;

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "4px 12px",
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 700,
        background: s.bg,
        color: s.color,
        border: `1px solid ${s.border}`,
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: s.dot,
        }}
      />
      {n === "new" ? "New" : status}
    </span>
  );
}

const AVATAR_COLORS = [
  "#DBEAFE",
  "#D1FAE5",
  "#FEF3C7",
  "#FCE7F3",
  "#EDE9FE",
  "#FFEDD5",
];

function PatientRow({ patient: p, idx, onPatientClick, selectable }) {
  const [hovered, setHovered] = useState(false);

  const displayName =
    p.name || p.patient_name || p.email || "—";

  const initial = (displayName[0] || "P").toUpperCase();

  const deptLabel = Array.isArray(p.departments)
    ? p.departments.join(", ")
    : p.departments || "—";

  const handleRowClick = () => {
    if (selectable && onPatientClick) {
      onPatientClick(p);
    }
  };

  return (
    <div
      role={selectable ? "button" : undefined}
      tabIndex={selectable ? 0 : undefined}
      onClick={selectable ? handleRowClick : undefined}
      onKeyDown={
        selectable
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleRowClick();
              }
            }
          : undefined
      }
      style={{
        display: "grid",
        gridTemplateColumns: "2.5fr 1.8fr 1.2fr 1fr 1fr",
        padding: "14px 20px",
        alignItems: "center",
        borderBottom: "1px solid #F1F5F9",
        background:
          hovered
            ? "#F8FAFF"
            : idx % 2 === 0
            ? "#fff"
            : "#FAFBFC",
        transition: "background .15s",
        cursor: selectable ? "pointer" : undefined,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Patient */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background:
              AVATAR_COLORS[
                initial.charCodeAt(0) % AVATAR_COLORS.length
              ],
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 11,
            fontWeight: 500,
            color: "#1E40AF",
            flexShrink: 0,
          }}
        >
          {initial}
        </div>

        <div>
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: "#111827",
            }}
          >
            {displayName}
          </div>

          {(p.age || p.gender) && (
            <div
              style={{
                fontSize: 12,
                color: "#6B7280",
                marginTop: 2,
              }}
            >
              {[p.age && `${p.age} yrs`, p.gender]
                .filter(Boolean)
                .join(" · ")}
            </div>
          )}
        </div>
      </div>

      {/* MRN */}
      <div
        style={{
          fontSize: 12,
          color: "#6B7280",
          fontFamily: "monospace",
        }}
      >
        {p.mrn || p.icd || p.patient_id || "—"}
      </div>

      {/* Status */}
      <div>
        <StatusPill status={p.status} />
      </div>

      <div style={{ fontSize: 12 }}>
        {p.department || ''}
      </div>

      {/* Action */}
      <div
        style={{
          fontSize: 12,
          color: "#475569",
          lineHeight: 1.4,
        }}
      >
        {selectable ? (
          <span
            style={{
              color: "#2563EB",
              fontWeight: 600,
            }}
          >
            View→
          </span>
        ) : (
          deptLabel
        )}
      </div>
    </div>
  );
}

export default function RAP({ title }) {
  const userRole = localStorage.getItem("userRole") || "";

  const [selectedPatient, setSelectedPatient] = useState(null);
  const [search, setSearch] = useState("");
  const [patients, setPatients] = useState([]);
  const [fetchLoading, setFetchLoading] = useState(false);

  /* Fetch patients */
  React.useEffect(() => {
    const fetchPatients = async () => {
      setFetchLoading(true);

      try {
        const response = await api.get(
          API_URL.PATIENT + "all"
        );

        setPatients(response?.data?.results || []);
      } catch (e) {
        setPatients([]);
      } finally {
        setFetchLoading(false);
      }
    };

    fetchPatients();
  }, [userRole]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();

    if (!q) return patients;

    return patients.filter((p) => {
      return (
        (p.name || p.patient_name || "")
          .toLowerCase()
          .includes(q) ||
        (p.email || "")
          .toLowerCase()
          .includes(q) ||
        (p.mrn || "")
          .toLowerCase()
          .includes(q) ||
        String(p.patient_id || "")
          .toLowerCase()
          .includes(q)
      );
    });
  }, [patients, search]);

  /* ── RAP: patient assessments ── */
  if (selectedPatient) {
    return (
      <SOAPSession
        patient={selectedPatient}
        onBack={() => setSelectedPatient(null)}
      />
    );
  }

  /* ── Patient list ── */
  return (
    <div
      style={{
        padding: "28px 28px 32px",
        minHeight: "100vh",
        fontFamily: "Inter, Roboto, sans-serif",
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
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div>
            <h1
              style={{
                fontSize: 24,
                fontWeight: 800,
                color: "#0F172A",
                margin: "0 0 4px 0",
              }}
            >
              {title}
            </h1>

            <p
              style={{
                fontSize: 13,
                color: "#475569",
                margin: 0,
              }}
            >
              All patients across every department
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
            placeholder="Search patient name, MRN or ICD"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          {search && (
            <button
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
        {/* Table Header */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "2.5fr 2fr 1.2fr  1fr 1fr",
            padding: "18px 24px",
            background: "#F8FAFC",
            borderBottom: "1px solid #E6E8F0",
          }}
        >
          {[
            "Patient",
            "MRN / ICD",
            "Status",
            "Department",
            "Action",
          ].map((h) => (
            <div
              key={h}
              style={{
                fontSize: 10,
                fontWeight: 500,
                color: "#64748B",
                textTransform: "uppercase",
                letterSpacing: "0.18em",
              }}
            >
              {h}
            </div>
          ))}
        </div>

        {/* Rows */}
        {fetchLoading ? (
          Array.from({ length: 5 }, (_, i) => (
            <ShimmerRow key={i} />
          ))
        ) : filtered.length === 0 ? (
          <EmptyState
            icon="🧑‍⚕️"
            title={
              search
                ? "No patients match your search"
                : "No patients found"
            }
            message={
              search
                ? "Try a different name or MRN."
                : "All registered patients from every department will appear here."
            }
          />
        ) : (
          filtered.map((p, idx) => (
            <PatientRow
              key={p.id || p.patient_id || idx}
              patient={p}
              idx={idx}
              selectable
              onPatientClick={setSelectedPatient}
            />
          ))
        )}
      </div>

      {!fetchLoading && filtered.length > 0 && (
        <div
          style={{
            marginTop: 12,
            fontSize: 12,
            color: "#94A3B8",
            textAlign: "right",
          }}
        >
          Showing <strong>{filtered.length}</strong> of{" "}
          <strong>{filtered.length}</strong>{" "}
          patient
          {filtered.length !== 1 ? "s" : ""}
        </div>
      )}
    </div>
  );
}