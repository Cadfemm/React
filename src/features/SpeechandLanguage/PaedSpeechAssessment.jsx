import React, { useState } from "react";
import CommonFormBuilder from "../CommonComponenets/FormBuilder";

export default function PaedIASpeechLanguage({onBack}) {
    const [values, setValues] = useState({
        languageTools: [],
        languageImpairments: [],
        speechTools: [],
        speechImpairments: [],
        socialTools: [],
        socialImpairments: [],
        medicalHistory: [],
        chiefComplaint: [],
        knownFamilyHistory: [],
        languagesAtHome: [],
        diagnoses: [],
        icfBodyFunctions: [],
        icfActivitiesParticipation: [],
        furtherAssessment: []
    });
    const [submitted, setSubmitted] = useState(false);

    const onChange = (name, value) => {
        setValues(v => ({ ...v, [name]: value }));
    };

  const onAction = (type) => {
  if (type === "submit") {
    setSubmitted(true);
    console.log("PAED IA Speech & Language", values);
  }

  if (type === "back") {
    onBack?.();   // go back to Patients page
  }
};

    const SCHEMA = {
        title: "Paediatric Speech & Language",
        actions: [
    { type: "back", label: "Back" },
  ],
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
      type: "multi-select-dropdown",
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

{
  type: "row",
  fields: [
    {
      name: "pregnancy",
      label: "Pregnancy",
      type: "single-select",
      options: [
        { label: "Term", value: "term" },
        { label: "Preterm", value: "preterm" }
      ]
    },
    {
      name: "delivery",
      label: "Type of delivery",
      type: "single-select",
      options: [
        { label: "Spontaneous Vaginal Delivery (SVD)", value: "svd" },
        { label: "C-section", value: "csection" },
        { label: "Forceps", value: "forceps" },
        { label: "Vacuum", value: "vacuum" }
      ]
    }
  ]
},

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
      type: "multi-select-dropdown",
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
      type: "single-select",
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
      type: "multi-select-dropdown",
      options: [
        "Speech and language difficulties",
        "Learning disabilities (ex: dyslexia)",
        "Hearing impairment"
      ].map(v => ({ label: v, value: v }))
    },

    {
      name: "languagesAtHome",
      label: "Languages spoken at home",
      type: "multi-select-dropdown",
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

    { type: "subheading", label: "Developmental History" },

    {
      type: "subheading",
      label: "Approximate age at which your child reached the following milestones:"
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
},


            {
                title: "Objective",
                fields: [

                    /* ================= GENERAL OBSERVATION ================= */

                 {
  type: "subheading",
  label: "General Observation"
},

{
  type: "row",
  fields: [
    {
      name: "sitting",
      label: "Sitting in",
      type: "single-select",
      options: [
        { label: "Chair", value: "chair" },
        { label: "Wheel chair", value: "wheelchair" }
      ]
    },
    {
      name: "behaviouralRegulation",
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
  type: "row",
  fields: [
    {
      name: "primaryModeCommunication",
      label: "Primary mode of communication",
      type: "single-select",
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
      type: "single-select",
      options: [
        { label: "Functional", value: "functional" },
        { label: "Symbolic", value: "symbolic" },
        { label: "Sensory-seeking", value: "sensory" },
        { label: "Limited play", value: "limited" }
      ]
    }
  ]
},

{
  type: "row",
  fields: [
    {
      name: "eyeContact",
      label: "Eye contact",
      type: "single-select",
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
      type: "single-select",
      options: [
        { label: "Initiates", value: "initiates" },
        { label: "Responds only", value: "responds" },
        { label: "Passive", value: "passive" }
      ]
    }
  ]
},


                    /* ================= COMMUNICATION SCREENING ================= */

{
  type: "subheading",
  label: "Communication Screening"
},

{
  type: "row",
  fields: [
    {
      name: "jointAttention",
      label: "Joint attention",
      type: "single-select",
      options: ["Intact", "Reduced", "Absent"].map(v => ({ label: v, value: v }))
    },
    {
      name: "conversationalReciprocity",
      label: "Conversational reciprocity",
      type: "single-select",
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
      type: "single-select",
      options: ["Intact", "Reduced"].map(v => ({ label: v, value: v }))
    },
    {
      name: "twoStepCommands",
      label: "Comprehension of 2-step commands",
      type: "single-select",
      options: ["Intact", "Reduced"].map(v => ({ label: v, value: v }))
    }
  ]
},

{
  type: "row",
  fields: [
    {
      name: "expressiveLanguage",
      label: "Expressive language",
      type: "single-select",
      options: [
        { label: "WNL (Within Normal Limits)", value: "wnl" },
        { label: "Reduced", value: "reduced" }
      ]
    },
    {
      name: "intelligibilityFamiliar",
      label: "Intelligibility to familiar listener",
      type: "single-select",
      options: ["WNL (Within Normal Limits)", "Reduced"].map(v => ({ label: v, value: v }))
    }
  ]
},

{
  name: "expressiveSpecify",
  label: "If reduced, specify (vocabulary / grammar)",
  type: "textarea",
  showIf: {
    field: "expressiveLanguage",
    equals: "reduced"
  }
},

{
  type: "row",
  fields: [
    {
      name: "intelligibilityUnfamiliar",
      label: "Intelligibility to unfamiliar listener",
      type: "single-select",
      options: ["WNL (Within Normal Limits)", "Reduced"].map(v => ({ label: v, value: v }))
    },
    {
      name: "speechSoundErrors",
      label: "Speech sound errors",
      type: "single-select",
      options: [
        { label: "Articulation", value: "articulation" },
        { label: "Phonological patterns noted", value: "phonological" }
      ]
    }
  ]
},

{
  type: "row",
  fields: [
    {
      name: "fluency",
      label: "Fluency",
      type: "single-select",
      options: [
        { label: "WNL (Within Normal Limits)", value: "wnl" },
        { label: "Atypical dysfluencies", value: "atypical" }
      ]
    },
    {
      name: "voice",
      label: "Voice",
      type: "single-select",
      options: [
        { label: "WNL (Within Normal Limits)", value: "wnl" },
        { label: "Hoarse", value: "hoarse" },
        { label: "Breathiness", value: "breathy" },
        { label: "Strain", value: "strain" }
      ]
    }
  ]
},

{
  type: "row",
  fields: [
    {
      name: "pragmatics",
      label: "Pragmatics",
      type: "single-select",
      options: [
        { label: "WNL (Within Normal Limits)", value: "wnl" },
        { label: "Reduced eye gaze", value: "eye_gaze" },
        { label: "Reduced turn-taking", value: "turn_taking" },
        { label: "Literal interpretation", value: "literal" }
      ]
    },
   
  ]
},


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

{
  type: "row",
  fields: [
    {
      name: "teeth",
      label: "Teeth",
      type: "single-select",
      options: ["Complete", "Incomplete"].map(v => ({ label: v, value: v }))
    },
    {
      name: "hardPalate",
      label: "Hard palate",
      type: "single-select",
      options: ["No Acute Distress (NAD)", "High arch", "Cleft"]
        .map(v => ({ label: v, value: v }))
    }
  ]
},

{
  type: "row",
  fields: [
    {
      name: "softPalate",
      label: "Soft palate",
      type: "single-select",
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
      type: "single-select",
      options: ["WNL (Within Normal Limits)", "Hypernasal", "Hyponasal"]
        .map(v => ({ label: v, value: v }))
    }
  ]
},

{
  type: "row",
  fields: [
    {
      name: "tongue",
      label: "Tongue",
      type: "single-select",
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
      type: "single-select",
      options: [
        "No Acute Distress (NAD)",
        "Reduced seal",
        "Asymmetry",
        "Cleft",
        "Scarring"
      ].map(v => ({ label: v, value: v }))
    }
  ]
},

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
  type: "multi-select-dropdown",
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
  type: "multi-select-dropdown",
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
  type: "multi-select-dropdown",
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
  type: "multi-select-dropdown",
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
  type: "multi-select-dropdown",
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
  type: "multi-select-dropdown",
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
                        type: "multi-select-dropdown",
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

    return (
        <CommonFormBuilder
            schema={SCHEMA}
            values={values}
            onChange={onChange}
            submitted={submitted}
            onAction={onAction}
        />
    );
}
