import React, { useEffect, useMemo, useState } from "react";
import api from "../shared/api/apiClient";
import { API_URL } from "../platform/config/api.config";
import EmptyState from "../shared/ui/EmptyState";
import { ShimmerRow } from "../shared/ui/Shimmer";

const AVATAR_COLORS = ["#DBEAFE", "#D1FAE5", "#FEF3C7", "#FCE7F3", "#EDE9FE", "#FFEDD5"];

const NAME_PATHS = [
  ["assessment_name"],
  ["assessmentName"],
  ["name"],
  ["title"],
  ["label"],
  ["assessment_title"],
  ["module_name"],
  ["form_name"],
  ["assessment", "name"],
  ["assessment", "title"],
  ["assessment", "assessment_name"],
  ["assessment_detail", "name"],
  ["assessment_detail", "title"],
  ["form", "name"],
  ["form", "assessment_name"],
  ["form_data", "name"],
  ["form_data", "assessment_name"],
  ["form_detail", "name"],
  ["data", "assessment_name"],
  ["data", "name"],
];

const FORM_TYPE_PATHS = [
  ["form_type"],
  ["formType"],
  ["form_type_name"],
  ["form_name"],
  ["visit_type"],
  ["form", "form_type"],
  ["form", "type"],
  ["form_detail", "form_type"],
  ["form_data", "form_type"],
  ["data", "form_type"],
];

const DATE_PATHS = [
  ["created_at"],
  ["created"],
  ["created_on"],
  ["createdAt"],
  ["date"],
  ["assessment_date"],
  ["started_at"],
  ["start_date"],
  ["submitted_at"],
  ["date_created"],
  ["create_date"],
  ["creation_date"],
  ["recorded_at"],
  ["assessed_at"],
  ["completed_at"],
  ["timestamp"],
  ["session", "created_at"],
  ["session", "created"],
  ["form_data", "created_at"],
  ["form", "created_at"],
  ["data", "created_at"],
];

const LAST_UPDATED_PATHS = [
  ["updated_at"],
  ["updated"],
  ["updated_on"],
  ["updatedAt"],
  ["last_updated"],
  ["last_updated_at"],
  ["modified_at"],
  ["modified"],
  ["last_modified"],
  ["date_updated"],
  ["update_date"],
  ["modification_date"],
  ["last_update"],
  ["session", "updated_at"],
  ["session", "updated"],
  ["form_data", "updated_at"],
  ["form", "updated_at"],
  ["data", "updated_at"],
];

const ASSESSMENT_GRID_COLUMNS = "2.2fr 1.1fr 1fr 1.1fr";

function pickField(obj, paths) {
  if (!obj || typeof obj !== "object") return null;
  for (const path of paths) {
    let cur = obj;
    for (const key of path) {
      if (cur == null || typeof cur !== "object") {
        cur = undefined;
        break;
      }
      cur = cur[key];
    }
    if (cur != null && cur !== "" && typeof cur !== "object") return cur;
  }
  if (typeof obj.assessment === "string") return obj.assessment;
  if (typeof obj.form === "string") return obj.form;
  return null;
}

function isDateLike(value) {
  if (value == null || value === "") return false;
  if (typeof value === "number" && value > 1e9) return true;
  if (typeof value !== "string") return false;
  if (!/\d{4}/.test(value) && !/^\d{10,13}$/.test(value.trim())) return false;
  const d = new Date(value);
  return !Number.isNaN(d.getTime());
}

function pickDateByKeyScan(obj, preferUpdated = false) {
  if (!obj || typeof obj !== "object") return null;

  const createdKey = /^(created|date$|started|submitted|creation|recorded|assessed|completed|timestamp)/i;
  const updatedKey = /^(updated|modified|last_updated|last_modified|update)/i;

  let best = null;
  const walk = (node, depth) => {
    if (!node || typeof node !== "object" || depth > 5) return;
    for (const [key, value] of Object.entries(node)) {
      if (isDateLike(value)) {
        const isUpdatedKey = updatedKey.test(key);
        const isCreatedKey = createdKey.test(key) && !isUpdatedKey;
        const matches = preferUpdated ? isUpdatedKey : isCreatedKey;
        if (matches && (!best || depth < best.depth)) {
          best = { value, depth };
        }
      } else if (value && typeof value === "object" && !Array.isArray(value)) {
        walk(value, depth + 1);
      }
    }
  };
  walk(obj, 0);
  return best?.value ?? null;
}

