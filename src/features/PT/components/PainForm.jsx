import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

const PAIN_ASSESSMENT_SCHEMA = {
    title: "Pain Assessment",
    sections: [
        {
            fields: [
                {
                    name: "stump_pain",
                    label: "Stump Pain",
                    type: "radio",
                    options: [
                        { label: "None", value: "none" },
                        { label: "Localised Pain", value: "localised_pain"},
                        { label: "Significant diffuse", value: "significant_diffuse"}
                    ]
                },
                {
                    name: "stump_pain_score",
                    label: "Pain score",
                    type: "scale-slider",
                    min: 0,
                    max: 10,
                    showValue: true,
                    ranges: [
                        {
                            min: 0,
                            max: 1,
                            label: "Mild",
                            color: "#22c55e"
                        },
                        {
                            min: 1,
                            max: 5,
                            label: "Moderate",
                            color: "#facc15"
                        },
                        {
                            min: 5,
                            max: 10,
                            label: "Severe",
                            color: "#ef4444"
                        }
                    ]
                },
                {
                    name: "phantom_limb_sensation",
                    label: "Phantom Limb Sensation (PLS)",
                    type: "radio",
                    labelAbove: "true",
                    options: [
                        { label: "Yes", value: "yes" },
                        { label: "No", value: "no"}
                    ]
                },
                {
                    label: "Phantom Limb",
                    type: "subheading"
                },
                {
                    name: "pain",
                    label: "Pain (PLP)",
                    type: "checkbox-group",
                    options: [
                        { label: "Dull", value: "dull" },
                        { label: "Shooting", value: "shooting" },
                        { label: "Pressing", value: "pressing" },
                        { label: "Throbbing", value: "throbbing" },
                        { label: "Prickling", value: "prickling" },
                        { label: "Cramp-like", value: "cramp_like" },
                        { label: "Knifelike", value: "knifelike" },
                        { label: "Burning", value: "burning" },
                        { label: "Sawing", value: "sawing" },
                        { label: "Squeezing", value: "squeezing" },
                        { label: "Tingling", value: "tingling" }
                    ]
                },
                {
                    name: "phantom_limb_pain_score",
                    label: "Pain Score (NRS)",
                    type: "scale-slider",
                    min: 0,
                    max: 10,
                    showValue: true,
                    ranges: [
                        {
                            min: 0,
                            max: 1,
                            label: "Mild",
                            color: "#22c55e"
                        },
                        {
                            min: 1,
                            max: 5,
                            label: "Moderate",
                            color: "#facc15"
                        },
                        {
                            min: 5,
                            max: 10,
                            label: "Severe",
                            color: "#ef4444"
                        }
                    ]
                },
                {
                    name: "area",
                    label: "Area",
                    type: "textarea"
                },
                {
                    name: "frequency",
                    label: "Frequency",
                    type: "radio",
                    options: [
                        { label: "Occasional", value: "occasional" },
                        { label: "Intermittent", value: "intermittent" },
                        { label: "Frequent", value: "frequent" },
                        { label: "Constant", value: "constant" }
                    ]
                }
            ]
        }
    ]
}

export default function PainAssessmentForm({values, onChange}) {
    return (
        <CommonFormBuilder
            schema={PAIN_ASSESSMENT_SCHEMA}
            values={values}
            onChange={onChange}
            layout="nested"
        />
    )
}