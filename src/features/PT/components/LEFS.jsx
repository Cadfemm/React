import React from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

const LEFS_OPTIONS = [
  { label: "0", value: "0" },
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
];

const LEFS_INFO = {
  title: "Scoring",
  content: [
    "0 – Extreme difficulty / Unable to perform activity",
    "1 – Quite a bit of difficulty",
    "2 – Moderate difficulty",
    "3 – A little bit of difficulty",
    "4 – No difficulty",
  ],
};

const row = (name, label) => ({
  type: "radio-matrix",
  name,
  label,
  options: LEFS_OPTIONS,
  info: LEFS_INFO,
  showInfoInRow: false,
});

function totalScore(values) {
  let total = 0, answered = 0;
  for (let i = 1; i <= 20; i++) {
    const v = values[`lefs_${i}`];
    if (v !== undefined && v !== "") { total += Number(v); answered++; }
  }
  return { total, answered };
}

export default function LEFSForm({ values, onChange }) {
  const schema = {
    title: "Lower Extremity Functional Scale (LEFS)",
    matrixHeaderLabel: "Score",
    fields: [
      row("lefs_1",  "1. Any of your usual work, housework or school activities"),
      row("lefs_2",  "2. Usual hobbies, recreational or sporting activities"),
      row("lefs_3",  "3. Getting into or out of the bath"),
      row("lefs_4",  "4. Walking between rooms"),
      row("lefs_5",  "5. Putting on your shoes or socks"),
      row("lefs_6",  "6. Squatting"),
      row("lefs_7",  "7. Lifting an object, like a bag of groceries from the floor"),
      row("lefs_8",  "8. Performing light activities around your home"),
      row("lefs_9",  "9. Performing heavy activities around your home"),
      row("lefs_10", "10. Getting into or out of a car"),
      row("lefs_11", "11. Walking 2 blocks"),
      row("lefs_12", "12. Walking a mile / 1.6 KM"),
      row("lefs_13", "13. Going up or down 10 stairs (about 1 flight of stairs)"),
      row("lefs_14", "14. Standing for 1 hour"),
      row("lefs_15", "15. Sitting for 1 hour"),
      row("lefs_16", "16. Running on even ground"),
      row("lefs_17", "17. Running on uneven ground"),
      row("lefs_18", "18. Making sharp turns while running fast"),
      row("lefs_19", "19. Hopping"),
      row("lefs_20", "20. Rolling over in bed"),
      {
        name: "_lefs_total",
        type: "custom",
        render: ({ values }) => {
          const { total, answered } = totalScore(values);
          return (
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "12px 16px", background: "#0369a1",
              borderRadius: 8, marginTop: 16
            }}>
              <span style={{ fontWeight: 700, fontSize: 15, color: "#fff" }}>Total Score</span>
              <span style={{ fontWeight: 800, fontSize: 18, color: "#fff" }}>
                {answered === 0 ? "— / 80" : `${total} / 80`}
              </span>
            </div>
          );
        }
      },
    ],
  };

  return (
    <CommonFormBuilder
      schema={schema}
      values={values}
      onChange={onChange}
      submitted={false}
      layout="nested"
    />
  );
}
