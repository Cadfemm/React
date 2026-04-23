import React, { useEffect, useState, createContext, useContext } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";
// Import original assessment components
import DASSFormBuilder from "./DassForm";
import PSSFormBuilder from "./PssForm";
import PHQ9FormBuilder from "./PhqForm";
import GAD7FormBuilder from "./GadForm";
import HAMDFormBuilder from "./HamdForm";
import HAM_A_FormBuilder from "./HamaForm";
import { localDateTimeString } from "../../../shared/utils/dateFormatter";

// Create context to pass patient to assessment components
const PatientContext = createContext(null);

// Adapter components that bridge values/onChange to patient/onSubmit/onBack
function DASS21Adapter({ values, onChange }) {
  const patient = useContext(PatientContext);
  const handleSubmit = (payload) => {
    // Store in parent values using namespace
    if (payload && payload.values) {
      Object.keys(payload.values).forEach(key => {
        onChange(`dass21_${key}`, payload.values[key]);
      });
    }
  };
  const handleBack = () => {
    // Close the assessment by clearing the active key
    const activeKey = "psychology_assessments_active";
    onChange(activeKey, null);
  };
  return <DASSFormBuilder patient={patient} onSubmit={handleSubmit} onBack={handleBack} />;
}

function PSSAdapter({ values, onChange }) {
  const patient = useContext(PatientContext);
  const handleSubmit = (payload) => {
    if (payload && payload.values) {
      Object.keys(payload.values).forEach(key => {
        onChange(`pss_${key}`, payload.values[key]);
      });
    }
  };
  const handleBack = () => {
    const activeKey = "psychology_assessments_active";
    onChange(activeKey, null);
  };
  return <PSSFormBuilder patient={patient} onSubmit={handleSubmit} onBack={handleBack} />;
}

function PHQ9Adapter({ values, onChange }) {
  const patient = useContext(PatientContext);
  const handleSubmit = (payload) => {
    if (payload && payload.values) {
      Object.keys(payload.values).forEach(key => {
        onChange(`phq9_${key}`, payload.values[key]);
      });
    }
  };
  const handleBack = () => {
    const activeKey = "psychology_assessments_active";
    onChange(activeKey, null);
  };
  return <PHQ9FormBuilder patient={patient} onSubmit={handleSubmit} onBack={handleBack} />;
}

function GAD7Adapter({ values, onChange }) {
  const patient = useContext(PatientContext);
  const handleSubmit = (payload) => {
    if (payload && payload.values) {
      Object.keys(payload.values).forEach(key => {
        onChange(`gad7_${key}`, payload.values[key]);
      });
    }
  };
  const handleBack = () => {
    const activeKey = "psychology_assessments_active";
    onChange(activeKey, null);
  };
  return <GAD7FormBuilder patient={patient} onSubmit={handleSubmit} onBack={handleBack} />;
}

function HAMDAdapter({ values, onChange }) {
  const patient = useContext(PatientContext);
  const handleSubmit = (payload) => {
    if (payload && payload.values) {
      Object.keys(payload.values).forEach(key => {
        onChange(`hamd_${key}`, payload.values[key]);
      });
    }
  };
  const handleBack = () => {
    const activeKey = "psychology_assessments_active";
    onChange(activeKey, null);
  };
  return <HAMDFormBuilder patient={patient} onSubmit={handleSubmit} onBack={handleBack} />;
}

function HAMAAdapter({ values, onChange }) {
  const patient = useContext(PatientContext);
  const handleSubmit = (payload) => {
    if (payload && payload.values) {
      Object.keys(payload.values).forEach(key => {
        onChange(`hama_${key}`, payload.values[key]);
      });
    }
  };
  const handleBack = () => {
    const activeKey = "psychology_assessments_active";
    onChange(activeKey, null);
  };
  return <HAM_A_FormBuilder patient={patient} onSubmit={handleSubmit} onBack={handleBack} />;
}

// Assessment Registry - using original components with adapters
export const PSYCHOLOGY_ASSESSMENT_REGISTRY = {
  dass21: DASS21Adapter,
  pss: PSSAdapter,
  phq9: PHQ9Adapter,
  gad7: GAD7Adapter,
  hamd: HAMDAdapter,
  hama: HAMAAdapter
};

/* ===================== OPTIONS ===================== */

const YES_NO = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" }
];

/* ===================== COMPONENT ===================== */

