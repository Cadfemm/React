import React, { useState, useEffect } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

/* ================= STYLES (match PT/Neuro FormBuilder) ================= */
const mainContent = {};

const section = { marginBottom: 24 };

const patientGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 12,
  fontSize: 14,
  color: "#0F172A"
};

const submitRow = {
  display: "flex",
  justifyContent: "flex-end",
  marginTop: 20,
  paddingTop: 16,
  borderTop: "1px solid #e5e7eb"
};

const submitBtn = {
  padding: "12px 32px",
  background: "#2563EB",
  color: "#fff",
  border: "none",
  borderRadius: 10,
  fontSize: 15,
  fontWeight: 700,
  cursor: "pointer"
};

const t = (text, lang) => {
  if (!text) return "";
  if (typeof text === "string" || typeof text === "number") return text;
  if (typeof text === "object" && text !== null && !Array.isArray(text)) return text[lang] || text.en || "";
  return String(text);
};

const XRAY_OPTIONS = [
  { value: "abdomen", label: { en: "Abdomen", ms: "Abdomen" } },
  { value: "chest", label: { en: "Chest", ms: "Dada" } },
  { value: "spine", label: { en: "Spine", ms: "Tulang Belakang" } },
  { value: "skull", label: { en: "Skull", ms: "Tengkorak" } },
  { value: "pelvis", label: { en: "Pelvis", ms: "Pelvis" } },
  { value: "extremity", label: { en: "Extremity", ms: "Anggota Badan" } },
  { value: "others", label: { en: "Others", ms: "Lain-lain" } }
];

const SIDE_OPTIONS = [
  { value: "right", label: { en: "Right", ms: "Kanan" } },
  { value: "left", label: { en: "Left", ms: "Kiri" } },
  { value: "bilateral", label: { en: "Bilateral", ms: "Dua Hala" } },
  { value: "na", label: { en: "N/A", ms: "T/A" } }
];

const CLIENT_STATUS_OPTIONS = [
  { value: "walking", label: { en: "Walking", ms: "Berjalan" } },
  { value: "wheel_chair", label: { en: "Wheel Chair", ms: "Kerusi Roda" } },
  { value: "trolly", label: { en: "Trolly", ms: "Troli" } }
];

const DOCTOR_OPTIONS = [
  { value: "dr_faez", label: { en: "Dr.Faez", ms: "Dr.Faez" } },
  { value: "dr_afif", label: { en: "Dr.Afif", ms: "Dr.Afif" } },
  { value: "dr_azril", label: { en: "Dr.Azril", ms: "Dr.Azril" } },
  { value: "other", label: { en: "Other", ms: "Lain-lain" } }
];

const RADIOGRAPHER_OPTIONS = [
  { value: "danial", label: { en: "Danial", ms: "Danial" } },
  { value: "others", label: { en: "Others", ms: "Lain-lain" } }
];

const STATUS_OB_PP_OPTIONS = [
  { value: "refer_hospital", label: { en: "Refer Hospital", ms: "Rujuk ke Hospital" } },
  { value: "monitoring_ward", label: { en: "Monitoring at Ward", ms: "Pemantauan di Wad" } },
  { value: "monitoring_daycare", label: { en: "Monitory at Day Care", ms: "Pemantauan di Day Care" } },
  { value: "nil", label: { en: "Nil", ms: "Tiada" } },
  { value: "others", label: { en: "Others", ms: "Lain-lain" } }
];

const WARD_OPTIONS = [
  { value: "tsw", label: { en: "TSW", ms: "TSW" } },
  { value: "dpw", label: { en: "DPW", ms: "DPW" } },
  { value: "premier_ward", label: { en: "Premier Ward", ms: "Wad Premier" } },
  { value: "out_patient", label: { en: "Out Patient", ms: "Pesakit Luar" } }
];

const BASIC_REPORT_OPTIONS = [
  { value: "normal", label: { en: "Normal", ms: "Normal" } },
  { value: "abnormal", label: { en: "Abnormal", ms: "Tidak Normal" } }
];

const PROBLEM_CLIENT_POSITION_OPTIONS = [
  { value: "cannot_move", label: { en: "Cannot Move", ms: "Tidak Boleh Bergerak" } },
  { value: "cannot_turn", label: { en: "Cannot Turn", ms: "Tidak Boleh Berpaling" } },
  { value: "moving", label: { en: "Moving", ms: "Bergerak" } },
  { value: "foreign_body", label: { en: "Foreign Body", ms: "Benda Asing" } }
];

