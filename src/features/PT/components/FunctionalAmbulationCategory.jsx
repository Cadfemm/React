import CommonFormBuilder from "../../CommonComponenets/FormBuilder";
const FAC_OPTIONS = [
  { label: "0 – Nonfunctional ambulation", value: 0 },
  { label: "1 – Ambulator Dependent for Physical Assistance Level II)", value: 1 },
  { label: "2 – Ambulator Dependent for Physical Assistance Level I)", value: 2 },
  { label: "3 – Ambulator Dependent for Supervision", value: 3 },
  { label: "4 – Ambulator Independent Level Surfaces only ", value: 4 },
  { label: "5 – Ambulator Independent", value: 5 }
];

const FAC_DEFINITIONS = {
  0: "Subject cannot ambulate, ambulates in parallel bars only, or requires supervision or physical assistance from more than one person to ambulate safely outside of parallel bars.",
  1: "Subject requires manual contacts of no more than one person during ambulation on level surfaces to prevent falling. Manual contacts are continuous and necessary to support body weight as well as maintain balance and/or assist coordination.",
  2: "Subject requires manual contact of no more than one person during ambulation on level surfaces to prevent falling. Manual contact consists of continuous or intermittent light touch to assist balance or coordination.",
  3: "Subject can physically ambulate on level surfaces without manual contact of another person but for safety requires standby guarding on no more than one person because of poor judgment, questionable cardiac status, or the need for verbal cuing to complete the task. ",
  4: "Subject can ambulate independently on level surfaces but requires supervision or physical assistance to negotiate any of the following: stairs, inclines, or non-level surfaces.",
  5: "Subject can ambulate independently on nonlevel and level surfaces, stairs, and inclines."
};
const FAC_SCHEMA = {
  title: "Functional Ambulation Category (FAC)",
  sections: [
    {
      fields: [
        {
          type: "radio",
          name: "fac_level",
          label: "FAC Ambulation Level",
          labelAbove: true,
          options: FAC_OPTIONS,
       
        },

        // ===== Conditional Definitions =====
        ...Object.entries(FAC_DEFINITIONS).map(([value, text]) => ({
          type: "info-text",
          showIf: { field: "fac_level", equals: Number(value) },
          text
        }))
      ]
    }
  ]
};
export default function FACForm({ values, onChange }) {
  return (
    <CommonFormBuilder
      schema={FAC_SCHEMA}
      values={values}
      onChange={onChange}
      layout="nested"
    />
  );
}