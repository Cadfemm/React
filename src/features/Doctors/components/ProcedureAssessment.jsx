import { useState, useEffect } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

const ACTIONS = [
    { type: "back", label: "Back" },
    { type: "clear", label: "Clear" },
    { type: "save", label: "Save" }
];

const SubTab = [
    "BTI",
    "SC",
    "FEES",
    "RTMS",
    "TDCS",
    "NESA",
    "EST",
    "Musculoskeletal",
    "BSU"   
]

const MAS_OPTIONS = [
    { label: "0 - No increase in tone", value: "0_no" },
    { label: "1 - Slight increase in tone. Catch/Release at end ROM", value: "1"},
    { label: "1+ - Slight increase in tone. Catch/Release and resistance through rest ROM (1/2 ROM)", value:"1+"},
    { label: "2 - More marked increase in tone through ROM, but affected part moved easily", value: "2"},
    { label: "3 - Considerable increase in tone, passive movement difficult", value: "3"},
    { label: "4 - Affected part in rigid flexion and extension", value: "4"}
]

const NESA_SCHEMA = {
    title: "NESA",
    actions: ACTIONS,
    sections: [
        {
            fields: [
                {
                    name: "consent",
                    type: "checkbox-group",
                    options: [{label: 'Consent/Checklist', value: 'yes'}]
                },
                {
                    name: "document_upload",
                    label: "Upload",
                    type: "file-upload-modal",
                    showIf: {
                        field: "consent",
                        includes: "yes"
                    }
                },
                {
                    name: "protocol",
                    label: "Protocol",
                    type: "radio",
                    labelAbove: true,
                   options: [
                        { label: "Generalized Pain", value: "generalized_pain" },
                        { label: "Neuropathic Pain", value: "neuropathic_pain" },
                        { label: "Nerve Damage", value: "nerve_damage" },
                        { label: "Trigeminal Neuralgia", value: "trigeminal_neuralgia" },
                        { label: "Chronic Non-Specific Back Pain", value: "chronic_non_specific_back_pain" },
                        { label: "Phantom Limb Syndrome Lower Limb", value: "phantom_limb_lower_limb" },
                        { label: "Phantom Limb Syndrome Upper Limb", value: "phantom_limb_upper_limb" },
                        { label: "Sleep", value: "sleep" },
                        { label: "Anxiety and Non-Specific Mood Disorder", value: "anxiety_mood_disorder" },
                        { label: "Generalized Fatigue", value: "generalized_fatigue" },
                        { label: "Non-Specific Headache and Migraines", value: "headache_migraines" },
                        { label: "Stroke", value: "stroke" },
                        { label: "Acquired Brain Injury", value: "acquired_brain_injury" },
                        { label: "Central Dizziness", value: "central_dizziness" },
                        { label: "Parkinson's Disease", value: "parkinsons_disease" },
                        { label: "Multiple Sclerosis", value: "multiple_sclerosis" },
                        { label: "Others", value: "others" }
                    ]
                },
                {
                    name: "specify",
                    label: "Other Protocol",
                    type: "textarea",
                    showIf: {
                        field: "protocol",
                        equals: "others"
                    }
                },
                {
                    type: "subheading",
                    label: "Protocol Settings"
                },

                {
                    type: "custom-image",
                    src: "/generalized_pain.png",
                    showIf: { field: "protocol", equals: "generalized_pain" }
                },
                {
                    type: "custom-image",
                    src: "/neuropathic_pain.png",
                    showIf: { field: "protocol", equals: "neuropathic_pain" }
                },
                {
                    type: "custom-image",
                    src: "/nerve_damage.png",
                    showIf: { field: "protocol", equals: "nerve_damage" }
                },
                {
                    type: "custom-image",
                    src: "/trigeminal_neuralgia.png",
                    showIf: { field: "protocol", equals: "trigeminal_neuralgia" }
                },
                {
                    type: "custom-image",
                    src: "/chronic_non_specific_back_pain.png",
                    showIf: { field: "protocol", equals: "chronic_non_specific_back_pain" }
                },
                {
                    type: "custom-image",
                    src: "/phantom_limb_lower_limb.png",
                    showIf: { field: "protocol", equals: "phantom_limb_lower_limb" }
                },
                {
                    type: "custom-image",
                    src: "/phantom_limb_upper_limb.png",
                    showIf: { field: "protocol", equals: "phantom_limb_upper_limb" }
                },
                {
                    type: "custom-image",
                    src: "/sleep.png",
                    showIf: { field: "protocol", equals: "sleep" }
                },
                {
                    type: "custom-image",
                    src: "/anxiety_mood_disorder.png",
                    showIf: { field: "protocol", equals: "anxiety_mood_disorder" }
                },
                {
                    type: "custom-image",
                    src: "/generalized_fatigue.png",
                    showIf: { field: "protocol", equals: "generalized_fatigue" }
                },
                {
                    type: "custom-image",
                    src: "/headache_migraines.png",
                    showIf: { field: "protocol", equals: "headache_migraines" }
                },
                {
                    type: "custom-image",
                    src: "/stroke.png",
                    showIf: { field: "protocol", equals: "stroke" }
                },
                {
                    type: "custom-image",
                    src: "/acquired_brain_injury.png",
                    showIf: { field: "protocol", equals: "acquired_brain_injury" }
                },
                {
                    type: "custom-image",
                    src: "/central_dizziness.png",
                    showIf: { field: "protocol", equals: "central_dizziness" }
                },
                {
                    type: "custom-image",
                    src: "/parkinsons_disease.png",
                    showIf: { field: "protocol", equals: "parkinsons_disease" }
                },
                {
                    type: "custom-image",
                    src: "/multiple_sclerosis.png",
                    showIf: { field: "protocol", equals: "multiple_sclerosis" }
                },
                {
                    name: "complication",
                    label: "Complication",
                    type: "radio",
                    options: [
                        { label: "Yes", value: "yes" },
                        { label: "No", value: "no" }
                    ]
                },
                {
                    name: "complication_details",
                    label: "Please specify complication",
                    type: "textarea",
                    showIf: {
                        field: "complication",
                        equals: "yes"
                    }
                },
                 /* ========== GOALS & PLAN ========== */
                {
                    type: "subheading",
                    label: "Goals"
                },
                {
                    name: "nesa_goals",
                    type: "textarea",
                    placeholder: "Enter goals"
                },

                {
                    type: "subheading",
                    label: "Plan"
                },
                {
                    name: "nesa_plan",
                    type: "textarea",
                    placeholder: "Enter plan"
                }
            ]
        }
    ]
}

