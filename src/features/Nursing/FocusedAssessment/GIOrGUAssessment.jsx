import React, { useState } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

export default function GIOrGUAssessment({ layout = "root" }) {
  const [values, setValues] = useState({});

  const onChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const GI_GU_SCHEMA = {
    title: "Focussed Assessment for GI and GU",
    sections: [
      // ═══════════════════════════════════════════════════════════════
      // SUBJECTIVE (Patient Reported)
      // ═══════════════════════════════════════════════════════════════
      {
        title: "SUBJECTIVE (Patient Reported)",
        fields: [
          {
            name: "gigu_chief_complaint",
            label: "Chief Complaint",
            type: "checkbox-group",
            options: [
              { label: "None", value: "none" },
              { label: "Abdominal pain", value: "abdominal_pain" },
              { label: "Nausea", value: "nausea" },
              { label: "Vomiting", value: "vomiting" },
              { label: "Constipation", value: "constipation" },
              { label: "Diarrhea", value: "diarrhea" },
              { label: "Bloating/distension", value: "bloating" },
              { label: "Heartburn/reflux", value: "heartburn" },
              { label: "Dysphagia", value: "dysphagia" },
              { label: "Bloody stool", value: "bloody_stool" },
              { label: "Black/tarry stool", value: "black_stool" },
              { label: "Hematemesis", value: "hematemesis" },
              { label: "Dysuria", value: "dysuria" },
              { label: "Urinary frequency", value: "urinary_frequency" },
              { label: "Urinary urgency", value: "urinary_urgency" },
              { label: "Urinary retention", value: "urinary_retention" },
              { label: "Urinary incontinence", value: "urinary_incontinence" },
              { label: "Hematuria", value: "hematuria" },
              { label: "Flank pain", value: "flank_pain" },
              { label: "Other", value: "other" }
            ]
          },
          {
            name: "gigu_chief_complaint_other",
            label: "Other — Specify",
            type: "input",
            showIf: { field: "gigu_chief_complaint", includes: "other" }
          },
          // Abdominal pain OPQRST (if selected)
          { type: "subheading", label: "Abdominal Pain (OPQRST)", showIf: { field: "gigu_chief_complaint", includes: "abdominal_pain" } },
          { name: "gigu_ap_onset", label: "O — Onset", type: "input", showIf: { field: "gigu_chief_complaint", includes: "abdominal_pain" } },
          {
            name: "gigu_ap_provocation",
            label: "P — Provocation/Palliation",
            type: "radio",
            labelAbove: true,
            options: [
              { label: "With movement", value: "with_movement" },
              { label: "At rest", value: "at_rest" },
              { label: "Both", value: "both" },
              { label: "Relieved by", value: "relieved_by" }
            ],
            showIf: { field: "gigu_chief_complaint", includes: "abdominal_pain" }
          },
          { name: "gigu_ap_relieved_by", label: "Relieved by (specify)", type: "input", showIf: { field: "gigu_ap_provocation", equals: "relieved_by" } },
          { name: "gigu_ap_quality", label: "Q — Quality", type: "input", showIf: { field: "gigu_chief_complaint", includes: "abdominal_pain" } },
          { name: "gigu_ap_region", label: "R — Region/Radiation", type: "input", showIf: { field: "gigu_chief_complaint", includes: "abdominal_pain" } },
          {
            type: "row",
            fields: [
              { name: "gigu_ap_severity_rest", label: "S — Severity At rest (0–10)", type: "scale-slider", min: 0, max: 10, step: 1, showValue: true, showIf: { field: "gigu_chief_complaint", includes: "abdominal_pain" } },
              { name: "gigu_ap_severity_movement", label: "S — Severity With movement (0–10)", type: "scale-slider", min: 0, max: 10, step: 1, showValue: true, showIf: { field: "gigu_chief_complaint", includes: "abdominal_pain" } }
            ]
          },
          { name: "gigu_ap_timing", label: "T — Timing", type: "input", showIf: { field: "gigu_chief_complaint", includes: "abdominal_pain" } },
          // GI History
          { type: "subheading", label: "GI History" },
          {
            name: "gigu_gi_condition",
            label: "Known GI condition",
            type: "checkbox-group",
            options: [
              { label: "None", value: "none" },
              { label: "GERD - Gastroesophageal Reflux Disease", value: "gerd" },
              { label: "IBS - Irritable Bowel Syndrome", value: "ibs" },
              { label: "IBD - Inflammatory Bowel Disease", value: "ibd" },
              { label: "Peptic ulcer disease", value: "pud" },
              { label: "Liver disease", value: "liver" },
              { label: "Pancreatitis", value: "pancreatitis" },
              { label: "GI malignancy", value: "gi_malignancy" },
              { label: "Other", value: "other" }
            ]
          },
          { name: "gigu_gi_condition_other", label: "Other — Specify", type: "input", showIf: { field: "gigu_gi_condition", includes: "other" } },
          {
            name: "gigu_prior_abdominal_surgery",
            label: "Prior abdominal surgery",
            type: "radio",
            options: [
              { label: "No", value: "no" },
              { label: "Yes", value: "yes" }
            ]
          },
          { name: "gigu_prior_abdominal_surgery_specify", label: "Specify", type: "input", showIf: { field: "gigu_prior_abdominal_surgery", equals: "yes" } },
          // GU History
          { type: "subheading", label: "GU History" },
          {
            name: "gigu_gu_condition",
            label: "Known GU condition",
            type: "checkbox-group",
            options: [
              { label: "None", value: "none" },
              { label: "UTI", value: "uti" },
              { label: "Kidney stones", value: "kidney_stones" },
              { label: "CKD", value: "ckd" },
              { label: "Prostate disorder", value: "prostate" },
              { label: "Neurogenic bladder", value: "neurogenic_bladder" },
              { label: "Incontinence disorder", value: "incontinence" },
              { label: "Other", value: "other" }
            ]
          },
          { name: "gigu_gu_condition_other", label: "Other — Specify", type: "input", showIf: { field: "gigu_gu_condition", includes: "other" } },
          {
            name: "gigu_prior_gu_surgery",
            label: "Prior GU surgery",
            type: "radio",
            options: [
              { label: "No", value: "no" },
              { label: "Yes", value: "yes" }
            ]
          },
          { name: "gigu_prior_gu_surgery_specify", label: "Specify", type: "input", showIf: { field: "gigu_prior_gu_surgery", equals: "yes" } },
          // Abdominal Pain (Display if selected above) — below GU History, above Bowel Pattern
          { type: "subheading", label: "Abdominal Pain (Display if selected above)", showIf: { field: "gigu_chief_complaint", includes: "abdominal_pain" } },
          {
            name: "gigu_ap_location",
            label: "Location",
            type: "checkbox-group",
            showIf: { field: "gigu_chief_complaint", includes: "abdominal_pain" },
            options: [
              { label: "RUQ (Right Upper Quadrant)", value: "ruq" },
              { label: "RLQ (Right Lower Quadrant)", value: "rlq" },
              { label: "LUQ (Left Upper Quadrant)", value: "luq" },
              { label: "LLQ (Left Lower Quadrant)", value: "llq" },
              { label: "Epigastric", value: "epigastric" },
              { label: "Suprapubic", value: "suprapubic" },
              { label: "Diffuse", value: "diffuse" }
            ]
          },
          {
            name: "gigu_ap_radiation",
            label: "Radiation",
            type: "radio",
            showIf: { field: "gigu_chief_complaint", includes: "abdominal_pain" },
            options: [
              { label: "None", value: "none" },
              { label: "Back", value: "back" },
              { label: "Groin", value: "groin" },
              { label: "Shoulder", value: "shoulder" }
            ]
          },
          {
            name: "gigu_ap_quality_detail",
            label: "Quality",
            type: "radio",
            showIf: { field: "gigu_chief_complaint", includes: "abdominal_pain" },
            options: [
              { label: "Cramping", value: "cramping" },
              { label: "Sharp", value: "sharp" },
              { label: "Dull", value: "dull" },
              { label: "Burning", value: "burning" },
              { label: "Colicky", value: "colicky" },
              { label: "Pressure", value: "pressure" }
            ]
          },
          {
            name: "gigu_ap_severity_range",
            label: "Severity",
            type: "radio",
            showIf: { field: "gigu_chief_complaint", includes: "abdominal_pain" },
            options: [
              { label: "0–3", value: "0_3" },
              { label: "4–6", value: "4_6" },
              { label: "7–10", value: "7_10" }
            ]
          },
          {
            name: "gigu_ap_onset_detail",
            label: "Onset",
            type: "radio",
            showIf: { field: "gigu_chief_complaint", includes: "abdominal_pain" },
            options: [
              { label: "Sudden", value: "sudden" },
              { label: "Gradual", value: "gradual" }
            ]
          },
          {
            name: "gigu_ap_duration",
            label: "Duration",
            type: "radio",
            showIf: { field: "gigu_chief_complaint", includes: "abdominal_pain" },
            options: [
              { label: "Minutes", value: "minutes" },
              { label: "Hours", value: "hours" },
              { label: "Days", value: "days" }
            ]
          },
          {
            name: "gigu_ap_aggravating",
            label: "Aggravating factors",
            type: "checkbox-group",
            showIf: { field: "gigu_chief_complaint", includes: "abdominal_pain" },
            options: [
              { label: "Eating", value: "eating" },
              { label: "Movement", value: "movement" },
              { label: "Urination", value: "urination" },
              { label: "Bowel movement", value: "bowel_movement" },
              { label: "Stress", value: "stress" },
              { label: "None", value: "none" }
            ]
          },
          {
            name: "gigu_ap_relieving",
            label: "Relieving factors",
            type: "checkbox-group",
            showIf: { field: "gigu_chief_complaint", includes: "abdominal_pain" },
            options: [
              { label: "Rest", value: "rest" },
              { label: "Medications", value: "medications" },
              { label: "Position change", value: "position_change" },
              { label: "Bowel movement", value: "bowel_movement" },
              { label: "Fluids", value: "fluids" },
              { label: "None", value: "none" }
            ]
          },
          {
            name: "gigu_ap_associated",
            label: "Associated symptoms",
            type: "checkbox-group",
            showIf: { field: "gigu_chief_complaint", includes: "abdominal_pain" },
            options: [
              { label: "Fever (if fever present, check for dysuria)", value: "fever" },
              { label: "Nausea", value: "nausea" },
              { label: "Vomiting", value: "vomiting" },
              { label: "Constipation", value: "constipation" },
              { label: "Diarrhea", value: "diarrhea" },
              { label: "Bloody stool", value: "bloody_stool" },
              { label: "Hematuria", value: "hematuria" },
              { label: "None", value: "none" }
            ]
          },
          // Bowel Pattern
          { type: "subheading", label: "Bowel Pattern" },
          {
            name: "gigu_last_bm",
            label: "Last bowel movement",
            type: "radio",
            options: [
              { label: "Today", value: "today" },
              { label: "Yesterday", value: "yesterday" },
              { label: ">48 hours ago", value: "over_48h" },
              { label: "Unknown", value: "unknown" }
            ]
          },
          {
            name: "gigu_usual_frequency",
            label: "Usual frequency",
            type: "radio",
            options: [
              { label: "Daily", value: "daily" },
              { label: "Every 2–3 days", value: "2_3_days" },
              { label: "<3/week", value: "less_3_week" },
              { label: "Variable", value: "variable" }
            ]
          },
          {
            name: "gigu_stool_consistency",
            label: "Stool consistency",
            type: "radio",
            options: [
              { label: "Formed", value: "formed" },
              { label: "Hard", value: "hard" },
              { label: "Loose", value: "loose" },
              { label: "Watery", value: "watery" },
              { label: "Pellets", value: "pellets" },
              { label: "Unknown", value: "unknown" }
            ]
          },
          {
            name: "gigu_stool_color",
            label: "Stool color",
            type: "radio",
            options: [
              { label: "Brown", value: "brown" },
              { label: "Black/tarry", value: "black_tarry" },
              { label: "Red/bloody", value: "red_bloody" },
              { label: "Pale/clay", value: "pale_clay" },
              { label: "Green", value: "green" }
            ]
          },
          {
            name: "gigu_flatus",
            label: "Flatus",
            type: "radio",
            options: [
              { label: "Present", value: "present" },
              { label: "Absent", value: "absent" }
            ]
          },
          // Nausea / Vomiting
          { type: "subheading", label: "Nausea / Vomiting" },
          {
            name: "gigu_nausea",
            label: "Nausea",
            type: "radio",
            options: [
              { label: "No", value: "no" },
              { label: "Yes", value: "yes" }
            ]
          },
          {
            name: "gigu_vomiting",
            label: "Vomiting",
            type: "radio",
            options: [
              { label: "No", value: "no" },
              { label: "Yes", value: "yes" }
            ]
          },
          {
            name: "gigu_vomiting_frequency",
            label: "Frequency",
            type: "radio",
            showIf: { field: "gigu_vomiting", equals: "yes" },
            options: [
              { label: "Occasional", value: "occasional" },
              { label: "Frequent", value: "frequent" },
              { label: "Persistent", value: "persistent" }
            ]
          },
          {
            name: "gigu_vomiting_character",
            label: "Character",
            type: "radio",
            showIf: { field: "gigu_vomiting", equals: "yes" },
            options: [
              { label: "Food contents", value: "food" },
              { label: "Bilious", value: "bilious" },
              { label: "Bloody", value: "bloody" },
              { label: "Coffee-ground", value: "coffee_ground" }
            ]
          },
          // Diet / Swallowing
          { type: "subheading", label: "Diet / Swallowing" },
          {
            name: "gigu_appetite",
            label: "Appetite",
            type: "radio",
            options: [
              { label: "Normal", value: "normal" },
              { label: "Decreased", value: "decreased" },
              { label: "Increased", value: "increased" },
              { label: "Unable to eat", value: "unable" }
            ]
          },
          {
            name: "gigu_weight_change",
            label: "Recent weight change",
            type: "radio",
            options: [
              { label: "No", value: "no" },
              { label: "Yes", value: "yes" }
            ]
          },
          {
            name: "gigu_weight_change_type",
            label: "Weight change type",
            type: "radio",
            showIf: { field: "gigu_weight_change", equals: "yes" },
            options: [
              { label: "Loss", value: "loss" },
              { label: "Gain", value: "gain" }
            ]
          },
          {
            name: "gigu_swallowing",
            label: "Swallowing difficulty",
            type: "radio",
            options: [
              { label: "No", value: "no" },
              { label: "Yes", value: "yes" }
            ]
          },
          {
            name: "gigu_swallowing_type",
            label: "Swallowing difficulty type",
            type: "checkbox-group",
            showIf: { field: "gigu_swallowing", equals: "yes" },
            options: [
              { label: "Solids", value: "solids" },
              { label: "Liquids", value: "liquids" },
              { label: "Both", value: "both" }
            ]
          },
          // Urinary Symptoms
          { type: "subheading", label: "Urinary Symptoms" },
          {
            name: "gigu_dysuria",
            label: "Dysuria",
            type: "radio",
            options: [
              { label: "No", value: "no" },
              { label: "Yes", value: "yes" }
            ]
          },
          {
            name: "gigu_dysuria_type",
            label: "Dysuria type",
            type: "checkbox-group",
            showIf: { field: "gigu_dysuria", equals: "yes" },
            options: [
              { label: "Internal", value: "internal" },
              { label: "External", value: "external" }
            ]
          },
          {
            name: "gigu_frequency",
            label: "Frequency",
            type: "radio",
            options: [
              { label: "No", value: "no" },
              { label: "Yes", value: "yes" }
            ]
          },
          {
            name: "gigu_frequency_type",
            label: "Frequency type",
            type: "checkbox-group",
            showIf: { field: "gigu_frequency", equals: "yes" },
            options: [
              { label: "Daytime", value: "daytime" },
              { label: "Nocturia", value: "nocturia" },
              { label: "Both", value: "both" }
            ]
          },
          {
            name: "gigu_urgency",
            label: "Urgency",
            type: "radio",
            options: [
              { label: "No", value: "no" },
              { label: "Yes", value: "yes" }
            ]
          },
          {
            name: "gigu_incontinence",
            label: "Incontinence",
            type: "radio",
            options: [
              { label: "No", value: "no" },
              { label: "Stress", value: "stress" },
              { label: "Urge", value: "urge" },
              { label: "Overflow", value: "overflow" },
              { label: "Functional", value: "functional" }
            ]
          },
          {
            name: "gigu_hesitancy",
            label: "Hesitancy",
            type: "radio",
            options: [
              { label: "No", value: "no" },
              { label: "Yes", value: "yes" }
            ]
          },
          {
            name: "gigu_weak_stream",
            label: "Weak stream",
            type: "radio",
            options: [
              { label: "No", value: "no" },
              { label: "Yes", value: "yes" }
            ]
          },
          {
            name: "gigu_hematuria",
            label: "Hematuria",
            type: "radio",
            options: [
              { label: "No", value: "no" },
              { label: "Yes", value: "yes" }
            ]
          },
          {
            name: "gigu_flank_pain",
            label: "Flank pain",
            type: "radio",
            options: [
              { label: "No", value: "no" },
              { label: "Yes", value: "yes" }
            ]
          },
          // Flank pain OPQRST (if yes)
          { type: "subheading", label: "Flank pain OPQRST", showIf: { field: "gigu_flank_pain", equals: "yes" } },
          { name: "gigu_fp_onset", label: "O — Onset", type: "input", showIf: { field: "gigu_flank_pain", equals: "yes" } },
          {
            name: "gigu_fp_provocation",
            label: "P — Provocation/Palliation",
            type: "radio",
            labelAbove: true,
            options: [
              { label: "With movement", value: "with_movement" },
              { label: "At rest", value: "at_rest" },
              { label: "Both", value: "both" },
              { label: "Relieved by", value: "relieved_by" }
            ],
            showIf: { field: "gigu_flank_pain", equals: "yes" }
          },
          { name: "gigu_fp_relieved_by", label: "Relieved by (specify)", type: "input", showIf: { field: "gigu_fp_provocation", equals: "relieved_by" } },
          { name: "gigu_fp_quality", label: "Q — Quality", type: "input", showIf: { field: "gigu_flank_pain", equals: "yes" } },
          { name: "gigu_fp_region", label: "R — Region/Radiation", type: "input", showIf: { field: "gigu_flank_pain", equals: "yes" } },
          {
            type: "row",
            fields: [
              { name: "gigu_fp_severity_rest", label: "S — Severity At rest (0–10)", type: "scale-slider", min: 0, max: 10, step: 1, showValue: true, showIf: { field: "gigu_flank_pain", equals: "yes" } },
              { name: "gigu_fp_severity_movement", label: "S — Severity With movement (0–10)", type: "scale-slider", min: 0, max: 10, step: 1, showValue: true, showIf: { field: "gigu_flank_pain", equals: "yes" } }
            ]
          },
          { name: "gigu_fp_timing", label: "T — Timing", type: "input", showIf: { field: "gigu_flank_pain", equals: "yes" } }
        ]
      },
      // ═══════════════════════════════════════════════════════════════
      // OBJECTIVE (Clinician Observed)
      // ═══════════════════════════════════════════════════════════════
      {
        title: "OBJECTIVE (Clinician Observed)",
        fields: [
          {
            name: "gigu_general_appearance",
            label: "General Appearance",
            type: "radio",
            options: [
              { label: "Comfortable", value: "comfortable" },
              { label: "Distressed", value: "distressed" },
              { label: "Guarding abdomen", value: "guarding" },
              { label: "Diaphoretic", value: "diaphoretic" },
              { label: "Dehydrated appearance", value: "dehydrated" },
              { label: "None", value: "none" }
            ]
          },
          {
            name: "gigu_hydration",
            label: "Hydration Indicators",
            type: "radio",
            labelAbove: true,
            options: [
              { label: "Moist mucous membranes", value: "moist_mucous" },
              { label: "Dry mucous membranes", value: "dry_mucous" },
              { label: "Normal skin turgor", value: "normal_turgor" },
              { label: "Poor skin turgor", value: "poor_turgor" },
              { label: "Sunken eyes", value: "sunken_eyes" },
              { label: "None", value: "none" }
            ]
          },
          { type: "subheading", label: "Abdominal Inspection" },
          {
            name: "gigu_contour",
            label: "Contour",
            type: "radio",
            options: [
              { label: "Flat", value: "flat" },
              { label: "Rounded", value: "rounded" },
              { label: "Protuberant", value: "protuberant" },
              { label: "Scaphoid", value: "scaphoid" }
            ]
          },
          {
            name: "gigu_symmetry",
            label: "Symmetry",
            type: "radio",
            options: [
              { label: "Symmetric", value: "symmetric" },
              { label: "Asymmetric", value: "asymmetric" }
            ]
          },
          {
            name: "gigu_skin",
            label: "Skin",
            type: "radio",
            options: [
              { label: "Intact", value: "intact" },
              { label: "Scars", value: "scars" },
              { label: "Striae", value: "striae" },
              { label: "Lesions", value: "lesions" },
              { label: "Bruising", value: "bruising" }
            ]
          },
          {
            name: "gigu_umbilicus",
            label: "Umbilicus",
            type: "radio",
            options: [
              { label: "Midline/inverted", value: "midline" },
              { label: "Everted", value: "everted" },
              { label: "Deviated", value: "deviated" }
            ]
          },
          {
            name: "gigu_visible_movement",
            label: "Visible movement",
            type: "radio",
            options: [
              { label: "None", value: "none" },
              { label: "Pulsations", value: "pulsations" },
              { label: "Visible peristalsis", value: "peristalsis" }
            ]
          },
          { type: "subheading", label: "Auscultation" },
          {
            name: "gigu_bowel_sounds",
            label: "Bowel sounds",
            type: "radio",
            options: [
              { label: "Normoactive", value: "normoactive" },
              { label: "Hypoactive", value: "hypoactive" },
              { label: "Hyperactive", value: "hyperactive" },
              { label: "Absent", value: "absent" }
            ]
          },
          {
            name: "gigu_vascular_sounds",
            label: "Vascular sounds",
            type: "radio",
            options: [
              { label: "None", value: "none" },
              { label: "Bruit present", value: "bruit" }
            ]
          },
          {
            name: "gigu_vascular_location",
            label: "Bruit location",
            type: "input",
            showIf: { field: "gigu_vascular_sounds", equals: "bruit" }
          },
          { type: "subheading", label: "Palpation" },
          {
            name: "gigu_tenderness",
            label: "Tenderness",
            type: "radio",
            options: [
              { label: "None", value: "none" },
              { label: "Localized", value: "localized" },
              { label: "Generalized", value: "generalized" }
            ]
          },
          {
            name: "gigu_tenderness_location",
            label: "Location",
            type: "input",
            showIf: { field: "gigu_tenderness", equals: "localized" }
          },
          {
            name: "gigu_guarding",
            label: "Guarding",
            type: "radio",
            options: [
              { label: "None", value: "none" },
              { label: "Voluntary", value: "voluntary" },
              { label: "Involuntary", value: "involuntary" }
            ]
          },
          {
            name: "gigu_rigidity",
            label: "Rigidity",
            type: "radio",
            options: [
              { label: "No", value: "no" },
              { label: "Yes", value: "yes" }
            ]
          },
          {
            name: "gigu_rebound",
            label: "Rebound tenderness",
            type: "radio",
            options: [
              { label: "No", value: "no" },
              { label: "Yes", value: "yes" }
            ]
          },
          {
            name: "gigu_masses",
            label: "Masses",
            type: "radio",
            options: [
              { label: "None", value: "none" },
              { label: "Present", value: "present" }
            ]
          },
          {
            name: "gigu_masses_location",
            label: "Location/size",
            type: "input",
            showIf: { field: "gigu_masses", equals: "present" }
          },
          {
            name: "gigu_bladder_distention",
            label: "Bladder distention",
            type: "radio",
            options: [
              { label: "No", value: "no" },
              { label: "Yes", value: "yes" }
            ]
          },
          { type: "subheading", label: "Percussion (If performed)" },
          {
            name: "gigu_percussion",
            label: "Percussion",
            type: "radio",
            options: [
              { label: "Tympany", value: "tympany" },
              { label: "Dullness", value: "dullness" },
              { label: "CVA tenderness absent", value: "cva_absent" },
              { label: "CVA tenderness present", value: "cva_present" }
            ]
          },
          {
            name: "gigu_cva_side",
            label: "CVA tenderness side",
            type: "checkbox-group",
            showIf: { field: "gigu_percussion", equals: "cva_present" },
            options: [
              { label: "Right", value: "right" },
              { label: "Left", value: "left" }
            ]
          },
          { type: "subheading", label: "Urinary Output / Urine Characteristics" },
          {
            name: "gigu_voiding_method",
            label: "Voiding method",
            type: "radio",
            labelAbove: true,
            options: [
              { label: "Spontaneous", value: "spontaneous" },
              { label: "External catheter", value: "external_cath" },
              { label: "Indwelling catheter", value: "indwelling" },
              { label: "Intermittent catheter", value: "intermittent" },
              { label: "Urostomy", value: "urostomy" }
            ]
          },
          {
            name: "gigu_urine_color",
            label: "Urine color",
            type: "radio",
            options: [
              { label: "Clear/pale yellow", value: "clear" },
              { label: "Dark amber", value: "dark_amber" },
              { label: "Cloudy", value: "cloudy" },
              { label: "Bloody", value: "bloody" },
              { label: "Tea-colored", value: "tea_colored" }
            ]
          },
          {
            name: "gigu_urine_odor",
            label: "Urine odor",
            type: "radio",
            options: [
              { label: "Normal", value: "normal" },
              { label: "Foul", value: "foul" }
            ]
          },
          {
            name: "gigu_urine_amount",
            label: "Urine amount",
            type: "radio",
            options: [
              { label: "Adequate", value: "adequate" },
              { label: "Oliguria", value: "oliguria" },
              { label: "Anuria", value: "anuria" },
              { label: "Polyuria", value: "polyuria" }
            ]
          },
          {
            name: "gigu_output_last_shift",
            label: "Output (last shift) (mL)",
            type: "input",
            placeholder: "mL"
          }
        ]
      }
    ]
  };

  return (
    <CommonFormBuilder
      schema={GI_GU_SCHEMA}
      values={values}
      onChange={onChange}
      layout={layout}
    />
  );
}
