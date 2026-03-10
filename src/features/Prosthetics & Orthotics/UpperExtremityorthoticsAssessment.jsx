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
    title: "Upper Extremity Prosthetics Prescription",
    sections: [
        {
            title: "",
            fields: [
          {
  type: "subheading",
  label: "Prosthetic Information"
},

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

{
  type: "radio",
  name: "limb_loss",
  label: "Limb Loss",
  options: [
    { label: "Right", value: "right" },
    { label: "Left", value: "left" },
    { label: "Bilateral (Both Limbs)", value: "bilateral" }
  ]
},

{
  type: "date",
  name: "date_of_onset",
  label: "Date of Onset"
},

{
  type: "radio",
  name: "diagnosis_level",
  label: "Diagnosis Level",
  labelAbove: true,
  options: [
    { label: "TR – Transradial Amputation", value: "transradial" },
    { label: "TH – Transhumeral Amputation", value: "transhumeral" },
    { label: "SD – Shoulder Disarticulation", value: "shoulder_disarticulation" },
    { label: "Others", value: "others" }
  ]
},

{
  type: "input",
  name: "diagnosis_other",
  label: "Other Diagnosis ",
  showIf: { field: "diagnosis_level", equals: "others" }
},

{
  type: "subheading",
  label: "Upper Limb System"
},

{
  type: "radio",
  name: "upper_limb_system",
  label: "Prosthesis Type",
  options: [
    { label: "Cosmesis ", value: "cosmesis" },
    { label: "Mechanical ", value: "mechanical" },
    { label: "Myoelectric ", value: "myoelectric" }
  ]
},

{
  type: "textarea",
  name: "prosthetic_remarks",
  label: "Remarks"
}
            ]
        },

     
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