const EST_SCHEMA = {
    title: "Exercise Stress Test (EST)",
    actions: ACTIONS,
    sections: [
        {
            fields: [
                {
                    name: "appoinment_date",
                    label: "Date of Appoinment",
                    type: "date"
                },
                {
                    name: "est_type",
                    label: "Type of EST",
                    type: "radio",
                    labelAbove: true,
                    options: [
                        { label: "Exercise Stress Test Treadmill", value: "treadmill_stress" },
                        { label: "Exercise Stress Test Treadmill With Wheelchair", value: "treadmill_stress_wheelchair"},
                        { label: "Ergometry", value: "ergometry", value: "ergometry" }
                    ]
                },
                {
                    type: "row",
                    fields: [
                        {
                            name: "age",
                            label: "Age",
                            type: "input",
                            readOnly:  true
                        },
                        {
                            name: "bmi",
                            label: "BMI",
                            type: "input",
                            readOnly: true
                        },
                    ]
                },
                {
                    name: "target_heart_rate",
                    label: "Target Heart Rate",
                    type: "input"
                },
                {
                    name: "underlying",
                    label: "Underlying",
                    type: "radio",
                    options: [
                        { label: "Major Cardiac Issue", value: "major_cardiac"},
                        { label: "Minor Cardiac Issue", value: "minor_cardiac"},
                        { label: "Others", value: "others"}
                    ]
                },
                {
                    name: "specify",
                    label: "Specify",
                    type: "textarea",
                    showIf: {
                        field: "underlying",
                        equals: "others"
                    }
                },                
                {
                    name: "diagnosis",
                    label: "Diagnosis",
                    type: "input"
                },
               {
                    name: "indication",
                    label: "Indication",
                    type: "radio",
                    labelAbove: true,
                    options: [
                        { label: "Pre Cardiac Rehabilitation Phase II", value: "pre_cardiac_rehab_phase_2" },
                        { label: "Post Cardiac Rehabilitation Phase II", value: "post_cardiac_rehab_phase_2" },
                        { label: "Post Cardiac Rehabilitation Phase III", value: "post_cardiac_rehab_phase_3" },
                        { label: "Cardiac Screening", value: "cardiac_screening" },
                        { label: "Others", value: "others" }
                    ]
                },
                {
                    name: "specify",
                    label: "Others",
                    type: "textarea",
                    showIf: {
                        field: "indication",
                        equals: "others"
                    }
                },
                {
                    name: "protocol",
                    label: "Protocol",
                    type: "radio",
                    options: [
                        { label: "Bruce", value: "bruce"},
                        { label: "Modified Bruce", value: "modified_bruce"},
                        { label: "WHO", value: "who"},
                        { label: "Others", value: "others"}
                    ]
                },
                {
                    name: "specify",
                    label: "Specify",
                    type: "textarea",
                    showIf: {
                        field: "protocol",
                        equals: "others"
                    }
                },
                {
                    name: "graf",
                    label: "GRAF",
                    type: "radio",
                    options: [
                        { label: "Running GRAF Report", value: "running_graf_report"},
                        { label: "Technical Report", value: "technical_report"},
                    ]
                },
                {
                    name: "final_report",
                    label: "Final Report",
                    type: "radio",
                    options: [
                        { label: "Positive Stress Test", value: "positive_stress_test"},
                        { label: "Negative Stress Test", value: "negative_stress_test"},
                        { label: "Others", value: "others"}
                    ]
                },
                {
                    name: "specify",
                    label: "Specify",
                    type: "textarea",
                    showIf: {
                        field: "final_report",
                        equals: "others"
                    }
                },
                
                {
                    name: "remarks",
                    label: "Remarks",
                    type: "textarea"
                },
                 /* ========== GOALS & PLAN ========== */
                {
                    type: "subheading",
                    label: "Goals"
                },
                {
                    name: "est_goals",
                    type: "textarea",
                    placeholder: "Enter goals"
                },

                {
                    type: "subheading",
                    label: "Plan"
                },
                {
                    name: "est_plan",
                    type: "textarea",
                    placeholder: "Enter plan"
                }
            ]
        }
    ]
}

const BSU_SCHEMA = {
    title: "Bed Side Ultrasound for MSK",
    actions: ACTIONS,
    sections: [
        {
            fields: [
                {
                    type: "radio",
                    name: "scanned_area",
                    label: "Area Scanned",
                    labelAbove: true,
                    options: [
                        { label: "Shoulder", value:"shoulder" },
                        { label: "Elbow", value: "elbow" },
                        { label: "Wrist", value: "wrist" },
                        { label: "Finger Joint", value: "finger_joint" },
                        { label: "Back", value: "back" },
                        { label: "Hip", value: "hip" },
                        { label: "Knee", value: "knee" },
                        { label: "Ankle", value: "Ankle" },
                        { label: "Foot Joint", value: "foot_joint" },
                    ]
                },
                {
                    name: "findings",
                    label: "Findings",
                    type: "textarea"
                },
                {
                    name: "document_image",
                    label: "Image",
                    type: "file-upload-modal"
                },
                {
                    name: "impression",
                    label: "Impression",
                    type: "textarea"
                },
                 /* ========== GOALS & PLAN ========== */
                {
                    type: "subheading",
                    label: "Goals"
                },
                {
                    name: "bsu_goals",
                    type: "textarea",
                    placeholder: "Enter goals"
                },

                {
                    type: "subheading",
                    label: "Plan"
                },
                {
                    name: "bsu_plan",
                    type: "textarea",
                    placeholder: "Enter plan"
                }
            ]
        }
    ]
}

