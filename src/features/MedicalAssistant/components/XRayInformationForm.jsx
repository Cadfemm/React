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

const XRAY_OPTIONS = [
  { value: "abdomen", label: "Abdomen" },
  { value: "chest", label: "Chest" },
  { value: "spine", label: "Spine" },
  { value: "skull", label: "Skull" },
  { value: "pelvis", label: "Pelvis" },
  { value: "extremity", label: "Extremity" },
  { value: "others", label: "Others" }
];

const SIDE_OPTIONS = [
  { value: "right", label: "Right" },
  { value: "left", label: "Left" },
  { value: "bilateral", label: "Bilateral" },
  { value: "na", label: "N/A" }
];

const CLIENT_STATUS_OPTIONS = [
  { value: "walking", label: "Walking" },
  { value: "wheel_chair", label: "Wheel Chair" },
  { value: "trolly", label: "Trolly" }
];

const DOCTOR_OPTIONS = [
  { value: "dr_faez", label: "Dr.Faez" },
  { value: "dr_afif", label: "Dr.Afif" },
  { value: "dr_azril", label: "Dr.Azril" },
  { value: "other", label: "Other" }
];

const RADIOGRAPHER_OPTIONS = [
  { value: "danial", label: "Danial" },
  { value: "others", label: "Others" }
];

const STATUS_OB_PP_OPTIONS = [
  { value: "refer_hospital", label: "Refer Hospital" },
  { value: "monitoring_ward", label: "Monitoring at Ward" },
  { value: "monitoring_daycare", label: "Monitory at Day Care" },
  { value: "nil", label: "Nil" },
  { value: "others", label: "Others" }
];

const WARD_OPTIONS = [
  { value: "tsw", label: "TSW" },
  { value: "dpw", label: "DPW" },
  { value: "premier_ward", label: "Premier Ward" },
  { value: "out_patient", label: "Out Patient" }
];

const BASIC_REPORT_OPTIONS = [
  { value: "normal", label: "Normal" },
  { value: "abnormal", label: "Abnormal" }
];

const PROBLEM_CLIENT_POSITION_OPTIONS = [
  { value: "cannot_move", label: "Cannot Move" },
  { value: "cannot_turn", label: "Cannot Turn" },
  { value: "moving", label: "Moving" },
  { value: "foreign_body", label: "Foreign Body" }
];

const CHARGING_OPTIONS = [
  { value: "abdomen_rm60", label: "Abdomen RM60" },
  { value: "chest_rm60", label: "Chest RM 60" },
  { value: "skull_rm90", label: "Skull RM 90" }
];

const POSITION_OPTIONS = [
  { value: "pa", label: "PA" },
  { value: "ap", label: "AP" },
  { value: "lateral", label: "Lateral" },
  { value: "oblique", label: "Oblique" },
  { value: "others", label: "Others" }
];

const formatDate = (dateStr) => {
  if (!dateStr) return "-";
  const d = typeof dateStr === "string" ? new Date(dateStr) : dateStr;
  return isNaN(d.getTime()) ? "-" : d.toLocaleDateString();
};

function XRayPatientInfo({ patient }) {
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
        <div><b>Name:</b> {name}</div>
        <div><b>Id:</b> {id}</div>
        <div><b>Phone Number:</b> {tel}</div>
        <div><b>Time Arrival:</b> {timeArrival}</div>
        <div><b>Gender:</b> {sex}</div>
        <div><b>Birth Date:</b> {formatDate(dob)}</div>
      </div>
    </div>
  );
}

