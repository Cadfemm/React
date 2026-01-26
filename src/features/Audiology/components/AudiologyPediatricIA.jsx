import React, { useEffect, useState } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

/* ===================== OPTIONS ===================== */

const INTACT_IMPAIRED = [
  { label: "Intact", value: "intact" },
  { label: "Impaired", value: "impaired" }
];

const IMPAIRED_LOCATION = [
  { label: "Right", value: "right" },
  { label: "Left", value: "left" },
  { label: "Bilateral", value: "bilateral" }
];
const YES_NO = [
  { label: "Yes", value: "1" },
  { label: "No", value: "0" }
];

const FULLTERM_PRETERM = [
  { label: "Full term", value: "0" },
  { label: "Pre-term", value: "1" }];
/* ===================== COMPONENT ===================== */

export default function AudiologyDepartmentPediatricPage({ patient, onSubmit, onBack }) {
  const [values, setValues] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState("subjective");

  /* ---------------- STORAGE ---------------- */
  const storageKey = patient
    ? `audiology_assessment_draft_${patient.id}`
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
        patient.diagnosis_history || "No data available"
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
      alert("Audiology draft saved");
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    onSubmit?.(values);
    alert("Audiology assessment submitted");
  };

  /* ===================== SCHEMAS ===================== */

const SUBJECTIVE_SCHEMA = {
  actions: [
    { type: "back", label: "Back" },
    { type: "clear", label: "Clear" },
    { type: "save", label: "Save" }
  ],
  sections: [

    /* ===================== A. PRENATAL & DELIVERY HISTORY ===================== */
    {
      title: "A. Prenatal and Delivery History",
      fields: [
        {
          name: "length_of_pregnancy",
          label: "Length of pregnancy",
          type: "radio",
          options: FULLTERM_PRETERM
        },

{
  name: "length_of_pregnancy_notes",
  label: "",
  type: "textarea",
  showIf: { field: "length_of_pregnancy", equals: "1" }
},
        {
          name: "birth_weight",
          label: "Birth Weight",
          type: "textarea"
        },

        {
          name: "pregnancy_complications",
          label: "Complication during pregnancy",
          type: "radio",
          options: YES_NO
        },
        {
          name: "pregnancy_complications_notes",
          label: "",
          type: "textarea",
          showIf: { field: "pregnancy_complications", equals: "1" }
        },

        {
          name: "nicu_history",
          label: "Did the child spend any time in NICU?",
          type: "radio",
          options: FULLTERM_PRETERM
        },
        {
          name: "nicu_notes",
          label: "",
          type: "textarea",
          showIf: { field: "nicu_history", equals: "1" }
        },

        {
          name: "apgar_score",
          label: "APGAR Score",
          type: "textarea"
        },

        {
          name: "prenatal_risk_factors",
          label: "Did any of the following occur during pregnancy?",
          type: "multi-select-dropdown",
          options: [
            { label: "No", value: "0" },
            { label: "Alcohol abuse", value: "1" },
            { label: "Measles / Rubella", value: "2" },
            { label: "Infections", value: "3" },
            { label: "Substance abuse", value: "4" },
            { label: "Sexually transmitted disease", value: "5" },
            { label: "Communicable diseases", value: "6" },
            { label: "Maternal illness", value: "7" },
            { label: "Rh incompatibility", value: "8" },
            { label: "Toxemia", value: "9" },
            { label: "Zika virus", value: "10" },
            { label: "Cytomegalovirus (CMV)", value: "11" },
            { label: "Maternal X-rays", value: "12" },
            { label: "Smoking", value: "13" },
            { label: "Toxoplasmosis", value: "14" }
          ]
        },
        {
          name: "prenatal_risk_notes",
          label: "",
          type: "textarea",
        showIf: { field: "prenatal_risk_factors", exists: true }


        }
      ]
    },

    /* ===================== B. HEALTH HISTORY ===================== */
    {
      title: "B. Health History",
      fields: [
        {
          name: "ototoxic_medications",
          label: "Has your child taken any of the following medications?",
          type: "multi-select-dropdown",
          options: [
            { label: "No", value: "0" },
            { label: "Vancomycin", value: "1" },
            { label: "Chemotherapy", value: "2" },
            { label: "Gentamycin", value: "3" },
            { label: "Streptomycin", value: "4" },
            
          ]
        },
        {
          name: "ototoxic_notes",
          label: "",
          type: "textarea",
          showIf: { field: "ototoxic_medications", exists: true }
        },

        {
          name: "high_fever_history",
          label: "Has your child had a fever greater than 38 degree celcius?",
          type: "radio",
          options: YES_NO
        },
        {
          name: "high_fever_notes",
          label: "",
          type: "textarea",
          showIf: { field: "high_fever_history", equals: "1" }
        },

        {
          name: "hospitalisation_history",
          label: "Has your child ever been hospitalised?",
          type: "radio",
          options: YES_NO
        },
        {
          name: "hospitalisation_notes",
          label: "",
          type: "textarea",
           showIf: { field: "hospitalisation_history", equals: "1" }
        },

         {
          name: "specialist_history",
          label: "Has your child ever seen by a specialist?",
          type: "radio",
          options: YES_NO
        },
        {
          name: "specialist_notes",
          label: "",
          type: "textarea",
           showIf: { field: "specialist_history", equals: "1" }
        },

        {
          name: "ear_conditions",
          label: "Has your child had any of the following?",
          type: "multi-select-dropdown",
          options: [
            { label: "No", value: "0" },
            { label: "Allergies / Sinus problems", value: "1" },
            { label: "Ear infections", value: "2" },
            { label: "Draining ears", value: "3" },
            { label: "Chicken pox", value: "4" },
            { label: "Frequent colds", value: "5" },
            { label: "Head injury", value: "6" },
            { label: "Measles", value: "7" },
            { label: "Mumps", value: "8" },
            { label: "Tonsillitis", value: "9" },
            { label: "Seizures", value: "10" },
            { label: "Breathing difficulties", value: "11" },
            { label: "Flu", value: "12" },
            { label: "High fever", value: "13" },
            { label: "Meningitis", value: "14" },
            { label: "Blood transfusion", value: "15" },
            { label: "CMV", value: "16" },
            { label: "Encephalitis", value: "17" },
            { label: "Meconium aspiration", value: "18" },
            { label: "Rubella", value: "19" }
          ]
        },
        {
          name: "ear_conditions_notes",
          label: "",
          type: "textarea",
           showIf: { field: "ear_conditions", exists: true  }
        },
{
          name: "surgical_history",
          label: "Has your child had medical or surgical treatment of their ears? (grommet/ PE tubes)",
          type: "radio",
          options: YES_NO
        },
        {
          name: "surgical_notes",
          label: "",
          type: "textarea",
           showIf: { field: "surgical_history", equals: "1" }
        },
{
          name: "pain_history",
          label: "Does your child ever complain of pain or fullness of their ears?",
          type: "radio",
          options: YES_NO
        },
        {
          name: "pain_notes",
          label: "",
          type: "textarea",
           showIf: { field: "pain_history", equals: "1" }
        },
        
{
          name: "noise_history",
          label: "Has your child ever been exposed to loud noise or an explosion?",
          type: "radio",
          options: YES_NO
        },
        {
          name: "noise_notes",
          label: "",
          type: "textarea",
           showIf: { field: "noise_history", equals: "1" }
        },
{
          name: "noise_in_ear_history",
          label: "Has your child ever described noises on their ears?",
          type: "radio",
          options: YES_NO
        },
        {
          name: "noise_in_ear",
          label: "In which ear you feel noise",
          type: "radio",
          options: [
            { label: "Rigt", value: "Right" },
            { label: "Left", value: "Left" },
            { label: "bilateral", value: "bilateral" },
          ],
           showIf: { field: "noise_in_ear_history", equals: "1" }
        },

{
          name: "condition_history",
          label: "Has your child been diagnoses with any specific condition?",
          type: "radio",
          options: YES_NO
        },
        {
          name: "condition_notes",
          label: "",
          type: "textarea",
           showIf: { field: "condition_history", equals: "1" }
        },

        {
          name: "current_medications",
          label: "List any medication your child is taking",
          type: "textarea"
        }
      ]
    },

    /* ===================== C. DEVELOPMENTAL MILESTONES ===================== */
    {
      title: "C. Developmental Milestones",
      fields: [
        {type:"subheading",
            label:"At what age did your child:"
        },
        {
          type: "paired-text",
          pairs: [
          {  name: "first_word_age", title: "a) Say their first word?" },
          { name: "three_word_sentence_age", title: "b) Speak in three word sentences?" }
      ]},
              {
          type: "paired-text",
          pairs: [
          {  name: "head_control_age", title: "c) Hold their head erect?" },
          { name: "sit_unsupported_age", title: "d) Sit unsupported?" }
      ]},

        { name: "walk_alone_age", label: "e) Walk alone?", type: "textarea" },
 { name: "communicate_with_others", label: "How does your child communicate with others?", type: "textarea" },
       {type:"subheading",
        label:"How much of your child's speech can be understood?"
       },
 
 {
          name: "speech_understood_family",
          label: "Speech understood by family",
          type: "radio",
          options: YES_NO
        },
 {
          name: "speech_understood_family_notes",
          label: "",
          type: "textarea",
       showIf:{field:"speech_understood_family",equals:"1"}
        },

        {
          name: "speech_understood_others",
          label: "Speech understood by others",
          type: "radio",
          options: YES_NO
        },
{
          name: "speech_understood_others_notes",
          label: "",
          type: "textarea",
       showIf:{field:"speech_understood_others",equals:"1"}
        },
        {
          name: "speech_concerns",
          label: "Do you have any concerns regarding your childs's speech?",
          type: "radio",
          options: YES_NO
        },
{
          name: "speech_concerns_notes",
          label: "",
          type: "textarea",
       showIf:{field:"speech_concerns",equals:"1"}
        },

      ]
    },

    /* ===================== D. HEARING HISTORY ===================== */
    {
      title: "D. Hearing History",
      fields: [
        {
          name: "hearing_loss_risk_factors",
          label: "Factors associated with hearing loss",
          type: "multi-select-dropdown",
          options: [
            { label: "None", value: "0" },
            { label: "Family history of hearing loss", value: "1" },
            { label: "Jaundice (required transfusion)", value: "2" },
            { label: "Bacterial meningitis", value: "3" },
            { label: "Pulmonary hypertension", value: "4" },
            { label: "Head trauma (hospitalisation required)", value: "5" },
            { label: "CHARGE syndrome", value: "6" },
            { label: "Down syndrome (trisomy 21)", value: "7" },
            { label: "Cleft lip and palate", value: "8" },
            { label: "Small and absent pinna/ears", value: "9" },
            { label: "Skin tag or pits around ears", value: "10" },
            { label: "Rh incompatibility", value: "11" }
          ]
        },
        {
          name: "hearing_loss_risk_notes",
          label: "",
          type: "textarea",
          showIf:{field:"hearing_loss_risk_factors" ,exists:true}
        },
        {
          name: "family_member_hearing_loss",
          label: "Do any of your other childs/ siblings or other family member have hearing loss?",
          type: "radio",
          options: YES_NO
        },
                {
          name: "family_member_hearing_loss_notes",
          label: "",
          type: "textarea",
          showIf:{field:"family_member_hearing_loss" ,equals:"1"}
        },
        {
          name: "previous_hearing_test",
          label: "Has your child had a hearing test?",
          type: "radio",
          options: YES_NO
        },
                {
          name: "previous_hearing_test_notes",
          label: "",
          type: "textarea",
          showIf:{field:"previous_hearing_test" ,equals:"1"}
        },
                {
          name: "ear_infections",
          label: "How many ear infections has your child had and how often?",
          type: "radio",
          options: YES_NO
        },
                {
          name: "ear_infections_notes",
          label: "",
          type: "textarea",
          showIf:{field:"ear_infections" ,equals:"1"}
        },
{type:"subheading",label:"Does your child"},
        {
          name: "responds_to_sound",
          label: "a) Responds consistently to sound",
          type: "radio",
          options: YES_NO
        },
                {
          name: "responds_to_sound_notes",
          label: "",
          type: "textarea",
          showIf:{field:"responds_to_sound" ,equals:"1"}
        },
                {
          name: "turns_to_sound",
          label: "b) turn to find sound source",
          type: "radio",
          options: YES_NO
        },
                {
          name: "turns_to_sound_notes",
          label: "",
          type: "textarea",
          showIf:{field:"turns_to_sound" ,equals:"1"}
        },
        {
          name: "enjoys_music",
          label: "c) Enjoys listening to music",
          type: "radio",
          options: YES_NO
        },
                {
          name: "enjoys_music_notes",
          label: "",
          type: "textarea",
          showIf:{field:"enjoys_music" ,equals:"1"}
        },
        {
          name: "responds_to_name",
          label: "d)Respond to their name",
          type: "radio",
          options: YES_NO
        },
                {
          name: "responds_to_name_notes",
          label: "",
          type: "textarea",
          showIf:{field:"responds_to_name" ,equals:"1"}
        },

                {
          name: "startle_to_loud_sound",
          label: "e) startle to loud sound",
          type: "radio",
          options: YES_NO
        },
                {
          name: "startle_to_loud_sound_notes",
          label: "",
          type: "textarea",
          showIf:{field:"startle_to_loud_sound" ,equals:"1"}
        },


        {
          name: "amplification_use",
          label: "Does your child use any amplification devices?",
          type: "radio",
          options: YES_NO
        }
      ]
    },

    /* ===================== E. VESTIBULAR HISTORY ===================== */
    {
      title: "E. Vestibular History",
      fields: [
        {
          name: "balance_issues",
          label: "Does your child fall or lose balance easily?",
          type: "radio",
          options: YES_NO
        },
                {
          name: "balance_issues_notes",
          label: "",
          type: "textarea",
          showIf:{field:"balance_issues",equals:"1"}
        },
        {
          name: "dizziness_history",
          label: "Does your child has history of dizziness?",
          type: "radio",
          options: YES_NO
        },
        {
          name: "vestibular_notes",
          label: "",
          type: "textarea",
                    showIf:{field:"dizziness_history",equals:"1"}
        }
      ]
    },

    /* ===================== D. AUDIOMETRY ===================== */
    {
      fields: [
        {
          type: "attach-file",
          name: "audiometry_audiology_report",
          title: "Audiometry (Attach PDF)",
          accept: "application/pdf,image/*",
          multiple: false
        },

        {
          name: "audiometry_type",
          label: "Type of Audiometry",
          type: "radio",
          options: [
            { label: "Screening", value: "screening" },
            { label: "Diagnostic Pure Tone", value: "pta" },
            { label: "Play", value: "play" },
            { label: "Visual Reinforcement (VR)", value: "vra" }
          ]
        },

        {
          name: "masking",
          label: "Masking",
          type: "radio",
          options: [
            { label: "Unmasked", value: "unmasked" },
            { label: "Masking", value: "masked" }
          ]
        }
      ]
    }
  ]
};


