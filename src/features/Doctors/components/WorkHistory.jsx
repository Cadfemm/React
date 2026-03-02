import React, { useState } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

export default function WorkHistory() {
  const [values, setValues] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const onChange = (name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const onAction = (type) => {
    if (type === "submit") {
      setSubmitted(true);
      console.log("Work History Data:", values);
    }
  };

  const WORK_HISTORY_SCHEMA = {
    title: "Work History",
    sections: [
      {
        title: "Current Job",
        fields: [
          {
            type: "row",
            fields: [
              {
                name: "current_job_role",
                label: "What is your current occupation?",
                type: "input"
              },
              {
                name: "current_job_typical_day",
                label: "What does a typical day at work involve?",
                type: "input"
              }
            ]
          },
          {
            type: "row",
            fields: [
              {
                name: "current_job_duration",
                label: "How long have you been doing this job?",
                type: "input"
              },
              {
                name: "current_job_schedule",
                label: "Is it full-time, part-time, or shift work?",
                type: "input"
              }
            ]
          },
          {
            type: "row",
            fields: [
              {
                name: "current_job_enjoyment",
                label: "Do you enjoy your work? (stress or job satisfaction may affect health)",
                type: "input"
              }
            ]
          },
          {
            type: "info-text",
            text: "Purpose: Understand job role and possible physical or environmental demands."
          }
        ]
      },
      {
        title: "Workplace Environment",
        fields: [
          {
            type: "row",
            fields: [
              {
                name: "workplace_location",
                label: "Where do you work? (factory, office, outdoors, healthcare, construction, etc.)",
                type: "input"
              },
              {
                name: "workplace_conditions",
                label: "Describe your working conditions",
                type: "input"
              }
            ]
          },
          {
            type: "row",
            fields: [
              {
                name: "workplace_indoor_outdoor",
                label: "Indoor / outdoor",
                type: "radio",
                options: [
                  { label: "Indoor", value: "indoor" },
                  { label: "Outdoor", value: "outdoor" },
                  { label: "Both", value: "both" }
                ]
              },
              {
                name: "workplace_temperature_extremes",
                label: "Temperature extremes (hot / cold)",
                type: "radio",
                options: [
                  { label: "No", value: "no" },
                  { label: "Yes", value: "yes" }
                ]
              }
            ]
          },
          {
            type: "row",
            fields: [
              {
                name: "workplace_ventilation",
                label: "Ventilation quality",
                type: "radio",
                options: [
                  { label: "Good", value: "good" },
                  { label: "Poor", value: "poor" }
                ]
              },
              {
                name: "workplace_noise_levels",
                label: "Noise levels",
                type: "input"
              }
            ]
          },
          {
            type: "row",
            fields: [
              {
                name: "workplace_lighting",
                label: "Lighting conditions",
                type: "input"
              }
            ]
          },
          {
            type: "info-text",
            text: "Purpose: Identifies environmental and ergonomic factors affecting health."
          }
        ]
      },
      {
        title: "Occupational Exposures",
        fields: [
          {
            type: "row",
            fields: [
              {
                name: "exposure_dusts",
                label: "Dusts (e.g., silica, coal, asbestos, flour)",
                type: "input"
              },
              {
                name: "exposure_fumes_vapors_gases",
                label: "Fumes / Vapors / Gases (e.g., welding fumes, solvents, chlorine)",
                type: "input"
              }
            ]
          },
          {
            type: "row",
            fields: [
              {
                name: "exposure_chemicals",
                label: "Chemicals (e.g., pesticides, cleaning agents, acids)",
                type: "input"
              },
              {
                name: "exposure_biological",
                label: "Biological agents (e.g., healthcare, farm, lab staff)",
                type: "input"
              }
            ]
          },
          {
            type: "row",
            fields: [
              {
                name: "exposure_radiation",
                label: "Radiation (e.g., radiographers, nuclear workers)",
                type: "input"
              },
              {
                name: "exposure_noise_vibration",
                label: "Noise / Vibration (e.g., factory, construction workers)",
                type: "input"
              }
            ]
          },
          {
            type: "row",
            fields: [
              {
                name: "exposure_physical_strain",
                label: "Physical strain (repetitive tasks, heavy lifting, poor posture)",
                type: "input"
              }
            ]
          },
          {
            type: "row",
            fields: [
              {
                name: "exposure_frequency",
                label: "How often are you exposed? (daily, occasionally)",
                type: "radio",
                options: [
                  { label: "Daily", value: "daily" },
                  { label: "Occasionally", value: "occasionally" },
                  { label: "Rarely", value: "rarely" }
                ]
              },
              {
                name: "exposure_protective_measures",
                label: "Are protective measures used? (masks, gloves, ventilation, PPE)",
                type: "input"
              }
            ]
          },
          {
            type: "row",
            fields: [
              {
                name: "exposure_coworkers_affected",
                label: "Are other coworkers affected similarly?",
                type: "input"
              },
              {
                name: "exposure_improves_away_from_work",
                label: "Does condition improve when away from work (weekends, holidays)?",
                type: "input"
              }
            ]
          },
          {
            type: "info-text",
            text: "Purpose: Helps detect occupational diseases (e.g., asthma, dermatitis, hearing loss)."
          }
        ]
      },
      {
        title: "Previous Employment History",
        fields: [
          {
            type: "row",
            fields: [
              {
                name: "prev_jobs",
                label: "What jobs have you done in the past?",
                type: "textarea"
              },
              {
                name: "prev_exposure_hazardous",
                label: "Any past exposure to hazardous substances?",
                type: "textarea"
              }
            ]
          },
          {
            type: "row",
            fields: [
              {
                name: "prev_occupational_illnesses",
                label: "Any known occupational illnesses or injuries?",
                type: "textarea"
              },
              {
                name: "prev_roles_duration",
                label: "How long did you work in those roles?",
                type: "input"
              }
            ]
          },
          {
            type: "info-text",
            text: "Purpose: Some occupational diseases have long latency periods (e.g., asbestosis, silicosis, mesothelioma)."
          }
        ]
      },
      {
        title: "Work-Related Illness or Injury",
        fields: [
          {
            type: "row",
            fields: [
              {
                name: "work_illness_symptom_onset",
                label: "When did your symptoms start in relation to your work?",
                type: "input"
              },
              {
                name: "work_illness_worse_at_work",
                label: "Are symptoms worse at work and better on holidays?",
                type: "input"
              }
            ]
          },
          {
            type: "row",
            fields: [
              {
                name: "work_illness_prev_accidents",
                label: "Any previous workplace accidents or injuries?",
                type: "input"
              },
              {
                name: "work_illness_medical_compensation",
                label: "Was medical attention or compensation required?",
                type: "input"
              }
            ]
          },
          {
            type: "info-text",
            text: "Purpose: Establishes temporal relationship between work and illness."
          }
        ]
      },
      {
        title: "Protective Measures",
        fields: [
          {
            name: "ppe_used",
            label: "Do you use any personal protective equipment (PPE)?",
            type: "radio",
            options: [
              { label: "No", value: "no" },
              { label: "Yes", value: "yes" }
            ]
          },
          {
            type: "row",
            fields: [
              {
                name: "ppe_type",
                label: "What type (mask, gloves, ear protection, respirator, eye protection)?",
                type: "input",
                showIf: { field: "ppe_used", equals: "yes" }
              },
              {
                name: "ppe_training",
                label: "Are you trained in safe handling of chemicals or machinery?",
                type: "input",
                showIf: { field: "ppe_used", equals: "yes" }
              }
            ]
          },
          {
            type: "row",
            fields: [
              {
                name: "ppe_regulations_followed",
                label: "Are workplace safety regulations followed?",
                type: "input",
                showIf: { field: "ppe_used", equals: "yes" }
              },
              {
                name: "ppe_health_checks",
                label: "Are regular health checks provided by your employer?",
                type: "input",
                showIf: { field: "ppe_used", equals: "yes" }
              }
            ]
          },
          {
            type: "info-text",
            text: "Purpose: Determines risk mitigation and safety culture."
          }
        ]
      },
      {
        title: "Regulatory / Administrative Details",
        fields: [
          {
            type: "row",
            fields: [
              {
                name: "reg_employer_aware",
                label: "Is your employer aware of your health issue?",
                type: "input"
              },
              {
                name: "reg_occupational_assessments",
                label: "Any occupational health assessments done?",
                type: "input"
              }
            ]
          },
          {
            type: "row",
            fields: [
              {
                name: "reg_workers_compensation",
                label: "Any workers’ compensation claims?",
                type: "input"
              },
              {
                name: "reg_oh_support",
                label: "Access to occupational health support or rehab programs?",
                type: "input"
              }
            ]
          }
        ]
      },
      {
        title: "Impact on Daily Life",
        fields: [
          {
            type: "row",
            fields: [
              {
                name: "impact_ability_to_work",
                label: "Has your illness affected your ability to work?",
                type: "input"
              },
              {
                name: "impact_sick_leave",
                label: "Are you on sick leave or restricted duty?",
                type: "input"
              }
            ]
          },
          {
            type: "row",
            fields: [
              {
                name: "impact_adjustments_needed",
                label: "Do you need adjustments (reduced hours, different tasks)?",
                type: "input"
              },
              {
                name: "impact_job_security_worry",
                label: "Are you worried about job security?",
                type: "input"
              }
            ]
          }
        ]
      },
      {
        title: "Social & Lifestyle Links",
        fields: [
          {
            type: "row",
            fields: [
              {
                name: "social_job_effects",
                label: "How does your job affect your lifestyle (stress, sleep, family life)?",
                type: "textarea"
              },
              {
                name: "social_substance_due_to_work",
                label: "Do you smoke or drink more because of work stress or environment?",
                type: "textarea"
              }
            ]
          },
          {
            type: "row",
            fields: [
              {
                name: "social_commute",
                label: "How do you commute? (e.g., long travel, physical strain)",
                type: "input"
              }
            ]
          }
        ]
      }
    ]
  };

  return (
    <CommonFormBuilder
      schema={WORK_HISTORY_SCHEMA}
      values={values}
      onChange={onChange}
      submitted={submitted}
      onAction={onAction}
    />
  );
}

