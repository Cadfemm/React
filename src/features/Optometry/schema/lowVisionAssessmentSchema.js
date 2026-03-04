const YES_NO = [
  { label: "Yes", value: "1" },
  { label: "No", value: "0" }
];

const LOW_VISION_ASSESSMENT_SCHEMA = {
    title: "Low Vision Rehabilitation",
    sections: [{
        fields: [
            { name: "case_background_sections", label: "Case Background", type: "textarea"},
            { type: "subheading", label: "Current LVD/s" },
            {
                type: "grid-header",
                cols: ["RE", "LE", "Comments"],
                showIf: {
                    field: "case_background_sections",
                }
            },  
            {
                type: "grid-header",
                cols: ["", "", ""],
                rows: ["Distance", "Near"]
            },

            {
                type: "grid-row",
                name: "refraction_optionn",
                label: "Current LVD/s",
                cols: [{type:"single-select", options: YES_NO}, {type:"single-select", options: YES_NO}, "input"]
            },

            {
                type: "grid-row",
                name: "refraction_distance",
                label: "Distance",
                cols: ["input", "input", "input"]
            },
            {
                type: "grid-row",
                name: "refraction_near",
                label: "Near",
                cols: ["input", "input", "input"]
            },

            { type: "subheading", label: "Visual Acuity" },
            {
                type: "grid-header",
                cols: ["", ""],
                rows: ["Distance", "Near"]
            },
            {
                type: "grid-row",
                name: "refraction_distance",
                label: "Distance",
                cols: ["input", "input", "input"]
            },
            {
                type: "grid-row",
                name: "refraction_near",
                label: "Near",
                cols: ["input", "input", "input"]
            },
        
            {
                type: "grid-row",
                name: "visual_field_assessment",
                label: "Visual Field Assessment",
                cols: [{ type: "file-upload-modal"}, { type: "file-upload-modal"}, "input"],
                showIf: {
                    field: "case_background_sections",
                }
            },
            {
                type: "grid-row",
                name: "contrast_sensitivity",
                label: "Contrast Sensitivity",
                cols: ["RE", "LE", "input"],
                showIf: {
                    field: "case_background_sections",
                }
            },
            

            { type: "subheading", label: "Refraction" },
            {
                type: "grid-header",
                cols: ["", ""],
                rows: ["Distance", "Near"]
            },
            {
                type: "grid-row",
                name: "refraction_distance",
                label: "Distance",
                cols: ["input", "input", "input"]
            },
            {
                type: "grid-row",
                name: "refraction_near",
                label: "Near",
                cols: ["input", "input", "input"]
            },
            {
                type: "grid-row",
                name: "magnification_needed",
                label: "Magnification Needed",
                cols: ["RE", "LE", "input"],
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
                cols: ["Description", "D/N", "R/L", "VA", "Comments"],
                showIf: {
                    field: "case_background_sections",
                }
            },   

            {
                type: "grid-row",
                name: "optical",
                label: "Optical",
                cols: ["Description", "D/N", "R/L", "VA", "Comments"],
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