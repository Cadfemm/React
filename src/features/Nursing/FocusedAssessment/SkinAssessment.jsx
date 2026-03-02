import React, { useState } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

export default function SkinAssessment({ layout = "root" }) {
  const [values, setValues] = useState({});

  const onChange = (name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const SKIN_SCHEMA = {
    title: "Integumentary (Skin) Assessment – Focussed",
    sections: [
      // SECTION 1 — SUBJECTIVE
      {
        title: "SUBJECTIVE (Patient Reported)",
        fields: [
          {
            name: "skin_symptoms",
            label: "Skin Symptoms",
            type: "checkbox-group",
            options: [
              { label: "No skin complaints", value: "none" },
              { label: "Itching (pruritus)", value: "itching" },
              { label: "Pain/tenderness", value: "pain" },
              { label: "Burning/stinging", value: "burning" },
              { label: "Numbness/tingling", value: "numbness_tingling" },
              { label: "Tightness/dryness", value: "tightness_dryness" }
            ]
          },
          {
            name: "skin_wounds_lesions",
            label: "Wounds / Lesions",
            type: "checkbox-group",
            options: [
              { label: "No wounds", value: "none" },
              { label: "Open wound", value: "open_wound" },
              { label: "Pressure injury", value: "pressure_injury" },
              { label: "Surgical incision", value: "surgical_incision" },
              { label: "Rash", value: "rash" },
              { label: "Blister", value: "blister" },
              { label: "Non-healing ulcer", value: "non_healing_ulcer" },
              { label: "Drainage from skin", value: "drainage" }
            ]
          },
          {
            name: "skin_color_changes",
            label: "Color / Changes",
            type: "radio",
            labelAbove: true,
            options: [
              { label: "No changes", value: "no_changes" },
              { label: "Redness", value: "redness" },
              { label: "Darkening", value: "darkening" },
              { label: "Pallor", value: "pallor" },
              { label: "Yellowing (jaundice)", value: "jaundice" },
              { label: "Bruising", value: "bruising" },
              { label: "Skin breakdown", value: "skin_breakdown" }
            ]
          },
          {
            name: "skin_moisture_subjective",
            label: "Moisture",
            type: "radio",
            options: [
              { label: "Normal", value: "normal" },
              { label: "Excess sweating", value: "excess_sweating" },
              { label: "Dry skin", value: "dry_skin" }
            ]
          },
          {
            name: "skin_edema_subjective",
            label: "Edema",
            type: "radio",
            options: [
              { label: "Denies swelling", value: "denies" },
              { label: "Localized swelling", value: "localized" },
              { label: "Generalized swelling", value: "generalized" }
            ]
          },
          {
            name: "skin_sensation_subjective",
            label: "Sensation",
            type: "radio",
            options: [
              { label: "Normal sensation", value: "normal" },
              { label: "Decreased sensation", value: "decreased" },
              { label: "Burning", value: "burning" },
              { label: "Tingling", value: "tingling" }
            ]
          },
          {
            name: "skin_hair_nails_subjective",
            label: "Hair / Nails",
            type: "radio",
            options: [
              { label: "No concerns", value: "no_concerns" },
              { label: "Hair loss", value: "hair_loss" },
              { label: "Brittle nails", value: "brittle_nails" },
              { label: "Nail discoloration", value: "nail_discoloration" }
            ]
          }
        ]
      },
      // SECTION 2 — OBJECTIVE
      {
        title: "OBJECTIVE (Clinician Observed)",
        fields: [
          {
            name: "skin_general_appearance",
            label: "General Skin Appearance",
            type: "radio",
            labelAbove: true,
            options: [
              { label: "Intact", value: "intact" },
              { label: "Warm", value: "warm" },
              { label: "Cool", value: "cool" },
              { label: "Dry", value: "dry" },
              { label: "Moist", value: "moist" },
              { label: "Diaphoretic", value: "diaphoretic" }
            ]
          },
          {
            name: "skin_color_objective",
            label: "Skin Color",
            type: "radio",
            labelAbove: true,
            options: [
              { label: "Appropriate for ethnicity", value: "appropriate" },
              { label: "Pale", value: "pale" },
              { label: "Cyanotic", value: "cyanotic" },
              { label: "Erythematous", value: "erythematous" },
              { label: "Jaundiced", value: "jaundiced" },
              { label: "Hyperpigmented", value: "hyperpigmented" },
              { label: "Hypopigmented", value: "hypopigmented" }
            ]
          },
          {
            name: "skin_integrity",
            label: "Skin Integrity",
            type: "checkbox-group",
            options: [
              { label: "Intact", value: "intact" },
              { label: "Rash", value: "rash" },
              { label: "Bruising", value: "bruising" },
              { label: "Abrasion", value: "abrasion" },
              { label: "Laceration", value: "laceration" },
              { label: "Pressure injury", value: "pressure_injury" },
              { label: "Surgical incision", value: "surgical_incision" },
              { label: "Open wound", value: "open_wound" }
            ]
          },
          {
            name: "skin_wounds_lesions_objective",
            label: "Wounds / Lesions (If Present)",
            type: "checkbox-group",
            options: [
              { label: "No wounds", value: "none" },
              { label: "Drainage present", value: "drainage_present" },
              { label: "Odor present", value: "odor_present" },
              { label: "Redness around wound", value: "redness_around" },
              { label: "Swelling around wound", value: "swelling_around" },
              { label: "Necrotic tissue", value: "necrotic" },
              { label: "Tunneling", value: "tunneling" },
              { label: "Undermining", value: "undermining" }
            ]
          },
          {
            name: "skin_pressure_areas",
            label: "Pressure Areas Checked",
            type: "checkbox-group",
            options: [
              { label: "Occiput", value: "occiput" },
              { label: "Sacrum", value: "sacrum" },
              { label: "Heels", value: "heels" },
              { label: "Hips", value: "hips" },
              { label: "Shoulders", value: "shoulders" },
              { label: "Elbows", value: "elbows" },
              { label: "Other bony prominences", value: "other_bony" }
            ]
          },
          {
            name: "skin_edema_objective",
            label: "Edema",
            type: "radio",
            labelAbove: true,
            options: [
              { label: "None", value: "none" },
              { label: "1+ mild", value: "1_plus" },
              { label: "2+ moderate", value: "2_plus" },
              { label: "3+ severe", value: "3_plus" },
              { label: "4+ extreme", value: "4_plus" },
              { label: "Dependent", value: "dependent" },
              { label: "Generalized", value: "generalized" }
            ]
          },
          {
            name: "skin_temperature",
            label: "Temperature",
            type: "radio",
            options: [
              { label: "Warm", value: "warm" },
              { label: "Cool", value: "cool" },
              { label: "Hot", value: "hot" }
            ]
          },
          {
            name: "skin_turgor",
            label: "Turgor",
            type: "radio",
            options: [
              { label: "Normal", value: "normal" },
              { label: "Decreased", value: "decreased" },
              { label: "Tenting", value: "tenting" },
              { label: "Tight", value: "tight" }
            ]
          },
          {
            name: "skin_hair_distribution",
            label: "Hair Distribution",
            type: "radio",
            options: [
              { label: "Normal", value: "normal" },
              { label: "Decreased", value: "decreased" },
              { label: "Patchy loss", value: "patchy_loss" }
            ]
          },
          {
            name: "skin_nails",
            label: "Nails",
            type: "radio",
            labelAbove: true,
            options: [
              { label: "Normal", value: "normal" },
              { label: "Clubbing", value: "clubbing" },
              { label: "Spoon-shaped", value: "spoon_shaped" },
              { label: "Pale nail beds", value: "pale_beds" },
              { label: "Thickened", value: "thickened" },
              { label: "Brittle", value: "brittle" }
            ]
          },
          {
            name: "skin_sensation_touch",
            label: "Sensation to Touch",
            type: "radio",
            options: [
              { label: "Intact", value: "intact" },
              { label: "Decreased", value: "decreased" },
              { label: "Absent", value: "absent" }
            ]
          },
          {
            name: "skin_pressure_staging",
            label: "Pressure injury staging",
            type: "radio",
            labelAbove: true,
            options: [
              { label: "Stage 1", value: "stage_1" },
              { label: "Stage 2", value: "stage_2" },
              { label: "Stage 3", value: "stage_3" },
              { label: "Stage 4", value: "stage_4" },
              { label: "Unstageable", value: "unstageable" },
              { label: "DTPI", value: "dtpi" }
            ]
          }
        ]
      }
    ]
  };

  return (
    <CommonFormBuilder
      schema={SKIN_SCHEMA}
      values={values}
      onChange={onChange}
      layout={layout}
    />
  );
}