function mergeSessionDates(child, parent) {
  if (!child || typeof child !== "object" || !parent || typeof parent !== "object") {
    return child;
  }
  const sessionCreated = pickField(parent, DATE_PATHS) ?? pickDateByKeyScan(parent, false);
  const sessionUpdated =
    pickField(parent, LAST_UPDATED_PATHS) ?? pickDateByKeyScan(parent, true);

  return {
    ...child,
    created_at: child.created_at ?? child.created ?? child.createdAt ?? sessionCreated,
    updated_at:
      child.updated_at ?? child.updated ?? child.updatedAt ?? child.modified_at ?? sessionUpdated,
    _session_created: sessionCreated,
    _session_updated: sessionUpdated,
  };
}

function expandAssessmentItem(item, parent = null) {
  if (item == null) return [];
  if (typeof item === "string") return [{ assessment_name: item, form_type: null }];

  const row = parent ? mergeSessionDates(item, parent) : item;

  const nestedKeys = [
    "assessment_ids",
    "assessments",
    "forms",
    "form_data",
    "form_datas",
    "children",
  ];
  for (const key of nestedKeys) {
    if (Array.isArray(row[key]) && row[key].length) {
      return row[key].flatMap((child) => expandAssessmentItem(child, row));
    }
  }

  return [row];
}

function collectAssessmentRows(data, depth = 0) {
  if (data == null || depth > 4) return [];

  if (Array.isArray(data)) {
    return data.flatMap((item) => expandAssessmentItem(item));
  }

  if (typeof data === "object") {
    const arrayKeys = [
      "results",
      "assessments",
      "assessment_ids",
      "assessment_list",
      "data",
      "forms",
      "form_data",
      "formdata_set",
      "assessment_set",
      "items",
      "records",
      "sessions",
      "list",
    ];
    for (const key of arrayKeys) {
      if (Array.isArray(data[key]) && data[key].length) {
        return data[key].flatMap((item) => expandAssessmentItem(item));
      }
    }

    const arrays = Object.values(data).filter(Array.isArray);
    if (arrays.length) {
      return arrays.flatMap((arr) => arr.flatMap((item) => expandAssessmentItem(item)));
    }

    return expandAssessmentItem(data);
  }

  return [];
}

function findFallbackStrings(raw, maxDepth = 3) {
  const found = [];
  const walk = (obj, depth) => {
    if (!obj || typeof obj !== "object" || depth > maxDepth) return;
    for (const [key, value] of Object.entries(obj)) {
      if (/^(id|uuid|patient|created|updated|token)/i.test(key)) continue;
      if (typeof value === "string" && value.trim()) {
        found.push({ key, value: value.trim() });
      } else if (value && typeof value === "object" && !Array.isArray(value)) {
        walk(value, depth + 1);
      }
    }
  };
  walk(raw, 0);
  return found;
}