export default function  PediatricPsychologyAssessment({ patient, onSubmit, onBack }) {
  const [values, setValues] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState("subjective");

  /* ---------------- STORAGE ---------------- */
  const storageKey = patient
    ? `psychology_assessment_draft_${patient.id}`
    : null;

  useEffect(() => {
    if (!storageKey) return;
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      setValues(JSON.parse(saved).values || {});
    }
  }, [storageKey]);

  const problemList = (values) => {
    var text = ''
    if(values.perceptual_disturbance){
      values.perceptual_disturbance.forEach(v => {
        text += v.charAt(0).toUpperCase() + v.slice(1).replaceAll('_', ' ') + '\n'
      })
    }
    if(values.thought_content_patient_reported){
      values.thought_content_patient_reported.forEach(v => {
        text += v.charAt(0).toUpperCase() + v.slice(1).replaceAll('_', ' ') + '\n'
      })
    }
    return text
  }

  useEffect(() => {
    if (!patient) return;

    setValues(v => ({
      ...v,
      
      psychiatric_history_autogenerated:
        patient.psychiatric_history || patient.medical_history || "No data available",
      family_medical_history_autogenerated:
        patient.family_history || patient.diagnosis_history || "No data available",
      drug_history_autogenerated:
        patient.medications || patient.drug_history || "No data available"
    }));
  }, [patient]);

  const onChange = (name, value) => {
    setValues(v => ({ ...v,  [name]: value }));
  };

  const computedValues = {
    ...values,
    problem_listings: problemList(values) || ''
  }

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
      alert("Psychology draft saved");
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    onSubmit?.(values);
    alert("Psychology assessment submitted");
  };

  const DEVELOPMENT_DATA = {
  "2-5_months": {
    sections: [{ fields: [
      { name: "milestone_2_5m_gross_motor", label: "Gross Motor", type: "radio-group", options: [
        { label: "Head when held", value: "head_when_held" },
        { label: "Sit with support", value: "sit_with_support" },
        { label: "Arms out", value: "arms_out" }
      ]},
      { name: "milestone_2_5m_fine_motor", label: "Fine Motor", type: "radio-group", options: [
        { label: "Ability to open hand", value: "open_hand" },
        { label: "Batting objects", value: "batting_objects" },
        { label: "Palmar grasp", value: "palmar_grasp" },
        { label: "Reaching and obtaining objects", value: "reaching_objects" }
      ]},
      { name: "milestone_2_5m_speech", label: "Speech & Language", type: "radio-group", options: [
        { label: "Turns to voice / sound", value: "turns_to_voice" },
        { label: "Cooing", value: "cooing" },
        { label: "Laughing", value: "laughing" },
        { label: "Squealing", value: "squealing" }
      ]},
      { name: "milestone_2_5m_cognitive", label: "Cognitive / Problem Solving", type: "radio-group", options: [
        { label: "Prefers usual caregiver", value: "prefers_caregiver" },
        { label: "Responds to new objects / situation", value: "responds_new_objects" },
        { label: "Eyes can follow object", value: "eyes_follow" },
        { label: "Anticipating routine", value: "anticipating_routine" },
        { label: "Explores object with senses (eyes, hands, mouth)", value: "explores_senses" }
      ]},
      { name: "milestone_2_5m_social", label: "Social / Emotional", type: "radio-group", options: [
        { label: "Develop child-parent attachment", value: "parent_attachment" },
        { label: "Social smile", value: "social_smile" },
        { label: "Taking turns in conversations", value: "turn_taking" },
        { label: "Exploring parent's face", value: "exploring_face" }
      ]}
    ]}]
  },

  "6-9_months": {
    sections: [{ fields: [
      { name: "milestone_6_9m_gross_motor", label: "Gross Motor", type: "radio-group", options: [
        { label: "Sits tripod", value: "sits_tripod" },
        { label: "Creeps", value: "creeps" },
        { label: "Pulls to stand", value: "pulls_to_stand" },
        { label: "Sits well", value: "sits_well" },
        { label: "Postural reflex", value: "postural_reflex" }
      ]},
      { name: "milestone_6_9m_fine_motor", label: "Fine Motor", type: "radio-group", options: [
        { label: "Raking and / or inferior pincer grasp", value: "raking_grasp" },
        { label: "Pokes at objects", value: "pokes_objects" },
        { label: "Transferring items from hand to hand", value: "transfers_hand" }
      ]},
      { name: "milestone_6_9m_speech", label: "Speech & Language", type: "radio-group", options: [
        { label: "Specific babbling (mama, dada)", value: "specific_babbling" },
        { label: "Gestures (bye-bye)", value: "gestures" },
        { label: "Nonspecific babbling", value: "nonspecific_babbling" }
      ]},
      { name: "milestone_6_9m_cognitive", label: "Cognitive / Problem Solving", type: "radio-group", options: [
        { label: "Object permanence", value: "object_permanence" },
        { label: "Searches for dropped / partially hidden object", value: "searches_hidden" },
        { label: "Worry to stranger", value: "stranger_anxiety" }
      ]},
      { name: "milestone_6_9m_social", label: "Social / Emotional", type: "radio-group", options: [
        { label: "Showing separation anxiety", value: "separation_anxiety" },
        { label: "Expressing basic emotions", value: "basic_emotions" }
      ]}
    ]}]
  },

  "12-18_months": {
    sections: [{ fields: [
      { name: "milestone_12_18m_gross_motor", label: "Gross Motor", type: "radio-group", options: [
        { label: "Starts to walk", value: "starts_walk" },
        { label: "Starts to run", value: "starts_run" },
        { label: "Stops and stands up", value: "stops_stands" },
        { label: "Run", value: "run" }
      ]},
      { name: "milestone_12_18m_fine_motor", label: "Fine Motor", type: "radio-group", options: [
        { label: "Fine pincer", value: "fine_pincer" },
        { label: "Releasing object voluntarily", value: "releasing_object" },
        { label: "Scribbles", value: "scribbles" },
        { label: "Throwing object", value: "throwing" },
        { label: "Starts to feed self (finger, spoon)", value: "self_feed" },
        { label: "Drink from open-top cup", value: "open_cup" },
        { label: "Carrying toys while walking", value: "carry_toys" },
        { label: "Removing clothes", value: "removing_clothes" }
      ]},
      { name: "milestone_12_18m_speech", label: "Speech & Language", type: "radio-group", options: [
        { label: "Additional new meaning words", value: "new_words" },
        { label: "Points to body parts", value: "points_body" },
        { label: "Labelling common objects", value: "labelling_objects" }
      ]},
      { name: "milestone_12_18m_cognitive", label: "Cognitive / Problem Solving", type: "radio-group", options: [
        { label: "Able to try or experiment things", value: "experimenting" },
        { label: "Imitating", value: "imitating" }
      ]},
      { name: "milestone_12_18m_social", label: "Social / Emotional", type: "radio-group", options: [
        { label: "Parallel play", value: "parallel_play" },
        { label: "Points at desired object", value: "points_desired" },
        { label: "Explore from secure base", value: "secure_base" },
        { label: "Shared attention", value: "shared_attention" },
        { label: "Brings toys to parent", value: "brings_toys" },
        { label: "Increased independence", value: "independence" }
      ]}
    ]}]
  },

  "2_years": {
    sections: [{ fields: [
      { name: "milestone_2y_gross_motor", label: "Gross Motor", type: "radio-group", options: [
        { label: "Jumps on two feet", value: "jumps_two_feet" },
        { label: "Starts to climb stairs up and down", value: "climbs_stairs" }
      ]},
      { name: "milestone_2y_fine_motor", label: "Fine Motor", type: "radio-group", options: [
        { label: "Establishment of apparent handedness", value: "handedness" }
      ]},
      { name: "milestone_2y_speech", label: "Speech & Language", type: "radio-group", options: [
        { label: "2-word phrases", value: "two_word_phrases" },
        { label: "Following 2-step command", value: "two_step_command" },
        { label: "Vocabulary 50+ words / 50% comprehensible", value: "vocab_50" }
      ]},
      { name: "milestone_2y_cognitive", label: "Cognitive / Problem Solving", type: "radio-group", options: [
        { label: "Trying new problem solving approach without rehearsing", value: "new_problem_solving" },
        { label: "Searching for hidden object after numerous displacements", value: "hidden_object_search" }
      ]},
      { name: "milestone_2y_social", label: "Social / Emotional", type: "radio-group", options: [
        { label: "Starts to throw tantrums", value: "tantrums" },
        { label: "Resisting by saying \"No\"", value: "resisting_no" },
        { label: "Being possessive by saying \"Mine!\"", value: "possessive_mine" }
      ]}
    ]}]
  },

  "3_years": {
    sections: [{ fields: [
      { name: "milestone_3y_gross_motor", label: "Gross Motor", type: "radio-group", options: [
        { label: "Pedals tricycle", value: "pedals_tricycle" },
        { label: "Starts to climb up stairs with alternating feet", value: "alternating_feet_up" }
      ]},
      { name: "milestone_3y_fine_motor", label: "Fine Motor", type: "radio-group", options: [
        { label: "Draws simple shapes", value: "draws_shapes" },
        { label: "Flipping pages", value: "flipping_pages" },
        { label: "Toilet-trained", value: "toilet_trained" },
        { label: "Undress self", value: "undress_self" }
      ]},
      { name: "milestone_3y_speech", label: "Speech & Language", type: "radio-group", options: [
        { label: "3-4 word phrases", value: "three_four_word_phrases" },
        { label: "Following 3-step command", value: "three_step_command" },
        { label: "Vocabulary 200+ words; 75% comprehensible", value: "vocab_200" },
        { label: "Says their name and gender", value: "name_gender" }
      ]},
      { name: "milestone_3y_cognitive", label: "Cognitive / Problem Solving", type: "radio-group", options: [
        { label: "Able to identify shapes", value: "identify_shapes" },
        { label: "Understanding simple time concept", value: "time_concept" },
        { label: "Comparing 2 items (size)", value: "comparing_size" },
        { label: "Starts to count", value: "starts_count" }
      ]},
      { name: "milestone_3y_social", label: "Social / Emotional", type: "radio-group", options: [
        { label: "Play cooperatively", value: "cooperative_play" },
        { label: "Pretend play", value: "pretend_play" },
        { label: "Easy to separate", value: "easy_separate" },
        { label: "Able to share and empathize", value: "share_empathize" }
      ]}
    ]}]
  },

  "4_years": {
    sections: [{ fields: [
      { name: "milestone_4y_gross_motor", label: "Gross Motor", type: "radio-group", options: [
        { label: "Hops on one foot", value: "hops_one_foot" },
        { label: "Starts to climb down stairs with alternating feet", value: "alternating_feet_down" }
      ]},
      { name: "milestone_4y_fine_motor", label: "Fine Motor", type: "radio-group", options: [
        { label: "Uses scissors", value: "uses_scissors" },
        { label: "Button self", value: "button_self" },
        { label: "Draws cross, square, diagonal shape", value: "draws_cross_square" }
      ]},
      { name: "milestone_4y_speech", label: "Speech & Language", type: "radio-group", options: [
        { label: "Tells a simple story", value: "tells_story" },
        { label: "Talks about things they have done", value: "talks_past" },
        { label: "Forming sentences — 100% intelligible", value: "sentences_intelligible" }
      ]},
      { name: "milestone_4y_cognitive", label: "Cognitive / Problem Solving", type: "radio-group", options: [
        { label: "Counting", value: "counting" },
        { label: "Identify differences (big vs small; boys vs girls)", value: "identify_differences" },
        { label: "Identify colours", value: "identify_colours" }
      ]},
      { name: "milestone_4y_social", label: "Social / Emotional", type: "radio-group", options: [
        { label: "Has best friend", value: "best_friend" },
        { label: "Elaborating fantasy play", value: "fantasy_play" }
      ]}
    ]}]
  },

  "5_years": {
    sections: [{ fields: [
      { name: "milestone_5y_gross_motor", label: "Gross Motor", type: "radio-group", options: [
        { label: "Able to balance on one foot", value: "balance_one_foot" },
        { label: "Starts learning to ride bicycle", value: "ride_bicycle" }
      ]},
      { name: "milestone_5y_fine_motor", label: "Fine Motor", type: "radio-group", options: [
        { label: "Writes name", value: "writes_name" },
        { label: "Draws person with 10 basic body parts", value: "draws_person" },
        { label: "Tripod pencil grip", value: "tripod_grip" },
        { label: "Copies letters and numbers", value: "copies_letters" },
        { label: "Starts independent ADL", value: "independent_adl" }
      ]},
      { name: "milestone_5y_speech", label: "Speech & Language", type: "radio-group", options: [
        { label: "Vocabulary 4000-5000 words", value: "vocab_5000" },
        { label: "Talks about things they want to do", value: "talks_future" },
        { label: "Understands or makes jokes", value: "understands_jokes" }
      ]},
      { name: "milestone_5y_cognitive", label: "Cognitive / Problem Solving", type: "radio-group", options: [
        { label: "Counts accurately 1-10", value: "counts_1_10" },
        { label: "Recites the alphabet", value: "recites_alphabet" },
        { label: "Recognizes some alphabet", value: "recognizes_alphabet" }
      ]},
      { name: "milestone_5y_social", label: "Social / Emotional", type: "radio-group", options: [
        { label: "Has a group of friends", value: "group_friends" },
        { label: "Able to follow group rules", value: "follow_group_rules" },
        { label: "Able to follow rules in games", value: "follow_game_rules" }
      ]}
    ]}]
  }
};
  /* ===================== SCHEMAS ===================== */

  const SUBJECTIVE_SCHEMA = {
    actions: [
      { type: "back", label: "Back" },
      { type: "clear", label: "Clear" },
      { type: "save", label: "Save" }
    ],
    sections: [
      {
        fields: [
          {
            name: "chief_complaint",
            label: "Chief Complaint",
            type: "textarea"
          },
          {
            name: "hpi",
            label: "History of Presenting Illness (HPI)",
            type: "textarea"
          },

          /* ===== DEVELOPMENTAL HISTORY SUBHEADING ===== */
          // {
          //   type: "subheading",
          //   label: "Developmental history   CORE PEDIATRIC COMPONENT"
          // },

          /* ===== DEVELOPMENT MILESTONES INLINE ===== */
          {
            type: "custom",
            render: () => <DevelopmentMilestones age={patient?.age} />
          },

          /* ===== BIRTH HISTORY ===== */
          { type: "subheading", label: "Birth History" },

          {
            name: "antenatal_complications",
            label: "Antenatal complications",
            type: "radio",
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" }
            ]
          },
          {
            name: "antenatal_details",
            label: "Antenatal complications – details",
            type: "textarea",
            showIf: { field: "antenatal_complications", equals: "yes" }
          },

          {
            name: "nicu_stay",
            label: "NICU stay",
            type: "radio",
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" }
            ]
          },
          {
            name: "nicu_duration",
            label: "NICU stay – duration",
            type: "input",
            placeholder: "e.g. 5 days",
            showIf: { field: "nicu_stay", equals: "yes" }
          },

          {
            name: "birth_type_value",
            label: "Birth type",
            type: "radio",
            options: [
              { label: "Normal", value: "normal" },
              { label: "C-section", value: "c_section" },
              { label: "Assisted", value: "assisted" }
            ]
          },

          {
            name: "birth_weight",
            label: "Birth weight",
            type: "input",
            placeholder: "e.g. 2.5 kg"
          },

          {
            name: "neonatal_complications",
            label: "Neonatal complications",
            type: "radio",
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" }
            ]
          },
          {
            name: "neonatal_details",
            label: "Neonatal complications – details",
            type: "textarea",
            showIf: { field: "neonatal_complications", equals: "yes" }
          },

          {
            name: "trauma_ace",
            label: "Trauma & ACE screening",
            type: "input",
            placeholder: "Document trauma history, adverse childhood experiences, caregiver report, and relevant details"
          },

          /* ===== MEDICAL / PSYCHIATRIC / FAMILY ===== */
          { type: "subheading", label: "Medical, Psychiatric & Family History" },

          {
            name: "past_illness",
            label: "Past illnesses / hospitalizations",
            type: "radio",
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" }
            ]
          },
          {
            name: "past_illness_details",
            label: "Past illnesses – details",
            type: "textarea",
            showIf: { field: "past_illness", equals: "yes" }
          },

          {
            name: "current_medications",
            label: "Current medications",
            type: "radio",
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" }
            ]
          },
          {
            name: "current_medications_details",
            label: "Current medications – details",
            type: "textarea",
            showIf: { field: "current_medications", equals: "yes" }
          },

          {
            name: "previous_therapy",
            label: "Previous therapy",
            type: "radio",
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" }
            ]
          },
          {
            name: "previous_therapy_details",
            label: "Previous therapy – type, duration, response",
            type: "textarea",
            showIf: { field: "previous_therapy", equals: "yes" }
          },

          {
            name: "family_psych_history",
            label: "Psychiatric disorders in family",
            type: "radio",
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" }
            ]
          },
          {
            name: "family_psych_details",
            label: "Family psychiatric history – details",
            type: "textarea",
            showIf: { field: "family_psych_history", equals: "yes" }
          },

          {
            name: "genetic_conditions",
            label: "Genetic conditions",
            type: "radio",
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" }
            ]
          },
          {
            name: "genetic_conditions_details",
            label: "Genetic conditions – details",
            type: "textarea",
            showIf: { field: "genetic_conditions", equals: "yes" }
          },

          {
            name: "family_dynamics",
            label: "Family dynamics (parenting style, conflict, SES)",
            type: "radio",
            options: [
              { label: "Stable", value: "stable" },
              { label: "Mild concerns", value: "mild" },
              { label: "Significant concerns", value: "significant" }
            ]
          },
          {
            name: "family_dynamics_details",
            label: "Family dynamics – details",
            type: "textarea",
            showIf: { field: "family_dynamics", equals: "significant" }
          },

          /* ===== EDUCATION ===== */
          { type: "subheading", label: "Education History" },

          {
            name: "school_type",
            label: "School type / grade",
            type: "radio",
            options: [
              { label: "Mainstream", value: "mainstream" },
              { label: "Special education", value: "special_ed" },
              { label: "Home-schooled", value: "home_schooled" },
              { label: "Not yet in school", value: "not_in_school" }
            ]
          },

          {
            name: "academic_performance",
            label: "Academic performance",
            type: "radio",
            options: [
              { label: "Above average", value: "above_average" },
              { label: "Average", value: "average" },
              { label: "Below average", value: "below_average" },
              { label: "Not applicable", value: "na" }
            ]
          },

          {
            name: "teacher_complaints",
            label: "Teacher complaints / IEP in place",
            type: "radio",
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" }
            ]
          },
          {
            name: "teacher_complaints_details",
            label: "Teacher complaints – details",
            type: "textarea",
            showIf: { field: "teacher_complaints", equals: "yes" }
          },

          {
            name: "learning_difficulties",
            label: "Learning difficulties identified",
            type: "radio",
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" }
            ]
          },
          {
            name: "learning_difficulties_details",
            label: "Learning difficulties – details",
            type: "textarea",
            showIf: { field: "learning_difficulties", equals: "yes" }
          },

          /* ===== BEHAVIORAL CONCERNS ===== */
          { type: "subheading", label: "Behavioral Concerns — Caregiver Report" },

          {
            name: "hyperactivity",
            label: "Hyperactivity / impulsivity",
            type: "radio",
            options: [
              { label: "Present", value: "present" },
              { label: "Absent", value: "absent" }
            ]
          },

          {
            name: "aggression",
            label: "Aggression (toward self / others)",
            type: "radio",
            options: [
              { label: "Present", value: "present" },
              { label: "Absent", value: "absent" }
            ]
          },

          {
            name: "social_withdrawal",
            label: "Social withdrawal",
            type: "radio",
            options: [
              { label: "Present", value: "present" },
              { label: "Absent", value: "absent" }
            ]
          },

          {
            name: "emotional_dysregulation",
            label: "Emotional dysregulation",
            type: "radio",
            options: [
              { label: "Present", value: "present" },
              { label: "Absent", value: "absent" }
            ]
          },

          {
            name: "sleep_difficulties",
            label: "Sleep difficulties",
            type: "radio",
            options: [
              { label: "Present", value: "present" },
              { label: "Absent", value: "absent" }
            ]
          },

          {
            name: "eating_difficulties",
            label: "Eating difficulties",
            type: "radio",
            options: [
              { label: "Present", value: "present" },
              { label: "Absent", value: "absent" }
            ]
          },

          {
            name: "screen_time",
            label: "Screen time (hours/day)",
            type: "radio",
            options: [
              { label: "< 1 hr", value: "less_1" },
              { label: "1–2 hrs", value: "one_two" },
              { label: "2–4 hrs", value: "two_four" },
              { label: "> 4 hrs", value: "more_4" }
            ]
          },

          /* ===== CHILD SELF-REPORT ===== */
          { type: "subheading", label: "Child Self-Report (Age ≥ 6, adapt language)" },

          {
            name: "child_mood",
            label: "Mood — how do you feel most days?",
            type: "radio",
            options: [
              { label: "Happy", value: "happy" },
              { label: "Sad", value: "sad" },
              { label: "Worried", value: "worried" },
              { label: "Angry", value: "angry" },
              { label: "Mixed", value: "mixed" }
            ]
          },

          {
            name: "child_fears",
            label: "Fears / worries",
            type: "radio",
            options: [
              { label: "Present", value: "present" },
              { label: "Absent", value: "absent" }
            ]
          },
          {
            name: "child_fears_details",
            label: "Fears / worries – describe",
            type: "textarea",
            showIf: { field: "child_fears", equals: "present" }
          },

          {
            name: "child_friendships",
            label: "Friendships / peer relationships",
            type: "radio",
            options: [
              { label: "Good", value: "good" },
              { label: "Fair", value: "fair" },
              { label: "Poor", value: "poor" },
              { label: "Isolated", value: "isolated" }
            ]
          },

          {
            name: "child_enjoyment",
            label: "What do you enjoy?",
            type: "input",
            placeholder: "e.g. drawing, football, games"
          }
        ]
      }
    ]
  };

 
  const PSYCHOLOGY_CONTAINER_SCHEMA = {

  title: "Patient Information",
  sections: [
    {
      type: "row",
      fields: [
         { type: "custom", render: () => <PsychologyPatientInfo /> },
        {
  name: "informant",
  label: "Informant",
 
  type: "radio",
  options: [
    { label: "Mother", value: "mother" },
    { label: "Father", value: "father" },
    { label: "Caregiver", value: "caregiver" },
    { label: "Teacher", value: "teacher" },
    { label: "Other", value: "other" }   // ✅ keep lowercase
  ]
},

{
  name: "informant_other",
  label: "Specify Other",
  type: "input",
  placeholder: "Enter informant",
  showIf: { field: "informant", equals: "other" } // ✅ matches exactly
},
        {
          name: "reliability",
          label: "Reliability of informant",
          type: "radio",
          options: [
            { label: "Good", value: "Good" },
            { label: "Fair", value: "Fair" },
            { label: "Poor", value: "Poor" }
          ]
        },
        {
          name: "discrepancy",
          label: "Discrepancy noted",
          type: "input",
          placeholder: "Enter details"
        }
      ]
    }
  ]
};


