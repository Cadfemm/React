import React, { useState } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";
import stoolType1 from "../../../assets/stool_type1.png";
import stoolType2 from "../../../assets/stool_type2.png";
import stoolType3 from "../../../assets/stool_type3.png";
import stoolType4 from "../../../assets/stool_type4.png";
import stoolType5 from "../../../assets/stool_type5.png";
import stoolType6 from "../../../assets/stool_type6.png";
import stoolType7 from "../../../assets/stool_type7.png";

export default function BowelAssessmentForm({ onChange: onParentChange }) {
  const [values, setValues] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const onChange = (name, value) => {
    setValues(prev => {
      const next = { ...prev, [name]: value };
      onParentChange?.(next);
      return next;
    });
  };

  const BOWEL_SCHEMA = {
    title: "Bowel Assessment",
    sections: [
      {
        title: "",
        fields: [
          { type: "heading", label: "History Taking / Assessment" },

          { type: "subheading", label: "Premorbid bowel habit" },
          {
            type: "radio",
            name: "premorbid_frequency",
            label: "Frequency of defecation",
            labelAbove: true,
            options: [
              { label: "Once per day", value: "once_per_day" },
              { label: "Twice per day", value: "twice_per_day" },
              { label: "Once every 2 days", value: "once_every_2_days" },
              { label: "Once every few days", value: "once_every_few_days" },
              { label: "Others", value: "others" }
            ]
          },
          {
            type: "input",
            name: "premorbid_frequency_other",
            label: "Frequency of defecation (Specify)",
            showIf: { field: "premorbid_frequency", equals: "others" }
          },
          yn("premorbid_medication_use", "Medication use"),
          {
            type: "input",
            name: "premorbid_medication_use_specify",
            label: "Medication use (Specify)",
            showIf: { field: "premorbid_medication_use", equals: "Yes" }
          },

          { type: "subheading", label: "Current bowel status" },
          {
            type: "radio",
            name: "current_frequency",
            label: "Frequency of defecation",
            labelAbove: true,
            options: [
              { label: "Once per day", value: "once_per_day" },
              { label: "Twice per day", value: "twice_per_day" },
              { label: "Once every 2 days", value: "once_every_2_days" },
              { label: "Once every few days", value: "once_every_few_days" },
              { label: "Others", value: "others" }
            ]
          },
          {
            type: "input",
            name: "current_frequency_other",
            label: "Frequency of defecation (Specify)",
            showIf: { field: "current_frequency", equals: "others" }
          },
          ynUnsure("sensate", "Able to sensate"),
          ynUnsure("control", "Able to control/ hold"),
          {
            type: "assessment-launcher",
            name: "stool_consistency_assessment",
            label: "Stool consistency",
            options: [{ label: "Bristol Chart", value: "bristol_chart" }]
          },
          {
            type: "row",
            fields: [
              {
                type: "input",
                name: "bristol_chart_type_label",
                label: "Selected Stool Type",
                readOnly: true,
                showIf: { field: "bristol_chart_type", exists: true }
              },
              {
                type: "input",
                name: "bristol_chart_interpretation",
                label: "Selected Interpretation",
                readOnly: true,
                showIf: { field: "bristol_chart_type", exists: true }
              }
            ]
          },
          {
            type: "radio",
            name: "stool_volume",
            label: "Stool volume",
            options: [
              { label: "Minimal", value: "minimal" },
              { label: "Moderate", value: "moderate" },
              { label: "Large amount", value: "large_amount" }
            ]
          },
          yn("medication_for_defecation", "Medication use for defecation"),
          {
            type: "input",
            name: "medication_for_defecation_specify",
            label: "Medication use for defecation (Specify)",
            showIf: { field: "medication_for_defecation", equals: "Yes" }
          },
          yn("manual_evacuation", "Manual evacuation"),
          yn("digital_rectal_stimulation", "Digital Rectal Stimulation"),
          {
            type: "radio",
            name: "other_modes_of_defecation",
            label: "Other modes of defecation",
            options: [
              { label: "Colostomy", value: "colostomy" },
              { label: "Transanal irrigation", value: "transanal_irrigation" },
              { label: "Malone antegrade continence enema (MACE)", value: "mace" }
            ]
          },
          yn("complication", "Complication"),
          {
            type: "checkbox-group",
            name: "complication_types",
            label: "Complication types",
            showIf: { field: "complication", equals: "Yes" },
            options: [
              { label: "Bowel accident", value: "bowel_accident" },
              { label: "Constipation", value: "constipation" },
              { label: "Anorexia", value: "anorexia" },
              { label: "Nausea & vomiting", value: "nausea_vomiting" },
              { label: "Abdominal distension", value: "abdominal_distension" },
              { label: "Autonomic dysreflexia", value: "autonomic_dysreflexia" },
              { label: "Skin breakdown", value: "skin_breakdown" },
              { label: "Haemorrhoids", value: "haemorrhoids" },
              { label: "Fistula", value: "fistula" },
              { label: "Anal abscess", value: "anal_abscess" },
              { label: "Others", value: "others" }
            ]
          },
          {
            type: "input",
            name: "complication_specify",
            label: "Specify",
            showIf: {
              field: "complication",
              equals: "Yes",
              and: {
                or: [
                  { field: "complication_types", includes: "bowel_accident" },
                  { field: "complication_types", includes: "constipation" },
                  { field: "complication_types", includes: "anorexia" },
                  { field: "complication_types", includes: "nausea_vomiting" },
                  { field: "complication_types", includes: "abdominal_distension" },
                  { field: "complication_types", includes: "autonomic_dysreflexia" },
                  { field: "complication_types", includes: "skin_breakdown" },
                  { field: "complication_types", includes: "haemorrhoids" },
                  { field: "complication_types", includes: "fistula" },
                  { field: "complication_types", includes: "anal_abscess" },
                  { field: "complication_types", includes: "others" }
                ]
              }
            }
          },
          yn("equipment_usage", "Equipment usage: commode chair/wheelchair"),

          { type: "subheading", label: "Per rectal (PR) examination" },
          absentPresent("vac", "VAC"),
          absentPresent("dap", "DAP"),
          absentPresent("bcr", "BCR"),
          {
            type: "radio",
            name: "anal_tone",
            label: "Anal tone",
            options: [
              { label: "Lax", value: "lax" },
              { label: "Intact", value: "intact" }
            ]
          },
          {
            type: "textarea",
            name: "pr_others",
            label: "Others"
          },

          { type: "heading", label: "Qualifier Scale" },
          {
            type: "radio",
            name: "qualifier_scale",
            label: "Qualifier Scale",
            labelAbove: true,
            options: [
              { label: "0", value: "0" },
              { label: "1", value: "1" },
              { label: "2", value: "2" },
              { label: "3", value: "3" },
              { label: "4", value: "4" }
            ]
          },
          {
            type: "info-text",
            heading: "Interpretation",
            text: "0 - No problem: Independent bowel control",
            showIf: { field: "qualifier_scale", equals: "0" }
          },
          {
            type: "info-text",
            heading: "Interpretation",
            text: "1 - Mild problem: Occasional constipation / accident",
            showIf: { field: "qualifier_scale", equals: "1" }
          },
          {
            type: "info-text",
            heading: "Interpretation",
            text: "2 - Moderate problem: Needs cues / occasional suppository",
            showIf: { field: "qualifier_scale", equals: "2" }
          },
          {
            type: "info-text",
            heading: "Interpretation",
            text: "3 - Severe problem: Requires manual evacuation / regular suppository",
            showIf: { field: "qualifier_scale", equals: "3" }
          },
          {
            type: "info-text",
            heading: "Interpretation",
            text: "4 - Complete problem: No voluntary control / total dependent",
            showIf: { field: "qualifier_scale", equals: "4" }
          },
          {
            type: "subheading",
            label: "Goals"
          },
          {
            name: "bowel_goals",
            type: "textarea",
            placeholder: "Enter goals"
          },
          { type: "heading", label: "Plan" },
          {
            type: "checkbox-group",
            name: "plan_options",
            label: "",
            options: [
              { label: "Imaging: abdominal x ray", value: "imaging_abdominal_xray" },
              { label: "Diet and fluid management", value: "diet_fluid_management" },
              { label: "Prescription of Oral or rectal medication or both", value: "prescription_oral_rectal" },
              { label: "Monitor bristol chart and Input-Output chart", value: "monitor_bristol_io" },
              { label: "Education on bowel care/ carer training", value: "education_bowel_care" },
              { label: "For independent bowel evacuation in toilet", value: "independent_bowel_evacuation" }
            ]
          },
          {
            type: "checkbox-group",
            name: "education_bowel_care_options",
            label: "Education on bowel care/ carer training options",
            showIf: { field: "plan_options", includes: "education_bowel_care" },
            options: [
              { label: "Abdominal massage", value: "abdominal_massage" },
              { label: "Digital Rectal Stimulation", value: "digital_rectal_stimulation" },
              { label: "Manual evacuation", value: "manual_evacuation" },
              { label: "Suppository medication or Enema insertion technique", value: "suppository_or_enema" },
              { label: "Others", value: "others" }
            ]
          },
          {
            type: "input",
            name: "plan_specify",
            label: "Specify",
            showIf: {
              or: [
                { field: "plan_options", includes: "imaging_abdominal_xray" },
                { field: "plan_options", includes: "diet_fluid_management" },
                { field: "plan_options", includes: "prescription_oral_rectal" },
                { field: "plan_options", includes: "monitor_bristol_io" },
                { field: "plan_options", includes: "education_bowel_care" },
                { field: "plan_options", includes: "independent_bowel_evacuation" }
              ]
            }
          },
        ]
      }
    ]
  };

  return (
    <CommonFormBuilder
      schema={BOWEL_SCHEMA}
      values={values}
      onChange={onChange}
      submitted={submitted}
      assessmentRegistry={BOWEL_ASSESSMENT_REGISTRY}
    />
  );
}