function mapToDisplayFields(raw) {
  let assessmentName = pickField(raw, NAME_PATHS);
  let formType = pickField(raw, FORM_TYPE_PATHS);

  if (!assessmentName || !formType) {
    const fallback = findFallbackStrings(raw);
    if (!assessmentName && fallback.length) {
      const nameHit =
        fallback.find((f) => /assessment|name|title|module|form_name/i.test(f.key)) ||
        fallback[0];
      assessmentName = nameHit?.value ?? assessmentName;
    }
    if (!formType && fallback.length) {
      const typeHit = fallback.find((f) => /form_type|formtype|type|visit/i.test(f.key));
      formType = typeHit?.value ?? (fallback.length > 1 ? fallback[1].value : formType);
    }
  }

  let assessmentDate =
    pickField(raw, DATE_PATHS) ??
    pickDateByKeyScan(raw, false) ??
    raw._session_created ??
    null;
  let lastUpdated =
    pickField(raw, LAST_UPDATED_PATHS) ??
    pickDateByKeyScan(raw, true) ??
    raw._session_updated ??
    null;

  if (!assessmentDate && lastUpdated) assessmentDate = lastUpdated;
  if (!lastUpdated && assessmentDate) lastUpdated = assessmentDate;

  return {
    ...raw,
    assessment_name: assessmentName,
    form_type: formType,
    assessment_date: assessmentDate,
    last_updated: lastUpdated,
  };
}

function normalizeAssessmentList(data) {
  return collectAssessmentRows(data)
    .map(mapToDisplayFields)
    .filter((row) => row.assessment_name || row.form_type);
}

async function enrichAssessmentDates(rows) {
  return Promise.all(
    rows.map(async (row) => {
      if (row.assessment_date && row.last_updated) return row;

      const formDataId = row.id ?? row.form_data_id ?? row.form_id;
      if (!formDataId) return row;

      try {
        const res = await api.get(API_URL.assessmentFormData(formDataId));
        const meta = res.data;
        return mapToDisplayFields({
          ...row,
          ...(meta && typeof meta === "object" ? meta : {}),
        });
      } catch {
        return row;
      }
    })
  );
}

function getAssessmentName(item) {
  return item?.assessment_name ?? pickField(item, NAME_PATHS);
}

function getFormType(item) {
  return item?.form_type ?? pickField(item, FORM_TYPE_PATHS);
}

function getAssessmentDate(item) {
  return (
    item?.assessment_date ??
    pickField(item, DATE_PATHS) ??
    pickDateByKeyScan(item, false) ??
    item?._session_created
  );
}

function getLastUpdated(item) {
  return (
    item?.last_updated ??
    pickField(item, LAST_UPDATED_PATHS) ??
    pickDateByKeyScan(item, true) ??
    item?._session_updated ??
    getAssessmentDate(item)
  );
}

function formatDate(value, { includeTime = false } = {}) {
  if (value == null || value === "") return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return String(value);
  if (includeTime) {
    return d.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  }
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatLabel(value) {
  if (value == null || value === "") return "—";
  return String(value)
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function AssessmentRow({ assessment, idx }) {
  const [hovered, setHovered] = useState(false);
  const name = formatLabel(getAssessmentName(assessment));
  const formType = formatLabel(getFormType(assessment));
  const date = formatDate(getAssessmentDate(assessment));
  const lastUpdated = formatDate(getLastUpdated(assessment), { includeTime: true });
  const initial = name === "—" ? "A" : (name[0] || "A").toUpperCase();
  const dateCellStyle = { fontSize: 13, color: "#6B7280", lineHeight: 1.4 };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: ASSESSMENT_GRID_COLUMNS,
        padding: "14px 20px",
        alignItems: "center",
        borderBottom: "1px solid #F1F5F9",
        background: hovered ? "#F8FAFF" : idx % 2 === 0 ? "#fff" : "#FAFBFC",
        transition: "background .15s",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: AVATAR_COLORS[initial.charCodeAt(0) % AVATAR_COLORS.length],
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 13,
            fontWeight: 700,
            color: "#1E40AF",
            flexShrink: 0,
          }}
        >
          {initial}
        </div>
        <div style={{ fontSize: 15, fontWeight: 700, color: "#111827" }}>{name}</div>
      </div>
      <div style={{ fontSize: 14, fontWeight: 600, color: "#475569" }}>{formType}</div>
      <div style={dateCellStyle}>{date}</div>
      <div style={dateCellStyle}>{lastUpdated}</div>
    </div>
  );
}

export function getPatientId(patient) {
  return patient?.id ?? patient?.patient_id ?? null;
}

