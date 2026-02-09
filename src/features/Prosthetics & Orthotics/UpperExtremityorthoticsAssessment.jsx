import React from "react";
import CommonFormBuilder from "../CommonComponenets/FormBuilder";

const UPPER_LIMB_FIELDS = [
    { name: "shoulder", label: "A" },
    { name: "arm", label: "B" },
    { name: "elbow", label: "C" },
    { name: "forearm", label: "D" },
    { name: "wrist", label: "E" },
    { name: "hand", label: "F" },
    { name: "fingers", label: "G" }
];

const UE_ORTHOTICS_PRESCRIPTION_SCHEMA = {
    title: "Upper Extremity Orthotics Prescription",
    sections: [
        {
            title: "Patient Information",
            fields: [
                {
                    name: "activity_level",
                    label: "Activity Level",
                    type: "radio",
                    options: [
                        { label: "Sedentary", value: "sedentary" },
                        { label: "Light", value: "light" },
                        { label: "Moderate", value: "moderate" },
                        { label: "Heavy", value: "heavy" }
                    ]
                },
                {
                    name: "limb_loss",
                    label: "Limb Loss",
                    type: "radio",
                    options: [
                        { label: "None", value: "none" },
                        { label: "Partial", value: "partial" },
                        { label: "Full", value: "full" }
                    ]
                },
                {
                    name: "diagnosis",
                    label: "Diagnosis",
                    type: "radio",
                    options: [
                        { label: "Cerebral Palsy", value: "cerebral_palsy" },
                        { label: "Spinal Cord Injury", value: "sci" },
                        { label: "Stroke", value: "stroke" },
                        { label: "Traumatic Brain Injury", value: "tbi" },
                        { label: "Other", value: "other" }
                    ]
                },
                {
                    name: "diagnosis_other",
                    label: "Specify Other Diagnosis",
                    type: "input",
                    showIf: { field: "diagnosis", equals: "other" }
                },
                {
                    name: "upper_limb_system",
                    label: "Upper Limb System",
                    type: "radio",
                    options: [
                        { name: "cosmesis", label: "Cosmesis", value: "cosmesis" },
                        { name: "mechanical", label: "Mechanical", value: "mechanical" },
                        { name: "myoelectric", label: "Myoelectric", value: "myoelectric" },
                    ]
                },
            ]
        },

        {
            title: "Remarks",
            fields: [
                {
                    name: "ue_orthotics_remarks",
                    label: "Remarks",
                    type: "textarea"
                }
            ]
        }
    ]
};

export default function UpperExtremityOrthoticsPrescription({
    values,
    onChange
}) {
    return (
        <CommonFormBuilder
            schema={UE_ORTHOTICS_PRESCRIPTION_SCHEMA}
            values={values}
            onChange={onChange}
            layout="nested"
        />
    );
}