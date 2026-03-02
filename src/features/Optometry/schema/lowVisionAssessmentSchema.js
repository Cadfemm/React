const YES_NO = [
  { label: "Yes", value: "1" },
  { label: "No", value: "0" }
];

const LOW_VISION_ASSESSMENT_SCHEMA = {
    title: "Low Vision",
    sections: [{
        fields: [
            { name: "case_background_sections", label: "Case Background", type: "textarea"},
            {
                name: "low_vision_rehabilitation",
                type: "subheading",
                label: "Low Vision Rehabilitation",
                showIf: {
                    field: "case_background_sections"
                }
            },
            {
                name: "low_vision",
                type: "refraction-table",
                columns: [
                    "Yes/No",
                    "Distance",
                    "Near",
                ],
                rows: [
                    { label: "Current LVD/s", value: "current_lvd"},
                    { label: "Visual Acuity", value: "visual_actuity"},
                    { label: "Refraction", value: "refraction"}
                ]
            },
            {
                type: "grid-header",
                cols: ["RE", "LE"],
                showIf: {
                    field: "case_background_sections",
                }
            },          
            {
                type: "grid-row",
                name: "visual_field_assessment",
                label: "Visual Field Assessment",
                cols: [{ type: "file-upload-modal"}, { type: "file-upload-modal"}],
                showIf: {
                    field: "case_background_sections",
                }
            },
            {
                type: "grid-row",
                name: "contrast_sensitivity",
                label: "Contrast Sensitivity",
                cols: ["RE", "LE"],
                showIf: {
                    field: "case_background_sections",
                }
            },
            {
                type: "grid-row",
                name: "magnification_needed",
                label: "Magnification Needed",
                cols: ["RE", "LE"],
                showIf: {
                    field: "case_background_sections",
                }
            },

            {
                type: "grid-row",
                name: "comments",
                label: "Comments",
                cols: ["RE", "LE"],
                showIf: {
                    field: "case_background_sections",
                }
            },

            {
                type: "subheading",
                name: "low_vision_aid_trial",
                label: "Low Vision Aid Trial",
                showIf: {
                    fields: "case_background_sections"
                }
            },

            {
                type: "grid-header",
                cols: ["No", "Description", "D/N", "VA", "Comments"],
                showIf: {
                    field: "case_background_sections",
                }
            },   

            {
                type: "grid-row",
                name: "optical",
                label: "Optical",
                cols: ["No", "Description", "D/N", "VA", "Comments"],
                showIf: {
                    field: "case_background_sections",
                }
            },

            {
                type: "grid-row",
                name: "non_optical",
                label: "Non Optical",
                cols: ["No", "Description", "D/N", "VA", "Comments"],
                showIf: {
                    field: "case_background_sections",
                }
            },

            { name: "impressions_management_plan", label: "Impression, Management & Plan", type: "textarea"},
            { name: "remarks", label: "Remarks", type: "textarea"},
            { name: "low_vision_prescription", label: "Low Vision Prescription", type: "textarea"},
            { 
                name: "low_vision_followup", 
                label: "Low Vision Follow up",
                type: "radio",
                options: YES_NO
            },
            {
                name: "low_vision_referral",
                label: "Low Vision Referral",
                type: "radio",
                options: YES_NO
            },
        ]
    }]
}

export {
    LOW_VISION_ASSESSMENT_SCHEMA
}