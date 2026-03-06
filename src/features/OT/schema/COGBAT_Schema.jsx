const COGBAT_SCHEMA = {
    title: "Basic Cognitive Testing (COGBAT)",
    sections: [
        {
            title: "Attention",
            fields: [
                { 
                    type: "radio",
                    name: "alertness_visual",
                    label: "Alertness, Visual",
                    options: ["Below average", "Average", "Above average"]
                },
                {
                    label: "",
                    type: "textarea",
                    name: "alertness_visual_notes",
                    showIf: {
                        field: "alertness_visual",
                        oneOf: ["Below average", "Average", "Above average"]
                    }
                },
                {
                    type: "radio",
                    name: "divided_attention",
                    label: "Divided attention",
                    options: ["Below average", "Average", "Above average"]
                },
                {
                    label: "",
                    type: "textarea",
                    name: "divided_attention_notes",
                    showIf: {
                        field: "divided_attention",
                        oneOf: ["Below average", "Average", "Above average"]
                    }
                }
            ]
        },
        {
            title: "Memory",
            fields: [
                {
                    type: "radio",
                    name: "working_memory",
                    label: "Working memory, Verbal",
                    options: ["Below average", "Average", "Above average"]
                },
                {
                    label: "",
                    type: "textarea",
                    name: "working_memory_notes",
                    showIf: {
                        field: "working_memory",
                        oneOf: ["Below average", "Average", "Above average"]
                    }
                },
                {
                    type: "radio",
                    name: "figural_learning_ability",
                    label: "Long-term memory, Figural - Learning ability",
                    options: ["Below average", "Average", "Above average"]
                },
                {
                    label: "",
                    type: "textarea",
                    name: "figural_learning_ability_notes",
                    showIf: {
                        field: "figural_learning_ability",
                        oneOf: ["Below average", "Average", "Above average"]
                    }
                },
                {
                    type: "radio",
                    name: "figural_short_term",
                    label: "Long-term memory, Figural - Short term",
                    options: ["Below average", "Average", "Above average"]
                },
                {
                    label: "",
                    type: "textarea",
                    name: "figural_short_term_notes",
                    showIf: {
                        field: "figural_short_term",
                        oneOf: ["Below average", "Average", "Above average"]
                    }
                },
                {
                    type: "radio",
                    name: "figural_long_term",
                    label:"Long-term memory, Figural - Long term",
                    options: ["Below average", "Average", "Above average"]
                },
                {
                    label: "",
                    type: "textarea",
                    name: "figural_long_term_notes",
                    showIf: {
                        field: "figural_long_term",
                        oneOf: ["Below average", "Average", "Above average"]
                    }
                },
                {
                    type: "radio",
                    name: "figural_recognition",
                    label: "Long-term memory, Figural - Recognition",
                    options: ["Below average", "Average", "Above average"]
                },
                {
                    label: "",
                    type: "textarea",
                    name: "figural_recognition_notes",
                    showIf: {
                        field: "figural_recognition",
                        oneOf: ["Below average", "Average", "Above average"]
                    }
                },
            ]
        },
        {
            title: "Executive Functions",
            fields: [
                {
                    type: "radio",
                    name: "cognitive_flexibility",
                    label: "Cognitive flexibility",
                    options: ["Below average", "Average", "Above average"]
                },
                {
                    label: "",
                    type: "textarea",
                    name: "cognitive_flexibility_notes",
                    showIf: {
                        field: "cognitive_flexibility",
                        oneOf: ["Below average", "Average", "Above average"]
                    }
                },
                {
                    type: "radio",
                    name: "planing_ability",
                    label: "Planing ability, Visual-spatial",
                    options: ["Below average", "Average", "Above average"]
                },
                {
                    label: "",
                    type: "textarea",
                    name: "planing_ability_notes",
                    showIf: {
                        field: "planing_ability",
                        oneOf: ["Below average", "Average", "Above average"]
                    }
                },
                {
                    type: "radio",
                    name: "response_inhibition",
                    label: "Response inhibition",
                    options: ["Below average", "Average", "Above average"]
                },
                {
                    label: "",
                    type: "textarea",
                    name: "response_inhibition_notes",
                    showIf: {
                        field: "response_inhibition",
                        oneOf: ["Below average", "Average", "Above average"]
                    }
                },
            ]
        },
        {
            title: "Processing Speed",
            fields: [
                {
                    type: "radio",
                    name: "information_processing_speed",
                    label: "Information processing speed",
                    options: ["Below average", "Average", "Above average"]
                },
                {
                    label: "",
                    type: "textarea",
                    name: "information_processing_speed_notes",
                    showIf: {
                        field: "information_processing_speed",
                        oneOf: ["Below average", "Average", "Above average"]
                    }
                },
            ]
        },
        {
            title: "Neglect",
            fields: [
                {
                    type: "radio",
                    name: "unilateral_left",
                    label: "Neglect unilateral left",
                    options: ["Below average", "Average", "Above average"]
                },
                {
                    label: "",
                    type: "textarea",
                    name: "unilateral_left_notes",
                    showIf: {
                        field: "unilateral_left",
                        oneOf: ["Below average", "Average", "Above average"]
                    }
                },
                {
                    type: "radio",
                    name: "unilateral_right",
                    label: "Neglect unilateral right",
                    options: ["Below average", "Average", "Above average"]
                },
                {
                    label: "",
                    type: "textarea",
                    name: "unilateral_right_notes",
                    showIf: {
                        field: "unilateral_right",
                        oneOf: ["Below average", "Average", "Above average"]
                    }
                },
            ]
        },
        {
            title: "Mouse Use",
            fields: [
                {
                    type: "radio",
                    name: "mouse_use",
                    label: "Mouse use",
                    options: ["Below average", "Average", "Above average"]
                },
                {
                    label: "",
                    type: "textarea",
                    name: "mouse_use_notes",
                    showIf: {
                        field: "mouse_use",
                        oneOf: ["Below average", "Average", "Above average"]
                    }
                },
            ]
        },
        {
            title: "",
            fields: [
                {
                    type: "textarea",
                    name: "comments",
                    label: "Comments"
                },
                {
                    type: "file-upload-modal",
                    name: "additional_document",
                    label: "Additional Document"
                }
            ]
        }
        
    ]
}

export {
    COGBAT_SCHEMA
}