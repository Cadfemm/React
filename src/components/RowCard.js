import React from "react";
import axios from "axios";
import { Field } from "../pages/Menu";
const API = "http://127.0.0.1:5000"; // backend base URL

const api = axios.create({
  baseURL: API,
});
export const sx = {
  // used only in modal variant
  backdrop: {
    position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)",
    display: "flex", alignItems: "flex-end", justifyContent: "center", zIndex: 1000,
  },
  sheet: {
    width: "min(1200px, 96vw)", maxHeight: "85vh", overflow: "hidden",
    background: "#fff", borderRadius: "16px 16px 0 0", boxShadow: "0 -10px 30px rgba(0,0,0,0.2)", padding: 12,
  },
  // inline container
inlineCard: {
    background: "#fff",
    border: "1px solid #eee",
    borderRadius: 12,
    padding: 12,
    maxWidth: "100%",
    overflowX: "hidden",
  },
header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "6px 4px",
    borderBottom: "1px solid #eee",
    marginBottom: 8,
  },
  cardRow: {
    display: "grid",
    gap: 10,
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    padding: 12,
    border: "1px solid #f0f0f0",
    borderRadius: 12,
    background: "#fafafa",
  },

  field: { display: "flex", flexDirection: "column", gap: 6, minWidth: 0 },
  fieldLabel: { fontSize: 12, color: "#666" },

  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "8px 10px",
    border: "1px solid #ddd",
    borderRadius: 8,
    outline: "none",
  },

context: {
    display: "flex",
    gap: 12,
    fontSize: 12,
    color: "#444",
    padding: "6px 4px 10px",
    borderBottom: "1px dashed #eee",
    marginBottom: 8,
    flexWrap: "wrap",
  },
  tableWrap: { display: "grid", gap: 4, overflow: "auto", paddingBottom: 8 },
  tableHeader: {
    display: "grid",
    gridTemplateColumns:
      "220px 120px 160px 110px 220px 100px 130px 180px 160px 140px 130px 130px 150px 220px 70px",
    position: "sticky", top: 0, background: "#fafafa", zIndex: 1, borderBottom: "1px solid #eee",
  },
  tr: {
    display: "grid",
    gridTemplateColumns:
      "220px 120px 160px 110px 220px 100px 130px 180px 160px 140px 130px 130px 150px 220px 70px",
    alignItems: "center",
  },
  th: { fontSize: 12, fontWeight: 700, padding: "6px 8px" },
  td: { padding: "4px 6px" },
  input: {
    width: "100%", boxSizing: "border-box", padding: "6px 8px",
    border: "1px solid #ddd", borderRadius: 8, outline: "none",
  },
};
function RowCard({ row, onChange, onDelete }) {
  return (
    <div style={sx.cardRow}>
      <Field label="Item">
        <input style={sx.input} value={row.item} onChange={(e)=>onChange(row.id,"item",e.target.value)} />
      </Field>

      <Field label="Type">
        <select style={sx.input} value={row.type} onChange={(e)=>onChange(row.id,"type",e.target.value)}>
          {["Lab","Radiology","Cardiology","Assessment","Other"].map(o=>(
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      </Field>

      <Field label="Test/Panel">
        <input style={sx.input} value={row.test} onChange={(e)=>onChange(row.id,"test",e.target.value)} />
      </Field>

      <Field label="Priority">
        <select style={sx.input} value={row.priority} onChange={(e)=>onChange(row.id,"priority",e.target.value)}>
          {["STAT","Urgent","Routine"].map(o=>(<option key={o} value={o}>{o}</option>))}
        </select>
      </Field>

      <Field label="Indication">
        <input style={sx.input} value={row.indication} onChange={(e)=>onChange(row.id,"indication",e.target.value)} />
      </Field>

      <Field label="ICD-11">
        <input style={sx.input} placeholder="e.g., FA11" value={row.icd} onChange={(e)=>onChange(row.id,"icd",e.target.value)} />
      </Field>

      <Field label="Specimen">
        <input style={sx.input} placeholder="Blood/Urine/—" value={row.specimen} onChange={(e)=>onChange(row.id,"specimen",e.target.value)} />
      </Field>

      <Field label="Pre-reqs/Prep">
        <input style={sx.input} placeholder="Fasting 8h / Remove metal…" value={row.prereq} onChange={(e)=>onChange(row.id,"prereq",e.target.value)} />
      </Field>

      <Field label="Ordering Clinician">
        <input style={sx.input} value={row.ordered_by} onChange={(e)=>onChange(row.id,"ordered_by",e.target.value)} />
      </Field>

      <Field label="Responsible">
        <input style={sx.input} value={row.responsible} onChange={(e)=>onChange(row.id,"responsible",e.target.value)} />
      </Field>

      <Field label="Due By">
        <input style={sx.input} type="date" value={row.due} onChange={(e)=>onChange(row.id,"due",e.target.value)} />
      </Field>

      <Field label="Status">
        <select style={sx.input} value={row.status} onChange={(e)=>onChange(row.id,"status",e.target.value)}>
          {["Planned","Ordered","In progress","Completed","Cancelled"].map(o=>(
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      </Field>

      <Field label="Results Link">
        <input style={sx.input} placeholder="URL / ref" value={row.results} onChange={(e)=>onChange(row.id,"results",e.target.value)} />
      </Field>

      <Field label="Notes">
        <input style={sx.input} value={row.notes} onChange={(e)=>onChange(row.id,"notes",e.target.value)} />
      </Field>

      <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "end" }}>
        <button className="btn" onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
}
export default RowCard;