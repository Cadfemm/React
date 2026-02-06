import React, { useState, useEffect } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

const mainContent = {};

const KONDISI_OB_OPTIONS = [
  { value: "wheel_chair", label: "Wheel Chair" },
  { value: "bed_ridden", label: "Bed Ridden" },
  { value: "walk_with_aid", label: "Walk with Walking Aid" },
  { value: "others", label: "Others" }
];

const AMBULATORY_AID_OPTIONS = [
  { value: "walking_stick", label: "Walking Stick" },
  { value: "quadripod", label: "Quadripod" },
  { value: "crutches", label: "Crutches" },
  { value: "no_aid", label: "No Ambulatory Aid" },
  { value: "others", label: "Others" }
];

const BOOKING_LOCATION_OPTIONS = [
  { value: "tsw", label: "TSW" },
  { value: "dpw", label: "DPW" },
  { value: "premier_clinic", label: "Premier Clinic" },
  { value: "general_clinic", label: "General Clinic" },
  { value: "general_ward", label: "General Ward" },
  { value: "premier_ward", label: "Premier Ward" },
  { value: "others", label: "Others" }
];

const JENIS_KES_OPTIONS = [
  { value: "non_urgent", label: "Non Urgent Case" },
  { value: "urgent", label: "Urgent Case" },
  { value: "others", label: "Others" }
];

const TRIP_OPTIONS = [
  { value: "sehala", label: "Sehala" },
  { value: "dua_hala", label: "Dua hala" }
];

const OTHER_APPOINTMENT_OPTIONS = [
  { value: "cancel_half_day", label: "Cancel Half Day" },
  { value: "cancel_full_day", label: "Cancel Full Day" }
];

const PERALATAN_MAIN_OPTIONS = [
  { value: "portable_ventilator", label: "PORTABLE VENTILATOR (WEINNMANN) -TYPE A SAHAJA-" },
  { value: "aed_nihon_kohden", label: "AED NIHON KOHDEN" },
  { value: "suction", label: "SUCTION" },
  { value: "responder_bag", label: "RESPONDER BAG" },
  { value: "syringe_pump", label: "SYRINGE PUMP" },
  { value: "cervical_collar_kit", label: "CERVICAL COLLAR KIT" },
  { value: "emergency_oxygen_bag", label: "EMERGENCY OXYGEN BAG (HIJAU)" },
  { value: "oxygen_bag", label: "OXYGEN BAG" },
  { value: "foldable_wheelchair", label: "FOLDABLE WHEELCHAIR" },
  { value: "stretcher", label: "STRECHER" },
  { value: "kendrick_extrication", label: "KENDRICK EXTRICATION DEVICE (SED) -TYPE A SAHAJA." },
  { value: "splint_bag", label: "SPLINT BAG" },
  { value: "spinal_board", label: "SPINAL BOARD WITH CERVICAL PROTECTION" },
  { value: "foldable_stretcher", label: "FOLDABLE STRECHER" },
  { value: "tpod_pelvic_binder", label: "T-POD PELVIC BINDER" },
  { value: "hare_splint", label: "HARE SPLINT" },
  { value: "medication_box", label: "MEDICATION BOX" },
  { value: "fire_extinguisher", label: "FIRE EXTINGUISHER" },
  { value: "waste_bin", label: "WASTE BIN/SHARP BIN" },
  { value: "glove", label: "GLOVE" },
  { value: "mask", label: "MASK" },
  { value: "trauma_bag", label: "TRAUMA BAG" }
];

