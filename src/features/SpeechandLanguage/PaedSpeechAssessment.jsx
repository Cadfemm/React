import React, { useEffect, useMemo, useState } from "react";
import CommonFormBuilder, { withOptionalSections } from "../CommonComponenets/FormBuilder";

const COMMON_ALIAS_GROUPS = [
  ["sitting", "seating"],
  ["behaviouralRegulation", "behaviourRegulation"],
  ["teeth", "teethStructure"],
  ["hardPalate", "hardPalateStructure"],
  ["softPalate", "softPalateStructure"],
  ["tongue", "tongueStructure"],
  ["lips", "lipStructure"],
  ["oralRemarks", "oralStructureRemarks"]
];

const COMMON_FIELD_NAMES = [
  "accompaniedBy",
  "consent",
  "sitting",
  "seating",
  "behaviouralRegulation",
  "behaviourRegulation",
  "teeth",
  "teethStructure",
  "hardPalate",
  "hardPalateStructure",
  "softPalate",
  "softPalateStructure",
  "nasalResonance",
  "tongue",
  "tongueStructure",
  "lips",
  "lipStructure",
  "oralRemarks",
  "oralStructureRemarks"
];
const COMMON_STORAGE_VERSION = "v1";
const COMMON_STORAGE_KEY_PREFIX = "patient_paed_common_fields";

function getCommonPatch(name, value) {
  const patch = { [name]: value };
  for (const [left, right] of COMMON_ALIAS_GROUPS) {
    if (name === left) patch[right] = value;
    if (name === right) patch[left] = value;
  }
  return patch;
}

const PAED_FEEDING_OPTIONAL_SECTIONS = {
  subjective: ["Chief Complaint", "Feeding / Dietary Information", "Growth & Nutrition", "Developmental Feeding History"],
  objective: [
    "General Observation",
    "Oral-motor structure & function observation",
    "Oral-Motor Examination",
    "Cranial Nerves",
    "Feeding Observation",
    "Oral Phase Observations",
    "Pharyngeal Phase Observations",
    "Other Observations",
    "Behavioural / sensory during feeding"
  ]
};

function applyOptionalSections(schema, labels) {
  if (!schema || !labels?.length) return schema;
  return {
    ...schema,
    sections: (schema.sections || []).map(sec => ({
      ...sec,
      fields: withOptionalSections(sec.fields || [], labels)
    }))
  };
}