const BTI_SCHEMA = {
    title: "Botulinum Toxin Injection",
    actions: ACTIONS,
    sections: [
        {
            fields: [
                {
                    name: "clostridium_botulinum_type",
                    label: "Type Clostridium Botulinum",
                    type: "radio",
                    labelAbove: true,
                    options: [
                        { label: "Dysport", value: "dysport"},
                        { label: "Botox", value: "botox"}
                    ]
                },
                { type: "subheading", label: "Shoulder and Elbow region" },
                {
                    type: "refraction-12col",
                    name: "shoulder_region",
                    cornerLabel: "Muscle",
                    cornerLikeGroupHeader: true,
                    showColumnHeaders: true,
                    groups: [
                        { label: "Modified Ashworth Scale (MAS)", columns: [{ key: "Right" }, { key: "Left" }] },
                        { label: "Tardieu Scale R2", columns: [{ key: "Right" }, { key: "Left" }] },
                        { label: "Tardieu Scale R1", columns: [{ key: "Right" }, { key: "Left" }] },
                        { label: "Tardieu Scale R2-R1", columns: [{ key: "Right" }, { key: "Left" }] },
                    ],
                    rows: [
                        {
                            value: "pectoralis_major",
                            label: "Pectoralis Major",
                            columns: [{
                                type: "select",
                                options: MAS_OPTIONS
                            }, {
                                type: "select",
                                options: MAS_OPTIONS
                            }, {}, {}, {}, {}, {}, {}],
                        },
                        {
                            value: "triceps",
                            label: "Triceps",
                            columns: [{
                                type: "select",
                                options: MAS_OPTIONS
                            }, {
                                type: "select",
                                options: MAS_OPTIONS
                            }, {}, {}, {}, {}, {}, {}],
                        },
                        {
                            value: "biceps_brachii",
                            label: "Biceps Brachii",
                            columns: [{
                                type: "select",
                                options: MAS_OPTIONS
                            }, {
                                type: "select",
                                options: MAS_OPTIONS
                            }, {}, {}, {}, {}, {}, {}],
                        },
                        {
                            value: "brachialis",
                            label: "Brachialis",
                            columns: [{
                                type: "select",
                                options: MAS_OPTIONS
                            }, {
                                type: "select",
                                options: MAS_OPTIONS
                            }, {}, {}, {}, {}, {}, {}],
                        },
                        {
                            value: "brachioradialis",
                            label: "Brachioradialis",
                            columns: [{
                                type: "select",
                                options: MAS_OPTIONS
                            }, {
                                type: "select",
                                options: MAS_OPTIONS
                            }, {}, {}, {}, {}, {}, {}],
                        },
                    ],
                },
                { type: "subheading", label: "Wrist Region" },
                {
                    type: "refraction-12col",
                    name: "wrist_region",
                    cornerLabel: "Muscle",
                    cornerLikeGroupHeader: true,
                    showColumnHeaders: true,
                    groups: [
                        { label: "Modified Ashworth Scale (MAS)", columns: [{ key: "Right" }, { key: "Left" }] },
                        { label: "Tardieu Scale R2", columns: [{ key: "Right" }, { key: "Left" }] },
                        { label: "Tardieu Scale R1", columns: [{ key: "Right" }, { key: "Left" }] },
                        { label: "Tardieu Scale R2-R1", columns: [{ key: "Right" }, { key: "Left" }] },
                    ],
                    rows: [
                        {
                            value: "pronator_teres",
                            label: "Pronator Teres",
                            columns: [{
                                type: "select",
                                options: MAS_OPTIONS
                            }, {
                                type: "select",
                                options: MAS_OPTIONS
                            }, {}, {}, {}, {}, {}, {}],
                        },
                        {
                            value: "flexor_carpi_ulnaris",
                            label: "Flexor Carpi Ulnaris (FCU)",
                            columns: [{
                                type: "select",
                                options: MAS_OPTIONS
                            }, {
                                type: "select",
                                options: MAS_OPTIONS
                            }, {}, {}, {}, {}, {}, {}],
                        },
                        {
                            value: "flexor_carpi_radialis",
                            label: "Flexor Carpi Radialis (FCR)",
                            columns: [{
                                type: "select",
                                options: MAS_OPTIONS
                            }, {
                                type: "select",
                                options: MAS_OPTIONS
                            }, {}, {}, {}, {}, {}, {}],
                        },
                    ],
                },

                { type: "subheading", label: "Finger Region" },
                {
                    type: "refraction-12col",
                    name: "finger_region",
                    cornerLabel: "Muscle",
                    cornerLikeGroupHeader: true,
                    showColumnHeaders: true,
                    groups: [
                        { label: "Modified Ashworth Scale (MAS)", columns: [{ key: "Right" }, { key: "Left" }] },
                        { label: "Tardieu Scale R2", columns: [{ key: "Right" }, { key: "Left" }] },
                        { label: "Tardieu Scale R1", columns: [{ key: "Right" }, { key: "Left" }] },
                        { label: "Tardieu Scale R2-R1", columns: [{ key: "Right" }, { key: "Left" }] },
                    ],
                    rows: [
                        {
                            value: "flexor_digitorum_profundus",
                            label: "Flexor Digitorum Profundus (FDP)",
                            columns: [{
                                type: "select",
                                options: MAS_OPTIONS
                            }, {
                                type: "select",
                                options: MAS_OPTIONS
                            }, {}, {}, {}, {}, {}, {}],
                        },
                        {
                            value: "flexor_digitorum_superficialis",
                            label: "Flexor Digitorum Superficialis (FDS)",
                            columns: [{
                                type: "select",
                                options: MAS_OPTIONS
                            }, {
                                type: "select",
                                options: MAS_OPTIONS
                            }, {}, {}, {}, {}, {}, {}],
                        },
                        {
                            value: "flexor_pollicis_longus",
                            label: "Flexor Pollicis Longus (FPL)",
                            columns: [{
                                type: "select",
                                options: MAS_OPTIONS
                            }, {
                                type: "select",
                                options: MAS_OPTIONS
                            }, {}, {}, {}, {}, {}, {}],
                        },
                    ],
                },

                { type: "subheading", label: "Hamstring" },
                {
                    type: "refraction-12col",
                    name: "hamstring",
                    cornerLabel: "Muscle",
                    cornerLikeGroupHeader: true,
                    showColumnHeaders: true,
                    groups: [
                        { label: "Modified Ashworth Scale (MAS)", columns: [{ key: "Right" }, { key: "Left" }] },
                        { label: "Tardieu Scale R2", columns: [{ key: "Right" }, { key: "Left" }] },
                        { label: "Tardieu Scale R1", columns: [{ key: "Right" }, { key: "Left" }] },
                        { label: "Tardieu Scale R2-R1", columns: [{ key: "Right" }, { key: "Left" }] },
                    ],
                    rows: [
                        {
                            value: "bicep_femoris",
                            label: "Bicep Femoris",
                            columns: [{
                                type: "select",
                                options: MAS_OPTIONS
                            }, {
                                type: "select",
                                options: MAS_OPTIONS
                            }, {}, {}, {}, {}, {}, {}],
                        },
                        {
                            value: "semitendinosus",
                            label: "Semitendinosus",
                            columns: [{
                                type: "select",
                                options: MAS_OPTIONS
                            }, {
                                type: "select",
                                options: MAS_OPTIONS
                            }, {}, {}, {}, {}, {}, {}],
                        },
                        {
                            value: "semimembranosus",
                            label: "Semimembranosus",
                            columns: [{
                                type: "select",
                                options: MAS_OPTIONS
                            }, {
                                type: "select",
                                options: MAS_OPTIONS
                            }, {}, {}, {}, {}, {}, {}],
                        },
                        {
                            value: "adductors",
                            label: "Adductors",
                            columns: [{
                                type: "select",
                                options: MAS_OPTIONS
                            }, {
                                type: "select",
                                options: MAS_OPTIONS
                            }, {}, {}, {}, {}, {}, {}],
                        }
                    ],
                },
                { type: "subheading", label: "Ankle Region" },
                {
                    type: "refraction-12col",
                    name: "ankle_region",
                    cornerLabel: "Muscle",
                    cornerLikeGroupHeader: true,
                    showColumnHeaders: true,
                    groups: [
                        { label: "Modified Ashworth Scale (MAS)", columns: [{ key: "Right" }, { key: "Left" }] },
                        { label: "Tardieu Scale R2", columns: [{ key: "Right" }, { key: "Left" }] },
                        { label: "Tardieu Scale R1", columns: [{ key: "Right" }, { key: "Left" }] },
                        { label: "Tardieu Scale R2-R1", columns: [{ key: "Right" }, { key: "Left" }] },
                    ],
                    rows: [
                        {
                            value: "gastrocnemius",
                            label: "Gastrocnemius",
                            columns: [{
                                type: "select",
                                options: MAS_OPTIONS
                            }, {
                                type: "select",
                                options: MAS_OPTIONS
                            }, {}, {}, {}, {}, {}, {}],
                        },
                        {
                            value: "medical_head",
                            label: "Medical Head",
                            columns: [{
                                type: "select",
                                options: MAS_OPTIONS
                            }, {
                                type: "select",
                                options: MAS_OPTIONS
                            }, {}, {}, {}, {}, {}, {}],
                        },
                        {
                            value: "lateral_head",
                            label: "Lateral Head",
                            columns: [{
                                type: "select",
                                options: MAS_OPTIONS
                            }, {
                                type: "select",
                                options: MAS_OPTIONS
                            }, {}, {}, {}, {}, {}, {}],
                        },
                        {
                            value: "soleus",
                            label: "Soleus",
                            columns: [{
                                type: "select",
                                options: MAS_OPTIONS
                            }, {
                                type: "select",
                                options: MAS_OPTIONS
                            }, {}, {}, {}, {}, {}, {}],
                        },
                        {
                            value: "posterior_tibialis",
                            label: "Posterior Tibialis",
                            columns: [{
                                type: "select",
                                options: MAS_OPTIONS
                            }, {
                                type: "select",
                                options: MAS_OPTIONS
                            }, {}, {}, {}, {}, {}, {}],
                        },
                        {
                            value: "flexor_digitorum_longus",
                            label: "Flexor Digitorum Longus (FDL)",
                            columns: [{
                                type: "select",
                                options: MAS_OPTIONS
                            }, {
                                type: "select",
                                options: MAS_OPTIONS
                            }, {}, {}, {}, {}, {}, {}],
                        },
                        {
                            value: "flexor_hallucis_longus",
                            label: "Flexor Hallucis Longus (FHL)",
                            columns: [{
                                type: "select",
                                options: MAS_OPTIONS
                            }, {
                                type: "select",
                                options: MAS_OPTIONS
                            }, {}, {}, {}, {}, {}, {}],
                        },
                    ],
                },
                {
                    name: "additional_injection_site",
                    label: "Additional Injection Site & Specify the Dose",
                    type: "textarea"
                },
                { 
                    name: "functional_aim",
                    label: "Functional Aim (indication)",
                    type: "textarea"
                },
                {
                    name: "total_vial_used",
                    label: "Total Vial Used",
                    type: "textarea"
                },
                {
                    name: "total_injection_unit",
                    label: "Total Injection Unit",
                    type: "textarea"
                },
 {
                name: "complication",
                label: "Post Procedure Complication (if any)",
                type: "radio",
                options: [
                    { label: "Yes", value: "yes" },
                    { label: "No", value: "no" }
                ]
            },
            {
                name: "complication_details",
                label: "Please specify complication",
                type: "textarea",
                showIf: {
                    field: "complication",
                    equals: "yes"
                }
            },
                      /* ========== GOALS & PLAN ========== */
            {
                type: "subheading",
                label: "Goals"
            },
            {
                name: "bti_goals",
                type: "textarea",
                placeholder: "Enter goals"
            },

            {
                type: "subheading",
                label: "Plan"
            },
            {
                name: "bti_plan",
                type: "textarea",
                placeholder: "Enter plan"
            },
            ]
        }
    ]
}