const RESPONDER_BAG_OPTIONS = [
  { value: "bag_valve_mask", label: "BAG VALVE MASK" },
  { value: "laryngealscope_set", label: "LARYNGEALSCOPE SET" },
  { value: "oropharyngeal_airway", label: "OROPHARYNGEAL AIRWAY (SIZE 2,3,4)" },
  { value: "nasal_cannula", label: "NASAL CANNULA" },
  { value: "face_mask_3ply", label: "3PLY FACE MASK" },
  { value: "teeth_opener", label: "TEETH OPENER" },
  { value: "dental_silicone_bite", label: "DENTAL SILICONE BITE" },
  { value: "ett_tube", label: "ETT TUBE SZ 8.0" },
  { value: "portable_spo2", label: "PORTABLE SPO2" },
  { value: "glucometer", label: "GLUCOMETER" }
];

const TRAUMA_BAG_OPTIONS = [
  { value: "dressing_set", label: "DRESSING SET" },
  { value: "crepe_bandage", label: "CREPE BANDAGE" },
  { value: "micropore_3m", label: "3M MICROPORE" },
  { value: "scissors", label: "SCISSORS" },
  { value: "burn_kit", label: "BURN KIT" }
];

const NAMA_PEMANDU_OPTIONS = [
  { value: "kk_chemor_rm20", label: "KK CHEMOR RM 20" },
  { value: "kk_jelapang_rm20", label: "KK JELAPANG RM 20" },
  { value: "hrpb_rm30", label: "HRPB RM 30" },
  { value: "ppn_sg_petani_rm200", label: "PPN SG PETANI RM 200" },
  { value: "others", label: "Others" }
];

const TAHAP_KESIHATAN_OPTIONS = [
  { value: "sihat", label: "Sihat" },
  { value: "tidak_sihat", label: "Tidak Sihat" },
  { value: "others", label: "Others" }
];

const PENGAMBILAN_UBATAN_OPTIONS = [
  { value: "ada", label: "Ada" },
  { value: "tiada", label: "Tiada" },
  { value: "others", label: "Others" }
];

const REHAT_TIDUR_OPTIONS = [
  { value: "cukup", label: "Cukup" },
  { value: "tidak_cukup", label: "Tidak Cukup" },
  { value: "others", label: "Others" }
];

const LESEN_MEMANDU_OPTIONS = [
  { value: "ada", label: "Ada" },
  { value: "tamat_tempoh", label: "TAMAT TEMPOH" },
  { value: "others", label: "Others" }
];

const BAHAN_API_OPTIONS = [
  { value: "full", label: "Full" },
  { value: "half", label: "1/2" },
  { value: "quarter", label: "1/4" },
  { value: "three_quarter", label: "3/4" },
  { value: "others", label: "Others" }
];

const BAIK_TIDAK_BAIK_OPTIONS = [
  { value: "baik", label: "BAIK" },
  { value: "tidak_baik", label: "TIDAK BAIK" },
  { value: "others", label: "Others" }
];

const CUKUP_TIDAK_CUKUP_OPTIONS = [
  { value: "cukup", label: "CUKUP" },
  { value: "tidak_cukup", label: "TIDAK CUKUP" },
  { value: "others", label: "Others" }
];

/**
 * Fleet Management Form - ACM/CM detail auto-generated from Customer Service.
 */
