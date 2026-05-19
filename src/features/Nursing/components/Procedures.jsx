import React, { useState } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";
import WoundAssessment from "../pages/WoundAssessment";
import {FEES_SCHEMA,BTI_SCHEMA,MUSCU_SCHEMA} from "../../Doctors/components/ProcedureAssessment";
import { EVOKE_SCHEMA } from "../../MedicalAssistant/components/EvokePotentialForm";
import { NCSEMG_SCHEMA } from "../../MedicalAssistant/components/NCSEMGForm";
import { EEG_SCHEMA } from "../../MedicalAssistant/components/EEGForm";

/* ================= SIMPLE PROCEDURE ================= */

export const SIMPLE_PROCEDURE_SCHEMA = {
  title: "Procedures",

  actions: [
    { type: "back", label: "Back" }
  ],

  sections: [
    {
      fields: [

        {
          type: "checkbox-group",
          name: "simple_procedures",
          label: "Simple Procedures",
          options: [
            { label: "Eye irrigation", value: "eye_irrigation" },
            { label: "Ear irrigation", value: "ear_irrigation" },
            { label: "Vital Sign", value: "vital_sign" },
            { label: "Glucose Monitoring", value: "glucose_monitoring" },
            { label: "Ryle’s Tube Insertion", value: "ryles_tube_insertion" },
            { label: "Ryle’s tube feeding", value: "ryles_tube_feeding" },
            { label: "Suture Removing", value: "suture_removing" },
            { label: "Tracheostomy dressing", value: "tracheostomy_dressing" },
            { label: "Tracheostomy suctioning", value: "tracheostomy_suctioning" },
            { label: "Electrocardiogram (ECG)", value: "ecg" },
            { label: "PEG cleaning", value: "peg_cleaning" },
            { label: "PEG Feeding", value: "peg_feeding" },
            { label: "IV Cannulation Insertion", value: "iv_cannulation" },
            { label: "Blood taking", value: "blood_taking" },
            { label: "Wound dressing", value: "wound_dressing" },
            { label: "Suprapubic dressing", value: "suprapubic_dressing" },
            { label: "Bladder Scan", value: "bladder_scan" },
            { label: "Continuous Bladder Drainage (CBD) Insertion", value: "cbd_insertion" },
            { label: "Clean Intermittent Cathetherization (CIC) Insertion", value: "cic_insertion" },
            { label: "Digital Rectal Stimulation", value: "digital_rectal_stimulation" },
            { label: "Manual evacuation", value: "manual_evacuation" },
            { label: "Serial Casting", value: "serial_casting" },
            { label: "Others", value: "others" }
          ]
        },

        {
          type: "textarea",
          name: "simple_procedure_others",
          label: "Others",
          showIf: {
            field: "simple_procedures",
            includes: "others"
          }
        },

        {
          type: "textarea",
          name: "simple_observation",
          label: "Observation During Procedure"
        },

        {
          type: "radio",
          name: "simple_adverse_reaction",
          label: "Adverse Reaction",
          options: [
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" }
          ]
        },

        {
          type: "textarea",
          name: "simple_adverse_reaction_details",
          label: "Specify",
          showIf: {
            field: "simple_adverse_reaction",
            equals: "yes"
          }
        },

        {
          type: "textarea",
          name: "simple_plan",
          label: "Plan"
        }

      ]
    }
  ]
};

/* ================= ADVANCE TABS ================= */

export const ADVANCED_OPTIONS = [
  { key: "advance_wound_management", label: "WATFS" },
  { key: "fees", label: "FEES" },
  { key: "scc", label: "SCC" },
  { key: "botulinum_toxin", label: "Botulinum Toxin Injection" },
  { key: "perineural_injection", label: "Perineural Injection Therapy" },
  { key: "musculoskeletal", label: "Musculoskeletal Procedures" },
  { key: "stress_test", label: "Stress Test" },
  { key: "sleep_study", label: "Sleep Study" },
  { key: "eeg", label: "EEG" },
  { key: "ncs", label: "NCS,EMG" },
  { key: "ep", label: "Evoke Potential" }
];


/* ================= ADVANCE COMMON FORM ================= */

const ADVANCE_COMMON_SCHEMA = {
  title: "",

  sections: [
    {
      fields: [
        {
          type: "textarea",
          name: "advance_observation",
          label: "Observation During Procedure"
        },

        {
          type: "radio",
          name: "advance_adverse_reaction",
          label: "Adverse Reaction",
          options: [
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" }
          ]
        },

        {
          type: "textarea",
          name: "advance_adverse_reaction_details",
          label: "Specify",
          showIf: {
            field: "advance_adverse_reaction",
            equals: "yes"
          }
        },

        {
          type: "textarea",
          name: "advance_plan",
          label: "Plan"
        },
      ]
    }
  ]
};

/* ================= MAIN COMPONENT ================= */

