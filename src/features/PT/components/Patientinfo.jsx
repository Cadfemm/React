import React, { useEffect, useState } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

/* ===================== CONTAINER SCHEMA ===================== */

const HYDRO_CONTAINER_SCHEMA = {
  title: "Patient Information",
  sections: []
};

/* ===================== CONSENT & REFERRAL ===================== */

const CONSENT_AND_REFERRAL_SCHEMA = {
  title: "",
  sections: [
    {
      fields: [
        {
          name: "consent_risks_benefits",
          type: "checkbox-group",
          options: [{ label: "Risks/benefits explained", value: "yes" }]
        },
        {
          name: "consent_verbalized",
          type: "checkbox-group",
          options: [{ label: "Patient verbalized understanding", value: "yes" }]
        },
        {
          name: "consent_obtained",
          type: "checkbox-group",
          options: [{ label: "Consent obtained", value: "yes" }]
        },
         {
          name: "hep_reviewed",
          type: "checkbox-group",
          options: [{ label: "Home Exercise Program (HEP) reviewed and demonstrated", value: "yes" }]
        },
        {
          name: "current_diagnosis",
          label: "Current Diagnosis",
          type: "multi-select-dropdown",
          options: [
            { label: "Stroke", value: "stroke" },
            { label: "Traumatic Brain Injury", value: "tbi" },
            { label: "Parkinson Disease", value: "parkinson" },
            { label: "Spinal Cord Injury", value: "sci" },
            { label: "Peripheral Neuropathy", value: "peripheral_neuropathy" },
            { label: "Ligament injuries", value: "ligament_injuries" },
            { label: "Ataxia", value: "ataxia" },
            { label: "Others", value: "others" }
          ]
        },
        {
          name: "current_diagnosis_other",
          label: "Other Diagnosis (specify)",
          type: "textarea",
          showIf: { field: "current_diagnosis", includes: "others" }
        },
        {
          name: "equipment_owned",
          label: "List of Equipment Owned",
          type: "checkbox-group",
          options: [
            { label: "PERKESO", value: "perkeso" },
            { label: "NGO", value: "ngo" },
            { label: "Self-purchased", value: "self" },
            { label: "Others", value: "others" }
          ]
        },
        {
          name: "equipment_perkeso",
          label: "PERKESO Equipment Details",
          type: "textarea",
          showIf: { field: "equipment_owned", includes: "perkeso" }
        },
        {
          name: "equipment_ngo",
          label: "NGO Equipment Details",
          type: "textarea",
          showIf: { field: "equipment_owned", includes: "ngo" }
        },
        {
          name: "equipment_self",
          label: "Self-purchased Equipment Details",
          type: "textarea",
          showIf: { field: "equipment_owned", includes: "self" }
        },
        {
          name: "equipment_others",
          label: "Other Equipment Details",
          type: "textarea",
          showIf: { field: "equipment_owned", includes: "others" }
        },
        { type: "subheading", label: "Referral Information" },
        {
          name: "referred_by",
          label: "Referred by",
          type: "input",
          readOnly: true
        },
        {
          name: "referral_reasons",
          label: "Referral Reasons",
          type: "textarea",
          readOnly: true
        },

      ]
    }
  ]
};

/* ===================== PATIENT INFO ===================== */

function HydroPatientInfo({ patient }) {
  if (!patient) return null;

  const today = new Date();

  const formatDate = d =>
    d ? new Date(d).toLocaleDateString() : "-";

  const calculateDuration = onset => {
    if (!onset) return "-";
    const diff = today - new Date(onset);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);
    if (years > 0) return `${years} yr ${months % 12} mo`;
    if (months > 0) return `${months} mo`;
    return `${days} days`;
  };

  return (
    <div style={section}>
      <div style={patientGrid}>
        <div><b>Name:</b> {patient.name}</div>
        <div><b>IC:</b> {patient.id}</div>
        <div><b>DOB:</b> {formatDate(patient.dob)}</div>
        <div><b>Age / Gender:</b> {patient.age} / {patient.sex}</div>
        <div><b>ICD:</b> {patient.icd}</div>
        <div><b>Date of Assessment:</b> {today.toLocaleDateString()}</div>
        <div><b>Date of Onset:</b> {formatDate(patient.date_of_onset)}</div>
        <div><b>Duration of Diagnosis:</b> {calculateDuration(patient.date_of_onset)}</div>
        <div><b>Primary Diagnosis:</b> {patient.diagnosis_history || "-"}</div>
        <div><b>Secondary Diagnosis:</b> {patient.medical_history || "-"}</div>
        <div><b>Dominant Side:</b> {patient.dominant_side || "-"}</div>
        <div><b>Language Preference:</b> {patient.language_preference || "-"}</div>
        <div><b>Education Level:</b> {patient.education_background || "-"}</div>
        <div><b>Occupation:</b> {patient.occupation || "-"}</div>
        <div><b>Work Status:</b> {patient.employment_status || "-"}</div>
        <div><b>Driving Status:</b> {patient.driving_status || "-"}</div>
      </div>
    </div>
  );
}

/* ===================== MAIN HYDRO ===================== */

export default function Hydro({ patient }) {
  const [values, setValues] = useState({});

  /* preload referral info like Neuro */
  useEffect(() => {
    if (!patient) return;
    setValues(v => ({
      ...v,
      referred_by: patient.case_manager || "",
      referral_reasons: patient.diagnosis_history || patient.icd || ""
    }));
  }, [patient]);

  const onChange = (name, value) => {
    setValues(v => ({ ...v, [name]: value }));
  };

  return (
    <div style={mainContent}>

      {/* ===== PATIENT INFORMATION ===== */}
      <CommonFormBuilder
        schema={HYDRO_CONTAINER_SCHEMA}
        values={{}}
        onChange={() => {}}
      >
        <HydroPatientInfo patient={patient} />
      </CommonFormBuilder>

      {/* ===== CONSENT & REFERRAL ===== */}
      <CommonFormBuilder
        schema={CONSENT_AND_REFERRAL_SCHEMA}
        values={values}
        onChange={onChange}
      />

    </div>
  );
}

/* ===================== STYLES ===================== */

const mainContent = { margin: "0 auto" };

const section = { marginBottom: 24 };

const patientGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 12,
  fontSize: 14
};