export default function FleetManagementForm({ patient, onBack }) {
  const acmCmDetail = patient?.case_manager || "-";
  const namaOb = patient?.name || patient?.patient_name || "-";
  const namaCarer = (patient?.carers && patient.carers[0]?.name) || "-";
  const noKpOb = patient?.ic || patient?.ic_no || patient?.id || "-";
  const noPhoneOb = patient?.phone || patient?.tel || patient?.no_tel || "-";

  const [values, setValues] = useState({
    acm_cm_detail: acmCmDetail,
    nama_ob: namaOb,
    nama_carer: namaCarer,
    no_kp_ob: noKpOb,
    no_phone_ob: noPhoneOb,
    kondisi_ob: "",
    kondisi_ob_others: "",
    ambulatory_aid: "",
    ambulatory_aid_others: "",
    booking_location: "",
    booking_location_others: "",
    jenis_kes: "",
    jenis_kes_others: "",
    lokasi_penghantaran: "",
    tujuan_penghantaran: "",
    tarikh_penghantaran: "",
    masa_penghantaran: "",
    trip: "",
    other_appointment: "",
    fleet_checklist: [],
    peralatan_main: [],
    peralatan_responder_bag: [],
    peralatan_trauma_bag: [],
    nama_pemandu: "",
    nama_pemandu_others: "",
    tahap_kesihatan_pemandu: "",
    tahap_kesihatan_others: "",
    pengambilan_ubatan: "",
    pengambilan_ubatan_others: "",
    rehat_tidur_cukup: "",
    rehat_tidur_others: "",
    lesen_memandu: "",
    lesen_memandu_others: "",
    tarikh_kenderaan: "",
    masa_kenderaan: "",
    no_plate_kenderaan: "",
    odometer_kenderaan: "",
    bahan_api: "",
    bahan_api_others: "",
    keadaan_cermin_hadapan: "",
    keadaan_cermin_hadapan_others: "",
    wiper: "",
    wiper_others: "",
    bonet_hadapan: "",
    bonet_hadapan_others: "",
    hos_getah_engine: "",
    hos_getah_engine_others: "",
    bateri: "",
    bateri_others: "",
    lampu_hadapan: "",
    lampu_hadapan_others: "",
    lampu_isyarat: "",
    lampu_isyarat_others: "",
    tekanan_tayar: "",
    tekanan_tayar_others: "",
    keadaan_tayar: "",
    keadaan_tayar_others: "",
    cermin_sisi: "",
    cermin_sisi_others: "",
    lampu_brek: "",
    lampu_brek_others: "",
    lampu_reverse: "",
    lampu_reverse_others: "",
    no_plat_depan_belakang: "",
    no_plat_depan_belakang_others: "",
    minyak_brake: "",
    minyak_brake_others: "",
    air_kenderaan: "",
    air_kenderaan_others: "",
    minyak_power_steering: "",
    minyak_power_steering_others: "",
    minyak_engine: "",
    minyak_engine_others: "",
    perkeso_gambar_geran: "",
    perkeso_tarikh_puspakom: "",
    perkeso_jenis_kenderaan: "",
    perkeso_jenis_bahan_bakar: "",
    perkeso_tarikh_servis: "",
    perkeso_odo_sebelum_guna: "",
    perkeso_odo_selepas_guna: "",
    perkeso_tarikh_isi_bahan_bakar: "",
    perkeso_odo_sebelum_isi: "",
    perkeso_baki_touch_n_go: "",
    perkeso_tarikh_insuran: "",
    perkeso_tarikh_penggunaan: "",
    perkeso_tarikh_pemulangan: ""
  });

  useEffect(() => {
    if (patient) {
      const carerName = (patient.carers && patient.carers[0]?.name) || "-";
      setValues(v => ({
        ...v,
        acm_cm_detail: patient.case_manager || "-",
        nama_ob: patient.name || patient.patient_name || "-",
        nama_carer: carerName,
        no_kp_ob: patient.ic || patient.ic_no || patient.id || "-",
        no_phone_ob: patient.phone || patient.tel || patient.no_tel || "-"
      }));
    }
  }, [patient]);

  const onChange = (name, value) => {
    setValues(v => ({ ...v, [name]: value }));
  };

  const FLEET_SCHEMA = {
    title: "FLEET MANAGEMENT",
    actions: [{ type: "back", label: "Back" }],
    sections: [
      {
        fields: [
          {
            type: "row",
            fields: [
              {
                name: "acm_cm_detail",
                label: "ACM/CM DETAIL",
                type: "input",
                readOnly: true,
                placeholder: "Auto-generated from Case Manager (Customer Service)"
              },
              {
                name: "nama_ob",
                label: "Nama OB",
                type: "input",
                readOnly: true,
                placeholder: "Auto-generated from Customer Service"
              }
            ]
          },
          {
            type: "row",
            fields: [
              {
                name: "nama_carer",
                label: "Nama carer",
                type: "input",
                readOnly: true,
                placeholder: "Auto-generated from Customer Service"
              },
              {
                name: "no_kp_ob",
                label: "No K/P OB",
                type: "input",
                readOnly: true,
                placeholder: "Auto-generated from Customer Service"
              },
              {
                name: "no_phone_ob",
                label: "No Phone OB",
                type: "input",
                readOnly: true,
                placeholder: "Auto-generated from Customer Service"
              }
            ]
          },
          { type: "subheading", label: "Condition & Aid" },
          {
            name: "kondisi_ob",
            label: "Kondisi OB",
            type: "radio",
            options: KONDISI_OB_OPTIONS
          },
          {
            name: "kondisi_ob_others",
            label: "Specify Other",
            type: "input",
            placeholder: "Enter if Others selected",
            showIf: { field: "kondisi_ob", equals: "others" }
          },
          {
            name: "ambulatory_aid",
            label: "AMBULATORY AID",
            type: "radio",
            options: AMBULATORY_AID_OPTIONS
          },
          {
            name: "ambulatory_aid_others",
            label: "Specify Other",
            type: "input",
            placeholder: "Enter if Others selected",
            showIf: { field: "ambulatory_aid", equals: "others" }
          },
          { type: "subheading", label: "Booking location" },
          {
            name: "booking_location",
            label: "",
            type: "radio",
            options: BOOKING_LOCATION_OPTIONS
          },
          {
            name: "booking_location_others",
            label: "Specify Other",
            type: "input",
            placeholder: "Enter if Others selected",
            showIf: { field: "booking_location", equals: "others" }
          },
          {
            name: "jenis_kes",
            label: "Jenis kes",
            type: "radio",
            options: JENIS_KES_OPTIONS
          },
          {
            name: "jenis_kes_others",
            label: "Specify Other",
            type: "input",
            placeholder: "Enter if Others selected",
            showIf: { field: "jenis_kes", equals: "others" }
          },
          { type: "subheading", label: "Delivery Information" },
          {
            name: "lokasi_penghantaran",
            label: "Lokasi Penghantaran",
            type: "input",
            placeholder: "Delivery location"
          },
          {
            name: "tujuan_penghantaran",
            label: "Tujuan Penghantaran",
            type: "input",
            placeholder: "Delivery purpose"
          },
          {
            name: "tarikh_penghantaran",
            label: "Tarikh Penghantaran",
            type: "date",
            placeholder: "Delivery date"
          },
          {
            name: "masa_penghantaran",
            label: "Masa Penghantaran",
            type: "input",
            placeholder: "Delivery time"
          },
          { type: "subheading", label: "Trip & Appointment" },
          {
            name: "trip",
            label: "Trip: Sehala or Dua hala",
            type: "radio",
            options: TRIP_OPTIONS
          },
          {
            name: "other_appointment",
            label: "Other appointment",
            type: "radio",
            options: OTHER_APPOINTMENT_OPTIONS
          },
          { type: "subheading", label: "Checklists" },
          {
            name: "fleet_checklist",
            label: "",
            type: "checkbox-group",
            options: [
              { value: "peralatan", label: "SENARAI SEMAK PERALATAN PERUBATAN" },
              { value: "kesihatan", label: "SENARAI SEMAK KESIHATAN DAN KESELAMATAN SEBELUM PEMANDU" },
              { value: "kenderaan", label: "KESELAMATAN KENDERAAN SEBELUM MEMANDU" },
              { value: "perkeso", label: "MAKLUMAT KENDERAAN RASMI PERKESO" }
            ]
          },
          {
            name: "peralatan_main",
            label: "SENARAI SEMAK PERALATAN PERUBATAN",
            type: "multi-select-dropdown",
            options: PERALATAN_MAIN_OPTIONS,
            showIf: { field: "fleet_checklist", includes: "peralatan" }
          },
          {
            name: "peralatan_responder_bag",
            label: "RESPONDER BAG",
            type: "multi-select-dropdown",
            options: RESPONDER_BAG_OPTIONS,
            showIf: { field: "peralatan_main", includes: "responder_bag" }
          },
          {
            name: "peralatan_trauma_bag",
            label: "TRAUMA BAG",
            type: "multi-select-dropdown",
            options: TRAUMA_BAG_OPTIONS,
            showIf: { field: "peralatan_main", includes: "trauma_bag" }
          },
          { type: "subheading", label: "SENARAI SEMAK KESIHATAN DAN KESELAMATAN SEBELUM PEMANDU", showIf: { field: "fleet_checklist", includes: "kesihatan" } },
          {
            name: "nama_pemandu",
            label: "NAMA PEMANDU",
            type: "single-select",
            options: NAMA_PEMANDU_OPTIONS,
            showIf: { field: "fleet_checklist", includes: "kesihatan" }
          },
          {
            name: "nama_pemandu_others",
            label: "Specify Other",
            type: "input",
            placeholder: "Enter driver name",
            showIf: { field: "nama_pemandu", equals: "others" }
          },
          {
            name: "tahap_kesihatan_pemandu",
            label: "TAHAP KESIHATAN PEMANDU",
            type: "radio",
            options: TAHAP_KESIHATAN_OPTIONS,
            showIf: { field: "fleet_checklist", includes: "kesihatan" }
          },
          {
            name: "tahap_kesihatan_others",
            label: "Specify Other",
            type: "input",
            placeholder: "Enter health status",
            showIf: { field: "tahap_kesihatan_pemandu", equals: "others" }
          },
          {
            name: "pengambilan_ubatan",
            label: "PENGAMBILAN UBATAN",
            type: "radio",
            options: PENGAMBILAN_UBATAN_OPTIONS,
            showIf: { field: "fleet_checklist", includes: "kesihatan" }
          },
          {
            name: "pengambilan_ubatan_others",
            label: "JENIS UBAT",
            type: "input",
            placeholder: "Enter type of medication",
            showIf: { field: "pengambilan_ubatan", equals: "others" }
          },
          {
            name: "rehat_tidur_cukup",
            label: "REHAT & TIDUR CUKUP",
            type: "radio",
            options: REHAT_TIDUR_OPTIONS,
            showIf: { field: "fleet_checklist", includes: "kesihatan" }
          },
          {
            name: "rehat_tidur_others",
            label: "Specify Other",
            type: "input",
            placeholder: "Enter details",
            showIf: { field: "rehat_tidur_cukup", equals: "others" }
          },
          {
            name: "lesen_memandu",
            label: "LESEN MEMANDU",
            type: "radio",
            options: LESEN_MEMANDU_OPTIONS,
            showIf: { field: "fleet_checklist", includes: "kesihatan" }
          },
          {
            name: "lesen_memandu_others",
            label: "Specify Other",
            type: "input",
            placeholder: "Enter details",
            showIf: { field: "lesen_memandu", equals: "others" }
          },
          { type: "subheading", label: "KESELAMATAN KENDERAAN SEBELUM MEMANDU", showIf: { field: "fleet_checklist", includes: "kenderaan" } },
          {
            type: "row",
            showIf: { field: "fleet_checklist", includes: "kenderaan" },
            fields: [
              { name: "tarikh_kenderaan", label: "TARIKH", type: "date" },
              { name: "masa_kenderaan", label: "MASA", type: "input", placeholder: "Time" }
            ]
          },
          {
            type: "row",
            showIf: { field: "fleet_checklist", includes: "kenderaan" },
            fields: [
              { name: "no_plate_kenderaan", label: "NO PLATE", type: "input", placeholder: "Number plate" },
              { name: "odometer_kenderaan", label: "ODOMETER", type: "input", placeholder: "Odometer reading" }
            ]
          },
          {
            name: "bahan_api",
            label: "BAHAN API",
            type: "radio",
            options: BAHAN_API_OPTIONS,
            showIf: { field: "fleet_checklist", includes: "kenderaan" }
          },
          {
            name: "bahan_api_others",
            label: "Specify Other",
            type: "input",
            placeholder: "Enter details",
            showIf: { field: "bahan_api", equals: "others" }
          },
          { name: "keadaan_cermin_hadapan", label: "KEADAAN CERMIN HADAPAN", type: "radio", options: BAIK_TIDAK_BAIK_OPTIONS, showIf: { field: "fleet_checklist", includes: "kenderaan" } },
          { name: "keadaan_cermin_hadapan_others", label: "Specify Other", type: "input", placeholder: "Enter details", showIf: { field: "keadaan_cermin_hadapan", equals: "others" } },
          { name: "wiper", label: "WIPER", type: "radio", options: BAIK_TIDAK_BAIK_OPTIONS, showIf: { field: "fleet_checklist", includes: "kenderaan" } },
          { name: "wiper_others", label: "Specify Other", type: "input", placeholder: "Enter details", showIf: { field: "wiper", equals: "others" } },
          { name: "bonet_hadapan", label: "BONET HADAPAN", type: "radio", options: BAIK_TIDAK_BAIK_OPTIONS, showIf: { field: "fleet_checklist", includes: "kenderaan" } },
          { name: "bonet_hadapan_others", label: "Specify Other", type: "input", placeholder: "Enter details", showIf: { field: "bonet_hadapan", equals: "others" } },
          { name: "hos_getah_engine", label: "HOS GETAH ENGINE", type: "radio", options: BAIK_TIDAK_BAIK_OPTIONS, showIf: { field: "fleet_checklist", includes: "kenderaan" } },
          { name: "hos_getah_engine_others", label: "Specify Other", type: "input", placeholder: "Enter details", showIf: { field: "hos_getah_engine", equals: "others" } },
          { name: "bateri", label: "BATERI", type: "radio", options: BAIK_TIDAK_BAIK_OPTIONS, showIf: { field: "fleet_checklist", includes: "kenderaan" } },
          { name: "bateri_others", label: "Specify Other", type: "input", placeholder: "Enter details", showIf: { field: "bateri", equals: "others" } },
          { name: "lampu_hadapan", label: "LAMPU HADAPAN", type: "radio", options: BAIK_TIDAK_BAIK_OPTIONS, showIf: { field: "fleet_checklist", includes: "kenderaan" } },
          { name: "lampu_hadapan_others", label: "Specify Other", type: "input", placeholder: "Enter details", showIf: { field: "lampu_hadapan", equals: "others" } },
          { name: "lampu_isyarat", label: "LAMPU ISYARAT", type: "radio", options: BAIK_TIDAK_BAIK_OPTIONS, showIf: { field: "fleet_checklist", includes: "kenderaan" } },
          { name: "lampu_isyarat_others", label: "Specify Other", type: "input", placeholder: "Enter details", showIf: { field: "lampu_isyarat", equals: "others" } },
          { name: "tekanan_tayar", label: "TEKANAN TAYAR", type: "radio", options: BAIK_TIDAK_BAIK_OPTIONS, showIf: { field: "fleet_checklist", includes: "kenderaan" } },
          { name: "tekanan_tayar_others", label: "Specify Other", type: "input", placeholder: "Enter details", showIf: { field: "tekanan_tayar", equals: "others" } },
          { name: "keadaan_tayar", label: "KEADAAN TAYAR", type: "radio", options: BAIK_TIDAK_BAIK_OPTIONS, showIf: { field: "fleet_checklist", includes: "kenderaan" } },
          { name: "keadaan_tayar_others", label: "Specify Other", type: "input", placeholder: "Enter details", showIf: { field: "keadaan_tayar", equals: "others" } },
          { name: "cermin_sisi", label: "CERMIN SISI (KIRI/KANAN)", type: "radio", options: BAIK_TIDAK_BAIK_OPTIONS, showIf: { field: "fleet_checklist", includes: "kenderaan" } },
          { name: "cermin_sisi_others", label: "Specify Other", type: "input", placeholder: "Enter details", showIf: { field: "cermin_sisi", equals: "others" } },
          { name: "lampu_brek", label: "LAMPU BREK", type: "radio", options: BAIK_TIDAK_BAIK_OPTIONS, showIf: { field: "fleet_checklist", includes: "kenderaan" } },
          { name: "lampu_brek_others", label: "Specify Other", type: "input", placeholder: "Enter details", showIf: { field: "lampu_brek", equals: "others" } },
          { name: "lampu_reverse", label: "LAMPU REVERSE", type: "radio", options: BAIK_TIDAK_BAIK_OPTIONS, showIf: { field: "fleet_checklist", includes: "kenderaan" } },
          { name: "lampu_reverse_others", label: "Specify Other", type: "input", placeholder: "Enter details", showIf: { field: "lampu_reverse", equals: "others" } },
          { name: "no_plat_depan_belakang", label: "NO PLAT (DEPAN/BELAKANG)", type: "radio", options: BAIK_TIDAK_BAIK_OPTIONS, showIf: { field: "fleet_checklist", includes: "kenderaan" } },
          { name: "no_plat_depan_belakang_others", label: "Specify Other", type: "input", placeholder: "Enter details", showIf: { field: "no_plat_depan_belakang", equals: "others" } },
          { name: "minyak_brake", label: "MINYAK BRAKE", type: "radio", options: CUKUP_TIDAK_CUKUP_OPTIONS, showIf: { field: "fleet_checklist", includes: "kenderaan" } },
          { name: "minyak_brake_others", label: "Specify Other", type: "input", placeholder: "Enter details", showIf: { field: "minyak_brake", equals: "others" } },
          { name: "air_kenderaan", label: "AIR KENDERAAN", type: "radio", options: CUKUP_TIDAK_CUKUP_OPTIONS, showIf: { field: "fleet_checklist", includes: "kenderaan" } },
          { name: "air_kenderaan_others", label: "Specify Other", type: "input", placeholder: "Enter details", showIf: { field: "air_kenderaan", equals: "others" } },
          { name: "minyak_power_steering", label: "MINYAK POWER STEERING", type: "radio", options: CUKUP_TIDAK_CUKUP_OPTIONS, showIf: { field: "fleet_checklist", includes: "kenderaan" } },
          { name: "minyak_power_steering_others", label: "Specify Other", type: "input", placeholder: "Enter details", showIf: { field: "minyak_power_steering", equals: "others" } },
          { name: "minyak_engine", label: "MINYAK ENGINE", type: "radio", options: CUKUP_TIDAK_CUKUP_OPTIONS, showIf: { field: "fleet_checklist", includes: "kenderaan" } },
          { name: "minyak_engine_others", label: "Specify Other", type: "input", placeholder: "Enter details", showIf: { field: "minyak_engine", equals: "others" } },
          { type: "subheading", label: "MAKLUMAT KENDERAAN RASMI PERKESO", showIf: { field: "fleet_checklist", includes: "perkeso" } },
          {
            name: "perkeso_gambar_geran",
            title: "GAMBAR GERAN KENDERAAN",
            type: "attach-file",
            accept: "image/*,.pdf",
            showIf: { field: "fleet_checklist", includes: "perkeso" }
          },
          {
            type: "row",
            showIf: { field: "fleet_checklist", includes: "perkeso" },
            fields: [
              { name: "perkeso_tarikh_puspakom", label: "TARIKH PUSPAKOM KENDERAAN", type: "date" },
              { name: "perkeso_tarikh_servis", label: "TARIKH SERVIS KENDERAAN", type: "date" }
            ]
          },
          {
            name: "perkeso_jenis_kenderaan",
            label: "JENIS KENDERAAN",
            type: "input",
            placeholder: "Vehicle type",
            showIf: { field: "fleet_checklist", includes: "perkeso" }
          },
          {
            name: "perkeso_jenis_bahan_bakar",
            label: "JENIS BAHAN BAKAR",
            type: "input",
            placeholder: "Fuel type",
            showIf: { field: "fleet_checklist", includes: "perkeso" }
          },
          {
            type: "row",
            showIf: { field: "fleet_checklist", includes: "perkeso" },
            fields: [
              { name: "perkeso_tarikh_isi_bahan_bakar", label: "TARIKH ISI BAHAN BAKAR KENDERAAN", type: "date" },
              { name: "perkeso_tarikh_insuran", label: "TARIKH INSURAN KENDERAAN", type: "date" }
            ]
          },
          {
            name: "perkeso_odo_sebelum_guna",
            label: "ODO METER KENDERAAN SEBELUM DIGUNA",
            type: "input",
            placeholder: "Odometer before use",
            showIf: { field: "fleet_checklist", includes: "perkeso" }
          },
          {
            name: "perkeso_odo_selepas_guna",
            label: "ODO METER KENDERAAN SELEPAS DIGUNA",
            type: "input",
            placeholder: "Odometer after use",
            showIf: { field: "fleet_checklist", includes: "perkeso" }
          },
          {
            name: "perkeso_odo_sebelum_isi",
            label: "ODOMETER SEBELUM ISI BAHAN BAKAR",
            type: "input",
            placeholder: "Odometer before fuel refill",
            showIf: { field: "fleet_checklist", includes: "perkeso" }
          },
          {
            name: "perkeso_baki_touch_n_go",
            label: "BAKI TOUCH N GO KENDERAAN",
            type: "input",
            placeholder: "Touch N Go balance",
            showIf: { field: "fleet_checklist", includes: "perkeso" }
          },
          {
            type: "row",
            showIf: { field: "fleet_checklist", includes: "perkeso" },
            fields: [
              { name: "perkeso_tarikh_penggunaan", label: "TARIKH PENGGUNAAN KENDERAAN DAN MA", type: "date" },
              { name: "perkeso_tarikh_pemulangan", label: "TARIKH PEMULANGAN KENDERAAN DAN MA", type: "date" }
            ]
          }
        ]
      }
    ]
  };

  const handleAction = (type) => {
    if (type === "back") onBack?.();
  };

  const OPTION_CONFIG = {};

  const selectedIds = (Array.isArray(values.fleet_checklist) ? values.fleet_checklist : []).filter(
    id => id !== "peralatan" && id !== "kesihatan" && id !== "kenderaan" && id !== "perkeso"
  );

  return (
    <div style={mainContent}>
      <CommonFormBuilder
        schema={FLEET_SCHEMA}
        values={values}
        onChange={onChange}
        onAction={handleAction}
      />

      {selectedIds.length > 0 && (
        <div style={optionsSectionStyle}>
          {selectedIds.map(id => {
            const c = OPTION_CONFIG[id] || {};
            return (
              <div key={id} style={optionContentStyle}>
                <h4 style={{ margin: "0 0 12px 0", fontSize: 15 }}>{c.title}</h4>
                <div style={{ color: "#6b7280", fontStyle: "italic" }}>
                  {c.content || "Content to be provided in following prompts."}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

const optionsSectionStyle = {
  marginTop: 24,
  display: "flex",
  flexDirection: "column",
  gap: 16
};

const optionContentStyle = {
  padding: 20,
  border: "1px solid #e5e7eb",
  borderRadius: 8,
  background: "#f9fafb"
};
