import React, { useState } from "react";
import CommonFormBuilder from "../CommonComponenets/FormBuilder";

export default function PaedIASpeechLanguage() {
    const [values, setValues] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const onChange = (name, value) => {
        setValues(v => ({ ...v, [name]: value }));
    };

    const onAction = (type) => {
        if (type === "submit") {
            setSubmitted(true);
            console.log("PADEL IA Speech & Language", values);
        }
    };

    const SCHEMA = {
        title: "Paediatric Initial Assessment",
        subtitle: "Speech & Language",


        sections: [


            {
                title: "S – Subjective",
                fields: [
                    {
                        name: "accompaniedBy",
                        label: "Patient was seen",
                        type: "single-select",
                        options: [
                            { label: "Unaccompanied", value: "unaccompanied" },
                            { label: "Accompanied by parent(s)/guardian(s)", value: "accompanied" }
                        ]
                    },

                    {
                        name: "consent",
                        label: "Consent",
                        type: "textarea",
                        helper:
                            "Verbal consent was obtained from the caregiver. The child was seen in his/her/their best interest."
                    },


                    {
                        type: "subheading",
                        label: "Chief Complaint"
                    },
                    {
                        name: "chiefComplaint",
                        label: "Family / caregiver reported (tick all that apply)",
                        type: "multi-select-dropdown",
                        options: [
                            { label: "Understanding spoken language", value: "receptive" },
                            { label: "Expressive language (vocabulary/sentence structure/gestural communication)", value: "expressive" },
                            { label: "Speech clarity", value: "speech" },
                            { label: "Social communication / play skills", value: "social" },
                            { label: "Fluency", value: "fluency" },
                            { label: "Voice quality", value: "voice" },
                            { label: "Feeding / swallowing", value: "feeding" },
                            {
                                label: "Behavioural regulation / attention affecting communication",
                                value: "behaviour"
                            },
                            {
                                label: "Developmental delay/global developmental delay (if applicable)",
                                value: "Developmental"
                            }
                        ]
                    },



                    /* ================= BIRTH HISTORY ================= */

                    {
                        type: "subheading",
                        label: "Birth History"
                    },

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
                            { label: "SVD", value: "svd" },
                            { label: "C-section", value: "csection" },
                            { label: "Forceps", value: "forceps" },
                            { label: "Vacuum", value: "vacuum" }
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
                        type: "textarea"
                    },

                    /* ================= MEDICAL HISTORY ================= */

                    {
                        type: "subheading",
                        label: "Medical History"
                    },
                    {
                        name: "medicalHistory",
                        label: "Check all that apply",
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
                            "Seizure"
                        ].map(v => ({ label: v, value: v }))
                    },


                    {
                        name: "otherMedical",
                        label: "Other medical / genetic diagnoses",
                        type: "textarea"
                    },

                    {
                        name: "additionalMedical",
                        label: "Additional medical information",
                        type: "textarea"
                    },

                    /* ================= FAMILY HISTORY ================= */

                    {
                        type: "subheading",
                        label: "Family History"
                    },

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
                            "Grandparent(s)"
                        ].map(v => ({ label: v, value: v }))
                    },

                    {
                        name: "livesWithOther",
                        label: "Other",
                        type: "input"
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

                    /* ================= DEVELOPMENTAL HISTORY ================= */

                    {
                        type: "subheading",
                        label: "Developmental History"
                    },

                    {
                        label: "Approximate age at which your child reached the following milestones:",
                        type: "subheading"
                    },

                    /* ================= MOTOR ================= */

                    {
                        type: "subheading",
                        label: "Motor"
                    },

                    {
                        name: "sitAge",
                        type: "inline-input",
                        inlineLabel: "Sit:",
                        placeholder: "month"
                    },

                    {
                        name: "crawlAge",
                        type: "inline-input",
                        inlineLabel: "Crawl:",
                        placeholder: "month"
                    },

                    {
                        name: "standAge",
                        type: "inline-input",
                        inlineLabel: "Stand:",
                        placeholder: "month"
                    },

                    {
                        name: "walkAge",
                        type: "inline-input",
                        inlineLabel: "Walk:",
                        placeholder: "month"
                    },

                    /* ================= SPEECH ================= */

                    {
                        type: "subheading",
                        label: "Speech"
                    },

                    {
                        name: "vocaliseAge",
                        type: "inline-input",
                        inlineLabel: "Vocalise:",
                        placeholder: "month"
                    },

                    {
                        name: "babbleAge",
                        type: "inline-input",
                        inlineLabel: "Babble:",
                        placeholder: "month"
                    },

                    {
                        name: "firstWordAge",
                        type: "inline-input",
                        inlineLabel: "First word:",
                        placeholder: "month"
                    },

                    {
                        name: "combineWordAge",
                        type: "inline-input",
                        inlineLabel: "Combining words:",
                        placeholder: "month"
                    },




                    /* ================= EDUCATION / INTERVENTION ================= */

                    {
                        type: "subheading",
                        label: "Education / Intervention"
                    },

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
                title: "O – Objective",
                fields: [

                    /* ================= GENERAL OBSERVATION ================= */

                    {
                        type: "subheading",
                        label: "General Observation"
                    },

                    {
                        name: "sitting",
                        label: "Sitting in",
                        type: "single-select",
                        options: [
                            { label: "Chair", value: "chair" },
                            { label: "Wheelchair", value: "wheelchair" }
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
                            { label: "Requires sensory input / modulation", value: "sensory" }
                        ]
                    },

                    {
                        name: "primaryModeCommunication",
                        label: "Primary mode of communication",
                        type: "checkbox-group",
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
                    },

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
                    },

                    /* ================= COMMUNICATION SCREENING ================= */

                    {
                        type: "subheading",
                        label: "Communication Screening"
                    },

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
                    },

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
                    },

                    {
                        name: "expressiveLanguage",
                        label: "Expressive language",
                        type: "single-select",
                        options: [
                            { label: "WNL", value: "wnl" },
                            { label: "Reduced", value: "reduced" }
                        ]
                    },

                    {
                        name: "expressiveSpecify",
                        label: "If reduced, specify (vocab / grammar)",
                        type: "textarea"
                    },

                    {
                        name: "intelligibilityFamiliar",
                        label: "Intelligibility to familiar listener",
                        type: "single-select",
                        options: ["WNL", "Reduced"].map(v => ({ label: v, value: v }))
                    },

                    {
                        name: "intelligibilityUnfamiliar",
                        label: "Intelligibility to unfamiliar listener",
                        type: "single-select",
                        options: ["WNL", "Reduced"].map(v => ({ label: v, value: v }))
                    },

                    {
                        name: "speechSoundErrors",
                        label: "Speech sound errors",
                        type: "checkbox-group",
                        options: [
                            { label: "Articulation", value: "articulation" },
                            { label: "Phonological patterns noted", value: "phonological" }
                        ]
                    },

                    {
                        name: "fluency",
                        label: "Fluency",
                        type: "single-select",
                        options: [
                            { label: "WNL", value: "wnl" },
                            { label: "Atypical dysfluencies", value: "atypical" }
                        ]
                    },

                    {
                        name: "voice",
                        label: "Voice",
                        type: "single-select",
                        options: [
                            { label: "WNL", value: "wnl" },
                            { label: "Hoarse", value: "hoarse" },
                            { label: "Breathiness", value: "breathy" },
                            { label: "Strain", value: "strain" }
                        ]
                    },

                    {
                        name: "pragmatics",
                        label: "Pragmatics",
                        type: "checkbox-group",
                        options: [
                            { label: "WNL", value: "wnl" },
                            { label: "Reduced eye gaze", value: "eye_gaze" },
                            { label: "Reduced turn-taking", value: "turn_taking" },
                            { label: "Literal interpretation", value: "literal" }
                        ]
                    },

                    {
                        name: "aacUse",
                        label: "AAC use",
                        type: "radio",
                        options: [
                            { label: "Yes", value: "YES" },
                            { label: "No", value: "NO" }
                        ]
                    },

                    {
                        name: "aacEffectiveness",
                        label: "Effectiveness noted",
                        type: "textarea"
                    },

                    /* ================= ORAL MOTOR ================= */

                    {
                        type: "subheading",
                        label: "Oral-motor structure & function observation"
                    },

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
                        options: ["NAD", "High arch", "Cleft"].map(v => ({ label: v, value: v }))
                    },

                    {
                        name: "softPalate",
                        label: "Soft palate",
                        type: "single-select",
                        options: [
                            "NAD",
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
                        options: ["WNL", "Hypernasal", "Hyponasal"].map(v => ({ label: v, value: v }))
                    },

                    {
                        name: "tongue",
                        label: "Tongue",
                        type: "checkbox-group",
                        options: [
                            "NAD",
                            "Deviation",
                            "Fasciculations",
                            "Thrush",
                            "Reduced ROM"
                        ].map(v => ({ label: v, value: v }))
                    },

                    {
                        name: "lips",
                        label: "Lips",
                        type: "checkbox-group",
                        options: [
                            "NAD",
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
                    },

                    /* ================= LANGUAGE ASSESSMENT ================= */

                    {
                        type: "subheading",
                        label: "Language Assessment"
                    },

                    // {
                    //     name: "languageCodes",
                    //     label: "Assessment codes",
                    //     type: "checkbox-group",
                    //     options: [
                    //         {
                    //             label: " Assessment of receiving spoken messages",
                    //             value: "sea"
                    //         },
                    //         {
                    //             label: " Assessment of producing communication, not elsewhere classified",
                    //             value: "sf2"
                    //         }
                    //     ]
                    // },

                    {
                        name: "languageTools",
                        label: "Assessment tool",
                        type: "checkbox-group",
                        options: [
                            "PLS-5",
                            "CELF-5",
                            "MPLAT",
                            "MyBacaUji",
                            "PTONI",
                            "MacArthur CDI"
                        ].map(v => ({ label: v, value: v }))
                    },

                    {
                        name: "languageOther",
                        label: "Other",
                        type: "input"
                    },

                    {
                        name: "languageScore",
                        label: "Score",
                        type: "input"
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
                        ].map(v => ({ label: v, value: v }))
                    },

                    /* ================= SPEECH ASSESSMENT ================= */

                    {
                        type: "subheading",
                        label: "Speech Assessment"
                    },

                    {
                        name: "speechTools",
                        label: "Assessment tool",
                        type: "checkbox-group",
                        options: [
                            "MSPEAK",
                            "GFTA-3",
                            "SSI-4",
                            "The One Page Stuttering Assessment",
                            "Stimulability testing"
                        ].map(v => ({ label: v, value: v }))
                    },

                    {
                        name: "speechScore",
                        label: "Score",
                        type: "input"
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
                        ].map(v => ({ label: v, value: v }))
                    },

                    {
                        name: "intelligibilityRating",
                        label: "Intelligibility rating",
                        type: "input"
                    },

                    /* ================= SOCIAL COMMUNICATION ================= */

                    {
                        type: "subheading",
                        label: "Social Communication"
                    },

                    {
                        name: "socialTools",
                        label: "Assessment tool",
                        type: "checkbox-group",
                        options: [
                            "Observation",
                            "Pragmatic profile",
                            "Other"
                        ].map(v => ({ label: v, value: v }))
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
                        ].map(v => ({ label: v, value: v }))
                    }
                ]
            },
            {
                title: "A – Analysis / Assessment",
                fields: [

                    /* ================= DIAGNOSES / FINDINGS ================= */

                    {
                        type: "subheading",
                        label: "Diagnoses / Findings (ICD-10) – tick all that apply"
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
                        label: "Type (if applicable)",
                        type: "input",
                        helper: "Phonological disorder / Speech articulation disorder"
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

                    {
                        type: "subheading",
                        label: "ICF Functional Impact"
                    },

                    {
                        name: "icfBodyFunctions",
                        label: "Body Functions",
                        type: "multi-select-dropdown",
                        options: [
                            "Mental functions of language",
                            "Reception of language",
                            "Expression of language",
                            "Integrative language functions",
                            "Articulation",
                            "Fluency of speech",
                            " Voice functions"
                        ].map(v => ({ label: v, value: v }))
                    },

                    {
                        name: "icfActivitiesParticipation",
                        label: "Activities & Participation",
                        type: "multi-select-dropdown",
                        options: [
                            "Copying (for imitation / symbolic play)",
                            "Focusing attention",
                            "Receiving spoken messages",
                            "Speaking",
                            "Conversation"
                        ].map(v => ({ label: v, value: v }))
                    }
                ]
            },
            {
                title: "P – Plan",
                fields: [

                    /* ================= THERAPY ================= */

                    {
                        type: "subheading",
                        label: "Therapy"
                    },

                    {
                        name: "therapyPlan",
                        label: "Therapy",
                        type: "checkbox-group",
                        options: [
                            " Training in receiving spoken messages",
                            " Training in speaking",
                            " Training in producing communication"
                        ].map(v => ({ label: v, value: v }))
                    },

                    /* ================= OTHER MANAGEMENT ================= */

                    {
                        type: "subheading",
                        label: "Other Management"
                    },

                    {
                        name: "referralSpecialist",
                        label: "Referral – Specialist",
                        type: "input"
                    },

                    /* ================= FURTHER ASSESSMENT ================= */

                    {
                        type: "subheading",
                        label: "Further Assessment"
                    },

                    {
                        name: "furtherAssessment",
                        label: "Further assessment required",
                        type: "multi-select-dropdown",
                        options: [
                            "Assessment of communication, unspecified",
                            "Test of communication, unspecified",
                            "Observation of communication, unspecified",
                            "Interview in relation to communication, unspecified",
                            "Assessment of ingestion functions",
                            "Assessment of swallowing",
                            "Assessment of reading",
                            "Assessment of writing"
                        ].map(v => ({ label: v, value: v }))
                    }
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