export default function RAPPatientAssessmentsList({ patient, onBack }) {
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const patientId = getPatientId(patient);
  const displayName =
    patient?.name || patient?.patient_name || patient?.email || "Patient";

  useEffect(() => {
    if (!patientId) {
      setAssessments([]);
      setLoading(false);
      setError("Patient ID is missing.");
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    api
      .get(API_URL.patientAssessments(patientId))
      .then(async (res) => {
        if (cancelled) return;
        const rows = normalizeAssessmentList(res.data);
        const withDates = await enrichAssessmentDates(rows);
        if (!cancelled) setAssessments(withDates);
      })
      .catch(() => {
        if (!cancelled) {
          setAssessments([]);
          setError("Could not load assessments for this patient.");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [patientId]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return assessments;
    return assessments.filter((a) => {
      const name = formatLabel(getAssessmentName(a)).toLowerCase();
      const formType = formatLabel(getFormType(a)).toLowerCase();
      const date = formatDate(getAssessmentDate(a)).toLowerCase();
      const lastUpdated = formatDate(getLastUpdated(a), { includeTime: true }).toLowerCase();
      return (
        name.includes(q) ||
        formType.includes(q) ||
        date.includes(q) ||
        lastUpdated.includes(q)
      );
    });
  }, [assessments, search]);

  return (
    <div
      style={{
        padding: "28px 28px 32px",
        minHeight: "100vh",
        fontFamily: "Inter, Roboto, sans-serif",
      }}
    >
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
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
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
              boxShadow: "0 8px 20px rgba(15,23,42,0.08)",
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
              {displayName}
            </h1>
            <p style={{ fontSize: 13, color: "#475569", margin: 0 }}>
              Assessments
              {patientId ? ` · ID ${patientId}` : ""}
            </p>
          </div>
        </div>
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
            boxShadow: "0 10px 30px rgba(15,23,42,0.08)",
          }}
        >
          <svg
            style={{ position: "absolute", left: 16, pointerEvents: "none" }}
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
          >
            <circle cx="8" cy="8" r="6" stroke="#64748B" strokeWidth="1.8" />
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
            onChange={(e) => setSearch(e.target.value)}
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

      <div
        style={{
          background: "#fff",
          borderRadius: 28,
          border: "1px solid #E5E7EB",
          overflow: "hidden",
          boxShadow: "0 24px 80px rgba(15,23,42,0.08)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: ASSESSMENT_GRID_COLUMNS,
            padding: "18px 24px",
            background: "#F8FAFC",
            borderBottom: "1px solid #E6E8F0",
          }}
        >
          {["Assessment Name", "Form Type", "Date", "Last Updated"].map((h) => (
            <div
              key={h}
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "#64748B",
                textTransform: "uppercase",
                letterSpacing: "0.18em",
              }}
            >
              {h}
            </div>
          ))}
        </div>

        {loading ? (
          Array.from({ length: 5 }, (_, i) => <ShimmerRow key={i} />)
        ) : error ? (
          <EmptyState icon="⚠️" title="Unable to load assessments" message={error} />
        ) : filtered.length === 0 ? (
          <EmptyState
            icon="📋"
            title={search ? "No assessments match your search" : "No assessments found"}
            message={
              search
                ? "Try a different assessment name or form type."
                : "This patient has no assessments recorded yet."
            }
          />
        ) : (
          filtered.map((a, idx) => (
            <AssessmentRow
              key={a.id ?? a.form_data_id ?? a.assessment_id ?? `row-${idx}`}
              assessment={a}
              idx={idx}
            />
          ))
        )}
      </div>

      {!loading && !error && filtered.length > 0 && (
        <div
          style={{
            marginTop: 12,
            fontSize: 12,
            color: "#94A3B8",
            textAlign: "right",
          }}
        >
          Showing <strong>{filtered.length}</strong> of{" "}
          <strong>{assessments.length}</strong> assessment
          {assessments.length !== 1 ? "s" : ""}
        </div>
      )}
    </div>
  );
}



