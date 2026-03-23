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

const PAED_SPEECH_OPTIONAL_SECTIONS = {
  subjective: [
    "Chief Complaint",
    "Birth History",
    "Medical History",
    "Family History",
    "Developmental History (Approximate age at which your child reached the following milestones)",
    "Education / Intervention"
  ],
  common: [
    "General Observation",
    "Oral-motor structure & function observation"
  ],
  objective: [
    "General Observation",
    "Communication Screening",
    "Oral-motor structure & function observation"
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

export default function PaedIASpeechLanguage({ patient, onBack, mode = "initial" }) {

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
      // ignore corrupted storage
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
  };

  const handleSubmit = () => {
    setSubmitted(true);
    console.log("Paediatric Speech Assessment", values);
  };

  /* ================= SUBJECTIVE ================= */

  const SUBJECTIVE_SCHEMA = {
    title: "",
    sections: [

      {
        title: "Subjective",
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
            type: "textarea",
            placeholder:
              "Verbal consent was obtained from the caregiver. The child was seen in his/her/their best interest."
          },

          { type: "subheading", label: "Chief Complaint" },

          {
            name: "chiefComplaint",
            label: "Family / caregiver reported",
            type: "checkbox-group",
            options: [
              { label: "Understanding spoken language", value: "receptive" },
              { label: "Expressive language (vocabulary/sentence structure/gestural communication)", value: "expressive" },
              { label: "Speech clarity", value: "speech" },
              { label: "Social communication / play skills", value: "social" },
              { label: "Fluency", value: "fluency" },
              { label: "Voice quality", value: "voice" },
              { label: "Feeding / swallowing", value: "feeding" },
              { label: "Behavioural regulation / attention affecting communication", value: "behaviour" },
              { label: "Developmental delay/global developmental delay (if applicable)", value: "Developmental" }
            ]
          },

          { type: "subheading", label: "Birth History" },

          // {
          //   type: "row",
          //   fields: [
          {
            name: "pregnancy",
            label: "Pregnancy",
            type: "radio",
            options: [
              { label: "Term", value: "term" },
              { label: "Preterm", value: "preterm" }
            ]
          },
          {
            name: "delivery",
            label: "Type of delivery",
            type: "radio",

            options: [
              { label: "Spontaneous Vaginal Delivery (SVD)", value: "svd" },
              { label: "C-section", value: "csection" },
              { label: "Forceps", value: "forceps" },
              { label: "Vacuum", value: "vacuum" }
            ]
          },
          //   ]
          // },

          {
            name: "birthComplication",
            label: "Birth complication",
            type: "radio",
            options: [
              { label: "Yes", value: "YES" },
              { label: "No", value: "NO" }
            ]
          },

          {
            name: "birthRemarks",
            label: "Remarks",
            type: "textarea",
            showIf: {
              field: "birthComplication",
              equals: "YES"
            }
          },

          { type: "subheading", label: "Medical History" },

          {
            name: "medicalHistory",
            type: "checkbox-group",
            options: [
              "Tonsillitis",
              "Adenoidectomy",
              "Tonsillectomy",
              "Sleeping difficulties",
              "Snoring",
              "Breathing difficulties",
              "Frequent colds",
              "Seasonal allergies",
              "Nasal congestion",
              "Chronic ear infections",
              "Hearing loss",
              "Ear (PE) tubes",
              "Vision problems",
              "Wears glasses",
              "Head injuries",
              "Seizure",
              "Other medical / genetic diagnoses",
              "Additional medical information"
            ].map(v => ({ label: v, value: v }))
          },

          {
            name: "otherMedical",
            label: "Other medical / genetic diagnoses",
            type: "textarea",
            showIf: {
              field: "medicalHistory",
              includes: "Other medical / genetic diagnoses"
            }
          },

          {
            name: "additionalMedical",
            label: "Additional medical information",
            type: "textarea",
            showIf: {
              field: "medicalHistory",
              includes: "Additional medical information"
            }
          },

          { type: "subheading", label: "Family History" },

          {
            name: "livesWith",
            label: "Lives with",
            type: "radio",
            labelAbove: true,
            options: [
              "Birth parents",
              "Adoptive parent",
              "One parent",
              "Parent & step-parent",
              "Foster parent(s)",
              "Grandparent(s)",
              "Other"
            ].map(v => ({ label: v, value: v }))
          },

          {
            name: "livesWithOther",
            label: "Other",
            type: "textarea",
            showIf: {
              field: "livesWith",
              equals: "Other"
            }
          },

          {
            name: "knownFamilyHistory",
            label: "Known family history of",
            type: "checkbox-group",
            options: [
              "Speech and language difficulties",
              "Learning disabilities (ex: dyslexia)",
              "Hearing impairment"
            ].map(v => ({ label: v, value: v }))
          },

          {
            name: "languagesAtHome",
            label: "Languages spoken at home",
            type: "checkbox-group",
            options: [
              "Bahasa Melayu",
              "English",
              "Chinese",
              "Tamil",
              "Other"
            ].map(v => ({ label: v, value: v }))
          },

          {
            name: "languagesAtHomeOther",
            label: "Other",
            type: "textarea",
            showIf: {
              field: "languagesAtHome",
              includes: "Other"
            }
          },

          // { type: "subheading", label: "Developmental History" },

          {
            type: "subheading",
            label: "Developmental History (Approximate age at which your child reached the following milestones)"
          },

          {
            type: "milestone-grid",
            heading: "Motor",
            rows: [
              {
                left: { name: "sitAge", label: "Sit", placeholder: "month" },
                right: { name: "crawlAge", label: "Crawl", placeholder: "month" }
              },
              {
                left: { name: "standAge", label: "Stand", placeholder: "month" },
                right: { name: "walkAge", label: "Walk", placeholder: "month" }
              }
            ]
          },

          {
            type: "milestone-grid",
            heading: "Speech",
            rows: [
              {
                left: { name: "vocaliseAge", label: "Vocalise", placeholder: "month" },
                right: { name: "babbleAge", label: "Babble", placeholder: "month" }
              },
              {
                left: { name: "firstWordAge", label: "First word", placeholder: "month" },
                right: { name: "combineWordAge", label: "Combining words", placeholder: "month" }
              }
            ]
          },

          { type: "subheading", label: "Education / Intervention" },

          {
            name: "schooling",
            label: "Schooling attended",
            type: "textarea"
          },
          {
            name: "earlyIntervention",
            label: "Early intervention services attended",
            type: "textarea"
          },
          {
            name: "otherTherapy",
            label: "Other therapy attended",
            type: "textarea"
          }
        ]
      }

    ]
  };

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
            type: "textarea",
            placeholder:
              "Verbal consent was obtained from the caregiver. The child was seen in his/her/their best interest."
          },
          { type: "subheading", label: "General Observation" },
          {
            name: "sitting",
            label: "Sitting in",
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
            name: "behaviouralRegulation",
            label: "Behavioural regulation",
            type: "radio",
            labelAbove: true,
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
            name: "teeth",
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
            name: "hardPalate",
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
            name: "softPalate",
            label: "Soft palate",
            type: "radio",
            labelAbove: true,
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
            name: "tongue",
            label: "Tongue",
            type: "radio",
            labelAbove: true,
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
            name: "lips",
            label: "Lips",
            type: "radio",
            labelAbove: true,
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
            name: "oralRemarks",
            label: "Remarks",
            type: "textarea"
          }
        ]
      }
    ]
  };

  const SUBJECTIVE_SCHEMA_NO_COMMON = {
    ...SUBJECTIVE_SCHEMA,
    sections: (SUBJECTIVE_SCHEMA.sections || []).map(sec => ({
      ...sec,
      fields: (sec.fields || []).filter(
        f => !["accompaniedBy", "consent"].includes(f?.name)
      )
    }))
  };

  /* ================= OBJECTIVE ================= */

  const OBJECTIVE_SCHEMA = {
    title: "",
    sections: [
      {
        title: "",
        fields: [

          /* ================= GENERAL OBSERVATION ================= */

          {
            type: "subheading",
            label: "General Observation"
          },

          // {
          //   type: "row",
          //   fields: [
              {
                name: "sitting",
                label: "Sitting in",
                type: "radio",
                options: [
                  { label: "Chair", value: "chair" },
                  { label: "Wheel chair", value: "wheelchair" }
                ]
              },
              {
                name: "behaviouralRegulation",
                label: "Behavioural regulation",
                type: "radio",
                labelAbove: true,
                options: [
                  { label: "Calm", value: "calm" },
                  { label: "Active", value: "active" },
                  { label: "Easily distracted", value: "distracted" },
                  { label: "Upset", value: "upset" },
                  { label: "Requires sensory input", value: "sensory" },
                  { label: "Modulation", value: "modulation" },

                ]
              },
          //   ]
          // },

          // {
          //   type: "row",
          //   fields: [
              {
                name: "primaryModeCommunication",
                label: "Primary mode of communication",
                type: "radio",
                labelAbove: true,
                options: [
                  { label: "Gestures", value: "gestures" },
                  { label: "Vocalisations", value: "vocalisations" },
                  { label: "Words", value: "words" },
                  { label: "Short phrases", value: "phrases" },
                  { label: "Sentences", value: "sentences" }
                ]
              },
              {
                name: "playSkills",
                label: "Play skills",
                type: "radio",
                // labelAbove: true,
                options: [
                  { label: "Functional", value: "functional" },
                  { label: "Symbolic", value: "symbolic" },
                  { label: "Sensory-seeking", value: "sensory" },
                  { label: "Limited play", value: "limited" }
                ]
              },
          //   ]
          // },

          // {
          //   type: "row",
          //   fields: [
              {
                name: "eyeContact",
                label: "Eye contact",
                type: "radio",
                options: [
                  { label: "Appropriate", value: "appropriate" },
                  { label: "Reduced", value: "reduced" },
                  { label: "Avoids", value: "avoids" },
                  { label: "Fleeting", value: "fleeting" }
                ]
              },
              {
                name: "interactionStyle",
                label: "Interaction style",
                type: "radio",
                options: [
                  { label: "Initiates", value: "initiates" },
                  { label: "Responds only", value: "responds" },
                  { label: "Passive", value: "passive" }
                ]
              },
          //   ]
          // },


          /* ================= COMMUNICATION SCREENING ================= */

          {
            type: "subheading",
            label: "Communication Screening"
          },

          // {
          //   type: "row",
          //   fields: [
              {
                name: "jointAttention",
                label: "Joint attention",
                type: "radio",
                options: ["Intact", "Reduced", "Absent"].map(v => ({ label: v, value: v }))
              },
              {
                name: "conversationalReciprocity",
                label: "Conversational reciprocity",
                type: "radio",
                options: ["Intact", "Reduced", "Absent"].map(v => ({ label: v, value: v }))
              }
            ]
          },

          {
            type: "row",
            fields: [
              {
                name: "simpleCommands",
                label: "Comprehension of simple commands",
                type: "radio",
                options: ["Intact", "Reduced"].map(v => ({ label: v, value: v }))
              },
              {
                name: "twoStepCommands",
                label: "Comprehension of 2-step commands",
                type: "radio",
                options: ["Intact", "Reduced"].map(v => ({ label: v, value: v }))
              },
          //   ]
          // },

          // {
          //   type: "row",
          //   fields: [
              {
                name: "expressiveLanguage",
                label: "Expressive language",
                type: "radio",
                options: [
                  { label: "WNL (Within Normal Limits)", value: "wnl" },
                  { label: "Reduced", value: "reduced" }
                ]
              },
              {
                name: "intelligibilityFamiliar",
                label: "Intelligibility to familiar listener",
                type: "radio",
                options: ["WNL (Within Normal Limits)", "Reduced"].map(v => ({ label: v, value: v }))
              },
          //   ]
          // },

          {
            name: "expressiveSpecify",
            label: "If reduced, specify (vocabulary / grammar)",
            type: "textarea",
            showIf: {
              field: "expressiveLanguage",
              equals: "reduced"
            }
          },

          // {
          //   type: "row",
          //   fields: [
              {
                name: "intelligibilityUnfamiliar",
                label: "Intelligibility to unfamiliar listener",
                type: "radio",
                options: ["WNL (Within Normal Limits)", "Reduced"].map(v => ({ label: v, value: v }))
              },
              {
                name: "speechSoundErrors",
                label: "Speech sound errors",
                type: "radio",
                options: [
                  { label: "Articulation", value: "articulation" },
                  { label: "Phonological patterns noted", value: "phonological" }
                ]
              },
          //   ]
          // },

          // {
          //   type: "row",
          //   fields: [
              {
                name: "fluency",
                label: "Fluency",
                type: "radio",
                options: [
                  { label: "WNL (Within Normal Limits)", value: "wnl" },
                  { label: "Atypical dysfluencies", value: "atypical" }
                ]
              },
              {
                name: "voice",
                label: "Voice",
                type: "radio",
                options: [
                  { label: "WNL (Within Normal Limits)", value: "wnl" },
                  { label: "Hoarse", value: "hoarse" },
                  { label: "Breathiness", value: "breathy" },
                  { label: "Strain", value: "strain" }
                ]
              },
          //   ]
          // },

          // {
          //   type: "row",
          //   fields: [
              {
                name: "pragmatics",
                label: "Pragmatics",
                type: "radio",
                labelAbove: true,
                options: [
                  { label: "WNL (Within Normal Limits)", value: "wnl" },
                  { label: "Reduced eye gaze", value: "eye_gaze" },
                  { label: "Reduced turn-taking", value: "turn_taking" },
                  { label: "Literal interpretation", value: "literal" }
                ]
              },

          //   ]
          // },


          {
            name: "aacUse",
            label: "Augmentative and Alternative Communication (AAC )use",
            type: "radio",
            options: [
              { label: "Yes", value: "YES" },
              { label: "No", value: "NO" }
            ]
          },


          {
            name: "aacEffectiveness",
            label: "Effectiveness noted",
            type: "textarea",
            showIf: {
              field: "aacUse",
              equals: "YES"
            }
          },


          /* ================= ORAL MOTOR ================= */
          {
            type: "subheading",
            label: "Oral-motor structure & function observation"
          },

          // {
          //   type: "row",
          //   fields: [
              {
                name: "teeth",
                label: "Teeth",
                type: "radio",
                options: ["Complete", "Incomplete"].map(v => ({ label: v, value: v }))
              },
              {
                name: "hardPalate",
                label: "Hard palate",
                type: "radio",
                options: ["No Acute Distress (NAD)", "High arch", "Cleft"]
                  .map(v => ({ label: v, value: v }))
              },
          //   ]
          // },

          // {
          //   type: "row",
          //   fields: [
              {
                name: "softPalate",
                label: "Soft palate",
                type: "radio",
                labelAbove: true,
                options: [
                  "No Acute Distress (NAD)",
                  "Reduced elevation",
                  "Bifid uvula",
                  "Scarring",
                  "VPI - suspected"
                ].map(v => ({ label: v, value: v }))
              },
              {
                name: "nasalResonance",
                label: "Quality of nasal resonance",
                type: "radio",
                options: ["WNL (Within Normal Limits)", "Hypernasal", "Hyponasal"]
                  .map(v => ({ label: v, value: v }))
              },
          //   ]
          // },

          // {
          //   type: "row",
          //   fields: [
              {
                name: "tongue",
                label: "Tongue",
                type: "radio",
                options: [
                  "No Acute Distress (NAD)",
                  "Deviation",
                  "Fasciculations",
                  "Thrush",
                  "Reduced ROM"
                ].map(v => ({ label: v, value: v }))
              },
              {
                name: "lips",
                label: "Lips",
                type: "radio",
                options: [
                  "No Acute Distress (NAD)",
                  "Reduced seal",
                  "Asymmetry",
                  "Cleft",
                  "Scarring"
                ].map(v => ({ label: v, value: v }))
              },
          //   ]
          // },

          {
            name: "oralRemarks",
            label: "Remarks",
            type: "textarea"
          },

          /* ================= LANGUAGE ASSESSMENT ================= */

          {
            name: "enableLanguageAssessment",
            label: "Language Assessment",
            type: "radio",
            options: [
              { label: "Yes", value: "YES" },
              { label: "No", value: "NO" }
            ]
          },



          {
            name: "languageTools",
            label: "Assessment tool",
            type: "checkbox-group",
            options: [
              "Preschool Language Scales – Fifth Edition (PLS-5)",
              "Clinical Evaluation of Language Fundamentals – Fifth Edition (CELF-5)",
              "Malay Preschool Language Assessment Tool (MPLAT)",
              "MyBacaUji",
              "Primary Test of Nonverbal Intelligence (PTONI)",
              "MacArthur Communicative Development Inventories (MacArthur CDI)",
              "Other"
            ].map(v => ({ label: v, value: v })),
            showIf: {
              field: "enableLanguageAssessment",
              equals: "YES"
            }
          },

          {
            type: "multi-select-details",
            sourceField: "languageTools",
            labelPrefix: "Scores and Details for",
            namePrefix: "languageTools_detail",
            showIf: {
              field: "enableLanguageAssessment",
              equals: "YES"
            }
          },



          {
            name: "languageImpairments",
            label: "Impairments observed in",
            type: "checkbox-group",
            options: [
              "Receptive language",
              "Expressive language",
              "Pragmatic / functional communication",
              "Attention and listening",
              "Play and interaction",
              "Cognitive-communication skills",
              "Literacy / pre-literacy skills",
              "Other"
            ].map(v => ({ label: v, value: v })),
            showIf: {
              field: "enableLanguageAssessment",
              equals: "YES"
            }
          },

          {
            name: "languageImpairments_other",
            label: "Other",
            type: "textarea",
            showIf: {
              field: "languageImpairments",
              includes: "Other"
            }
          },



          /* ================= SPEECH ASSESSMENT ================= */

          {
            name: "enableSpeechAssessment",
            label: "Speech Assessment",
            type: "radio",
            options: [
              { label: "Yes", value: "YES" },
              { label: "No", value: "NO" }
            ]
          },

          {
            name: "speechTools",
            label: "Assessment tool",
            type: "checkbox-group",
            options: [
              { label: "Malay Speech Evaluation Kit (MSPEAK)", value: "MSPEAK" },
              { label: "Goldman–Fristoe Test of Articulation – Third Edition (GFTA-3)", value: "GFTA-3" },
              { label: "Stuttering Severity Instrument – Fourth Edition (SSI-4)", value: "SSI-4" },
              { label: "The One Page Stuttering Assessment (OPSA)", value: "OPSA" },
              { label: "Stimulability Testing", value: "Stimulability" }
            ],
            showIf: {
              field: "enableSpeechAssessment",
              equals: "YES"
            }
          },
          {
            type: "multi-select-details",
            sourceField: "speechTools",
            labelPrefix: "Scores and Details for",
            namePrefix: "speechTools_detail",
            showIf: {
              field: "enableSpeechAssessment",
              equals: "YES"
            }
          },

          {
            name: "speechImpairments",
            label: "Impairments observed in",
            type: "checkbox-group",
            options: [
              "Articulation",
              "Phonology",
              "Oral-motor control",
              "Resonance",
              "Voice quality",
              "Prosody / rate / rhythm",
              "Intelligibility",
              "Stimulability",
              "Other"
            ].map(v => ({ label: v, value: v })),
            showIf: {
              field: "enableSpeechAssessment",
              equals: "YES"
            }
          },
          {
            name: "intelligibilityRating",
            label: "Intelligibility rating",
            type: "textarea",
            showIf: {
              field: "enableSpeechAssessment",
              equals: "YES"
            }
          },

          /* ================= SOCIAL COMMUNICATION ================= */
          {
            name: "enableSocialCommunication",
            label: "Social Communication",
            type: "radio",
            options: [
              { label: "Yes", value: "YES" },
              { label: "No", value: "NO" }
            ]
          },



          {
            name: "socialTools",
            label: "Assessment tool",
            type: "checkbox-group",
            options: [
              "Observation",
              "Pragmatic profile",
              "Other"
            ].map(v => ({ label: v, value: v })),
            showIf: {
              field: "enableSocialCommunication",
              equals: "YES"
            }
          },

          {
            name: "socialTools_other",
            label: "Other",
            type: "textarea",
            showIf: {
              field: "socialTools",
              includes: "Other"
            }
          },

          {
            name: "socialImpairments",
            label: "Impairments observed in",
            type: "checkbox-group",
            options: [
              "Response to name",
              "Functional play",
              "Turn-taking",
              "Joint attention",
              "Use of gestures",
              "Eye contact",
              "Sensory behaviours",
              "Imitation skills",
              "Emotional reciprocity",
              "Other"
            ].map(v => ({ label: v, value: v })),
            showIf: {
              field: "enableSocialCommunication",
              equals: "YES"
            }
          },

          {
            name: "socialImpairments_other",
            label: "Other",
            type: "textarea",
            showIf: {
              field: "socialImpairments",
              includes: "Other"
            }
          }


        ]
      },
    ]
  };

  /* ================= ASSESSMENT ================= */

  const ASSESSMENT_SCHEMA = {
    title: "",
    sections: [
      {
        title: "Assessment",
        fields: [

          /* ================= DIAGNOSES / FINDINGS ================= */

          {
            type: "subheading",
            label: ""
          },

          {
            name: "noDisorder",
            label: "No speech and language disorders observed",
            type: "radio",
            options: [
              { label: "Yes", value: "YES" },
              { label: "No", value: "NO" }
            ]
          },

          {
            name: "diagnoses",
            label: "The child presents with",
            type: "checkbox-group",
            options: [
              "Specific speech articulation disorder",
              "Receptive language disorder",
              "Expressive language disorder",
              "Mixed receptive-expressive language disorder",
              "Acquired aphasia with epilepsy [Landau-Kleffner]",
              "Other developmental disorders of speech and language",
              "Developmental disorder of speech and language, unspecified",
              "Other and unspecified speech disturbances",
              "Specific reading disorder",
              "Specific spelling disorder",
              "Stuttering [stammering]",
              "Cluttering"
            ].map(v => ({ label: v, value: v }))
          },

          {
            name: "phonologicalType",
            label: "Type (Phonological disorder / Speech articulation disorder)",
            type: "textarea",
            showIf: {
              field: "diagnoses",
              includes: "Specific speech articulation disorder"
            }
          },


          {
            name: "analysisRemarks",
            label: "Remarks",
            type: "textarea"
          },

          {
            name: "overallSeverity",
            label: "Overall severity",
            type: "single-select",
            options: [
              { label: "Mild", value: "mild" },
              { label: "Moderate", value: "moderate" },
              { label: "Severe", value: "severe" }
            ]
          },

          /* ================= ICF FUNCTIONAL IMPACT ================= */


        ]
      },
    ]
  };

  /* ================= PLAN ================= */

  const PLAN_SCHEMA = {
    title: "",
    sections: [
      {
        title: "Plan",
        fields: [
          {
            name: "Others",
            label: "Others",
            type: "textarea"
          },

        ]
      }
    ]
  };

  const OBJECTIVE_SCHEMA_NO_COMMON = {
    ...OBJECTIVE_SCHEMA,
    sections: (OBJECTIVE_SCHEMA.sections || []).map(sec => ({
      ...sec,
      fields: (sec.fields || [])
        .filter(f => {
          // Common sections are rendered above SOAP. Strip both the fields and
          // the related subheading labels from the SOAP tabs to avoid duplicates.
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
            "sitting",
            "behaviouralRegulation",
            "teeth",
            "hardPalate",
            "softPalate",
            "nasalResonance",
            "tongue",
            "lips",
            "oralRemarks"
          ].includes(f?.name);
        })
        .flatMap(f => {
          // If a schema uses `type: "row"` only to group radio buttons,
          // flatten it so radios are rendered as normal standalone radio fields.
          if (f?.type === "row" && Array.isArray(f.fields)) {
            const nonPlaceholder = f.fields.filter(
              child => !(child?.type === "subheading" && (!child?.label || child.label === ""))
            );
            const allRadios =
              nonPlaceholder.length > 0 && nonPlaceholder.every(child => child?.type === "radio");
            if (allRadios) return nonPlaceholder;
          }
          return [f];
        })
    }))
  };
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

  const schemaMap = useMemo(() => {
    const base = {
      subjective: SUBJECTIVE_SCHEMA_NO_COMMON,
      objective: OBJECTIVE_SCHEMA_NO_COMMON,
      assessment: ASSESSMENT_SCHEMA,
      plan: PLAN_SCHEMA
    };
    if (!isFollowup) return base;
    return {
      ...base,
      subjective: applyOptionalSections(SUBJECTIVE_SCHEMA_NO_COMMON, PAED_SPEECH_OPTIONAL_SECTIONS.subjective),
      objective: applyOptionalSections(OBJECTIVE_SCHEMA_NO_COMMON, PAED_SPEECH_OPTIONAL_SECTIONS.objective)
    };
  }, [isFollowup]);

  const commonSchema = useMemo(() => {
    if (!isFollowup) return COMMON_SCHEMA;
    return applyOptionalSections(COMMON_SCHEMA, PAED_SPEECH_OPTIONAL_SECTIONS.common);
  }, [isFollowup]);
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

  const tabOrder = ["subjective", "objective", "assessment", "plan"];
const section = {
  marginBottom: 24
};

const patientGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 12,
  fontSize: 14
};
  return (
    <div style={mainContent}>
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
      />

      {/* ===== NAVIGATION ===== */}

      <div style={submitRow}>
        {activeTab !== "plan" ? (
          <button
            style={submitBtn}
            onClick={() => {
              const idx = tabOrder.indexOf(activeTab);
              const next = tabOrder[idx + 1];
              setActiveTab(next);
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

    </div>
  );
}

/* ================= STYLES ================= */
const mainContent = { margin: "0 auto" };
const sectionCard = {
  background: "#fff",
  padding: 20,
  borderRadius: 10,
  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  marginBottom: 20
};
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
  marginTop: 20
};

const submitBtn = {
  padding: "12px 32px",
  background: "#2563EB",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  fontWeight: 600
};