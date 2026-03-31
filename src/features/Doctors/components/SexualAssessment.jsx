import React, { useEffect, useMemo, useState } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";
import ehsImage from "../../../assets/EHS.png";

function yn(name, label, showIf) {
  return {
    type: "radio",
    name,
    label,
    options: [
      { label: "Yes", value: "Yes" },
      { label: "No", value: "No" }
    ],
    ...(showIf ? { showIf } : {})
  };
}

function EHSSAssessment({ values = {}, onChange }) {
  const options = [
    ["0", "Penis does not enlarge"],
    ["1", "Penis is larger but not hard"],
    ["2", "Penis is hard but not hard enough for penetration"],
    ["3", "Penis is hard enough for penetration but not completely hard"],
    ["4", "Penis is completely hard and fully rigid"]
  ];
  const selected = values?.ehs_score || "";
  const selectScore = (value, text) => {
    onChange("ehs_score", value);
    onChange("ehs_score_label", `${value} - ${text}`);
  };

  return (
    <div style={{ border: "1px solid #e5e7eb", borderRadius: 10, padding: 12 }}>
      <img
        src={ehsImage}
        alt="EHS"
        style={{ width: "100%", maxWidth: 420, borderRadius: 8, marginBottom: 12 }}
      />
      <div style={{ fontWeight: 700, marginBottom: 8 }}>EHS Score</div>
      {options.map(([value, text]) => (
        <button
          key={value}
          type="button"
          onClick={() => selectScore(value, text)}
          style={{
            width: "100%",
            textAlign: "left",
            padding: "10px 12px",
            marginBottom: 6,
            borderRadius: 8,
            border: selected === value ? "2px solid #2563eb" : "1px solid #d1d5db",
            background: selected === value ? "#eff6ff" : "#fff",
            color: "#0f172a",
            cursor: "pointer"
          }}
        >
          <strong>{value}</strong> - {text}
        </button>
      ))}
    </div>
  );
}

function IIEF5Assessment({ values = {}, onChange }) {
  const matrixOptions = [
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "4", value: 4 },
    { label: "5", value: 5 }
  ];
  const scoreKeys = ["iief5_q1", "iief5_q2", "iief5_q3", "iief5_q4", "iief5_q5"];
  const total = scoreKeys.reduce((sum, key) => sum + (Number(values?.[key]) || 0), 0);

  useEffect(() => {
    if (Number(values?.iief5_total_score || 0) !== total) {
      onChange("iief5_total_score", total);
    }
  }, [total, values?.iief5_total_score, onChange]);

  const interpretationLabel =
    total >= 22 ? "No erectile dysfunction" :
    total >= 17 ? "Mild erectile dysfunction" :
    total >= 12 ? "Mild to moderate erectile dysfunction" :
    total >= 8 ? "Moderate erectile dysfunction" :
    total >= 5 ? "Severe erectile dysfunction" :
    "";
  const interpretation = interpretationLabel
    ? `${total} - ${interpretationLabel}`
    : "Select all 5 questions to compute score";

  useEffect(() => {
    if ((values?.iief5_interpretation || "") !== interpretation) {
      onChange("iief5_interpretation", interpretation);
    }
  }, [interpretation, values?.iief5_interpretation, onChange]);

  const schema = {
    title: "IIEF-5 Questionnaire",
    sections: [
      {
        title: null,
        fields: [
          {
            name: "iief5_q1",
            label: "1. How do you rate your confidence that you could get and keep an erection?",
            type: "radio-matrix",
            options: matrixOptions,
            rowInfo: {
              title: "Scoring explanation",
              content: ["1 - Very low", "2 - Low", "3 - Moderate", "4 - High", "5 - Very high"]
            },
            showInfoInRow: true
          },
          {
            name: "iief5_q2",
            label: "2. When you had erections with sexual stimulation, how often were your erections hard enough for penetration?",
            type: "radio-matrix",
            options: matrixOptions,
            rowInfo: {
              title: "Scoring explanation",
              content: [
                "1 - Almost never / Never",
                "2 - A few times (much less than half the time)",
                "3 - Sometimes (about half the time)",
                "4 - Most times (much more than half the time)",
                "5 - Almost always / Always"
              ]
            },
            showInfoInRow: true
          },
          {
            name: "iief5_q3",
            label: "3. During sexual intercourse, how often were you able to maintain your erection after you had penetrated your partner?",
            type: "radio-matrix",
            options: matrixOptions,
            rowInfo: {
              title: "Scoring explanation",
              content: [
                "1 - Almost never / Never",
                "2 - A few times (much less than half the time)",
                "3 - Sometimes (about half the time)",
                "4 - Most times (much more than half the time)",
                "5 - Almost always / Always"
              ]
            },
            showInfoInRow: true
          },
          {
            name: "iief5_q4",
            label: "4. During sexual intercourse, how difficult was it to maintain your erection to completion of intercourse?",
            type: "radio-matrix",
            options: matrixOptions,
            rowInfo: {
              title: "Scoring explanation",
              content: [
                "1 - Extremely difficult",
                "2 - Very difficult",
                "3 - Difficult",
                "4 - Slightly difficult",
                "5 - Not difficult"
              ]
            },
            showInfoInRow: true
          },
          {
            name: "iief5_q5",
            label: "5. When you attempted sexual intercourse, how often was it satisfactory for you?",
            type: "radio-matrix",
            options: matrixOptions,
            rowInfo: {
              title: "Scoring explanation",
              content: [
                "1 - Almost never / Never",
                "2 - A few times (much less than half the time)",
                "3 - Sometimes (about half the time)",
                "4 - Most times (much more than half the time)",
                "5 - Almost always / Always"
              ]
            },
            showInfoInRow: true
          }
        ]
      }
    ]
  };

  return (
    <div style={{ border: "1px solid #e5e7eb", borderRadius: 10, padding: 12 }}>
      <CommonFormBuilder
        schema={schema}
        values={values}
        onChange={onChange}
        submitted={false}
        layout="nested"
      />
      <div style={{ marginTop: 10, fontWeight: 700 }}>Total score: {total}</div>
      <div style={{ marginTop: 4 }}>{interpretation}</div>
    </div>
  );
}

