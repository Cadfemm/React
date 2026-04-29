import React, { useState, useEffect, useMemo } from "react";
import MMTForm, { buildMmtAccordionFields } from "./MMTForm";
import ROMForm, { buildROMSchema } from "./ROMForm";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";
import PainAssessmentForm from "./PainForm";
import StumpAssessmentForm from "./StumpForm";
import BergBalanceScale from "./BBS";
import TUG from "./TUGForm";
import SixMWTForm from "./SixMWTForm";
import DASHAssessment from "../../OT/components/Dash";
import BoxBlockTest from "../../OT/components/BoxBlockTest";
import FGAForm from "./FGAForm";
import GripStrengthForm from "./GripStrengthForm";
import TAPESForm from "./TAPESForm";
import { AMPProAssessment, AMPNoProAssessment} from "./AMPpro_nopro";
import PatientCard from "../../../shared/cards/PatientCard";


/* ROM wrapper — shows only UL or LL sections based on amp_region */
/* ── helpers ── */
function ampSides(ampSide) {
  return {
    right: ampSide === "right" || ampSide === "bilateral",
    left:  ampSide === "left"  || ampSide === "bilateral",
  };
}

/**
 * Given amp_level_lower (array) and amp_side, compute:
 *  - which joint sections to show
 *  - per-section side overrides
 *
 * Rule: the amputated side loses the amputated joint AND everything distal to it.
 *   Partial Foot        → loses: Ankle (amputated side)
 *   Ankle Disarticulation → loses: Ankle (amputated side)
 *   Transtibial (BK)    → loses: Knee, Ankle (amputated side)
 *   Knee Disarticulation → loses: Knee, Ankle (amputated side)
 *   Transfemoral (AK)   → loses: Knee, Ankle (amputated side)
 *   Hip Disarticulation → loses: Hip, Knee, Ankle (amputated side)
 *   Hemipelvectomy      → loses: Hip, Knee, Ankle (amputated side)
 *   Bilateral variants  → both sides lose the relevant joints
 */
function getLowerLimbConfig(levels = [], ampSide) {
  const has = v => levels.includes(v);
  const side = ampSide || "bilateral";

  // Start with all sections visible on both sides
  const sectionSides = {
    Hip:          { right: true, left: true },
    Knee:         { right: true, left: true },
    "Ankle / Foot": { right: true, left: true },
  };

  // Helper: remove a side from a joint
  const removeSide = (joint, s) => {
    if (s === "bilateral") {
      sectionSides[joint].right = false;
      sectionSides[joint].left  = false;
    } else if (s === "right") {
      sectionSides[joint].right = false;
    } else if (s === "left") {
      sectionSides[joint].left = false;
    }
  };

  if (has("ankle_disarticulation")) {
    removeSide("Ankle / Foot", side);
  }

  if (has("transtibial") || has("knee_disarticulation")) {
    removeSide("Knee",         side);
    removeSide("Ankle / Foot", side);
  }

  if (has("transfemoral")) {
    removeSide("Knee",         side);
    removeSide("Ankle / Foot", side);
  }

  if (has("hip_disarticulation") || has("hemipelvectomy")) {
    removeSide("Hip",          side);
    removeSide("Knee",         side);
    removeSide("Ankle / Foot", side);
  }

  if (has("bilateral_transtibial")) {
    removeSide("Ankle / Foot", "bilateral");
  }

  if (has("bilateral_transfemoral")) {
    removeSide("Knee",         "bilateral");
    removeSide("Ankle / Foot", "bilateral");
  }

  // Build section list using ROM key names
  const allSections = ["Hip", "Knee", "Ankle / Foot"];
  const sections = allSections.filter(s => {
    const ss = sectionSides[s];
    return ss.right || ss.left;
  });

  // Only pass sectionSides override when a side is actually hidden
  const cleanSides = {};
  for (const s of sections) {
    const ss = sectionSides[s];
    if (!ss.right || !ss.left) cleanSides[s] = ss;
  }

  // MMT uses "Ankle" not "Ankle / Foot" — build a parallel map
  const mmtSectionSides = {};
  for (const [k, v] of Object.entries(cleanSides)) {
    mmtSectionSides[k === "Ankle / Foot" ? "Ankle" : k] = v;
  }
  const mmtSections = sections.map(s => s === "Ankle / Foot" ? "Ankle" : s);

  return {
    sections:       sections.length ? sections : null,
    mmtSections:    mmtSections.length ? mmtSections : null,
    sectionSides:   cleanSides,
    mmtSectionSides,
  };
}

/**
 * Upper limb amputation config.
 * Rule: amputated side loses the amputated joint and everything distal.
 *   Partial Hand / Wrist Disarticulation → loses: Wrist (amputated side)
 *   Transradial (BE)                     → loses: Elbow, Wrist (amputated side)
 *   Elbow Disarticulation                → loses: Elbow, Wrist (amputated side)
 *   Transhumeral (AE)                    → loses: Elbow, Wrist (amputated side)
 *   Shoulder Disarticulation / Forequarter → loses: Shoulder, Elbow, Wrist (amputated side)
 *   Bilateral variants                   → both sides lose relevant joints
 */