const OBJECTIVE_SCHEMA = {
   actions: [
      { type: "back", label: "Back" },
      { type: "clear", label: "Clear" },
      { type: "save", label: "Save" }
    ],
  name: "objective",
  label: "Objective",
  sections: [
    {
      fields: [
         { type: "subheading", label: "Pediatric MSE Checklist " },
        
        { type: "subheading", label: "1. General Appearance & Behaviour on Entry" },

        /* ===== 1.1 APPEARANCE ===== */
       
        {
          name: "appearance",
          type: "checkbox-group",
          label: "1.1 Appearance",
          options: [
            { label: "Well-groomed / clean", value: "well_groomed" },
            { label: "Unkempt / dishevelled", value: "unkempt" },
            { label: "Bruised / scarred", value: "bruised_scarred" },
            { label: "Not Applicable (N/A)", value: "na" }
          ]
        },
        {
          name: "appearance_na_reason",
          label: "Specify why Not Applicable",
          type: "input",
          showIf: { field: "appearance", includes: "na" }
        },

        /* ===== 1.2 SEPARATION ===== */
       
{
  name: "separation_behavior",
  type: "checkbox-group",
  label: "1.2 Separation behaviour on entry" ,
  options: [
    { label: "Age-appropriate", value: "age_appropriate" },
    { label: "Mild distress", value: "mild_distress" },
    { label: "Significant distress", value: "significant_distress" },
    { label: "Not Applicable (N/A)", value: "na" }
  ]
},
{
  name: "separation_na_reason",
  label: "Specify why Not Applicable",
  type: "input",
  showIf: { 
    field: "separation_behavior", 
    includes: "na"   // ✅ correct for checkbox-group
  }
},

        /* ===== 1.3 INTERACTION ===== */
      
        {
          name: "interaction_clinician",
          type: "checkbox-group",
          label: "1.3 Interaction with clinician",
          options: [
            { label: "Approached readily", value: "approached" },
            { label: "Avoidant", value: "avoidant" },
            { label: "Disinhibited", value: "disinhibited" },
            { label: "Not Applicable (N/A)", value: "na" }
          ]
        },
        {
          name: "interaction_na_reason",
          label: "Specify why Not Applicable",
          type: "input",
          showIf: { field: "interaction_clinician", includes: "na" }
        },
        {
  type: "subheading",
  label: "2. Play Behaviour"
},

/* ================= 2.1 QUALITY OF PLAY ================= */

{
  name: "play_quality",
   label: "2.1 Quality of play",
  type: "checkbox-group",
  
  options: [
    { label: "Functional / relational (uses toys as intended)", value: "functional" },
    { label: "Symbolic / pretend play present", value: "symbolic" },
    { label: "Imaginative / narrative play", value: "imaginative" },
    { label: "Repetitive / stereotyped play", value: "repetitive" },
    { label: "Play absent / no engagement with materials", value: "absent" },
    { label: "Not Applicable (N/A)", value: "na" } // ✅ added
  ]
},
{
  name: "play_quality_na_reason",
  label: "Specify why Not Applicable",
  type: "input",
  showIf: { field: "play_quality", includes: "na" }
},

/* ================= 2.2 SOCIAL PLAY ================= */

{
  name: "play_social",
   label: "2.2 Social dimension of play",
  type: "checkbox-group",
  options: [
    { label: "Solitary play only", value: "solitary" },
    { label: "Parallel play (alongside but not with)", value: "parallel" },
    { label: "Joint / cooperative play", value: "joint" },
    { label: "Directed the clinician in play", value: "directed_clinician" },
    { label: "Followed clinician's lead in play", value: "followed_clinician" },
    { label: "Not Applicable (N/A)", value: "na" } // ✅ added
  ]
},
{
  name: "play_social_na_reason",
  label: "Specify why Not Applicable",
  type: "input",
  showIf: { field: "play_social", includes: "na" }
},

/* ================= 2.3 INITIATION ================= */

{
  name: "play_initiation",
   label: "2.3 Initiation",
  type: "checkbox-group",
  options: [
    { label: "Spontaneous — initiated without prompting", value: "spontaneous" },
    { label: "Required prompting / modelling", value: "prompted" },
    { label: "Did not initiate even with prompting", value: "no_initiation" },
    { label: "Not Applicable (N/A)", value: "na" }
  ]
},
{
  name: "play_initiation_na_reason",
  label: "Specify why Not Applicable",
  type: "input",
  showIf: { field: "play_initiation", includes: "na" } // ✅ FIXED
},

/* ================= 2.4 IMITATION ================= */

{
  name: "play_imitation",
   label: "2.4 Imitation skills",
  type: "checkbox-group", // ✅ single select
  options: [
    { label: "Imitated gestures / actions readily", value: "readily" },
    { label: "Imitation present with delay", value: "delayed" },
    { label: "Imitation absent", value: "absent" },
    { label: "Not Applicable (N/A)", value: "na" } // ✅ added
  ]
},
{
  name: "play_imitation_na_reason",
  label: "Specify why Not Applicable",
  type: "input",
  showIf: { field: "play_imitation", equals: "na" }
},
{
  type: "subheading",
  label: "3. Behavioural Observation"
},

/* ================= 3.1 ACTIVITY LEVEL ================= */

{
  name: "activity_level",
  label: "3.1 Activity level",
  type: "checkbox-group",
  options: [
    { label: "Age-appropriate", value: "age_appropriate" },
    { label: "Hyperactive / restless / fidgety", value: "hyperactive" },
    { label: "Hypoactive / slowed", value: "hypoactive" },
    { label: "Psychomotor agitation", value: "agitation" },
    { label: "Psychomotor retardation", value: "retardation" },
    { label: "Not Applicable (N/A)", value: "na" }
  ]
},
{
  name: "activity_level_na_reason",
  label: "Specify why Not Applicable",
  type: "input",
  showIf: { field: "activity_level", includes: "na" }
},

/* ================= 3.2 COMPLIANCE ================= */

{
  name: "compliance",
  label: "3.2 Compliance & engagement",
  type: "checkbox-group",
  options: [
    { label: "Cooperative", value: "cooperative" },
    { label: "Uncooperative", value: "uncooperative" },
    { label: "Oppositional / defiant", value: "oppositional" },
    { label: "Passive / apathetic", value: "passive" },
    { label: "Demanding / controlling", value: "demanding" },
    { label: "Not Applicable (N/A)", value: "na" }
  ]
},
{
  name: "compliance_na_reason",
  label: "Specify why Not Applicable",
  type: "input",
  showIf: { field: "compliance", includes: "na" }
},

/* ================= 3.3 ATTENTION ================= */

{
  name: "attention_span",
  label: "3.3 Attention span",
  type: "checkbox-group",
  options: [
    { label: "Sustained during preferred / play activity", value: "sustained_play" },
    { label: "Inconsistent — distractible during tasks", value: "inconsistent" },
    { label: "Poor — unable to sustain even briefly", value: "poor" },
    { label: "Appropriate for age", value: "age_appropriate" },
    { label: "Not Applicable (N/A)", value: "na" }
  ]
},
{
  name: "attention_context",
  label: "Document context (e.g., sustained 10 min in play, 2 min task)",
  type: "textarea"
},
{
  name: "attention_na_reason",
  label: "Specify why Not Applicable",
  type: "input",
  showIf: { field: "attention_span", includes: "na" }
},

/* ================= 3.4 EYE CONTACT ================= */

{
  name: "eye_contact",
  label: "3.4 Eye contact",
  type: "checkbox-group",
  options: [
    { label: "Good / socially appropriate", value: "good" },
    { label: "Poor / avoidant", value: "poor" },
    { label: "Intense / prolonged", value: "intense" },
    { label: "Inconsistent", value: "inconsistent" },
    { label: "Excessive scanning", value: "scanning" },
    { label: "Not Applicable (N/A)", value: "na" }
  ]
},
{
  name: "eye_contact_na_reason",
  label: "Specify why Not Applicable",
  type: "input",
  showIf: { field: "eye_contact", includes: "na" }
},

/* ================= 3.5 MOTOR ================= */

{
  name: "motor_observations",
  label: "3.5 Motor observations",
  
  type: "checkbox-group",
  options: [
    { label: "Motor tics observed", value: "tics" },
    { label: "Tremor", value: "tremor" },
    { label: "Repetitive / stereotyped gestures", value: "stereotypy" },
    { label: "Steady gait", value: "steady_gait" },
    { label: "Unsteady gait", value: "unsteady_gait" },
    { label: "Limping", value: "limping" },
    { label: "Not Applicable (N/A)", value: "na" }
  ]
},
{
  name: "motor_na_reason",
  label: "Specify why Not Applicable",
  type: "input",
  showIf: { field: "motor_observations", includes: "na" }
},
{
  type: "subheading",
  label: "4. Speech & Language"
},

/* ================= 4.1 LANGUAGE LEVEL ================= */

{
  name: "language_level",
  label: "4.1 Language level",
  type: "checkbox-group",
  options: [
    { label: "Age-appropriate", value: "age_appropriate" },
    { label: "Delayed for chronological age", value: "delayed" },
    { label: "Could not assess (non-verbal / selective mutism)", value: "not_assessed" },
    { label: "Not Applicable (N/A)", value: "na" }
  ]
},
{
  name: "language_level_na_reason",
  label: "Specify why Not Applicable",
  type: "input",
  showIf: { field: "language_level", includes: "na" } // ✅ FIXED
},

/* ================= 4.2 RATE & FLOW ================= */

{
  name: "speech_rate_flow",
  label: "4.2 Rate and flow",
  type: "checkbox-group",
  options: [
    { label: "Normal", value: "normal" },
    { label: "Rapid / pressured", value: "rapid" },
    { label: "Slow", value: "slow" },
    { label: "Mute / non-verbal", value: "mute" },
    { label: "Echolalia — immediate", value: "echolalia_immediate" },
    { label: "Echolalia — delayed", value: "echolalia_delayed" },
    { label: "Not Applicable (N/A)", value: "na" }
  ]
},
{
  name: "speech_rate_flow_na_reason",
  label: "Specify why Not Applicable",
  type: "input",
  showIf: { field: "speech_rate_flow", includes: "na" }
},

/* ================= 4.3 QUANTITY ================= */

{
  name: "speech_quantity",
  label: "4.3 Quantity",
  type: "checkbox-group",
  options: [
    { label: "Talkative / spontaneous", value: "talkative" },
    { label: "Impoverished / minimal", value: "minimal" },
    { label: "Expansive", value: "expansive" },
    { label: "Not Applicable (N/A)", value: "na" }
  ]
},
{
  name: "speech_quantity_na_reason",
  label: "Specify why Not Applicable",
  type: "input",
  showIf: { field: "speech_quantity", equals: "na" }
},

/* ================= 4.4 PROSODY ================= */

{
  name: "speech_prosody",
  label: "4.4 Prosody / tone",
  type: "checkbox-group",
  options: [
    { label: "Normal", value: "normal" },
    { label: "Monotonous / flat", value: "flat" },
    { label: "Exaggerated / dramatic", value: "exaggerated" },
    { label: "Loud / raised", value: "loud" },
    { label: "Soft / low", value: "soft" },
    { label: "Anxious tone", value: "anxious" },
    { label: "Not Applicable (N/A)", value: "na" }
  ]
},
{
  name: "speech_prosody_na_reason",
  label: "Specify why Not Applicable",
  type: "input",
  showIf: { field: "speech_prosody", includes: "na" }
},

/* ================= 4.5 FLUENCY ================= */

{
  name: "speech_fluency",
  label: "4.5 Fluency",
  type: "checkbox-group",
  options: [
    { label: "Fluent / clear", value: "fluent" },
    { label: "Stammering / hesitant", value: "stammering" },
    { label: "Dysarthric / articulation errors", value: "dysarthric" },
    { label: "Aphasic", value: "aphasic" },
    { label: "Not Applicable (N/A)", value: "na" }
  ]
},
{
  name: "speech_fluency_na_reason",
  label: "Specify why Not Applicable",
  type: "input",
  showIf: { field: "speech_fluency", includes: "na" }
},

{
  type: "subheading",
  label: "5. Mood & Affect"
},

// {
//   type: "note",
//   label: "For young children: supplement adult mood labels with observable child equivalents below."
// },

/* ================= 5.1 OBSERVED MOOD ================= */

{
  name: "observed_mood",
   label: "5.1 Observed mood",
  type: "checkbox-group",
  options: [
    { label: "Euthymic / content", value: "euthymic" },
    { label: "Anxious / tense", value: "anxious" },
    { label: "Depressed / sad", value: "depressed" },
    { label: "Irritable", value: "irritable" },
    { label: "Euphoric / elated", value: "euphoric" },
    { label: "Apathetic / flat", value: "apathetic" },
    { label: "Angry / dysphoric", value: "angry" },
    { label: "Labile / unstable", value: "labile" },
    { label: "Not Applicable (N/A)", value: "na" }
  ]
},
{
  name: "observed_mood_na_reason",
  label: "Specify why Not Applicable",
  type: "input",
  showIf: { field: "observed_mood", includes: "na" }
},

/* ================= 5.2 CHILD EQUIVALENTS ================= */

{
  name: "child_mood_observation",
  label: "5.2 Observable child equivalents",
  type: "checkbox-group",
  options: [
    { label: "Cried during session", value: "cried" },
    { label: "Smiled / laughed appropriately", value: "smiled" },
    { label: "Showed frustration when task too hard", value: "frustration" },
    { label: "Responded to praise with positive affect", value: "positive_response" },
    { label: "Flat response to social overtures", value: "flat_response" },
    { label: "Not Applicable (N/A)", value: "na" }
  ]
},
{
  name: "child_mood_na_reason",
  label: "Specify why Not Applicable",
  type: "input",
  showIf: { field: "child_mood_observation", includes: "na" }
},

/* ================= 5.3 AFFECT ================= */

{
  name: "affect",
    label: "5.3 Affect",
  type: "checkbox-group",
  options: [
    { label: "Congruent with expressed mood", value: "congruent" },
    { label: "Incongruent", value: "incongruent" },
    { label: "Full range", value: "full_range" },
    { label: "Restricted / constricted", value: "restricted" },
    { label: "Blunted / flat", value: "blunted" },
    { label: "Broad / expansive", value: "broad" },
    { label: "Not Applicable (N/A)", value: "na" }
  ]
},
{
  name: "affect_na_reason",
  label: "Specify why Not Applicable",
  type: "input",
  showIf: { field: "affect", includes: "na" }
},
{
  type: "subheading",
  label: "6. Thought"
},

/* ================= 6.1 FORM / PROCESS ================= */
{
  name: "thought_form",
  label: "6.1 Form / process (inferred from speech and play)",

  type: "checkbox-group",
  options: [
    { label: "Age-appropriate coherence", value: "coherent" },
    { label: "Loose associations", value: "loose_associations" },
    { label: "Tangential", value: "tangential" },
    { label: "Circumstantial", value: "circumstantial" },
    { label: "Flight of ideas", value: "flight_of_ideas" },
    { label: "Poverty of thought", value: "poverty" },
    { label: "Not Applicable (N/A)", value: "na" }
  ]
},
{
  name: "thought_form_na_reason",
  label: "Specify why Not Applicable",
  type: "input",
  showIf: { field: "thought_form", includes: "na" }
},

// {
//   type: "note",
//   label: "Note: Thought insertion, broadcasting, and withdrawal are rare in children — document only with clear evidence."
// },

/* ================= 6.2 CONTENT ================= */

{
  name: "thought_content",
   label: "6.2 Content",
  type: "checkbox-group",
  options: [
    { label: "Age-appropriate fantasy / imagination", value: "fantasy" },
    { label: "Abnormal thought content (describe)", value: "abnormal" },
    { label: "Persecutory / fearful themes in play or speech", value: "persecutory" },
    { label: "Obsessional themes", value: "obsessional" },
    { label: "Suicidal ideation (assess carefully)", value: "suicidal" },
    { label: "Self-harm ideation", value: "self_harm" },
    { label: "Violent themes", value: "violent" },
    { label: "Not Applicable (N/A)", value: "na" }
  ]
},
{
  name: "thought_content_na_reason",
  label: "Specify why Not Applicable",
  type: "input",
  showIf: { field: "thought_content", includes: "na" }
},

/* ===== CONDITIONAL DESCRIPTION FOR ABNORMAL ===== */
{
  name: "thought_content_description",
  label: "Describe abnormal thought content",
  type: "textarea",
  showIf: { field: "thought_content", includes: "abnormal" }
},

{
  type: "subheading",
  label: "7. Perception"
},

{
  name: "perception",
  label: "Perception",
  type: "checkbox-group",
  options: [
    { label: "No perceptual disturbance noted", value: "none" },
    { label: "Auditory hallucinations (assess carefully — distinguish from imagination/play)", value: "auditory" },
    { label: "Visual hallucinations", value: "visual" },
    { label: "Illusions", value: "illusions" },
    { label: "Derealization / depersonalization (age ≥ 8)", value: "derealization" },
    { label: "Not Applicable (N/A)", value: "na" } // ✅ added
  ]
},

/* ===== N/A REASON ===== */
{
  name: "perception_na_reason",
  label: "Specify why Not Applicable",
  type: "input",
  showIf: { field: "perception", includes: "na" }
},

/* ===== DETAILS FOR ABNORMAL ===== */
{
  type: "subheading",
  label: "8. Sensorium"
},

/* ================= 8.1 CONSCIOUSNESS ================= */

{
  name: "consciousness",
  label: "8.1 Consciousness",
  type: "checkbox-group",
  options: [
    { label: "Alert", value: "alert" },
    { label: "Lethargic / drowsy", value: "drowsy" },
    { label: "Confused", value: "confused" },
    { label: "Clouded", value: "clouded" },
    { label: "Not Applicable (N/A)", value: "na" }
  ]
},
{
  name: "consciousness_na_reason",
  label: "Specify why Not Applicable",
  type: "input",
  showIf: { field: "consciousness", equals: "na" }
},

/* ================= 8.2 ORIENTATION ================= */

{
  name: "orientation",
   label: "8.2 Orientation ⚠ AGE-GATED — apply only if ≥ 7 years",
  type: "checkbox-group",
  options: [
    { label: "Oriented to person", value: "person" },
    { label: "Oriented to place", value: "place" },
    { label: "Oriented to time", value: "time" },
    { label: "Not assessable — age", value: "age_na" },
    { label: "Not Applicable (N/A)", value: "na" }
  ]
},
{
  name: "orientation_na_reason",
  label: "Specify why Not Applicable",
  type: "input",
  showIf: { field: "orientation", includes: "na" }
},

/* ===== OPTIONAL AGE WARNING (if you track age in values) ===== */
{
  name: "orientation_age_note",
  type: "note",
  label: "Orientation testing is typically valid for children ≥ 7 years",
  showIf: { field: "patient_age", lessThan: 7 } // ⚠ requires builder support
},

/* ================= 8.3 MEMORY ================= */

{
  name: "memory",
  label: "8.3 Memory (observe in context)",
  type: "checkbox-group",
  options: [
    { label: "Intact for age", value: "intact" },
    { label: "Mildly impaired", value: "mild" },
    { label: "Moderately impaired", value: "moderate" },
    { label: "Not formally assessed", value: "not_assessed" },
    { label: "Not Applicable (N/A)", value: "na" }
  ]
},
{
  name: "memory_na_reason",
  label: "Specify why Not Applicable",
  type: "input",
  showIf: { field: "memory", equals: "na" }
},
{
  type: "subheading",
  label: "9. Insight & Judgment"
},

/* ================= 9.1 INSIGHT ================= */

{
  name: "insight",
  label: "9.1 Insight",
  type: "checkbox-group",
  options: [
    { label: "Age-appropriate understanding of difficulties", value: "age_appropriate" },
    { label: "Limited — acknowledges problems only when prompted", value: "limited" },
    { label: "Impaired for developmental level — minimises or denies", value: "impaired" },
    { label: "Not assessable — age / developmental level", value: "not_assessable" },
    { label: "Child able to name what they find difficult", value: "can_describe" },
    { label: "Not Applicable (N/A)", value: "na" }
  ]
},

/* ===== DOCUMENTATION FIELD ===== */
{
  name: "insight_description",
  label: "Document what the child reports as difficult",
  type: "textarea",
  showIf: { field: "insight", includes: "can_describe" }
},

/* ===== N/A REASON ===== */
{
  name: "insight_na_reason",
  label: "Specify why Not Applicable",
  type: "input",
  showIf: { field: "insight", includes: "na" }
},

/* ================= 9.2 JUDGMENT ================= */

{
  name: "judgment",
  label: "9.2 Judgment",
  type: "checkbox-group",
  options: [
    { label: "Age-appropriate — makes reasonable choices in play / tasks", value: "age_appropriate" },
    { label: "Limited — impulsive decisions without considering consequences", value: "limited" },
    { label: "Significantly impaired — no awareness of social consequences", value: "impaired" },
    { label: "Not assessable — age", value: "not_assessable" },
    { label: "Not Applicable (N/A)", value: "na" }
  ]
},

/* ===== N/A REASON ===== */
{
  name: "judgment_na_reason",
  label: "Specify why Not Applicable",
  type: "input",
  showIf: { field: "judgment", equals: "na" }
},
{
  type: "subheading",
  label: "10. Caregiver-Observed Behaviour During Session"
},


{
  name: "caregiver_observation",
   label: "10. Caregiver-Observed Behaviour During Session",
  type: "checkbox-group",
  options: [
    {
      label: "Caregiver's description of child's current state matches clinician observation",
      value: "matches"
    },
    {
      label: "Caregiver notes child is 'not themselves today'",
      value: "not_themselves"
    },
    {
      label: "Significant discrepancy between caregiver report and observed behaviour (document)",
      value: "discrepancy"
    },
    {
      label: "Caregiver interaction style noted",
      value: "interaction_style"
    },
    {
      label: "Not Applicable (N/A)",
      value: "na"
    }
  ]
},

/* ===== DISCREPANCY DETAILS ===== */
{
  name: "caregiver_discrepancy_details",
  label: "Describe discrepancy between caregiver report and observed behaviour",
  type: "textarea",
  showIf: { field: "caregiver_observation", includes: "discrepancy" }
},

/* ===== INTERACTION STYLE ===== */
{
  name: "caregiver_interaction_style",
  label: "Caregiver interaction style",
  type: "checkbox-group",
  options: [
    { label: "Warm", value: "warm" },
    { label: "Dismissive", value: "dismissive" },
    { label: "Anxious", value: "anxious" },
    { label: "Enmeshed", value: "enmeshed" },
    { label: "Disengaged", value: "disengaged" }
  ],
  showIf: { field: "caregiver_observation", includes: "interaction_style" }
},

/* ===== N/A REASON ===== */
{
  name: "caregiver_na_reason",
  label: "Specify why Not Applicable",
  type: "input",
  showIf: { field: "caregiver_observation", includes: "na" }
},

      ]
    },
    
    
  ]
};

