import React, { useState } from "react";
import CommonFormBuilder from "../CommonComponenets/FormBuilder";

export default function LowerLimbProsthesisPrescription() {

    const [values, setValues] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const onChange = (name, value) => {
        setValues(v => ({ ...v, [name]: value }));
    };

    const PROSTHESIS_SCHEMA = {

        title: "Lower Limb Prosthesis Prescription",

        sections: [
            {
                fields: [

                    /* ================= Activity ================= */

                    {
                        type: "radio",
                        name: "activity_level",
                        label: "Activity Level",
                        options: [
                            { label: "K0", value: "K0" },
                            { label: "K1", value: "K1" },
                            { label: "K2", value: "K2" },
                            { label: "K3", value: "K3" },
                            { label: "K4", value: "K4" }
                        ]
                    },

                    /* ================= Limb Loss ================= */

                    {
                        type: "radio",
                        name: "limb_loss",
                        label: "Limb Loss",
                        options: [
                            { label: "Right", value: "right" },
                            { label: "Left", value: "left" },
                            { label: "Bilateral", value: "bilateral" }
                        ]
                    },

                    {
                        type: "date",
                        name: "date_of_onset",
                        label: "Date of Onset"
                    },

                    /* ================= Diagnosis ================= */

                    {
                        type: "radio",
                        name: "diagnosis",
                        label: "Diagnosis",
                        labelAbove: true,
                        options: [
                            { label: "TT – Transtibial Amputation", value: "tt" },
                            { label: "TF – Transfemoral Amputation", value: "tf" },
                            { label: "KD – Knee Disarticulation", value: "kd" },
                            { label: "Syme's – Syme's Ankle Disarticulation", value: "syme" },
                            { label: "PF – Partial Foot Amputation", value: "pf" },
                            { label: "Others", value: "others" }
                        ]
                    },

                    {
                        type: "input",
                        name: "diagnosis_other",
                        label: "Other Diagnosis",
                        showIf: {
                            field: "diagnosis",
                            equals: "others"
                        }
                    },

                    /* ================= SOCKET SYSTEM ================= */

                    { type: "subheading", label: "Socket System" },

                    {
                        type: "radio",
                        name: "socket_design",
                        label: "Socket Design",
                        labelAbove: true,
                        options: [
                            { label: "PTB – Patellar Tendon Bearing", value: "ptb" },
                            { label: "TSB – Total Surface Bearing", value: "tsb" },
                            { label: "IC – Ischial Containment", value: "ic" },
                            { label: "QUAD – Quadrilateral Socket", value: "quad" },
                            { label: "MAS – Marlo Anatomical Socket", value: "mas" }
                        ]
                    },

                    {
                        type: "radio",
                        name: "socket_options",
                        label: "Socket Options",
                        labelAbove: true,
                        options: [
                            { label: "Total Contact", value: "total_contact" },
                            { label: "Pelite Liner", value: "pelite_liner" },
                            { label: "Cushion Liner (Gel)", value: "gel_liner" },
                            { label: "Thigh Corset", value: "thigh_corset" },
                            { label: "Test Socket", value: "test_socket" },
                            { label: "Flexible Socket / Frame", value: "flex_socket" },
                            { label: "Replacement Socket", value: "replacement_socket" },
                            { label: "Carbon Fibre Socket", value: "carbon_socket" }
                        ]
                    },

                    {
                        type: "radio",
                        name: "suspension",
                        label: "Suspension",
                        labelAbove: true,
                        options: [
                            { label: "Pin / Lock System", value: "pin_lock" },
                            { label: "Suspension Liner", value: "liner" },
                            { label: "Lanyard", value: "lanyard" },
                            { label: "Suction", value: "suction" },
                            { label: "Sleeves", value: "sleeves" },
                            { label: "TESS Belt", value: "tess_belt" },
                            { label: "Other", value: "other" }
                        ]
                    },

                    {
                        type: "input",
                        name: "suspension_other",
                        label: "Other Suspension",
                        showIf: {
                            field: "suspension",
                            equals: "other"
                        }
                    },

                    /* ================= KNEE SYSTEM ================= */

                    { type: "subheading", label: "Knee System" },

                    {
                        type: "radio",
                        name: "knee_component",
                        label: "Knee Component",
                        options: [
                            { label: "4-Bar Mechanical", value: "4bar_mechanical" },
                            { label: "4-Bar with Safety Lock", value: "4bar_lock" },
                            { label: "Pneumatic", value: "pneumatic" },
                            { label: "Hydraulic", value: "hydraulic" },
                            { label: "Other", value: "other" }
                        ]
                    },

                    {
                        type: "input",
                        name: "knee_component_other",
                        label: "Other Knee Component",
                        showIf: {
                            field: "knee_component",
                            equals: "other"
                        }
                    },

                    {
                        type: "radio",
                        name: "knee_rotator",
                        label: "Knee Rotator",
                        options: [
                            { label: "Yes", value: "yes" },
                            { label: "No", value: "no" }
                        ]
                    },

                    {
                        type: "radio",
                        name: "tubing",
                        label: "Tubing",
                        options: [
                            { label: "Stainless Steel", value: "steel" },
                            { label: "Aluminium", value: "aluminium" },
                            { label: "Carbon Fibre", value: "carbon" }
                        ]
                    },

                    /* ================= FOOT SYSTEM ================= */

                    { type: "subheading", label: "Foot System" },

                    {
                        type: "radio",
                        name: "foot_component",
                        label: "Foot Component",
                            labelAbove: true,
                        options: [
                            { label: "SACH – Solid Ankle Cushion Heel", value: "sach" },
                            { label: "Single Axis Foot", value: "single_axis" },
                            { label: "Multi Axis Foot", value: "multi_axis" },
                            { label: "Energy Storing Foot", value: "energy_storing" }
                        ]
                    },

                    /* ================= REMARKS ================= */

                    {
                        type: "textarea",
                        name: "remarks",
                        label: "Remarks"
                    }

                ]
            }
        ]
    };

    return (
        <CommonFormBuilder
            schema={PROSTHESIS_SCHEMA}
            values={values}
            onChange={onChange}
            submitted={submitted}
            layout="nested"
        />
    );
}