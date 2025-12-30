import React, { useState } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder"



const HEARING_SCHEMA = {
  title: "Hearing Assessment",

  sections: [
    {
      title: null,
      fields: [
        "Otalgia",
        "Pruritis",
        "Otorrhea",
        "Hearing loss (unspecified)",
        "Conductive hearing loss (unilateral/bilateral)",
        "Sensorineural hearing loss",
        "Mixed hearing loss",
        "Noise-induced hearing loss",
        "Deaf mutism, not elsewhere classified",
        "Presbycusis",
        "Tinnitus",
        "Vertigo",
        "Unsteadiness / imbalance",
        "Fullness or blocked ear sensation"
      ].map(q => ({
        name: q,
        label: q,
        type: "radio",
        options: [
          { label: "YES", value: "YES" },
          { label: "NO", value: "NO" }
        ]
      }))
    },

    {
      title: "External Ear",
      fields: [
        "Deformity (Microtia / Anotia)",
        "Haematoma of pinna",
        "Otitis externa"
      ].map(q => ({
        name: q,
        label: q,
        type: "radio",
        options: [
          { label: "YES", value: "YES" },
          { label: "NO", value: "NO" }
        ]
      }))
    },

    /* ===================== SECTION 3 ===================== */
    {
      title: "Middle Ear",
      fields: [
        "Acute otitis media",
        "Otitis media with effusion",
        "Chronic suppurative otitis media",
        "Tympanic membrane perforation",
        "Cholesteatoma",
        "Tympanosclerosis",
        "Grommet in situ"
      ].map(q => ({
        name: q,
        label: q,
        type: "radio",
        options: [
          { label: "YES", value: "YES" },
          { label: "NO", value: "NO" }
        ]
      }))
    }
  ]
};



const initialValues = Object.fromEntries(
  HEARING_SCHEMA.sections
    .flatMap(s => s.fields)
    .map(f => [f.name, ""])
);


export default function HearingAssessment() {
  const [values, setValues] = useState(initialValues);
  const [submitted, setSubmitted] = useState(false);

  const onChange = (name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
    console.log("Hearing Assessment:", values);
  };

  return (
    <CommonFormBuilder
      schema={HEARING_SCHEMA}
      values={values}
      onChange={onChange}
      submitted={submitted}
    >
    
    </CommonFormBuilder>
  );
}
