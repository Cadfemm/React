import React, { useState } from "react";
import CommonFormBuilder from "../CommonComponenets/FormBuilder";

export default function BinocularVisionAssessment({ onBack,  layout = "root" }) {
  const [values, setValues] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const VisionTherapyAssessmentSchema = { 
       title: "Binocular Vision",
    sections: [
      {
        fields: [
 
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
            type: "input",
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
            type: "input",
            name: "previous_treatment",
            label: "Previous Treatment"
          },
 
          {
            type: "input",
            name: "subjective_Remarks",
            label: "Remarks"
          }
        ]
      },
 
 
 
      /* ===================== OBJECTIVE ===================== */
      {
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
            type: "input",
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

        fields: [
          {
            name: "binocular_examination_sections",
            type: "checkbox-group",
            label: "Examination Sections",
            options: [
              { label: "General Examination", value: "general_examination" },
              { label: "Accommodation", value: "accommodation" },
              { label: "Vergence", value: "vergence" },
              { label: "Strabismus", value: "strabismus" }
            ]
          },
          { 
            type: "subheading", 
            label: "General Examination",
            showIf: {
              field: "binocular_examination_sections",
              includes: "general_examination"
            }
          },
 
          {
            type: "row",
            fields: [
              { type: "input", name: "stereopsis", label: "Stereopsis" },
              { type: "input", name: "stereopsis_method", label: "Method" }
            ],
            showIf: {
              field: "binocular_examination_sections",
              includes: "general_examination"
            }
          },

          {
            type: "row",
            fields: [
              { type: "input", name: "suppression_6m", label: "Suppression Test (6m)" },
              { type: "input", name: "suppression_40cm", label: "Suppression Test (40cm)" }
            ],
            showIf: {
              field: "binocular_examination_sections",
              includes: "general_examination"
            }
          },
          { 
            type: "subheading", 
            label: "Visual Acuity – Aided",
            showIf: {
              field: "binocular_examination_sections",
              includes: "general_examination"
            }
          },
 
          {
            type: "grid-header",
            cols: ["Right Eye (Right Eye (RE))", "Left Eye (Left Eye (LE))", "Both Eyes (Both Eye (LE))"],
            showIf: {
              field: "binocular_examination_sections",
              includes: "general_examination"
            }
          },
          {
            type: "grid-row",
            name: "va_aided_distance",
            label: "Distance",
            cols: ["Right Eye (Right Eye (RE))", "Left Eye (Left Eye (LE))", "Both Eyes (Both Eye (LE))"],
            showIf: {
              field: "binocular_examination_sections",
              includes: "general_examination"
            }
          },
          {
            type: "grid-row",
            name: "va_aided_near",
            label: "Near",
            cols: ["Right Eye (Right Eye (RE))", "Left Eye (Left Eye (LE))", "Both Eyes (Both Eye (LE))"],
            showIf: {
              field: "binocular_examination_sections",
              includes: "general_examination"
            }
          },
          {
            type: "input",
            name: "va_aided_Remarks",
            label: "Remarks",
            showIf: {
              field: "binocular_examination_sections",
              includes: "general_examination"
            }
          },

          { 
            type: "subheading", 
            label: "Visual Acuity – Unaided",
            showIf: {
              field: "binocular_examination_sections",
              includes: "general_examination"
            }
          },
 
          {
            type: "grid-header",
            cols: ["Right Eye (Right Eye (RE))", "Left Eye (Left Eye (LE))", "Both Eyes (Both Eye (LE))"],
            showIf: {
              field: "binocular_examination_sections",
              includes: "general_examination"
            }
          },
          {
            type: "grid-row",
            name: "va_unaided_distance",
            label: "Distance",
            cols: ["Right Eye (Right Eye (RE))", "Left Eye (Left Eye (LE))", "Both Eyes (Both Eye (LE))"],
            showIf: {
              field: "binocular_examination_sections",
              includes: "general_examination"
            }
          },
          {
            type: "grid-row",
            name: "va_unaided_near",
            label: "Near",
            cols: ["Right Eye (Right Eye (RE))", "Left Eye (Left Eye (LE))", "Both Eyes (Both Eye (LE))"],
            showIf: {
              field: "binocular_examination_sections",
              includes: "general_examination"
            }
          },
          {
            type: "input",
            name: "va_unaided_Remarks",
            label: "Remarks",
            showIf: {
              field: "binocular_examination_sections",
              includes: "general_examination"
            }
          },
          { 
            type: "subheading", 
            label: "Subjective Refraction",
            showIf: {
              field: "binocular_examination_sections",
              includes: "general_examination"
            }
          },

          {
            type: "refraction-table",
            name: "subjective_refraction",
            columns: ["Sphere", "Cylinder", "Axis", "Prism", "Visual Acuity"],
            rows: [
              { label: "Distance", value: "distance" },
              { label: "ADD", value: "add" },
              { label: "Near", value: "near" }
            ],
            showIf: {
              field: "binocular_examination_sections",
              includes: "general_examination"
            }
          },

          { 
            type: "subheading", 
            label: "Cycloplegic Refraction",
            showIf: {
              field: "binocular_examination_sections",
              includes: "general_examination"
            }
          },

          {
            type: "refraction-table",
            name: "cycloplegic_refraction",
            columns: ["Sphere", "Cylinder", "Axis", "Prism", "Visual Acuity"],
            rows: [
              { label: "Distance", value: "distance" }
            ],
            showIf: {
              field: "binocular_examination_sections",
              includes: "general_examination"
            }
          },
          {
            type: "radio",
            name: "abnormal_head_posture",
            label: "Abnormal Head Posture (AHP)",
            options: [
              { label: "Presented", value: "presented" },
              { label: "Not Presented", value: "not_presented" }
            ],
            showIf: {
              field: "binocular_examination_sections",
              includes: "general_examination"
            }
          },

          {
            type: "input",
            name: "ahp_specify",
            label: "Specify",
            showIf: {
              field: "abnormal_head_posture",
              equals: "presented"
            }
          },
          {
            type: "input",
            name: "extra_oculomotor_test_notes",
            label: "Extra OculoMotor Test",
            showIf: {
              field: "binocular_examination_sections",
              includes: "general_examination"
            }
          },

          {
            type: "input",
            name: "npc",
            label: "Near Point of Convergence (NPC)",
            showIf: {
              field: "binocular_examination_sections",
              includes: "general_examination"
            }
          },

          {
            type: "input",
            name: "hirschberg_test",
            label: "Hirschberg Test",
            showIf: {
              field: "binocular_examination_sections",
              includes: "general_examination"
            }
          },

          {
            type: "input",
            name: "krimsky_test",
            label: "Krimsky Test",
            showIf: {
              field: "binocular_examination_sections",
              includes: "general_examination"
            }
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
 
          { 
            type: "subheading", 
            label: "Cover Test",
            showIf: {
              field: "binocular_examination_sections",
              includes: "general_examination"
            }
          },

          {
            type: "grid-header",
            cols: ["Unaided", "Aided"],
            showIf: {
              field: "binocular_examination_sections",
              includes: "general_examination"
            }
          },

          // Cover Test
          {
            type: "grid-row",
            name: "cover_6m",
            label: "6m – Target",
            cols: ["U", "A"],
            showIf: {
              field: "binocular_examination_sections",
              includes: "general_examination"
            }
          },
          {
            type: "grid-row",
            name: "cover_33cm",
            label: "33cm – Target",
            cols: ["U", "A"],
            showIf: {
              field: "binocular_examination_sections",
              includes: "general_examination"
            }
          },

          { 
            type: "subheading", 
            label: "Prism Cover Test (PCT)",
            showIf: {
              field: "binocular_examination_sections",
              includes: "general_examination"
            }
          },
    {
            type: "grid-header",
            cols: ["Unaided", "Aided"],
            showIf: {
              field: "binocular_examination_sections",
              includes: "general_examination"
            }
          },
          {
            type: "grid-row",
            name: "pct_6m",
            label: "6m",
            cols: ["U", "A"],
            showIf: {
              field: "binocular_examination_sections",
              includes: "general_examination"
            }
          },
          {
            type: "grid-row",
            name: "pct_33cm",
            label: "33cm",
            cols: ["U", "A"],
            showIf: {
              field: "binocular_examination_sections",
              includes: "general_examination"
            }
          },
          {
            type: "grid-row",
            name: "pct_plus3",
            label: "+3.00 DS",
            cols: ["U", "A"],
            showIf: {
              field: "binocular_examination_sections",
              includes: "general_examination"
            }
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
            ],
            showIf: {
              field: "binocular_examination_sections",
              includes: "general_examination"
            }
          },

          { 
            type: "subheading", 
            label: "Simultaneous Prism Cover Test (SPCT)",
            showIf: {
              field: "binocular_examination_sections",
              includes: "general_examination"
            }
          },

          {
            type: "grid-row",
            name: "spct_6m",
            label: "6m",
            cols: ["U", "A"],
            showIf: {
              field: "binocular_examination_sections",
              includes: "general_examination"
            }
          },
          {
            type: "grid-row",
            name: "spct_33cm",
            label: "33cm",
            cols: ["U", "A"],
            showIf: {
              field: "binocular_examination_sections",
              includes: "general_examination"
            }
          },

          { 
            type: "subheading", 
            label: "Phoria Test",
            showIf: {
              field: "binocular_examination_sections",
              includes: "general_examination"
            }
          },

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
            ],
            showIf: {
              field: "binocular_examination_sections",
              includes: "general_examination"
            }
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
            ],
            showIf: {
              field: "binocular_examination_sections",
              includes: "general_examination"
            }
          },

          {
            type: "input",
            name: "cover_test_Remarks",
            label: "Remarks",
            showIf: {
              field: "binocular_examination_sections",
              includes: "general_examination"
            }
          },
          // Accommodation Section
          { 
            type: "subheading", 
            label: "Accommodation",
            showIf: {
              field: "binocular_examination_sections",
              includes: "accommodation"
            }
          },
 
          {
            type: "grid-header",
            cols: ["Right Eye (RE)", "Left Eye (LE)", "Both Eye (LE)"],
            showIf: {
              field: "binocular_examination_sections",
              includes: "accommodation"
            }
          },

          {
            type: "grid-row",
            name: "aa_amplitude",
            label: "Amplitude of Accommodation (AA)",
            cols: ["Right Eye (RE)", "Left Eye (LE)", "Both Eye (LE)"],
            showIf: {
              field: "binocular_examination_sections",
              includes: "accommodation"
            }
          },
          {
            type: "grid-row",
            name: "mem_monocular",
            label: "Monocular Estimate Method (MEM)",
            cols: ["Right Eye (RE)", "Left Eye (LE)", "Both Eye (LE)"],
            showIf: {
              field: "binocular_examination_sections",
              includes: "accommodation"
            }
          },
          {
            type: "grid-row",
            name: "nra",
            label: "Negative Relative Accommodation (NRA)",
            cols: ["Right Eye (RE)", "Left Eye (LE)", "Both Eye (LE)"],
            showIf: {
              field: "binocular_examination_sections",
              includes: "accommodation"
            }
          },
          {
            type: "grid-row",
            name: "pra",
            label: "Positive Relative Accommodation (PRA)",
            cols: ["Right Eye (RE)", "Left Eye (LE)", "Both Eye (LE)"],
            showIf: {
              field: "binocular_examination_sections",
              includes: "accommodation"
            }
          },

          { 
            type: "subheading", 
            label: "Accommodation Facility",
            showIf: {
              field: "binocular_examination_sections",
              includes: "accommodation"
            }
          },

          {
            type: "grid-header",
            cols: ["Right Eye (RE)", "Left Eye (LE)", "Both Eye (LE)"],
            showIf: {
              field: "binocular_examination_sections",
              includes: "accommodation"
            }
          },
          {
            type: "grid-row",
            name: "accommodation_facility",
            label: "Accommodation Facility",
            cols: ["Right Eye (RE)", "Left Eye (LE)", "Both Eye (LE)"],
            showIf: {
              field: "binocular_examination_sections",
              includes: "accommodation"
            }
          },

          {
            type: "input",
            name: "accommodation_Remarks",
            label: "Remarks",
            showIf: {
              field: "binocular_examination_sections",
              includes: "accommodation"
            }
          },
          // Vergence Section
          { 
            type: "subheading", 
            label: "Vergence",
            showIf: {
              field: "binocular_examination_sections",
              includes: "vergence"
            }
          },
 
          {
            type: "grid-header",
            cols: ["6m", "40cm"],
            showIf: {
              field: "binocular_examination_sections",
              includes: "vergence"
            }
          },
 
          {
            type: "grid-row",
            name: "vergence_method",
            label: "Method",
            cols: ["6m", "40cm"],
            showIf: {
              field: "binocular_examination_sections",
              includes: "vergence"
            }
          },
          {
            type: "grid-row",
            name: "nfv",
            label: "Negative Fusional Vergence (NFV)",
            cols: ["6m", "40cm"],
            showIf: {
              field: "binocular_examination_sections",
              includes: "vergence"
            }
          },
          {
            type: "grid-row",
            name: "pfv",
            label: "Positive Fusional Vergence (PFV)",
            cols: ["6m", "40cm"],
            showIf: {
              field: "binocular_examination_sections",
              includes: "vergence"
            }
          },
          {
            type: "grid-row",
            name: "supra",
            label: "Supra",
            cols: ["6m", "40cm"],
            showIf: {
              field: "binocular_examination_sections",
              includes: "vergence"
            }
          },
          {
            type: "grid-row",
            name: "infra",
            label: "Infra",
            cols: ["6m", "40cm"],
            showIf: {
              field: "binocular_examination_sections",
              includes: "vergence"
            }
          },
 
          {
            type: "input",
            name: "vergence_Remarks",
            label: "Remarks",
            showIf: {
              field: "binocular_examination_sections",
              includes: "vergence"
            }
          },
 
          { 
            type: "subheading", 
            label: "Vergence Facility",
            showIf: {
              field: "binocular_examination_sections",
              includes: "vergence"
            }
          },
 
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
            ],
            showIf: {
              field: "binocular_examination_sections",
              includes: "vergence"
            }
          },
 
          {
            type: "input",
            name: "vergence_facility_Remarks",
            label: "Remarks",
            showIf: {
              field: "binocular_examination_sections",
              includes: "vergence"
            }
          },
          // Strabismus Section
          { 
            type: "subheading", 
            label: "Strabismus",
            showIf: {
              field: "binocular_examination_sections",
              includes: "strabismus"
            }
          },
 
          {
            type: "input",
            name: "prism_cover_all_direction",
            label: "Prism Cover Test (All Direction)",
            showIf: {
              field: "binocular_examination_sections",
              includes: "strabismus"
            }
          },

          {
            type: "input",
            name: "diplopia_chart",
            label: "Diplopia Chart",
            showIf: {
              field: "binocular_examination_sections",
              includes: "strabismus"
            }
          },

          {
            type: "custom-image",
            name: "parks_3_step_img",
            label: "Parks 3 Step",
            src: "/strabismus.png",
            showIf: {
              field: "binocular_examination_sections",
              includes: "strabismus"
            }
          },

          {
            type: "input",
            name: "fixation",
            label: "Fixation",
            showIf: {
              field: "binocular_examination_sections",
              includes: "strabismus"
            }
          },

          {
            type: "input",
            name: "additional_test",
            label: "Additional Test",
            showIf: {
              field: "binocular_examination_sections",
              includes: "strabismus"
            }
          },

          {
            type: "input",
            name: "strabismus_Remarks",
            label: "Remarks",
            showIf: {
              field: "binocular_examination_sections",
              includes: "strabismus"
            }
          },
 
        ]
      },

      {
        fields: [
 
          {
            type: "input",
            name: "plan_comments",
            label: "Clinical Findings"
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