function getUpperLimbConfig(levels = [], ampSide) {
  const has = v => levels.includes(v);
  const side = ampSide || "bilateral";

  const sectionSides = {
    "Shoulder":       { right: true, left: true },
    "Elbow / Forearm":{ right: true, left: true },
    "Wrist / Hand":   { right: true, left: true },
  };

  const removeSide = (joint, s) => {
    if (s === "bilateral") {
      sectionSides[joint].right = false;
      sectionSides[joint].left  = false;
    } else if (s === "right") {
      sectionSides[joint].right = false;
    } else if (s === "left") {
      sectionSides[joint].left = false;
    }
  };

  if (has("partial_hand") || has("wrist_disarticulation")) {
    removeSide("Wrist / Hand", side);
  }

  if (has("transradial") || has("elbow_disarticulation")) {
    removeSide("Elbow / Forearm", side);
    removeSide("Wrist / Hand",    side);
  }

  if (has("transhumeral")) {
    removeSide("Elbow / Forearm", side);
    removeSide("Wrist / Hand",    side);
  }

  if (has("shoulder_disarticulation") || has("forequarter")) {
    removeSide("Shoulder",        side);
    removeSide("Elbow / Forearm", side);
    removeSide("Wrist / Hand",    side);
  }

  if (has("bilateral_transradial")) {
    // Both elbows present (above amputation), both wrists gone
    removeSide("Wrist / Hand", "bilateral");
  }

  if (has("quadruple_amputation")) {
    removeSide("Shoulder",        "bilateral");
    removeSide("Elbow / Forearm", "bilateral");
    removeSide("Wrist / Hand",    "bilateral");
  }

  const allSections = ["Shoulder", "Elbow / Forearm", "Wrist / Hand"];
  const sections = allSections.filter(s => {
    const ss = sectionSides[s];
    return ss.right || ss.left;
  });

  const cleanSides = {};
  for (const s of sections) {
    const ss = sectionSides[s];
    if (!ss.right || !ss.left) cleanSides[s] = ss;
  }

  // MMT uses "Elbow" and "Wrist" (not "Elbow / Forearm" / "Wrist / Hand")
  const mmtKeyMap = { "Elbow / Forearm": "Elbow", "Wrist / Hand": "Wrist" };
  const mmtSectionSides = {};
  for (const [k, v] of Object.entries(cleanSides)) {
    mmtSectionSides[mmtKeyMap[k] || k] = v;
  }
  const mmtSections = sections.map(s => mmtKeyMap[s] || s);

  return { sections: sections.length ? sections : null, mmtSections, sectionSides: cleanSides, mmtSectionSides };
}


function AmpROMForm({ values, onChange }) {
  const region   = values?.amp_region;
  const ampSide  = values?.amp_side;
  const llLevels = values?.amp_level_lower || [];
  const ulLevels = values?.amp_level_upper || [];
  const isLL     = region === "lower_limb" || region === "both";
  const isUL     = region === "upper_limb" || region === "both";

  const { sections: llSections, sectionSides: llSides } = isLL
    ? getLowerLimbConfig(llLevels, ampSide)
    : { sections: null, sectionSides: {} };

  const { sections: ulSections, sectionSides: ulSides } = isUL
    ? getUpperLimbConfig(ulLevels, ampSide)
    : { sections: null, sectionSides: {} };

  const mapped = [];
  if (isUL) mapped.push("upper_limb");
  if (isLL) mapped.push("lower_limb");

  const forceSections = (isUL || isLL) ? [
    ...(ulSections || (isUL ? ["Shoulder", "Elbow / Forearm", "Wrist / Hand"] : [])),
    ...(llSections || (isLL ? ["Hip", "Knee", "Ankle / Foot"] : [])),
  ] : null;

  const sectionSides = { ...ulSides, ...llSides };

  const schema = useMemo(
    () => buildROMSchema(mapped, undefined, undefined, undefined, undefined, sectionSides, forceSections),
    [JSON.stringify(mapped), JSON.stringify(sectionSides), JSON.stringify(forceSections)]
  );

  return <CommonFormBuilder schema={schema} values={values} onChange={onChange} layout="nested" />;
}