const SEXUAL_ASSESSMENT_REGISTRY = {
  ehs: EHSSAssessment,
  iief5: IIEF5Assessment
};

export default function SexualAssessment({ onChange: onParentChange, patient }) {
  const [values, setValues] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const isMale = useMemo(() => String(patient?.gender || "").toLowerCase() === "male", [patient?.gender]);

  const onChange = (name, value) => {
    setValues((prev) => {
      const next = { ...prev, [name]: value };
      onParentChange?.(next);
      return next;
    });
  };

  const withSexualIssue = (field) => ({
    ...field,
    showIf: field.showIf
      ? { field: "sexual_issue", equals: "Yes", and: field.showIf }
      : { field: "sexual_issue", equals: "Yes" }
  });

  const schema = {
    title: "Sexual Assessment",
    sections: [
      {
        title: null,
        fields: [
          { type: "subheading", label: "SCI related sexual history" },
          yn("sexual_issue", "Sexual issue"),
          ...[
            {
              type: "radio",
              name: "onset_erectile_dysfunction",
              label: "Onset of Erectile dysfunction",
              options: [
                { label: "Acute", value: "acute" },
                { label: "Gradual", value: "gradual" }
              ]
            },
            yn("lack_of_libido", "Lack of libido"),
            {
              type: "assessment-launcher",
              name: "ehs_assessment",
              label: "Rigidity of erection",
              options: [{ label: "EHS score", value: "ehs" }]
            },
            {
              type: "input",
              name: "ehs_score_label",
              label: "Selected EHS score",
              readOnly: true,
              showIf: { field: "ehs_score", exists: true }
            },
            { type: "input", name: "duration_of_sexual_stimulation", label: "Duration of sexual stimulation" },
            yn("difficulty_ejaculation_orgasm", "Difficulty with ejaculation/orgasm"),
            {
              type: "radio",
              name: "frequency_sexual_intercourse",
              label: "Frequency of sexual intercourse",
              labelAbove: true,
              options: [
                { label: "Weekly", value: "weekly" },
                { label: "Monthly", value: "monthly" },
                { label: "Once every 3 months", value: "every_3_months" },
                { label: "Once every 6 months", value: "every_6_months" },
                { label: "Others", value: "others" }
              ]
            },
            { type: "input", name: "frequency_sexual_intercourse_other", label: "Frequency of sexual intercourse (Specify)", showIf: { field: "frequency_sexual_intercourse", equals: "others" } },
            yn("absence_early_morning_erection", "Absence of early morning erection"),
            {
              type: "checkbox-group",
              name: "past_medical_surgical_history",
              label: "Past medical/surgical history",
              options: [
                { label: "Previous sexual dysfunction", value: "previous_sexual_dysfunction" },
                { label: "Cardiovascular disease", value: "cardiovascular_disease" },
                { label: "Metabolic syndrome", value: "metabolic_syndrome" },
                { label: "Pelvic surgery", value: "pelvic_surgery" }
              ]
            },
            {
              type: "checkbox-group",
              name: "medication_history",
              label: "Medication history",
              options: [
                { label: "Antihypertensives", value: "antihypertensives" },
                { label: "Antidepressants", value: "antidepressants" },
                { label: "Antipsychotics", value: "antipsychotics" },
                { label: "Anticonvulsants", value: "anticonvulsants" },
                { label: "Nitrates", value: "nitrates" },
                { label: "PDE5i", value: "pde5i" }
              ]
            },
            {
              type: "checkbox-group",
              name: "psychiatric_history",
              label: "Psychiatric history",
              options: [
                { label: "Current or previous psychological problems", value: "psychological_problems" },
                { label: "Cognitive factors", value: "cognitive_factors" },
                { label: "Previous trauma", value: "previous_trauma" }
              ]
            },
            {
              type: "checkbox-group",
              name: "social_history",
              label: "Social history",
              options: [
                { label: "Smoking", value: "smoking" },
                { label: "Alcohol consumption", value: "alcohol" },
                { label: "Illicit drug use", value: "illicit_drugs" },
                { label: "Diet", value: "diet" },
                { label: "Exercise", value: "exercise" }
              ]
            },

            { type: "subheading", label: "Sexual history" },
            yn("sexually_active", "Sexually active"),
            {
              type: "radio",
              name: "current_sexual_partner",
              label: "Current sexual partner(s)",
              options: [
                { label: "Same", value: "same" },
                { label: "Different", value: "different" },
                { label: "Others", value: "others" }
              ],
              showIf: { field: "sexually_active", equals: "Yes" }
            },
            { type: "input", name: "current_sexual_partner_other", label: "Current sexual partner(s) (Specify)", showIf: { field: "current_sexual_partner", equals: "others" } },
            { type: "input", name: "partner_perception_ed", label: "Partner's perception to ED", showIf: { field: "sexually_active", equals: "Yes" } },
            yn("sexual_exposure_experience", "Sexual exposure & experience", { field: "sexually_active", equals: "Yes" }),
            yn("plan_for_children", "Plan for children", { field: "sexually_active", equals: "Yes" }),
            { type: "input", name: "previous_method_tried", label: "Previous method tried", showIf: { field: "plan_for_children", equals: "Yes" } },
            yn("trial_pvs_device", "Trial of penile vibrator stimulation device", isMale ? { field: "plan_for_children", equals: "Yes" } : { field: "__hidden__", equals: "__never__" }),
            yn("venous_constriction_band", "Venous constriction band", isMale ? { field: "plan_for_children", equals: "Yes" } : { field: "__hidden__", equals: "__never__" }),
            yn("vacuum_erection_device", "Vacuum erection device (VED)", isMale ? { field: "plan_for_children", equals: "Yes" } : { field: "__hidden__", equals: "__never__" }),
            yn("intra_cavernous_injection", "Intra-cavernous injection (ICI)", isMale ? { field: "plan_for_children", equals: "Yes" } : { field: "__hidden__", equals: "__never__" }),
            yn("sperm_retrieval", "Sperm Retrieval", isMale ? { field: "plan_for_children", equals: "Yes" } : { field: "__hidden__", equals: "__never__" }),
            yn("penile_prosthesis", "Penile prosthesis", isMale ? { field: "plan_for_children", equals: "Yes" } : { field: "__hidden__", equals: "__never__" }),
            yn("male_surgery", "Surgery", isMale ? { field: "plan_for_children", equals: "Yes" } : { field: "__hidden__", equals: "__never__" }),

            yn("adverse_event_complication", "Any adverse event/ complication"),
            {
              type: "checkbox-group",
              name: "adverse_event_types",
              label: "Adverse event/ complication types",
              showIf: { field: "adverse_event_complication", equals: "Yes" },
              options: [
                { label: "Headache, dyspepsia, dizziness, rash (due to PDE5i)", value: "pde5i_events" },
                { label: "Priapism, pain, penile bruising or swelling (due to ICI)", value: "ici_events" },
                { label: "Uncomfortable and sensation of the cold penis (due to VED)", value: "ved_events" },
                { label: "Infection, mechanical failures (due to Penile prosthesis)", value: "prosthesis_events" },
                { label: "Autonomic dysreflexia", value: "autonomic_dysreflexia" },
                { label: "Others", value: "others" }
              ]
            },
            { type: "input", name: "adverse_event_others_specify", label: "Others (Specify)", showIf: { field: "adverse_event_types", includes: "others" } },

            {
              type: "assessment-launcher",
              name: "iief5_assessment",
              label: "5-ITEM VERSION OF INTERNATIONAL INDEX OF ERECTILE FUNCTION (IIEF-5)",
              options: [{ label: "IIEF-5 Questionnaire", value: "iief5" }]
            },
            { type: "input", name: "iief5_interpretation", label: "Score & Interpretation", readOnly: true },

            { type: "subheading", label: "Female specific" },
            yn("female_dyspareunia", "Dyspareunia"),
            yn("female_loss_genital_sensation", "Loss of genital sensation"),
            {
              type: "radio",
              name: "female_vaginal_secretion",
              label: "Vaginal secretion",
              options: [
                { label: "Same as previously", value: "same" },
                { label: "Decreased", value: "decreased" },
                { label: "Increased", value: "increased" }
              ]
            },
            yn("female_difficulty_orgasm", "Difficulty with orgasm"),
            yn("female_adverse_event", "Adverse event/ complication"),
            {
              type: "radio",
              name: "female_adverse_event_type",
              label: "Adverse event/ complication details",
              showIf: { field: "female_adverse_event", equals: "Yes" },
              options: [
                { label: "Autonomic dysreflexia", value: "autonomic_dysreflexia" },
                { label: "Others", value: "others" }
              ]
            },
            { type: "input", name: "female_adverse_event_other_specify", label: "Others (Specify)", showIf: { field: "female_adverse_event_type", equals: "others" } },
          /* ========== GOALS ========== */
          {
            type: "subheading",
            label: "Goals"
          },
          {
            name: "sexual_goals",
            type: "textarea",
            placeholder: "Enter goals"
          },
            { type: "subheading", label: "Plan" },
            {
              type: "checkbox-group",
              name: "sexual_plan",
              label: "",
              options: [
                { label: "Sexual education for patient and partner - pre & post intercourse preparation,position", value: "sexual_education" },
                { label: "Aim - erection quality : offer venous constriction band, vacuum erection device, PDE-5 inhibitor", value: "aim_erection_quality" },
                { label: "Aim - ejaculation : Penile vibrator stimulation", value: "aim_ejaculation" },
                { label: "Aim - Conceive : improve semen quality, UTI prevention, semen analysis, blood analysis for testosterone level, IUI, IVF (Fertility center)", value: "aim_conceive" },
                { label: "Lifestyle modification", value: "lifestyle_modification" },
                { label: "Psychological assessment", value: "psychological_assessment" }
              ]
            },
            {
              type: "checkbox-group",
              name: "lifestyle_modification_options",
              label: "Lifestyle modification options",
              showIf: { field: "sexual_plan", includes: "lifestyle_modification" },
              options: [
                { label: "Stop smoking & alcohol consumption", value: "stop_smoking_alcohol" },
                { label: "Diet modification", value: "diet_modification" }
              ]
            }
          ].map(withSexualIssue)
        ]
      }
    ]
  };

  return (
    <CommonFormBuilder
      schema={schema}
      values={values}
      onChange={onChange}
      submitted={submitted}
      assessmentRegistry={SEXUAL_ASSESSMENT_REGISTRY}
    />
  );
}

