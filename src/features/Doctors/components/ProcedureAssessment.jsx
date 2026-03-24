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
                        { label: "Motor Stroke", value: "motor_stoke"},
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
                    name: "directional_electrode",
                    label: "Directional Electrode",
                    type: "textarea"
                },
                {
                    name: "protocol_settings",
                    label: "Protocol Settings",
                    type: "textarea"
                },
                {
                    name: "other_protocol",
                    label: "Other Protocol",
                    type: "textarea"
                },
                {
                    name: "complication",
                    label: "Complication",
                    type: "textarea"
                },
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
                    name: "diagnosis",
                    label: "Diagnosis",
                    type: "input"
                },
                {
                    name: "indication",
                    label: "Indication",
                    type: "single-select",
                    options: [
                        { label: "Induce Aneurysm", value: "induce_aneurysm"},
                        { label: "Cronotropic factor", value: "cronotropic_factor"},
                        { label: "Ischemic Changes", value: "ischemic_changes"},
                        { label: "CAD Screening", value: "cad_screening"},
                        { label: "Treatment Progression", value: "treatment_progression"}
                    ]
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
                    name: "emr_technical",
                    label: "EMR Technical Report by",
                    type: "radio",
                    options: [
                        { label: "Medical Assistant", value: "medical_assistant"},
                        { label: "Cardiovascular Technologyst", value: "cardiovascular_technologyst"},
                        { label: "Medical Officer", value: "medical_officer"},
                        { label: "Specialist", value: "specialist"}
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
                    name: "graf",
                    label: "GRAF",
                    type: "radio",
                    options: [
                        { label: "Running GRAF Report", value: "running_graf_report"},
                        { label: "Technical Report", value: "technical_report"},
                    ]
                },
                {
                    name: "remarks",
                    label: "Remarks",
                    type: "textarea"
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
                        { label: "Tardieu Scale R1", columns: [{ key: "Right" }, { key: "Left" }] },
                        { label: "Tardieu Scale R2", columns: [{ key: "Right" }, { key: "Left" }] },
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
                        { label: "Tardieu Scale R1", columns: [{ key: "Right" }, { key: "Left" }] },
                        { label: "Tardieu Scale R2", columns: [{ key: "Right" }, { key: "Left" }] },
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
                        { label: "Tardieu Scale R1", columns: [{ key: "Right" }, { key: "Left" }] },
                        { label: "Tardieu Scale R2", columns: [{ key: "Right" }, { key: "Left" }] },
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
                    name: "ankle_region",
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
                    name: "post_procedure_complication",
                    label: "Post Procedure Complication (if any)",
                    type: "textarea"
                }
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
                    name: "post_procedure",
                    label: "Post Procedure Complication",
                    type: "textarea"
                }
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

            ]
        }
    ]
}

const TDCS_SCHEMA = {
    title: "",
    actions: ACTIONS,
    sections: [
        {
            title: "Repetitive Transcranial Magnetic Stimulation(rTMS)",
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
                    name: "stimulation_site",
                    label: "Stimulation Site",
                    type: "single-select",
                    options: [
                        { label: "Right", value: "right"},
                        { label: "Left", value: "left"}
                    ]
                },
                {
                    name: "stimulation_site_select",
                    type: "single-select",
                    options: [
                        { label: "M1", value: "m1"},
                        { label: "DLPFC", value: "dlpfc"},
                        { label: "BROCA", value: "broca"},
                        { label: "Others", value: "others"}
                    ],
                    showIf: {
                        field: "stimulation_site",
                        oneOf: ["right", "left"]
                    }
                },
                {
                    name: "specify",
                    label: "Specify",
                    type: "textarea",
                    showIf: {
                        field: "stimulation_site_select",
                        equals: "others"
                    }
                },
                {
                    name: "frequency",
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
                    name: "specify",
                    label: "Specify",
                    type: "textarea",
                    showIf: {
                        field: "frequency",
                        equals: "others"
                    }
                },
                {
                    name: "intensity",
                    label: "Intensity (MEP)",
                    type: "textarea"
                },
                {
                    name: "complication",
                    label: "Complication",
                    type: "textarea"
                },
            ]
        },
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
                    name: "protocol",
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
                    type: "textarea"
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
                    label: "Valleix Point Injected / Area Injected",
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
                    name: "complication",
                    label: "Complication",
                    type: "multi-select-dropdown",
                    options: [
                        { label: "Bleeding", value: "bleeding" },
                        { label: "Swollen", value: "swollen" },
                        { label: "Bruises", value: "bruises" },
                        { label: "Allergic Skin Reaction", value: "allergic_skin_reaction" },
                        { label: "Others", value: "others"}
                    ]
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
                }
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
    TDCS: TDCS_SCHEMA,
    FEES: FEES_SCHEMA,
    Musculoskeletal: MUSCU_SCHEMA
}

const diffTardieu = (values) => {
    var diff = {}
    if (!values) return null
    Object.entries(values).map(([key, item]) => {
        if (key.endsWith('_0') || key.endsWith("_1")) {
            return null
        } else if (key.endsWith('_2')) {
            diff[key.replace('_2', '_6')] = values[key.replace('_2', '_4')] - values[key]
        } else if (key.endsWith('_3')) {
            diff[key.replace('_3', '_7')] = values[key.replace('_3', '_5')] - values[key]
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