const DB_HL_OPTIONS = [
  { label: "-20", value: -20 },
  { label: "-15", value: -15 },
  { label: "-10", value: -10 },
  { label: "-5", value: -5 },
  { label: "0", value: 0 },
  { label: "5", value: 5 },
  { label: "10", value: 10 },
  { label: "15", value: 15 },
  { label: "20", value: 20 },
  { label: "25", value: 25 },
  { label: "30", value: 30 },
  { label: "35", value: 35 },
  { label: "40", value: 40 },
  { label: "45", value: 45 },
  { label: "50", value: 50 },
  { label: "55", value: 55 },
  { label: "60", value: 60 },
  { label: "65", value: 65 },
  { label: "70", value: 70 },
  { label: "75", value: 75 },
  { label: "80", value: 80 },
  { label: "85", value: 85 },
  { label: "90", value: 90 },
  { label: "95", value: 95 },
  { label: "100", value: 100 },
  { label: "105", value: 105 },
  { label: "110", value: 110 },
  { label: "115", value: 115 },
  { label: "120", value: 120 }
];
const AUDIO_FREQUENCIES = [250, 500, 1000, 2000, 3000, 4000, 6000, 8000];

const OBJECTIVE_SCHEMA = {
  actions: SUBJECTIVE_SCHEMA.actions,
  sections: [
    /* ===================== TYMPANOMETRY ===================== */
    {
      title: "Tympanometry (Attach PDF)",
      fields: [
        {
          type: "row",
          columns: 2,
          fields: [
            {
              type: "attach-file",
              name: "tympanometry_report_right",
              accept: "application/pdf,image/*",
              title: "Tympanometry - Right",
              multiple: false,
              previewSize: { width: 400, height: 400 },
              hideInputAfterSelect: true
            },
            {
              type: "attach-file",
              name: "tympanometry_report_left",
              accept: "application/pdf,image/*",
              title: "Tympanometry - Left",
              multiple: false,
              previewSize: { width: 400, height: 400 },
              hideInputAfterSelect: true
            }
          ]
        },
        { type: "subheading", label: "Tympanogram Type" },
        {
          type: "paired-select",
          right: { name: "tymp_type_r", title: "Right Ear" },
          left: { name: "tymp_type_l", title: "Left Ear" },
          options: [
            { label: "Type A", value: "A" },
            { label: "Type As", value: "As" },
            { label: "Type Ad", value: "Ad" },
            { label: "Type B (Normal ECV)", value: "B_normal" },
            { label: "Type B (Small ECV)", value: "B_small" },
            { label: "Type B (Large ECV)", value: "B_large" },
            { label: "Type C", value: "C" }
          ]
        },

        {
          type: "paired-text",
          name: "peak_pressure",
          pairs: [
          { name: "peak_pressure_r", title: "Peak Pressure (daPa) – Right" },
          { name: "peak_pressure_l", title: "Peak Pressure (daPa) – Left" }
      ]},

        {
          type: "paired-text",
          name: "static_compliance",
          pairs: [
          { name: "static_compliance_r", title: "Static Compliance (ml / cm³) – Right" },
        { name: "static_compliance_l", title: "Static Compliance (ml / cm³) – Left" }]
        },

        {
          type: "paired-text",
          name: "ecv",
          pairs: [
            { name: "ecv_r", title: "Ear Canal Volume (ml / cm³) – Right" },
          { name: "ecv_l", title: "Ear Canal Volume (ml / cm³) – Left" }]
        }
      ]
    },

    /* ===================== OAE ===================== */
    {
      
      fields: [
        {
  type: "attach-file",
  name: "OAEaudiology_report",
  title: "OAE Screening (Attach PDF)",
  accept: "application/pdf,image/*",
  multiple: false
}, 
        {
          name: "oae_right",
          label: "OAE – Right Ear",
          type: "radio",
          options: [
            { label: "Pass", value: "pass" },
            { label: "Refer", value: "refer" },
          ]
        },
        {
          name: "oae_left",
          label: "OAE – Left Ear",
          type: "radio",
          options: [
            { label: "Pass", value: "pass" },
            { label: "Refer", value: "refer" },
          ]
        },

        {
          name: "dpoae_right",
          label: "DPOAE – Right Ear",
          type: "radio",
          options: [
            { label: "Pass", value: "pass" },
            { label: "Refer", value: "refer" },
          ]
        },
        {
          name: "dpoae_left",
          label: "DPOAE – Left Ear",
          type: "radio",
          options: [
            { label: "Pass", value: "pass" },
            { label: "Refer", value: "refer" },
          ]
        },

        {
          name: "teoae_right",
          label: "TEOAE – Right Ear",
          type: "radio",
          options: [
            { label: "Pass", value: "pass" },
            { label: "Refer", value: "refer" },
          ]
        },
        {
          name: "teoae_left",
          label: "TEOAE – Left Ear",
          type: "radio",
          options: [
            { label: "Pass", value: "pass" },
            { label: "Refer", value: "refer" },
          ]
        }
      ]
    },

    /* ===================== A – ANALYSIS ===================== */
    {
      fields: [
        {
          type: "row",
          columns: 2,
          fields: [
            {
              type: "attach-file",
              name: "otoscopic_examination_left",
              accept: "application/pdf,image/*",
              title: "Otoscopic Examination - Left",
              multiple: false,
              previewSize: { width: 400, height: 400 },
              hideInputAfterSelect: true
            },
            {
              type: "attach-file",
              name: "otoscopic_examination_right",
              accept: "application/pdf,image/*",
              title: "Otoscopic Examination - Right",
              multiple: false,
              previewSize: { width: 400, height: 400 },
              hideInputAfterSelect: true
            }
          ]
        }, 
        {
          type: "paired-select",
          left: { name: "external_canal_r", title: "External Ear Canal – Right" },
          right: { name: "external_canal_l", title: "External Ear Canal – Left" },
          options: [
            { label: "Clear", value: "clear" },
            { label: "Inflamed", value: "inflamed" },
            { label: "Minimal cerumen", value: "minimal_cerumen" },
            { label: "Impacted cerumen", value: "impacted_cerumen" },
            { label: "Discharge present", value: "discharge" },
            { label: "Swelling", value: "swelling" }
          ]
        },

        {
          type: "paired-select",
          left: { name: "tm_appearance_r", title: "Tympanic Membrane (TM) Appearance – Right" },
          right: { name: "tm_appearance_l", title: "Tympanic Membrane (TM) Appearance – Left" },
          options: [
            { label: "Intact", value: "intact" },
            { label: "Perforated", value: "perforated" },
            { label: "Dull", value: "dull" },
            { label: "Retracted", value: "retracted" },
            { label: "Bulging", value: "bulging" },
            { label: "Opaque", value: "opaque" }
          ]
        },

        {
          type: "paired-select",
          left: { name: "tm_colour_r", title: "TM Colour – Right" },
          right: { name: "tm_colour_l", title: "TM Colour – Left" },
          options: [
            { label: "Pearly grey", value: "pearly_grey" },
            { label: "Reddened", value: "red" },
            { label: "Yellowish", value: "yellow" },
            { label: "Bluish", value: "blue" },
            { label: "White patches", value: "white_patches" }
          ]
        },

        {
          type: "paired-text",
          pairs: [
                      { name: "otoscopy_other_l", title: "Other Findings – Left" },
          { name: "otoscopy_other_r", title: "Other Findings – Right" },
          ]
        }
      ]
    },

  ]
};


  const ASSESSMENT_SCHEMA = {
    actions: SUBJECTIVE_SCHEMA.actions,
    fields: [
      {
        name: "problem_list",
        label: "Problem Listing",
        type: "textarea"
      },
      {
        name: "clinical_impression",
        label: "Clinical Impression",
        type: "textarea"
      }
    ]
  };

  const PLAN_SCHEMA = {
    actions: SUBJECTIVE_SCHEMA.actions,
 fields: [
      {
        name: "plan_list",
        label: "Plan",
        type: "textarea"
      },]
  };

  const schemaMap = {
    subjective: SUBJECTIVE_SCHEMA,
    objective: OBJECTIVE_SCHEMA,
    assessment: ASSESSMENT_SCHEMA,
    plan: PLAN_SCHEMA
  };

  /* ===================== PATIENT INFO ===================== */
  const AUDIO_CONTAINER_SCHEMA = {
    title: "Patient Information",
    sections: []
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

  function AudioPatientInfo({ patient }) {
    if (!patient) return null;

    const handleDoctorsReport = () => {
      alert("Report will be generating soon");
    };

    return (
      <div style={section}>
        <div style={patientGrid}>
          <div><b>Name:</b> {patient.name}</div>
          <div><b>IC:</b> {patient.id}</div>
          <div><b>DOB:</b> {formatDate(patient.dob)}</div>
          <div><b>Age / Gender:</b> {patient.age} / {patient.sex}</div>
          <div><b>ICD:</b> {patient.icd}</div>
          <div><b>Date of Assessment:</b> {today.toLocaleDateString()}</div>
          <div style={{ gridColumn: "1 / -1" }}>
            <button style={doctorsReportBtn} onClick={handleDoctorsReport}>
              Doctors Reports
            </button>
          </div>
        </div>
      </div>
    );
  }

function AudiometryFrequencyTable({ value = {}, onChange }) {
  const frequencies = [250, 500, 1000, 2000, 3000, 4000, 6000, 8000];

  const columns = [
    { key: "ac_right", label: "Air Conduction Right (dB HL)" },
    { key: "ac_left", label: "Air Conduction Left (dB HL)" },
    { key: "bc_right", label: "Bone Conduction Right (dB HL)" },
    { key: "bc_left", label: "Bone Conduction Left (dB HL)" }
  ];

  const options = [
    -20, -15, -10, -5, 0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60,
    65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120
  ].map(v => ({ label: String(v), value: v }));

  return (
    <div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "120px repeat(4, 170px)",
          fontSize: 14,
          fontWeight: 600,
          gap:20,
          marginBottom: 8
        }}
      >
        <div>Frequency (Hz)</div>
        {columns.map(c => (
          <div key={c.key}>{c.label}</div>
        ))}
      </div>

      {frequencies.map(freq => (
        <div
          key={freq}
          style={{
            display: "grid",
            gridTemplateColumns: "120px repeat(4, 170px)",
            gap:20,
            gap: 12,
            marginBottom: 6
          }}
        >
          <div style={{ fontSize: 14, fontWeight: 500 }}>{freq}</div>

          {columns.map(col => (
            <select
              key={col.key}
              value={value?.[freq]?.[col.key] ?? ""}
              style={{
                width: 170,
                gap:20,
                padding: "6px 8px",
                fontSize: 14
              }}
              onChange={e =>
                onChange("pta_matrix", {
                  ...value,
                  [freq]: {
                    ...value[freq],
                    [col.key]: Number(e.target.value)
                  }
                })
              }
            >
              <option value="">–</option>
              {options.map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          ))}
        </div>
      ))}
    </div>
  );
}



  /* ===================== RENDER ===================== */

  return (
<div style={mainContent}>
  {/* ===== PATIENT INFORMATION CARD ===== */}
  <CommonFormBuilder
    schema={AUDIO_CONTAINER_SCHEMA}
    values={{}}
    onChange={() => {}}
  >
    <AudioPatientInfo patient={patient} />
  </CommonFormBuilder>

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
    onAction={handleAction}
  >

    {activeTab === "subjective" && (
  <AudiometryFrequencyTable
    value={values.pta_matrix}
    onChange={onChange}
  />
)}

    {/* 👇 ADD THIS BLOCK HERE */}
{activeTab === "subjective" && (
  <>
    {/* IMPRESSION */}
    <div style={{ marginTop: 20 }}>
      <label>Impression – Right Ear</label>
      <textarea
        value={values.impression_r || ""}
        onChange={e => onChange("impression_r", e.target.value)}
        style={{ width: "100%", marginBottom: 12 }}
      />

      <label>Impression – Left Ear</label>
      <textarea
        value={values.impression_l || ""}
        onChange={e => onChange("impression_l", e.target.value)}
        style={{ width: "100%", marginBottom: 12 }}
      />
    </div>

    {/* RELIABILITY */}
    <div style={{ marginTop: 12 }}>
      <label>Reliability</label>
      <div style={{ display: "flex", gap: 12 }}>
        {["Good", "Fair", "Poor"].map(opt => (
          <label key={opt}>
            <input
              type="radio"
              checked={values.reliability === opt}
              onChange={() => onChange("reliability", opt)}
            />
            {opt}
          </label>
        ))}
      </div>
    </div>
  </>
)}


    {/* Submit button stays */}
    <div style={submitRow}>
      <button style={submitBtn} onClick={handleSubmit}>
        Submit Audiology Assessment
      </button>
    </div>
  </CommonFormBuilder>
</div>

  );
}

/* ===================== STYLES ===================== */

const mainContent = { margin: "0 auto",width:"100%" };

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

const section = {
  marginBottom: 24
};

const patientGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 12,
  fontSize: 14
};

const doctorsReportBtn = {
  padding: "10px 20px",
  background: "#2563EB",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  fontSize: 14,
  fontWeight: 600,
  cursor: "pointer",
  marginTop: 8
};
