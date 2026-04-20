import React, { useEffect, useState } from "react";
import MMTForm from "./MMTForm";
import ROMForm from "./ROMForm";
import BRATForm from "./BRATForm";
import LEFSForm from "./LEFS";
import IsometricTestForm from "./IsometricTestForm";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";
import PatientCard from "../../../shared/cards/PatientCard";
import generalImg from "../../../assets/General.png";
import upperLimbImg from "../../../assets/Upper Limb.png";
import lowerLimbImg from "../../../assets/LowerLimb.png";


const YES_NO_OPTIONS = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" }
];

// Maps msk_primary_region values to the region keys ROMForm understands,
// applying the section visibility rules for Musculoskeletal.
function MSKROMForm({ values, onChange }) {
  const primaryRegion = values?.msk_primary_region || [];

  // Build the region array ROMForm expects:
  // Cervical + Thoracolumbar = "spine" (show for all)
  // Shoulder/Elbow/Wrist     = "upper_limb" (Upper Limb | General)
  // Hip/Knee/Ankle           = "lower_limb" (Lower Limb | General)
  const mappedRegion = ["spine"]; // cervical + thoracolumbar always
  if (primaryRegion.includes("upper_limb") || primaryRegion.includes("spine_general")) {
    mappedRegion.push("upper_limb");
  }
  if (primaryRegion.includes("lower_limb") || primaryRegion.includes("spine_general")) {
    mappedRegion.push("lower_limb");
  }

  const mappedValues = { ...values, region: mappedRegion };
  return <ROMForm values={mappedValues} onChange={onChange} />;
}

const MUSCULOSKELETAL_ASSESSMENT_REGISTRY = {
  mmt: MMTForm,
  rom: MSKROMForm,
  brat: BRATForm,
  lefs: LEFSForm,
  isometric: IsometricTestForm,
}

const MSK_CONTAINER_SCHEMA = {
  title: "Patient Information",
  sections: []
};

const CONSENT_AND_REFERRAL_SCHEMA = {
  title: "",
  sections: [
    {
      fields: [
        {
          name: "consent_risks_benefits",
          type: "checkbox-group",
          options: [{ label: "Risks/benefits explained", value: "yes" }]
        },
        {
          name: "consent_verbalized",
          type: "checkbox-group",
          options: [{ label: "Patient verbalized understanding", value: "yes" }]
        },
        {
          type: "row",
          fields: [
            {
              name: "consent_obtained",
              type: "checkbox-group",
              options: [{ label: "Consent obtained", value: "yes" }]
            },
            {
              name: "consent_upload",
              label: "Upload",
              type: "file-upload",
              showIf: { field: "consent_obtained", includes: "yes" }
            }
          ]
        },
        {
          name: "hep_reviewed",
          type: "checkbox-group",
          options: [
            {
              label: "Home Exercise Program (HEP) reviewed and demonstrated",
              value: "yes"
            }
          ]
        },
        {
          name: "current_diagnosis",
          label: "Current Diagnosis",
          type: "multi-select-dropdown",
          options: [
            { label: "Stroke", value: "stroke" },
            { label: "Traumatic Brain Injury", value: "tbi" },
            { label: "Parkinson Disease", value: "parkinson" },
            { label: "Spinal Cord Injury", value: "sci" },
            { label: "Peripheral Neuropathy", value: "peripheral_neuropathy" },
            { label: "Ligament injuries", value: "ligament_injuries" },
            { label: "Ataxia", value: "ataxia" },
            { label: "Others", value: "others" }
          ]
        },
        {
          name: "current_diagnosis_other",
          label: "Other Diagnosis (specify)",
          type: "textarea",
          showIf: { field: "current_diagnosis", includes: "others" }
        },
        {
          name: "equipment_owned",
          label: "List of Equipment Owned",
          type: "checkbox-group",
          options: [
            { label: "PERKESO", value: "perkeso" },
            { label: "NGO", value: "ngo" },
            { label: "Self-purchased", value: "self" },
            { label: "Others", value: "others" }
          ]
        },
        {
          name: "equipment_perkeso",
          label: "PERKESO Equipment Details",
          type: "textarea",
          showIf: { field: "equipment_owned", includes: "perkeso" }
        },
        {
          name: "equipment_ngo",
          label: "NGO Equipment Details",
          type: "textarea",
          showIf: { field: "equipment_owned", includes: "ngo" }
        },
        {
          name: "equipment_self",
          label: "Self-purchased Equipment Details",
          type: "textarea",
          showIf: { field: "equipment_owned", includes: "self" }
        },
        {
          name: "equipment_others",
          label: "Other Equipment Details",
          type: "textarea",
          showIf: { field: "equipment_owned", includes: "others" }
        },
        { type: "subheading", label: "Referral Information" },
        {
          name: "referred_by",
          label: "Referred by",
          type: "input",
          readOnly: true
        },
        {
          name: "referral_reasons",
          label: "Referral Reasons",
          type: "textarea",
          readOnly: true
        }
      ]
    }
  ]
};