export default function PaedIAFeeding({ patient, onBack, mode = "initial" }) {
  const isFollowup = mode === "followup";
  const [values, setValues] = useState({});
  const [commonValues, setCommonValues] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState("subjective");

  const patientId = patient?.id ?? patient?.patientId ?? null;
  const commonStorageKey = patientId
    ? `${COMMON_STORAGE_KEY_PREFIX}_${patientId}_${COMMON_STORAGE_VERSION}`
    : null;

  useEffect(() => {
    if (!commonStorageKey) return;
    try {
      const stored = JSON.parse(
        localStorage.getItem(commonStorageKey) || "{}"
      );
      if (stored && typeof stored === "object") {
        setCommonValues(stored);
        setValues(prev => ({ ...prev, ...stored }));
      }
    } catch (e) {
      // If storage is corrupted/unavailable, we just keep defaults.
    }
  }, [commonStorageKey]);

  const onChange = (name, value) => {
    const commonPatch = COMMON_FIELD_NAMES.includes(name)
      ? getCommonPatch(name, value)
      : null;

    setValues(v => ({ ...v, ...(commonPatch || { [name]: value }) }));
    if (COMMON_FIELD_NAMES.includes(name) && commonStorageKey) {
      setCommonValues(prev => {
        const next = { ...(prev || {}), ...commonPatch };
        try {
          localStorage.setItem(commonStorageKey, JSON.stringify(next));
        } catch (e) {
          // ignore write errors
        }
        return next;
      });
    }
  };

  const handleAction = (type) => {
    if (type === "back") onBack?.();
    if (type === "clear") { setValues({}); setSubmitted(false); }
    if (type === "save") { console.log("Saved:", values); alert("Draft saved"); }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    console.log("PAED IA Speech Assessment", values);
    alert("Assessment submitted");
  };

  const activeTabIdx = tabOrder.indexOf(activeTab);

  const schemaMap = useMemo(() => {
    if (!isFollowup) return baseSchemaMap;
    return {
      ...baseSchemaMap,
      subjective: applyOptionalSections(baseSchemaMap.subjective, PAED_FEEDING_OPTIONAL_SECTIONS.subjective),
      objective: applyOptionalSections(baseSchemaMap.objective, PAED_FEEDING_OPTIONAL_SECTIONS.objective)
    };
  }, [isFollowup]);

   const commonSchema = COMMON_SCHEMA;

  return (
    <div>
      {/* ===== COMMON DETAILS (SHARED BETWEEN PAED SPEECH + FEEDING) ===== */}
      <CommonFormBuilder
           schema={NEURO_CONTAINER_SCHEMA}
           values={{}}
           onChange={() => { }}
         >
           <NeuroPatientInfo patient={patient} />
         </CommonFormBuilder>
         {/* ===== COMMON DETAILS (SHARED BETWEEN PAED SPEECH + FEEDING) ===== */}
         <CommonFormBuilder
           schema={commonSchema}
           values={commonValues}
           onChange={onChange}
           submitted={submitted}
           onAction={handleAction}
         />

      {/* ===== TABS ===== */}
      <div style={tabBar} role="tablist">
        {tabOrder.map(tab => (
          <div
            key={tab}
            role="tab"
            tabIndex={0}
            aria-selected={activeTab === tab}
            style={activeTab === tab ? tabActive : tabBtn}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setActiveTab(tab);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setActiveTab(tab);
              }
            }}
          >
            {tab.toUpperCase()}
          </div>
        ))}
      </div>

      {/* ===== FORM ===== */}
      <CommonFormBuilder
        schema={schemaMap[activeTab]}
        values={values}
        onChange={onChange}
        submitted={submitted}
        onAction={handleAction}
      >
        <div style={submitRow}>
          {activeTab !== "plan" ? (
            <button
              style={submitBtn}
              onClick={() => {
                const next = tabOrder[activeTabIdx + 1];
                if (next) setActiveTab(next);
              }}
            >
              Next
            </button>
          ) : (
            <button style={submitBtn} onClick={handleSubmit}>
              Submit Assessment
            </button>
          )}
        </div>
      </CommonFormBuilder>

    </div>
  );
}
 const NEURO_CONTAINER_SCHEMA = {
    title: "Patient Information",
    sections: [

    ]
  };

    const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString();
  };

  const today = new Date();

  const calculateDuration = (onset) => {
    if (!onset) return "-";
    const onsetDate = new Date(onset);
    const diffMs = today - onsetDate;

    if (diffMs < 0) return "-";

    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (years > 0) return `${years} yr ${months % 12} mo`;
    if (months > 0) return `${months} mo`;
    return `${days} days`;
  };
const section = {
  marginBottom: 24
};

const patientGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 12,
  fontSize: 14
};
  function NeuroPatientInfo({ patient }) {
    if (!patient) return null;

    return (
      <div style={section}>
        <div style={patientGrid}>

          <div><b>Name:</b> {patient.name}</div>
          <div><b>IC:</b> {patient.id}</div>
          <div><b>DOB:</b> {formatDate(patient.dob)}</div>
          <div><b>Age / Gender:</b> {patient.age} / {patient.sex}</div>
          <div><b>ICD:</b> {patient.icd}</div>
          <div><b>Date of Assessment:</b> {today.toLocaleDateString()}</div>
          <div><b>Date of Onset:</b> {formatDate(patient.date_of_onset)}</div>
          <div>
            <b>Duration of Diagnosis:</b>{" "}
            {calculateDuration(patient.date_of_onset)}
          </div>
          <div><b>Primary Diagnosis:</b> {patient.diagnosis_history || "-"}</div>
          <div><b>Secondary Diagnosis:</b> {patient.medical_history || "-"}</div>
          <div><b>Dominant Side:</b> {patient.dominant_side || "-"}</div>
          <div><b>Language Preference:</b> {patient.language_preference || "-"}</div>
          <div><b>Education Level:</b> {patient.education_background || "-"}</div>
          <div><b>Occupation:</b> {patient.occupation || "-"}</div>
          <div><b>Work Status:</b> {patient.employment_status || "-"}</div>
          <div><b>Driving Status:</b> {patient.driving_status || "-"}</div>
        </div>
      </div>
    );

  }
