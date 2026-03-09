const COTNAB_Schema = {
    title: "Chessington Occupational Therapy Neurological Assessment Battery (COTNAB)",
    sections: [
        {
            title: "",
            fields: [
                {
                    type: "checkbox-table-form",
                    columns: [
                        { name: "ABILITY", rowSpan: 3},
                        { 
                            name: "VISUAL PERCEPTION", 
                            groups: [
                                { title: "1", options: ["visual_perception_ability_1"]},
                                { title: "2", options: ["visual_perception_ability_2"]},
                                { title: "3", options: ["visual_perception_ability_3"]}
                            ] 
                        },
                        { 
                            name: "CONSTRUCTIONAL ABILITY",
                            groups: [
                                { title: "1", options: ["constructional_ability_1"]},
                                { title: "2", options: ["constructional_ability_2"]},
                                { title: "3", options: ["constructional_ability_3"]}
                            ]
                        },
                        { 
                            name: "SENSORY MOTOR",
                            groups: [
                                { title: "1", options: ["sensory_motor_ability_1d", "sensory_motor_ability_1nd"], labels: ["D", "N/D"]},
                                { title: "2", options: ["sensory_motor_ability_2d", "sensory_motor_ability_2nd", "sensory_motor_ability_2b"], labels: ["D", "N/D", "B"]},
                                { title: "3", options: ["sensory_motor_ability_3d", "sensory_motor_ability_3nd"], labels: ["D", "N/D"]}
                            ]
                        }, 
                        { 
                            name: "FOLLOWING INSTRUCTIONS",
                            groups: [
                                { title: "1", options: ["following_instructions_ability_1"]},
                                { title: "2", options: ["following_instructions_ability_2"]},
                                { title: "3", options: ["following_instructions_ability_3"]}
                            ]
                        }
                    ],
                    rows: [
                        "Within normal limits",
                        "Below average/ Borderline",
                        "Impaired",
                        "Unable/ Unwilling"
                    ]
                },
            ]
        },
        {
            title: "",
            fields : [
                {
                    type: "checkbox-table-form",
                    columns: [
                        { name: "TIME", rowSpan: 3},
                        { 
                            name: "VISUAL PERCEPTION", 
                            groups: [
                                { title: "1", options: ["visual_perception_time_1"]},
                                { title: "2", options: ["visual_perception_time_2"]},
                                { title: "3", options: ["visual_perception_time_3"]}
                            ] 
                        },
                        { 
                            name: "CONSTRUCTIONAL ABILITY",
                            groups: [
                                { title: "1", options: ["constructional_ability_time_1"]},
                                { title: "2", options: ["constructional_ability_time_2"]},
                                { title: "3", options: ["constructional_ability_time_3"]}
                            ]
                        },
                        { 
                            name: "SENSORY MOTOR",
                            groups: [
                                { title: "1", options: ["sensory_motor_time_1d", "sensory_motor_time_1nd"], labels: ["D", "N/D"]},
                                { title: "2", options: ["sensory_motor_time_2d", "sensory_motor_time_2nd", "sensory_motor_time_2b"], labels: ["D", "N/D", "B"]},
                                { title: "3", options: ["sensory_motor_time_3d", "sensory_motor_time_3nd"], labels: ["D", "N/D"]}
                            ]
                        }, 
                        { 
                            name: "FOLLOWING INSTRUCTIONS",
                            groups: [
                                { title: "1", options: ["following_instructions_time_1"]},
                                { title: "2", options: ["following_instructions_time_2"]},
                                { title: "3", options: ["following_instructions_time_3"]}
                            ]
                        }
                    ],
                    rows: [
                        "Superior",
                        "Above average",
                        "Within normal limits",
                        "Below average/ Borderline",
                        "Impaired",
                        "Unable/ Unwilling"
                    ]
                }
            ]
        },
        {
            title: "",
            fields : [
                {
                    type: "checkbox-table-form",
                    columns: [
                        { name: "OVERALL PERFORMANCE", rowSpan: 3},
                        { 
                            name: "VISUAL PERCEPTION", 
                            groups: [
                                { title: "1", options: ["visual_perception_performance_1"]},
                                { title: "2", options: ["visual_perception_performance_2"]},
                                { title: "3", options: ["visual_perception_performance_3"]}
                            ] 
                        },
                        { 
                            name: "CONSTRUCTIONAL ABILITY",
                            groups: [
                                { title: "1", options: ["constructional_ability_performance_1"]},
                                { title: "2", options: ["constructional_ability_performance_2"]},
                                { title: "3", options: ["constructional_ability_performance_3"]}
                            ]
                        },
                        { 
                            name: "SENSORY MOTOR",
                            groups: [
                                { title: "1", options: ["sensory_motor_performance_1d", "sensory_motor_performance_1nd"], labels: ["D", "N/D"]},
                                { title: "2", options: ["sensory_motor_performance_2d", "sensory_motor_performance_2nd", "sensory_motor_performance_2b"], labels: ["D", "N/D", "B"]},
                                { title: "3", options: ["sensory_motor_performance_3d", "sensory_motor_performance_3nd"], labels: ["D", "N/D"]}
                            ]
                        }, 
                        { 
                            name: "FOLLOWING INSTRUCTIONS",
                            groups: [
                                { title: "1", options: ["following_instructions_performance_1"]},
                                { title: "2", options: ["following_instructions_performance_2"]},
                                { title: "3", options: ["following_instructions_performance_3"]}
                            ]
                        }
                    ],
                    rows: [
                        "Within normal limits",
                        "Below average",
                        "Borderline",
                        "Impaired",
                        "Severely impaired",
                        "Unable/ Unwilling"
                    ]
                }
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

export  {
    COTNAB_Schema
}