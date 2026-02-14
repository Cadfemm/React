import React, { useState } from "react";
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

  const RESUS_BAY_SCHEMA = {
    enableLanguageToggle: true,
    title: {
      en: "RESUS BAY INFORMATION",
      ms: "MAKLUMAT BAY RESUS"
    },
    actions: [
      { type: "toggle-language" },
      { type: "back", label: { en: "Back", ms: "Kembali" } }
    ],
    sections: [
      {
        fields: [
          { 
            type: "subheading", 
            label: { 
              en: "Patient Identification", 
              ms: "Pengenalan Pesakit" 
            } 
          },
          { 
            name: "nama", 
            label: { en: "Name", ms: "NAMA" }, 
            type: "input", 
            readOnly: true 
          },
          { 
            name: "ic", 
            label: { en: "IC", ms: "IC" }, 
            type: "input", 
            readOnly: true 
          },
          { 
            name: "umur", 
            label: { en: "Age", ms: "UMUR" }, 
            type: "input", 
            readOnly: true 
          },
          { 
            name: "cm", 
            label: { en: "CM", ms: "CM" }, 
            type: "input", 
            readOnly: true 
          },
          { 
            name: "aduan", 
            label: { en: "Complaint", ms: "ADUAN" }, 
            type: "textarea", 
            readOnly: true 
          },
          { 
            type: "subheading", 
            label: { 
              en: "Vital Signs & Measurements", 
              ms: "TANDA VITAL" 
            } 
          },
          {
            type: "row",
            fields: [
              { 
                name: "bp", 
                label: { en: "BP", ms: "BP" }, 
                type: "input", 
                readOnly: true 
              },
              { 
                name: "rr", 
                label: { en: "RR", ms: "RR" }, 
                type: "input", 
                readOnly: true 
              },
              { 
                name: "spo2", 
                label: { en: "SPO2", ms: "SPO2" }, 
                type: "input", 
                readOnly: true 
              },
              { 
                name: "hr", 
                label: { en: "HR", ms: "HR" }, 
                type: "input", 
                readOnly: true 
              },
              { 
                name: "temp", 
                label: { en: "T", ms: "T" }, 
                type: "input", 
                readOnly: true 
              },
              { 
                name: "ps", 
                label: { en: "P/S", ms: "P/S" }, 
                type: "input", 
                readOnly: true 
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
            label: { en: "X-Ray", ms: "X-RAY" },
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
            label: { en: "X-Ray Result", ms: "KEPUTUSAN X-RAY" },
            type: "textarea",
            placeholder: { en: "X-Ray result", ms: "Keputusan X-Ray" },
            readOnly: true,
            showIf: { field: "xray_status", equals: "done" }
          },
          {
            name: "lab_status",
            label: { en: "Lab Result", ms: "KEPUTUSAN MAKMAL" },
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
            name: "doctor_plan",
            label: { en: "Doctor Plan / Management", ms: "PELAN DOKTOR / PENGURUSAN" },
            type: "textarea",
            readOnly: true
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
            label: { en: "Diagnosis", ms: "DIAGNOSIS" }, 
            type: "input", 
            readOnly: true 
          },
          { 
            name: "dirawat_oleh_doktor", 
            label: { en: "Treated by Doctor", ms: "DIRAWAT OLEH DOKTOR" }, 
            type: "input", 
            readOnly: true 
          },
          { 
            name: "status_ob_pp", 
            label: { en: "Status OB/PP", ms: "STATUS OB/PP" }, 
            type: "input", 
            readOnly: true 
          },
          { 
            name: "others", 
            label: { en: "Others", ms: "LAIN-LAIN" }, 
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
