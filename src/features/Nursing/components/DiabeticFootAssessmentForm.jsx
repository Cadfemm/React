import React, { useState, useEffect } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";
import DiabeticFootDiagram from "./DiabeticFootDiagram";

const YES_NO_OPTIONS = [{ value: "yes", label: "Yes" }, { value: "no", label: "No" }];

function symptomRow(key, label) {
  return [
    { type: "subheading", label },
    {
      type: "row",
      fields: [
        { name: `${key}_right`, label: "Right", type: "radio", options: YES_NO_OPTIONS },
        { name: `${key}_left`, label: "Left", type: "radio", options: YES_NO_OPTIONS },
        { name: `${key}_desc`, label: "Description", type: "input", placeholder: "Notes" }
      ]
    }
  ];
}

function examRow(key, label) {
  return [
    { type: "subheading", label },
    {
      type: "row",
      fields: [
        { name: `exam_${key}_right`, label: "Right", type: "radio", options: YES_NO_OPTIONS },
        { name: `exam_${key}_left`, label: "Left", type: "radio", options: YES_NO_OPTIONS },
        { name: `exam_${key}_desc`, label: "Description", type: "input", placeholder: "Notes" }
      ]
    }
  ];
}

function neuroRow(key, label) {
  return [
    { type: "subheading", label },
    {
      type: "row",
      fields: [
        { name: `neuro_${key}_right`, label: "Right", type: "radio", options: YES_NO_OPTIONS },
        { name: `neuro_${key}_left`, label: "Left", type: "radio", options: YES_NO_OPTIONS },
        { name: `neuro_${key}_desc`, label: "Description", type: "input", placeholder: "Notes" }
      ]
    }
  ];
}

function vascularRow(key, label) {
  return [
    { type: "subheading", label },
    {
      type: "row",
      fields: [
        { name: `vascular_${key}_right`, label: "Right", type: "radio", options: YES_NO_OPTIONS },
        { name: `vascular_${key}_left`, label: "Left", type: "radio", options: YES_NO_OPTIONS },
        { name: `vascular_${key}_desc`, label: "Description", type: "input", placeholder: "Notes" }
      ]
    }
  ];
}

const PULSE_OPTIONS = [{ value: "normal", label: "++" }, { value: "weak", label: "+" }, { value: "absent", label: "-" }];

function pulseRow(key, label) {
  return [
    { type: "subheading", label },
    {
      type: "row",
      fields: [
        { name: `pulse_${key}_right`, label: "Right", type: "radio", options: PULSE_OPTIONS },
        { name: `pulse_${key}_left`, label: "Left", type: "radio", options: PULSE_OPTIONS },
        { name: `pulse_${key}_desc`, label: "Description", type: "input", placeholder: "Notes" }
      ]
    }
  ];
}

function arterialRow(key, label) {
  return [
    { type: "subheading", label },
    {
      type: "row",
      fields: [
        { name: `arterial_${key}_right`, label: "Right", type: "radio", options: YES_NO_OPTIONS },
        { name: `arterial_${key}_left`, label: "Left", type: "radio", options: YES_NO_OPTIONS },
        { name: `arterial_${key}_desc`, label: "Description", type: "input", placeholder: "Notes" }
      ]
    }
  ];
}