const SUBJECTIVE_SCHEMA = {
  actions: [
    { type: "back", label: "Back" },
    { type: "clear", label: "Clear" },
    { type: "save", label: "Save" }
  ],
  sections: [
    {
      fields: [
        /* ── Chief Complaint ── */
        {
          name: "msk_chief_complaint",
          label: "Chief Complaint",
          type: "textarea"
        },

        /* ── History of Presenting Illness ── */
        {
          name: "msk_hpi",
          label: "History of Presenting Illness",
          type: "textarea"
        },

        /* ── Primary Region ── */
        {
          name: "msk_primary_region",
          label: "Primary Region",
          type: "checkbox-group",
          options: [
            { label: "Spine/General", value: "spine_general" },
            { label: "Upper Limb",    value: "upper_limb"    },
            { label: "Lower Limb",    value: "lower_limb"    }
          ]
        },

        /* ── Body Chart ── */
        {
          name: "_body_chart",
          type: "custom",
          render: ({ values }) => {
            const regions = values.msk_primary_region || [];
            if (!regions.length) return null;
            const charts = [
              { value: "spine_general", label: "Spine/General", src: generalImg },
              { value: "upper_limb",    label: "Upper Limb",    src: upperLimbImg },
              { value: "lower_limb",    label: "Lower Limb",    src: lowerLimbImg }
            ].filter(c => regions.includes(c.value));
            return (
              <div style={{ margin: "12px 0" }}>
                <div style={{ fontWeight: 600, fontSize: 13, color: "#475569", marginBottom: 10 }}>Body Chart</div>
                <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                  {charts.map(c => (
                    <div key={c.value} style={{ textAlign: "center" }}>
                      <div style={{ fontSize: 12, color: "#64748b", marginBottom: 4 }}>{c.label}</div>
                      <img src={c.src} alt={c.label} style={{ maxHeight: 260, borderRadius: 8, border: "1px solid #e2e8f0", objectFit: "contain" }} />
                    </div>
                  ))}
                </div>
              </div>
            );
          }
        },

        /* ── Functional Limitation ── */
        {
          name: "msk_functional_limitation",
          label: "Functional Limitation",
          type: "radio",
          options: YES_NO_OPTIONS
        },
        {
          name: "msk_functional_limitation_specify",
          label: "Specify",
          type: "input",
          showIf: { field: "msk_functional_limitation", equals: "yes" }
        },

        /* ── Sleep Issue ── */
        {
          name: "msk_sleep_issue",
          label: "Sleep Issue",
          type: "radio",
          options: YES_NO_OPTIONS
        },
        {
          name: "msk_sleep_issue_specify",
          label: "Specify",
          type: "input",
          showIf: { field: "msk_sleep_issue", equals: "yes" }
        },

        /* ── Smoking / Alcohol ── */
        {
          name: "msk_smoking_alcohol",
          label: "Smoking/Alcohol",
          type: "radio",
          options: YES_NO_OPTIONS
        },
        {
          name: "msk_smoking_alcohol_specify",
          label: "Specify",
          type: "input",
          showIf: { field: "msk_smoking_alcohol", equals: "yes" }
        },

        /* ── Spine/General conditional set ── */
        {
          name: "msk_cough_sneezing",
          label: "Cough/Sneezing",
          type: "radio",
          options: YES_NO_OPTIONS,
          showIf: { field: "msk_primary_region", includes: "spine_general" }
        },
        {
          name: "msk_cough_sneezing_specify",
          label: "Specify",
          type: "input",
          showIf: { field: "msk_cough_sneezing", equals: "yes", and: { field: "msk_primary_region", includes: "spine_general" } }
        },
        {
          name: "msk_incontinence",
          label: "Incontinence",
          type: "radio",
          options: YES_NO_OPTIONS,
          showIf: { field: "msk_primary_region", includes: "spine_general" }
        },
        {
          name: "msk_incontinence_specify",
          label: "Specify",
          type: "input",
          showIf: { field: "msk_incontinence", equals: "yes", and: { field: "msk_primary_region", includes: "spine_general" } }
        },
        {
          name: "msk_headache_vertigo",
          label: "Headache/Vertigo",
          type: "radio",
          options: YES_NO_OPTIONS,
          showIf: { field: "msk_primary_region", includes: "spine_general" }
        },
        {
          name: "msk_headache_vertigo_specify",
          label: "Specify",
          type: "input",
          showIf: { field: "msk_headache_vertigo", equals: "yes", and: { field: "msk_primary_region", includes: "spine_general" } }
        },

        /* ── Upper / Lower Limb conditional set ── */
        {
          name: "msk_dominant",
          label: "Dominant",
          type: "radio",
          options: [
            { label: "Left",  value: "left"  },
            { label: "Right", value: "right" }
          ],
          showIf: { or: [
            { field: "msk_primary_region", includes: "upper_limb" },
            { field: "msk_primary_region", includes: "lower_limb" }
          ]}
        },

        /* ── Nature of Work ── */
        {
          name: "msk_nature_of_work",
          label: "Nature of Work",
          type: "textarea"
        },

        /* ── Client Goals ── */
        {
          name: "msk_client_goals",
          label: "Client Goals",
          type: "checkbox-group",
          options: [
            { label: "Pain reduction",    value: "pain_reduction"    },
            { label: "Return to work",    value: "return_to_work"    },
            { label: "Improve ROM",       value: "improve_rom"       },
            { label: "Improve strength",  value: "improve_strength"  },
            { label: "Improve function",  value: "improve_function"  },
            { label: "Return to sport",   value: "return_to_sport"   },
            { label: "Others",            value: "others"            }
          ]
        },
        {
          name: "msk_client_goals_other",
          label: "Specify",
          type: "input",
          showIf: { field: "msk_client_goals", includes: "others" }
        }
      ]
    }
  ]
};

