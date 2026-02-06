import React, { useState, useEffect } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

const TYPE_OF_STUDY_OPTIONS = [
  { value: "ncs", label: "Nerves Conduction Study (NCS)" },
  { value: "emg", label: "Electromyogram (EMG)" }
];

const YES_NO_OPTIONS = [
  { value: "yes", label: "YES" },
  { value: "no", label: "NO" }
];

const LOCATION_OPTIONS = [
  { value: "upper", label: "UPPER EXTREMITY" },
  { value: "lower", label: "LOWER EXTREMITY" },
  { value: "upper_lower", label: "UPPER & LOWER EXTREMITY" },
  { value: "others", label: "OTHERS" }
];

const STUDY_MODALITY_OPTIONS = [
  { value: "motor", label: "MOTOR STUDY" },
  { value: "sensory", label: "SENSORY STUDY" },
  { value: "motor_sensory", label: "MOTOR & SENSORY STUDY" },
  { value: "late_response", label: "LATE RESPONSE" }
];

const SENSITIVITY_OPTIONS = [
  { value: "20", label: "20 μV" },
  { value: "others", label: "OTHERS" }
];

const DURATION_OPTIONS = [
  { value: "1", label: "1 m/sec" },
  { value: "others", label: "OTHERS" }
];

const TIME_BASE_OPTIONS = [
  { value: "2", label: "2 m/sec" },
  { value: "others", label: "OTHERS" }
];

const EMR_REPORT_OPTIONS = [
  { value: "medical_assistant", label: "MEDICAL ASSISTANT" },
  { value: "electroneuro_technician", label: "ELECTRONEURODIAGNOSTIC TECHNICIAN" },
  { value: "neurologist", label: "NEUROLOGIST" }
];

const FINAL_REPORT_OPTIONS = [
  { value: "normal", label: "NORMAL FINDINGS" },
  { value: "abnormal", label: "ABNORMAL FINDINGS" },
  { value: "others", label: "OTHERS" }
];

function formatToday() {
  const d = new Date();
  return d.toISOString().split("T")[0];
}

export default function NCSEMGForm({ patient, onBack }) {
  const diagnosis = patient?.icd ?? patient?.diagnosis ?? "-";
  const age = patient?.age ?? "-";
  const height = patient?.height ?? "-";

  const [values, setValues] = useState({
    date_of_appointment: formatToday(),
    type_of_study: "ncs",
    diagnosis,
    age,
    height,
    trace_old_report: "",
    location: "",
    location_others: "",
    study_modality: "",
    previous_study: "",
    sensitivity: "",
    sensitivity_others: "",
    duration: "",
    duration_others: "",
    time_base: "",
    time_base_others: "",
    emr_factual_report: "",
    final_report: "",
    final_report_others: "",
    graf_1: null,
    graf_2: null
  });

  useEffect(() => {
    setValues(v => ({
      ...v,
      diagnosis: patient?.icd ?? patient?.diagnosis ?? "-",
      age: patient?.age ?? "-",
      height: patient?.height ?? "-"
    }));
  }, [patient]);

  const onChange = (name, value) => {
    setValues(v => ({ ...v, [name]: value }));
  };

  const handleAction = (type) => {
    if (type === "back") onBack?.();
  };

  const NCSEMG_SCHEMA = {
    title: "NCS & EMG",
    actions: [{ type: "back", label: "Back" }],
    sections: [
      {
        fields: [
          {
            name: "date_of_appointment",
            label: "DATE OF APPOINTMENT",
            type: "date",
            placeholder: "Select date"
          },
          {
            name: "type_of_study",
            label: "TYPE OF STUDY",
            type: "radio",
            options: TYPE_OF_STUDY_OPTIONS,
            labelAbove: true
          },
          {
            type: "row",
            fields: [
              { name: "diagnosis", label: "DIAGNOSIS (Grouping ICD)", type: "input", readOnly: true },
              { name: "age", label: "AGE", type: "input", readOnly: true }
            ]
          },
          {
            name: "height",
            label: "HEIGHT (cm)",
            type: "input",
            readOnly: true
          },
          {
            name: "trace_old_report",
            label: "TRACE OLD REPORT",
            type: "radio",
            options: YES_NO_OPTIONS
          },
          {
            name: "location",
            label: "LOCATION",
            type: "radio",
            options: LOCATION_OPTIONS
          },
          {
            name: "location_others",
            label: "Specify Other",
            type: "input",
            placeholder: "Free text",
            showIf: { field: "location", equals: "others" }
          },
          {
            name: "study_modality",
            label: "TYPE OF STUDY (Modality)",
            type: "radio",
            options: STUDY_MODALITY_OPTIONS,
            labelAbove: true
          },
          {
            name: "previous_study",
            label: "PREVIOUS STUDY",
            type: "radio",
            options: YES_NO_OPTIONS
          },
          {
            name: "sensitivity",
            label: "SENSITIVITY",
            type: "radio",
            options: SENSITIVITY_OPTIONS
          },
          {
            name: "sensitivity_others",
            label: "Specify Other",
            type: "input",
            placeholder: "Free text",
            showIf: { field: "sensitivity", equals: "others" }
          },
          {
            name: "duration",
            label: "DURATION",
            type: "radio",
            options: DURATION_OPTIONS
          },
          {
            name: "duration_others",
            label: "Specify Other",
            type: "input",
            placeholder: "Free text",
            showIf: { field: "duration", equals: "others" }
          },
          {
            name: "time_base",
            label: "TIME BASE",
            type: "radio",
            options: TIME_BASE_OPTIONS
          },
          {
            name: "time_base_others",
            label: "Specify Other",
            type: "input",
            placeholder: "Free text",
            showIf: { field: "time_base", equals: "others" }
          },
          {
            name: "emr_factual_report",
            label: "EMR FACTUAL REPORT",
            type: "radio",
            options: EMR_REPORT_OPTIONS,
            labelAbove: true
          },
          {
            name: "final_report",
            label: "FINAL REPORT",
            type: "radio",
            options: FINAL_REPORT_OPTIONS
          },
          {
            name: "final_report_others",
            label: "Specify Other",
            type: "input",
            placeholder: "Free text",
            showIf: { field: "final_report", equals: "others" }
          },
          { type: "subheading", label: "GRAF" },
          {
            type: "row",
            fields: [
              {
                name: "graf_1",
                label: "Upload",
                type: "attach-file",
                accept: "image/*,.pdf"
              },
              {
                name: "graf_2",
                label: "Upload",
                type: "attach-file",
                accept: "image/*,.pdf"
              }
            ]
          }
        ]
      }
    ]
  };

  return (
    <CommonFormBuilder
      schema={NCSEMG_SCHEMA}
      values={values}
      onChange={onChange}
      onAction={handleAction}
    />
  );
}
