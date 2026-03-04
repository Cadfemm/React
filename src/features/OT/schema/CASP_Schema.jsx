const CASP_SCHEMA = {
    title: "Cognitive Assessment for Stroke Patients (CASP)",
    sections: [
        {
            title: "Education Level",
            fields: [
                {
                    type: "radio",
                    name: "education_level_naming",
                    label: "Naming",
                    options: [0, 1, 2, 3]
                },
                {
                    type: "radio",
                    name: "comprehension",
                    label: "Comprehension",
                    options: [0, 1, 2, 3]
                },
                {
                    type: "radio",
                    name: "reproducing_copy_cube",
                    label: "Reproducing a Copy of a Cube",
                    options: [0, 1, 2, 3, 4]
                },
                {
                    type: "radio",
                    name: "graphic_series",
                    label: "Graphic Series",
                    options: [0, 1, 2]
                },
                {
                    type: "radio",
                    name: "inhibition_flexibility",
                    label: "Inhibition/Flexibility",
                    options: [0, 1, 2, 3, 4]
                },
                {
                    type: "radio",
                    name: "bisection_horizontal_line",
                    label: "Bisection of a Horizontal Line",
                    options: [0, 1, 2]
                },
                {
                    type: "row",
                    fields: [
                        { name: "image_recall", label: "Image Recall", type: "scale-slider", min: 0, max: 6}
                    ]
                },
                {
                    type: "row",
                    fields: [
                        { name: "calendar", label: "Calendar", type: "scale-slider", min: 0, max: 6}
                    ]
                },
                {
                    type: "row",
                    fields: [
                        { name: "praxis", label: "Praxis", type: "scale-slider", min:0, max:6}
                    ]
                },
                {
                    name: "total_casp_score",
                    label: "Total CASP Score",
                    type: "score-box"
                },
                {
                    name: "classification_score",
                    label: "Classification of Score",
                    type: "radio",
                    options: ["Normal", "Impaired" ]
                },
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
        },
    ]
}

export {
    CASP_SCHEMA
}