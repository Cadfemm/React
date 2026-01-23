import React, { useState } from "react";
import CommonFormBuilder from "../CommonComponenets/FormBuilder";

export default function BinocularVisionAssessment({ onBack,  layout = "root" }) {
  const [values, setValues] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const VisionTherapyAssessmentSchema = {
    title: "BINOCULAR VISION", 
    sections: [
      {
        title: "Subjective",
        fields: [
          { type: "subheading", label: "Complaints" },
 
          {
            type: "row",
            fields: [
              {
                type: "radio",
                name: "which_eye",
                label: "Eye",
                options: [
                  { label: "Right", value: "right" },
                  { label: "Left", value: "left" },
                  { label: "Both", value: "both" }
                ]
              },
              {
                type: "radio",
                name: "diplopia_status",
                label: "Diplopia",
                options: [
                  { label: "Presented", value: "presented" },
                  { label: "Not Presented", value: "not_presented" }
                ]
              }
            ]
          },
 
          {
            type: "textarea",
            name: "complaint_others",
            label: "Others (Specify)"
          },
 
          { type: "subheading", label: "History" },
 
      {
                type: "radio",
                name: "onset",
                label: "Onset",
                options: [
                  { label: "Sudden", value: "sudden" },
                  { label: "Gradual", value: "gradual" }
                ]
              },
              {
                type: "radio",
                name: "frequency",
                label: "Frequency",
                options: [
                  { label: "Constant", value: "constant" },
                  { label: "Intermittent", value: "intermittent" },
                  { label: "Alternating", value: "alternating" }
                ]
              },
          
      
              {
                type: "radio",
                name: "was_he_been",
                label: "Neurological disease",
                options: [
                  { label: "Yes", value: "yes" },
                  { label: "No", value: "no" }
                ]
              },
       
 
          {
            type: "textarea",
            name: "was_he_been_specify",
            label: "Neurologica - specify",
            showIf: {
              field: "was_he_been",
              equals: "yes"
            }
          },
 
 
 
          {
            type: "row",
            fields: [
              {
                type: "input",
                name: "type_of_birth",
                label: "Type of Birth"
              },
              {
                type: "input",
                name: "birth_term",
                label: "Birth Term"
              }
            ]
          },
 
          /* ---- One per row (full width) ---- */
 
          {
            type: "textarea",
            name: "previous_treatment",
            label: "Previous Treatment"
          },
 
          {
            type: "textarea",
            name: "subjective_remark",
            label: "Remark"
          }
        ]
      },
 
 
 
      /* ===================== OBJECTIVE ===================== */
      {
        title: "Objective",
        fields: [
          {
            type: "multi-select-dropdown",
            name: "ocular_signs",
            label: "Ocular Signs",
            options: [
              { label: "Squint / turn of eyes", value: "Squint" },
              { label: "Defective eye movement", value: "Defective eye movement" },
              { label: "Nystagmus (wobbling eyes)", value: "Nystagmus" },
              { label: "Visual inattention / neglect", value: "Visual inattention" },
              { label: "Closing one eye", value: "Closing one eye" },
              { label: "Suspected visual problem", value: "Suspected visual problem" },
              { label: "Ptosis (lid drop)", value: "Ptosis" },
              { label: "Abnormal pupils", value: "Abnormal pupils" },
              { label: "Head turn", value: "Head turn" },
              { label: "Family concern", value: "Family concern" },
              { label: "Misjudging distance", value: "Misjudging distance" },
              { label: "Other (Specify)", value: "Other" }
            ]
          },
 
          {
            type: "textarea",
            name: "ocular_signs_other",
            label: "Other – Specify",
            showIf: {
              field: "ocular_signs",
              includes: "Other"
            }
          },
 
        ]
      },
 
      /* ===================== ANALYSIS / ASSESSMENT ===================== */
      {
        title: "Analysis / Assessment",
        fields: [
          { type: "subheading", label: "General Examination" },
 
          {
            type: "row",
            fields: [
              { type: "input", name: "stereopsis", label: "Stereopsis" },
              { type: "input", name: "stereopsis_method", label: "Method" }
            ]
          },
 
          {
            type: "row",
            fields: [
              { type: "input", name: "suppression_6m", label: "Suppression Test (6m)" },
              { type: "input", name: "suppression_40cm", label: "Suppression Test (40cm)" }
            ]
          },
          { type: "subheading", label: "Visual Acuity – Aided" },
 
          {
            type: "grid-header",
            cols: ["Right Eye (Right Eye (RE))", "Left Eye (Left Eye (LE))", "Both Eyes (Both Eye (LE))"]
          },
          {
            type: "grid-row",
            name: "va_aided_distance",
            label: "Distance",
            cols: ["Right Eye (Right Eye (RE))", "Left Eye (Left Eye (LE))", "Both Eyes (Both Eye (LE))"]
          },
          {
            type: "grid-row",
            name: "va_aided_near",
            label: "Near",
            cols: ["Right Eye (Right Eye (RE))", "Left Eye (Left Eye (LE))", "Both Eyes (Both Eye (LE))"]
          },
          {
            type: "textarea",
            name: "va_aided_remark",
            label: "Remark"
          },
 
          { type: "subheading", label: "Visual Acuity – Unaided" },
 
          {
            type: "grid-header",
            cols: ["Right Eye (Right Eye (RE))", "Left Eye (Left Eye (LE))", "Both Eyes (Both Eye (LE))"]
          },
          {
            type: "grid-row",
            name: "va_unaided_distance",
            label: "Distance",
            cols: ["Right Eye (Right Eye (RE))", "Left Eye (Left Eye (LE))", "Both Eyes (Both Eye (LE))"]
          },
          {
            type: "grid-row",
            name: "va_unaided_near",
            label: "Near",
            cols: ["Right Eye (Right Eye (RE))", "Left Eye (Left Eye (LE))", "Both Eyes (Both Eye (LE))"]
          },
          {
            type: "textarea",
            name: "va_unaided_remark",
            label: "Remark"
          },
          { type: "subheading", label: "Subjective Refraction" },

          {
            type: "refraction-table",
            name: "subjective_refraction",
            columns: ["Sphere", "Cylinder", "Axis", "Prism", "Visual Acuity"],
            rows: [
              { label: "Distance", value: "distance" },
              { label: "ADD", value: "add" },
              { label: "Near", value: "near" }
            ]
          },

          { type: "subheading", label: "Cycloplegic Refraction" },

          {
            type: "refraction-table",
            name: "cycloplegic_refraction",
            columns: ["Sphere", "Cylinder", "Axis", "Prism", "Visual Acuity"],
            rows: [
              { label: "Distance", value: "distance" }
            ]
          },
          {
            type: "radio",
            name: "abnormal_head_posture",
            label: "Abnormal Head Posture (AHP)",
            options: [
              { label: "Presented", value: "presented" },
              { label: "Not Presented", value: "not_presented" }
            ]
          },
 
          {
            type: "textarea",
            name: "ahp_specify",
            label: "Specify",
            showIf: {
              field: "abnormal_head_posture",
              equals: "presented"
            }
          },
          {
            type: "textarea",
            name: "extra_oculomotor_test_notes",
            label: "Extra OculoMotor Test"
          },
 
          {
            type: "textarea",
            name: "npc",
            label: "Near Point of Convergence (NPC)"
          },
 
          {
            type: "textarea",
            name: "hirschberg_test",
            label: "Hirschberg Test"
          },
 
          {
            type: "textarea",
            name: "krimsky_test",
            label: "Krimsky Test"
          },
 
 
 
          // {
          //   type: "row",
          //   fields: [
          //     {
          //       type: "radio",
          //       name: "abnormal_head_posture",
          //       label: "Abnormal Head Posture",
          //       options: [
          //         { label: "Presented", value: "presented" },
          //         { label: "Not Presented", value: "not_presented" }
          //       ]
          //     },
          //     {
          //       type: "input",
          //       name: "abnormal_head_specify",
          //       label: "Specify",
          //       showIf: {
          //         field: "abnormal_head_posture",
          //         equals: "presented"
          //       }
          //     }
          //   ]
          // },
 
          // {
          //   type: "attach-file",
          //   name: "extra_oculomotor_test",
          //   title: "Extra Oculo Motor Test (PDF / Image)",
          //   accept: ".pdf,image/*"
          // },
 
          // {
          //   type: "row",
          //   fields: [
          //     { type: "input", name: "hirschberg_test", label: "Hirschberg Test" },
          //     { type: "input", name: "krimsky_test", label: "Krimsky Test" }
          //   ]
          // },
 
          { type: "subheading", label: "Cover Test" },

          {
            type: "grid-header",
            cols: ["Unaided", "Aided"]
          },

          // Cover Test
          {
            type: "grid-row",
            name: "cover_6m",
            label: "6m – Target",
            cols: ["U", "A"]
          },
          {
            type: "grid-row",
            name: "cover_33cm",
            label: "33cm – Target",
            cols: ["U", "A"]
          },
 
          { type: "subheading", label: "Prism Cover Test (PCT)" },
    {
            type: "grid-header",
            cols: ["Unaided", "Aided"]
          },
          {
            type: "grid-row",
            name: "pct_6m",
            label: "6m",
            cols: ["U", "A"]
          },
          {
            type: "grid-row",
            name: "pct_33cm",
            label: "33cm",
            cols: ["U", "A"]
          },
          {
            type: "grid-row",
            name: "pct_plus3",
            label: "+3.00 DS",
            cols: ["U", "A"]
          },
 
          // Fixating Eye
          {
            type: "row",
            fields: [
              {
                type: "single-select",
                name: "pct_fixating_unaided",
                label: "Fixating Eye (Unaided)",
                options: [
                  { label: "Right Eye (Right Eye (RE))", value: "Right Eye (RE)" },
                  { label: "Left Eye (LE)", value: "Left Eye (LE)" }
                ]
              },
              {
                type: "single-select",
                name: "pct_fixating_aided",
                label: "Fixating Eye (Aided)",
                options: [
                  { label: "Right Eye (RE)", value: "Right Eye (RE)" },
                  { label: "Left Eye (LE)", value: "Left Eye (LE)" }
                ]
              }
            ]
          },
 
          { type: "subheading", label: "Simultaneous Prism Cover Test (SPCT)" },
 
          {
            type: "grid-row",
            name: "spct_6m",
            label: "6m",
            cols: ["U", "A"]
          },
          {
            type: "grid-row",
            name: "spct_33cm",
            label: "33cm",
            cols: ["U", "A"]
          },
 
          { type: "subheading", label: "Phoria Test" },
 
          {
            type: "row",
            fields: [
              {
                type: "input",
                name: "phoria_distance_h",
                label: "Distance – H"
              },
              {
                type: "input",
                name: "phoria_distance_v",
                label: "Distance – V"
              }
            ]
          },
          {
            type: "row",
            fields: [
              {
                type: "input",
                name: "phoria_near_h",
                label: "Near – H"
              },
              {
                type: "input",
                name: "phoria_near_v",
                label: "Near – V"
              }
            ]
          },
 
          {
            type: "textarea",
            name: "cover_test_remark",
            label: "Remark"
          },
 
        ]
      }
      ,
 
      /* ===================== ACCOMMODATION ===================== */
      {
        title: "Accommodation",
        fields: [
 
          {
            type: "grid-header",
            cols: ["Right Eye (RE)", "Left Eye (LE)", "Both Eye (LE)"]
          },
 
          {
            type: "grid-row",
            name: "aa_amplitude",
            label: "Amplitude of Accommodation (AA)",
            cols: ["Right Eye (RE)", "Left Eye (LE)", "Both Eye (LE)"]
          },
          {
            type: "grid-row",
            name: "mem_monocular",
            label: "Monocular Estimate Method (MEM)",
            cols: ["Right Eye (RE)", "Left Eye (LE)", "Both Eye (LE)"]
          },
          {
            type: "grid-row",
            name: "nra",
            label: "Negative Relative Accommodation (NRA)",
            cols: ["Right Eye (RE)", "Left Eye (LE)", "Both Eye (LE)"]
          },
          {
            type: "grid-row",
            name: "pra",
            label: "Positive Relative Accommodation (PRA)",
            cols: ["Right Eye (RE)", "Left Eye (LE)", "Both Eye (LE)"]
          },
 
          { type: "subheading", label: "Accommodation Facility" },
 
          {
            type: "grid-header",
            cols: ["Right Eye (RE)", "Left Eye (LE)", "Both Eye (LE)"]
          },
          {
            type: "grid-row",
            name: "accommodation_facility",
            label: "Accommodation Facility",
            cols: ["Right Eye (RE)", "Left Eye (LE)", "Both Eye (LE)"]
          },
 
          {
            type: "textarea",
            name: "accommodation_remark",
            label: "Remark"
          },
 
        ]
      },
 
      /* ===================== VERGENCE ===================== */
      {
        title: "Vergence",
        fields: [
 
          {
            type: "grid-header",
            cols: ["6m", "40cm"]
          },
 
          {
            type: "grid-row",
            name: "vergence_method",
            label: "Method",
            cols: ["6m", "40cm"]
          },
          {
            type: "grid-row",
            name: "nfv",
            label: "Negative Fusional Vergence (NFV)",
            cols: ["6m", "40cm"]
          },
          {
            type: "grid-row",
            name: "pfv",
            label: "Positive Fusional Vergence (PFV)",
            cols: ["6m", "40cm"]
          },
          {
            type: "grid-row",
            name: "supra",
            label: "Supra",
            cols: ["6m", "40cm"]
          },
          {
            type: "grid-row",
            name: "infra",
            label: "Infra",
            cols: ["6m", "40cm"]
          },
 
          {
            type: "textarea",
            name: "vergence_remark",
            label: "Remark"
          },
 
          { type: "subheading", label: "Vergence Facility" },
 
          {
            type: "row",
            fields: [
              {
                type: "input",
                name: "vergence_facility_target",
                label: "Target"
              },
              {
                type: "input",
                name: "ac_a_ratio",
                label: "AC/A Ratio"
              }
            ]
          },
 
          {
            type: "textarea",
            name: "vergence_facility_remark",
            label: "Remark"
          },
 
        ]
      },
 
      /* ===================== STRABISMUS ===================== */
      {
        title: "Strabismus",
        fields: [
 
          {
            type: "textarea",
            name: "prism_cover_all_direction",
            label: "Prism Cover Test (All Direction)"
          },
 
          {
            type: "textarea",
            name: "diplopia_chart",
            label: "Diplopia Chart"
          },
 
          {
            type: "custom-image",
            name: "parks_3_step_img",
            label: "Parks 3 Step",
            src: "/strabismus.png"
          },
 
          {
            type: "input",
            name: "fixation",
            label: "Fixation"
          },
 
          {
            type: "textarea",
            name: "additional_test",
            label: "Additional Test"
          },
 
          {
            type: "textarea",
            name: "strabismus_remark",
            label: "Remark"
          },
 
        ]
      },
 
      {
        title: "Plan",
        fields: [
 
          {
            type: "textarea",
            name: "plan_comments",
            label: "Comments"
          },
 
          {
            type: "textarea",
            name: "plan_remark",
            label: "Remark"
          },
 
          {
            type: "radio",
            name: "plan_referral",
            label: "Referral",
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" }
            ]
          },
          {
            type: "textarea",
            name: "plan_referral_specify",
            label: "Specify",
            showIf: {
              field: "plan_referral",
              equals: "yes"
            }
          },
 
          {
            type: "radio",
            name: "plan_vision_therapy",
            label: "Proceed to Vision Therapy",
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" }
            ]
          },
          {
            type: "textarea",
            name: "plan_vision_therapy_specify",
            label: "Specify",
            showIf: {
              field: "plan_vision_therapy",
              equals: "yes"
            }
          },
 
        ]
      }
    ]
  };
 

  const onChange = (name, value) => {
    setValues(v => ({ ...v, [name]: value }));
  };

  const onAction = (type) => {
    if (type === "submit") {
      setSubmitted(true);
      console.log("PAED IA Speech & Language", values);
    }

    if (type === "back") {
      onBack?.();   
    }
  };


  return (
    <CommonFormBuilder
      schema={VisionTherapyAssessmentSchema}
      values={values}
      onChange={onChange}
      submitted={submitted}
      onAction={onAction}
        layout={layout}
    />
  );
}
