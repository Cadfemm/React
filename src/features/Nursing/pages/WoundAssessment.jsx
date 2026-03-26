import React, { useState, useMemo } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

const opt = (arr) => arr.map(v => ({ label: v, value: v }));

function buildSchema(values) {
  const depth        = parseFloat(values.wound_depth) || 0;
  const depthEnabled = depth > 0;
  const prevDepth    = parseFloat(values.prev_depth) || 0;
  const rapidIncrease = depthEnabled && prevDepth > 0 && (depth - prevDepth) > 1;

  const hasSinus       = values.sinus1_depth || values.sinus2_depth;
  const hasUndermining = values.undermining1_depth || values.undermining2_depth;
  const complexWound   = hasSinus && hasUndermining;

  const pressureInjurySelected = (values.wound_type || []).some(v => v.startsWith("Pressure Injury"));
  const pressureStage = values.pressure_stage || "";
  const highStage     = ["Stage 3","Stage 4","Unstageable","DTI (Deep Tissue Injury)"].includes(pressureStage);

  const isNewWound    = values.new_wound === "Yes";
  const infectionStatus = values.infection_status || "";
  const isSuperBug    = values.superbug === "Yes";
  const painScore     = parseInt(values.pain_score) || 0;
  const packIn        = parseInt(values.packing_count_in) || 0;
  const packOut       = parseInt(values.packing_count_out) || 0;
  const packMismatch  = (packIn > 0 || packOut > 0) && packIn !== packOut;
  const noImprovement = values.no_improvement_14days === "Yes";

  const fields = [

    /* ── Patient & Encounter ── */
    { type: "subheading", label: "Patient & Encounter Details" },
    {
      type: "row",
      fields: [
        { name: "assessment_date", label: "Date", type: "date" },
        { name: "shift", label: "Shift", type: "radio", options: opt(["Morning","Evening","Night"]) }
      ]
    },
    {
      type: "row",
      fields: [
        { name: "assessed_by",  label: "Assessed by (Nurse name)", type: "input" },
        { name: "reviewed_by", label: "Reviewed by (MO / Senior / PIC Wound)", type: "input" }
      ]
    },

    /* ── Goal of Care ── */
    { type: "subheading", label: "Goal of Care" },
    {
      name: "goal_of_care", label: "Goal of Care (mandatory)",
      type: "checkbox-group",
      options: opt(["Healing","Maintenance","Infection control","Palliative / comfort care","Pre-surgical optimization"])
    },

    /* ── Wound Identification ── */
    { type: "subheading", label: "Wound Identification" },
    {
      name: "wound_type", label: "Wound Type (multi-select)",
      type: "checkbox-group",
      options: opt([
        "Pressure Injury","Venous Insufficiency","Arterial Insufficiency",
        "Diabetic Foot Ulcer","Surgical – Primary intention","Surgical – Secondary intention",
        "Skin Tear","IAD (Incontinence-Associated Dermatitis)","Traumatic","Unknown","Other"
      ])
    },
    ...(pressureInjurySelected ? [
      { name: "pressure_stage", label: "Pressure Injury Stage", type: "radio",labelAbove:true,
        options: opt(["Stage 1","Stage 2","Stage 3","Stage 4","Unstageable","DTI (Deep Tissue Injury)","Medical Device","Mucosal"]) },
      ...(highStage ? [{ type: "alert-box", severity: "danger",
        message: "🔴 Pressure Injury Stage ≥ 3 — Notify: MO + Senior Nurse + PIC Wound immediately." }] : [])
    ] : []),
    { name: "new_wound", label: "New Wound?", type: "radio", options: opt(["Yes","No"]) },
    ...(isNewWound ? [{ type: "alert-box", severity: "danger",
      message: "🔴 New wound identified — Immediate notification required: MO + Senior Nurse + PIC Wound." }] : []),

    /* ── Location Mapping ── */
    { type: "subheading", label: "Location Mapping" },
    { name: "body_region", label: "Body Region", type: "radio",
      options: opt(["Head / Neck","Upper Limb","Lower Limb","Trunk"]) },
    { name: "specific_site", label: "Specific Site", type: "input",
      placeholder: "e.g. Sacrum, Heel, Plantar foot, Calf, Forearm" },
    { name: "laterality", label: "Laterality", type: "radio",
      options: opt(["Left","Right","Bilateral","N/A"]) },
    {
      name: "wound_location_pins", label: "Mark Wound Location on Body Diagram",
      type: "wound-location-marker",
      views: [
        { key: "body",  label: "Body (Front/Back)", src: "/body_high.png" },
        { key: "feet",  label: "Hands",             src: "/feet_high.png" },
        { key: "hands", label: "Feet",              src: "/hands_high.png" }
      ]
    },

    /* ── Wound Measurement ── */
    { type: "subheading", label: "Wound Measurement (cm)" },
    {
      name: "wound_measurement", label: "Wound Measurements in cm",
      type: "wound-measurement-clock",
      markers: [
        { key: "sinus1_clock",       label: "Sinus #1",       color: "#ef4444" },
        { key: "sinus2_clock",       label: "Sinus #2",       color: "#f97316" },
        { key: "undermining1_clock", label: "Undermining #1", color: "#3b82f6" },
        { key: "undermining2_clock", label: "Undermining #2", color: "#8b5cf6" }
      ]
    },
    ...(depth >= 3 ? [{ type: "alert-box", severity: "warning",
      message: "⚠️ Deep wound (≥ 3 cm) — consider advanced assessment." }] : []),
    ...(rapidIncrease ? [{ type: "alert-box", severity: "danger",
      message: "🔴 Rapid depth increase (> 1 cm from previous) — Notify: MO + Senior Nurse + PIC Wound." }] : []),
    ...(complexWound ? [{ type: "alert-box", severity: "warning",
      message: "⚠️ Complex wound — multiple sinus tracts / undermining present. Consider specialist review." }] : []),

    /* ── Wound Bed Assessment ── */
    { type: "subheading", label: "Wound Bed Assessment" },
    { type: "subheading", label: "Tissue Type (% must total 100%)" },
    { type: "row", fields: [
      { name: "tissue_granulation", label: "% Granulation",       type: "input", placeholder: "%" },
      { name: "tissue_slough",      label: "% Slough",            type: "input", placeholder: "%" }
    ]},
    { type: "row", fields: [
      { name: "tissue_necrotic",    label: "% Necrotic (Eschar)", type: "input", placeholder: "%" },
      { name: "tissue_epithelial",  label: "% Epithelial",        type: "input", placeholder: "%" }
    ]},
    { type: "row", fields: [
      { name: "tissue_pinkred",     label: "% Pink/Red",          type: "input", placeholder: "%" },
      { name: "tissue_foreign",     label: "% Foreign body",      type: "input", placeholder: "%" }
    ]},
    { type: "row", fields: [
      { name: "tissue_underlying",  label: "% Underlying structures (bone, tendon, etc.)", type: "input", placeholder: "%" },
      { name: "tissue_not_visible", label: "% Not visible",       type: "input", placeholder: "%" }
    ]},
    { name: "tissue_other_pct", label: "% Other", type: "input", placeholder: "%" },
    { type: "subheading", label: "Infection Status" },
    { name: "infection_status", label: "Infection", type: "radio",
      options: opt(["No infection","Suspected infection","Confirmed infection"]) },
    ...((infectionStatus === "Suspected infection" || infectionStatus === "Confirmed infection") ? [
      { type: "alert-box", severity: "warning",
        message: "🟠 Infection present — amber alert. Review wound management plan." },
      { name: "superbug", label: "MDRO / Superbug?", type: "radio", options: opt(["Yes","No"]) },
      ...(isSuperBug ? [{ type: "alert-box", severity: "danger",
        message: "🔴 MDRO (Superbug) identified — Red alert. Implement contact precautions immediately." }] : [])
    ] : []),

    /* ── Exudate ── */
    { type: "subheading", label: "Exudate Assessment" },
    { name: "exudate_amount", label: "Amount", type: "radio",
      options: opt(["None","Scant / Small","Moderate","Large / Copious"]) },
    { name: "exudate_type", label: "Type (all that apply)", type: "checkbox-group",
      options: opt(["Serous","Serosanguineous","Sanguineous","Purulent","Hemorrhagic","Other"]) },

    /* ── Odour ── */
    { type: "subheading", label: "Odour" },
    { name: "odour", label: "Odour", type: "radio",
      options: opt(["None","Present before cleansing","Present after cleansing"]) },
    ...(values.odour === "Present after cleansing" ? [{ type: "alert-box", severity: "warning",
      message: "⚠️ Persistent odour after cleansing — infection indicator. Review wound status." }] : []),

    /* ── Wound Edge ── */
    { type: "subheading", label: "Wound Edge" },
    { name: "wound_edge", label: "Wound Edge (all that apply)", type: "checkbox-group",
      options: opt(["Attached","Non-Attached","Rolled (Epibole)","Macerated","Undermined","Demarcated","Diffuse","Epithelialization"]) },

    /* ── Peri-Wound Skin ── */
    { type: "subheading", label: "Peri-Wound Skin" },
    { name: "peri_wound_skin", label: "Peri-wound Skin (all that apply)", type: "checkbox-group",
      options: opt(["Intact","Erythema","Indurated","Macerated","Excoriated / Denuded","Callused","Fragile","Other"]) },
    ...((values.peri_wound_skin || []).some(v => ["Macerated","Erythema"].includes(v)) ? [{ type: "alert-box", severity: "warning",
      message: "🟠 Severe maceration / erythema detected — clinical review recommended." }] : []),

    /* ── Pain Assessment ── */
    { type: "subheading", label: "Pain Assessment" },
    {
      name: "pain_score", label: "Pain Score (0–10 VAS)",
      type: "scale-slider",
      min: 0, max: 10, step: 1,
      ranges: [
        { from: 0, to: 3,  color: "#22c55e", label: "Mild (0–3)" },
        { from: 4, to: 6,  color: "#f59e0b", label: "Moderate (4–6)" },
        { from: 7, to: 10, color: "#ef4444", label: "Severe (7–10)" }
      ],
      showValue: true
    },
    ...(painScore >= 7 ? [{ type: "alert-box", severity: "warning",
      message: "🟠 Pain ≥ 7 — clinical escalation required." }] : []),

    /* ── Packing Count ── */
    { type: "subheading", label: "Packing Count" },
    { type: "info-text", text: "Required if wound depth ≥ 1 cm." },
    { type: "row", fields: [
      { name: "packing_count_in",  label: "Count IN",  type: "input", placeholder: "pieces" },
      { name: "packing_count_out", label: "Count OUT", type: "input", placeholder: "pieces" }
    ]},
    ...(packMismatch ? [{ type: "alert-box", severity: "danger",
      message: "🔴 Packing count mismatch — CRITICAL SAFETY ALERT. Recount immediately." }] : []),

    /* ── Treatment Plan ── */
    { type: "subheading", label: "Treatment Plan" },
    { name: "dressing_type", label: "Dressing Type", type: "input",
      placeholder: "e.g. Foam, Hydrocolloid, Alginate..." },
    { name: "dressing_frequency", label: "Frequency", type: "radio",
      options: opt(["Daily","Every 2 days","Every 3 days","Weekly","As needed"]) },
    { name: "debridement_needed", label: "Debridement Needed", type: "radio", options: opt(["Yes","No"]) },
    { name: "antibiotics", label: "Antibiotics", type: "radio",
      options: opt(["None","Topical","Systemic","Both"]) },
    { name: "no_improvement_14days", label: "Wound not improving for 14+ days?", type: "radio", options: opt(["Yes","No"]) },
    ...(noImprovement ? [{ type: "alert-box", severity: "warning",
      message: "⚠️ No improvement in 14 days — consider changing dressing type or escalating care." }] : []),
    { name: "treatment_notes", label: "Treatment Notes", type: "textarea",
      placeholder: "Additional treatment details..." },

    /* ── Weekly Wound Image ── */
    { type: "subheading", label: "Weekly Wound Image" },
    { type: "info-text", text: "Mandatory: Upload at least one image per week. Auto-timestamped on submission." },
    { name: "wound_image", label: "Upload Wound Image", type: "file-upload-modal", accept: "image/*" },

    /* ── Wound Tracking Flow Sheet ── */
    { type: "subheading", label: "Wound Tracking Flow Sheet" },
    { type: "info-text", text: "Select month/year — daily columns auto-generate. Dropdowns per day for each category." },
    { name: "wound_tracking_grid", label: "Wound Tracking Grid", type: "wound-tracking-grid" }
  ];

  return {
    title: "Wound Assessment & Treatment Flow Sheet (WATFS)",
    sections: [{ title: "", fields }]
  };
}

export default function WoundAssessment({ patient, onBack }) {
  const [values, setValues] = useState({});
  const onChange = (name, value) => setValues(v => ({ ...v, [name]: value }));
  const schema = useMemo(() => buildSchema(values), [values]);

  const handleAction = (action) => {
    if (action.type === "back" && onBack) onBack();
    if (action.type === "submit") {
      console.log("WATFS Submit:", values);
      alert("Wound assessment saved.");
    }
  };

  return (
    <CommonFormBuilder
      schema={{
        ...schema,
        actions: [
          // { type: "back",   label: "Back" },
          // { type: "submit", label: "Save Assessment", style: "primary" }
        ]
      }}
      values={values}
      onChange={onChange}
      onAction={handleAction}
      patient={patient}
      layout="nested"
    />
  );
}