const AMBULATORY_OPTIONS = [
  { label: "Independent walking", value: "independent" },
  { label: "Wheelchair", value: "wheelchair" },
  { label: "Quadripod narrow base", value: "quadripod_narrow" },
  { label: "Quadripod wide base", value: "quadripod_wide" },
  { label: "Walking stick", value: "stick" },
  { label: "Walking frame", value: "frame" },
  { label: "Elbow crutches", value: "crutches" },
  { label: "Others", value: "others" }
];

const OBJECTIVE_SCHEMA = {
  title: "OBJECTIVE",
  actions: SUBJECTIVE_SCHEMA.actions,
  sections: [
    {
      fields: [

        /* ══════════════════════════════════════════
           STANDARD ALIGNMENT
           Shown for ALL regions EXCEPT Upper Limb
        ══════════════════════════════════════════ */
        {
          type: "subheading", label: "Standard Alignment",
          showIf: { or: [
            { field: "msk_primary_region", includes: "spine_general" },
            { field: "msk_primary_region", includes: "lower_limb" }
          ]}
        },
        {
          name: "obj_postural_type",
          label: "Postural Type",
          type: "radio",
          showIf: { or: [
            { field: "msk_primary_region", includes: "spine_general" },
            { field: "msk_primary_region", includes: "lower_limb" }
          ]},
          options: [
            { label: "Normal",        value: "normal"        },
            { label: "Flat back",     value: "flat_back"     },
            { label: "Swayback",      value: "swayback"      },
            { label: "Lordotic",      value: "lordotic"      },
            { label: "Ext neck",      value: "ext_neck"      },
            { label: "Forward head",  value: "forward_head"  },
            { label: "Scoliosis",     value: "scoliosis"     },
            { label: "Kyphotic",      value: "kyphotic"      }
          ]
        },
        {
          name: "obj_iliac_crest",
          label: "Iliac Crest Level",
          type: "radio",
          showIf: { or: [
            { field: "msk_primary_region", includes: "spine_general" },
            { field: "msk_primary_region", includes: "lower_limb" }
          ]},
          options: [
            { label: "Symmetrical",   value: "symmetrical"  },
            { label: "Right higher",  value: "right_higher" },
            { label: "Left higher",   value: "left_higher"  }
          ]
        },
        {
          name: "obj_pelvic_tilt",
          label: "Pelvic Tilt",
          type: "radio",
          showIf: { or: [
            { field: "msk_primary_region", includes: "spine_general" },
            { field: "msk_primary_region", includes: "lower_limb" }
          ]},
          options: [
            { label: "Normal",          value: "normal"          },
            { label: "Posterior",       value: "posterior"       },
            { label: "Anterior",        value: "anterior"        },
            { label: "Lateral tilt",    value: "lateral_tilt"    },
            { label: "Rotation Left",   value: "rotation_left"   },
            { label: "Rotation Right",  value: "rotation_right"  }
          ]
        },
        {
          name: "obj_hip",
          label: "Hip",
          type: "radio",
          showIf: { or: [
            { field: "msk_primary_region", includes: "spine_general" },
            { field: "msk_primary_region", includes: "lower_limb" }
          ]},
          options: [
            { label: "Flexed",            value: "flexed"           },
            { label: "Extended",          value: "extended"         },
            { label: "Medial Rotation",   value: "medial_rotation"  },
            { label: "Lateral Rotation",  value: "lateral_rotation" }
          ]
        },
        {
          name: "obj_knees",
          label: "Knees",
          type: "radio",
          showIf: { or: [
            { field: "msk_primary_region", includes: "spine_general" },
            { field: "msk_primary_region", includes: "lower_limb" }
          ]},
          options: [
            { label: "Hyperextended", value: "hyperextended" },
            { label: "Flexed",        value: "flexed"        },
            { label: "Valgus",        value: "valgus"        },
            { label: "Varum",         value: "varum"         }
          ]
        },
        {
          name: "obj_tibia",
          label: "Tibia",
          type: "radio",
          showIf: { or: [
            { field: "msk_primary_region", includes: "spine_general" },
            { field: "msk_primary_region", includes: "lower_limb" }
          ]},
          options: [
            { label: "Torsion Left",  value: "torsion_left"  },
            { label: "Torsion Right", value: "torsion_right" }
          ]
        },
        {
          name: "obj_foot",
          label: "Foot",
          type: "radio",
          showIf: { or: [
            { field: "msk_primary_region", includes: "spine_general" },
            { field: "msk_primary_region", includes: "lower_limb" }
          ]},
          options: [
            { label: "Pronated",  value: "pronated"  },
            { label: "Supinated", value: "supinated" },
            { label: "Normal",    value: "normal"    }
          ]
        },

        /* ── Scapula [SPINE | GENERAL only] ── */
        {
          name: "obj_scapula_spine",
          label: "Scapula",
          type: "radio",
          showIf: { field: "msk_primary_region", includes: "spine_general" },
          options: [
            { label: "Bil. Elevated",  value: "bil_elevated"  },
            { label: "Anterior tilt",  value: "anterior_tilt" },
            { label: "Winging",        value: "winging"       },
            { label: "Abducted",       value: "abducted"      },
            { label: "Normal",         value: "normal"        }
          ]
        },

        /* ══════════════════════════════════════════
           UPPER LIMB SIMPLIFIED ALIGNMENT
           [UPPER LIMB only]
        ══════════════════════════════════════════ */
        {
          type: "subheading", label: "Upper Limb Simplified Alignment",
          showIf: { field: "msk_primary_region", includes: "upper_limb" }
        },
        {
          name: "obj_ul_postural_type",
          label: "Postural Type",
          type: "radio",
          showIf: { field: "msk_primary_region", includes: "upper_limb" },
          options: [
            { label: "Forward head", value: "forward_head" },
            { label: "Kyphotic",     value: "kyphotic"     },
            { label: "Normal",       value: "normal"       }
          ]
        },
        {
          name: "obj_ul_scapula",
          label: "Scapula",
          type: "radio",
          showIf: { field: "msk_primary_region", includes: "upper_limb" },
          options: [
            { label: "Elevated", value: "elevated" },
            { label: "Normal",   value: "normal"   },
            { label: "Winging",  value: "winging"  }
          ]
        },
        {
          name: "obj_ul_shoulder",
          label: "Shoulder",
          type: "radio",
          showIf: { field: "msk_primary_region", includes: "upper_limb" },
          options: [
            { label: "Rounded",             value: "rounded"             },
            { label: "Internally rotated",  value: "internally_rotated"  },
            { label: "Normal",              value: "normal"              }
          ]
        },

        /* ══════════════════════════════════════════
           PALPATION FINDINGS
           [LOWER LIMB | UPPER LIMB only]
        ══════════════════════════════════════════ */
        {
          name: "obj_palpation_findings",
          label: "Palpation Findings",
          type: "input",
          showIf: { or: [
            { field: "msk_primary_region", includes: "upper_limb" },
            { field: "msk_primary_region", includes: "lower_limb" }
          ]}
        },

        /* ══════════════════════════════════════════
           SCALES
        ══════════════════════════════════════════ */
        { type: "subheading", label: "Scales" },
        {
          name: "msk_scales",
          type: "assessment-launcher",
          options: [
            { label: "Oswestry Disability Index",           value: "oswestry",   regions: ["spine_general"] },
            { label: "Neck Disability Index",               value: "ndi",        regions: ["spine_general"] },
            { label: "Lower Extremity Functional Scale (LEFS)", value: "lefs",   regions: ["lower_limb"] },
            { label: "Upper Limb Functional Scale (ULFS)",  value: "ulfs",       regions: ["spine_general", "upper_limb"] },
            { label: "Brachial Assessment Tool (BRAT)",     value: "brat",       regions: ["spine_general", "upper_limb"] },
            { label: "ROM",                                 value: "rom",        regions: [] },
            { label: "MMT",                                 value: "mmt",        regions: [] },
            { label: "Isometric Test",                      value: "isometric",  regions: [] }
          ],
          filterByRegionField: "msk_primary_region"
        },

        /* ══════════════════════════════════════════
           SPECIAL TESTS
        ══════════════════════════════════════════ */
        { type: "subheading", label: "Special Tests" },
        {
          name: "msk_special_tests",
          type: "assessment-launcher",
          options: [
            { label: "Muscle Length Test",                                        value: "muscle_length",        regions: [] },
            { label: "Balance Test",                                              value: "balance_test",         regions: [] },
            { label: "Neurodynamic Test",                                         value: "neurodynamic",         regions: ["spine_general"] },
            { label: "PAIVM",                                                     value: "paivm",                regions: ["spine_general"] },
            { label: "Compression / Distraction Test",                            value: "compression",          regions: ["spine_general"] },
            { label: "Lower Limb Discrepancy Test",                               value: "lld_general",          regions: ["spine_general"] },
            { label: "Muscle Length Test",                                         value: "ml_lower",             regions: ["lower_limb"] },
            { label: "Functional Test",                                           value: "func_lower",           regions: ["lower_limb"] },
            { label: "Lower Limb Discrepancy — True Leg Length",                  value: "true_leg_length",      regions: ["lower_limb"] },
            { label: "Lower Limb Discrepancy — Apparent Leg Length",              value: "apparent_leg_length",  regions: ["lower_limb"] },
            { label: "Q-Angle Measurement",                                       value: "q_angle",              regions: ["lower_limb"] },
            { label: "Instability Test",                                          value: "instability",         regions: ["upper_limb"] },
            { label: "Special Test",                                              value: "special_upper",        regions: ["upper_limb"] },
            { label: "Functional Test",                                           value: "func_upper",           regions: ["upper_limb"] }
          ],
          filterByRegionField: "msk_primary_region"
        }

      ]
    }
  ]
};

