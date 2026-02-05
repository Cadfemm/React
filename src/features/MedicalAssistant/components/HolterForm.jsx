import React, { useState, useEffect } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

const TYPE_HOLTER_OPTIONS = [
  { value: "recording_devices", label: "Recording Devices" },
  { value: "patch", label: "Patch" }
];

const UNDERLYING_OPTIONS = [
  { value: "major", label: "MAJOR CARDIAC ISSUE" },
  { value: "minor", label: "MINOR CARDIAC ISSUE" },
  { value: "others", label: "OTHERS" }
];

const HOURS_RECORDING_OPTIONS = [
  { value: "7", label: "7 hrs" },
  { value: "12", label: "12 hrs" },
  { value: "24", label: "24 hrs" },
  { value: "48", label: "48 hrs" },
  { value: "76", label: "76 hrs" }
];

const ECG_CHANNEL_OPTIONS = [
  { value: "2", label: "2 CH" },
  { value: "3", label: "3 CH" },
  { value: "4", label: "4 CH" },
  { value: "5", label: "5 CH" },
  { value: "6", label: "6 CH" }
];

const EMR_REPORT_OPTIONS = [
  { value: "medical_assistant", label: "MEDICAL ASSISTANT" },
  { value: "cardiovascular_technologist", label: "CARDIOVASCULAR TECHNOLOGIST" },
  { value: "medical_officer", label: "MEDICAL OFFICER" },
  { value: "cardiologist", label: "CARDIOLOGIST" }
];

const FINAL_REPORT_OPTIONS = [
  { value: "positive", label: "POSITIVE STUDY" },
  { value: "negative", label: "NEGATIVE STUDY" }
];

function formatToday() {
  const d = new Date();
  return d.toISOString().split("T")[0];
}

export default function HolterForm({ patient, onBack }) {
  const diagnosis = patient?.icd ?? patient?.diagnosis ?? "-";
  const age = patient?.age ?? "-";
  const gender = patient?.sex || patient?.gender || "-";

  const [values, setValues] = useState({
    date_of_appointment: formatToday(),
    type_holter: "",
    diagnosis,
    age,
    gender,
    underlying: "",
    underlying_others: "",
    hours_recording: "",
    ecg_channel: "",
    emr_technical_report: "",
    final_report: "",
    graf_1: null,
    graf_2: null
  });

  useEffect(() => {
    setValues(v => ({
      ...v,
      diagnosis: patient?.icd ?? patient?.diagnosis ?? "-",
      age: patient?.age ?? "-",
      gender: patient?.sex || patient?.gender || "-"
    }));
  }, [patient]);

  const onChange = (name, value) => {
    setValues(v => ({ ...v, [name]: value }));
  };

  const handleAction = (type) => {
    if (type === "back") onBack?.();
  };

  const HOLTER_SCHEMA = {
    title: "HOLTER",
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
            name: "type_holter",
            label: "TYPE OF HOLTER",
            type: "radio",
            options: TYPE_HOLTER_OPTIONS,
            labelAbove: true
          },
          {
            type: "row",
            fields: [
              { name: "diagnosis", label: "DIAGNOSIS (Grouping ICD)", type: "input", readOnly: true },
              { name: "age", label: "AGE", type: "input", readOnly: true },
              { name: "gender", label: "GENDER", type: "input", readOnly: true }
            ]
          },
          {
            name: "underlying",
            label: "UNDERLYING",
            type: "radio",
            options: UNDERLYING_OPTIONS
          },
          {
            name: "underlying_others",
            label: "Specify Other",
            type: "input",
            placeholder: "Free text",
            showIf: { field: "underlying", equals: "others" }
          },
          {
            name: "hours_recording",
            label: "HOURS RECORDING",
            type: "radio",
            options: HOURS_RECORDING_OPTIONS
          },
          {
            name: "ecg_channel",
            label: "ECG CHANNEL",
            type: "radio",
            options: ECG_CHANNEL_OPTIONS
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
      schema={HOLTER_SCHEMA}
      values={values}
      onChange={onChange}
      onAction={handleAction}
    />
  );
}