/* MMT wrapper */
function AmpMMTForm({ values, onChange }) {
  const region   = values?.amp_region;
  const ampSide  = values?.amp_side;
  const llLevels = values?.amp_level_lower || [];
  const ulLevels = values?.amp_level_upper || [];
  const isLL     = region === "lower_limb" || region === "both";
  const isUL     = region === "upper_limb" || region === "both";

  const { mmtSections: llMmtSections, mmtSectionSides: llMmtSides } = isLL
    ? getLowerLimbConfig(llLevels, ampSide)
    : { mmtSections: [], mmtSectionSides: {} };

  const { mmtSections: ulMmtSections, mmtSectionSides: ulMmtSides } = isUL
    ? getUpperLimbConfig(ulLevels, ampSide)
    : { mmtSections: [], mmtSectionSides: {} };

  const filterSections = (isUL || isLL) ? [
    ...(ulMmtSections || (isUL ? ["Shoulder", "Elbow", "Wrist"] : [])),
    ...(llMmtSections || (isLL ? ["Hip", "Knee", "Ankle"] : [])),
  ] : null;

  const mmtSectionSides = { ...ulMmtSides, ...llMmtSides };

  const schema = useMemo(
    () => ({ title: "Manual Muscle Testing (MMT)", fields: buildMmtAccordionFields(filterSections, mmtSectionSides) }),
    [JSON.stringify(filterSections), JSON.stringify(mmtSectionSides)]
  );

  return <CommonFormBuilder schema={schema} values={values} onChange={onChange} layout="nested" />;
}



const AMPUTEE_CONTAINER_SCHEMA = {
  title: "Patient Information",
  sections: []
};

