import React from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

const mainContent = {};

/**
 * Resus Bay Information - consolidated VIEW from all related departments.
 * Data is read-only, sourced from patient and departmental records.
 */
export default function ResusBayInformationForm({ patient, onBack }) {
  const name = patient?.name || patient?.patient_name || "-";
  const ic = patient?.ic || patient?.ic_no || patient?.id || "-";
  const age = patient?.age ?? "-";
  const cm = patient?.case_manager || patient?.cm || patient?.medical_record_no || patient?.id || "-";
  const aduan = patient?.complaint || patient?.medical_history || patient?.diagnosis_history || "-";

  const vitals = {
    bp: patient?.vitals?.bp || patient?.bp || "-",
    rr: patient?.vitals?.rr || patient?.rr || "-",
    spo2: patient?.vitals?.spo2 || patient?.spo2 || "-",
    hr: patient?.vitals?.hr || patient?.pulse || patient?.hr || "-",
    temp: patient?.vitals?.temp || patient?.temp || "-",
    ps: patient?.vitals?.ps || patient?.ps || "-"
  };

  const xrayStatus = patient?.xray_status || "non_indicator";
  const xrayResult = patient?.xray_result || "";
  const labStatus = patient?.lab_status || "non_indicator";
  const labResult = patient?.lab_result || "";
  const doctorPlan = patient?.doctor_plan || patient?.report_from_doctor || "";
  const diagnosis = patient?.diagnosis || patient?.diagnosis_history || "";
  const dirawatOlehDoktor = patient?.treated_by_doctor || patient?.doctor_name || "";
  const statusObPp = patient?.status_ob_pp || "";
  const others = patient?.resus_others || "";

  const values = {
    nama: name,
    ic,
    umur: age,
    cm,
    aduan,
    bp: vitals.bp,
    rr: vitals.rr,
    spo2: vitals.spo2,
    hr: vitals.hr,
    temp: vitals.temp,
    ps: vitals.ps,
    xray_status: xrayStatus,
    xray_result: xrayResult,
    lab_status: labStatus,
    lab_result: labResult,
    doctor_plan: doctorPlan,
    diagnosis,
    dirawat_oleh_doktor: dirawatOlehDoktor,
    status_ob_pp: statusObPp,
    others
  };

  const RESUS_BAY_SCHEMA = {
    title: "RESUS BAY INFORMATION",
    actions: [{ type: "back", label: "Back" }],
    sections: [
      {
        fields: [
          { type: "subheading", label: "Patient Identification" },
          { name: "nama", label: "NAMA", type: "input", readOnly: true },
          { name: "ic", label: "IC", type: "input", readOnly: true },
          { name: "umur", label: "UMUR", type: "input", readOnly: true },
          { name: "cm", label: "CM", type: "input", readOnly: true },
          { name: "aduan", label: "ADUAN", type: "textarea", readOnly: true },
          { type: "subheading", label: "TANDA VITAL (Vital Signs & Measurements)" },
          {
            type: "row",
            fields: [
              { name: "bp", label: "BP", type: "input", readOnly: true },
              { name: "rr", label: "RR", type: "input", readOnly: true },
              { name: "spo2", label: "SPO2", type: "input", readOnly: true },
              { name: "hr", label: "HR", type: "input", readOnly: true },
              { name: "temp", label: "T", type: "input", readOnly: true },
              { name: "ps", label: "P/S", type: "input", readOnly: true }
            ]
          },
          { type: "subheading", label: "Reports" },
          {
            name: "xray_status",
            label: "XRAY",
            type: "radio",
            options: [
              { value: "non_indicator", label: "Non Indicator" },
              { value: "done", label: "Done" }
            ],
            readOnly: true
          },
          {
            name: "xray_result",
            label: "RESULT XRAY",
            type: "textarea",
            placeholder: "X-Ray result",
            readOnly: true,
            showIf: { field: "xray_status", equals: "done" }
          },
          {
            name: "lab_status",
            label: "LAB RESULT",
            type: "radio",
            options: [
              { value: "non_indicator", label: "Non Indicator" },
              { value: "done", label: "Done" }
            ],
            readOnly: true
          },
          {
            name: "lab_result",
            label: "RESULT LAB",
            type: "textarea",
            placeholder: "Lab result",
            readOnly: true,
            showIf: { field: "lab_status", equals: "done" }
          },
          {
            name: "doctor_plan",
            label: "DOCTOR PLAN / MANAGEMENT",
            type: "textarea",
            readOnly: true
          },
          { type: "subheading", label: "Diagnosis & Status" },
          { name: "diagnosis", label: "DIAGNOSIS", type: "input", readOnly: true },
          { name: "dirawat_oleh_doktor", label: "DIRAWAT OLEH DOKTOR", type: "input", readOnly: true },
          { name: "status_ob_pp", label: "STATUS OB/PP", type: "input", readOnly: true },
          { name: "others", label: "OTHERS", type: "textarea", readOnly: true }
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
        schema={RESUS_BAY_SCHEMA}
        values={values}
        onChange={() => {}}
        onAction={handleAction}
      >
        <div style={{ textAlign: "right", marginTop: -40, marginBottom: 20 }}>
          <span
            style={{
              color: "#0050ff",
              fontSize: 13,
              cursor: "pointer",
              fontWeight: 600
            }}
            onClick={() => typeof window?.openVitals === "function" && window.openVitals(patient)}
          >
            Know more →
          </span>
        </div>
      </CommonFormBuilder>
    </div>
  );
}
