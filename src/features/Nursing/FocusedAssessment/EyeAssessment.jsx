import React, { useState } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

export default function EyeAssessment({ layout = "root" }) {
  const [values, setValues] = useState({});

  const onChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const EYE_SCHEMA = {
    title: "Focussed Eye Assessment",
    sections: [
      // ═══════════════════════════════════════════════════════════════
      // SUBJECTIVE (Patient Reported)
      // ═══════════════════════════════════════════════════════════════
      {
        title: "SUBJECTIVE (Patient Reported)",
        fields: [
          {
            name: "eye_vision_symptoms",
            label: "Vision Symptoms",
            type: "checkbox-group",
            options: [
              { label: "No visual complaints", value: "none" },
              { label: "Blurred vision", value: "blurred" },
              { label: "Double vision (diplopia)", value: "diplopia" },
              { label: "Loss of vision", value: "loss" },
              { label: "Difficulty focusing", value: "difficulty_focusing" },
              { label: "Night vision difficulty", value: "night_vision" },
              { label: "Eye fatigue", value: "eye_fatigue" }
            ]
          },
          {
            name: "eye_discomfort",
            label: "Eye Discomfort",
            type: "checkbox-group",
            options: [
              { label: "None", value: "none" },
              { label: "Eye pain", value: "pain" },
              { label: "Burning", value: "burning" },
              { label: "Itching", value: "itching" },
              { label: "Foreign body sensation", value: "foreign_body" },
              { label: "Pressure", value: "pressure" }
            ]
          },
          {
            name: "eye_redness_discharge",
            label: "Redness / Discharge",
            type: "checkbox-group",
            options: [
              { label: "None", value: "none" },
              { label: "Redness", value: "redness" },
              { label: "Tearing", value: "tearing" },
              { label: "Discharge", value: "discharge" },
              { label: "Dry eyes", value: "dry_eyes" }
            ]
          },
          {
            name: "eye_light_sensitivity",
            label: "Light Sensitivity",
            type: "radio",
            options: [
              { label: "Denies photophobia", value: "denies" },
              { label: "Photophobia present", value: "present" }
            ]
          },
          {
            name: "eye_history",
            label: "Eye History",
            type: "checkbox-group",
            options: [
              { label: "Wears glasses", value: "glasses" },
              { label: "Wears contact lenses", value: "contacts" },
              { label: "Eye surgery history", value: "surgery" },
              { label: "Eye trauma history", value: "trauma" },
              { label: "Known eye disease", value: "eye_disease" }
            ]
          }
        ]
      },
      // ═══════════════════════════════════════════════════════════════
      // OBJECTIVE (Clinician Observed)
      // ═══════════════════════════════════════════════════════════════
      {
        title: "OBJECTIVE (Clinician Observed)",
        fields: [
          {
            name: "eye_external_structures",
            label: "External Eye Structures",
            type: "checkbox-group",
            options: [
              { label: "Eyelids symmetrical", value: "symmetrical" },
              { label: "Eyelid swelling", value: "swelling" },
              { label: "Ptosis", value: "ptosis" },
              { label: "Redness", value: "redness" },
              { label: "Lesions", value: "lesions" }
            ]
          },
          {
            name: "eye_sclera_conjunctiva",
            label: "Sclera / Conjunctiva",
            type: "checkbox-group",
            options: [
              { label: "Sclera white", value: "sclera_white" },
              { label: "Scleral icterus", value: "scleral_icterus" },
              { label: "Conjunctiva pink", value: "conjunctiva_pink" },
              { label: "Conjunctival redness", value: "conjunctival_redness" },
              { label: "Conjunctival swelling", value: "conjunctival_swelling" }
            ]
          },
          {
            name: "eye_pupils",
            label: "Pupils",
            type: "checkbox-group",
            options: [
              { label: "Equal", value: "equal" },
              { label: "Unequal (anisocoria)", value: "unequal" },
              { label: "Round", value: "round" },
              { label: "Irregular", value: "irregular" },
              { label: "Clear", value: "clear" },
              { label: "Cloudy", value: "cloudy" }
            ]
          },
          {
            name: "eye_pupil_size_mm",
            label: "Pupil Size (mm)",
            type: "input",
            placeholder: "e.g. 4"
          },
          {
            name: "eye_pupil_response",
            label: "Pupil Response",
            type: "radio",
            labelAbove: true,
            options: [
              { label: "Reactive to light (direct)", value: "direct" },
              { label: "Reactive to light (consensual)", value: "consensual" },
              { label: "Accommodation present", value: "accommodation" },
              { label: "Non-reactive", value: "non_reactive" }
            ]
          },
          {
            name: "eye_eom",
            label: "Extraocular Movements (CN III, IV, VI)",
            type: "checkbox-group",
            options: [
              { label: "Full Range Of Motion", value: "full_rom" },
              { label: "Limited Range Of Motion", value: "limited_rom" },
              { label: "Nystagmus present", value: "nystagmus" },
              { label: "Strabismus present", value: "strabismus" },
              { label: "Pain with movement", value: "pain_movement" }
            ]
          },
          {
            name: "eye_visual_tracking",
            label: "Visual Tracking",
            type: "radio",
            options: [
              { label: "Tracks smoothly", value: "smoothly" },
              { label: "Unable to track", value: "unable" }
            ]
          },
          {
            name: "eye_corneal_clarity",
            label: "Corneal Clarity",
            type: "radio",
            options: [
              { label: "Clear", value: "clear" },
              { label: "Cloudy", value: "cloudy" }
            ]
          },
          {
            name: "eye_visual_fields",
            label: "Visual Fields (Confrontation)",
            type: "radio",
            options: [
              { label: "Intact", value: "intact" },
              { label: "Deficit noted", value: "deficit" }
            ]
          },
          {
            name: "eye_overall_summary",
            label: "Overall Summary",
            type: "radio",
            options: [
              { label: "PERRLA", value: "perrla" },
              { label: "Abnormal", value: "abnormal" }
            ]
          },
          {
            name: "eye_overall_summary_specify",
            label: "Abnormal — specify",
            type: "input",
            showIf: { field: "eye_overall_summary", equals: "abnormal" }
          }
        ]
      }
    ]
  };

  return (
    <CommonFormBuilder
      schema={EYE_SCHEMA}
      values={values}
      onChange={onChange}
      layout={layout}
    />
  );
}