const CONSENT_AND_REFERRAL_SCHEMA = {
  title: "",
  sections: [
    {
      fields: [
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
          options: [{ label: "Home Exercise Program (HEP) reviewed and demonstrated", value: "yes" }]
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
        }
        ,
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

const AMPUTATION_INFO_SCHEMA = {
  sections: [
    {
      fields: [
        { type: "subheading", label: "Amputation Information" },
        {
          name: "amp_side",
          label: "Amputation Side",
          type: "radio",
          options: [
            { label: "Left",      value: "left"      },
            { label: "Right",     value: "right"     },
            { label: "Bilateral", value: "bilateral" }
          ]
        },
        {
          name: "amp_region",
          label: "Amputation Region",
          type: "radio",
          options: [
            { label: "Lower Limb",   value: "lower_limb"  },
            { label: "Upper Limb",   value: "upper_limb"  },
            { label: "Both (LL+UL)", value: "both"        }
          ]
        },
        /* ── Lower Limb Levels ── */
        {
          name: "amp_level_lower",
          label: "Amputation Level — Lower Limb",
          type: "checkbox-group",
          showIf: { or: [
            { field: "amp_region", equals: "lower_limb" },
            { field: "amp_region", equals: "both" }
          ]},
          options: [
            { label: "Partial Foot",           value: "partial_foot"          },
            { label: "Ankle Disarticulation",  value: "ankle_disarticulation" },
            { label: "Transtibial (BK)",        value: "transtibial"           },
            { label: "Knee Disarticulation",   value: "knee_disarticulation"  },
            { label: "Transfemoral (AK)",       value: "transfemoral"          },
            { label: "Hip Disarticulation",    value: "hip_disarticulation"   },
            { label: "Hemipelvectomy",         value: "hemipelvectomy"        },
            { label: "Bilateral Transtibial",  value: "bilateral_transtibial" },
            { label: "Bilateral Transfemoral", value: "bilateral_transfemoral"}
          ]
        },
        /* ── Upper Limb Levels ── */
        {
          name: "amp_level_upper",
          label: "Amputation Level — Upper Limb",
          type: "checkbox-group",
          showIf: { or: [
            { field: "amp_region", equals: "upper_limb" },
            { field: "amp_region", equals: "both" }
          ]},
          options: [
            { label: "Partial Hand",           value: "partial_hand"          },
            { label: "Wrist Disarticulation",  value: "wrist_disarticulation" },
            { label: "Transradial (BE)",        value: "transradial"           },
            { label: "Elbow Disarticulation",  value: "elbow_disarticulation" },
            { label: "Transhumeral (AE)",       value: "transhumeral"          },
            { label: "Shoulder Disarticulation",value: "shoulder_disarticulation"},
            { label: "Forequarter",            value: "forequarter"           },
            { label: "Bilateral Transradial",  value: "bilateral_transradial" },
            { label: "Quadruple Amputation",   value: "quadruple_amputation"  }
          ]
        },
        /* ── Reason for Amputation ── */
        {
          name: "amp_reason",
          label: "Reason for Amputation",
          type: "checkbox-group",
          options: [
            { label: "Diabetes Mellitus",              value: "diabetes_mellitus"       },
            { label: "Traumatic Injury",               value: "traumatic_injury"        },
            { label: "Cancer",                         value: "cancer"                  },
            { label: "Necrotizing Fasciitis (Non-DM)", value: "necrotizing_fasciitis"   },
            { label: "Peripheral Vascular Disease",    value: "peripheral_vascular"     },
            { label: "Vascular Injury",                value: "vascular_injury"         },
            { label: "Tumour (Benign)",                value: "tumour_benign"           },
            { label: "Aneurysm",                       value: "aneurysm"                },
            { label: "Infection",                      value: "infection"               },
            { label: "Other",                          value: "other"                   }
          ]
        },
        {
          name: "amp_reason_other",
          label: "Other (specify)",
          type: "input",
          showIf: { field: "amp_reason", includes: "other" }
        }
      ]
    }
  ]
};

const SUBJECTIVE_SCHEMA = {
  actions: [
    { type: "back",  label: "Back"  },
    { type: "clear", label: "Clear" },
    { type: "save",  label: "Save"  }
  ],
  sections: [
    {
      fields: [

        /* ── Chief Complaints ── */
        {
          name: "amp_chief_complaints",
          label: "Chief Complaints",
          type: "textarea"
        },

        /* ── Hypoglycaemic Awareness [only if Diabetes Mellitus selected] ── */
        {
          type: "subheading",
          label: "Hypoglycaemic Awareness",
          showIf: { field: "amp_reason", includes: "diabetes_mellitus" }
        },
        {
          type: "row",
          showIf: { field: "amp_reason", includes: "diabetes_mellitus" },
          fields: [
            { name: "hypo_frequency",        label: "Frequency",        type: "input" },
            { name: "hypo_last_episode",      label: "Last Episode",     type: "input" }
          ]
        },
        {
          type: "row",
          showIf: { field: "amp_reason", includes: "diabetes_mellitus" },
          fields: [
            { name: "hypo_common_symptoms",   label: "Common Symptoms",  type: "input" },
            { name: "hypo_time_of_day",       label: "Time of Day",      type: "input" }
          ]
        },

        /* ── Pain Assessment ── */
        { type: "subheading", label: "Pain Assessment" },

        {
          name: "amp_stump_pain",
          label: "Stump Pain",
          type: "radio",
          options: [
            { label: "None",               value: "none"               },
            { label: "Localised",          value: "localised"          },
            { label: "Significant Diffuse",value: "significant_diffuse"}
          ]
        },
        {
          name: "amp_stump_nrs",
          label: "NRS Score (0 = no pain · 10 = worst)",
          type: "scale-slider",
          min: 0, max: 10, showValue: true,
          showIf: { or: [
            { field: "amp_stump_pain", equals: "localised"           },
            { field: "amp_stump_pain", equals: "significant_diffuse" }
          ]},
          ranges: [
            { min: 0, max: 3,  label: "Mild",     color: "#22c55e" },
            { min: 3, max: 7,  label: "Moderate", color: "#facc15" },
            { min: 7, max: 10, label: "Severe",   color: "#ef4444" }
          ]
        },
        {
          name: "amp_stump_location",
          label: "Location on stump",
          type: "input",
          showIf: { or: [
            { field: "amp_stump_pain", equals: "localised"           },
            { field: "amp_stump_pain", equals: "significant_diffuse" }
          ]}
        },

        /* ── Phantom Limb Sensation ── */
        {
          name: "amp_pls",
          label: "Phantom Limb Sensation (PLS)",
          type: "radio",
          options: [
            { label: "Present", value: "present" },
            { label: "Absent",  value: "absent"  }
          ]
        },
        {
          name: "amp_pls_describe",
          label: "Describe Sensation",
          type: "input",
          showIf: { field: "amp_pls", equals: "present" }
        },

        /* ── Phantom Limb Pain ── */
        {
          name: "amp_plp",
          label: "Phantom Limb Pain (PLP)",
          type: "checkbox-group",
          options: [
            { label: "Dull",       value: "dull"       },
            { label: "Throbbing",  value: "throbbing"  },
            { label: "Knifelike",  value: "knifelike"  },
            { label: "Burning",    value: "burning"    },
            { label: "Squeezing",  value: "squeezing"  },
            { label: "Shooting",   value: "shooting"   },
            { label: "Prickling",  value: "prickling"  },
            { label: "Tingling",   value: "tingling"   },
            { label: "Cramp-like", value: "cramp_like" },
            { label: "Sawing",     value: "sawing"     },
            { label: "Pressing",   value: "pressing"   },
            { label: "Sticking",   value: "sticking"   }
          ]
        },
        {
          name: "amp_plp_nrs",
          label: "NRS Score (0–10)",
          type: "scale-slider",
          min: 0, max: 10, showValue: true,
          ranges: [
            { min: 0, max: 3,  label: "Mild",     color: "#22c55e" },
            { min: 3, max: 7,  label: "Moderate", color: "#facc15" },
            { min: 7, max: 10, label: "Severe",   color: "#ef4444" }
          ]
        },
        {
          type: "row",
          fields: [
            { name: "amp_plp_frequency", label: "Frequency", type: "input" },
            { name: "amp_plp_area",      label: "Area",      type: "input" }
          ]
        },

        /* ── History of Previous Falls ── */
        { type: "subheading", label: "History of Previous Falls" },

        {
          name: "amp_fall_6months",
          label: "Fall in last 6 months",
          type: "radio",
          options: [
            { label: "Yes", value: "yes" },
            { label: "No",  value: "no"  }
          ]
        },
        {
          name: "amp_fall_activity",
          label: "Activity at time of fall",
          type: "input",
          showIf: { field: "amp_fall_6months", equals: "yes" }
        },
        {
          name: "amp_get_up_ability",
          label: "Ability to get up from floor",
          type: "radio",
          options: [
            { label: "With Help",    value: "with_help"    },
            { label: "Without Help", value: "without_help" },
            { label: "Unable",       value: "unable"       }
          ]
        }

      ]
    }
  ]
};


const AMPUTEE_SCALE = [
  { label: "Independent",  value: "independent"  },
  { label: "Supervision",  value: "supervision"  },
  { label: "Min Assist",   value: "min_assist"   },
  { label: "Mod Assist",   value: "mod_assist"   },
  { label: "Max Assist",   value: "max_assist"   },
  { label: "Total Dep.",   value: "total_dep"    },
];

const OBJECTIVE_SCHEMA = {
  title: "",
  actions: SUBJECTIVE_SCHEMA.actions,
  sections: [
    {
      fields: [

        /* ── Baseline Vitals ── */
        { type: "subheading", label: "Baseline Vitals" },
        {
          type: "row",
          fields: [
            { name: "obj_bp",    label: "BP (mmHg)",          type: "input", placeholder: "e.g. 120/80" },
            { name: "obj_hr",    label: "HR (bpm)",            type: "input", placeholder: "bpm"         },
            { name: "obj_spo2",  label: "SpO₂ (%)",           type: "input", placeholder: "%"            }
          ]
        },
        {
          type: "row",
          fields: [
            { name: "obj_rr",   label: "RR (breaths/min)",    type: "input", placeholder: "/min"         },
            { name: "obj_temp", label: "Temp / BGL",          type: "input", placeholder: "°C / mmol/L"  }
          ]
        },

        /* ── Sensory ── */
        { type: "subheading", label: "Sensory" },
        {
          type: "row",
          fields: [
            { name: "obj_vision",  label: "Vision",  type: "input" },
            { name: "obj_hearing", label: "Hearing", type: "input" }
          ]
        },

        /* ── Stump Assessment ── */
        { type: "subheading", label: "Stump Assessment" },
        {
          name: "stump_shape",
          label: "Stump Shape",
          type: "radio",
          options: [
            { label: "Cylindrical",  value: "cylindrical"  },
            { label: "Conical",      value: "conical"      },
            { label: "Club-shaped",  value: "club_shaped"  },
            { label: "Bulbous",      value: "bulbous"      },
            { label: "Others",       value: "others"       }
          ]
        },
        {
          name: "stump_shape_other",
          label: "Others (specify)",
          type: "input",
          showIf: { field: "stump_shape", equals: "others" }
        },
        {
          name: "stump_length",
          label: "Length",
          type: "radio",
          options: [
            { label: "Short",  value: "short"  },
            { label: "Medium", value: "medium" },
            { label: "Long",   value: "long"   }
          ]
        },
        {
          name: "stump_scar",
          label: "Scar",
          type: "radio",
          options: [
            { label: "Well Healed", value: "well_healed" },
            { label: "Unhealed",    value: "unhealed"    }
          ]
        },
        {
          name: "stump_skin",
          label: "Skin",
          type: "radio",
          options: [
            { label: "Undamaged",    value: "undamaged"    },
            { label: "Deep Wrinkle", value: "deep_wrinkle" },
            { label: "Macerated",    value: "macerated"    },
            { label: "Blistered",    value: "blistered"    }
          ]
        },
        {
          name: "stump_solidity",
          label: "Solidity",
          type: "radio",
          options: [
            { label: "Soft",     value: "soft"     },
            { label: "Edematous",value: "edematous"},
            { label: "Firm",     value: "firm"     }
          ]
        },
        {
          name: "stump_end",
          label: "End of Stump",
          type: "radio",
          options: [
            { label: "Rounded",         value: "rounded"         },
            { label: "Bony Prominent",  value: "bony_prominent"  },
            { label: "Adherent Scar",   value: "adherent_scar"   }
          ]
        },
        {
          name: "stump_sensitivity",
          label: "Sensitivity",
          type: "radio",
          options: [
            { label: "Normal",        value: "normal"        },
            { label: "Hypersensitive",value: "hypersensitive"},
            { label: "Reduced",       value: "reduced"       }
          ]
        },
        {
          name: "stump_sensation",
          label: "Sensation",
          type: "radio",
          options: [
            { label: "Intact",   value: "intact"   },
            { label: "Impaired", value: "impaired" }
          ]
        },
        {
          name: "stump_oedema",
          label: "Oedema",
          type: "radio",
          options: [
            { label: "None",     value: "none"     },
            { label: "Mild",     value: "mild"     },
            { label: "Moderate", value: "moderate" },
            { label: "Severe",   value: "severe"   }
          ]
        },
        {
          name: "stump_skin_integrity",
          label: "Skin Integrity",
          type: "radio",
          options: [
            { label: "Intact",      value: "intact"      },
            { label: "Open wound",  value: "open_wound"  },
            { label: "Blister",     value: "blister"     }
          ]
        },

        /* ── Condition of Intact Limb ── */
        {
          name: "intact_limb_condition",
          label: "Condition of Intact Limb",
          type: "checkbox-group",
          options: [
            { label: "Calluses",              value: "calluses"              },
            { label: "Dry / Cracked Foot",    value: "dry_cracked_foot"      },
            { label: "Charcot Foot",          value: "charcot_foot"          },
            { label: "History of Fracture",   value: "fracture_history"      },
            { label: "Lower Limb Oedema",     value: "lower_limb_oedema"     },
            { label: "Thickened Toenail",     value: "thickened_toenail"     },
            { label: "Flat Foot",             value: "flat_foot"             },
            { label: "Hallux Valgus",         value: "hallux_valgus"         },
            { label: "Hammer Toe Deformity",  value: "hammer_toe_deformity"  },
            { label: "Claw Toe Deformity",    value: "claw_toe_deformity"    },
            { label: "Varicose Vein",         value: "varicose_vein"         },
            { label: "No abnormality",        value: "no_abnormality"        }
          ]
        },

        /* ── Current Functional Mobility & Transfer ── */
        { type: "subheading", label: "Current Functional Mobility & Transfer" },
        {
          name: "assistive_device",
          label: "Assistive Device",
          type: "radio",
          labelAbove: true,
          options: [
            { label: "Wheelchair", value: "wheelchair" },
            { label: "Frame",      value: "frame"      },
            { label: "Crutches",   value: "crutches"   },
            { label: "Cane",       value: "cane"       },
            { label: "Prosthesis", value: "prosthesis" },
            { label: "None",       value: "none"       }
          ]
        },
        /* Matrix rows matching the image */
        { type: "subheading", label: "Function" },
        { name: "func_mobility",             label: "Mobility",              type: "radio-matrix", options: AMPUTEE_SCALE },
        { name: "func_bed_mobility",         label: "Bed Mobility",          type: "radio-matrix", options: AMPUTEE_SCALE },
        { name: "func_toilet_transfer",      label: "Toilet Transfer",       type: "radio-matrix", options: AMPUTEE_SCALE },
        { name: "func_sit_to_stand",         label: "Sit-to-Stand",          type: "radio-matrix", options: AMPUTEE_SCALE },
        { name: "func_standing_balance",     label: "Standing Balance",      type: "radio-matrix", options: AMPUTEE_SCALE },
        { name: "func_stairs",               label: "Stairs",                type: "radio-matrix", options: AMPUTEE_SCALE },
        { name: "func_community_ambulation", label: "Community Ambulation",  type: "radio-matrix", options: AMPUTEE_SCALE },

        /* ── Scales ── */
        { type: "subheading", label: "Scales" },
        {
          name: "amp_scales",
          type: "assessment-launcher",
          options: [
            { label: "ROM",  value: "rom",  regions: [] },
            { label: "MMT",  value: "mmt",  regions: [] }
          ],
          filterByRegionField: "amp_region"
        },

        /* ── Lower Limb Outcome Measures ── */
        { type: "subheading", label: "Lower Limb Outcome Measures",
          showIf: { or: [
            { field: "amp_region", equals: "lower_limb" },
            { field: "amp_region", equals: "both" }
          ]}
        },
        {
          name: "amp_ll_outcomes",
          type: "assessment-launcher",
          showIf: { or: [
            { field: "amp_region", equals: "lower_limb" },
            { field: "amp_region", equals: "both" }
          ]},
          options: [
            { label: "AMP with Prosthesis (AMPPro)",          value: "amp_pro"   },
            { label: "AMP without Prosthesis (AMPnoPro)",     value: "amp_nopro" },
            { label: "5× Sit-to-Stand Test (5xSTS)",          value: "5xsts"     },
            { label: "6-Minute Walk Test (6MWT)",             value: "sixmwt"    },
            { label: "Functional Gait Assessment (FGA)",      value: "fga"       },
            { label: "Locomotor Capabilities Index-5 (LCI-5)",value: "lci5"      },
            { label: "TAPES",                                 value: "tapes"     },
            { label: "Timed Up and Go (TUG)",                 value: "tug"       },
            { label: "L-Test",                                value: "ltest"     },
            { label: "Berg Balance Scale (BBS)",              value: "bbs"       }
          ]
        },

        /* ── Upper Limb Outcome Measures ── */
        { type: "subheading", label: "Upper Limb Outcome Measures",
          showIf: { or: [
            { field: "amp_region", equals: "upper_limb" },
            { field: "amp_region", equals: "both" }
          ]}
        },
        {
          name: "amp_ul_outcomes",
          type: "assessment-launcher",
          showIf: { or: [
            { field: "amp_region", equals: "upper_limb" },
            { field: "amp_region", equals: "both" }
          ]},
          options: [
            { label: "DASH (Disabilities of Arm, Shoulder & Hand)", value: "dash"          },
            { label: "OPUS (Orthotics & Prosthetics Functional Outcome)", value: "opus"    },
            { label: "Grip Strength (Dynamometer)",                  value: "grip"         },
            { label: "9-Hole Peg Test",                              value: "nine_hole_peg"},
            { label: "Box & Block Test",                             value: "box_block"    }
          ]
        }

      ]
    }
  ]
};

const ASSESSMENT_SCHEMA = {
  title: "",
  actions: SUBJECTIVE_SCHEMA.actions,
  sections: [
    {
      fields: [
        {
          name: "amp_problem_list",
          label: "Problem list",
          type: "textarea"
        },
        {
          name: "amp_clinical_impression",
          label: "Clinical Impression",
          type: "textarea"
        },
        {
          name: "amp_rehab_prognosis",
          label: "Rehab Prognosis",
          type: "radio",
          options: [
            { label: "Excellent", value: "excellent" },
            { label: "Good",      value: "good"      },
            { label: "Fair",      value: "fair"      },
            { label: "Guarded",   value: "guarded"   },
            { label: "Poor",      value: "poor"      }
          ]
        }
      ]
    }
  ]
};

const PLAN_SCHEMA = {
  title: "",
  actions: SUBJECTIVE_SCHEMA.actions,
  sections: [
    {
      fields: [

        /* ── Short Term Goals ── */
        { type: "subheading", label: "Short-Term Goals (2–4 weeks)" },
        {
          type: "dynamic-goals",
          name: "amp_short_term_goals"
        },

        /* ── Long Term Goals ── */
        { type: "subheading", label: "Long-Term Goals (6–12 weeks)" },
        {
          type: "dynamic-goals",
          name: "amp_long_term_goals"
        },

        /* ── Intervention ── */
        { type: "subheading", label: "Intervention" },
        {
          name: "amp_intervention",
          label: "Intervention",
          type: "input"
        },

        /* ── Referrals ── */
        { type: "subheading", label: "Referrals" },
        {
          name: "amp_referrals",
          label: "",
          type: "checkbox-group",
          options: [
            { label: "Cyberdyne",           value: "cyberdyne"        },
            { label: "Hydrotherapy",        value: "hydrotherapy"     },
            { label: "SCI",                 value: "sci"              },
            { label: "Nursing",             value: "nursing"          },
            { label: "Gait Analysis",       value: "gait_analysis"    },
            { label: "Advanced Robotic",    value: "advanced_robotic" },
            { label: "MSD",                 value: "msd"              },
            { label: "Gym",                 value: "gym"              },
            { label: "tDCS",                value: "tdcs"             },
            { label: "rTMS",                value: "rtms"             },
            { label: "Metamotus Galileo",   value: "metamotus_galileo"},
            { label: "Neuro",               value: "neuro"            },
            { label: "Vocational",          value: "vocational"       },
            { label: "Prosthetics / O&P",   value: "prosthetics_op"   },
            { label: "Psychology",          value: "psychology"       }
          ]
        },

        /* ── Assistive Device Prescribed ── */
        {
          name: "amp_assistive_device_prescribed",
          label: "Assistive Device Prescribed",
          type: "radio",
          labelAbove: true,
          options: [
            { label: "Wheelchair", value: "wheelchair" },
            { label: "Frame",      value: "frame"      },
            { label: "Crutches",   value: "crutches"   },
            { label: "Cane",       value: "cane"       },
            { label: "Prosthesis", value: "prosthesis" },
            { label: "None",       value: "none"       }
          ]
        },
        {
          name: "amp_prosthesis_type",
          label: "Prosthesis type / components",
          type: "input",
          showIf: { field: "amp_assistive_device_prescribed", equals: "prosthesis" }
        },

        /* ── Next Review / Follow-up ── */
        { type: "subheading", label: "Next Review / Follow-up" },
        {
          type: "row",
          fields: [
            { name: "amp_next_appointment", label: "Next Appointment Date",  type: "date"  },
            { name: "amp_session_frequency",label: "Frequency of Sessions",  type: "input" }
          ]
        }

      ]
    }
  ]
};

const schemaMap = {
    subjective: SUBJECTIVE_SCHEMA,
    objective: OBJECTIVE_SCHEMA,
    assessment: ASSESSMENT_SCHEMA,
    plan: PLAN_SCHEMA
};

const AMPUTEE_ASSESSMENT_REGISTRY = {
  rom:       AmpROMForm,
  mmt:       AmpMMTForm,
  pain:      PainAssessmentForm,
  stump:     StumpAssessmentForm,
  /* Lower Limb */
  sixmwt:    SixMWTForm,
  tug:       TUG,
  bbs:       BergBalanceScale,
  amp_pro:    AMPProAssessment,
  amp_nopro:  AMPNoProAssessment,
  /* Upper Limb */
  dash:      DASHAssessment,
  grip:      GripStrengthForm,
  box_block: BoxBlockTest,
  fga:       FGAForm,
  tapes:     TAPESForm,
};


export default function Amputee({patient, onSubmit, onBack}) {
  const [values, setValues] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState("subjective");

  /* ---------------- STORAGE ---------------- */
  const storageKey = patient
    ? `amputee_assessment_draft_${patient.id}`
    : null;
   
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
      pmh_from_registration:
        patient.medical_history || "No data available",
  
      family_social_from_registration:
        patient.diagnosis_history || "No data available",
      referred_by: patient.case_manager || "",
      referral_reasons: patient.diagnosis_history || patient.icd || ""
    }));
  }, [patient]);

  const onChange = (name, value) => {
    setValues(v => ({ ...v, [name]: value }));
  };

  const handleAction = (type) => {
    if (type === "back") onBack?.();
    if (type === "clear") {
      setValues({});
      setSubmitted(false);
      localStorage.removeItem(storageKey);
    }
    if (type === "save") {
      localStorage.setItem(
        storageKey,
        JSON.stringify({ values, updatedAt: new Date() })
      );
      alert("amputee draft saved");
    }
  };

  const bergScoreCalculate = (score) => {
    score = parseInt(score)
    if (score >= 0 && score <=20){
      return "High Fall Risk"
    } else if(score >= 21 && score <= 40){
      return "Medium Fall Risk"
    } else if (score >= 41 && score <= 56){
      return "Low Fall Risk"
    } else {
      return ''
    }
  }

  const AmputeeWithProScoreCalculate = (score) => {
    score = parseInt(score)
    if (score >= 0 && score <=8){
      return "K0"
    } else if(score >= 9 && score <= 20){
      return "K1"
    } else if (score >= 21 && score <= 28){
      return "K2"
    } else if (score >= 29 && score <= 36){
      return "K3"
    } else if (score >= 37 && score <= 43){
      return "K4"
    } else {
      return ''
    }
  }

  const AmputeeWithoutProScoreCalculate = (score) => {
    score = parseInt(score)
    if (score >= 0 && score <=14){
      return "K0"
    } else if(score >= 15 && score <= 26){
      return "K1"
    } else if (score >= 27 && score <= 36){
      return "K2"
    } else if (score >= 37 && score <= 42){
      return "K3"
    } else if (score >= 43 && score <= 47){
      return "K4"
    } else {
      return ''
    }
  }
  
  const computedValues = {
    ...values,
    balance_table_berg_balance_scale_K_Level: bergScoreCalculate(values.balance_table_berg_balance_scale_Score),
    balance_table_amputee_mobility_predictor_p_K_Level: AmputeeWithProScoreCalculate(values.balance_table_amputee_mobility_predictor_p_Score),
    balance_table_amputee_mobility_predictor_np_K_Level: AmputeeWithoutProScoreCalculate(values.balance_table_amputee_mobility_predictor_np_Score)
  }

  const handleSubmit = () => {
    setSubmitted(true);
    onSubmit?.(values);
    alert("amputee assessment submitted");
  };
  console.log(values, 'hjkhjjklk')

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
      <CommonFormBuilder
        schema={AMPUTEE_CONTAINER_SCHEMA}
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

      {/* ===== AMPUTATION INFORMATION ===== */}
      <CommonFormBuilder
        schema={AMPUTATION_INFO_SCHEMA}
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
        values={computedValues}
        onChange={onChange}
        submitted={submitted}
        onAction={handleAction}
        assessmentRegistry={AMPUTEE_ASSESSMENT_REGISTRY}
      >
        <div style={submitRow}>
          {activeTab !== "plan" ? (
            <button
              type="button"
              style={submitBtn}
              onClick={() => {
                if (activeTab === "subjective") setActiveTab("objective");
                else if (activeTab === "objective") setActiveTab("assessment");
                else if (activeTab === "assessment") setActiveTab("plan");
              }}
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              style={submitBtn}
              onClick={handleSubmit}
            >
              Submit Amputee Assessment
            </button>
          )}
        </div>
      </CommonFormBuilder>
    </div>
  );
}


const mainContent = { margin: "0 auto" };
 
const tabBar = {
  display: "flex",
  gap: 12,
  justifyContent: "center",
  borderBottom: "1px solid #ddd",
  marginBottom: 12
};
const section = {
  marginBottom: 24
};
 
const sectionTitle = {
  fontSize: 16,
  fontWeight: 700,
  marginBottom: 12,
  borderBottom: "1px solid #e5e7eb",
  paddingBottom: 6,
  color: "#0F172A"
};
 
const patientGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 12,
  fontSize: 14
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
 
const submitRow = {
  display: "flex",
  justifyContent: "flex-end",
  marginTop: 20
};
 
const submitBtn = {
  padding: "12px 32px",
  background: "#2563EB",
  color: "#fff",
  border: "none",
  borderRadius: 10,
  fontSize: 15,
  fontWeight: 700
};
const th = {
  border: "1px solid #ccc",
  padding: 10,
  textAlign: "left"
};
 
const td = {
  border: "1px solid #ccc",
  padding: 10
};