const CHARGING_OPTIONS = [
  { value: "abdomen_rm60", label: { en: "Abdomen RM60", ms: "Abdomen RM60" } },
  { value: "chest_rm60", label: { en: "Chest RM 60", ms: "Dada RM 60" } },
  { value: "skull_rm90", label: { en: "Skull RM 90", ms: "Tengkorak RM 90" } }
];

const POSITION_OPTIONS = [
  { value: "pa", label: { en: "PA", ms: "PA" } },
  { value: "ap", label: { en: "AP", ms: "AP" } },
  { value: "lateral", label: { en: "Lateral", ms: "Lateral" } },
  { value: "oblique", label: { en: "Oblique", ms: "Oblique" } },
  { value: "others", label: { en: "Others", ms: "Lain-lain" } }
];

const formatDate = (dateStr) => {
  if (!dateStr) return "-";
  const d = typeof dateStr === "string" ? new Date(dateStr) : dateStr;
  return isNaN(d.getTime()) ? "-" : d.toLocaleDateString();
};

const PATIENT_INFO_LABELS = {
  name: { en: "Name", ms: "Nama" },
  id: { en: "Id", ms: "Id" },
  phone: { en: "Phone Number", ms: "Nombor Telefon" },
  timeArrival: { en: "Time Arrival", ms: "Masa Ketibaan" },
  gender: { en: "Gender", ms: "Jantina" },
  birthDate: { en: "Birth Date", ms: "Tarikh Lahir" }
};

function XRayPatientInfo({ patient, language = "en" }) {
  if (!patient) return null;
  const name = patient.name || patient.patient_name || "-";
  const id = patient.id || patient.patient_id || "-";
  const tel = patient.phone || patient.tel || patient.no_tel || "-";
  const sex = patient.sex || patient.gender || "-";
  const dob = patient.dob || patient.birth_date || patient.date_of_birth;
  const timeArrival = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div style={section}>
      <div style={patientGrid}>
        <div><b>{t(PATIENT_INFO_LABELS.name, language)}:</b> {name}</div>
        <div><b>{t(PATIENT_INFO_LABELS.id, language)}:</b> {id}</div>
        <div><b>{t(PATIENT_INFO_LABELS.phone, language)}:</b> {tel}</div>
        <div><b>{t(PATIENT_INFO_LABELS.timeArrival, language)}:</b> {timeArrival}</div>
        <div><b>{t(PATIENT_INFO_LABELS.gender, language)}:</b> {sex}</div>
        <div><b>{t(PATIENT_INFO_LABELS.birthDate, language)}:</b> {formatDate(dob)}</div>
      </div>
    </div>
  );
}