const tabOrder = ["subjective", "objective", "assessment", "plan"];
const activeTabIdx = tabOrder.indexOf(activeTab);

  const ASSESSMENT_SCHEMA = {
     actions: [
      { type: "back", label: "Back" },
      { type: "clear", label: "Clear" },
      { type: "save", label: "Save" }
    ],
  name: "assessment",
  label: "Assessment",
  sections: [
    {
      fields: [
        /* ================= CLINICAL IMPRESSION ================= */
        { type: "subheading", label: "Clinical Impression" },
        {
          name: "developmental_status",
          label: "Developmental status",
          type: "textarea",
          placeholder: "Enter developmental status"
        },

        {
          name: "provisional_diagnosis",
          label: "Provisional diagnosis / working differential",
          type: "textarea",
          placeholder: "Document 2–3 possibilities with reasoning — do not leave blank"
        },

        /* ================= SEVERITY ================= */
      
        {
          name: "severity",
          label: "Severity",
          type: "radio",
          options: [
            { label: "Mild", value: "mild" },
            { label: "Moderate", value: "moderate" },
            { label: "Severe", value: "severe" }
          ]
        },

        /* ================= FUNCTIONAL IMPACT (ONE ROW) ================= */
        
        {
          type: "custom",
          label: "Functional impact  ⚠ CRITICAL IN PAEDS",
          render: ({ values, onChange }) => (
            <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
              {[
                { name: "impact_home",   label: "Home",          placeholder: "Impact at home" },
                { name: "impact_school", label: "School",        placeholder: "Impact at school" },
                { name: "impact_social", label: "Social / Peers", placeholder: "Impact socially" }
              ].map(f => (
                <div key={f.name} style={{ flex: 1 }}>
                  <label style={{ display: "block", fontWeight: 600, fontSize: 13, marginBottom: 6, color: "#374151" }}>
                    {f.label}
                  </label>
                  <input
                    type="text"
                    placeholder={f.placeholder}
                    value={values[f.name] || ""}
                    onChange={e => onChange(f.name, e.target.value)}
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      border: "1px solid #d1d5db",
                      borderRadius: 8,
                      fontSize: 13,
                      outline: "none",
                      boxSizing: "border-box"
                    }}
                  />
                </div>
              ))}
            </div>
          )
        },

        /* ================= RISK ASSESSMENT ================= */
       
        
        {
          name: "risk_assessment",
          label: "Risk assessment",
        
          type: "checkbox-group",
          options: [
            {
              label: "Self-harm / suicidal ideation (rare — assess carefully)",
              value: "self_harm"
            },
            {
              label: "Aggression / harm to others",
              value: "aggression"
            },
            {
              label: "Neglect / abuse concerns",
              value: "neglect_abuse"
            }
          ]
        },

        /* ================= STRENGTHS ================= */
        
        {
          name: "strengths",
          label: "Strengths & protective factors" ,
          
          type: "checkbox-group",
          options: [
            { label: "Family support", value: "family_support" },
            { label: "School support", value: "school_support" },
            { label: "Cognitive strengths", value: "cognitive_strengths" },
            { label: "Child's interests / engagement", value: "child_interests" }
          ]
        }
      ]
    }
  ]
};


 const PLAN_SCHEMA = {
   actions: [
      { type: "back", label: "Back" },
      { type: "clear", label: "Clear" },
      { type: "save", label: "Save" }
    ],
  name: "plan",
  label: "P — Plan",
  sections: [
    {
      fields: [
        /* ================= INTERVENTION ================= */
        {
          name: "intervention",
          label: "Intervention",
          
          type: "checkbox-group",
          options: [
            { label: "Behavioural therapy", value: "behavioural_therapy" },
            { label: "Parent training", value: "parent_training" },
            { label: "Speech therapy", value: "speech_therapy" },
            { label: "Occupational therapy", value: "occupational_therapy" },
            { label: "Psychoeducation", value: "psychoeducation" }
          ]
        },

        {
          name: "bt_sessions_per_week",
          label: "Behavioural therapy — sessions/week",
          type: "input",
          placeholder: "e.g. 2",
          showIf: { field: "intervention", includes: "behavioural_therapy" }
        },
        {
          name: "bt_duration_weeks",
          label: "Behavioural therapy — duration (weeks)",
          type: "input",
          placeholder: "e.g. 12",
          showIf: { field: "intervention", includes: "behavioural_therapy" }
        },

        {
          name: "parent_training_type",
          label: "Parent training (type)",
          type: "input",
          placeholder: "Specify",
          showIf: { field: "intervention", includes: "parent_training" }
        },

        {
          name: "psychoeducation_given_to",
          label: "Psychoeducation — given to",
          type: "input",
          placeholder: "e.g. parents",
          showIf: { field: "intervention", includes: "psychoeducation" }
        },
        {
          name: "psychoeducation_topics",
          label: "Psychoeducation — topics covered",
          type: "textarea",
          placeholder: "Enter topics",
          showIf: { field: "intervention", includes: "psychoeducation" }
        },

        /* ================= SCHOOL RECOMMENDATIONS ================= */
       
        {
          name: "school_recommendations",
          label: "School recommendation",
          
          type: "checkbox-group",
          options: [
            { label: "IEP / accommodation letter", value: "iep" },
            { label: "Teacher consultation", value: "teacher_consultation" },
            { label: "Resource room / shadow teacher", value: "resource_room" }
          ]
        },

        /* ================= REFERRALS ================= */
       
        {
          name: "referrals",
          label: "Referrals" ,
          
          type: "checkbox-group",
          options: [
            { label: "Pediatrician", value: "pediatrician" },
            { label: "Child psychiatrist", value: "child_psychiatrist" },
            { label: "Multidisciplinary rehab team", value: "rehab_team" },
            { label: "Other", value: "other" }
          ]
        },
        {
          name: "referral_other_specify",
          label: "Other referral (specify)",
          type: "input",
          placeholder: "Specify",
          showIf: { field: "referrals", includes: "other" }
        },

        /* ================= FOLLOW-UP PLAN ================= */
       
        {
  type: "row",

  label: "Follow-up plan", // or "columns" depending on your builder
  fields: [
    {
      name: "next_appointment",
      label: "Next appointment",
      type: "date"
    },
    {
      name: "review_date",
      label: "Review date",
      type: "date"
    }
  ]
},
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
const getDevelopmentKey = (age) => {
  if (!age) return null;

  const numAge = parseFloat(age);

  if (numAge < 0.5) return "2-5_months";
  if (numAge < 1) return "6-9_months";
  if (numAge < 1.5) return "12-18_months";
  if (numAge >= 2 && numAge < 3) return "2_years";
  if (numAge >= 3 && numAge < 4) return "3_years";
  if (numAge >= 4 && numAge < 5) return "4_years";
  if (numAge >= 5 && numAge < 20) return "5_years";

  return null;
};


function DevelopmentMilestones({ age }) {
  const key = getDevelopmentKey(age);
  const [milestoneValues, setMilestoneValues] = useState({});

  if (!key || !DEVELOPMENT_DATA[key]) return null;

  const schema = DEVELOPMENT_DATA[key];

  const handleChange = (fieldName, optionValue) => {
    setMilestoneValues(prev => ({ ...prev, [fieldName]: optionValue }));
  };

  return (
    <div style={{ paddingLeft: 0 }}>
      {/* <h3 style={{ marginBottom: 12, color: "#1e293b" }}>
        Developmental Milestones ({key.replaceAll("_", " ")})
      </h3> */}

      {schema.sections.map((section, si) =>
        section.fields.map((field, fi) => {
          if (field.type === "radio-group") {
            const selected = milestoneValues[field.name];

            // Sum up all option label characters.
            // If total > 80 chars, options won't fit on one line → label goes above.
            const totalChars = field.options.reduce((sum, o) => sum + o.label.length, 0);
            const labelAbove = totalChars > 80;

            return (
              <div key={`${si}-${fi}`} style={{
                display: "flex",
                flexDirection: labelAbove ? "column" : "row",
                alignItems: labelAbove ? "flex-start" : "center",
                gap: labelAbove ? 6 : 16,
                padding: "8px 10px",
                borderBottom: "1px solid #f1f5f9"
              }}>
                {/* Label */}
                <span style={{
                  fontWeight: 600,
                  fontSize: 14,
                  color: "#0f172a",
                  minWidth: labelAbove ? undefined : 200,
                  whiteSpace: "nowrap"
                }}>
                  {field.label}
                </span>

                {/* Radio options */}
                <div style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px 16px",
                  flex: labelAbove ? undefined : 1,
                  justifyContent: labelAbove ? "flex-start" : "flex-end"
                }}>
                  {field.options.map(opt => {
                    const isSelected = selected === opt.value;
                    return (
                      <label key={opt.value} style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        cursor: "pointer",
                        fontSize: 14,
                        color: "#1e293b",
                        fontWeight: 400,
                        whiteSpace: "nowrap"
                      }}>
                        <input
                          type="radio"
                          name={field.name}
                          value={opt.value}
                          checked={isSelected}
                          onChange={() => handleChange(field.name, opt.value)}
                          style={{ cursor: "pointer", width: 15, height: 15, accentColor: "#2451b3" }}
                        />
                        {opt.label}
                      </label>
                    );
                  })}
                </div>
              </div>
            );
          }

          return null;
        })
      )}
    </div>
  );
}
  

  const PsychologyPatientInfo = () => (
    <div style={patientGrid}>
      <div><b>Name:</b> {patient.name || "-"}</div>
    
      <div><b>Age / Gender:</b> {patient.age || "-"} / {patient.sex || "-"}</div>
      
      <div><b>Date of Assessment:</b> {today.toLocaleDateString()}</div>
      
    </div>
  );

   const today = new Date();

    const formatDate = (d) => (d ? new Date(d).toLocaleDateString() : "-");

    const calculateDuration = (onset) => {
      if (!onset) return "-";
      const diff = today - new Date(onset);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const months = Math.floor(days / 30);
      const years = Math.floor(months / 12);
      if (years > 0) return `${years} yr ${months % 12} mo`;
      if (months > 0) return `${months} mo`;
      return `${days} days`;
    };
  /* ===================== RENDER ===================== */

  return (
    <PatientContext.Provider value={patient}>
      <div style={mainContent}>
        {/* ===== PATIENT INFORMATION CARD ===== */}
       
       
               <CommonFormBuilder
                 schema={PSYCHOLOGY_CONTAINER_SCHEMA}
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
          assessmentRegistry={PSYCHOLOGY_ASSESSMENT_REGISTRY}
        >
          {/* <div style={submitRow}>
            <button style={submitBtn} onClick={handleSubmit}>
              Submit Psychology Assessment
            </button>
          </div> */}
          <div style={submitRow}>
          {activeTab !== "plan" ? (
            <button style={submitBtn} onClick={() => setActiveTab(tabOrder[activeTabIdx + 1])}>
              Next
            </button>
          ) : (
            <button style={submitBtn} onClick={handleSubmit}>
               Submit Psychology Assessment
            </button>
          )}
        </div>
        </CommonFormBuilder>
      </div>
    </PatientContext.Provider>
  );
}

/* ===================== STYLES ===================== */

const mainContent = { margin: "0 auto", width: "100%" };

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

const patientInfoGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 12,
  fontSize: 14
};

const card = {
  background: "#fff",
  borderRadius: "10px",
  padding: "20px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  marginBottom: "20px"
};

const title = {
  fontSize: "20px",
  fontWeight: "600",
  marginBottom: "10px"
};

const divider = {
  height: "1px",
  background: "#e5e7eb",
  marginBottom: "16px"
};

  const patientGrid = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 12,
    fontSize: 14,
  };

