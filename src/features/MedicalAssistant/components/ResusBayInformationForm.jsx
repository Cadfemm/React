import React, { useState } from "react";
import PatientCard from "../../../shared/cards/PatientCard"
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

const mainContent = {};

/**
 * Resus Bay Information - consolidated VIEW from all related departments.
 * Data is read-only, sourced from patient and departmental records.
 */
export default function ResusBayInformationForm({ patient, onBack }) {
  const [language, setLanguage] = useState("en");
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

  const CLINICAL_ENTRY_SCHEMA = {
    title: "Patient Information",
    sections: []
  }

  const RESUS_BAY_SCHEMA = {
    enableLanguageToggle: true,
    title: "Clinical Entry",
    actions: [
      { type: "toggle-language" },
      { type: "back", label: { en: "Back", ms: "Kembali" } }
    ],
    sections: [
      {
        fields: [
          { 
            name: "aduan", 
            label: { en: "Complaint", ms: "Aduan" }, 
            type: "textarea", 
            readOnly: true 
          },
          { 
            type: "subheading", 
            label: { 
              en: "Vital Signs & Measurements", 
              ms: "Tanda Vital" 
            } 
          },
          {
            type: "row",
            fields: [
              { 
                name: "bp", 
                label: { en: "BP", ms: "BP" }, 
                type: "input", 
              },
              { 
                name: "rr", 
                label: { en: "RR", ms: "RR" }, 
                type: "input", 
              },
              { 
                name: "spo2", 
                label: { en: "SPO2", ms: "SPO2" }, 
                type: "input", 
              },
              { 
                name: "hr", 
                label: { en: "HR", ms: "HR" }, 
                type: "input", 
              },
              { 
                name: "temp", 
                label: { en: "T", ms: "T" }, 
                type: "input", 
              },
              { 
                name: "ps", 
                label: { en: "P/S", ms: "P/S" }, 
                type: "input", 
              }
            ]
          },
          { 
            type: "subheading", 
            label: { 
              en: "Reports", 
              ms: "Laporan" 
            } 
          },
          {
            name: "xray_status",
            label: { en: "X-Ray", ms: "X-Ray" },
            type: "radio",
            options: [
              { 
                value: "non_indicator", 
                label: { en: "Non Indicator", ms: "Tiada Petunjuk" } 
              },
              { 
                value: "done", 
                label: { en: "Done", ms: "Selesai" } 
              }
            ],
            readOnly: true
          },
          {
            name: "xray_result",
            label: { en: "X-Ray Result", ms: "Keputusan X-Ray" },
            type: "textarea",
            placeholder: { en: "X-Ray result", ms: "Keputusan X-Ray" },
            readOnly: true,
            showIf: { field: "xray_status", equals: "done" }
          },
          {
            name: "lab_status",
            label: { en: "Lab Result", ms: "Keputusan Makmal" },
            type: "radio",
            options: [
              { 
                value: "non_indicator", 
                label: { en: "Non Indicator", ms: "Tiada Petunjuk" } 
              },
              { 
                value: "done", 
                label: { en: "Done", ms: "Selesai" } 
              }
            ],
            readOnly: true
          },
          {
            name: "lab_result",
            label: { en: "Lab Result", ms: "KEPUTUSAN MAKMAL" },
            type: "textarea",
            placeholder: { en: "Lab result", ms: "Keputusan makmal" },
            readOnly: true,
            showIf: { field: "lab_status", equals: "done" }
          },
          { 
            type: "subheading", 
            label: { 
              en: "Diagnosis & Status", 
              ms: "Diagnosis & Status" 
            } 
          },
          { 
            name: "diagnosis", 
            label: { en: "Diagnosis", ms: "Diagnosis" }, 
            type: "input", 
            readOnly: true 
          },
          { 
            name: "dirawat_oleh_doktor", 
            label: { en: "Treated by Doctor", ms: "Dirawat Oleh Doktor" }, 
            type: "input", 
            readOnly: true 
          },
          {
            name: "doctor_plan",
            label: { en: "Plan / Management", ms: "Pelan / Pengurusan" },
            type: "textarea",
            readOnly: true
          },
          { 
            name: "others", 
            label: { en: "Others", ms: "Lain-Lain" }, 
            type: "textarea", 
            readOnly: true 
          }
        ]
      }
    ]
  };

  const handleAction = (type) => {
    if (type === "toggle-language") {
      setLanguage(l => (l === "en" ? "ms" : "en"));
    }
    if (type === "back") onBack?.();
  };

  return (
    <div style={mainContent}>
      <CommonFormBuilder
        schema={CLINICAL_ENTRY_SCHEMA}
        values={{}}
        onChange={()=>{}}
      >
        <PatientCard patient={patient}/>
        <button style={doctorsReportBtn}>
          Doctors Reports
        </button>
      </CommonFormBuilder>
      <CommonFormBuilder
        schema={RESUS_BAY_SCHEMA}
        values={values}
        onChange={() => {}}
        onAction={handleAction}
        language={language}
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

const doctorsReportBtn = {
  padding: "10px 20px",
  background: "#2563EB",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  fontSize: 14,
  fontWeight: 600,
  cursor: "pointer",
  marginTop: 8
};