const SC_SCHEMA = {
    title: "Serial Casting",
    actions: ACTIONS,
    sections: [
        {
            fields: [
                {
                    name: "series_no",
                    label: "No. of Series",
                    type: "input"
                },
                { type: "subheading", label: "Hamstring" },
                {
                    type: "refraction-12col",
                    name: "sc_hamstring",
                    cornerLabel: "Muscle",
                    cornerLikeGroupHeader: true,
                    showColumnHeaders: true,
                    groups: [
                        { label: "Modified Ashworth Scale (MAS)", columns: [{ key: "Right" }, { key: "Left" }] },
                        { label: "Tardieu Scale R1", columns: [{ key: "Right" }, { key: "Left" }] },
                        { label: "Tardieu Scale R2", columns: [{ key: "Right" }, { key: "Left" }] },
                        { label: "Tardieu Scale R2-R1", columns: [{ key: "Right" }, { key: "Left" }] },
                    ],
                    rows: [
                        {
                            value: "bicep_femoris",
                            label: "Bicep Femoris",
                            columns: [{
                                type: "select",
                                options: MAS_OPTIONS
                            }, {
                                type: "select",
                                options: MAS_OPTIONS
                            }, {}, {}, {}, {}, {}, {}],
                        },
                        {
                            value: "semitendinosus",
                            label: "Semitendinosus",
                            columns: [{
                                type: "select",
                                options: MAS_OPTIONS
                            }, {
                                type: "select",
                                options: MAS_OPTIONS
                            }, {}, {}, {}, {}, {}, {}],
                        },
                        {
                            value: "semimembranosus",
                            label: "Semimembranosus",
                            columns: [{
                                type: "select",
                                options: MAS_OPTIONS
                            }, {
                                type: "select",
                                options: MAS_OPTIONS
                            }, {}, {}, {}, {}, {}, {}],
                        },
                        {
                            value: "adductors",
                            label: "Adductors",
                            columns: [{
                                type: "select",
                                options: MAS_OPTIONS
                            }, {
                                type: "select",
                                options: MAS_OPTIONS
                            }, {}, {}, {}, {}, {}, {}],
                        }
                    ],
                },
                { type: "subheading", label: "Ankle Region" },
                {
                    type: "refraction-12col",
                    name: "sc_ankle_region",
                    cornerLabel: "Muscle",
                    cornerLikeGroupHeader: true,
                    showColumnHeaders: true,
                    groups: [
                        { label: "Modified Ashworth Scale (MAS)", columns: [{ key: "Right" }, { key: "Left" }] },
                        { label: "Tardieu Scale R1", columns: [{ key: "Right" }, { key: "Left" }] },
                        { label: "Tardieu Scale R2", columns: [{ key: "Right" }, { key: "Left" }] },
                        { label: "Tardieu Scale R2-R1", columns: [{ key: "Right" }, { key: "Left" }] },
                    ],
                    rows: [
                        {
                            value: "gastrocnemius",
                            label: "Gastrocnemius",
                            columns: [{
                                type: "select",
                                options: MAS_OPTIONS
                            }, {
                                type: "select",
                                options: MAS_OPTIONS
                            }, {}, {}, {}, {}, {}, {}],
                        },
                        {
                            value: "medical_head",
                            label: "Medical Head",
                            columns: [{
                                type: "select",
                                options: MAS_OPTIONS
                            }, {
                                type: "select",
                                options: MAS_OPTIONS
                            }, {}, {}, {}, {}, {}, {}],
                        },
                        {
                            value: "lateral_head",
                            label: "Lateral Head",
                            columns: [{
                                type: "select",
                                options: MAS_OPTIONS
                            }, {
                                type: "select",
                                options: MAS_OPTIONS
                            }, {}, {}, {}, {}, {}, {}],
                        },
                        {
                            value: "soleus",
                            label: "Soleus",
                            columns: [{
                                type: "select",
                                options: MAS_OPTIONS
                            }, {
                                type: "select",
                                options: MAS_OPTIONS
                            }, {}, {}, {}, {}, {}, {}],
                        },
                        {
                            value: "posterior_tibialis",
                            label: "Posterior Tibialis",
                            columns: [{
                                type: "select",
                                options: MAS_OPTIONS
                            }, {
                                type: "select",
                                options: MAS_OPTIONS
                            }, {}, {}, {}, {}, {}, {}],
                        },
                        {
                            value: "flexor_digitorum_longus",
                            label: "Flexor Digitorum Longus (FDL)",
                            columns: [{
                                type: "select",
                                options: MAS_OPTIONS
                            }, {
                                type: "select",
                                options: MAS_OPTIONS
                            }, {}, {}, {}, {}, {}, {}],
                        },
                        {
                            value: "flexor_hallucis_longus",
                            label: "Flexor Hallucis Longus (FHL)",
                            columns: [{
                                type: "select",
                                options: MAS_OPTIONS
                            }, {
                                type: "select",
                                options: MAS_OPTIONS
                            }, {}, {}, {}, {}, {}, {}],
                        },
                    ],
                },
            ]
        },
        { 
            title: "Range of Motion (ROM)",
            fields: [
                { type: "subheading", label: "Knee" },
                {
                    type: "refraction-12col",
                    name: "rom_knee",
                    cornerLabel: "Target Muscle",
                    cornerLikeGroupHeader: true,
                    showColumnHeaders: true,
                    groups: [
                        { label: "Active Range Of Motion (AROM)", columns: [{ key: "Right" }, { key: "Left" }] },
                        { label: "Passive Range Of Motion (PROM)", columns: [{ key: "Right" }, { key: "Left" }] },
                    ],
                    rows: [
                        { value: "flexion", label: "Flexion", columns: [{}, {}, {}, {},]},
                        { value: "dorsiflexion", label: "Dorsiflexion", columns: [{}, {}, {}, {},]},
                    ],
                },
                { type: "subheading", label: "Ankle / Foot" },
                {
                    type: "refraction-12col",
                    name: "rom_ankle_foot",
                    cornerLabel: "Target Muscle",
                    cornerLikeGroupHeader: true,
                    showColumnHeaders: true,
                    groups: [
                        { label: "Active Range Of Motion (AROM)", columns: [{ key: "Right" }, { key: "Left" }] },
                        { label: "Passive Range Of Motion (PROM)", columns: [{ key: "Right" }, { key: "Left" }] },
                    ],
                    rows: [
                        {
                            value: "dorsiflexion",
                            label: "Dorsiflexion",
                            columns: [{}, {}, {}, {}],
                        },
                        {
                            value: "plantarflexion",
                            label: "Plantarflexion",
                            columns: [{}, {}, {}, {}],
                        },
                    ],
                },
            ]
        },
        {
            fields: [
                {
                    name: "functional_aim",
                    label: "Functional Aim (indication)",
                    type: "textarea"
                },
                {
                name: "complication",
                label: "Post Procedure Complication",
                type: "radio",
                options: [
                    { label: "Yes", value: "yes" },
                    { label: "No", value: "no" }
                ]
            },
            {
                name: "complication_details",
                label: "Please specify complication",
                type: "textarea",
                showIf: {
                    field: "complication",
                    equals: "yes"
                }
            },
                      /* ========== GOALS & PLAN ========== */
            {
                type: "subheading",
                label: "Goals"
            },
            {
                name: "sc_goals",
                type: "textarea",
                placeholder: "Enter goals"
            },

            {
                type: "subheading",
                label: "Plan"
            },
            {
                name: "sc_plan",
                type: "textarea",
                placeholder: "Enter plan"
            },
            ]
        }    
    ]
}

