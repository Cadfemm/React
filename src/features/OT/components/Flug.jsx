import React, { useMemo } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

export default function UpperExtremityAssessment({
    values,
    onChange,
    submitted
}) {

    /* ===================== SCORE HELPERS ===================== */

    const sumPrefix = (prefix) =>
        Object.keys(values || {})
            .filter(k => k.startsWith(prefix))
            .map(k => Number(values[k]) || 0)
            .reduce((a, b) => a + b, 0);

    const scores = useMemo(() => {

        const upperExt = sumPrefix("ue_");
        const wrist = sumPrefix("wr_");
        const hand = sumPrefix("ha_");
        const coordination = sumPrefix("co_");
        const passive = sumPrefix("pm_");

        return {
            upperExt,
            wrist,
            hand,
            coordination,
            passive,
            total:
                upperExt +
                wrist +
                hand +
                coordination +
                passive
        };

    }, [values]);

    /* ===================== SCHEMA ===================== */

    const schema = {
        title: "Upper Extremity Assessment",
        sections: [
            {
                title: "I. Reflex Activity",
                fields: [

                    {
                        type: "grid-header",
                        cols: ["None (0)", "Can be Elicited (2)"]
                    },

                    {
                        type: "radio-matrix",
                        name: "ue_reflex_flexors",
                        label: "Flexors: Biceps & Finger Flexors (at least one)",
                        options: [
                            { value: 0 },
                            { value: 2 }
                        ]
                    },

                    {
                        type: "radio-matrix",
                        name: "ue_reflex_extensors",
                        label: "Extensors: Triceps",
                        options: [
                            { value: 0 },
                            { value: 2 }
                        ]
                    },

                    {
                        type: "score-box",
                        name: "subtotal_I",
                        label: "Subtotal I (max 4)",
                        readOnly: true
                    }

                ]
            },


            {
                title: "II. Volitional Movement Within Synergies (Without Gravitational Help)",
                fields: [

                    {
                        type: "grid-header",
                        cols: ["None (0)", "Partial (1)", "Full (2)"]
                    },

                    /* FLEXOR SYNERGY */

                    {
                        type: "subheading",
                        label: "Flexor Synergy"
                    },

                    {
                        type: "radio-matrix",
                        name: "ue_shoulder_retraction",
                        label: "Shoulder Retraction",
                        options: [{ value: 0 }, { value: 1 }, { value: 2 }]
                    },

                    {
                        type: "radio-matrix",
                        name: "ue_shoulder_elevation",
                        label: "Shoulder Elevation",
                        options: [{ value: 0 }, { value: 1 }, { value: 2 }]
                    },

                    {
                        type: "radio-matrix",
                        name: "ue_shoulder_abduction_90",
                        label: "Shoulder Abduction (90°)",
                        options: [{ value: 0 }, { value: 1 }, { value: 2 }]
                    },

                    {
                        type: "radio-matrix",
                        name: "ue_shoulder_external_rotation",
                        label: "Shoulder External Rotation",
                        options: [{ value: 0 }, { value: 1 }, { value: 2 }]
                    },

                    {
                        type: "radio-matrix",
                        name: "ue_elbow_flexion",
                        label: "Elbow Flexion",
                        options: [{ value: 0 }, { value: 1 }, { value: 2 }]
                    },

                    {
                        type: "radio-matrix",
                        name: "ue_forearm_supination",
                        label: "Forearm Supination",
                        options: [{ value: 0 }, { value: 1 }, { value: 2 }]
                    },

                    /* EXTENSOR SYNERGY */

                    {
                        type: "subheading",
                        label: "Extensor Synergy"
                    },

                    {
                        type: "radio-matrix",
                        name: "ue_shoulder_adduction_internal_rotation",
                        label: "Shoulder Adduction / Internal Rotation",
                        options: [{ value: 0 }, { value: 1 }, { value: 2 }]
                    },

                    {
                        type: "radio-matrix",
                        name: "ue_elbow_extension",
                        label: "Elbow Extension",
                        options: [{ value: 0 }, { value: 1 }, { value: 2 }]
                    },

                    {
                        type: "radio-matrix",
                        name: "ue_forearm_pronation",
                        label: "Forearm Pronation",
                        options: [{ value: 0 }, { value: 1 }, { value: 2 }]
                    },

                    {
                        type: "score-box",
                        name: "subtotal_II",
                        label: "Subtotal II (max 18)",
                        readOnly: true
                    }

                ]
            },
            {
                title: "III. Volitional Movement Mixing Synergies (Without Compensation)",
                fields: [

                    { type: "grid-header", cols: ["None (0)", "Partial (1)", "Full (2)"] },

                    {
                        type: "radio-matrix",
                        name: "ue_hand_lumbar",
                        label: "Hand to Lumbar Spine",
                        options: [{ value: 0 }, { value: 1 }, { value: 2 }]
                    },

                    {
                        type: "radio-matrix",
                        name: "ue_shoulder_0_90",
                        label: "Shoulder Flexion 0°–90°",
                        options: [{ value: 0 }, { value: 1 }, { value: 2 }]
                    },

                    {
                        type: "radio-matrix",
                        name: "ue_pronation_supination_mix",
                        label: "Pronation–Supination (Elbow 90°)",
                        options: [{ value: 0 }, { value: 1 }, { value: 2 }]
                    },

                    {
                        type: "score-box",
                        name: "subtotal_III",
                        label: "Subtotal III (max 6)",
                        readOnly: true
                    }

                ]
            },

            {
                title: "IV. Volitional Movement With Little or No Synergy",
                fields: [

                    { type: "grid-header", cols: ["None (0)", "Partial (1)", "Full (2)"] },

                    {
                        type: "radio-matrix",
                        name: "ue_shoulder_abduction_0_90",
                        label: "Shoulder Abduction 0°–90°",
                        options: [{ value: 0 }, { value: 1 }, { value: 2 }]
                    },

                    {
                        type: "radio-matrix",
                        name: "ue_shoulder_flexion_90_180",
                        label: "Shoulder Flexion 90°–180°",
                        options: [{ value: 0 }, { value: 1 }, { value: 2 }]
                    },

                    {
                        type: "radio-matrix",
                        name: "ue_pronation_supination_advanced",
                        label: "Pronation–Supination (Shoulder 30° Flexion)",
                        options: [{ value: 0 }, { value: 1 }, { value: 2 }]
                    },

                    {
                        type: "score-box",
                        name: "subtotal_IV",
                        label: "Subtotal IV (max 6)",
                        readOnly: true
                    }

                ]
            },

            {
                title: "V. Normal Reflex Activity (Only if Part IV = 6)",
                fields: [

                    { type: "grid-header", cols: ["Hyper (0)", "Lively (1)", "Normal (2)"] },

                    {
                        type: "radio-matrix",
                        name: "ue_normal_reflex",
                        label: "Biceps, Triceps, Finger Flexors",
                        options: [{ value: 0 }, { value: 1 }, { value: 2 }]
                    },

                    {
                        type: "score-box",
                        name: "subtotal_V",
                        label: "Subtotal V (max 2)",
                        readOnly: true
                    }

                ]
            },

            {
                title: "B. Wrist",
                fields: [

                    { type: "grid-header", cols: ["None (0)", "Partial (1)", "Full (2)"] },

                    {
                        type: "radio-matrix",
                        name: "wr_stability_15",
                        label: "Stability at 15° Dorsiflexion",
                        options: [{ value: 0 }, { value: 1 }, { value: 2 }]
                    },

                    {
                        type: "radio-matrix",
                        name: "wr_repeated_15",
                        label: "Repeated Dorsiflexion / Volar Flexion",
                        options: [{ value: 0 }, { value: 1 }, { value: 2 }]
                    },

                    {
                        type: "radio-matrix",
                        name: "wr_stability_15_elbow_flexed",
                        label: "Stability at 15° (Elbow 90°)",
                        options: [{ value: 0 }, { value: 1 }, { value: 2 }]
                    },

                    {
                        type: "radio-matrix",
                        name: "wr_repeated_15_elbow_flexed",
                        label: "Repeated Dorsiflexion (Elbow 90°)",
                        options: [{ value: 0 }, { value: 1 }, { value: 2 }]
                    },

                    {
                        type: "radio-matrix",
                        name: "wr_circumduction",
                        label: "Circumduction",
                        options: [{ value: 0 }, { value: 1 }, { value: 2 }]
                    },

                    {
                        type: "score-box",
                        name: "total_B",
                        label: "Total B (max 10)",
                        readOnly: true
                    }

                ]
            },


            {
                title: "C. Hand",
                fields: [

                    { type: "grid-header", cols: ["None (0)", "Partial (1)", "Full (2)"] },

                    {
                        type: "radio-matrix",
                        name: "ha_mass_flexion",
                        label: "Mass Flexion",
                        options: [{ value: 0 }, { value: 1 }, { value: 2 }]
                    },

                    {
                        type: "radio-matrix",
                        name: "ha_mass_extension",
                        label: "Mass Extension",
                        options: [{ value: 0 }, { value: 1 }, { value: 2 }]
                    },

                    { type: "subheading", label: "GRASP" },

                    {
                        type: "radio-matrix",
                        name: "ha_hook",
                        label: "Hook Grasp",
                        options: [{ value: 0 }, { value: 1 }, { value: 2 }]
                    },

                    {
                        type: "radio-matrix",
                        name: "ha_thumb_adduction",
                        label: "Thumb Adduction",
                        options: [{ value: 0 }, { value: 1 }, { value: 2 }]
                    },

                    {
                        type: "radio-matrix",
                        name: "ha_pincer",
                        label: "Pincer Grasp",
                        options: [{ value: 0 }, { value: 1 }, { value: 2 }]
                    },

                    {
                        type: "radio-matrix",
                        name: "ha_cylinder",
                        label: "Cylinder Grasp",
                        options: [{ value: 0 }, { value: 1 }, { value: 2 }]
                    },

                    {
                        type: "radio-matrix",
                        name: "ha_spherical",
                        label: "Spherical Grasp",
                        options: [{ value: 0 }, { value: 1 }, { value: 2 }]
                    },

                    {
                        type: "score-box",
                        name: "total_C",
                        label: "Total C (max 14)",
                        readOnly: true
                    }

                ]
            },
            {
                title: "D. Coordination / Speed",
                fields: [

                    { type: "grid-header", cols: ["Marked (0)", "Slight (1)", "None (2)"] },

                    {
                        type: "radio-matrix",
                        name: "co_tremor",
                        label: "Tremor",
                        options: [{ value: 0 }, { value: 1 }, { value: 2 }]
                    },

                    {
                        type: "radio-matrix",
                        name: "co_dysmetria",
                        label: "Dysmetria",
                        options: [{ value: 0 }, { value: 1 }, { value: 2 }]
                    },

                    { type: "subheading", label: "Time (Finger-to-Nose 5 times)" },

                    {
                        type: "grid-header",
                        cols: ["≥ 6 sec (0)", "2–5 sec (1)", "< 2 sec (2)"]
                    },

                    {
                        type: "radio-matrix",
                        name: "co_time",
                        label: "Time Difference Compared to Unaffected Side",
                        options: [{ value: 0 }, { value: 1 }, { value: 2 }]
                    },

                    {
                        type: "score-box",
                        name: "total_D",
                        label: "Total D (max 6)",
                        readOnly: true
                    }

                ]
            },
            {
                title: "H. Sensation (Upper Extremity)",
                fields: [

                    { type: "grid-header", cols: ["Anesthesia (0)", "Hypo/Dysesthesia (1)", "Normal (2)"] },

                    {
                        type: "radio-matrix",
                        name: "se_light_touch_arm",
                        label: "Light Touch – Upper Arm / Forearm",
                        options: [{ value: 0 }, { value: 1 }, { value: 2 }]
                    },

                    {
                        type: "radio-matrix",
                        name: "se_light_touch_hand",
                        label: "Light Touch – Palmar Surface of Hand",
                        options: [{ value: 0 }, { value: 1 }, { value: 2 }]
                    },

                    { type: "subheading", label: "Position Sense" },

                    { type: "grid-header", cols: ["< 3/4 Correct (0)", "3/4 Correct (1)", "Correct 100% (2)"] },

                    {
                        type: "radio-matrix",
                        name: "se_position_shoulder",
                        label: "Shoulder",
                        options: [{ value: 0 }, { value: 1 }, { value: 2 }]
                    },

                    {
                        type: "radio-matrix",
                        name: "se_position_elbow",
                        label: "Elbow",
                        options: [{ value: 0 }, { value: 1 }, { value: 2 }]
                    },

                    {
                        type: "radio-matrix",
                        name: "se_position_wrist",
                        label: "Wrist",
                        options: [{ value: 0 }, { value: 1 }, { value: 2 }]
                    },

                    {
                        type: "radio-matrix",
                        name: "se_position_thumb",
                        label: "Thumb (IP Joint)",
                        options: [{ value: 0 }, { value: 1 }, { value: 2 }]
                    },

                    {
                        type: "score-box",
                        name: "total_H",
                        label: "Total H (max 12)",
                        readOnly: true
                    }

                ]
            },
            {
                title: "I. Passive Joint Motion (Upper Extremity)",
                fields: [

                    { type: "grid-header", cols: ["Only Few Degrees (0)", "Decreased (1)", "Normal (2)"] },

                    { type: "subheading", label: "Shoulder" },

                    { type: "radio-matrix", name: "pm_sh_flexion", label: "Flexion (0°–180°)", options: [{ value: 0 }, { value: 1 }, { value: 2 }] },
                    { type: "radio-matrix", name: "pm_sh_abduction", label: "Abduction (0°–90°)", options: [{ value: 0 }, { value: 1 }, { value: 2 }] },
                    { type: "radio-matrix", name: "pm_sh_external", label: "External Rotation", options: [{ value: 0 }, { value: 1 }, { value: 2 }] },
                    { type: "radio-matrix", name: "pm_sh_internal", label: "Internal Rotation", options: [{ value: 0 }, { value: 1 }, { value: 2 }] },

                    { type: "subheading", label: "Elbow" },

                    { type: "radio-matrix", name: "pm_el_flexion", label: "Flexion", options: [{ value: 0 }, { value: 1 }, { value: 2 }] },
                    { type: "radio-matrix", name: "pm_el_extension", label: "Extension", options: [{ value: 0 }, { value: 1 }, { value: 2 }] },

                    { type: "subheading", label: "Forearm" },

                    { type: "radio-matrix", name: "pm_fa_pronation", label: "Pronation", options: [{ value: 0 }, { value: 1 }, { value: 2 }] },
                    { type: "radio-matrix", name: "pm_fa_supination", label: "Supination", options: [{ value: 0 }, { value: 1 }, { value: 2 }] },

                    { type: "subheading", label: "Wrist" },

                    { type: "radio-matrix", name: "pm_wr_flexion", label: "Flexion", options: [{ value: 0 }, { value: 1 }, { value: 2 }] },
                    { type: "radio-matrix", name: "pm_wr_extension", label: "Extension", options: [{ value: 0 }, { value: 1 }, { value: 2 }] },

                    { type: "subheading", label: "Fingers" },

                    { type: "radio-matrix", name: "pm_fg_flexion", label: "Flexion", options: [{ value: 0 }, { value: 1 }, { value: 2 }] },
                    { type: "radio-matrix", name: "pm_fg_extension", label: "Extension", options: [{ value: 0 }, { value: 1 }, { value: 2 }] },

                    {
                        type: "score-box",
                        name: "total_I",
                        label: "Total I (max 24)",
                        readOnly: true
                    }

                ]
            }
        ]
    };

    return (
        <CommonFormBuilder
            schema={schema}
            values={values}
            onChange={onChange}
            submitted={submitted}
             layout="nested" 
        />
    );
}