const FEEDING_SCHEMA = {
  title: "Paediatric IA – Feeding",
    actions: [
    { type: "back", label: "Back" },
  ],
  sections: [
    {
      title: "",
      fields: [

        /* ======================
           S – SUBJECTIVE
        ====================== */

        { type: "subheading", label: "Subjective" },

        {
          name: "accompaniedBy",
          label: "Patient was seen",
          type: "radio",
          options: [
            { label: "Unaccompanied", value: "unaccompanied" },
            { label: "Accompanied by parent(s)/guardian(s)", value: "accompanied" }
          ]
        },

        {
          name: "consent",
          label: "Consent (Verbal)",
          type: "textarea"
        },

        { type: "subheading", label: "Chief Complaint" },

        {
          name: "feedingConcerns",
          label: "Family / caregiver reported ",
          type: "multi-select-dropdown",
          options: [
            "Prolonged feeding time (>30 mins)",
            "Gagging / vomiting during feeds",
            "Coughing / choking during feeds",
            "Poor oral intake / refusal",
            "Drooling excessively",
            "Difficulty transitioning textures",
            "Oral aversion",
            "Picky eating / selective eating",
            "Food avoidance or refusal behaviours",
            "Tube weaning",
            "Other"
          ].map(v => ({ label: v, value: v }))
        },
        {
          name: "feedingConcerns_other",
          label: "Other (specify)",
          type: "textarea",
          showIf: { field: "feedingConcerns", includes: "Other" }
        },

        // { type: "subheading", label: "Medical History" },

        {
          name: "feedingMedicalHistory",
          label: "Medical History",
          type: "multi-select-dropdown",
          options: [
            "Neonatal Intensive Care Unit (NICU) stay",
            "Cardiorespiratory concerns",
            "Reflux",
            "Recurrent chest infections",
            "Tracheomalacia",
            "Cleft palate",
            "Tracheostomy",
            "Seizure",
            "Prematurity",
            "Developmental delay",
            "Other"
          ].map(v => ({ label: v, value: v }))
        },
        {
          name: "feedingMedicalHistory_other",
          label: "Other (specify)",
          type: "textarea",
          showIf: { field: "feedingMedicalHistory", includes: "Other" }
        },

        { type: "subheading", label: "Feeding / Dietary Information" },
        {
          type: "row",
          fields: [
            {
              name: "nutritionSource",
              label: "Main source of nutrition",
              type: "multi-select-dropdown",
              options: [
                "Oral",
                "Nasogastric Tube (NG tube)",
                "Percutaneous Endoscopic Gastrostomy (PEG)",
                "Mixed feeding"
              ].map(v => ({ label: v, value: v }))
            },
            {
              name: "oralFeedingMethod",
              label: "Feeding method – Oral",
              type: "multi-select-dropdown",
              options: ["Breastfed", "Bottle-fed", "Spoon", "Cup", "Straw"]
                .map(v => ({ label: v, value: v }))
            }
          ]
        },

        {
          type: "row",
          fields: [
            {
              name: "enteralFeedingMethod",
              label: "Feeding method – Enteral",
              type: "multi-select-dropdown",
              options: [
                "Orogastric Tube (OGT)",
                "Nasogastric Tube (NGT)",
                "Nasojejunal Tube (NJT)",
                "Gastrostomy Tube (G-tube)",
                "Jejunostomy Tube (J-tube)"
              ].map(v => ({ label: v, value: v }))
            }
          ]
        },


        {
          name: "currentFeedingRegimen",
          label: "Current feeding regimen",
          type: "textarea"
        },

        {
          type: "row",
          fields: [
            {
              name: "dietTexture",
              label: "Textures tolerated – Diet consistency",
              type: "single-select",
              options: [
                "Level 4 – Extremely thick",
                "Level 5 – Minced & moist",
                "Level 6 – Soft & bite-sized",
                "Level 7 EC – Regular Easy to chew",
                "Level 7 – Regular"
              ].map(v => ({ label: v, value: v }))
            },

            {
              name: "fluidTexture",
              label: "Fluids tolerated – IDDSI level",
              type: "single-select",
              options: [
                "Level 0 – Thin",
                "Level 1 – Slightly thick",
                "Level 2 – Mildly thick",
                "Level 3 – Moderately thick"
              ].map(v => ({ label: v, value: v }))
            }
          ]
        },

        {
          name: "preferredFoods",
          label: "Preferred foods",
          type: "textarea"
        },

        {
          name: "avoidedFoods",
          label: "Avoided foods / textures",
          type: "textarea"
        },
        {
          type: "row",
          fields: [
            {
              name: "feedingDuration",
              label: "Feeding duration per meal",
              type: "input",
              placeholder: "minutes"
            },
            {
              name: "mainFeeder",
              label: "Main feeder",
              type: "single-select",
              options: [
                { label: "Self", value: "self" },
                { label: "Caregiver", value: "caregiver" },
                { label: "Therapist", value: "therapist" }
              ]
            }
          ]
        },



        {
          name: "mealtimeEnvironment",
          label: "Mealtime environment",
          type: "textarea"
        },

        { type: "subheading", label: "Growth & Nutrition" },

        {
          type: "row",
          fields: [
            {
              name: "recentWeight",
              label: "Recent weight(kg)",
              type: "input",
              placeholder: "kg"
            },
            {
              name: "recentHeight",
              label: "Recent height(cm)",
              type: "input",
              placeholder: "cm"
            }
          ]
        },

        {
          name: "dietitianConcern",
          label: "Concerns raised by Dietitian",
          type: "single-select",
          options: [
            { label: "Yes", value: "yes" },
            { label: "No", value: "no" },
            { label: "N/A", value: "na" }
          ]
        },

        /* ---------- Developmental Feeding History ---------- */

        { type: "subheading", label: "Developmental Feeding History" },

        {
          type: "row",
          fields: [
            {
              name: "ageSolids",
              label: "Age introduced to solids(months)",
              type: "input",
              placeholder: "months"
            },
            {
              name: "textureProgression",
              label: "Progression of textures",
              type: "single-select",
              options: [
                { label: "Within Normal Limits (WNL)", value: "wnl" },
                { label: "Delayed", value: "delayed" },
                { label: "Regression", value: "regression" }
              ]
            }
          ]
        },


        /* ======================
           O – OBJECTIVE
        ====================== */

        { type: "subheading", label: "Objective" },
        { type: "subheading", label: "General Observation" },

        {
          type: "row",
          fields: [
            {
              name: "seating",
              label: "Seating in",
              type: "single-select",
              options: [
                { label: "High chair", value: "high_chair" },
                { label: "Parent lap", value: "lap" },
                { label: "Floor", value: "floor" },
                { label: "Other", value: "other" }
              ]
            },
            {
              name: "behaviourRegulation",
              label: "Behavioural regulation",
              type: "single-select",
              options: [
                { label: "Calm", value: "calm" },
                { label: "Active", value: "active" },
                { label: "Easily distracted", value: "distracted" },
                { label: "Upset", value: "upset" },
                { label: "Requires sensory input", value: "sensory" },
                                { label: "Modulation", value: "modulation" },

              ]
            }
          ]
        },

        {
          name: "seating_other",
          label: "Other (specify)",
          type: "textarea",
          showIf: {
            field: "seating",
            equals: "other"
          }
        },

        {
          type: "row",
          fields: [
            {
              name: "feedingPosition",
              label: "Position during feeding",
              type: "single-select",
              options: [
                { label: "Upright (90°)", value: "90" },
                { label: "Slightly reclined", value: "reclined" },
                { label: "60°", value: "60" },
                { label: "45°", value: "45" }
              ]
            },
            {
              name: "feeder",
              label: "Feeder",
              type: "single-select",
              options: [
                { label: "Self", value: "self" },
                { label: "Caregiver", value: "caregiver" },
                { label: "Therapist", value: "therapist" }
              ]
            }
          ]
        },

        {
          type: "row",
          fields: [
            {
              name: "engagementWithFeeder",
              label: "Engagement with feeder",
              type: "single-select",
              options: [
                { label: "Good", value: "good" },
                { label: "Reduced", value: "reduced" }
              ]
            },

          ]
        },


        { type: "subheading", label: "Oral-motor structure & function observation" },

        {
          type: "row",
          fields: [
            {
              name: "teethStructure",
              label: "Teeth",
              type: "single-select",
              options: [
                { label: "Age-appropriate", value: "age_appropriate" },
                { label: "Delayed eruption", value: "delayed" },
                { label: "Caries", value: "caries" }
              ]
            },
            {
              name: "hardPalateStructure",
              label: "Hard palate",
              type: "single-select",
              options: [
                { label: "No Abnormality Detected (NAD)", value: "nad" },
                { label: "High arch", value: "high_arch" },
                { label: "Cleft", value: "cleft" }
              ]
            }
          ]
        },

        {
          type: "row",
          fields: [
            {
              name: "softPalateStructure",
              label: "Soft palate",
              type: "single-select",
              options: [
                { label: "No Abnormality Detected (NAD)", value: "nad" },
                { label: "Reduced elevation", value: "reduced" },
                { label: "Bifid uvula", value: "bifid" },
                { label: "Scarring", value: "scarring" },
                { label: "VPI – suspected", value: "vpi" }
              ]
            },
            {
              name: "nasalResonance",
              label: "Quality of nasal resonance",
              type: "single-select",
              options: [
                { label: "Within Normal Limits (WNL)", value: "wnl" },
                { label: "Hypernasal", value: "hypernasal" },
                { label: "Hyponasal", value: "hyponasal" }
              ]
            }
          ]
        },

        {
          type: "row",
          fields: [
            {
              name: "tongueStructure",
              label: "Tongue",
              type: "single-select",
              options: [
                "No Abnormality Detected (NAD)",
                "Deviation",
                "Fasciculations",
                "Thrush",
                "Reduced ROM"
              ].map(v => ({ label: v, value: v }))
            },
            {
              name: "lipStructure",
              label: "Lips",
              type: "single-select",
              options: [
                "No Abnormality Detected (NAD)",
                "Reduced seal",
                "Asymmetry",
                "Cleft",
                "Scarring"
              ].map(v => ({ label: v, value: v }))
            }
          ]
        },

        {
          name: "oralStructureRemarks",
          label: "Remarks",
          type: "textarea"
        },




        { type: "subheading", label: "Oral-Motor Examination" },

        {
          type: "row",
          fields: [
            {
              name: "lipSealExam",
              label: "Lips: Seal",
              type: "single-select",
              options: [
                { label: "Adequate", value: "adequate" },
                { label: "Inadequate", value: "inadequate" },
                { label: "Drooling", value: "drooling" }
              ]
            },
            {
              name: "tongueROMExam",
              label: "Tongue: ROM",
              type: "single-select",
              options: [
                { label: "Adequate", value: "adequate" },
                { label: "Reduced", value: "reduced" },
                { label: "Thrust", value: "thrust" },
                { label: "Restriction", value: "restriction" }
              ]
            }
          ]
        },

        {
          type: "row",
          fields: [
            {
              name: "palateExam",
              label: "Hard & Soft Palate",
              type: "single-select",
              options: [
                { label: "No Abnormality Detected (NAD)", value: "nad" },
                { label: "High-arched", value: "high_arch" },
                { label: "Cleft", value: "cleft" }
              ]
            },
            {
              name: "teethExam",
              label: "Teeth",
              type: "single-select",
              options: [
                { label: "Age-appropriate", value: "age_appropriate" },
                { label: "Delayed eruption", value: "delayed" },
                { label: "Caries", value: "caries" }
              ]
            }
          ]
        },

        {
          type: "row",
          fields: [
            {
              name: "jawStability",
              label: "Jaw stability",
              type: "single-select",
              options: [
                { label: "Good", value: "good" },
                { label: "Poor", value: "poor" },
                { label: "Bite reflex", value: "bite_reflex" }
              ]
            },
            {
              name: "ssbCoordination",
              label: "Suck–swallow–breathe coordination",
              type: "single-select",
              options: [
                { label: "Adequate", value: "adequate" },
                { label: "Disrupted", value: "disrupted" }
              ]
            }
          ]
        },


        { type: "subheading", label: "Cranial Nerves" },

        {
          type: "row",
          fields: [
            {
              name: "cn5",
              label: "CN V – Chewing strength",
              type: "single-select",
              options: [
                { label: "Within Normal Limits (WNL)", value: "wnl" },
                { label: "Reduced", value: "reduced" }
              ]
            },
            {
              name: "cn7",
              label: "CN VII – Symmetry",
              type: "single-select",
              options: [
                { label: "Within Normal Limits (WNL)", value: "wnl" },
                { label: "Asymmetrical", value: "asymmetrical" }
              ]
            }
          ]
        },

        {
          type: "row",
          fields: [
            {
              name: "cn9_10",
              label: "CN IX/X – Gag / Voice",
              type: "single-select",
              options: [
                "Gag present",
                "Gag reduced",
                "Voice clear",
                "Voice wet"
              ].map(v => ({ label: v, value: v }))
            },
            {
              name: "cn12",
              label: "CN XII – Tongue function",
              type: "single-select",
              options: [
                { label: "Within Normal Limits (WNL)", value: "wnl" },
                { label: "Reduced", value: "reduced" }
              ]
            }
          ]
        },


        { type: "subheading", label: "Feeding Observation" },
        // { type: "subheading", label: "Consistencies & Amount Trialled" },

        {
          name: "fluidConsistency",
          label: "Consistencies & Amount Trialled Fluids",
          type: "multi-select-dropdown",
          options: [
            "Level 0 – Thin",
            "Level 1 – Slightly thick",
            "Level 2 – Mildly thick",
            "Level 3 – Moderately thick",
            "Level 4 – Extremely thick",

          ].map(v => ({ label: v, value: v }))
        },
        {
          name: "fluidConsistencyNotes",
          type: "multi-notes",
          source: "fluidConsistency"
        },

        {
          name: "foodConsistency",
          label: "Consistencies & Amount Trialled Food",
          type: "multi-select-dropdown",
          options: [

            "Level 4 – Extremely thick",
            "Level 5 – Minced & moist",
            "Level 6 – Soft & bite-sized",
            "Level 7 EC – Regular",
            "Level 7 – Regular"
          ].map(v => ({ label: v, value: v }))
        },
        {
          name: "foodConsistencyNotes",
          type: "multi-notes",
          source: "foodConsistency"
        },

        {
          name: "feedingMethodObserved",
          label: "Method of feeding",
          type: "multi-select-dropdown",
          options: ["Bottle", "Breast", "Spoon", "Cup", "Straw"]
            .map(v => ({ label: v, value: v }))
        },

        { type: "subheading", label: "Oral Phase Observations" },

{
  type: "row",
  fields: [
    {
      name: "oralAcceptance",
      label: "Oral acceptance",
      type: "single-select",
      options: [
        { label: "Good", value: "good" },
        { label: "Limited", value: "limited" },
        { label: "Refused", value: "refused" }
      ]
    },

    {
      name: "lipSealUtensil",
      label: "Lip seal on utensil",
      type: "single-select",
      options: [
        { label: "Adequate", value: "adequate" },
        { label: "Poor", value: "poor" }
      ]
    }
  ]
},

{
  type: "row",
  fields: [
    {
      name: "bolusControl",
      label: "Bolus control",
      type: "single-select",
      options: [
        { label: "Within Normal Limits (WNL)", value: "wnl" },
        { label: "Loss anterior", value: "loss_anterior" },
        { label: "Loss lateral", value: "loss_lateral" }
      ]
    },

    {
      name: "mastication",
      label: "Mastication",
      type: "single-select",
      options: [
        { label: "Efficient", value: "efficient" },
        { label: "Munching only", value: "munching" },
        { label: "Poor", value: "poor" }
      ]
    }
  ]
},


        {
          name: "oralResidue",
          label: "Oral residue",
          type: "radio",
          options: [
            { label: "Yes", value: "YES" },
            { label: "No", value: "NO" }
          ]
        },

        { type: "subheading", label: "Pharyngeal Phase Observations" },

     {
  name: "nasalRegurgitation",
  label: "Nasal regurgitation",
  type: "radio",
  options: [
    { label: "Yes", value: "YES" },
    { label: "No", value: "NO" }
  ]
},

{
  name: "coughPresent",
  label: "Cough / throat clear",
  type: "radio",
  options: [
    { label: "Yes", value: "YES" },
    { label: "No", value: "NO" }
  ]
},

{
  name: "coughSigns",
  label: "Cough Signs",
  type: "single-select",
  options: ["Cough", "Wet voice", "Colour change", "Stress cues"]
    .map(v => ({ label: v, value: v })),
  showIf: {
    field: "coughPresent",
    equals: "YES"
  }
},


        {
          name: "voicePostSwallow",
          label: "Voice post-swallow",
          type: "single-select",
          options: [
            { label: "Clear", value: "clear" },
            { label: "Wet", value: "wet" },
            { label: "Aphonia", value: "aphonia" }
          ]
        },

        {
          name: "cervicalAuscultation",
          label: "Cervical auscultation",
          type: "single-select",
          options: [
            { label: "Normal", value: "normal" },
            { label: "Reduced", value: "reduced" },
            { label: "Wet / gurgly", value: "wet" },
            { label: "N/A", value: "na" }
          ]
        },

        { type: "subheading", label: "Other Observations" },

        {
          name: "respiration",
          label: "Respiration",
          type: "single-select",
          options: [
            { label: "Stable", value: "stable" },
            { label: "Desaturation", value: "desaturation" },
            { label: "Increased WOB", value: "wob" }
          ]
        },

        {
          type: "row",
          fields: [

            {
              label: "spo2 Baseline",
              type: "input",
              inlineLabel: "SPO2 baseline:",
              placeholder: "%"
            },

            {
              label: "spo2 Post",
              type: "input",
              inlineLabel: "SPO2 post exposure:",
              placeholder: "%"
            },
          ]
        },


        {
          name: "mealtimeDuration",
          label: "Mealtime duration",
          type: "single-select",
          options: [
            { label: "< 30 mins", value: "<30" },
            { label: "> 30 mins", value: ">30" }
          ]
        },

        {
          type: "subheading",
          label: "Behavioural / sensory during feeding"
        },
        {
          name: "behaviouralFeeding",
          label: "Behavioural / sensory during feeding",
          type: "multi-select-dropdown",
          options: [
            "Refusal",
            "Turn head away",
            "Accepts with prompting",
            "Self-feeding attempts",
            "Accepts new texture",
            "Tolerates tactile input",
            "Gags on sight/smell",
            "Crying / fussiness",
            "Other"
          ].map(v => ({ label: v, value: v }))
        },
        {
          name: "behaviouralFeeding_other",
          label: "Other (specify)",
          type: "textarea",
          showIf: {
            field: "behaviouralFeeding",
            includes: "Other"
          }
        },


        /* ======================
           A – ANALYSIS
        ====================== */

        { type: "subheading", label: "Assessment" },

        {
          name: "feedingDiagnosis",
          label: "Diagnoses / Findings",
          type: "multi-select-dropdown",
          options: [
            "No feeding or swallowing difficulties observed",
            "Feeding disorder ",
            "Dysphagia "
          ].map(v => ({ label: v, value: v }))
        },

        {
          name: "feedingCharacteristics",
          label: "Characteristics",
          type: "multi-select-dropdown",
          options: [
            "Oral phase",
            "Pharyngeal phase",
            "Feeding skills",
            "Sensory regulation"
          ].map(v => ({ label: v, value: v }))
        },
        

        /* ======================
           P – PLAN
        ====================== */

        { type: "subheading", label: "Plan" },


        {
          name: "referralSpecialist",
          label: "Others",
          type: "textarea"
        },


      ]
    }
  ]
};