const yn = (name, label) => ({
  type: "radio",
  name,
  label,
  options: [
    { label: "Yes", value: "Yes" },
    { label: "No", value: "No" }
  ]
});

const ynUnsure = (name, label) => ({
  type: "radio",
  name,
  label,
  options: [
    { label: "Yes", value: "Yes" },
    { label: "No", value: "No" },
    { label: "Unsure", value: "Unsure" }
  ]
});

const absentPresent = (name, label) => ({
  type: "radio",
  name,
  label,
  options: [
    { label: "Absent", value: "Absent" },
    { label: "Present", value: "Present" }
  ]
});

function BristolChartAssessment({ values = {}, onChange }) {
  const rows = [
    {
      key: "1",
      typeLabel: "Type 1",
      stoolText: "Separate hard lumps",
      interpretation: "Severe constipation",
      image: stoolType1
    },
    {
      key: "2",
      typeLabel: "Type 2",
      stoolText: "Lumpy and sausage like",
      interpretation: "Mild constipation",
      image: stoolType2
    },
    {
      key: "3",
      typeLabel: "Type 3",
      stoolText: "A sausage shape with cracks in the surface",
      interpretation: "Normal",
      image: stoolType3
    },
    {
      key: "4",
      typeLabel: "Type 4",
      stoolText: "Like a smooth, soft sausage or snake",
      interpretation: "Normal",
      image: stoolType4
    },
    {
      key: "5",
      typeLabel: "Type 5",
      stoolText: "Soft blobs with clear-cut edges",
      interpretation: "Lacking fibre",
      image: stoolType5
    },
    {
      key: "6",
      typeLabel: "Type 6",
      stoolText: "Mushy consistency with ragged edges",
      interpretation: "Mild diarrhea",
      image: stoolType6
    },
    {
      key: "7",
      typeLabel: "Type 7",
      stoolText: "Liquid consistency with no solid pieces",
      interpretation: "Severe diarrhea",
      image: stoolType7
    }
  ];

  const selectedType = values?.bristol_chart_type || "";

  const selectType = (row) => {
    onChange?.("bristol_chart_type", row.key);
    onChange?.("bristol_chart_type_label", row.typeLabel);
    onChange?.("bristol_chart_interpretation", row.interpretation);
  };

  return (
    <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 10, padding: 12 }}>
      <div style={{ display: "grid", gridTemplateColumns: "180px 1fr 220px", gap: 8, fontWeight: 700, marginBottom: 8 }}>
        <div>Type</div>
        <div>Stool Description</div>
        <div>Function Interpretation</div>
      </div>
      {rows.map((row) => (
        <button
          key={row.key}
          type="button"
          onClick={() => selectType(row)}
          style={{
            width: "100%",
            textAlign: "left",
            display: "grid",
            gridTemplateColumns: "180px 1fr 220px",
            gap: 8,
            padding: "10px 12px",
            marginBottom: 6,
            borderRadius: 8,
            border: selectedType === row.key ? "2px solid #2563eb" : "1px solid #d1d5db",
            background: selectedType === row.key ? "#eff6ff" : "#fff",
            color: "#0f172a",
            cursor: "pointer"
          }}
        >
          <div style={{ fontWeight: 700, display: "flex", alignItems: "center", gap: 10 }}>
            <img
              src={row.image}
              alt={row.typeLabel}
              style={{ width: 48, height: 28, objectFit: "contain", borderRadius: 4 }}
            />
            <span>{row.typeLabel}</span>
          </div>
          <div>{row.stoolText}</div>
          <div style={{ fontWeight: 600 }}>{row.interpretation}</div>
        </button>
      ))}
      {selectedType ? (
        <div style={{ marginTop: 10, padding: 10, borderRadius: 8, background: "#f8fafc", border: "1px solid #e2e8f0" }}>
          <strong>Selected:</strong> {values?.bristol_chart_type_label} ({values?.bristol_chart_interpretation})
        </div>
      ) : null}
    </div>
  );
}

const BOWEL_ASSESSMENT_REGISTRY = {
  bristol_chart: BristolChartAssessment
};
