import React, { useState } from "react";
import CommonFormBuilder from "../CommonComponenets/FormBuilder";

export function IndustrialAudiometry({ onBack, mode }) {
  const [values, setValues] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
    alert("Industrial Audiometry form submitted");
  };

  const schema = {
    title: "Industrial Audiometry",
    actions: [{ type: "back", label: "Back" }],
    sections: [
      /* =========================
         1. QUESTIONNAIRE FORM
      ========================= */
      {
        title: "",
        fields: [
          // CAUTION INFO TEXT
          {
            type: "info-text",
            text: "CAUTION: Do not proceed with audiometric testing if the worker has conditions that may affect the test results (Example: cold, giddiness, tinnitus etc.)."
          },

          // Q1
          {
            name: "q1_exposed_14h",
            label: "1. Were you exposed to loud noise within 14 hours prior to today's test?",
            type: "radio",
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" }
            ]
          },
          {
            type: "info-text",
            text: "CAUTION: If 'Yes', please abort and reschedule testing with an advice to avoid loud noise 14 hours prior to test.",
            showIf: { field: "q1_exposed_14h", equals: "yes" }
          },

          // Q2
          {
            name: "q2_illness_hearing",
            label: "2. Have you suffered any illness that has affected your hearing",
            info: "e.g.: infection, tinnitus, discharge etc.",
            type: "radio",
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" }
            ]
          },
          {
            name: "q2_details",
            label: "If Yes, please detail:",
            type: "input",
            showIf: { field: "q2_illness_hearing", equals: "yes" }
          },

          // Q3
          {
            name: "q3_ear_operation",
            label: "3. Have you ever had an ear operation or any other major operation that affected your hearing?",
            type: "radio",
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" }
            ]
          },
          {
            name: "q3_details",
            label: "If Yes, please detail:",
            type: "input",
            showIf: { field: "q3_ear_operation", equals: "yes" }
          },

          // Q4
          {
            name: "q4_medication",
            label: "4. Have you ever taken any medication (tablets or injections) that affected your hearing?",
            type: "radio",
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" }
            ]
          },
          {
            name: "q4_details",
            label: "If Yes, please detail:",
            type: "input",
            showIf: { field: "q4_medication", equals: "yes" }
          },

          // Q5
          {
            name: "q5_loud_noise_exposure",
            label: "5. Have you been exposed to loud noise?",
            info: "e.g.: chainsaw, firecrackers, explosion, gunfire, motorcycles",
            type: "radio",
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" }
            ]
          },
          
          {
            type: "row",
            cols: 2, // Split into 2 equal columns
            showIf: { field: "q5_loud_noise_exposure", equals: "yes" }, // Apply condition to the whole row
            fields: [
              {
                name: "q5_kind",
                label: "If Yes, what kind:",
                type: "input"
              },
              {
                name: "q5_often",
                label: "and how often:",
                type: "input"
              }
            ]
          },

          // Q6
          {
            name: "q6_family_history",
            label: "6. Any family history of hearing loss/disorders?",
            type: "radio",
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" }
            ]
          },
          {
            name: "q6_details",
            label: "If Yes, please detail:",
            type: "input",
            showIf: { field: "q6_family_history", equals: "yes" }
          },

          // Q7
          {
            name: "q7_night_clubs",
            label: "7. Do you attend night clubs/pubs/discotheques or pop/rock concerts?",
            type: "radio",
            labelAbove:true,
            options: [
              { label: "Never", value: "never" },
              { label: "Once a Year", value: "once_year" },
              { label: "More Than Once a Year", value: "more_once_year" }
            ]
          },

          // Q8
          {
            name: "q8_personal_stereo",
            label: "8. Do you use a personal stereo (e.g.: walkman/ipod)?",
            type: "radio",
            labelAbove:true,
            options: [
              { label: "Never", value: "never" },
              { label: "Less Than 2 Hours Per Week", value: "<2h_week" },
              { label: "More Than 2 Hours Per Week", value: ">2h_week" }
            ]
          },

          // Q9
          {
            name: "q9_loud_instruments",
            label: "9. Do you play loud musical instruments?",
            type: "radio",
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" }
            ]
          },
          {
            name: "q9_details",
            label: "If Yes, please detail:",
            type: "input",
            showIf: { field: "q9_loud_instruments", equals: "yes" }
          },

          // Q10
          {
            name: "q10_noisy_jobs",
            label: "10. Have you worked in noisy jobs in the past?",
            info: "jobs where you had communication difficulty due to noise",
            type: "radio",
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" }
            ]
          },
          {
            name: "q10_details",
            label: "If Yes, please detail:",
            type: "input",
            showIf: { field: "q10_noisy_jobs", equals: "yes" }
          },

          // Q11
          {
            name: "q11_php",
            label: "11. Were you wearing personal hearing protectors (PHP) at that time (referring to Q10)?",
            type: "radio",
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" }
            ],
            showIf: { field: "q10_noisy_jobs", equals: "yes" }
          },
          {
            name: "q11_php_type",
            label: "If Yes, type of PHP:",
            type: "input",
            showIf: { field: "q11_php", equals: "yes" }
          },

            // Q12
          {
            name: "q12_prev_test",
            label: "12. Have you had an audiometric test before?",
            type: "radio",
            options: [
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" }
            ]
          },
          
          {
            type: "row",
            cols: 2, // Split into 2 equal columns
            showIf: { field: "q12_prev_test", equals: "yes" }, // Apply condition to the whole row
            fields: [
              {
                name: "q12_when",
                label: "If Yes When:",
                type: "input",
              },
              {
                name: "q12_where",
                label: "And Where:",
                type: "input",
              }
            ]
          },

          // NOTE
          {
            type: "info-text",
            text: "NOTE: An answer of 'Yes' for Q2-Q6, 'MORE THAN ONCE A YEAR' for Q7, 'MORE THAN 2 HOURS PER WEEK' for Q8, 'ROCK BAND/SYMPHONY ORCHESTRA' for Q9 and its' significance may indicate on how the test results will be interpreted. Question 10, 11 and 12 are meant to reflect a suspicion of a pre-existing hearing disorder and the worker's knowledge about audiometric testing."
          },

          // Visual Examination
          {
            type: "subheading",
            label: "Visual Examination of Ear"
          },
          {
            name: "visual_exam",
            label: "",
            type: "radio",
            options: [
              { label: "Normal", value: "normal" },
              { label: "Abnormal", value: "abnormal" }
            ]
          },
          {
            name: "visual_abnormal_details",
            label: "If Abnormal, please detail:",
            type: "input",
            showIf: { field: "visual_exam", equals: "abnormal" }
          },
          {
            type: "info-text",
            text: "CAUTION: The audiometric testing shall be aborted and rescheduled if any significant abnormality detected in the visual examination of the ear (e.g.: active ear discharge/excessive cerumen/wax impaction etc.). A referral to a doctor for further intervention may be necessary before repeating the test.",
            showIf: { field: "visual_exam", equals: "abnormal" }
          },

          // Footer Note
          {
            type: "info-text",
            text: "NOTE: Please explain clearly the audiometric testing procedure to the worker. This form is to be compiled with the audiometric report for review by the OHD."
          }
        ]
      },

      /* =========================
         2. AUDIO METRIC REPORT
      ========================= */
      {
        title: "Audiometric Test Report",
        fields: [
          /* ---------- MEDICAL HISTORY ---------- */
          {
            type: "subheading",
            label: "Past Medical History"
          },
          {
            type: "row",
            cols: 3,
            fields: [
              { name: "pmh_ear_discharge", label: "1. Ear discharge", type: "radio", options: ["Yes", "No"] },
              { name: "pmh_ent_problems", label: "4. ENT problems", type: "radio", options: ["Yes", "No"] },
              { name: "pmh_exposure_noise", label: "7. Exposure to noise", type: "radio", options: ["Yes", "No"] }
            ]
          },
          {
            type: "row",
            cols: 3,
            fields: [
              { name: "pmh_ear_ache", label: "2. Ear ache", type: "radio", options: ["Yes", "No"] },
              { name: "pmh_ent_operations", label: "5. ENT operations", type: "radio", options: ["Yes", "No"] },
              { name: "pmh_exposure_explosion", label: "8. Exposure to loud explosion", type: "radio", options: ["Yes", "No"] }
            ]
          },
          {
            type: "row",
            cols: 3,
            fields: [
              { name: "pmh_ear_infection", label: "3. Ear infection", type: "radio", options: ["Yes", "No"] },
              { name: "pmh_hobby", label: "6. Hobby", type: "radio", options: ["Yes", "No"] },
              { name: "pmh_family_history", label: "9. Family history", type: "radio", options: ["Yes", "No"] }
            ]
          },

          {
            type: "subheading",
            label: "Present Medical Condition"
          },
          {
            type: "row",
            cols: 2,
            fields: [
              { name: "present_noise_14h", label: "1. Exposure to loud noise last 14 hours", type: "radio", options: ["Yes", "No"] },
              { name: "present_uri", label: "3. Upper respiratory infection", type: "radio", options: ["Yes", "No"] }
            ]
          },
          {
            type: "row",
            cols: 2,
            fields: [
              { name: "present_medication", label: "2. Current medication for major illness", type: "radio", options: ["Yes", "No"] },
              { name: "present_ear_infection", label: "4. Ear infection", type: "radio", options: ["Yes", "No"] }
            ]
          },

          {
            type: "subheading",
            label: "Test Information"
          },
          {
            type: "row",
            cols: 2,
            fields: [
              { name: "test_date", label: "Date of Audiometric Test", type: "date" },
              { name: "test_place", label: "Place", type: "input" }
            ]
          },
          {
            type: "row",
            cols: 2,
            fields: [
              { name: "audiometer", label: "Audiometer", type: "input" },
              { name: "serial_no", label: "Serial No", type: "input" }
            ]
          },
          {
            type: "row",
            cols: 2,
            fields: [
              { name: "calibration_date", label: "Calibration date", type: "date" },
              { name: "next_calibration", label: "Next calibration date", type: "date" }
            ]
          },

          /* ---------- AUDIOGRAM GRAPH ---------- */
        {
              name: "audifile",
              label: "Upload Audiometry File",
              type: "file-upload-modal",
            },
            // { type: "audiogram-graph", name: "audiogram_graph" },
            {
              type: "row",
              fields: [
                {
                  name: "impression_r",
                  label: "Impression – Right Ear",
                  type: "textarea"
                },
                {
                  name: "impression_l",
                  label: "Impression – Left Ear",
                  type: "textarea"
                },
                {
              name: "audiometry_type",
              label: "Type of Audiometry",
              type: "radio",
              options: [
                { label: "Screening", value: "screening" },
                { label: "Diagnostic Pure Tone", value: "pta" },
                { label: "Play", value: "play" },
                { label: "Visual Reinforcement (VR)", value: "vra" },
                { label: "Free field Audiometry", value: "free_field"},
                { label: "Aided Response", value: "aided"}
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
            },
            {
              name: "reliability",
              label: "Reliability",
              type: "radio",
              options: [
                { label: "Good", value: "Good" },
                { label: "Fair", value: "Fair" },
                { label: "Poor", value: "Poor" }
              ]
            }
              ]
            },

          /* ---------- RESULT & COMMENTS ---------- */
          {
            type: "subheading",
            label: "Result and Comment"
          },
          {
            type: "row",
            cols: 2,
            fields: [
              { name: "result_normal", label: "1. Normal audiogram", type: "radio", options: ["Yes", "No"] },
              { name: "result_impairment", label: "2. Hearing Impairment", type: "radio", options: ["Yes", "No"] },
              
            ]
          },
          {
            type: "row",
            cols: 2,
            fields: [
              { name: "result_shift", label: "3. Standard threshold shift", type: "radio", options: ["Yes", "No"] },
              { name: "result_retest_3m", label: "4. Must retest within 3 months", type: "radio", options: ["Yes", "No"] },
              
            ]
          },
          {
            type: "row",
            
            fields: [
              { name: "result_annual", label: "5. Must retest annually & wear hearing protector", type: "radio", options: ["Yes", "No"] }
            ]
          },
          {
            type: "row",
            cols: 2,
            fields: [
            //   { name: "tested_by", label: "Tested by", type: "input" },
              { name: "verified_by", label: "Verified by", type: "input" },
            ]
          },
        ]
      }
    ]
  };

  return (
    <div style={{ padding: "20px" }}>
      <CommonFormBuilder
        schema={schema}
        values={values}
        onChange={handleChange}
        submitted={submitted}
        onAction={(action) => {
          if (action === "back") onBack();
        }}
      />
      
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        marginTop: "20px",
        gap: "12px"
      }}>
     
        
        {/* <button
          onClick={handleSubmit}
          style={{
            padding: "10px 24px",
            background: "#2563EB",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            fontSize: "14px",
            fontWeight: "600",
            cursor: "pointer"
          }}
        >
          Submit
        </button> */}
      </div>
    </div>
  );
}