const FEEDING_BASE_FIELDS = FEEDING_SCHEMA.sections?.[0]?.fields || [];

const COMMON_SCHEMA = {
  title: "",
  sections: [
    {
      title: "",
      fields: [
        {
          name: "accompaniedBy",
          label: "Patient was seen",
          type: "radio",
          options: [
            { label: "Unaccompanied", value: "unaccompanied" },
            { label: "Accompanied by parent(s)/guardian(s)", value: "accompanied" }
          ]
        },
        {
          name: "consent",
          label: "Consent (Verbal)",
          type: "textarea"
        },
        { type: "subheading", label: "General Observation" },
        {
          name: "seating",
          label: "Seating in",
          type: "radio",
          options: [
            { label: "Chair", value: "chair" },
            { label: "Wheel chair", value: "wheelchair" },
            { label: "High chair", value: "high_chair" },
            { label: "Parent lap", value: "lap" },
            { label: "Floor", value: "floor" },
            { label: "Other", value: "other" }
          ]
        },
        {
          name: "seating_other",
          label: "Other (specify)",
          type: "textarea",
          showIf: {
            field: "seating",
            equals: "other"
          }
        },
        {
          name: "behaviourRegulation",
          label: "Behavioural regulation",
          type: "radio",
          options: [
            { label: "Calm", value: "calm" },
            { label: "Active", value: "active" },
            { label: "Easily distracted", value: "distracted" },
            { label: "Upset", value: "upset" },
            { label: "Requires sensory input", value: "sensory" },
            { label: "Modulation", value: "modulation" }
          ]
        },
        { type: "subheading", label: "Oral-motor structure & function observation" },
        {
          name: "teethStructure",
          label: "Teeth",
          type: "radio",
          options: [
            { label: "Complete", value: "Complete" },
            { label: "Incomplete", value: "Incomplete" },
            { label: "Age-appropriate", value: "age_appropriate" },
            { label: "Delayed eruption", value: "delayed" },
            { label: "Caries", value: "caries" }
          ]
        },
        {
          name: "hardPalateStructure",
          label: "Hard palate",
          type: "radio",
          options: [
            { label: "No Acute Distress (NAD)", value: "No Acute Distress (NAD)" },
            { label: "No Abnormality Detected (NAD)", value: "nad" },
            { label: "High arch", value: "high_arch" },
            { label: "Cleft", value: "cleft" }
          ]
        },
        {
          name: "softPalateStructure",
          label: "Soft palate",
          labelAbove:true,
          type: "radio",
          options: [
            { label: "No Acute Distress (NAD)", value: "No Acute Distress (NAD)" },
            { label: "No Abnormality Detected (NAD)", value: "nad" },
            { label: "Reduced elevation", value: "reduced" },
            { label: "Bifid uvula", value: "bifid" },
            { label: "Scarring", value: "scarring" },
            { label: "VPI - suspected", value: "vpi" }
          ]
        },
        {
          name: "nasalResonance",
          label: "Quality of nasal resonance",
          type: "radio",
          options: [
            { label: "WNL (Within Normal Limits)", value: "wnl" },
            { label: "Hypernasal", value: "hypernasal" },
            { label: "Hyponasal", value: "hyponasal" }
          ]
        },
        {
          name: "tongueStructure",
          label: "Tongue",
          type: "radio",
          labelAbove:true,
          options: [
            "No Acute Distress (NAD)",
            "No Abnormality Detected (NAD)",
            "Deviation",
            "Fasciculations",
            "Thrush",
            "Reduced ROM"
          ].map(v => ({ label: v, value: v }))
        },
        {
          name: "lipStructure",
          label: "Lips",
          type: "radio",
          labelAbove:true,
          options: [
            "No Acute Distress (NAD)",
            "No Abnormality Detected (NAD)",
            "Reduced seal",
            "Asymmetry",
            "Cleft",
            "Scarring"
          ].map(v => ({ label: v, value: v }))
        },
        {
          name: "oralStructureRemarks",
          label: "Remarks",
          type: "textarea"
        }
      ]
    }
  ]
};

