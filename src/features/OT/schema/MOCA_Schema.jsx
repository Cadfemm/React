const MoCA_Schema = {
    title: "Montreal Cognitive Assessment (MoCA)",
    sections: [
        {
            title: "Visuospatial/Executive",
            fields: [
                {
                    type: "radio",
                    name: "executive_function",
                    label: "Executive Function",
                    options: [0, 1]
                },
                {
                    type: "radio",
                    name: "cube_copying",
                    label: "Cube Copying",
                    options: [0, 1]
                },
                {
                    type: "radio",
                    name: "clock_drawing",
                    label: "Clock Drawing",
                    options: [0, 1, 2, 3]
                }
            ]
        },
        {
            title: "Naming",
            fields: [
                {
                    type: "radio",
                    name: "naming",
                    label: "Naming",
                    options: [0, 1, 2, 3]
                }
            ]
        },
        {
            title: "Attention",
            fields: [
                {
                    type: "radio",
                    name: "number_repetition",
                    label: "Number Repetition",
                    options: [0, 1, 2]
                },
                {
                    type: "radio",
                    name: "vigilance",
                    label: "Vigilance",
                    options: [0, 1]
                },
                {
                    type: "radio",
                    name: "serial_7_calculation",
                    label: "Serial 7 Calculation",
                    options: [0, 1, 2, 3]
                }
            ]
        },
        {
            title: "Language",
            fields: [
                {
                    type: "radio",
                    name: "sentence_repetition",
                    label: "Sentence Repetition",
                    options: [0, 1, 2]
                },
                {
                    type: "radio",
                    name: "animal_naming",
                    label: "Animal Naming",
                    options: [0, 1]
                }
            ]
        },
        {
            title: "Abstraction",
            fields: [
                {
                    type: "radio",
                    name: "abstraction",
                    label: "Abstraction",
                    options: [0, 1, 2]
                }
            ]
        },
        {
            title: "Delayed Recall",
            fields: [
                {
                    type: "radio",
                    name: "delayed_recall",
                    label: "Delayed Recall",
                    options: [0, 1, 2, 3, 4, 5]
                },
                {
                    min: 0,
                    max: 15,
                    type: "input-number-range",
                    name: "mis_score",
                    label: "MIS Score"
                }
            ]
        },
        {
            title: "Orientation",
            fields: [
                {
                    type: "radio",
                    name: "orientation",
                    label: "Orientation",
                    options: [0, 1, 2, 3, 4, 5, 6]
                }
            ]
        },
        {
            title: "",
            fields: [
                {
                    type: "score-box",
                    name: "total_moca_score",
                    label: "Total MoCA Score"
                },
                {
                    type: "radio",
                    name: "classification_score",
                    label: "Classification of Score",
                    options: ["Normal", "Mild", "Moderate", "Severe"]
                },
                {
                    type: "textarea",
                    name: "comments",
                    label: "Comments"
                },
                {
                    type: "file-upload-modal",
                    name: "additional-documents",
                    label: "Additional Appendixes / Documents"
                }
            ]
        },
    ]
}

export {
    MoCA_Schema
}