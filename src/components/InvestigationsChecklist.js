import React from "react";
import axios from "axios";
import { guid } from "../pages/Menu";
import { csvEscape } from "../pages/Menu";
import { downloadBlob } from "../pages/Menu";
import { sx } from "./RowCard";
import RowCard from "./RowCard";
import { Field } from "../pages/Menu";
const API = "http://127.0.0.1:5000"; // backend base URL

const api = axios.create({
  baseURL: API,
});

function InvestigationsChecklist({
  open,                   // only used in modal variant
  onClose,                // only used in modal variant
  patient,
  initialRows,
  title = "Order Investigations — Checklist",
  onSave,
  variant = "inline",     // "inline" | "modal"
}) {
  const emptyRow = React.useMemo(
    () => ({
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random()),
      item: "",
      type: "Lab",
      test: "",
      priority: "Routine",
      indication: "",
      icd: "",
      specimen: "",
      prereq: "",
      ordered_by: "",
      responsible: "",
      due: "",
      status: "Planned",
      results: "",
      notes: "",
    }),
    []
  );

  const [rows, setRows] = React.useState(() =>
    (initialRows && initialRows.length ? initialRows : [emptyRow]).map((r) => ({
      ...emptyRow,
      ...r,
      id: crypto.randomUUID ? crypto.randomUUID() : String(Math.random()),
    }))
  );

  React.useEffect(() => {
    if (initialRows && initialRows.length) {
      setRows(
        initialRows.map((r) => ({
          ...emptyRow,
          ...r,
          id: crypto.randomUUID ? crypto.randomUUID() : String(Math.random()),
        }))
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialRows]);

  // Only add ESC close for modal
  React.useEffect(() => {
    if (variant !== "modal" || !open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [variant, open, onClose]);

  const addRow = () => setRows((rs) => [...rs, { ...emptyRow, id: guid() }]);
  const removeRow = (id) => setRows((rs) => rs.filter((r) => r.id !== id));
  const updateCell = (id, key, value) =>
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, [key]: value } : r)));

  const exportCSV = () => {
    const headers = [
      "Item","Type","Test/Panel","Priority","Clinical Indication","ICD-11","Specimen",
      "Pre-reqs/Prep","Ordering Clinician","Responsible","Due By","Status","Results Link","Notes",
    ];
    const body = rows.map((r) => [
      r.item, r.type, r.test, r.priority, r.indication, r.icd, r.specimen,
      r.prereq, r.ordered_by, r.responsible, r.due, r.status, r.results, r.notes,
    ]);
    const csv = [headers, ...body].map((line) => line.map(csvEscape).join(",")).join("\n");
    downloadBlob(csv, "order_investigations.csv", "text/csv;charset=utf-8;");
  };

  const save = () => {
    onSave?.(rows);
    if (variant === "modal") onClose?.();
  };

  // Modal hides when open = false; inline always renders
  if (variant === "modal" && !open) return null;

  const Wrapper = ({ children }) =>
    variant === "modal" ? (
      <div style={sx.backdrop} onClick={onClose}>
        <div style={sx.sheet} onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
          {children}
        </div>
      </div>
    ) : (
      <div style={sx.inlineCard}>{children}</div>
    );

  return (
    <Wrapper>
      {/* Header */}
      <div style={sx.header}>
        <div style={{ fontWeight: 700 }}>{title}</div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn" onClick={addRow}>+ Add Row</button>
          <button className="btn" onClick={exportCSV}>Export CSV</button>
          <button className="btn" onClick={save}>Save</button>
          {variant === "modal" && <button className="btn" onClick={onClose}>Close</button>}
        </div>
      </div>

      {/* Patient context (optional) */}
      {patient && (
        <div style={sx.context}>
          <span><b>Patient:</b> {patient.name ?? ""}</span>
          <span><b>ID:</b> {patient.id ?? ""}</span>
          <span><b>DoB: 13-07-1982 · Male</b></span>
          
        </div>
      )}

{/* Rows (responsive card grid) */}
<div style={{ display: "grid", gap: 12 }}>
  {rows.map((r) => (
    <RowCard
      key={r.id}
      row={r}
      onChange={updateCell}
      onDelete={() => removeRow(r.id)}
    />
  ))}
</div>

      <div style={{ fontSize: 12, color: "#666", marginTop: 8 }}>
        Tip: Use Export to hand off to LIS/RIS.
      </div>
    </Wrapper>
  );
}
export default InvestigationsChecklist;