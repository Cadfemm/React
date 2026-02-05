import React, { useState, useEffect } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

const TYPE_EEG_OPTIONS = [
  { value: "routine", label: "ROUTINE EEG" },
  { value: "sleep_deprived", label: "SLEEP DEPRIVED EEG" },
  { value: "video_telemetry", label: "VIDEO TELEMETRY RECORDING" }
];

const SEDATION_OPTIONS = [
  { value: "yes", label: "YES" },
  { value: "no", label: "NO" }
];

const SENSITIVITY_OPTIONS = [
  { value: "5", label: "5 μV/mm" },
  { value: "7", label: "7 μV/mm" },
  { value: "10", label: "10 μV/mm" },
  { value: "15", label: "15 μV/mm" }
];

const HIGH_FREQ_OPTIONS = [
  { value: "off", label: "OFF" },
  { value: "50", label: "50 Hz" },
  { value: "70", label: "70 Hz" },
  { value: "100", label: "100 Hz" }
];

const LOW_FREQ_OPTIONS = [
  { value: "off", label: "OFF" },
  { value: "0.1", label: "0.1 Hz" },
  { value: "0.3", label: "0.3 Hz" },
  { value: "0.5", label: "0.5 Hz" }
];

const PAPER_SPEED_OPTIONS = [
  { value: "60", label: "60 mm/sec" },
  { value: "30", label: "30 mm/sec" },
  { value: "16", label: "16 mm/sec" },
  { value: "3_10", label: "3-10 mm/sec" }
];

const MONTAGES_OPTIONS = [
  { value: "av_referential", label: "AV Referential" },
  { value: "bipolar", label: "Bipolar / Double Banana" },
  { value: "transverse", label: "Transverse" },
  { value: "others", label: "OTHERS" }
];

const YES_NO_OPTIONS = [
  { value: "yes", label: "YES" },
  { value: "no", label: "NO" }
];

const HYPERVENTILATION_OPTIONS = [
  { value: "3_min", label: "3 MINUTES" },
  { value: "5_min", label: "5 MINUTES" },
  { value: "not_done", label: "NOT DONE" }
];

const DIAGNOSIS_OPTIONS = [
  { value: "stroke", label: "STROKE" },
  { value: "tbi", label: "TBI" },
  { value: "others", label: "OTHERS" }
];

const FINAL_REPORT_OPTIONS = [
  { value: "normal", label: "NORMAL EEG" },
  { value: "abnormal", label: "ABNORMAL EEG" },
  { value: "borderline", label: "BORDERLINE EEG" }
];

const EMR_REPORT_OPTIONS = [
  { value: "medical_assistant", label: "MEDICAL ASSISTANT" },
  { value: "eeg_technologist", label: "EEG TECHNOLOGIST" },
  { value: "neurologist", label: "NEUROLOGIST" }
];

function formatToday() {
  const d = new Date();
  return d.toISOString().split("T")[0];
}

export default function EEGForm({ patient, onBack }) {
  const gender = patient?.sex || patient?.gender || "-";
  const age = patient?.age ?? "-";

  const [values, setValues] = useState({
    date_of_appointment: formatToday(),
    type_eeg: "routine",
    gender,
    age,
    general_appearance: "",
    medication: "",
    sedation: "no",
    sensitivity: "",
    high_freq_filter: "",
    low_freq_filter: "",
    paper_speed: "",
    montages: "",
    montages_others: "",
    electrocardiogram: "",
    electromyogram: "",
    photic_stimulation: "",
    hyperventilation: "",
    previous_eeg: "",
    diagnosis: "",
    diagnosis_others: "",
    final_report: "",
    final_report_abnormal: "",
    final_report_borderline: "",
    graf: null,
    emr_factual_report: ""
  });

  useEffect(() => {
    setValues(v => ({
      ...v,
      gender: patient?.sex || patient?.gender || "-",
      age: patient?.age ?? "-"
    }));
  }, [patient]);

  const onChange = (name, value) => {
    setValues(v => ({ ...v, [name]: value }));
  };

  const handleAction = (type) => {
    if (type === "back") onBack?.();
  };

  const EEG_SCHEMA = {
    title: "EEG",
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
            name: "type_eeg",
            label: "TYPE OF EEG",
            type: "radio",
            options: TYPE_EEG_OPTIONS,
            labelAbove: true
          },
          {
            type: "row",
            fields: [
              { name: "gender", label: "GENDER", type: "input", readOnly: true },
              { name: "age", label: "AGE", type: "input", readOnly: true }
            ]
          },
          {
            name: "general_appearance",
            label: "GENERAL APPEARANCE & MENTAL STATUS",
            type: "textarea",
            placeholder: "Free text"
          },
          {
            name: "medication",
            label: "MEDICATION",
            type: "textarea",
            placeholder: "Free text"
          },
          {
            name: "sedation",
            label: "SEDATION",
            type: "radio",
            options: SEDATION_OPTIONS
          },
          { type: "subheading", label: "Technical Settings" },
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
            name: "paper_speed",
            label: "PAPER SPEED",
            type: "radio",
            options: PAPER_SPEED_OPTIONS
          },
          {
            name: "montages",
            label: "MONTAGES",
            type: "radio",
            options: MONTAGES_OPTIONS
          },
          {
            name: "montages_others",
            label: "Specify Other",
            type: "input",
            placeholder: "Free text",
            showIf: { field: "montages", equals: "others" }
          },
          {
            name: "electrocardiogram",
            label: "ELECTROCARDIOGRAM",
            type: "radio",
            options: YES_NO_OPTIONS
          },
          {
            name: "electromyogram",
            label: "ELECTROMYOGRAM",
            type: "radio",
            options: YES_NO_OPTIONS
          },
          {
            name: "photic_stimulation",
            label: "PHOTIC STIMULATION",
            type: "radio",
            options: YES_NO_OPTIONS
          },
          {
            name: "hyperventilation",
            label: "HYPERVENTILATION",
            type: "radio",
            options: HYPERVENTILATION_OPTIONS
          },
          {
            name: "previous_eeg",
            label: "PREVIOUS EEG",
            type: "radio",
            options: YES_NO_OPTIONS
          },
          { type: "subheading", label: "Report" },
          {
            name: "diagnosis",
            label: "DIAGNOSIS",
            type: "radio",
            options: DIAGNOSIS_OPTIONS
          },
          {
            name: "diagnosis_others",
            label: "Specify Other",
            type: "input",
            placeholder: "Free text",
            showIf: { field: "diagnosis", equals: "others" }
          },
          {
            name: "final_report",
            label: "FINAL REPORT",
            type: "radio",
            options: FINAL_REPORT_OPTIONS
          },
          {
            name: "final_report_abnormal",
            label: "Specify",
            type: "textarea",
            placeholder: "Free text",
            showIf: { field: "final_report", equals: "abnormal" }
          },
          {
            name: "final_report_borderline",
            label: "Specify",
            type: "textarea",
            placeholder: "Free text",
            showIf: { field: "final_report", equals: "borderline" }
          },
          {
            name: "graf",
            label: "GRAF (RUNNING GRAF REPORT & VIDEO)",
            type: "attach-file",
            accept: "image/*,.pdf,video/*"
          },
          {
            name: "emr_factual_report",
            label: "EMR FACTUAL REPORT",
            type: "radio",
            options: EMR_REPORT_OPTIONS,
            labelAbove: true
          }
        ]
      }
    ]
  };

  return (
    <CommonFormBuilder
      schema={EEG_SCHEMA}
      values={values}
      onChange={onChange}
      onAction={handleAction}
    />
  );
}