const FEES_SCHEMA = {
    title: "Flexible Endoscopic Evaluation of Swallowing (Fees)",
    actions: ACTIONS,
    sections: [
        {
            fields: [

                /* ========== GOALS & PLAN ========== */
                {
                    type: "subheading",
                    label: "Goals"
                },
                {
                    name: "fees_goals",
                    type: "textarea",
                    placeholder: "Enter goals"
                },

                {
                    type: "subheading",
                    label: "Plan"
                },
                {
                    name: "fees_plan",
                    type: "textarea",
                    placeholder: "Enter plan"
                }

            ]
        }
    ]
}

const RTMS_SCHEMA = {
    title: "Repetitive Transcranial Magnetic Stimulation (rTMS)",
    actions: ACTIONS,
    sections: [
        {
            fields: [
                {
                    name: "rtms_consent",
                    type: "checkbox-group",
                    options: [{label: 'Consent/Checklist', value: 'yes'}]
                },
                {
                    name: "rtms_document_upload",
                    label: "Upload",
                    type: "file-upload-modal",
                    showIf: {
                        field: "rtms_consent",
                        includes: "yes"
                    }
                },
                {
                    name: "rtms_protocol",
                    label: "Protocol",
                    type: "radio",
                    labelAbove: true,
                    options: [
                        { label: "Motor Stroke", value: "motor_stoke"},
                        { label: "Aphasia", value: "aphasia"},
                        { label: "Cognitive", value: "cognitive"},
                        { label: "Neuropathic Pain", value: "neuropathic_pain"},
                        { label: "Others", value: "others"}
                    ]
                },
                {
                    name: "rtms_specify",
                    label: "Specify",
                    type: "textarea",
                    showIf: {
                        field: "rtms_protocol",
                        equals: "others"
                    }
                },
                {
                    name: "rtms_stimulation_site",
                    label: "Stimulation Site",
                    type: "single-select",
                    options: [
                        { label: "Right", value: "right"},
                        { label: "Left", value: "left"}
                    ]
                },
                {
                    name: "rtms_frequency",
                    label: "Frequency",
                    type: "radio",
                    options: [
                        { label: "1Hz", value: "1hz"},
                        { label: "10Hz", value: "10hz"},
                        { label: "Teta Burst", value: "teta_burst"},
                        { label: "Others", value: "others"}
                    ]
                },
                {
                    name: "rtms_intensity",
                    label: "Intensity (MEP)",
                    type: "textarea"
                },
               {
                name: "complication",
                label: "Complication",
                type: "radio",
                options: [
                    { label: "Yes", value: "yes" },
                    { label: "No", value: "no" }
                ]
            },
            {
                name: "complication_details",
                label: "Please specify complication",
                type: "textarea",
                showIf: {
                    field: "complication",
                    equals: "yes"
                }
            },
                                  /* ========== GOALS & PLAN ========== */
            {
                type: "subheading",
                label: "Goals"
            },
            {
                name: "rtms_goals",
                type: "textarea",
                placeholder: "Enter goals"
            },

            {
                type: "subheading",
                label: "Plan"
            },
            {
                name: "rtms_plan",
                type: "textarea",
                placeholder: "Enter plan"
            },
            ]
        }
    ]
}
const TDCS_SCHEMA = {
    title: "",
    actions: ACTIONS,
    sections: [
        
        {
            title: "Transcranial Direct Current Stimulation(tDCS)",
            fields: [
                {
                    name: "consent",
                    type: "checkbox-group",
                    options: [{label: 'Consent/Checklist', value: 'yes'}]
                },
                {
                    name: "document_upload",
                    label: "Upload",
                    type: "file-upload-modal",
                    showIf: {
                        field: "consent",
                        includes: "yes"
                    }
                },
                {
                    name: "tdcs_protocol",
                    label: "Protocol",
                    type: "radio",
                    labelAbove: true,
                    options: [
                        { label: "Motor Stroke", value: "motor_stoke"},
                        { label: "Aphasia", value: "aphasia"},
                        { label: "Cognitive", value: "cognitive"},
                        { label: "Neuropathic Pain", value: "neuropathic_pain"},
                        { label: "Others", value: "others"}
                    ]
                },
                {
                    name: "specify",
                    label: "Specify",
                    type: "textarea",
                    showIf: {
                        field: "protocol",
                        equals: "others"
                    }
                },
                {
                    name: "location",
                    label: "Location",
                    type: "single-select",
                    options: [
                        { label: "Right", value: "right"},
                        { label: "Left", value: "left"}
                    ]
                },
                {
                    name: "location_select",
                    type: "single-select",
                    options: [
                        { label: "M1", value: "m1"},
                        { label: "DLPFC", value: "dlpfc"},
                        { label: "BROCA", value: "broca"},
                        { label: "Others", value: "others"}
                    ],
                    showIf: {
                        field: "location",
                        oneOf: ["right", "left"]
                    }
                },
                {
                    name: "specify",
                    label: "Specify",
                    type: "textarea",
                    showIf: {
                        field: "location_select",
                        equals: "others"
                    }
                },
                {
                    name: "current",
                    label: "Current (mA)",
                    type: "radio",
                    options: [
                        { label: "2000", value: 2000},
                        { label: "1500", value: 1500},
                        { label: "1000", value: 1000}
                    ]
                },
                {
                name: "complication",
                label: "Complication",
                type: "radio",
                options: [
                    { label: "Yes", value: "yes" },
                    { label: "No", value: "no" }
                ]
            },
            {
                name: "complication_details",
                label: "Please specify complication",
                type: "textarea",
                showIf: {
                    field: "complication",
                    equals: "yes"
                }
            },
                                  /* ========== GOALS & PLAN ========== */
            {
                type: "subheading",
                label: "Goals"
            },
            {
                name: "tdcs_goals",
                type: "textarea",
                placeholder: "Enter goals"
            },

            {
                type: "subheading",
                label: "Plan"
            },
            {
                name: "tdcs_plan",
                type: "textarea",
                placeholder: "Enter plan"
            },
            ]
        }
    ]
}

