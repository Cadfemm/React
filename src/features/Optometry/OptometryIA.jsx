import React, { useState } from "react";
import CommonFormBuilder from "../CommonComponenets/FormBuilder";

export default function OptometryIAAssessment({ onBack }) {
    const [values, setValues] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const VisionTherapyAssessmentSchema = {
        title: "Optometry Initial Assessment",
        sections: [
            {
                title: "Subjective",
                fields: [
                    { type: "subheading", label: "Purpose of today's visit" },

                    {
                        type: "row",
                        fields: [
                            {
                                type: "multi-select-dropdown",
                                name: "visit_purpose",
                                label: "Purpose",
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
                        label: "When was his/her last eye exam"
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

                    {
                        type: "radio",
                        name: "wear_spectacle",
                        label: "Do he/she wear spectacle",
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
                        label: "Do he/she wear contact lens",
                        options: [
                            { label: "Yes", value: "yes" },
                            { label: "No", value: "no" }
                        ]
                    },
                    {
                        type: "textarea",
                        name: "contact_type",
                        label: "Type",
                        showIf: {
                            field: "wear_contact_lens",
                            equals: "yes"
                        }
                    },
                    {
                        type: "textarea",
                        name: "contact_frequency",
                        label: "Frequency",
                        showIf: {
                            field: "wear_contact_lens",
                            equals: "yes"
                        }
                    },
                    {
                        type: "textarea",
                        name: "contact_modalities",
                        label: "Modalities",
                        showIf: {
                            field: "wear_contact_lens",
                            equals: "yes"
                        }
                    },

                    { type: "subheading", label: "Have he/she been diagnosed with the following" },

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
                        name: "other_eye_disease",
                        label: "Other eye disease – please specify",
                        showIf: {
                            field: "eye_diagnosis",
                            includes: "Other"
                        }
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
                        type: "row",
                        fields: [
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
                                type: "radio",
                                name: "mh_arthritis",
                                label: "Arthritis",
                                options: [
                                    { label: "Yes", value: "yes" },
                                    { label: "No", value: "no" }
                                ]
                            }
                        ]
                    },

                    {
                        type: "row",
                        fields: [
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
                                type: "textarea",
                                name: "mh_arthritis_specify",
                                label: "Arthritis – Specify",
                                showIf: {
                                    field: "mh_arthritis",
                                    equals: "yes"
                                }
                            }
                        ]
                    },

                    {
                        type: "row",
                        fields: [
                            {
                                type: "radio",
                                name: "mh_blood_lymph",
                                label: "Blood/Lymph",
                                options: [
                                    { label: "Yes", value: "yes" },
                                    { label: "No", value: "no" }
                                ]
                            },
                            {
                                type: "radio",
                                name: "mh_cancer",
                                label: "Cancer",
                                options: [
                                    { label: "Yes", value: "yes" },
                                    { label: "No", value: "no" }
                                ]
                            }
                        ]
                    },

                    {
                        type: "row",
                        fields: [
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
                                type: "textarea",
                                name: "mh_cancer_specify",
                                label: "Cancer – Specify",
                                showIf: {
                                    field: "mh_cancer",
                                    equals: "yes"
                                }
                            }
                        ]
                    },

                    {
                        type: "row",
                        fields: [
                            {
                                type: "radio",
                                name: "mh_cholesterol",
                                label: "Cholesterol",
                                options: [
                                    { label: "Yes", value: "yes" },
                                    { label: "No", value: "no" }
                                ]
                            },
                            {
                                type: "radio",
                                name: "mh_diabetes",
                                label: "Diabetes",
                                options: [
                                    { label: "Yes", value: "yes" },
                                    { label: "No", value: "no" }
                                ]
                            }
                        ]
                    },

                    {
                        type: "row",
                        fields: [
                            {
                                type: "textarea",
                                name: "mh_cholesterol_specify",
                                label: "Cholesterol – Specify",
                                showIf: {
                                    field: "mh_cholesterol",
                                    equals: "yes"
                                }
                            },
                            {
                                type: "textarea",
                                name: "mh_diabetes_specify",
                                label: "Diabetes – Specify",
                                showIf: {
                                    field: "mh_diabetes",
                                    equals: "yes"
                                }
                            }
                        ]
                    },

                    {
                        type: "row",
                        fields: [
                            {
                                type: "radio",
                                name: "mh_digestive_gastric",
                                label: "Digestive/Gastric",
                                options: [
                                    { label: "Yes", value: "yes" },
                                    { label: "No", value: "no" }
                                ]
                            },
                            {
                                type: "radio",
                                name: "mh_ears_nose_throat",
                                label: "Ears/Nose/Throat",
                                options: [
                                    { label: "Yes", value: "yes" },
                                    { label: "No", value: "no" }
                                ]
                            }
                        ]
                    },

                    {
                        type: "row",
                        fields: [
                            {
                                type: "textarea",
                                name: "mh_digestive_gastric_specify",
                                label: "Digestive/Gastric – Specify",
                                showIf: {
                                    field: "mh_digestive_gastric",
                                    equals: "yes"
                                }
                            },
                            {
                                type: "textarea",
                                name: "mh_ears_nose_throat_specify",
                                label: "Ears/Nose/Throat – Specify",
                                showIf: {
                                    field: "mh_ears_nose_throat",
                                    equals: "yes"
                                }
                            }
                        ]
                    },

                    {
                        type: "row",
                        fields: [
                            {
                                type: "radio",
                                name: "mh_endocrine",
                                label: "Endocrine",
                                options: [
                                    { label: "Yes", value: "yes" },
                                    { label: "No", value: "no" }
                                ]
                            },
                            {
                                type: "radio",
                                name: "mh_fatigue",
                                label: "Fatigue",
                                options: [
                                    { label: "Yes", value: "yes" },
                                    { label: "No", value: "no" }
                                ]
                            }
                        ]
                    },

                    {
                        type: "row",
                        fields: [
                            {
                                type: "textarea",
                                name: "mh_endocrine_specify",
                                label: "Endocrine – Specify",
                                showIf: {
                                    field: "mh_endocrine",
                                    equals: "yes"
                                }
                            },
                            {
                                type: "textarea",
                                name: "mh_fatigue_specify",
                                label: "Fatigue – Specify",
                                showIf: {
                                    field: "mh_fatigue",
                                    equals: "yes"
                                }
                            }
                        ]
                    },

                    {
                        type: "row",
                        fields: [
                            {
                                type: "radio",
                                name: "mh_fevers",
                                label: "Fevers",
                                options: [
                                    { label: "Yes", value: "yes" },
                                    { label: "No", value: "no" }
                                ]
                            },
                            {
                                type: "radio",
                                name: "mh_heart_disease",
                                label: "Heart Disease",
                                options: [
                                    { label: "Yes", value: "yes" },
                                    { label: "No", value: "no" }
                                ]
                            }
                        ]
                    },

                    {
                        type: "row",
                        fields: [
                            {
                                type: "textarea",
                                name: "mh_fevers_specify",
                                label: "Fevers – Specify",
                                showIf: {
                                    field: "mh_fevers",
                                    equals: "yes"
                                }
                            },
                            {
                                type: "textarea",
                                name: "mh_heart_disease_specify",
                                label: "Heart Disease – Specify",
                                showIf: {
                                    field: "mh_heart_disease",
                                    equals: "yes"
                                }
                            }
                        ]
                    },

                    {
                        type: "row",
                        fields: [
                            {
                                type: "radio",
                                name: "mh_high_blood_pressure",
                                label: "High Blood Pressure",
                                options: [
                                    { label: "Yes", value: "yes" },
                                    { label: "No", value: "no" }
                                ]
                            },
                            {
                                type: "radio",
                                name: "mh_immune",
                                label: "Immune",
                                options: [
                                    { label: "Yes", value: "yes" },
                                    { label: "No", value: "no" }
                                ]
                            }
                        ]
                    },

                    {
                        type: "row",
                        fields: [
                            {
                                type: "textarea",
                                name: "mh_high_blood_pressure_specify",
                                label: "High Blood Pressure – Specify",
                                showIf: {
                                    field: "mh_high_blood_pressure",
                                    equals: "yes"
                                }
                            },
                            {
                                type: "textarea",
                                name: "mh_immune_specify",
                                label: "Immune – Specify",
                                showIf: {
                                    field: "mh_immune",
                                    equals: "yes"
                                }
                            }
                        ]
                    },

                    {
                        type: "radio",
                        name: "mh_integumentary_skin_disease",
                        label: "Integumentary (Skin disease)",
                        options: [
                            { label: "Yes", value: "yes" },
                            { label: "No", value: "no" }
                        ]
                    },
                    {
                        type: "textarea",
                        name: "mh_integumentary_skin_disease_specify",
                        label: "Integumentary (Skin disease) – Specify",
                        showIf: {
                            field: "mh_integumentary_skin_disease",
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
                    }
                ]
            },
            {
                title: "A – Analysis / Assessment",
                fields: [
                    { type: "subheading", label: "Visual Acuity – Aided" },

                    {
                        type: "grid-header",
                        cols: ["RE", "LE", "BE"]
                    },
                    {
                        type: "grid-row",
                        name: "va_aided_distance",
                        label: "Distance",
                        cols: ["RE", "LE", "BE"]
                    },
                    {
                        type: "grid-row",
                        name: "va_aided_near",
                        label: "Near",
                        cols: ["RE", "LE", "BE"]
                    },
                    {
                        type: "grid-row",
                        name: "va_aided_remark",
                        label: "Remark",
                        cols: ["RE", "LE", "BE"]
                    },

                    { type: "subheading", label: "Visual Acuity – Unaided" },

                    {
                        type: "grid-header",
                        cols: ["RE", "LE", "BE"]
                    },
                    {
                        type: "grid-row",
                        name: "va_unaided_distance",
                        label: "Distance",
                        cols: ["RE", "LE", "BE"]
                    },
                    {
                        type: "grid-row",
                        name: "va_unaided_near",
                        label: "Near",
                        cols: ["RE", "LE", "BE"]
                    },
                    {
                        type: "grid-row",
                        name: "va_unaided_remark",
                        label: "Remark",
                        cols: ["RE", "LE", "BE"]
                    },

                    {
                        type: "radio",
                        name: "pinhole",
                        label: "Pinhole",
                        options: [
                            { label: "Full", value: "full" },
                            { label: "Dull", value: "dull" },
                            { label: "Defected", value: "defected" }
                        ]
                    },

                    {
                        type: "radio",
                        name: "bruckner",
                        label: "Bruckner Test",
                        options: [
                            { label: "Passed", value: "passed" },
                            { label: "Failed", value: "failed" }
                        ]
                    },

                    { type: "input", name: "color_vision", label: "Color Vision Test" },

                    {
                        type: "radio",
                        name: "pupil_response",
                        label: "Pupil Response",
                        options: [
                            { label: "PERL", value: "perl" },
                            { label: "Anisocoria R>L", value: "r_gt_l" },
                            { label: "Anisocoria L>R", value: "l_gt_r" }
                        ]
                    },

                    {
                        type: "radio",
                        name: "marcus_gunn",
                        label: "Marcus Gunn Test",
                        options: [
                            { label: "Normal", value: "normal" },
                            { label: "Abnormal", value: "abnormal" }
                        ]
                    },

                    { type: "subheading", label: "Cover Test" },

                    {
                        type: "row",
                        fields: [
                            { type: "input", name: "cover_distance", label: "Distance" },
                            { type: "input", name: "cover_near", label: "Near" }
                        ]
                    },

                    {
                        type: "radio",
                        name: "stereopsis",
                        label: "Stereopsis",
                        options: [
                            { label: "Presented", value: "presented" },
                            { label: "Not Presented", value: "not_presented" }
                        ]
                    },

                    { type: "input", name: "hirschberg", label: "Hirschberg Test" },

                    {
                        type: "radio",
                        name: "eom_test",
                        label: "EOM Test",
                        options: [
                            { label: "Normal", value: "normal" },
                            { label: "Impaired", value: "impaired" }
                        ]
                    },

                    {
                        type: "radio",
                        name: "vor_test",
                        label: "VOR Test",
                        options: [
                            { label: "Normal", value: "normal" },
                            { label: "Impaired", value: "impaired" }
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
                            { type: "input", name: "tonometry_re", label: "Tonometry RE (mmHg @ time)" },
                            { type: "input", name: "tonometry_le", label: "Tonometry LE (mmHg @ time)" }
                        ]
                    },

                    { type: "textarea", name: "additional_test", label: "Additional Test" },
                    { type: "textarea", name: "analysis_remark", label: "Remark" }
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
                        type: "checkbox-group",
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
        />
    );
}
