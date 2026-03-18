import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

const STUMP_ASSESSMENT_SCHEMA = {
    title: "Stump Assessment",
    sections: [
        {
            fields: [
                {
                    name: "stump_shape",
                    label: "Stump Shape",
                    type: "radio",
                    labelAbove: "true",
                    options: [
                        { label: "Cylindrical", value: "cylindrical" },
                        { label: "Conical", value: "conical"},
                        { label: "Club-shaped", value: "club_shaped"},
                        { label: "Bulbous", value: "bulbous" },
                        { label: "Others", value: "others"}
                    ]
                },
                {
                    name: "specify",
                    label: "Specify",
                    type: "textarea",
                    showIf: {
                        field: "stump_shape",
                        equals: "others"
                    }
                },
                {
                    name: "length",
                    label: "Length",
                    type: "radio",
                    labelAbove: "true",
                    options: [
                        { label: "Short", value: "short" },
                        { label: "Medium", value: "medium"},
                        { label: "Long", value: "long"}
                    ]
                },
                {
                    name: "stump_scar",
                    label: "Scar of stump",
                    type: "radio",
                    options: [
                        { label: "Well healed", value: "well_healed" },
                        { label: "Unhealed", value: "unhealed" },
                    ]
                },
                {
                    name: "stump_skin",
                    label: "Skin of stump",
                    type: "radio",
                    options: [
                        { label: "Undamaged", value: "undamaged" },
                        { label: "Deep wrinkle", value: "deep_wrinkle"}
                    ]
                },
                {
                    name: "stump_solidity",
                    label: "Solidity of stump",
                    type: "radio",
                    options: [
                        { label: "Soft", value: "soft" },
                        { label: "Edematous", value: "edematous" },
                        { label: "Firm", value: "firm"}
                    ]
                },
                {
                    name: "stump_end",
                    label: "End of stump",
                    type: "radio",
                    options: [
                        { label: "Rounded", value: "rounded" },
                        { label: "Bony prominent", value: "bony_prominent" }
                    ]
                },
                {
                    name: "pain_tolerance",
                    label: "Sensitivity/Pain tolerance",
                    type: "radio",
                    options: [
                        { label: "Normal", value: "normal" },
                        { label: "Hypersensitive", value: "hypersensitive" }
                    ]
                },
                {
                    name: "sensation",
                    label: "Sensation",
                    type: "radio",
                    options: [
                        { label: "Intact", value: "intact" },
                        { label: "Impaired", value: "impaired" }
                    ]
                }
            ]
        }
    ]
}

export default function StumpAssessmentForm({values, onChange}) {
    return (
        <CommonFormBuilder
            schema={STUMP_ASSESSMENT_SCHEMA}
            values={values}
            onChange={onChange}
            layout="nested"
        />
    )
}