export default function XRayInformationForm({ patient, onBack }) {
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
    title: "Patient Information",
    sections: []
  };

  /* Single flat section with subheadings - matches Physiotherapy (no nested cards) */
  const XRAY_SCHEMA = {
    title: "X-RAY INFORMATION (E-FORM)",
    actions: [
      { type: "back", label: "Back" }
    ],
    sections: [
      {
        fields: [
          {
            name: "xray",
            label: "XRAY",
            type: "radio",
            options: XRAY_OPTIONS
          },
          {
            name: "xray_others",
            label: "Specify Other",
            type: "input",
            placeholder: "Enter X-ray type",
            showIf: { field: "xray", equals: "others" }
          },
          {
            name: "side",
            label: "Side of Examination",
            type: "radio",
            options: SIDE_OPTIONS
          },
          {
            name: "position",
            label: "Position",
            type: "radio",
            options: POSITION_OPTIONS
          },
          {
            name: "position_others",
            label: "Specify Other",
            type: "input",
            placeholder: "Enter position",
            showIf: { field: "position", equals: "others" }
          },
          { type: "subheading", label: "History & Consent" },
          {
            name: "history_from_doctor",
            label: "Medical History from the Doctor",
            type: "textarea",
            readOnly: true,
            placeholder: "Auto-generated from Customer Service"
          },
          {
            name: "consent_from_client",
            label: "Consent from Client",
            type: "textarea",
            placeholder: "Enter consent information"
          },
          { type: "subheading", label: "Clinical Details" },
          {
            name: "client_status",
            label: "Client Status",
            type: "radio",
            options: CLIENT_STATUS_OPTIONS
          },
          {
            name: "doctor_name",
            label: "Doctor Name",
            type: "radio",
            options: DOCTOR_OPTIONS
          },
          {
            name: "doctor_others",
            label: "Specify Other",
            type: "input",
            placeholder: "Enter doctor name",
            showIf: { field: "doctor_name", equals: "other" }
          },
          {
            name: "radiographer_name",
            label: "Radiographer Name",
            type: "radio",
            options: RADIOGRAPHER_OPTIONS
          },
          {
            name: "radiographer_others",
            label: "Specify Other",
            type: "input",
            placeholder: "Enter radiographer name",
            showIf: { field: "radiographer_name", equals: "others" }
          },
          {
            name: "status_ob_pp",
            label: "Status OB/PP",
            type: "radio",
            options: STATUS_OB_PP_OPTIONS
          },
          {
            name: "status_ob_pp_others",
            label: "Specify Other",
            type: "input",
            placeholder: "Enter status",
            showIf: { field: "status_ob_pp", equals: "others" }
          },
          {
            name: "ward",
            label: "Ward",
            type: "radio",
            options: WARD_OPTIONS
          },
          ...(showLmpField
            ? [
                {
                  name: "lmp_date",
                  label: "Last Menstrual Date",
                  type: "date"
                }
              ]
            : []),
          { type: "subheading", label: "Exposure Factor" },
          {
            type: "row",
            fields: [
              {
                name: "kvp",
                label: "kVp",
                type: "input",
                placeholder: "kVp"
              },
              {
                name: "mas",
                label: "mAs",
                type: "input",
                placeholder: "mAs"
              },
              {
                name: "seconds",
                label: "S (Seconds)",
                type: "input",
                placeholder: "S"
              }
            ]
          },
          { type: "subheading", label: "XRAY IMAGE UPLOAD" },
          {
            type: "row",
            fields: [
              {
                name: "xray_image_1",
                title: "XRAY IMAGE 1",
                type: "attach-file",
                accept: "image/*,.pdf"
              },
              {
                name: "xray_image_2",
                title: "XRAY IMAGE 2",
                type: "attach-file",
                accept: "image/*,.pdf"
              },
              {
                name: "xray_image_3",
                title: "XRAY IMAGE 3",
                type: "attach-file",
                accept: "image/*,.pdf",
                showIf: { field: "_xray_image_count", oneOf: ["3", "4", "5"] }
              },
              {
                name: "xray_image_4",
                title: "XRAY IMAGE 4",
                type: "attach-file",
                accept: "image/*,.pdf",
                showIf: { field: "_xray_image_count", oneOf: ["4", "5"] }
              },
              {
                name: "xray_image_5",
                title: "XRAY IMAGE 5",
                type: "attach-file",
                accept: "image/*,.pdf",
                showIf: { field: "_xray_image_count", equals: "5" }
              }
            ]
          },
          {
            type: "button",
            label: "ADDED IMAGE FILE (+)",
            action: "add_xray_image"
          },
          { type: "subheading", label: "Report from Radiographer" },
          {
            name: "basic_report",
            label: "Basic Report",
            type: "radio",
            options: BASIC_REPORT_OPTIONS
          },
          {
            name: "problem_client_position",
            label: "Problem Client Position",
            type: "radio",
            options: PROBLEM_CLIENT_POSITION_OPTIONS
          },
          { type: "subheading", label: "Report from Doctor" },
          {
            name: "report_from_doctor",
            label: "Report from Doctor",
            type: "textarea",
            placeholder: "Enter report"
          },
          {
            name: "charging",
            label: "Charging",
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
        >
          <XRayPatientInfo patient={patient} />
        </CommonFormBuilder>
      </div>

      {/* X-Ray Form - using FormBuilder (layout=root for full card styling like PT/Neuro) */}
      <CommonFormBuilder
        schema={XRAY_SCHEMA}
        values={values}
        onChange={onChange}
        onAction={handleAction}
      >
        <div style={submitRow}>
          <button style={submitBtn} onClick={handlePrint} type="button">
            PRINT
          </button>
        </div>
      </CommonFormBuilder>
    </div>
  );
}