const tabOrder = ["subjective", "objective", "assessment", "plan"];

const markerIndex = (label) =>
  FEEDING_BASE_FIELDS.findIndex(
    f => f?.type === "subheading" && f?.label === label
  );

const idxSubjective = markerIndex("Subjective");
const idxObjective = markerIndex("Objective");
const idxAssessment = markerIndex("Assessment");
const idxPlan = markerIndex("Plan");

function convertFieldTypes(field) {
  if (!field || typeof field !== "object") return field;

  if (field.type === "single-select") {
    return { ...field, type: "radio" };
  }

  if (field.type === "multi-select-dropdown") {
    return { ...field, type: "checkbox-group" };
  }

  if (field.type === "row" && Array.isArray(field.fields)) {
    return {
      ...field,
      fields: field.fields.map(convertFieldTypes)
    };
  }

  return field;
}

function transformFields(fields) {
  return (fields || []).flatMap(field => {
    if (field?.type === "row" && Array.isArray(field.fields)) {
      const convertedChildren = field.fields.map(convertFieldTypes);
      const allCheckboxGroups =
        convertedChildren.length > 0 &&
        convertedChildren.every(c => c?.type === "checkbox-group");

      const allRadios =
        convertedChildren.length > 0 &&
        convertedChildren.every(c => c?.type === "radio");

      // If the row is only for checkbox-group layout, flatten it so labels don't duplicate.
      if (allCheckboxGroups || allRadios) return convertedChildren;

      return [{ ...field, fields: convertedChildren }];
    }

    return [convertFieldTypes(field)];
  });
}