const ASSESSMENT_SCHEMA = {

  title: "ASSESSMENT",
  actions: SUBJECTIVE_SCHEMA.actions,
  sections: [
    {
      fields: [
        {
          name: "msk_problem_list",
          label: "Problem list",
          type: "textarea"
        },
        {
          name: "msk_clinical_impression",
          label: "Clinical Impression",
          type: "textarea"
        },
        {
          name: "msk_rehab_potential",
          label: "Rehab Prognosis",
          type: "radio",
          options: [
            { label: "Excellent", value: "excellent" },
            { label: "Good", value: "good" },
            { label: "Fair", value: "fair" },
            { label: "Guarded", value: "guarded" },
            { label: "Poor", value: "poor" }
          ]
        }
      ]
    }
  ]
};

const PLAN_SCHEMA = {
  title: "PLAN",
  actions: SUBJECTIVE_SCHEMA.actions,
  sections: [
    {
      title: "Short-Term Goals (2–4 weeks)",
      fields: [
        {
          type: "dynamic-goals",
          name: "msk_short_term_goals"
        }
      ]
    },
    {
      title: "Long-Term Goals (6–12 weeks)",
      fields: [
        {
          type: "dynamic-goals",
          name: "msk_long_term_goals"
        }
      ]
    },
    {
      title: "Interventions",
      fields: [
        {
          name: "msk_interventions",
          label: "Interventions",
          type: "textarea"
        }
      ]
    }
  ]
};

