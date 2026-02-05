import React, { useState, useEffect } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

const mainContent = {};

const PP_OB_OPTIONS = [
  { value: "in_patient", label: "In Patient" },
  { value: "out_patient", label: "Out Patient" }
];

const LAB_OPTIONS = [
  { value: "inhouse", label: "Inhouse" },
  { value: "out_source", label: "Out source" }
];

const DOCTOR_OPTIONS = [
  { value: "dr_afif", label: "Dr. Afif" },
  { value: "dr_faez", label: "Dr. Faez" },
  { value: "dr_azril", label: "Dr. Azril" }
];

const LOCATION_OPTIONS = [
  { value: "tsw", label: "TSW" },
  { value: "dpw", label: "DPW" },
  { value: "premier_clinic", label: "Premier Clinic" },
  { value: "general_clinic", label: "General Clinic" },
  { value: "premier_ward", label: "Premier Ward" },
  { value: "general_ward", label: "General ward" },
  { value: "cvw", label: "CVW" },
  { value: "hb3", label: "HB3" }
];

const MEAL_OPTIONS = [
  { value: "fasting", label: "Fasting" },
  { value: "non_fasting", label: "Non Fasting" }
];

const PROFILE_TEST_OPTIONS = [
  { value: "rft", label: "RFT" },
  { value: "cbc", label: "CBC" },
  { value: "tft", label: "TFT" },
  { value: "rp", label: "RP" },
  { value: "bmp", label: "BMP" },
  { value: "lp", label: "LP" },
  { value: "others", label: "Others" }
];

const BIOCHEMISTRY_OPTIONS = [
  { value: "hba1c", label: "HbA1c" },
  { value: "psa", label: "PSA" },
  { value: "hiv", label: "HIV 1&2" },
  { value: "afp", label: "AFP" },
  { value: "cea", label: "CEA" },
  { value: "others", label: "Others" }
];

const HEMATOLOGY_OPTIONS = [
  { value: "fbc", label: "FBC" },
  { value: "hb", label: "HB" },
  { value: "esr", label: "ESR" },
  { value: "others", label: "Others" }
];

const MICROBIOLOGY_OPTIONS = [
  { value: "ufeme", label: "UFEME" },
  { value: "urine_cs", label: "Urine C&S" },
  { value: "microscopy", label: "Microscopy" },
  { value: "others", label: "OTHERS" }
];

const SPECIMEN_OPTIONS = [
  { value: "sputum", label: "Sputum" },
  { value: "faeces", label: "Faeces" },
  { value: "others", label: "OTHERS" }
];

const NOTIFY_DOCTOR_OPTIONS = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" }
];

const formatDate = (d) => {
  if (!d) return "-";
  const x = typeof d === "string" ? new Date(d) : d;
  return isNaN(x.getTime()) ? "-" : x.toLocaleDateString();
};