const MUSCU_SCHEMA = {
    title: "Musculoskeletal",
    actions: ACTIONS,
    sections: [
        {
            fields: [
                {
                    name: "procedure_types",
                    label: "Types of Procedure",
                    type: "radio",
                    labelAbove: true,
                    options: [
                        { label: "Perineural Injection Therapy", value: "perineural_injection_therapy" },
                        { label: "Nerve Block", value: "nerve_block" },
                        { label: "Intra-Articular Injection", value: "articular_injection" },
                        { label: "Hydrodisection", value: "hydrodisection" },
                        { label: "Prolotherapy", value: "prolotherapy" }
                    ]
                },
                {
                    name: "consent",
                    type: "checkbox-group",
                    options: [{label: 'Consent/Checklist', value: 'yes'}]
                },
                {
                    name: "document_upload",
                    label: "Upload",
                    type: "file-upload-modal",
                    showIf: {
                        field: "consent",
                        includes: "yes"
                    }
                },
                {
                    name: "valleix_point_injected",
                    label: "Area Injected",
                    type: "input"
                },
                {
                    name: "nrs_pre_procedure",
                    label: "NRS Pre Procedure",
                    type: "input"
                },
                {
                    name: "nrs_post_procedure",
                    label: "NRS Post Procedure",
                    type: "input"
                },
                {
                    name: "rom_pre_procedure",
                    label: "ROM Pre Procedure",
                    type: "input"
                },
                {
                    name: "rom_post_procedure",
                    label: "ROM Post Procedure",
                    type: "input"
                },
                {
                    name: "has_complication",
                    label: "Complication",
                    type: "radio",
                    options: [
                        { label: "Yes", value: "yes" },
                        { label: "No", value: "no" }
                    ]
                },
                {
                    name: "complication",
                    label: "Select Complication",
                    type: "multi-select-dropdown",
                    options: [
                        { label: "Bleeding", value: "bleeding" },
                        { label: "Swollen", value: "swollen" },
                        { label: "Bruises", value: "bruises" },
                        { label: "Allergic Skin Reaction", value: "allergic_skin_reaction" },
                        { label: "Others", value: "others"}
                    ],
                    showIf: {
                        field: "has_complication",
                        equals: "yes"
                    }
                },
                {
                    name: "specify",
                    label: "Specify",
                    type: "textarea",
                    showIf: {
                        field: "complication",
                        equals: "others"
                    }
                },
                {
                    name: "next_injection_date",
                    label: "Next Injection Date",
                    type: "date"
                },
                {
                    name: "remarks",
                    label: "Remarks",
                    type: "textarea"
                },
                                      /* ========== GOALS & PLAN ========== */
            {
                type: "subheading",
                label: "Goals"
            },
            {
                name: "muscu_goals",
                type: "textarea",
                placeholder: "Enter goals"
            },

            {
                type: "subheading",
                label: "Plan"
            },
            {
                name: "muscu_plan",
                type: "textarea",
                placeholder: "Enter plan"
            },
            ]
        }
    ]
}