export default function Procedures({
  patient,
  onBack
}) {

  const [values, setValues] = useState({});
  const [language, setLanguage] = useState("en");
  const [selectedAdvance, setSelectedAdvance] = useState();

  const onChange = (name, value) => {
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

    const handleAction = (type) => {

    if (type === "toggle-language") {
        setLanguage(l => (l === "en" ? "ms" : "en"));
    }

    if (type === "back") {
        onBack?.();
    }
    };

  return (
    
    <div
      style={{
        padding: 16,
        display: "flex",
        flexDirection: "column",
        gap: 24
      }}
    >

      {/* ================= SIMPLE ================= */}

      <CommonFormBuilder
        schema={SIMPLE_PROCEDURE_SCHEMA}
        values={values}
        onChange={onChange}
        onAction={handleAction}
        layout="nested"
      />

      {/* ================= ADVANCE HEADER ================= */}

      <div
        style={{
          fontSize: 28,
          fontWeight: 700,
          marginTop: 10
        }}
      >
        Assist / Perform
      </div>

      {/* ================= ADVANCE TABS ================= */}

        <div style={radioRow}>
        <div style={radioGroup}>

            {ADVANCED_OPTIONS.map(opt => (
            <label key={opt.key} style={radioLabel}>

                <input
                type="radio"
                name="advance-option"
                checked={selectedAdvance === opt.key}
                onChange={() => setSelectedAdvance(opt.key)}
                style={radioInput}
                />

                <span>{opt.label}</span>

            </label>
            ))}

        </div>
        </div>

      {/* ================= ACTIVE TAB CONTENT ================= */}

      <div
        style={{
          border: "1px solid #e5e7eb",
          borderRadius: 14,
          padding: 20
        }}
      >

        <div
          style={{
            fontSize: 20,
            fontWeight: 700,
            marginBottom: 20
          }}
        >
          {
            ADVANCED_OPTIONS.find(
              x => x.key === selectedAdvance
            )?.label
          }
        </div>
      {/* ================= COMPONENTS ================= */}

      {selectedAdvance === "advance_wound_management" && (
        <WoundAssessment
          patient={patient}
          onBack={onBack}
        />
      )}

      {selectedAdvance === "fees" && (
        <CommonFormBuilder
            schema={FEES_SCHEMA}
            values={values}
            onChange={onChange}
            onAction={handleAction}
            layout="nested"
        />
        )}

      {/* {selectedAdvance === "scc" && (
        <div>SCC Component</div>
      )} */}

      {selectedAdvance === "botulinum_toxin" && (
      <CommonFormBuilder
            schema={BTI_SCHEMA}
            values={values}
            onChange={onChange}
            onAction={handleAction}
            layout="nested"
        />
        )}

        {selectedAdvance === "musculoskeletal" && (
        <CommonFormBuilder
            schema={MUSCU_SCHEMA}
            values={values}
            onChange={onChange}
            onAction={handleAction}
            layout="nested"
        />
        )}



      {/* {selectedAdvance === "perineural_injection" && (
        <div>Perineural Injection Component</div>
      )}

      {selectedAdvance === "stress_test" && (
        <div>Stress Test Component</div>
      )}

      {selectedAdvance === "sleep_study" && (
        <div>Sleep Study Component</div>
      )} */}

      {selectedAdvance === "eeg" && (
        <CommonFormBuilder
            schema={EEG_SCHEMA}
            values={values}
            onChange={onChange}
            onAction={handleAction}
            language={language}
            layout="nested"
        />
        )}

      {selectedAdvance === "ncs" && (
        <CommonFormBuilder
            schema={NCSEMG_SCHEMA}
            values={values}
            onChange={onChange}
            onAction={handleAction}
            language={language}
            layout="nested"
        />
        )}

      {selectedAdvance === "ep" && (
        <CommonFormBuilder
            schema={EVOKE_SCHEMA}
            values={values}
            onChange={onChange}
            onAction={handleAction}
            language={language}
            layout="nested"
        />
        )}
        {selectedAdvance && (
        <CommonFormBuilder
            schema={ADVANCE_COMMON_SCHEMA}
            values={values}
            onChange={onChange}
            layout="nested"
        />
        )}

      </div>

    </div>
  );
}

/* ================= STYLES ================= */

const radioRow = {
  display: "flex",
  alignItems: "center",
  padding: "12px 16px",
  background: "#fff",
  border: "1px solid #e5e7eb",
  borderRadius: 8,
  marginBottom: 8
};

const radioGroup = {
  display: "flex",
  flexWrap: "wrap",
  gap: "20px 32px",
  alignItems: "center"
};

const radioLabel = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  cursor: "pointer",
  fontSize: 14,
  color: "#111827",
  fontWeight: 500
};

const radioInput = {
  width: 16,
  height: 16,
  accentColor: "#2563eb",
  cursor: "pointer",
  margin: 0
};
