const DCOG_Schema = {
    title: "Techare Digital Cognitive (DCOG)",
    sections: [
        {
            title: "Attention",
            fields: [
                {
                    name: "dcog_attention",
                    type: "checkbox-group",
                    options: [
                        { label: "Auditory attention sustained", value: "1"},
                        { label: "Auditory sequence", value: "2"},
                        { label: "Visual attention tracking", value: "3"},
                        { label: "Visual attention tracking (mental calculation)", value:"4"},
                        { label: "Visual differentiation", value: "5"}
                    ]
                }
            ]
        },
        {
            title: "Orientation",
            fields: [
                {
                    name: "dcog_orientation",
                    type: "checkbox-group",
                    options: [
                        { label: "Orientation to state", value: "1"},
                        { label: "Orientation to country", value: "2"},
                        { label: "Orientation to date", value: "3"},
                        { label: "Orientation to day", value: "4"},
                        { label: "Orientation to famous people", value: "5"},
                        { label: "Orientation to festival", value: "6"},
                        { label: "Orientation to place", value: "7"},
                        { label: "Orientation to time", value: "8"}
                    ]
                }
            ]
        },
        {
            title: "Memory",
            fields: [
                {
                    name: "dcog_memory",
                    type: "checkbox-group",
                    options: [
                        { label: "Memory delay recall", value: "1"},
                        { label: "Memory visual recall", values: "2"}
                    ]
                }
            ]
        },
        {
            title: "Perception",
            fields: [
                {
                    name: "dcog_perception",
                    type: "checkbox-group",
                    options: [
                        { label: "Perception 2D Overlapping", value: "1"}
                    ]
                }
            ]
        },
        {
            title: "Calculation",
            fields: [
                {
                    name: "dcog_calculation",
                    type: "checkbox-group",
                    options: [
                        { label: "Monetary Calculation", value: "1"}
                    ]
                }
            ]
        },
        {
            title: "Executive Function",
            fields: [
                {
                    name: "dcog_executive_function",
                    type: "checkbox-group",
                    options: [
                        { label: "Problem solving sequence", value: "1"}
                    ]
                }
            ]
        },
        {
            title: "Scoring",
            fields: [
                {
                    type: "score-box",
                    name: "total_dcog_score",
                    label: "Total DCOG Score"
                },
                {
                    type: "radio",
                    name: "level",
                    label: "Level",
                    options: ["Easy", "Medium", "Hard"]
                },
                {
                    type: "textarea",
                    name: "comments",
                    label: "Comments"
                },
                {
                    type: "file-upload-modal",
                    name: "additional_file",
                    label: "Additional Document"
                }
            ]
        }
        
    ]
}

export {
    DCOG_Schema
}