const SCHEMA = {
    SC: SC_SCHEMA,
    BTI: BTI_SCHEMA,
    BSU: BSU_SCHEMA,
    EST: EST_SCHEMA,
    NESA: NESA_SCHEMA,
    RTMS: RTMS_SCHEMA,
    TDCS: TDCS_SCHEMA,
    FEES: FEES_SCHEMA,
    Musculoskeletal: MUSCU_SCHEMA
}

const diffTardieu = (values) => {
    var diff = {}
    if (!values) return null
    const asNumberOrNull = (v) => {
        const raw = v ?? "";
        if (String(raw).trim() === "") return null;
        const n = Number(raw);
        return Number.isFinite(n) ? n : null;
    };
    Object.entries(values).map(([key, item]) => {
        if (key.endsWith('_0') || key.endsWith("_1")) {
            return null
        } else if (key.endsWith('_2')) {
            if (key.startsWith("sc_")) {
              const r1 = asNumberOrNull(values[key]);
              const r2 = asNumberOrNull(values[key.replace('_2', '_4')]);
              diff[key.replace('_2', '_6')] = r1 === null || r2 === null ? "" : (r2 - r1);
            } else {
              const r2 = asNumberOrNull(values[key]);
              const r1 = asNumberOrNull(values[key.replace('_2', '_4')]);
              diff[key.replace('_2', '_6')] = r2 === null || r1 === null ? "" : (r2 - r1);
            }
        } else if (key.endsWith('_3')) {
            if (key.startsWith("sc_")) {
              const r1 = asNumberOrNull(values[key]);
              const r2 = asNumberOrNull(values[key.replace('_3', '_5')]);
              diff[key.replace('_3', '_7')] = r1 === null || r2 === null ? "" : (r2 - r1);
            } else {
              const r2 = asNumberOrNull(values[key]);
              const r1 = asNumberOrNull(values[key.replace('_3', '_5')]);
              diff[key.replace('_3', '_7')] = r2 === null || r1 === null ? "" : (r2 - r1);
            }
        }
    })
    return diff
}