export default function Musculoskeletal({ patient, onSubmit, onBack }) {
  const [values, setValues] = useState({});
  const [activeTab, setActiveTab] = useState("subjective");
  const [submitted, setSubmitted] = useState(false);

  const storageKey = patient ? `pt_msk_assessment_draft_${patient.id}` : null;

  useEffect(() => {
    if (!storageKey) return;
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      setValues(JSON.parse(saved).values || {});
    }
  }, [storageKey]);

  useEffect(() => {
    if (!patient) return;
    setValues(v => ({
      ...v,
      referred_by: patient.case_manager || "",
      referral_reasons: patient.diagnosis_history || patient.icd || "",
      iso_gender: patient.sex ? (patient.sex.toLowerCase().includes("f") ? "female" : "male") : "male"
    }));
  }, [patient]);

  const onChange = (name, value) => {
    setValues(v => ({ ...v, [name]: value }));
  };

  const handleSave = () => {
    if (!storageKey) return;
    localStorage.setItem(
      storageKey,
      JSON.stringify({ values, updatedAt: new Date() })
    );
    alert("Musculoskeletal draft saved");
  };

  const handleClear = () => {
    setValues({});
    setSubmitted(false);
    if (storageKey) localStorage.removeItem(storageKey);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    onSubmit?.(values);
    alert("Musculoskeletal assessment submitted");
  };

  const schemaMap = {
    subjective: SUBJECTIVE_SCHEMA,
    objective: OBJECTIVE_SCHEMA,
    assessment: ASSESSMENT_SCHEMA,
    plan: PLAN_SCHEMA
  };

  const nextTab = (tab) => {
    if (tab === "subjective") return "objective";
    if (tab === "objective") return "assessment";
    if (tab === "assessment") return "plan";
    return "plan";
  };

      const [patientHistory, setPatientHistory] = useState({
      past_medical_history: patient?.medical_history || "",
      past_family_history: patient?.family_medical_history || "",
      alerts_and_allergies: patient?.alerts_and_allergies_history || ""
    });
    function PatientInformationBlock({ patient, patientHistory, setPatientHistory }) {
      if (!patient) return null;
    
      const formatDate = (dateStr) => {
        if (!dateStr) return "-";
        try {
          return new Date(dateStr).toLocaleDateString();
        } catch {
          return "-";
        }
      };
    
      return (
        <div style={{ marginBottom: 24 }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 12,
            fontSize: 14
          }}>
            <div><b>Name:</b> {patient.name}</div>
            <div><b>IC:</b> {patient.id}</div>
            <div><b>DOB:</b> {formatDate(patient.dob)}</div>
    
            <div><b>Age / Gender:</b> {patient.age} / {patient.sex}</div>
            <div><b>ICD:</b> {patient.icd}</div>
            <div><b>Date of Assessment:</b> {new Date().toLocaleDateString()}</div>
    
            <div><b>Date of Onset:</b> {formatDate(patient.date_of_onset)}</div>
            <div><b>Duration of Diagnosis:</b> -</div>
            <div><b>Primary Diagnosis:</b> {patient.diagnosis_history || "-"}</div>
    
            <div><b>Secondary Diagnosis:</b> {patient.medical_history || "-"}</div>
            <div><b>Dominant Side:</b> {patient.dominant_side || "-"}</div>
            <div><b>Language Preference:</b> {patient.language_preference || "-"}</div>
    
            <div><b>Education Level:</b> {patient.education_background || "-"}</div>
            <div><b>Occupation:</b> {patient.occupation || "-"}</div>
            <div><b>Work Status:</b> {patient.employment_status || "-"}</div>
    
            <div><b>Driving Status:</b> {patient.driving_status || "-"}</div>
            <div><b>Marital Status:</b> {patient.marital_status || "-"}</div>
    
            {/* ===== HISTORY ===== */}
            <div style={{ gridColumn: "1 / -1", marginTop: 10 }}>
              <h3>Patient History</h3>
    
              <div>
                <b>Past Medical History</b>
                <textarea
                  style={textarea}
                  value={patientHistory.past_medical_history}
                  onChange={(e) =>
                    setPatientHistory(prev => ({
                      ...prev,
                      past_medical_history: e.target.value
                    }))
                  }
                />
              </div>
    
              <div>
                <b>Family History</b>
                <textarea
                  style={textarea}
                  value={patientHistory.past_family_history}
                  onChange={(e) =>
                    setPatientHistory(prev => ({
                      ...prev,
                      past_family_history: e.target.value
                    }))
                  }
                />
              </div>
    
              <div>
                <b>Allergies</b>
                <textarea
                  style={textarea}
                  value={patientHistory.alerts_and_allergies}
                  onChange={(e) =>
                    setPatientHistory(prev => ({
                      ...prev,
                      alerts_and_allergies: e.target.value
                    }))
                  }
                />
              </div>
    
              <button style={alertBtn}>🚨 Alerts</button>
            </div>
          </div>
        </div>
      );
    }
    const textarea = {
      width: "100%",
      minHeight: 90,
      marginTop: 6,
      marginBottom: 12,
      padding: "10px 12px",
      borderRadius: 6,
      border: "1px solid #d1d5db",
      fontSize: 14,
      resize: "vertical"
    };
    
    const alertBtn = {
      marginTop: 10,
      padding: "10px 20px",
      borderRadius: 6,
      border: "1.5px solid #007bff",
      background: "#007bff",
      color: "#fff",
      fontWeight: 600,
      cursor: "pointer"
    };
  return (
    <div style={mainContent}>
      {/* ===== PATIENT INFORMATION CARD ===== */}
      <CommonFormBuilder
        schema={MSK_CONTAINER_SCHEMA}
        values={{}}
        onChange={() => {}}
      >
        <PatientInformationBlock patient={patient} patientHistory={patientHistory} setPatientHistory={setPatientHistory}/>
      </CommonFormBuilder>

      {/* ===== CONSENT & REFERRAL ===== */}
      <CommonFormBuilder
        schema={CONSENT_AND_REFERRAL_SCHEMA}
        values={values}
        onChange={onChange}
      />

      {/* ===== TABS ===== */}
      <div style={tabBar}>
        {["subjective", "objective", "assessment", "plan"].map(tab => (
          <div
            key={tab}
            style={activeTab === tab ? tabActive : tabBtn}
            onClick={() => setActiveTab(tab)}
          >
            {tab.toUpperCase()}
          </div>
        ))}
      </div>

      {/* ===== TAB CONTENT ===== */}
      <CommonFormBuilder
        schema={schemaMap[activeTab]}
        values={values}
        onChange={onChange}
        submitted={submitted}
        onAction={(type) => {
          if (type === "back") onBack?.();
          if (type === "clear") handleClear();
          if (type === "save") handleSave();
        }}
        assessmentRegistry={MUSCULOSKELETAL_ASSESSMENT_REGISTRY}
      >
        <div style={submitRow}>
          {activeTab !== "plan" ? (
            <button
              type="button"
              style={submitBtn}
              onClick={() => setActiveTab(nextTab(activeTab))}
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              style={submitBtn}
              onClick={handleSubmit}
            >
              Submit Musculoskeletal Assessment
            </button>
          )}
        </div>
      </CommonFormBuilder>
    </div>
  );
}

const mainContent = { margin: "0 auto" };

const section = {
  marginBottom: 24
};

const patientGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 12,
  fontSize: 14
};

const submitRow = {
  display: "flex",
  justifyContent: "flex-end",
  gap: 8,
  marginTop: 20
};

const submitBtn = {
  padding: "8px 18px",
  background: "#2563EB",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  fontSize: 14,
  fontWeight: 600,
  cursor: "pointer"
};

const tabBar = {
  display: "flex",
  gap: 12,
  justifyContent: "center",
  borderBottom: "1px solid #ddd",
  marginBottom: 12,
  marginTop: 24
};

const tabBtn = {
  padding: "10px 22px",
  fontWeight: 600,
  cursor: "pointer",
  color: "#0f172a"
};

const tabActive = {
  ...tabBtn,
  borderBottom: "3px solid #2451b3",
  color: "#2451b3"
};