export default function LabRequestForm({ patient, onBack }) {
  const name = patient?.name || patient?.patient_name || "-";
  const address = patient?.residence || patient?.address || "-";
  const dob = patient?.dob || patient?.date_of_birth || patient?.birth_date;
  const gender = patient?.sex || patient?.gender || "-";

  const [values, setValues] = useState({
    pp_ob: "",
    lab: "",
    requester_name: "",
    requester_telephone: "",
    location: "",
    requester_date: "",
    requester_time: "",
    patient_name: name,
    patient_address: address,
    patient_dob: dob ? formatDate(dob) : "-",
    patient_gender: gender,
    meal: "",
    profile_test: [],
    profile_test_others: "",
    biochemistry: [],
    biochemistry_others: "",
    hematology: [],
    hematology_others: "",
    microbiology: [],
    microbiology_others: "",
    specimen: [],
    specimen_others: "",
    others: "",
    result_upload: null,
    notify_doctor: ""
  });

  useEffect(() => {
    if (patient) {
      const dobRaw = patient.dob || patient.date_of_birth || patient.birth_date || "";
      const dobFormatted = dobRaw ? formatDate(dobRaw) : "-";
      setValues(v => ({
        ...v,
        patient_name: patient.name || patient.patient_name || "-",
        patient_address: patient.residence || patient.address || "-",
        patient_dob: dobFormatted,
        patient_gender: patient.sex || patient.gender || "-"
      }));
    }
  }, [patient]);

  const onChange = (name, value) => setValues(v => ({ ...v, [name]: value }));

  const LAB_SCHEMA = {
    title: "Lab Request Form",
    actions: [{ type: "back", label: "Back" }],
    sections: [
      {
        fields: [
          { type: "subheading", label: "Sample details" },
          { name: "pp_ob", label: "PP/OB", type: "radio", options: PP_OB_OPTIONS },
          { name: "lab", label: "LAB", type: "radio", options: LAB_OPTIONS },
          { type: "subheading", label: "Requester details" },
          { name: "requester_name", label: "Name", type: "single-select", options: DOCTOR_OPTIONS },
          { name: "requester_telephone", label: "Telephone number", type: "input", placeholder: "Enter telephone" },
          { name: "location", label: "LOCATION", type: "single-select", options: LOCATION_OPTIONS },
          {
            type: "row",
            fields: [
              { name: "requester_date", label: "DATE", type: "date" },
              { name: "requester_time", label: "TIME", type: "input", placeholder: "HH:MM" }
            ]
          },
          { type: "subheading", label: "Patient Details" },
          { name: "patient_name", label: "Name", type: "input", readOnly: true, placeholder: "Auto-generated from Customer Service" },
          { name: "patient_address", label: "Address", type: "input", readOnly: true, placeholder: "Auto-generated from Customer Service (residence)" },
          { name: "patient_dob", label: "Date of Birth", type: "input", readOnly: true, placeholder: "Auto-generated from Customer Service" },
          { name: "patient_gender", label: "Gender", type: "input", readOnly: true, placeholder: "Auto-generated from Customer Service" },
          { name: "meal", label: "MEAL", type: "radio", options: MEAL_OPTIONS },
          { type: "subheading", label: "Profile test" },
          {
            name: "profile_test",
            label: "",
            type: "checkbox-group",
            inlineWithLabel: true,
            options: PROFILE_TEST_OPTIONS
          },
          {
            name: "profile_test_others",
            label: "Specify Other",
            type: "input",
            placeholder: "Enter details",
            showIf: { field: "profile_test", includes: "others" }
          },
          { type: "subheading", label: "Biochemistry" },
          {
            name: "biochemistry",
            label: "",
            type: "checkbox-group",
            inlineWithLabel: true,
            options: BIOCHEMISTRY_OPTIONS
          },
          {
            name: "biochemistry_others",
            label: "Specify Other",
            type: "input",
            placeholder: "Enter details",
            showIf: { field: "biochemistry", includes: "others" }
          },
          { type: "subheading", label: "Hematology" },
          {
            name: "hematology",
            label: "",
            type: "checkbox-group",
            inlineWithLabel: true,
            options: HEMATOLOGY_OPTIONS
          },
          {
            name: "hematology_others",
            label: "Specify Other",
            type: "input",
            placeholder: "Enter details",
            showIf: { field: "hematology", includes: "others" }
          },
          { type: "subheading", label: "Microbiology" },
          {
            name: "microbiology",
            label: "",
            type: "checkbox-group",
            inlineWithLabel: true,
            options: MICROBIOLOGY_OPTIONS
          },
          {
            name: "microbiology_others",
            label: "Specify Other",
            type: "input",
            placeholder: "Enter details",
            showIf: { field: "microbiology", includes: "others" }
          },
          { type: "subheading", label: "Specimen" },
          {
            name: "specimen",
            label: "",
            type: "checkbox-group",
            inlineWithLabel: true,
            options: SPECIMEN_OPTIONS
          },
          {
            name: "specimen_others",
            label: "Specify Other",
            type: "input",
            placeholder: "Enter details",
            showIf: { field: "specimen", includes: "others" }
          },
          { name: "others", label: "OTHERS", type: "textarea", placeholder: "Free text" },
          {
            name: "result_upload",
            title: "UPLOAD THE RESULT",
            type: "attach-file",
            accept: "image/*,.pdf"
          },
          { name: "notify_doctor", label: "NOTIFY DOCTOR", type: "radio", options: NOTIFY_DOCTOR_OPTIONS }
        ]
      }
    ]
  };

  const handleAction = (type) => {
    if (type === "back") onBack?.();
  };

  return (
    <div style={mainContent}>
      <CommonFormBuilder
        schema={LAB_SCHEMA}
        values={values}
        onChange={onChange}
        onAction={handleAction}
      />
    </div>
  );
}
