import React from "react";
import CommonFormBuilder from "../CommonComponenets/FormBuilder";

const LEFT_CIRCLE_FIELDS = [
  { name: "circle_1", top: "210px", left: "95px",  width: "60px", height: "60px" },
  { name: "circle_2", top: "290px", left: "95px",  width: "60px", height: "60px" },
  { name: "circle_3", top: "370px", left: "95px",  width: "60px", height: "60px" },
  { name: "circle_4", top: "450px", left: "95px",  width: "60px", height: "60px" },
  { name: "circle_5", top: "530px", left: "95px",  width: "60px", height: "60px" }
];

// const LOWER_LIMB_FIELDS = [
//   { name: "thigh",  top: "210px", left: "840px", width: "180px", height: "40px" },
//   { name: "knee",   top: "300px", left: "840px", width: "180px", height: "40px" },
//   { name: "leg",    top: "395px", left: "840px", width: "180px", height: "40px" },
//   { name: "ankle",  top: "490px", left: "840px", width: "180px", height: "40px" },
//   { name: "foot",   top: "585px", left: "840px", width: "180px", height: "40px" }
// ];

const MIDDLE_FIELDS = [
  { name: "mid_1", top: "315px", left: "560px", width: "90px", height: "40px" },
  { name: "mid_2", top: "560px", left: "560px", width: "90px", height: "40px" }
];




// const LOWER_LIMB_IMAGE_FIELDS = [
//   {
//     name: "thigh",
//     placeholder: "",
//     top: "170px",
//     left: "610px",
//     width: "160px",
//     height: "38px"
//   },
//   {
//     name: "knee",
//     placeholder: "",
//     top: "260px",
//     left: "610px",
//     width: "160px",
//     height: "38px"
//   },
//   {
//     name: "leg",
//     placeholder: "",
//     top: "350px",
//     left: "610px",
//     width: "160px",
//     height: "38px"
//   },
//   {
//     name: "ankle",
//     placeholder: "",
//     top: "445px",
//     left: "610px",
//     width: "160px",
//     height: "38px"
//   },
//   {
//     name: "foot",
//     placeholder: "",
//     top: "535px",
//     left: "610px",
//     width: "160px",
//     height: "38px"
//   }
// ];






// const LOWER_LIMB_FIELDS = [
//   { name: "thigh", shape: "rect", top: "46.4%", left: "92%", width: "8%", height: "9%" },
//   { name: "knee",  shape: "rect", top: "61%", left: "79%", width: "8.3%", height: "9%" },
//   { name: "leg",   shape: "rect", top: "8%", left: "55%", width: "8.3%", height: "9.2%" },
//   { name: "circle_1", shape: "oval", top: "25%", left: "8%", width: "6%", height: "6%" },
//   { name: "circle_2", shape: "oval", top: "33%", left: "8%", width: "6%", height: "6%" }
// ];

const LOWER_LIMB_FIELDS = [
  { name: "thigh",  x: 720, y: 260, size: 48 },
  { name: "knee",   x: 720, y: 340, size: 48 },
  { name: "leg",    x: 720, y: 420, size: 48 },
  { name: "ankle",  x: 720, y: 500, size: 48 },
  { name: "foot",   x: 720, y: 580, size: 48 }
];


 const LE_ORTHOTICS_PRESCRIPTION_SCHEMA = {
  title: "Lower Extremity Orthotics Prescription",
  sections: [
    {
      title: "Orthotics Devices",
      fields: [
        {
          name: "le_orthotics_devices",
          label: "Select Orthotics Devices",
          type: "checkbox-group",
          options: [
            { label: "Solid Ankle Foot Orthosis", value: "solid_afo" },
            { label: "Hinged Ankle Foot Orthosis", value: "hinged_afo" },
            { label: "KAFO", value: "kafo" },
            { label: "PTB-AFO", value: "ptb_afo" },
            { label: "GRAFO", value: "grafo" },
            { label: "Custom Made Total Contact Insole", value: "tci" },
            { label: "Hinged Knee Brace", value: "hinged_knee_brace" },
            { label: "Post Op Knee Brace", value: "post_op_knee_brace" },
            { label: "Functional Knee Brace", value: "functional_knee_brace" }
          ]
        }
      ]
    },
    {
  title: "Affected Areas",
  fields: [
    {
      name: "affected_areas_lower_limb",
      label: "Affected Areas",
      type: "image-anatomy-selector",
      image: "/lowerlimb.png",
      markers: LOWER_LIMB_FIELDS
    }
  ]
},

    {
      title: "Remarks",
      fields: [
        {
          name: "le_orthotics_remarks",
          label: "Remarks",
          type: "textarea"
        }
      ]
    }
  ]
};

export default function LowerExtremityOrthoticsPrescription({
  values,
  onChange
}) {
  return (
    <CommonFormBuilder
      schema={LE_ORTHOTICS_PRESCRIPTION_SCHEMA}
      values={values}
      onChange={onChange}
      layout="nested"
    />
  );
}
