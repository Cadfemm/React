import React, { useState, useEffect } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

export default function RenalAssessment({ layout = "root" }) {
  const [values, setValues] = useState({});

  const onChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  // Auto-calculate Net Balance (intake - output)
  useEffect(() => {
    const intake = parseFloat(values.renal_last24_intake);
    const output = parseFloat(values.renal_last24_output);
    if (Number.isFinite(intake) || Number.isFinite(output)) {
      const net = (Number.isFinite(intake) ? intake : 0) - (Number.isFinite(output) ? output : 0);
      setValues((prev) => (prev.renal_net_balance === String(net) ? prev : { ...prev, renal_net_balance: String(net) }));
    }
  }, [values.renal_last24_intake, values.renal_last24_output]);

  const RENAL_SCHEMA = {
    title: "Focussed Renal Assessment",
    sections: [
      // ═══════════════════════════════════════════════════════════════
      // SUBJECTIVE (Patient Reported)
      // ═══════════════════════════════════════════════════════════════
      {
        title: "SUBJECTIVE (Patient Reported)",
        fields: [
          { type: "subheading", label: "Urinary Pattern" },
          {
            name: "renal_frequency",
            label: "Frequency",
            type: "radio",
            options: [
              { label: "Normal", value: "normal" },
              { label: "Increased", value: "increased" },
              { label: "Decreased", value: "decreased" },
              { label: "No urine", value: "no_urine" }
            ]
          },
          {
            name: "renal_urgency",
            label: "Urgency",
            type: "radio",
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" }
            ]
          },
          {
            name: "renal_nocturia",
            label: "Nocturia",
            type: "radio",
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" }
            ]
          },
          {
            name: "renal_nocturia_times",
            label: "Times/night",
            type: "input",
            placeholder: "e.g. 2",
            showIf: { field: "renal_nocturia", equals: "yes" }
          },
          {
            name: "renal_dysuria",
            label: "Dysuria (burning/pain)",
            type: "radio",
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" }
            ]
          },
          {
            name: "renal_hesitancy",
            label: "Hesitancy",
            type: "radio",
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" }
            ]
          },
          {
            name: "renal_straining",
            label: "Straining",
            type: "radio",
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" }
            ]
          },
          {
            name: "renal_weak_stream",
            label: "Weak stream / Dribbling",
            type: "radio",
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" }
            ]
          },
          {
            name: "renal_incomplete_emptying",
            label: "Incomplete emptying",
            type: "radio",
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" }
            ]
          },
          {
            name: "renal_incontinence_type",
            label: "Incontinence",
            type: "radio",
            options: [
              { label: "Stress", value: "stress" },
              { label: "Urge", value: "urge" },
              { label: "Overflow", value: "overflow" },
              { label: "Functional", value: "functional" },
              { label: "Continuous", value: "continuous" },
              { label: "None", value: "none" }
            ]
          },
          {
            name: "renal_pads_briefs",
            label: "Pads/briefs used",
            type: "radio",
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" }
            ]
          },
          { type: "subheading", label: "Urine Characteristics (Patient Reported)" },
          {
            name: "renal_subj_color",
            label: "Color",
            type: "radio",
            options: [
              { label: "Clear", value: "clear" },
              { label: "Pale yellow", value: "pale_yellow" },
              { label: "Dark", value: "dark" },
              { label: "Red", value: "red" },
              { label: "Cloudy", value: "cloudy" },
              { label: "Foamy", value: "foamy" }
            ]
          },
          {
            name: "renal_subj_odor",
            label: "Odor",
            type: "radio",
            options: [
              { label: "Normal", value: "normal" },
              { label: "Foul", value: "foul" },
              { label: "Sweet", value: "sweet" },
              { label: "Ammoniacal", value: "ammoniacal" }
            ]
          },
          {
            name: "renal_hematuria_subj",
            label: "Blood in urine (Hematuria)",
            type: "radio",
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" }
            ]
          },
          {
            name: "renal_sediment_gravel",
            label: "Sediment/gravel",
            type: "radio",
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" }
            ]
          },
          { type: "subheading", label: "Pain & Discomfort" },
          {
            name: "renal_flank_pain",
            label: "Flank pain",
            type: "radio",
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" }
            ]
          },
          {
            name: "renal_flank_side",
            label: "Side",
            type: "radio",
            showIf: { field: "renal_flank_pain", equals: "yes" },
            options: [
              { label: "Right", value: "right" },
              { label: "Left", value: "left" },
              { label: "Bilateral", value: "bilateral" }
            ]
          },
          {
            name: "renal_suprapubic_pain",
            label: "Suprapubic pain",
            type: "radio",
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" }
            ]
          },
          {
            name: "renal_pain_severity",
            label: "Pain severity (0–10)",
            type: "scale-slider",
            min: 0,
            max: 10,
            step: 1,
            showValue: true
          },
          {
            name: "renal_radiation_groin",
            label: "Radiation to groin",
            type: "radio",
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" }
            ]
          },
          { type: "subheading", label: "Associated Symptoms" },
          {
            name: "renal_fever_chills",
            label: "Fever/chills",
            type: "radio",
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" }
            ]
          },
          {
            name: "renal_nausea_vomiting",
            label: "Nausea/vomiting",
            type: "radio",
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" }
            ]
          },
          {
            name: "renal_fatigue",
            label: "Fatigue",
            type: "radio",
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" }
            ]
          },
          {
            name: "renal_edema",
            label: "Edema (face/legs)",
            type: "radio",
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" }
            ]
          },
          {
            name: "renal_dyspnea",
            label: "Dyspnea (fluid overload)",
            type: "radio",
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" }
            ]
          },
          { type: "subheading", label: "Past Renal History" },
          {
            name: "renal_utis",
            label: "UTIs",
            type: "radio",
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" }
            ]
          },
          {
            name: "renal_utis_frequency",
            label: "Frequency",
            type: "input",
            showIf: { field: "renal_utis", equals: "yes" }
          },
          {
            name: "renal_kidney_stones",
            label: "Kidney stones",
            type: "radio",
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" }
            ]
          },
          {
            name: "renal_kidney_stones_last",
            label: "Last episode",
            type: "input",
            showIf: { field: "renal_kidney_stones", equals: "yes" }
          },
          {
            name: "renal_ckd",
            label: "Chronic kidney disease",
            type: "radio",
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" }
            ]
          },
          {
            name: "renal_ckd_stage",
            label: "Stage",
            type: "input",
            placeholder: "e.g. 3a",
            showIf: { field: "renal_ckd", equals: "yes" }
          },
          {
            name: "renal_dialysis",
            label: "Dialysis",
            type: "radio",
            options: [
              { label: "Hemodialysis", value: "hemodialysis" },
              { label: "Peritoneal", value: "peritoneal" },
              { label: "None", value: "none" }
            ]
          },
          {
            name: "renal_surgery_transplant",
            label: "Renal surgery/transplant",
            type: "radio",
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" }
            ]
          },
          {
            name: "renal_prostate_disease",
            label: "Prostate disease (if applicable)",
            type: "radio",
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" }
            ]
          },
          { type: "subheading", label: "Medications & Risk Factors" },
          {
            name: "renal_nephrotoxic",
            label: "Nephrotoxic drugs (NSAIDs, aminoglycosides, contrast)",
            type: "radio",
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" }
            ]
          },
          {
            name: "renal_diuretics",
            label: "Diuretics",
            type: "radio",
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" }
            ]
          },
          {
            name: "renal_fluid_restriction",
            label: "Fluid intake restriction",
            type: "radio",
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" }
            ]
          },
          {
            name: "renal_diabetes",
            label: "Diabetes",
            type: "radio",
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" }
            ]
          },
          {
            name: "renal_hypertension",
            label: "Hypertension",
            type: "radio",
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" }
            ]
          }
        ]
      },
      // ═══════════════════════════════════════════════════════════════
      // OBJECTIVE (Clinician-Observed)
      // ═══════════════════════════════════════════════════════════════
      {
        title: "OBJECTIVE (Clinician-Observed) (Include time)",
        fields: [
          { type: "subheading", label: "General Observation" },
          {
            name: "renal_mental_status",
            label: "Mental status",
            type: "radio",
            options: [
              { label: "Alert", value: "alert" },
              { label: "Confused", value: "confused" },
              { label: "Lethargic", value: "lethargic" }
            ]
          },
          {
            name: "renal_hydration",
            label: "Hydration status",
            type: "radio",
            options: [
              { label: "Well hydrated", value: "well_hydrated" },
              { label: "Dry mucosa", value: "dry_mucosa" },
              { label: "Poor skin turgor", value: "poor_skin_turgor" }
            ]
          },
          {
            name: "renal_edema_location",
            label: "Edema – Location",
            type: "radio",
            options: [
              { label: "Periorbital", value: "periorbital" },
              { label: "Pedal", value: "pedal" },
              { label: "Sacral", value: "sacral" },
              { label: "Generalized", value: "generalized" }
            ]
          },
          {
            name: "renal_edema_grade",
            label: "Edema – Grade",
            type: "radio",
            options: [
              { label: "1+", value: "1" },
              { label: "2+", value: "2" },
              { label: "3+", value: "3" },
              { label: "4+", value: "4" }
            ]
          },
          { type: "subheading", label: "Abdominal / Renal Examination" },
          {
            name: "renal_bladder_distension",
            label: "Bladder distension",
            type: "radio",
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" }
            ]
          },
          {
            name: "renal_suprapubic_tenderness",
            label: "Suprapubic tenderness",
            type: "radio",
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" }
            ]
          },
          {
            name: "renal_flank_palpation",
            label: "Flank pain on palpation",
            type: "radio",
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" }
            ]
          },
          {
            name: "renal_cva_tenderness",
            label: "CVA tenderness",
            type: "radio",
            options: [
              { label: "Right", value: "right" },
              { label: "Left", value: "left" },
              { label: "Bilateral", value: "bilateral" },
              { label: "Absent", value: "absent" }
            ]
          },
          { type: "subheading", label: "Auscultation" },
          {
            name: "renal_bruit_present",
            label: "Renal artery bruit",
            type: "radio",
            options: [
              { label: "Present", value: "present" },
              { label: "Absent", value: "absent" }
            ]
          },
          {
            name: "renal_bruit_side",
            label: "Side",
            type: "radio",
            showIf: { field: "renal_bruit_present", equals: "present" },
            options: [
              { label: "Right", value: "right" },
              { label: "Left", value: "left" },
              { label: "Bilateral", value: "bilateral" }
            ]
          },
          { type: "subheading", label: "Urine Assessment (Observed)" },
          {
            name: "renal_obj_color",
            label: "Color",
            type: "radio",
            options: [
              { label: "Clear", value: "clear" },
              { label: "Pale", value: "pale" },
              { label: "Dark", value: "dark" },
              { label: "Amber", value: "amber" },
              { label: "Red", value: "red" },
              { label: "Brown", value: "brown" }
            ]
          },
          {
            name: "renal_clarity",
            label: "Clarity",
            type: "radio",
            options: [
              { label: "Clear", value: "clear" },
              { label: "Cloudy", value: "cloudy" },
              { label: "Turbid", value: "turbid" }
            ]
          },
          {
            name: "renal_obj_odor",
            label: "Odor",
            type: "radio",
            options: [
              { label: "Normal", value: "normal" },
              { label: "Foul", value: "foul" },
              { label: "Sweet", value: "sweet" }
            ]
          },
          {
            name: "renal_foam",
            label: "Foam",
            type: "radio",
            options: [
              { label: "Present", value: "present" },
              { label: "Absent", value: "absent" }
            ]
          },
          {
            name: "renal_sediment",
            label: "Sediment",
            type: "radio",
            options: [
              { label: "Present", value: "present" },
              { label: "Absent", value: "absent" }
            ]
          },
          { type: "subheading", label: "Intake & Output" },
          {
            name: "renal_last24_intake",
            label: "Last 24 hr intake",
            type: "input",
            placeholder: "mL"
          },
          {
            name: "renal_last24_output",
            label: "Last 24 hr output",
            type: "input",
            placeholder: "mL"
          },
          {
            name: "renal_net_balance",
            label: "Net Balance",
            type: "input",
            placeholder: "mL (auto-calculated)",
            readOnly: true
          },
          {
            name: "renal_urine_output_rate",
            label: "Urine output rate",
            type: "input",
            placeholder: "mL/kg/hr"
          },
          {
            name: "renal_oliguria",
            label: "Oliguria (<0.5 mL/kg/hr)",
            type: "radio",
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" }
            ]
          },
          {
            name: "renal_anuria",
            label: "Anuria (<100 mL/day)",
            type: "radio",
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" }
            ]
          },
          { type: "subheading", label: "Weight & Fluid Status" },
          {
            name: "renal_current_weight",
            label: "Current weight",
            type: "input",
            placeholder: "kg"
          },
          {
            name: "renal_previous_weight",
            label: "Previous weight",
            type: "input",
            placeholder: "kg"
          },
          {
            name: "renal_weight_change",
            label: "Change",
            type: "radio",
            options: [
              { label: "Gain", value: "gain" },
              { label: "Loss", value: "loss" },
              { label: "Stable", value: "stable" }
            ]
          },
          {
            name: "renal_weight_change_amount",
            label: "Amount",
            type: "input",
            placeholder: "kg",
            showIf: { field: "renal_weight_change", oneOf: ["gain", "loss"] }
          },
          {
            name: "renal_fluid_overload",
            label: "Signs of fluid overload",
            type: "radio",
            options: [
              { label: "Crackles", value: "crackles" },
              { label: "JVD", value: "jvd" },
              { label: "Edema", value: "edema" },
              { label: "None", value: "none" }
            ]
          },
          { type: "subheading", label: "Devices" },
          {
            name: "renal_urinary_catheter",
            label: "Urinary catheter",
            type: "radio",
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" }
            ]
          },
          {
            name: "renal_catheter_type",
            label: "Type",
            type: "radio",
            showIf: { field: "renal_urinary_catheter", equals: "yes" },
            options: [
              { label: "Foley", value: "foley" },
              { label: "SPC", value: "spc" },
              { label: "Condom", value: "condom" }
            ]
          },
          {
            name: "renal_catheter_date",
            label: "Catheter insertion date",
            type: "date",
            showIf: { field: "renal_urinary_catheter", equals: "yes" }
          },
          {
            name: "renal_drainage_patent",
            label: "Urine drainage system patent",
            type: "radio",
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" }
            ]
          },
          {
            name: "renal_catheter_necessity",
            label: "Catheter necessity review",
            type: "checkbox-group",
            options: [
              { label: "Indication reviewed", value: "indication_reviewed" },
              { label: "Removal considered", value: "removal_considered" }
            ]
          },
          { type: "subheading", label: "Available Investigations (If done)" },
          {
            name: "renal_urinalysis",
            label: "Urinalysis",
            type: "radio",
            options: [
              { label: "Normal", value: "normal" },
              { label: "Abnormal", value: "abnormal" }
            ]
          },
          {
            name: "renal_urinalysis_findings",
            label: "Key findings",
            type: "input",
            showIf: { field: "renal_urinalysis", equals: "abnormal" }
          },
          {
            name: "renal_creatinine",
            label: "Serum creatinine",
            type: "input",
            placeholder: "mg/dL"
          },
          {
            name: "renal_bun",
            label: "BUN",
            type: "input",
            placeholder: "mg/dL"
          },
          {
            name: "renal_egfr",
            label: "eGFR",
            type: "input",
            placeholder: "mL/min/1.73m²"
          },
          {
            name: "renal_electrolytes_abnormal",
            label: "Electrolytes abnormal",
            type: "radio",
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" }
            ]
          },
          { type: "subheading", label: "CLINICAL FLAGS (Auto-trigger in doctor)" },
          {
            name: "renal_clinical_flags",
            label: "Clinical Flags",
            type: "checkbox-group",
            options: [
              { label: "BP >140/90 or <90 systolic", value: "bp_abnormal" },
              { label: "Urine output <0.5 mL/kg/hr", value: "oliguria" },
              { label: "Hematuria present", value: "hematuria" },
              { label: "CVA tenderness + fever", value: "cva_fever" },
              { label: "Rapid weight gain (>1 kg/day)", value: "rapid_weight_gain" },
              { label: "Rising creatinine", value: "rising_creatinine" }
            ]
          }
        ]
      }
    ]
  };

  return (
    <CommonFormBuilder
      schema={RENAL_SCHEMA}
      values={values}
      onChange={onChange}
      layout={layout}
    />
  );
}
