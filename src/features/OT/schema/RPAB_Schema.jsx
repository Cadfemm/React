const RPAB_Schema = {
    title: "Rivermead Perceptual Assessment Battery (RPAB)",
    sections: [
        {
            title: "Form constancy",
            fields: [
                {
                    type: "radio",
                    name: "picture_matching",
                    label: "Test no. 1. Picture matching",
                    options: [0, 1, 2, 3, 4]
                },
                {
                    type: "textarea",
                    name: "picture_matching_notes",
                    showIf: {
                        field: "picture_matching",
                        oneOf: [0, 1, 2, 3, 4]
                    }
                },
                {
                    type: "radio",
                    name: "object_matching",
                    label: "Test no. 2. Object matching",
                    options: [0, 1, 2, 3, 4]
                },
                {
                    type: "textarea",
                    name: "object_matching_notes",
                    showIf: {
                        field: "object_matching",
                        oneOf: [0, 1, 2, 3, 4]
                    }
                },
                {
                    type: "radio",
                    name: "size_recognition",
                    label: "Test no. 4. Size recognition",
                    options: [0, 1, 2, 3, 4]
                },
                {
                    type: "textarea",
                    name: "size_recognition_notes",
                    showIf: {
                        field: "size_recognition",
                        oneOf: [0, 1, 2, 3, 4]
                    }
                },
            ]
        },
        {
            title: "Colour constancy",
            fields: [
                {
                    min: 0,
                    max: 12,
                    type: "scale-slider",
                    name: "colour_matching",
                    label: "Test no. 3. Colour matching",
                },
                {
                    type: "textarea",
                    name: "colour_matching_notes",
                    showIf: {
                        field: "colour_matching",
                        exists: true
                    }
                },
            ]
        },
        {
            title: "Sequencing",
            fields: [
                {
                    type: "radio",
                    name: "sequencing_series",
                    label: "Test no. 5. Series",
                    options: [0, 1, 2, 3, 4]
                },
                {
                    type: "textarea",
                    name: "sequencing_series_notes",
                    showIf: {
                        field: "sequencing_series",
                        oneOf: [0, 1, 2, 3, 4]
                    }
                },
                {
                    type: "radio",
                    name: "sequencing_picture",
                    label: "Test no. 9. Sequencing - picture",
                    options: [0, 1, 2, 3, 4]
                },
                {
                    type: "textarea",
                    name: "sequencing_picture_notes",
                    showIf: {
                        field: "sequencing_picture",
                        oneOf: [0, 1, 2, 3, 4]
                    }
                },
            ]
        },
        {
            title: "Object completion",
            fields: [
                {
                    type: "radio",
                    name: "animal_halves",
                    label: "Test no. 6. Animal halves",
                    options: [0, 1, 2, 3, 4]
                },
                {
                    type: "textarea",
                    name: "animal_halves_notes",
                    showIf: {
                        field: "animal_halves",
                        oneOf: [0, 1, 2, 3, 4]
                    }
                },
                {
                    type: "radio",
                    name: "missing_article",
                    label: "Test no. 7. Missing article",
                    options: [0, 1, 2, 3, 4]
                },
                {
                    type: "textarea",
                    name: "missing_article_notes",
                    showIf: {
                        field: "missing_article",
                        oneOf: [0, 1, 2, 3, 4]
                    }
                },
            ]
        },
        {
            title: "Figure ground discrimination",
            fields: [
                {
                    type: "radio",
                    name: "figure_ground_discrimination",
                    label: "Test no. 8. Figure ground discrimination",
                    options: [0, 1, 2, 3, 4]
                },
                {
                    type: "textarea",
                    name: "figure_ground_discrimination_notes",
                    showIf: {
                        field: "figure_ground_discrimination",
                        oneOf: [0, 1, 2, 3, 4]
                    }
                },
            ]
        },
        {
            title: "Body image",
            fields: [
                {
                    min: 0,
                    max: 12,
                    type: "scale-slider",
                    name: "body_image",
                    label: "Test no. 10. Body image"
                },
                {
                    type: "textarea",
                    name: "body_image_notes",
                    showIf: {
                        field: "body_image",
                        exists: true
                    }
                },
                {
                    min: 0,
                    max: 8,
                    type: "scale-slider",
                    name: "body_image_identification",
                    label: "Test no. 16. Body image - self-identification"
                },
                {
                    type: "textarea",
                    name: "body_image_identification_notes",
                    showIf: {
                        field: "body_image_identification",
                        exists: true
                    }
                },
            ]
        },
        {
            title: "Inattention",
            fields: [
                {
                    min: 0,
                    max: 72,
                    type: "input-number-range",
                    name: "copying_shapes_rl",
                    label: "Test no. 11. R/L copying shapes"
                },
                {
                    type: "textarea",
                    name: "copying_shapes_rl_notes",
                    showIf: {
                        field: "copying_shapes_rl",
                        exists: true
                    }
                },
                {
                    min: 0,
                    max: 32,
                    type: "input-number-range",
                    name: "copying_words_rl",
                    label: "Test no. 12. R/L copying words"
                },
                {
                    type: "textarea",
                    name: "copying_words_rl_notes",
                    showIf: {
                        field: "copying_words_rl",
                        exists: true
                    }
                },
                {
                    min: 0,
                    max: 52,
                    type: "input-number-range",
                    name: "cancellation_inattention",
                    label: "Test no. 15. Cancellation"
                },
                {
                    type: "textarea",
                    name: "cancellation_inattention_notes",
                    showIf: {
                        field: "cancellation_inattention",
                        exists: true
                    }
                },
            ]
        },
        {
            title: "Spatial awareness",
            fields: [
                {
                    min: 0,
                    max: 19,
                    type: "scale-slider",
                    name: "spatial_3d_copying",
                    label: "Test no. 13. 3D copying"
                },
                {
                    type: "textarea",
                    name: "spatial_3d_copying_notes",
                    showIf: {
                        field: "spatial_3d_copying",
                        exists: true
                    }
                },
                {
                    min: 0,
                    max: 72,
                    type: "input-number-range",
                    name: "spatial_cube_copying",
                    label: "Test no. 14. Cube copying"
                },
                {
                    type: "textarea",
                    name: "spatial_cube_copying_notes",
                    showIf: {
                        field: "spatial_cube_copying",
                        exists: true
                    }
                },
            ]
        },
                {
            title: "",
            fields: [
                {
                    type: "score-box",
                    name: "total_rpab_score",
                    label: "Total RPAB Score"
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
                    name: "additional-documents",
                    label: "Additional Appendixes / Documents"
                }
            ]
        }
    ]
}

export {
    RPAB_Schema
}