import React, { useState, useEffect } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";
import WoundLocationDiagram from "./WoundLocationDiagram";

const PRESSURE_STAGES = [
  { name: "stage_1", label: "Stage 1" },
  { name: "stage_2", label: "Stage 2" },
  { name: "stage_3", label: "Stage 3" },
  { name: "stage_4", label: "Stage 4" },
  { name: "unstageable", label: "Unstageable" },
  { name: "dti", label: "DTI (Deep Tissue Injury)" },
  { name: "medical_device", label: "Medical Device" },
  { name: "mucosal", label: "Mucosal" }
];

export default function WoundTreatmentFlowsheetForm({ patient, onSubmit, onBack }) {
  const [values, setValues] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const storageKey = patient?.id
    ? `nursing_wound_flowsheet_draft_${patient.id}`
    : null;

  useEffect(() => {
    if (!storageKey) return;
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      const parsed = JSON.parse(saved);
      setValues(parsed.values || {});
      setSubmitted(false);
    }
  }, [storageKey]);

  const onChange = (name, value) => {
    setValues(v => ({ ...v, [name]: value }));
  };

  const handleAction = (type) => {
    switch (type) {
      case "back":
        onBack?.();
        break;
      case "clear":
        setValues({});
        setSubmitted(false);
        if (storageKey) localStorage.removeItem(storageKey);
        break;
      case "save":
        if (!storageKey) return;
        localStorage.setItem(
          storageKey,
          JSON.stringify({ values, updatedAt: new Date().toISOString() })
        );
        alert("Wound Treatment Flowsheet draft saved successfully");
        break;
      default:
        break;
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    const payload = {
      patientId: patient?.id,
      scale: "Wound Treatment Flowsheet",
      values,
      submittedAt: new Date().toISOString()
    };
    if (storageKey) {
      localStorage.setItem(storageKey, JSON.stringify({ values }));
    }
    alert("Wound Treatment Flowsheet submitted successfully");
    onSubmit?.(payload);
  };

  const SCHEMA = {
    title: "WOUND TREATMENT FLOWSHEET",
    sections: [
      {
        fields: [
          {
            name: "wound_date_of_onset",
            label: "Wound Date of Onset",
            type: "date"
          }
        ]
      },
      {
        title: "Goal of Care:",
        fields: [
          {
            name: "goal_of_care",
            label: "",
            type: "checkbox-group",
            inlineWithLabel: true,
            options: [
              { label: "To Heal", value: "to_heal" },
              { label: "To Maintain", value: "to_maintain" },
              { label: "To Monitor / Manage", value: "to_monitor_manage" }
            ]
          }
        ]
      },
      {
        title: "Wound Type/Etiology (if known):",
        fields: [
          {
            name: "wound_type",
            label: "",
            type: "checkbox-group",
            inlineWithLabel: true,
            options: [
              { label: "Pressure Injury", value: "pressure_injury" },
              { label: "Venous Insufficiency", value: "venous_insufficiency" },
              { label: "Arterial Insufficiency", value: "arterial_insufficiency" },
              { label: "Diabetic Ulcer", value: "diabetic_ulcer" },
              { label: "Surgical 2º Intention", value: "surgical_2_intention" },
              { label: "Skin Tear", value: "skin_tear" },
              { label: "IAD (Incontinent Associated Dermatitis)", value: "iad" },
              { label: "Unknown", value: "unknown" },
              { label: "Other", value: "other" }
            ]
          },
          {
            name: "wound_type_other",
            label: "Other (specify):",
            type: "input",
            placeholder: "Specify",
            showIf: { field: "wound_type", includes: "other" }
          }
        ]
      },
      {
        title: "If Pressure Injury, chart stage and date. If wound deteriorates, chart new stage and date.",
        showIf: { field: "wound_type", includes: "pressure_injury" },
        fields: [
          {
            name: "pressure_injury_stages",
            label: "",
            type: "checkbox-group",
            inlineWithLabel: true,
            options: PRESSURE_STAGES.map(s => ({ label: s.label, value: s.name }))
          },
          ...PRESSURE_STAGES.flatMap(s => [
            {
              name: `${s.name}_date`,
              label: `${s.label} (dd/mm):`,
              type: "input",
              placeholder: "dd/mm",
              showIf: { field: "pressure_injury_stages", includes: s.name }
            }
          ])
        ]
      },
    ]
  };

  const WOUND_CHART_SCHEMA = {
    title: "",
    sections: [
      {
        title: "Wound location (describe or mark area):",
        fields: [
          { name: "wound_location_notes", label: "", type: "textarea", placeholder: "Describe location or reference" }
        ]
      },
      {
        title: "Wound Measurements in cm",
        fields: [
          {
            type: "row",
            fields: [
              { name: "wound_length", label: "Length", type: "input", placeholder: "cm" },
              { name: "wound_width", label: "Width", type: "input", placeholder: "cm" },
              { name: "wound_depth", label: "Depth", type: "input", placeholder: "cm" }
            ]
          },
          { type: "info-text", text: "Location corresponds to face of clock with patient's head at 12 o'clock position." }
        ]
      },
      {
        title: "Sinus Tracts & Undermining",
        fields: [
          { type: "row", fields: [{ name: "sinus_tract_1_depth", label: "Sinus Tract #1 Depth (cm)", type: "input" }, { name: "sinus_tract_1_location", label: "Location (o'clock)", type: "input", placeholder: "e.g. 3" }] },
          { type: "row", fields: [{ name: "sinus_tract_2_depth", label: "Sinus Tract #2 Depth (cm)", type: "input" }, { name: "sinus_tract_2_location", label: "Location (o'clock)", type: "input", placeholder: "e.g. 3" }] },
          { type: "row", fields: [{ name: "undermining_1_depth", label: "Undermining #1 Depth (cm)", type: "input" }, { name: "undermining_1_location", label: "Location (o'clock)", type: "input", placeholder: "e.g. 3" }] },
          { type: "row", fields: [{ name: "undermining_2_depth", label: "Undermining #2 Depth (cm)", type: "input" }, { name: "undermining_2_location", label: "Location (o'clock)", type: "input", placeholder: "e.g. 3" }] }
        ]
      },
      {
        title: "Wound Bed:",
        fields: [
          { type: "info-text", text: "Total % must = 100%" },
          { name: "wound_bed_pink_red", label: "% Pink/Red", type: "input", placeholder: "%" },
          { name: "wound_bed_granulation", label: "% Granulation (red pebbly)", type: "input", placeholder: "%" },
          { name: "wound_bed_slough", label: "% Slough", type: "input", placeholder: "%" },
          { name: "wound_bed_eschar", label: "% Eschar", type: "input", placeholder: "%" },
          { name: "wound_bed_foreign_body", label: "% Foreign body (sutures, mesh, hardware)", type: "input", placeholder: "%" },
          { name: "wound_bed_underlying_structures", label: "% Underlying structures (fascia, tendon, bone)", type: "input", placeholder: "%" },
          { name: "wound_bed_not_visible", label: "% Not visible", type: "input", placeholder: "%" },
          { name: "wound_bed_other", label: "% Other:", type: "input", placeholder: "%" }
        ]
      },
      {
        title: "Exudate Amount",
        fields: [
          { type: "info-text", text: "Select one" },
          {
            name: "exudate_amount",
            label: "",
            type: "radio",
            options: [
              { label: "None", value: "none" },
              { label: "Scant/small", value: "scant_small" },
              { label: "Moderate", value: "moderate" },
              { label: "Large/copious", value: "large_copious" }
            ]
          }
        ]
      },
      {
        title: "Initials",
        fields: [{ name: "wound_chart_initials", label: "", type: "input", placeholder: "Initials" }]
      }
    ]
  };

  return (
    <div style={{ margin: "0 auto" }}>
      <CommonFormBuilder
        schema={SCHEMA}
        values={values}
        onChange={onChange}
        submitted={submitted}
        onAction={handleAction}
        layout="nested"
      />

      {/* MARK LOCATION section with drawable diagram (custom) */}
      <div style={{ marginTop: 24, padding: "0 16px", maxWidth: 900, marginLeft: "auto", marginRight: "auto" }}>
        <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 12, color: "#0F172A", borderBottom: "1px solid #e5e7eb", paddingBottom: 8 }}>
          MARK LOCATION OF WOUND/ULCER WITH AN ARROW OR AN &quot;X&quot;
        </div>
        <WoundLocationDiagram
          value={values.wound_location_drawings || {}}
          onChange={(v) => onChange("wound_location_drawings", v)}
        />
      </div>

      {/* Wound chart sections via FormBuilder */}
      <CommonFormBuilder
        schema={WOUND_CHART_SCHEMA}
        values={values}
        onChange={onChange}
        submitted={submitted}
        layout="nested"
      />

      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 24, padding: "0 16px" }}>
        <button
          style={{
            padding: "12px 34px",
            background: "#2563EB",
            color: "#fff",
            border: "none",
            borderRadius: 10,
            fontSize: 15,
            fontWeight: 700
          }}
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
