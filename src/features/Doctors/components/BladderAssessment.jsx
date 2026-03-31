import React, { useState } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";


const BLADDER_SCHEMA = {
  title: "Bladder Issue",
  sections: [
    {
      title: null,
      fields: [
        {
          type: "heading",
          label: "History Taking / Assessment"
        },
        {
          type: "radio",
          name: "premorbid_condition",
          label: "Premorbid condition",
          options: [
            { label: "No urinary problem", value: "no_urinary_problem" },
            { label: "Has urinary problem", value: "has_urinary_problem" }
          ]
        },
        {
          type: "input",
          name: "premorbid_condition_specify",
          label: "Premorbid condition (Specify)",
          showIf: { field: "premorbid_condition", equals: "has_urinary_problem" }
        },
        {
          type: "radio",
          name: "urinaryProblem",
          label: "Urinary problem",
          options: [
            { label: "Continent", value: "CONTINENT" },
            { label: "Incontinent", value: "INCONTINENT" }
          ]
        },
        ...withIncontinent([
        {
          type: "radio",
          name: "current_voiding_method",
          label: "Current voiding method",
          labelAbove: true,
          options: [
            { label: "Spontaneous voiding", value: "spontaneous_voiding" },
            { label: "Continous Bladder Drainage (CBD)", value: "cbd" },
            { label: "Suprapubic Cathetherization (SPC)", value: "spc" },
            { label: "Condom catheter", value: "condom_catheter" },
            { label: "Clean Intermittent Self-Catheterization (CISC)", value: "cisc" },
            { label: "Clean Intermittent Catheterization (CIC)", value: "cic" },
            { label: "Others", value: "others" }
          ]
        },
        {
          type: "input",
          name: "current_voiding_method_other",
          label: "Current voiding method (Specify)",
          showIf: { field: "current_voiding_method", equals: "others" }
        },
        {
          type: "radio",
          name: "voiding_frequency",
          label: "Frequency of voiding",
          labelAbove: true,
          showIf: {
            field: "current_voiding_method",
            oneOf: ["spontaneous_voiding", "cic", "cisc"]
          },
          options: [
            { label: "Hourly", value: "hourly" },
            { label: "2 hourly", value: "2_hourly" },
            { label: "3 hourly", value: "3_hourly" },
            { label: "4 hourly", value: "4_hourly" },
            { label: "5 hourly", value: "5_hourly" },
            { label: "6 hourly", value: "6_hourly" },
            { label: "Others", value: "others" }
          ]
        },
        {
          type: "input",
          name: "voiding_frequency_other",
          label: "Frequency of voiding (Specify)",
          showIf: { field: "voiding_frequency", equals: "others" }
        },
        {
          type: "radio",
          name: "voided_urine_volume",
          label: "Voided urine volume (ml)",
          labelAbove: true,
          showIf: {
            field: "current_voiding_method",
            oneOf: ["spontaneous_voiding", "cic", "cisc"]
          },
          options: [
            { label: "<50ml", value: "lt_50" },
            { label: "50-100ml", value: "50_100" },
            { label: "100-200ml", value: "100_200" },
            { label: "200-300ml", value: "200_300" },
            { label: "400-500ml", value: "400_500" },
            { label: "Others", value: "others" }
          ]
        },
        {
          type: "input",
          name: "voided_urine_volume_other",
          label: "Voided urine volume (Specify)",
          showIf: { field: "voided_urine_volume", equals: "others" }
        },
        yn("sensate", "Able to sensate"),
        yn("control", "Able to control"),

        { type: "heading", label: "Symptoms" },
        { type: "subheading", label: "Storage" },
        yn("storage_urinary_frequency", "Urinary frequency"),
        { type: "input", name: "storage_urinary_frequency_specify", label: "Urinary frequency (Specify)", showIf: { field: "storage_urinary_frequency", equals: "Yes" } },
        yn("storage_nocturia", "Nocturia"),
        { type: "input", name: "storage_nocturia_specify", label: "Nocturia (Specify)", showIf: { field: "storage_nocturia", equals: "Yes" } },
        yn("storage_urgency", "Urgency"),
        { type: "input", name: "storage_urgency_specify", label: "Urgency (Specify)", showIf: { field: "storage_urgency", equals: "Yes" } },
        yn("storage_incontinence", "Urinary incontinence"),
        { type: "input", name: "storage_incontinence_specify", label: "Urinary incontinence (Specify)", showIf: { field: "storage_incontinence", equals: "Yes" } },
        { type: "input", name: "storage_others", label: "Others" },

        { type: "subheading", label: "Voiding" },
        yn("voiding_slow_stream", "Slow stream"),
        { type: "input", name: "voiding_slow_stream_specify", label: "Slow stream (Specify)", showIf: { field: "voiding_slow_stream", equals: "Yes" } },
        yn("voiding_spraying_stream", "Spraying (splitting) of urinary stream"),
        { type: "input", name: "voiding_spraying_stream_specify", label: "Spraying urinary stream (Specify)", showIf: { field: "voiding_spraying_stream", equals: "Yes" } },
        yn("voiding_intermittent_stream", "Intermittent stream"),
        { type: "input", name: "voiding_intermittent_stream_specify", label: "Intermittent stream (Specify)", showIf: { field: "voiding_intermittent_stream", equals: "Yes" } },
        yn("voiding_hesitancy", "Hesitancy"),
        { type: "input", name: "voiding_hesitancy_specify", label: "Hesitancy (Specify)", showIf: { field: "voiding_hesitancy", equals: "Yes" } },
        yn("voiding_straining", "Straining to void"),
        { type: "input", name: "voiding_straining_specify", label: "Straining to void (Specify)", showIf: { field: "voiding_straining", equals: "Yes" } },
        yn("voiding_terminal_dribbling", "Terminal dribbling"),
        { type: "input", name: "voiding_terminal_dribbling_specify", label: "Terminal dribbling (Specify)", showIf: { field: "voiding_terminal_dribbling", equals: "Yes" } },
        { type: "input", name: "voiding_others", label: "Others" },

        { type: "subheading", label: "Post micturition" },
        yn("post_incomplete_emptying", "Incomplete emptying"),
        { type: "input", name: "post_incomplete_emptying_specify", label: "Incomplete emptying (Specify)", showIf: { field: "post_incomplete_emptying", equals: "Yes" } },
        yn("post_leakage", "Post micturitional leakage"),
        { type: "input", name: "post_leakage_specify", label: "Post micturitional leakage (Specify)", showIf: { field: "post_leakage", equals: "Yes" } },
        { type: "input", name: "post_others", label: "Others" },

        { type: "subheading", label: "Complication" },
        yn("comp_uti", "Urinary tract infection"),
        { type: "input", name: "comp_uti_specify", label: "Urinary tract infection (Specify)", showIf: { field: "comp_uti", equals: "Yes" } },
        yn("comp_renal_stone", "Renal stone"),
        { type: "input", name: "comp_renal_stone_specify", label: "Renal stone (Specify)", showIf: { field: "comp_renal_stone", equals: "Yes" } },
        yn("comp_ureteric_stone", "Ureteric stone"),
        { type: "input", name: "comp_ureteric_stone_specify", label: "Ureteric stone (Specify)", showIf: { field: "comp_ureteric_stone", equals: "Yes" } },
        yn("comp_bladder_stone", "Bladder stone"),
        { type: "input", name: "comp_bladder_stone_specify", label: "Bladder stone (Specify)", showIf: { field: "comp_bladder_stone", equals: "Yes" } },
        yn("comp_pyelonephritis", "Pyelonephritis"),
        { type: "input", name: "comp_pyelonephritis_specify", label: "Pyelonephritis (Specify)", showIf: { field: "comp_pyelonephritis", equals: "Yes" } },
        yn("comp_hydronephrosis", "Hydronephrosis"),
        { type: "input", name: "comp_hydronephrosis_specify", label: "Hydronephrosis (Specify)", showIf: { field: "comp_hydronephrosis", equals: "Yes" } },
        yn("comp_autonomic_dysreflexia", "Autonomic dysreflexia"),
        { type: "input", name: "comp_autonomic_dysreflexia_specify", label: "Autonomic dysreflexia (Specify)", showIf: { field: "comp_autonomic_dysreflexia", equals: "Yes" } },
        { type: "input", name: "comp_others", label: "Others" },

        yn("investigation_done", "Investigation (blood/ urine/ imaging) done previously"),
        { type: "subheading", label: "Blood test", showIf: { field: "investigation_done", equals: "Yes" } },
        yn("blood_renal_profile", "Renal profile", { field: "investigation_done", equals: "Yes" }),
        { type: "input", name: "blood_renal_profile_specify", label: "Renal profile (Specify)", showIf: { field: "blood_renal_profile", equals: "Yes" } },

        { type: "subheading", label: "Urine test", showIf: { field: "investigation_done", equals: "Yes" } },
        yn("urine_ufeme", "Ufeme", { field: "investigation_done", equals: "Yes" }),
        { type: "input", name: "urine_ufeme_specify", label: "Ufeme (Specify)", showIf: { field: "urine_ufeme", equals: "Yes" } },
        yn("urine_cns", "Urine C & S", { field: "investigation_done", equals: "Yes" }),
        { type: "input", name: "urine_cns_specify", label: "Urine C & S (Specify)", showIf: { field: "urine_cns", equals: "Yes" } },

        { type: "subheading", label: "Imaging Option", showIf: { field: "investigation_done", equals: "Yes" } },
        yn("img_xray_kub", "X RAY KUB", { field: "investigation_done", equals: "Yes" }),
        { type: "input", name: "img_xray_kub_specify", label: "X RAY KUB (Specify)", showIf: { field: "img_xray_kub", equals: "Yes" } },
        yn("img_usg_kub_prostate", "USG KUB +/- prostate", { field: "investigation_done", equals: "Yes" }),
        { type: "input", name: "img_usg_kub_prostate_specify", label: "USG KUB +/- prostate (Specify)", showIf: { field: "img_usg_kub_prostate", equals: "Yes" } },
        yn("img_ctu", "CT Urogram (CTU)", { field: "investigation_done", equals: "Yes" }),
        { type: "input", name: "img_ctu_specify", label: "CT Urogram (CTU) (Specify)", showIf: { field: "img_ctu", equals: "Yes" } },
        yn("img_cystogram", "Cystogram", { field: "investigation_done", equals: "Yes" }),
        { type: "input", name: "img_cystogram_specify", label: "Cystogram (Specify)", showIf: { field: "img_cystogram", equals: "Yes" } },

        yn("procedures_done", "Procedures done previously"),
        yn("proc_scc", "Single channel cystometry (SCC)", { field: "procedures_done", equals: "Yes" }),
        { type: "input", name: "proc_scc_specify", label: "SCC (Specify)", showIf: { field: "proc_scc", equals: "Yes" } },
        yn("proc_uds", "Urodynamic study (UDS)", { field: "procedures_done", equals: "Yes" }),
        { type: "input", name: "proc_uds_specify", label: "UDS (Specify)", showIf: { field: "proc_uds", equals: "Yes" } },

        { type: "heading", label: "Treatment" },
        yn("tx_medication_side_effects", "On medication & any side effects"),
        { type: "input", name: "tx_medication_side_effects_specify", label: "On medication & side effects (Specify)", showIf: { field: "tx_medication_side_effects", equals: "Yes" } },
        yn("tx_botox_detrusor", "History of botulinum toxin injection to detrusor muscle"),
        { type: "input", name: "tx_botox_detrusor_specify", label: "Botulinum toxin to detrusor (Specify)", showIf: { field: "tx_botox_detrusor", equals: "Yes" } },
        yn("tx_botox_sphincter", "History of botulinum toxin injection to external urinary sphincter"),
        { type: "input", name: "tx_botox_sphincter_specify", label: "Botulinum toxin to external sphincter (Specify)", showIf: { field: "tx_botox_sphincter", equals: "Yes" } },
        yn("tx_surgery", "Surgery"),
        { type: "input", name: "tx_surgery_specify", label: "Surgery (Specify)", showIf: { field: "tx_surgery", equals: "Yes" } },
        { type: "input", name: "tx_others", label: "Others" },
          /* ========== GOALS ========== */
          {
            type: "subheading",
            label: "Goals"
          },
          {
            name: "bladder_goals",
            type: "textarea",
            placeholder: "Enter goals"
          },
        { type: "subheading", label: "Plan" },
        {
          type: "checkbox-group",
          name: "bladder_plan",
          label: "",
          options: [
            { label: "Investigation: Ufeme/ Urine C & S/ X RAY KUB/ SCC", value: "investigation_bundle" },
            { label: "Bladder diary & Input-Output chart", value: "bladder_diary_io_chart" },
            { label: "Education on CIC / CISC to patient/ carer", value: "education_cic_cisc" },
            { label: "CBD change", value: "cbd_change" },
            { label: "Perform post void residual urine volume x3 readings and inform doctor", value: "post_void_residual_x3_inform_doctor" }
          ]
        }
        ])
      ]
    }
  ]
};

const initialValues = {
  premorbid_condition: "",
  urinaryProblem: ""
};



export default function BladderAssessment({ onChange: onParentChange }) {
  const [values, setValues] = useState(initialValues);
  const [submitted, setSubmitted] = useState(false);

  const onChange = (name, value) => {
    setValues(prev => {
      const next = { ...prev, [name]: value };
      onParentChange?.(next);
      return next;
    });
  };

  const handleSubmit = () => {
    setSubmitted(true);
    console.log("Bladder Assessment Data:", values);
  };

  return (
    <CommonFormBuilder
      schema={BLADDER_SCHEMA}
      values={values}
      onChange={onChange}
      submitted={submitted}
    >
    
    </CommonFormBuilder>
  );
}

function yn(name, label, showIf) {
  return {
    type: "radio",
    name,
    label,
    options: [
      { label: "Yes", value: "Yes" },
      { label: "No", value: "No" }
    ],
    ...(showIf ? { showIf } : {})
  };
}

function withIncontinent(fields) {
  return fields.map((field) => ({
    ...field,
    showIf: field.showIf
      ? { field: "urinaryProblem", equals: "INCONTINENT", and: field.showIf }
      : { field: "urinaryProblem", equals: "INCONTINENT" }
  }));
}
