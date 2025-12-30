import React, { useState } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

export default function BowelAssessmentForm() {
  const [values, setValues] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showBristol, setShowBristol] = useState(false);

  const onChange = (name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const onAction = (action) => {
    if (action === "OPEN_BRISTOL_CHART") {
      setShowBristol(true);
    }
  };
 const BOWEL_SCHEMA = {
  title: "Bowel Assessment",

  sections: [
    {
      title: "History Taking / Assessment",
      fields: [

        /* 1. Frequency of defecation */
        {
          name: "frequency",
          label: "1. Frequency of defecation",
          type: "single-select",
          options: [
            { label: "Once per day", value: "once" },
            { label: "Twice per day", value: "twice" },
            { label: "Once every 2 days", value: "two_days" },
            { label: "Once every few days", value: "few_days" },
            { label: "Others", value: "others" }
          ]
        },
        {
          name: "frequencyOther",
          label: "Please specify",
          type: "textarea",
          showIf: {
            field: "frequency",
            equals: "others"
          }
        },

        /* 2. Able to sensate */
        {
          name: "sensate",
          label: "2. Able to sensate",
          type: "radio",
          options: [
            { label: "Yes", value: "Yes" },
            { label: "No", value: "No" },
            { label: "Unsure", value: "Unsure" }
          ]
        },

        /* 3. Able to hold / control */
        {
          name: "control",
          label: "3. Able to hold / control",
          type: "radio",
          options: [
            { label: "Yes", value: "Yes" },
            { label: "No", value: "No" },
            { label: "Unsure", value: "Unsure" }
          ]
        },

        /* 4. Stool consistency */
        {
          name: "stoolConsistency",
          label: "4. Stool consistency (Refer Bristol Stool Chart)",
          type: "single-select",
          options: [
            { label: "Type 1 – Separate hard lumps", value: "1" },
            { label: "Type 2 – Lumpy sausage-like", value: "2" },
            { label: "Type 3 – Sausage with cracks", value: "3" },
            { label: "Type 4 – Smooth soft sausage", value: "4" },
            { label: "Type 5 – Soft blobs", value: "5" },
            { label: "Type 6 – Mushy stool", value: "6" },
            { label: "Type 7 – Liquid stool", value: "7" }
          ]
        },

        /* 5. Medication use */
        {
          name: "medication",
          label: "5. Medication use for defecation",
          type: "radio",
          options: [
            { label: "Yes", value: "Yes" },
            { label: "No", value: "No" }
          ]
        },
        {
          name: "medicationNotes",
          label: "Please specify medication",
          type: "textarea",
          showIf: {
            field: "medication",
            equals: "Yes"
          }
        },

        /* 6. Manual evacuation */
        {
          name: "manualEvacuation",
          label: "6. Manual evacuation?",
          type: "radio",
          options: [
            { label: "Yes", value: "Yes" },
            { label: "No", value: "No" }
          ]
        },

        /* 7. Digital rectal stimulation */
        {
          name: "digitalStimulation",
          label: "7. Digital Rectal Stimulation?",
          type: "radio",
          options: [
            { label: "Yes", value: "Yes" },
            { label: "No", value: "No" }
          ]
        }
      ]
    }
  ]
};


  return (
    <>
      <CommonFormBuilder
        schema={BOWEL_SCHEMA}
        values={values}
        onChange={onChange}
        submitted={submitted}
        onAction={onAction}
      />

      {showBristol && (
        <div style={modal.overlay}>
          <div style={modal.box}>
            <img
              src="/bristol-chart.png"
              alt="Bristol Stool Chart"
              style={{ width: "100%" }}
            />
            <div style={{ textAlign: "right", marginTop: 12 }}>
              <button
                style={modal.btn}
                onClick={() => setShowBristol(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const modal = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000
  },
  box: {
    background: "#fff",
    padding: 20,
    borderRadius: 12,
    width: 500
  },
  btn: {
    padding: "6px 14px",
    borderRadius: 8,
    border: "1px solid #111827",
    background: "#fff",
    fontWeight: 600,
    cursor: "pointer"
  }
};
