// Schema

import { Label } from "recharts"

// Patient information card
const PATIENT_SCHEMA = {
  "title": "Patient Information",
  sections: []
}

// Actions
const ACTIONS = [
       { type: "save", label: "Save"},
       { type: "back", label: "Back"},
       { type: "clear", label: "Clear"}
    ]

// Subjective schema
const SUBJECTIVE_SCHEMA = {
    actions: ACTIONS,
    fields: [
        { name: "chief_complaint", label: "Chief Complaint", type: "textarea"},
        { name: "present_illness", label: "History of Present Illness", type: "textarea"},
        { name: "symptoms", 
          label: "Associated Symptoms", 
          type: "checkbox-group",
          options: [
            { label: "Fever", value: "fever"},
            { label: "Chest Pain", value: "chest_pain"},
            { label: "Orthopnea", value: "orthopnea"},
            { label: "PND", value: "pnd"},
            { label: "Hemoptysis", value: "hemoptysis "},
            { label: "Wheezing", value: "wheezing"}
          ]
        },
        { name: "nrs", label:"NRS", type:"input" },
        { name: "location", label:"Location", type:"input"},
        { name: "type", label: "Type", type: "input"},
        { name: "aggravating", label:"Aggravating", type: "input"},
        { name: "relieving", label:"Relieving", type: "input"},
        { name: "patient_goals", label: "Patient Goals/Expectations", type:"textarea"},
        { name: "plof", 
          label: "Prior Level of Function (PLOF)",
          type: "checkbox-group",
          options: [
            { label: "Independent", value: "independent"},
            { label: "Independent with aid", value: "independent_aid"},
            { label: "Dependent", value: "dependent"},
            { label: "Sedentary", value: "sedentary"},
            { label: "Active", value: "active"},
            { label: "Employed", value: "employed"}
          ]

        },
        { name: "functional_limitations",
          label: "Functional Limitations",
          type: "checkbox-group",
          options: [
            { label: "Bed mobility difficulty", value: "bed_mobility_difficulty"},
            { label: "Reduced ambulation tolerance", value: "reduced_ambulation_tolerance"},
            { label: "ADL limitation", value: "adl_limitation"},
            { label: "Reduced stair climbing", value: "reduced_stair_climbing"},
            { label: "Work limitation", value: "work_limitation"}
          ]
        },
        { name: "past_medical_history",
          label: "Past Medical History",
          type: "checkbox-group",
          options: [
            { label: "HTN", value: "htn"},
            { label: "DM", value: "dm"},
            
          ]

        }

    ]
}

// Objective schema
const OBJECTIVE_SCHEMA = {
    actions: ACTIONS,
    fields: []
}

// Assessment schema
const ASSESSMENT_SCHEMA = {
    actions: ACTIONS,
    fields: []
}

// Plan schema
const PLAN_SCHEMA = {
    actions: ACTIONS,
    fields: []
}

// Schema mapping
const SCHEMA_MAPPING = {
    plan: PLAN_SCHEMA,
    objective: OBJECTIVE_SCHEMA,
    assessment: ASSESSMENT_SCHEMA,
    subjective: SUBJECTIVE_SCHEMA
}
 
export {
    SCHEMA_MAPPING,
    PATIENT_SCHEMA
}