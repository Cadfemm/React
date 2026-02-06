import React, { useState, useEffect } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

const TYPE_OF_STUDY_OPTIONS = [
  { value: "vep", label: "Visual Evoked Potential" },
  { value: "baep", label: "Brain Stem Auditory Evoked Potential" },
  { value: "ssep_lower", label: "Somatosensory Evoked Potential Lower Limb (Posterior Tibial Nerves)" },
  { value: "ssep_upper", label: "Somatosensory Evoked Potential Upper Limb (Median Nerves)" }
];

const YES_NO_OPTIONS = [
  { value: "yes", label: "YES" },
  { value: "no", label: "NO" }
];

const MODE_SELECTION_OPTIONS = [
  { value: "vep_pattern", label: "VEP PATTERN" },
  { value: "vep_goggles", label: "VEP-GOGGLES" },
  { value: "baer", label: "BAER" },
  { value: "ssep", label: "SSEP" }
];

const SENSITIVITY_OPTIONS = [
  { value: "off", label: "OFF" },
  { value: "20", label: "20 μV/mm" }
];

const HIGH_FREQ_OPTIONS = [
  { value: "off", label: "OFF" },
  { value: "100", label: "100 Hz" }
];

const LOW_FREQ_OPTIONS = [
  { value: "off", label: "OFF" },
  { value: "1", label: "1 Hz" }
];

const IMPEDANCE_OPTIONS = [
  { value: "under_5", label: "< 5 kΩ" },
  { value: "over_5", label: "> 5 kΩ" }
];

const EMR_REPORT_OPTIONS = [
  { value: "medical_assistant", label: "MEDICAL ASSISTANT" },
  { value: "electroneuro_technician", label: "ELECTRONEURODIAGNOSTIC TECHNICIAN" },
  { value: "medical_officer", label: "MEDICAL OFFICER" },
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

export default function EvokePotentialForm({ patient, onBack }) {
  const diagnosis = patient?.icd ?? patient?.diagnosis ?? "-";

  const [values, setValues] = useState({
    date_of_appointment: formatToday(),
    type_of_study: "",
    diagnosis,
    trace_old_report: "",
    mode_selection: "",
    sensitivity: "",
    high_freq_filter: "",
    low_freq_filter: "",
    impedance_check: "",
    emr_technical_report: "",
    final_report: "",
    final_report_others: ""
  });

  useEffect(() => {
    setValues(v => ({
      ...v,
      diagnosis: patient?.icd ?? patient?.diagnosis ?? "-"
    }));
  }, [patient]);

  const onChange = (name, value) => {
    setValues(v => ({ ...v, [name]: value }));
  };

  const handleAction = (type) => {
    if (type === "back") onBack?.();
  };

  const EVOKE_SCHEMA = {
    title: "EVOKE POTENTIAL STUDY",
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
            name: "diagnosis",
            label: "DIAGNOSIS (Grouping ICD)",
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
            name: "mode_selection",
            label: "MODE SELECTION",
            type: "radio",
            options: MODE_SELECTION_OPTIONS
          },
          {
            name: "sensitivity",
            label: "SENSITIVITY",
            type: "radio",
            options: SENSITIVITY_OPTIONS
          },
          {
            name: "high_freq_filter",
            label: "HIGH FREQUENCY FILTER",
            type: "radio",
            options: HIGH_FREQ_OPTIONS
          },
          {
            name: "low_freq_filter",
            label: "LOW FREQUENCY FILTER",
            type: "radio",
            options: LOW_FREQ_OPTIONS
          },
          {
            name: "impedance_check",
            label: "IMPEDANCE CHECK",
            type: "radio",
            options: IMPEDANCE_OPTIONS
          },
          {
            name: "emr_technical_report",
            label: "EMR TECHNICAL REPORT BY",
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
          }
        ]
      }
    ]
  };

  return (
    <CommonFormBuilder
      schema={EVOKE_SCHEMA}
      values={values}
      onChange={onChange}
      onAction={handleAction}
    />
  );
}
