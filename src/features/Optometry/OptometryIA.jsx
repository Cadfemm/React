import React, { useState } from "react";
import CommonFormBuilder from "../CommonComponenets/FormBuilder";
import BinocularVisionAssessment from "./BinocularVisionAssessment";
import RefractionAssessment from "./RefractionAssessment";
import VisionAssessment from "./VisionAssessment";
import OcularHealthAssessment from "./OcularHealthAssessment";
import SpecialDiagnosticAssessment from "./SpecialDiagnostic";
import LVQoLForm from "./LowVisionQualityAssessment";
import BrainVisionInjury from "./BrainVisionInjury";
import VisualFunctionForm from "./VisionFunctionalAssessmenmt";
import BVDAssessment from "./BvdqAssessment";

export default function OptometryIAAssessment({ onBack, onAction }) {
    const [values, setValues] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const VisionTherapyAssessmentSchema = {
        title: "Optometry Initial Assessment",
          actions: [
    { type: "back", label: "Back" },
  ],
        sections: [
            {
                title: "Subjective",
                fields: [
                    {
                        type: "textarea",
                        name: "visit_other_specify",
                        label: "Chief Complaint",

                    },
                    {
                        type: "textarea",
                        name: "visit_other_specify",
                        label: "History of Present Illness",

                    },

                    {
                        type: "row",
                        fields: [
                            {
                                type: "multi-select-dropdown",
                                name: "visit_purpose",
                                label: "Presenting Visual / Ocular Symptoms ",
                                options: [
                                    "Vision screening",
                                    "Blurry Vision",
                                    "Burning",
                                    "Double vision",
                                    "Dryness",
                                    "Flash of light",
                                    "Referral",
                                    "Grittiness",
                                    "Headaches",
                                    "Infection",
                                    "Itchiness",
                                    "Night vision difficulty",
                                    "Eye Pain",
                                    "Tearing",
                                    "Other(s)"
                                ].map(v => ({ label: v, value: v }))
                            },
                            {
                                type: "date",
                                name: "last_eye_exam",
                                label: "Date of last eye examination"
                            }

                        ]
                    },

                    {
                        type: "textarea",
                        name: "visit_other_specify",
                        label: "Please specify",
                        showIf: {
                            field: "visit_purpose",
                            includes: "Other(s)"
                        }
                    },
                    { type: "subheading", label: "Optical Correction History: " },
                    {
                        type: "radio",
                        name: "wear_spectacle",
                        label: "Spectacle Use",
                        options: [
                            { label: "Yes", value: "yes" },
                            { label: "No", value: "no" }
                        ]
                    },
                    {
                        type: "textarea",
                        name: "spectacle_prescription",
                        label: "Prescription",
                        showIf: {
                            field: "wear_spectacle",
                            equals: "yes"
                        }
                    },

                    {
                        type: "radio",
                        name: "wear_contact_lens",
                        label: "Contact Lens Use",
                        options: [
                            { label: "Yes", value: "yes" },
                            { label: "No", value: "no" }
                        ]
                    },
                    {
                        type: "textarea",
                        name: "contact_modalities",
                        label: "Prescription :",
                        showIf: {
                            field: "wear_contact_lens",
                            equals: "yes"
                        }
                    },
                    {
                        type: "textarea",
                        name: "contact_type",
                        label: "Lens Type :",
                        showIf: {
                            field: "wear_contact_lens",
                            equals: "yes"
                        }
                    },
                    {
                        type: "textarea",
                        name: "contact_frequency",
                        label: "Wearing Schedule/Frequency :",
                        showIf: {
                            field: "wear_contact_lens",
                            equals: "yes"
                        }
                    },

                    { type: "subheading", label: "Past Ocular History" },

                    {
                        type: "multi-select-dropdown",
                        name: "eye_diagnosis",
                        options: [
                            "Cataract",
                            "Corneal abrasion",
                            "Dry eye",
                            "Eye turn",
                            "Glaucoma",
                            "Injury",
                            "Iritis/Uveitis",
                            "Lazy eye",
                            "Macular Degeneration",
                            "Retinal defect / hole / tear",
                            "Retinal Detachment",
                            "Other"
                        ].map(v => ({ label: v, value: v }))
                    },

                    {
                        type: "textarea",
                        name: "other_eye_disease_specify",
                        label: "Other eye disease – please specify",
                        showIf: {
                            field: "eye_diagnosis",
                            includes: "Other"
                        }
                    },
                    {
                        type: "textarea",
                        name: "previous_ocular_treatment",
                        label: "Previous Ocular Treatment / Intervention"
                    },


                    { type: "subheading", label: "Family History" },

                    {
                        type: "multi-select-dropdown",
                        name: "family_history",
                        options: [
                            "Cataracts",
                            "Eye turn",
                            "Glaucoma",
                            "Iritis/Uveitis",
                            "Lazy eye",
                            "Degeneration",
                            "Detachment",
                            "Pigmentosa",
                            "Colour Vision"
                        ].map(v => ({ label: v, value: v }))
                    },

                    { type: "subheading", label: "Medical History" },


                    {
                        type: "radio",
                        name: "mh_allergies",
                        label: "Allergies",
                        options: [
                            { label: "Yes", value: "yes" },
                            { label: "No", value: "no" }
                        ]
                    },
                    {
                        type: "textarea",
                        name: "mh_allergies_specify",
                        label: "Allergies – Specify",
                        showIf: {
                            field: "mh_allergies",
                            equals: "yes"
                        }
                    },
                    {
                        type: "radio",
                        name: "mh_arthritis",
                        label: "Arthritis",
                        options: [
                            { label: "Yes", value: "yes" },
                            { label: "No", value: "no" }
                        ]
                    },

                    {
                        type: "textarea",
                        name: "mh_arthritis_specify",
                        label: "Arthritis – Specify",
                        showIf: {
                            field: "mh_arthritis",
                            equals: "yes"
                        }
                    },
                    {
                        type: "radio",
                        name: "mh_blood_lymph",
                        label: "Blood/Lymph Disorders",
                        options: [
                            { label: "Yes", value: "yes" },
                            { label: "No", value: "no" }
                        ]
                    },
                    {
                        type: "textarea",
                        name: "mh_blood_lymph_specify",
                        label: "Blood/Lymph – Specify",
                        showIf: {
                            field: "mh_blood_lymph",
                            equals: "yes"
                        }
                    },

                    {
                        type: "radio",
                        name: "mh_cancer",
                        label: "Cancer",
                        options: [
                            { label: "Yes", value: "yes" },
                            { label: "No", value: "no" }
                        ]
                    },
                    {
                        type: "textarea",
                        name: "mh_cancer_specify",
                        label: "Cancer – Specify",
                        showIf: {
                            field: "mh_cancer",
                            equals: "yes"
                        }
                    },
                    {
                        type: "radio",
                        name: "mh_hyperlipidemia",
                        label: "Hyperlipidemia ",
                        options: [
                            { label: "Yes", value: "yes" },
                            { label: "No", value: "no" }
                        ]
                    },
                    {
                        type: "textarea",
                        name: "mh_hyperlipidemia_specify",
                        label: "Hyperlipidemia – Specify",
                        showIf: {
                            field: "mh_hyperlipidemia",
                            equals: "yes"
                        }
                    },


                    {
                        type: "radio",
                        name: "mh_cholesterol",
                        label: "Diabetes Mellitus ",
                        options: [
                            { label: "Yes", value: "yes" },
                            { label: "No", value: "no" }
                        ]
                    },
                    {
                        type: "textarea",
                        name: "mh_cholesterol_specify",
                        label: "Diabetes Mellitus  – Specify",
                        showIf: {
                            field: "mh_cholesterol",
                            equals: "yes"
                        }
                    },
                    {
                        type: "radio",
                        name: "mh_diabetes",
                        label: "Gastrointestinal Disorders ",
                        options: [
                            { label: "Yes", value: "yes" },
                            { label: "No", value: "no" }
                        ]
                    },


                    {
                        type: "textarea",
                        name: "mh_diabetes_specify",
                        label: "Gastrointestinal Disorders  – Specify",
                        showIf: {
                            field: "mh_diabetes",
                            equals: "yes"
                        }
                    },

                    {
                        type: "radio",
                        name: "mh_digestive_gastric",
                        label: "ENT Disorders",
                        options: [
                            { label: "Yes", value: "yes" },
                            { label: "No", value: "no" }
                        ]
                    },
                    {
                        type: "textarea",
                        name: "mh_digestive_gastric_specify",
                        label: "ENT Disorders  – Specify",
                        showIf: {
                            field: "mh_digestive_gastric",
                            equals: "yes"
                        }
                    },
                    {
                        type: "radio",
                        name: "mh_ears_nose_throat",
                        label: "Endocrine Disorders",
                        options: [
                            { label: "Yes", value: "yes" },
                            { label: "No", value: "no" }
                        ]
                    },

                    {
                        type: "textarea",
                        name: "mh_ears_nose_throat_specify",
                        label: "Endocrine Disorders – Specify",
                        showIf: {
                            field: "mh_ears_nose_throat",
                            equals: "yes"
                        }
                    },

                    {
                        type: "radio",
                        name: "mh_endocrine",
                        label: "Fever ",
                        options: [
                            { label: "Yes", value: "yes" },
                            { label: "No", value: "no" }
                        ]
                    },
                    {
                        type: "textarea",
                        name: "mh_endocrine_specify",
                        label: "Fever  – Specify",
                        showIf: {
                            field: "mh_endocrine",
                            equals: "yes"
                        }
                    },
                    {
                        type: "radio",
                        name: "mh_fatigue",
                        label: "Fatigue",
                        options: [
                            { label: "Yes", value: "yes" },
                            { label: "No", value: "no" }
                        ]
                    },

                    {
                        type: "textarea",
                        name: "mh_fatigue_specify",
                        label: "Fatigue – Specify",
                        showIf: {
                            field: "mh_fatigue",
                            equals: "yes"
                        }
                    },

                    {
                        type: "radio",
                        name: "mh_heart_disease",
                        label: "Heart Disease",
                        options: [
                            { label: "Yes", value: "yes" },
                            { label: "No", value: "no" }
                        ]
                    },
                    {
                        type: "textarea",
                        name: "mh_heart_disease_specify",
                        label: "Heart Disease – Specify",
                        showIf: {
                            field: "mh_heart_disease",
                            equals: "yes"
                        }
                    },
                    {
                        type: "radio",
                        name: "mh_fevers",
                        label: "Hypertension",
                        options: [
                            { label: "Yes", value: "yes" },
                            { label: "No", value: "no" }
                        ]
                    },

                    {
                        type: "textarea",
                        name: "mh_fevers_specify",
                        label: "Hypertension – Specify",
                        showIf: {
                            field: "mh_fevers",
                            equals: "yes"
                        }
                    },


                    {
                        type: "radio",
                        name: "mh_immune",
                        label: "Immune Disorders",
                        options: [
                            { label: "Yes", value: "yes" },
                            { label: "No", value: "no" }
                        ]
                    },

                    {
                        type: "textarea",
                        name: "mh_immune_specify",
                        label: "Immune Disorders – Specify",
                        showIf: {
                            field: "mh_immune",
                            equals: "yes"
                        }
                    },


                    {
                        type: "radio",
                        name: "mh_skin_disease",
                        label: "Skin Disorders",
                        options: [
                            { label: "Yes", value: "yes" },
                            { label: "No", value: "no" }
                        ]
                    },
                    {
                        type: "textarea",
                        name: "mh_skin_specify",
                        label: "Skin Disorders – Specify",
                        showIf: { field: "mh_skin_disease", equals: "yes" }
                    },


                    {
                        type: "radio",
                        name: "mh_radenal_disorders",
                        label: "Renal Disorders",
                        options: [
                            { label: "Yes", value: "yes" },
                            { label: "No", value: "no" }
                        ]
                    },
                    {
                        type: "textarea",
                        name: "mh_renal_specify",
                        label: "Renal Disorders – Specify",
                        showIf: { field: "mh_radenal_disorders", equals: "yes" }
                    },

                    {
                        type: "radio",
                        name: "mh_nusculoskeletal_disorders",
                        label: "Musculoskeletal Disorders",
                        options: [
                            { label: "Yes", value: "yes" },
                            { label: "No", value: "no" }
                        ]
                    },
                    {
                        type: "textarea",
                        name: "mh_musculoskeletal_disorders_specify",
                        label: "Musculoskeletal Disorders – Specify",
                        showIf: {
                            field: "mh_nusculoskeletal_disorders",
                            equals: "yes"
                        }
                    },
                    {
                        type: "radio",
                        name: "mh_neurological_disorders",
                        label: "Neurological Disorders / Headache",
                        options: [
                            { label: "Yes", value: "yes" },
                            { label: "No", value: "no" }
                        ]
                    },
                    {
                        type: "textarea",
                        name: "mh_neuro_specify",
                        label: "Neurological Disorders – Specify",
                        showIf: { field: "mh_neurological_disorders", equals: "yes" }
                    },
                    {
                        type: "radio",
                        name: "mh_physical_disorders",
                        label: "Psychological Disorders",
                        options: [
                            { label: "Yes", value: "yes" },
                            { label: "No", value: "no" }
                        ]
                    },
                    {
                        type: "textarea",
                        name: "mh_psych_specify",
                        label: "Psychological Disorders – Specify",
                        showIf: { field: "mh_physical_disorders", equals: "yes" }
                    },
                    { type: "subheading", label: "Condition" },
                    {
                        type: "radio",
                        name: "respiratory_disorders",
                        label: "Respiratory Disorders",
                        options: [
                            { label: "Yes", value: "yes" },
                            { label: "No", value: "no" }
                        ]
                    },
                    {
                        type: "textarea",
                        name: "respiratory_disorders_note",
                        label: "Notes",
                        showIf: {
                            field: "respiratory_disorders",
                            equals: "yes"
                        }
                    },

                    {
                        type: "radio",
                        name: "sinus_disorders",
                        label: "Sinus Disorders",
                        options: [
                            { label: "Yes", value: "yes" },
                            { label: "No", value: "no" }
                        ]
                    },
                    {
                        type: "textarea",
                        name: "sinus_disorders_note",
                        label: "Notes",
                        showIf: {
                            field: "sinus_disorders",
                            equals: "yes"
                        }
                    },

                    {
                        type: "radio",
                        name: "stroke_seizures",
                        label: "Stroke / Seizures",
                        options: [
                            { label: "Yes", value: "yes" },
                            { label: "No", value: "no" }
                        ]
                    },
                    {
                        type: "textarea",
                        name: "stroke_seizures_note",
                        label: "Notes",
                        showIf: {
                            field: "stroke_seizures",
                            equals: "yes"
                        }
                    },

                    {
                        type: "radio",
                        name: "tbi",
                        label: "Traumatic Brain Injury",
                        options: [
                            { label: "Yes", value: "yes" },
                            { label: "No", value: "no" }
                        ]
                    },
                    {
                        type: "textarea",
                        name: "tbi_note",
                        label: "Notes",
                        showIf: {
                            field: "tbi",
                            equals: "yes"
                        }
                    },

                    {
                        type: "radio",
                        name: "throat_infection",
                        label: "Throat Infection",
                        options: [
                            { label: "Yes", value: "yes" },
                            { label: "No", value: "no" }
                        ]
                    },
                    {
                        type: "textarea",
                        name: "throat_infection_note",
                        label: "Notes",
                        showIf: {
                            field: "throat_infection",
                            equals: "yes"
                        }
                    },

                    {
                        type: "radio",
                        name: "thyroid_disorders",
                        label: "Thyroid Disorders",
                        options: [
                            { label: "Yes", value: "yes" },
                            { label: "No", value: "no" }
                        ]
                    },
                    {
                        type: "textarea",
                        name: "thyroid_disorders_note",
                        label: "Notes",
                        showIf: {
                            field: "thyroid_disorders",
                            equals: "yes"
                        }
                    },

                    {
                        type: "radio",
                        name: "weight_change",
                        label: "Weight Loss / Gain",
                        options: [
                            { label: "Yes", value: "yes" },
                            { label: "No", value: "no" }
                        ]
                    },
                    {
                        type: "textarea",
                        name: "weight_change_note",
                        label: "Notes",
                        showIf: {
                            field: "weight_change",
                            equals: "yes"
                        }
                    }
                ]
            },
            {
                title: "O – Objective",
                fields: [
                    {
                        type: "textarea",
                        name: "general_observation",
                        label: "General Observation"
                    },
                      { type: "subheading", label: "Visual Acuity" },

                    {
                        type: "grid-header",
                        cols: ["Right Eye (RE)", "Left Eye (LE)", "Both Eye (BE)"]
                    },
                    {
                        type: "grid-row",
                        name: "va_distance_unaided",
                        label: "Distance (Unaided)",
                        cols: ["Right Eye (RE)", "Left Eye (LE)", "Both Eye (BE)"]
                    },
                    {
                        type: "grid-row",
                        name: "va_near_unaided",
                        label: "Near (Unaided)",
                        cols: ["Right Eye (RE)", "Left Eye (LE)", "Both Eye (BE)"]
                    },
                    {
                        type: "grid-row",
                        name: "va_distance_aided",
                        label: "Distance (Habitual / Aided)",
                        cols: ["Right Eye (RE)", "Left Eye (LE)", "Both Eye (BE)"]
                    },
                    {
                        type: "grid-row",
                        name: "va_near_aided",
                        label: "Near (Habitual / Aided)",
                        cols: ["Right Eye (RE)", "Left Eye (LE)", "Both Eye (BE)"]
                    },
                    {
                        type: "grid-row",
                        name: "va_pinhole",
                        label: "Pinhole",
                        cols: ["Right Eye (RE)", "Left Eye (LE)", "Both Eye (BE)"]
                    },
                    {
                        type: "grid-row",
                        name: "va_remarks",
                        label: "Remarks",
                        cols: ["Right Eye (RE)", "Left Eye (LE)", "Both Eye (BE)"]
                    },
                    { type: "subheading", label: "Binocular & Ocular Function" },

                    {
                        type: "grid-header",
                        cols: ["Right Eye (RE)", "Left Eye (LE)", "Remarks"]
                    },

                    {
                        type: "grid-row",
                        name: "bruckner",
                        label: "Bruckner Test",
                        cols: [
                            { type: "single-select", options: ["Full", "Dull", "Defective"] },
                            { type: "single-select", options: ["Full", "Dull", "Defective"] },
                            "input"
                        ]
                    },
                    {
                        type: "grid-row",
                        name: "color_vision",
                        label: "Color Vision",
                        cols: [
                            { type: "single-select", options: ["Pass", "Fail"] },
                            { type: "single-select", options: ["Pass", "Fail"] },
                            "input"
                        ]
                    },
                    {
                        type: "grid-row",
                        name: "pupil_response",
                        label: "Pupillary Response",
                        cols: [
                            { type: "single-select", options: ["PERL", "Anisocoria"] },
                            { type: "single-select", options: ["PERL", "Anisocoria"] },
                            "input"
                        ]
                    },
                    {
                        type: "grid-row",
                        name: "marcus_gunn",
                        label: "Marcus Gunn Test",
                        cols: [
                            { type: "single-select", options: ["Normal", "Abnormal"] },
                            { type: "single-select", options: ["Normal", "Abnormal"] },
                            "input"
                        ]
                    },
                    {
                        type: "grid-row",
                        name: "cover_distance",
                        label: "Cover Test – Distance",
                        cols: ["input", "input", "input"]
                    },
                    {
                        type: "grid-row",
                        name: "cover_near",
                        label: "Cover Test – Near",
                        cols: ["input", "input", "input"]
                    },
                    {
                        type: "grid-row",
                        name: "stereopsis",
                        label: "Stereopsis",
                        cols: [
                            { type: "single-select", options: ["Present", "Absent"] },
                            { type: "single-select", options: ["Present", "Absent"] },
                            "input"
                        ]
                    },
                    {
                        type: "grid-row",
                        name: "hirschberg",
                        label: "Hirschberg Test",
                        cols: [
                            { type: "single-select", options: ["Centered", "Nasal", "Temporal", "Superior", "Inferior"] },
                            { type: "single-select", options: ["Centered", "Nasal", "Temporal", "Superior", "Inferior"] },
                            "input"
                        ]
                    },
                    {
                        type: "grid-row",
                        name: "eom",
                        label: "Extraocular Movements (EOM)",
                        cols: [
                            { type: "single-select", options: ["Normal", "Impaired"] },
                            { type: "single-select", options: ["Normal", "Impaired"] },
                            "input"
                        ]
                    },
                    {
                        type: "grid-row",
                        name: "vor",
                        label: "Vestibulo-Ocular Reflex (VOR)",
                        cols: [
                            { type: "single-select", options: ["Normal", "Impaired"] },
                            { type: "single-select", options: ["Normal", "Impaired"] },
                            "input"
                        ]
                    },


                    {
                        type: "radio",
                        name: "confrontation",
                        label: "Confrontational Test",
                        options: [
                            { label: "Full", value: "full" },
                            { label: "Restricted", value: "restricted" }
                        ]
                    },

                    {
                        type: "row",
                        fields: [
                            { type: "input", name: "tonometry_re", label: "Tonometry Right Eye (RE) (mmHg @ time)" },
                            { type: "input", name: "tonometry_le", label: "Tonometry Left Eye (Left Eye (LE)) (mmHg @ time)" }
                        ]
                    },

                    { type: "textarea", name: "additional_test", label: "Additional Test" },
                    { type: "textarea", name: "analysis_remark", label: "Remark" },
                    { type: "subheading", label: "Objective Assessments" },
                    {
                        type: "assessment-launcher",
                        name: "objective_assessments",
                        options: [
                            { label: "Binocular Vision", value: "BINOCULAR_VISION" },
                            { label: "Refraction Assessment", value: "REFRACTION" },
                            { label: "Vision For Driving", value: "VISION_DRIVING" },
                            { label: "Ocular Health / Structure", value: "OCULAR_HEALTH" },
                            { label: "Special Diagnostic", value: "SPECIAL_DIAGNOSTIC" },
                            { label: "Visual Function Questionnaire", value: "VISUAL_FUNCTION" },
                            { label: "Low Vision Quality of Life Questionnaire (LVQoL)", value: "LVQOL" },
                            { label: "Brain Injury Vision Symptoms Survey (BIVSS)", value: "BRAIN_VISION" },
                            { label: "Binocular Vision Dysfunction Questionnaire (BVDQ)", value: "BVDQ" }
                        ]
                    }

                ]
            },
            {
                title: "Analysis / Assessment",
                fields: [
      
    {
      type: "textarea",
      name: "clinical_impression",
            label: "Clinical Impression / Diagnosis"

    },

    // { type: "subheading", label: "Functional Vision Status" },

    {
      type: "radio",
      name: "functional_vision_status",
      label: "Functional Vision Status",
      options: [
        { label: "Normal", value: "normal" },
        { label: "Abnormal", value: "abnormal" }
      ]
    },

    {
      type: "textarea",
      name: "functional_vision_details",
      label: "Details",
      showIf: {
        field: "functional_vision_status",
        equals: "abnormal"
      }
    }
                ]
            }, {
                title: "P – Plan",
                fields: [
                    {
                        type: "radio",
                        name: "vision_impression",
                        label: "Impression on vision performance",
                        options: [
                            { label: "Normal", value: "normal" },
                            { label: "Abnormal", value: "abnormal" }
                        ]
                    },

                    {
                        type: "radio",
                        name: "need_further_assessment",
                        label: "Required further assessment",
                        options: [
                            { label: "Yes", value: "yes" },
                            { label: "No", value: "no" }
                        ]
                    },

                    {
                        type: "multi-select-dropdown",
                        name: "assessment_list",
                        label: "Further Assessments",
                        showIf: {
                            field: "need_further_assessment",
                            equals: "yes"
                        },
                        options: [
                            "Refraction",
                            "Ocular Health Assessment",
                            "Ocular Coherent Tomography",
                            "Hess Chart",
                            "Visual Evoked Potential / Electroretinogram",
                            "Right Eye Vision System",
                            "Corneal Topography",
                            "Ocular Efficiency Test",
                            "DEM Test",
                            "Visual Field Assessment",
                            "Microperimeter",
                            "Neuroptix Pupillometer",
                            "Color Vision Test"
                        ].map(v => ({ label: v, value: v }))
                    },

                    {
                        type: "radio",
                        name: "required_referral",
                        label: "Required referral",
                        options: [
                            { label: "Yes", value: "yes" },
                            { label: "No", value: "no" }
                        ]
                    },

                    {
                        type: "textarea",
                        name: "referral_text",
                        label: "Referral",
                        showIf: {
                            field: "required_referral",
                            equals: "yes"
                        }
                    }
                ]
            }



        ]
    };


    const onChange = (name, value) => {
        setValues(v => ({ ...v, [name]: value }));
    };

const handleAction = (type) => {
  if (type === "submit") {
    setSubmitted(true);
    console.log("Optometry IA", values);
  }

  if (type === "back") {
    onBack?.(); // this will go back to Patients page
  }

  onAction?.(type);
};



    return (
     <CommonFormBuilder
  schema={VisionTherapyAssessmentSchema}
  values={values}
  onChange={(n, v) => setValues(p => ({ ...p, [n]: v }))}
  submitted={submitted}
  onAction={handleAction}
  assessmentRegistry={{
    BINOCULAR_VISION: BinocularVisionAssessment,
    REFRACTION: RefractionAssessment,
    VISION_DRIVING: VisionAssessment,
    OCULAR_HEALTH: OcularHealthAssessment,
    SPECIAL_DIAGNOSTIC: SpecialDiagnosticAssessment,
    LVQOL: LVQoLForm,
    BRAIN_VISION: BrainVisionInjury,
    VISUAL_FUNCTION: VisualFunctionForm,
    BVDQ: BVDAssessment
  }}
/>


    );
}
