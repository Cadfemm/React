import React, { useState, useEffect } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

const mainContent = {};

const PP_OB_OPTIONS = [
  { value: "in_patient", label: { en: "In Patient", ms: "Pesakit Dalam" } },
  { value: "out_patient", label: { en: "Out Patient", ms: "Pesakit Luar" } }
];

const LAB_OPTIONS = [
  { value: "inhouse", label: { en: "Inhouse", ms: "Dalam Rumah" } },
  { value: "out_source", label: { en: "Out source", ms: "Sumber Luar" } }
];

const DOCTOR_OPTIONS = [
  { value: "dr_afif", label: { en: "Dr. Afif", ms: "Dr. Afif" } },
  { value: "dr_faez", label: { en: "Dr. Faez", ms: "Dr. Faez" } },
  { value: "dr_azril", label: { en: "Dr. Azril", ms: "Dr. Azril" } }
];

const LOCATION_OPTIONS = [
  { value: "tsw", label: { en: "TSW", ms: "TSW" } },
  { value: "dpw", label: { en: "DPW", ms: "DPW" } },
  { value: "premier_clinic", label: { en: "Premier Clinic", ms: "Klinik Premier" } },
  { value: "general_clinic", label: { en: "General Clinic", ms: "Klinik Am" } },
  { value: "premier_ward", label: { en: "Premier Ward", ms: "Wad Premier" } },
  { value: "general_ward", label: { en: "General ward", ms: "Wad Am" } },
  { value: "cvw", label: { en: "CVW", ms: "CVW" } },
  { value: "hb3", label: { en: "HB3", ms: "HB3" } }
];

const MEAL_OPTIONS = [
  { value: "fasting", label: { en: "Fasting", ms: "Berpuasa" } },
  { value: "non_fasting", label: { en: "Non Fasting", ms: "Tidak Berpuasa" } }
];

const PROFILE_TEST_OPTIONS = [
  { value: "rft", label: { en: "RFT", ms: "RFT" } },
  { value: "cbc", label: { en: "CBC", ms: "CBC" } },
  { value: "tft", label: { en: "TFT", ms: "TFT" } },
  { value: "rp", label: { en: "RP", ms: "RP" } },
  { value: "bmp", label: { en: "BMP", ms: "BMP" } },
  { value: "lp", label: { en: "LP", ms: "LP" } },
  { value: "others", label: { en: "Others", ms: "Lain-lain" } }
];

const BIOCHEMISTRY_OPTIONS = [
  { value: "hba1c", label: { en: "HbA1c", ms: "HbA1c" } },
  { value: "psa", label: { en: "PSA", ms: "PSA" } },
  { value: "hiv", label: { en: "HIV 1&2", ms: "HIV 1&2" } },
  { value: "afp", label: { en: "AFP", ms: "AFP" } },
  { value: "cea", label: { en: "CEA", ms: "CEA" } },
  { value: "others", label: { en: "Others", ms: "Lain-lain" } }
];

const HEMATOLOGY_OPTIONS = [
  { value: "fbc", label: { en: "FBC", ms: "FBC" } },
  { value: "hb", label: { en: "HB", ms: "HB" } },
  { value: "esr", label: { en: "ESR", ms: "ESR" } },
  { value: "others", label: { en: "Others", ms: "Lain-lain" } }
];

const MICROBIOLOGY_OPTIONS = [
  { value: "ufeme", label: { en: "UFEME", ms: "UFEME" } },
  { value: "urine_cs", label: { en: "Urine C&S", ms: "Urin C&S" } },
  { value: "microscopy", label: { en: "Microscopy", ms: "Mikroskopi" } },
  { value: "others", label: { en: "OTHERS", ms: "LAIN-LAIN" } }
];

const SPECIMEN_OPTIONS = [
  { value: "sputum", label: { en: "Sputum", ms: "Kahak" } },
  { value: "faeces", label: { en: "Faeces", ms: "Najis" } },
  { value: "others", label: { en: "OTHERS", ms: "LAIN-LAIN" } }
];

const NOTIFY_DOCTOR_OPTIONS = [
  { value: "yes", label: { en: "Yes", ms: "Ya" } },
  { value: "no", label: { en: "No", ms: "Tidak" } }
];

const formatDate = (d) => {
  if (!d) return "-";
  const x = typeof d === "string" ? new Date(d) : d;
  return isNaN(x.getTime()) ? "-" : x.toLocaleDateString();
};