export default function DiabeticFootAssessmentForm({ patient, onSubmit, onBack }) {
  const [values, setValues] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const storageKey = patient?.id ? `nursing_diabetic_foot_draft_${patient.id}` : null;

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
        localStorage.setItem(storageKey, JSON.stringify({ values, updatedAt: new Date().toISOString() }));
        alert("Diabetic Foot Assessment draft saved.");
        break;
      default:
        break;
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    const payload = { patientId: patient?.id, scale: "Diabetic Foot Assessment", values, submittedAt: new Date().toISOString() };
    if (storageKey) localStorage.setItem(storageKey, JSON.stringify({ values }));
    alert("Diabetic Foot Assessment submitted successfully.");
    onSubmit?.(payload);
  };

  const SCHEMA = {
    title: "Diabetic Foot Assessment Form",
    sections: [
      {
        title: "MEDICAL HISTORY",
        fields: [
          {
            name: "medical_history_options",
            label: "",
            type: "checkbox-group",
            inlineWithLabel: true,
            options: [
              { label: "Newly diagnosed (on admission)", value: "newly_diagnosed" },
              { label: "Known case of Diabetes Mellitus (DM)", value: "known_dm" }
            ]
          },
          { name: "newly_diagnosed_option", label: "Newly diagnosed:", type: "radio", options: [
            { label: "High blood sugar", value: "high_blood_sugar" },
            { label: "Symptomatic", value: "symptomatic" },
            { label: "Others", value: "others" }
          ], showIf: { field: "medical_history_options", includes: "newly_diagnosed" } },
          { name: "newly_high_blood_sugar_text", label: "High blood sugar (specify):", type: "input", showIf: { field: "newly_diagnosed_option", equals: "high_blood_sugar" }, placeholder: "Free text" },
          { name: "newly_symptomatic_text", label: "Symptomatic (specify):", type: "input", showIf: { field: "newly_diagnosed_option", equals: "symptomatic" }, placeholder: "Free text" },
          { name: "newly_others_text", label: "Others (specify):", type: "input", showIf: { field: "newly_diagnosed_option", equals: "others" }, placeholder: "Free text" },
          { type: "row", fields: [
            { name: "dm_duration", label: "Duration (years):", type: "input", placeholder: "years" },
            { name: "dm_date_diagnosis", label: "Date of Diagnosis:", type: "date" }
          ], showIf: { field: "medical_history_options", includes: "known_dm" } },
          { name: "dm_type", label: "Type of DM:", type: "radio", options: [
            { label: "Type 1", value: "type1" },
            { label: "Type 2", value: "type2" },
            { label: "Others", value: "others" }
          ], showIf: { field: "medical_history_options", includes: "known_dm" } },
          { name: "dm_type_others", label: "Others (specify):", type: "input", showIf: { field: "dm_type", equals: "others" }, placeholder: "Free text" },
          { type: "subheading", label: "Treatment:" },
          { name: "treatment", label: "", type: "radio", options: [
            { label: "Never seek medical treatment", value: "never" },
            { label: "Self-treated", value: "self" },
            { label: "Traditional/alternative treatment", value: "traditional" }
          ]},
          { type: "subheading", label: "Current medical treatment:" },
          { name: "current_treatment", label: "", type: "radio", options: [
            { label: "Nil", value: "nil" },
            { label: "Diet alone", value: "diet" },
            { label: "Medication", value: "medication" }
          ]},
          { name: "medication_type", label: "If Medication:", type: "radio", options: [
            { label: "Oral Anti-Diabetic Agents", value: "oad" },
            { label: "Insulin", value: "insulin" },
            { label: "Combined", value: "combined" }
          ], showIf: { field: "current_treatment", equals: "medication" } },
          { name: "medication_specify", label: "Medication (specify):", type: "input", placeholder: "Free text", showIf: { field: "medication_type", oneOf: ["oad", "insulin", "combined"] } },
          { type: "subheading", label: "Other medical condition:" },
          { name: "other_medical", label: "", type: "radio", options: [
            { label: "Ischaemic Heart Disease", value: "ihd" },
            { label: "Stroke", value: "stroke" },
            { label: "Hypertension", value: "hypertension" },
            { label: "Hyperlipidaemia", value: "hyperlipidaemia" },
            { label: "Others", value: "others" }
          ]},
          { name: "other_medical_specify", label: "Others (specify):", type: "input", showIf: { field: "other_medical", equals: "others" }, placeholder: "Free text" },
          { type: "subheading", label: "Complications:" },
          { name: "complications", label: "", type: "checkbox-group", inlineWithLabel: true, options: [
            { label: "Peripheral Arterial Disease", value: "pad" },
            { label: "Neuropathy", value: "neuropathy" },
            { label: "Nephropathy", value: "nephropathy" },
            { label: "Others", value: "others" }
          ]},
          { name: "complications_others", label: "Others (specify):", type: "input", showIf: { field: "complications", includes: "others" }, placeholder: "Free text" }
        ]
      },
      {
        title: "SYMPTOMS",
        fields: [
          ...symptomRow("paraesthesia", "Paraesthesia (Pin & Needles)"),
          ...symptomRow("claudication", "Claudication/Rest pain"),
          ...symptomRow("foot_ulcer", "Foot ulcer"),
          ...symptomRow("amputation", "Amputation"),
          ...symptomRow("orthosis", "Orthosis/Prosthesis"),
          { type: "subheading", label: "Footwear" },
          { type: "row", fields: [
            { name: "footwear_indoor", label: "Indoor", type: "input" },
            { name: "footwear_outdoor", label: "Outdoor", type: "input" },
            { name: "footwear_desc", label: "Description", type: "input" }
          ]}
        ]
      },
      {
        title: "FOOT",
        fields: [
          { type: "info-text", text: "Mark foot diagram (Right/Left) as per facility protocol. Diagram can be used to indicate areas of concern." }
        ]
      },
      {
        title: "GENERAL EXAMINATION",
        fields: [
          { type: "info-text", text: "(Kindly ✔ the appropriate box)" },
          ...examRow("skin_condition", "Skin condition"),
          ...examRow("corn_callosity", "Corn/callosity"),
          ...examRow("ulcer", "Ulcer"),
          ...examRow("bunions", "Bunions"),
          ...examRow("lesser_toe", "Lesser toe deformities"),
          ...examRow("charcot", "Charcot Joints")
        ]
      },
      {
        title: "NEUROLOGICAL EXAMINATION",
        fields: [
          ...neuroRow("muscle_wasting", "Muscle wasting"),
          ...neuroRow("proprioception", "Presence of proprioception"),
          ...neuroRow("monofilament", "Abnormal monofilament test (>3/10)"),
          ...neuroRow("vibration", "Presence of vibration perception")
        ]
      },
      {
        title: "VASCULAR EXAMINATION",
        fields: [
          ...vascularRow("atrophic_skin", "Atrophic skin changes"),
          ...vascularRow("dystrophic_nail", "Dystrophic nail"),
          ...vascularRow("absence_hair", "Absence of hair"),
          ...vascularRow("temp_gradient", "Abnormal temperature gradient"),
          ...vascularRow("capillary_refill", "Capillary refill >3 seconds")
        ]
      },
      {
        title: "PALPABLE PULSE",
        fields: [
          { type: "info-text", text: "Legend: ++ (Normal), + (Weak), - (Absent)" },
          ...pulseRow("dpa", "Dorsalis Pedis Artery (DPA)"),
          ...pulseRow("pta", "Posterior Tibial Artery (PTA)"),
          ...pulseRow("pa", "Popliteal Artery (PA)"),
          ...pulseRow("fa", "Femoral Artery (FA)")
        ]
      },
      {
        title: "ARTERIAL PULSE / ABI",
        fields: [
          ...arterialRow("brachial", "Brachial (mmHg)"),
          ...arterialRow("ant_tib", "Anterior Tibial (mmHg)"),
          ...arterialRow("post_tib", "Posterior Tibial (mmHg)"),
          ...arterialRow("abi", "Ankle-Brachial Index (ABI)")
        ]
      },
      {
        title: "University of Texas Classification of Diabetic Foot",
        fields: [
          { type: "info-text", text: "Grade 0: Pre- or post-ulcerative lesion completely epithelialised. Grade I: Superficial wound, not involving tendon, capsule or bone. Grade II: Wound penetrating to tendon or capsule. Grade III: Wound penetrating to bone or joint. Stage A: No infection/ischaemia. Stage B: Infection. Stage C: Ischaemia. Stage D: Infection + Ischaemia." },
          { name: "texas_grade", label: "Grade", type: "radio", options: [
            { value: "0", label: "0" },
            { value: "I", label: "I" },
            { value: "II", label: "II" },
            { value: "III", label: "III" }
          ]},
          { name: "texas_stage", label: "Stage", type: "radio", options: [
            { value: "A", label: "A" },
            { value: "B", label: "B" },
            { value: "C", label: "C" },
            { value: "D", label: "D" }
          ]}
        ]
      },
      {
        title: "RISK STRATIFICATION",
        fields: [
          {
            name: "risk_level",
            label: "",
            type: "radio",
            options: [
              { value: "low", label: "Low risk" },
              { value: "moderate", label: "Moderate risk" },
              { value: "high", label: "High risk" }
            ]
          }
        ]
      },
      {
        title: "MANAGEMENT PLAN",
        fields: [
          { type: "subheading", label: "Referral:" },
          { name: "referral", label: "", type: "checkbox-group", inlineWithLabel: true, options: [
            { label: "Orthopaedic", value: "orthopaedic" },
            { label: "Vascular", value: "vascular" },
            { label: "Endocrine", value: "endocrine" },
            { label: "Primary Care", value: "primary_care" },
            { label: "Others", value: "others" }
          ]},
          { name: "referral_others", label: "Others:", type: "input", showIf: { field: "referral", includes: "others" } },
          { type: "subheading", label: "Follow-up:" },
          { name: "follow_up", label: "", type: "checkbox-group", inlineWithLabel: true, options: [
            { label: "3 monthly", value: "3monthly" },
            { label: "6 monthly", value: "6monthly" },
            { label: "Yearly", value: "yearly" },
            { label: "Others", value: "others" }
          ]},
          { name: "follow_up_others", label: "Others:", type: "input", showIf: { field: "follow_up", includes: "others" } },
          { type: "subheading", label: "Foot care education checklist:" },
          { name: "foot_education", label: "", type: "checkbox-group", inlineWithLabel: false, options: [
            { label: "Foot hygiene", value: "hygiene" },
            { label: "Nail care", value: "nail_care" },
            { label: "Foot wear advice", value: "footwear" },
            { label: "Routine foot check", value: "routine_check" },
            { label: "Emollient use", value: "emollient" },
            { label: "Wound care", value: "wound_care" },
            { label: "Recognising active foot problems (e.g., infection/erythema/ulcer)", value: "recognising" },
            { label: "Things to avoid (e.g., massage/soak/reflexology/self-treatment)", value: "avoid" }
          ]}
        ]
      }
    ]
  };

  const footSectionIndex = SCHEMA.sections.findIndex(s => s.title === "FOOT");
  const sectionsBeforeFoot = SCHEMA.sections.slice(0, footSectionIndex);
  const sectionsAfterFoot = SCHEMA.sections.slice(footSectionIndex + 1);
  const SCHEMA_BEFORE_FOOT = { ...SCHEMA, sections: sectionsBeforeFoot };
  const SCHEMA_AFTER_FOOT = { ...SCHEMA, title: "", sections: sectionsAfterFoot };

  return (
    <div style={{ margin: "0 auto" }}>
      <CommonFormBuilder
        schema={SCHEMA_BEFORE_FOOT}
        values={values}
        onChange={onChange}
        submitted={submitted}
        onAction={handleAction}
        layout="nested"
      />
      <div style={{ marginTop: 24, padding: "0 16px", maxWidth: 900, marginLeft: "auto", marginRight: "auto" }}>
        <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 12, color: "#0F172A", borderBottom: "1px solid #e5e7eb", paddingBottom: 8 }}>
          FOOT
        </div>
        <DiabeticFootDiagram
          value={values.foot_diagrams || {}}
          onChange={(v) => onChange("foot_diagrams", v)}
        />
      </div>
      <CommonFormBuilder
        schema={SCHEMA_AFTER_FOOT}
        values={values}
        onChange={onChange}
        submitted={submitted}
        onAction={handleAction}
        layout="nested"
      />
    </div>
  );
}