const SUBJECTIVE_FIELDS = FEEDING_BASE_FIELDS.slice(
  idxSubjective + 1,
  idxObjective
).filter(f => !COMMON_FIELD_NAMES.includes(f?.name));
const OBJECTIVE_FIELDS = FEEDING_BASE_FIELDS.slice(
  idxObjective + 1,
  idxAssessment
).filter(
  f => {
    if (
      f?.type === "subheading" &&
      [
        "General Observation",
        "Oral-motor structure & function observation"
      ].includes(f?.label)
    ) {
      return false;
    }

    return ![
      "seating",
      "seating_other",
      "behaviourRegulation",
      "teethStructure",
      "hardPalateStructure",
      "softPalateStructure",
      "nasalResonance",
      "tongueStructure",
      "lipStructure",
      "oralStructureRemarks"
    ].includes(f?.name);
  }
);
const ASSESSMENT_FIELDS = FEEDING_BASE_FIELDS.slice(
  idxAssessment + 1,
  idxPlan
);
const PLAN_FIELDS = FEEDING_BASE_FIELDS.slice(idxPlan + 1);

const SOAP_ACTIONS = [
  { type: "back", label: "Back" },
  { type: "clear", label: "Clear" },
  { type: "save", label: "Save" }
];

const baseSchemaMap = {
  subjective: {
    title: "Subjective",
    actions: SOAP_ACTIONS,
    sections: [{ title: "", fields: transformFields(SUBJECTIVE_FIELDS) }]
  },
  objective: {
    title: "Objective",
    actions: SOAP_ACTIONS,
    sections: [{ title: "", fields: transformFields(OBJECTIVE_FIELDS) }]
  },
  assessment: {
    title: "Assessment",
    actions: SOAP_ACTIONS,
    sections: [{ title: "", fields: transformFields(ASSESSMENT_FIELDS) }]
  },
  plan: {
    title: "Plan",
    actions: SOAP_ACTIONS,
    sections: [{ title: "", fields: transformFields(PLAN_FIELDS) }]
  }
};

/* ================= STYLES ================= */
const tabBar = {
  display: "flex",
  gap: 12,
  justifyContent: "center",
  borderBottom: "1px solid #ddd",
  marginBottom: 12
};

const tabBtn = {
  padding: "10px 22px",
  fontWeight: 600,
  cursor: "pointer"
};

const tabActive = {
  ...tabBtn,
  borderBottom: "3px solid #2563EB",
  color: "#2563EB"
};

const submitRow = {
  display: "flex",
  justifyContent: "flex-end",
  marginTop: 16
};

const submitBtn = {
  padding: "12px 32px",
  background: "#2563EB",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  fontWeight: 600
};