export default  function ProcedureAssessment({patient, onSubmit, onBack}) {
    const [values, setValues] = useState({})
    const [submitted, setSubmitted] = useState(false)
    const [activeTab, setActiveTab] = useState('BSU')

    const storageKey = patient
    ? `procedure_assessment_draft_${patient.name}`
    : null;

    const computedValues = {
        ...values,
        ...diffTardieu(values),
        age: patient.age,
        bmi: patient.bmi,
        
    }

    useEffect(() => {
        if (!storageKey) return;
        const saved = localStorage.getItem(storageKey);
        if (saved) {
          const parsed = JSON.parse(saved);
          setValues(parsed.values || {});
        }
    }, [storageKey]);

    const onChange = (name, value) => {
    setValues(v => ({
            ...v,
            [name]: isNaN(value) ? value : Number(value)
        }));
    };

    const handleAction = (type) => {
        switch (type) {
        case "back":
            onBack?.();
            break;

        case "clear":
            setValues({});
            setSubmitted(false);
            localStorage.removeItem(storageKey);
            break;

        case "save":
            localStorage.setItem(
            storageKey,
            JSON.stringify({
                values,
                updatedAt: new Date().toISOString()
            })
            );
            alert("Functional assessment draft saved");
            break;

        case "print":
            window.print();
            break;

        default:
            break;
        }
    };

    const handleSubmit = () => {
        setSubmitted(true);
        onSubmit?.(values);
        alert("Procedure Assessment submitted");
    };

    return (
        <div style={mainContent}>
            <div style={tabBar}>
                {SubTab.map((tab) => (
                    <div 
                        style={activeTab === tab ? tabActive : tabBtn}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </div>
                ))}
            </div>
            <CommonFormBuilder
                schema={SCHEMA[activeTab]}
                values={computedValues}
                onChange={onChange}
                submitted={submitted}
                onAction={handleAction}
            >
                <div style={submitRow}>
                    <button style={submitBtn} onClick={handleSubmit}>
                        Submit Procedure Assessment
                    </button>
                </div>
            </CommonFormBuilder>
        </div>
    )
}



const mainContent = { margin: "0 auto" };

const tabBar = {
  display: "flex",
  gap: 10,
  justifyContent: "center",
  borderBottom: "1px solid #cccccc",
  marginBottom: 12
};

const tabBtn = {
  padding: "10px 22px",
border:"none !important",
  background: "#ffffff07",
  fontWeight: 600,
  color:"#0f172a",
  cursor: "pointer"
};

const tabActive = {
  ...tabBtn,
  borderBottom: "3px solid #2451b3ff",
  color: "#2451b3ff"
};

const submitRow = {
  display: "flex",
  justifyContent: "flex-end",
  marginTop: 20
};

const submitBtn = {
  padding: "12px 32px",
  background: "#2563EB",
  color: "#fff",
  border: "none",
  borderRadius: 10,
  fontSize: 15,
  fontWeight: 700
};