export default function XRayInformationForm({ patient, onBack }) {
  const [language, setLanguage] = useState("en");
  const [values, setValues] = useState({
    xray: "abdomen",
    side: "right",
    position: "pa",
    xray_others: "",
    position_others: "",
    history_from_doctor: "",
    consent_from_client: "",
    client_status: "walking",
    doctor_name: "",
    doctor_others: "",
    radiographer_name: "",
    radiographer_others: "",
    status_ob_pp: "nil",
    status_ob_pp_others: "",
    ward: "",
    lmp_date: "",
    kvp: "",
    mas: "",
    seconds: "",
    xray_image_1: null,
    xray_image_2: null,
    xray_image_3: null,
    xray_image_4: null,
    xray_image_5: null,
    _xray_image_count: "2",
    basic_report: "",
    problem_client_position: "",
    report_from_doctor: "",
    charging: ""
  });

  useEffect(() => {
    if (patient) {
      setValues(v => ({
        ...v,
        history_from_doctor: patient.medical_history || "",
        lmp_date: patient.lmp_date || ""
      }));
    }
  }, [patient]);

  const onChange = (name, value) => {
    setValues(v => ({ ...v, [name]: value }));
  };

  const handleAction = (type) => {
    if (type === "toggle-language") {
      setLanguage(l => (l === "en" ? "ms" : "en"));
    }
    if (type === "back") onBack?.();
    if (type === "add_xray_image") {
      const current = parseInt(values._xray_image_count || "2", 10);
      if (current < 5) {
        onChange("_xray_image_count", String(current + 1));
      }
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const isFemale =
    patient &&
    (String(patient.sex || patient.gender || "").toLowerCase() === "female" ||
     String(patient.sex || patient.gender || "").toLowerCase() === "f");

  const patientAge = patient?.age ? parseInt(patient.age, 10) : NaN;
  const showLmpField = isFemale && !isNaN(patientAge) && patientAge > 8;

  const PATIENT_INFO_SCHEMA = {
    enableLanguageToggle: true,
    title: { en: "Patient Information", ms: "Maklumat Pesakit" },
    sections: []
  };

  /* Single flat section with subheadings - matches Physiotherapy (no nested cards) */
  const XRAY_SCHEMA = {
    enableLanguageToggle: true,
    title: { en: "X-RAY INFORMATION (E-FORM)", ms: "MAKLUMAT X-RAY (E-FORM)" },
    actions: [
      { type: "toggle-language" },
      { type: "back", label: { en: "Back", ms: "Kembali" } }
    ],
    sections: [
      {
        fields: [
          {
            name: "xray",
            label: { en: "XRAY", ms: "XRAY" },
            type: "radio",
            options: XRAY_OPTIONS
          },
          {
            name: "xray_others",
            label: { en: "Specify Other", ms: "Nyatakan Lain-lain" },
            type: "input",
            placeholder: { en: "Enter X-ray type", ms: "Masukkan jenis X-ray" },
            showIf: { field: "xray", equals: "others" }
          },
          {
            name: "side",
            label: { en: "Side of Examination", ms: "Bahagian Pemeriksaan" },
            type: "radio",
            options: SIDE_OPTIONS
          },
          {
            name: "position",
            label: { en: "Position", ms: "Posisi" },
            type: "radio",
            options: POSITION_OPTIONS
          },
          {
            name: "position_others",
            label: { en: "Specify Other", ms: "Nyatakan Lain-lain" },
            type: "input",
            placeholder: { en: "Enter position", ms: "Masukkan posisi" },
            showIf: { field: "position", equals: "others" }
          },
          { type: "subheading", label: { en: "History & Consent", ms: "Sejarah & Persetujuan" } },
          {
            name: "history_from_doctor",
            label: { en: "Medical History from the Doctor", ms: "Sejarah Perubatan dari Doktor" },
            type: "textarea",
            readOnly: true,
            placeholder: { en: "Auto-generated from Customer Service", ms: "Dijana secara automatik daripada Perkhidmatan Pelanggan" }
          },
          {
            name: "consent_from_client",
            label: { en: "Consent from Client", ms: "Persetujuan dari Klien" },
            type: "textarea",
            placeholder: { en: "Enter consent information", ms: "Masukkan maklumat persetujuan" }
          },
          { type: "subheading", label: { en: "Clinical Details", ms: "Butiran Klinikal" } },
          {
            name: "client_status",
            label: { en: "Client Status", ms: "Status Klien" },
            type: "radio",
            options: CLIENT_STATUS_OPTIONS
          },
          {
            name: "doctor_name",
            label: { en: "Doctor Name", ms: "Nama Doktor" },
            type: "radio",
            options: DOCTOR_OPTIONS
          },
          {
            name: "doctor_others",
            label: { en: "Specify Other", ms: "Nyatakan Lain-lain" },
            type: "input",
            placeholder: { en: "Enter doctor name", ms: "Masukkan nama doktor" },
            showIf: { field: "doctor_name", equals: "other" }
          },
          {
            name: "radiographer_name",
            label: { en: "Radiographer Name", ms: "Nama Ahli Radiografi" },
            type: "radio",
            options: RADIOGRAPHER_OPTIONS
          },
          {
            name: "radiographer_others",
            label: { en: "Specify Other", ms: "Nyatakan Lain-lain" },
            type: "input",
            placeholder: { en: "Enter radiographer name", ms: "Masukkan nama ahli radiografi" },
            showIf: { field: "radiographer_name", equals: "others" }
          },
          {
            name: "status_ob_pp",
            label: { en: "Status OB/PP", ms: "Status OB/PP" },
            type: "radio",
            options: STATUS_OB_PP_OPTIONS
          },
          {
            name: "status_ob_pp_others",
            label: { en: "Specify Other", ms: "Nyatakan Lain-lain" },
            type: "input",
            placeholder: { en: "Enter status", ms: "Masukkan status" },
            showIf: { field: "status_ob_pp", equals: "others" }
          },
          {
            name: "ward",
            label: { en: "Ward", ms: "Wad" },
            type: "radio",
            options: WARD_OPTIONS
          },
          ...(showLmpField
            ? [
                {
                  name: "lmp_date",
                  label: { en: "Last Menstrual Date", ms: "Tarikh Haid Terakhir" },
                  type: "date"
                }
              ]
            : []),
          { type: "subheading", label: { en: "Exposure Factor", ms: "Faktor Pendedahan" } },
          {
            type: "row",
            fields: [
              {
                name: "kvp",
                label: { en: "kVp", ms: "kVp" },
                type: "input",
                placeholder: { en: "kVp", ms: "kVp" }
              },
              {
                name: "mas",
                label: { en: "mAs", ms: "mAs" },
                type: "input",
                placeholder: { en: "mAs", ms: "mAs" }
              },
              {
                name: "seconds",
                label: { en: "S (Seconds)", ms: "S (Saat)" },
                type: "input",
                placeholder: { en: "S", ms: "S" }
              }
            ]
          },
          { type: "subheading", label: { en: "XRAY IMAGE UPLOAD", ms: "MUAT NAIK GAMBAR XRAY" } },
          {
            type: "row",
            fields: [
              {
                name: "xray_image_1",
                title: { en: "XRAY IMAGE 1", ms: "GAMBAR XRAY 1" },
                type: "attach-file",
                accept: "image/*,.pdf"
              },
              {
                name: "xray_image_2",
                title: { en: "XRAY IMAGE 2", ms: "GAMBAR XRAY 2" },
                type: "attach-file",
                accept: "image/*,.pdf"
              },
              {
                name: "xray_image_3",
                title: { en: "XRAY IMAGE 3", ms: "GAMBAR XRAY 3" },
                type: "attach-file",
                accept: "image/*,.pdf",
                showIf: { field: "_xray_image_count", oneOf: ["3", "4", "5"] }
              },
              {
                name: "xray_image_4",
                title: { en: "XRAY IMAGE 4", ms: "GAMBAR XRAY 4" },
                type: "attach-file",
                accept: "image/*,.pdf",
                showIf: { field: "_xray_image_count", oneOf: ["4", "5"] }
              },
              {
                name: "xray_image_5",
                title: { en: "XRAY IMAGE 5", ms: "GAMBAR XRAY 5" },
                type: "attach-file",
                accept: "image/*,.pdf",
                showIf: { field: "_xray_image_count", equals: "5" }
              }
            ]
          },
          {
            type: "button",
            label: { en: "ADDED IMAGE FILE (+)", ms: "TAMBAH FAIL GAMBAR (+)" },
            action: "add_xray_image"
          },
          { type: "subheading", label: { en: "Report from Radiographer", ms: "Laporan dari Ahli Radiografi" } },
          {
            name: "basic_report",
            label: { en: "Basic Report", ms: "Laporan Asas" },
            type: "radio",
            options: BASIC_REPORT_OPTIONS
          },
          {
            name: "problem_client_position",
            label: { en: "Problem Client Position", ms: "Masalah Posisi Klien" },
            type: "radio",
            options: PROBLEM_CLIENT_POSITION_OPTIONS
          },
          { type: "subheading", label: { en: "Report from Doctor", ms: "Laporan dari Doktor" } },
          {
            name: "report_from_doctor",
            label: { en: "Report from Doctor", ms: "Laporan dari Doktor" },
            type: "textarea",
            placeholder: { en: "Enter report", ms: "Masukkan laporan" }
          },
          {
            name: "charging",
            label: { en: "Charging", ms: "Caj" },
            type: "single-select",
            options: CHARGING_OPTIONS
          }
        ]
      }
    ]
  };

  return (
    <div style={mainContent} className="xray-form-print">
      {/* Patient Information - from Customer Manager (same as Diet, PT, Neuro) */}
      <div style={{ marginBottom: 24 }}>
        <CommonFormBuilder
          schema={PATIENT_INFO_SCHEMA}
          values={{}}
          onChange={() => {}}
          language={language}
        >
          <XRayPatientInfo patient={patient} language={language} />
        </CommonFormBuilder>
      </div>

      {/* X-Ray Form - using FormBuilder (layout=root for full card styling like PT/Neuro) */}
      <CommonFormBuilder
        schema={XRAY_SCHEMA}
        values={values}
        onChange={onChange}
        onAction={handleAction}
        language={language}
      >
        <div style={submitRow}>
          <button style={submitBtn} onClick={handlePrint} type="button">
            {t({ en: "PRINT", ms: "CETAK" }, language)}
          </button>
        </div>
      </CommonFormBuilder>
    </div>
  );
}