export default function LabRequestForm({ patient, onBack }) {
  const [language, setLanguage] = useState("en");
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
    enableLanguageToggle: true,
    title: { en: "Lab Request Form", ms: "Borang Permintaan Makmal" },
    actions: [
      { type: "toggle-language" },
      { type: "back", label: { en: "Back", ms: "Kembali" } }
    ],
    sections: [
      {
        fields: [
          { type: "subheading", label: { en: "Sample details", ms: "Butiran sampel" } },
          { name: "pp_ob", label: { en: "PP/OB", ms: "PP/OB" }, type: "radio", options: PP_OB_OPTIONS },
          { name: "lab", label: { en: "LAB", ms: "MAKMAL" }, type: "radio", options: LAB_OPTIONS },
          { type: "subheading", label: { en: "Requester details", ms: "Butiran pemohon" } },
          { name: "requester_name", label: { en: "Name", ms: "Nama" }, type: "single-select", options: DOCTOR_OPTIONS },
          { name: "requester_telephone", label: { en: "Telephone number", ms: "Nombor telefon" }, type: "input", placeholder: { en: "Enter telephone", ms: "Masukkan nombor telefon" } },
          { name: "location", label: { en: "LOCATION", ms: "LOKASI" }, type: "single-select", options: LOCATION_OPTIONS },
          {
            type: "row",
            fields: [
              { name: "requester_date", label: { en: "DATE", ms: "TARIKH" }, type: "date" },
              { name: "requester_time", label: { en: "TIME", ms: "MASA" }, type: "input", placeholder: { en: "HH:MM", ms: "HH:MM" } }
            ]
          },
          { type: "subheading", label: { en: "Patient Details", ms: "Butiran Pesakit" } },
          { name: "patient_name", label: { en: "Name", ms: "Nama" }, type: "input", readOnly: true, placeholder: { en: "Auto-generated from Customer Service", ms: "Dijana secara automatik daripada Perkhidmatan Pelanggan" } },
          { name: "patient_address", label: { en: "Address", ms: "Alamat" }, type: "input", readOnly: true, placeholder: { en: "Auto-generated from Customer Service (residence)", ms: "Dijana secara automatik daripada Perkhidmatan Pelanggan (tempat tinggal)" } },
          { name: "patient_dob", label: { en: "Date of Birth", ms: "Tarikh Lahir" }, type: "input", readOnly: true, placeholder: { en: "Auto-generated from Customer Service", ms: "Dijana secara automatik daripada Perkhidmatan Pelanggan" } },
          { name: "patient_gender", label: { en: "Gender", ms: "Jantina" }, type: "input", readOnly: true, placeholder: { en: "Auto-generated from Customer Service", ms: "Dijana secara automatik daripada Perkhidmatan Pelanggan" } },
          { name: "meal", label: { en: "MEAL", ms: "MAKANAN" }, type: "radio", options: MEAL_OPTIONS },
          { type: "subheading", label: { en: "Profile test", ms: "Ujian profil" } },
          {
            name: "profile_test",
            label: "",
            type: "checkbox-group",
            inlineWithLabel: true,
            options: PROFILE_TEST_OPTIONS
          },
          {
            name: "profile_test_others",
            label: { en: "Specify Other", ms: "Nyatakan Lain-lain" },
            type: "input",
            placeholder: { en: "Enter details", ms: "Masukkan butiran" },
            showIf: { field: "profile_test", includes: "others" }
          },
          { type: "subheading", label: { en: "Biochemistry", ms: "Biokimia" } },
          {
            name: "biochemistry",
            label: "",
            type: "checkbox-group",
            inlineWithLabel: true,
            options: BIOCHEMISTRY_OPTIONS
          },
          {
            name: "biochemistry_others",
            label: { en: "Specify Other", ms: "Nyatakan Lain-lain" },
            type: "input",
            placeholder: { en: "Enter details", ms: "Masukkan butiran" },
            showIf: { field: "biochemistry", includes: "others" }
          },
          { type: "subheading", label: { en: "Hematology", ms: "Hematologi" } },
          {
            name: "hematology",
            label: "",
            type: "checkbox-group",
            inlineWithLabel: true,
            options: HEMATOLOGY_OPTIONS
          },
          {
            name: "hematology_others",
            label: { en: "Specify Other", ms: "Nyatakan Lain-lain" },
            type: "input",
            placeholder: { en: "Enter details", ms: "Masukkan butiran" },
            showIf: { field: "hematology", includes: "others" }
          },
          { type: "subheading", label: { en: "Microbiology", ms: "Mikrobiologi" } },
          {
            name: "microbiology",
            label: "",
            type: "checkbox-group",
            inlineWithLabel: true,
            options: MICROBIOLOGY_OPTIONS
          },
          {
            name: "microbiology_others",
            label: { en: "Specify Other", ms: "Nyatakan Lain-lain" },
            type: "input",
            placeholder: { en: "Enter details", ms: "Masukkan butiran" },
            showIf: { field: "microbiology", includes: "others" }
          },
          { type: "subheading", label: { en: "Specimen", ms: "Spesimen" } },
          {
            name: "specimen",
            label: "",
            type: "checkbox-group",
            inlineWithLabel: true,
            options: SPECIMEN_OPTIONS
          },
          {
            name: "specimen_others",
            label: { en: "Specify Other", ms: "Nyatakan Lain-lain" },
            type: "input",
            placeholder: { en: "Enter details", ms: "Masukkan butiran" },
            showIf: { field: "specimen", includes: "others" }
          },
          { name: "others", label: { en: "OTHERS", ms: "LAIN-LAIN" }, type: "textarea", placeholder: { en: "Free text", ms: "Teks bebas" } },
          {
            name: "result_upload",
            title: { en: "UPLOAD THE RESULT", ms: "MUAT NAIK KEPUTUSAN" },
            type: "attach-file",
            accept: "image/*,.pdf"
          },
          { name: "notify_doctor", label: { en: "NOTIFY DOCTOR", ms: "MAKLUMKAN DOKTOR" }, type: "radio", options: NOTIFY_DOCTOR_OPTIONS }
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
        schema={LAB_SCHEMA}
        values={values}
        onChange={onChange}
        onAction={handleAction}
        language={language}
      />
    </div>
  );
}
