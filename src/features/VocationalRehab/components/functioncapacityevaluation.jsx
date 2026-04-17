import React from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

export default function FunctionalCapacityEvaluation({
  values = {},
  onChange,
}) {
  const mode = values.fce_mode || "";

  const demands = [
    "Lifting",
    "Bilateral Carrying",
    "Unilateral Carrying",
    "Pushing and Pulling",
    "Sitting",
    "Standing",
    "Kneeling",
    "Squatting",
    "Axial Rotation",
    "Horizontal Reach",
    "Upper Level Reach",
    "Stooping Reach",
    "Walking",
    "Stair Climbing",
    "Ladder Work",
    "Crawling",
    "Hand Function",
  ];

  const ratingCols = ["OCC", "FRQ", "CON", "NF"];
  const yesNoModCols = ["YES", "NO", "MOD"];

  // Helper to create radio options
  const radioOptions = [{ label: "", value: 1 }];

  const makeJobSpecificRows = () =>
    demands.flatMap((item, i) => [
      // First row for each physical demand
      {
        type: "grid-row",
        label: item,
        name: `job_${i}_row1`,
        // Optional: adjust overall grid template to give more space to first column
        template: `100px repeat(${1 + ratingCols.length * 2 + yesNoModCols.length}, 1fr)`,
        cols: [
          // ✅ Job Task Input - WIDER
          { 
            name: `jobtask_${i}_1`, 
            type: "input", 
            placeholder: "Enter job task",
            width: "120px"  // ← Add this to make it wider
          },
          
          // First set of Ratings (Job Demands)
          ...ratingCols.map((c) => ({
            name: `jobreq_${i}_${c}`,
            type: "radio",
            options: radioOptions,
          })),

          // Second set of Ratings (Demonstrated Physical Abilities)
          ...ratingCols.map((c) => ({
            name: `demo_${i}_${c}`,
            type: "radio",
            options: radioOptions,
          })),

          // Match Columns (Job Match)
          ...yesNoModCols.map((c) => ({
            name: `match_${i}_${c}`,
            type: "radio",
            options: radioOptions,
          })),
        ],
      },
      // Second row with additional free text
      {
        type: "input",
        name: `comment_${i}`,
        label: "",
        placeholder: "Enter comments and observations",
      },
    ]);

    const generalTasks = [
    "Lifting load to multiple levels",
    "Carrying load using both hands",
    "Carrying load using one hand",
    "Pushing and pulling at waist level",
    "Prolonged sitting",
    "Prolonged standing",
    "Sustained and repetitive kneeling",
    "Sustained and repetitive squatting",
    "Reaching forward/sideway while standing/sitting",
    "Reaching forward while standing/sitting",
    "Reaching upward while standing/sitting",
    "Reaching downward while standing/sitting",
    "Prolonged walking",
    "Repetitive stair climbing",
    "Repetitive ladder climbing",
    "Crawling",
    "Hand Function",
  ];
const makeGeneralRows = () =>
  demands.flatMap((item, i) => [
    {
      type: "custom",
      name: `general_row_${i}`,
      render: ({ values, onChange }) => (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "85px 195px repeat(4,1fr)",
            alignItems: "center",
            minHeight: "42px",
            borderBottom: "1px solid #ddd",
          }}
        >
          {/* Physical Demand */}
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              paddingRight: 6,
              lineHeight: 1.2,
            }}
          >
            {item}
          </div>

          {/* Static Job Task */}
          <div
            style={{
              fontSize: 12,
              paddingRight: 6,
              lineHeight: 1.2,
            }}
          >
            {generalTasks[i]}
          </div>

          {/* Ratings */}
          {ratingCols.map((c) => (
            <div
              key={c}
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <input
                type="radio"
                name={`ability_${i}`}
                checked={values[`ability_${i}`] === c}
                onChange={() => onChange(`ability_${i}`, c)}
              />
            </div>
          ))}
        </div>
      ),
    },

    {
      type: "input",
      name: `general_comment_${i}`,
      label: "",
      placeholder: "Enter comments and observations",
    },
  ]);

  const schema = {
    title: "Functional Capacity Evaluation",

    sections: [
      {
        fields: [
          {
            type: "custom",
            name: "fce_mode_selector",
            render: ({ values, onChange }) => {
              // Helper to check active state
              const isActive = (mode) => values.fce_mode === mode;
              
              // Inline CSS builder
              const getStyle = (mode) => ({
                flex: 1,
                padding: "10px 16px",
                borderRadius: 999,
                border: "1.5px solid #111827",
                background: isActive(mode) ? "#2563eb" : "#fff",
                color: isActive(mode) ? "#fff" : "#111827",
                fontWeight: 600,
                fontSize: 14,
                cursor: "pointer",
                textAlign: "center",
                transition: "all 0.2s ease",
                boxShadow: isActive(mode) ? "0 2px 4px rgba(37, 99, 235, 0.2)" : "0 1px 2px rgba(0,0,0,0.06)"
              });

              return (
                <div style={{ display: "flex", gap: 16, width: "70%" }}>
                  <button
                    type="button"
                    style={getStyle("job")}
                    onClick={() => onChange("fce_mode", "job")}
                  >
                    JOB SPECIFIC FCE
                  </button>
                  <button
                    type="button"
                    style={getStyle("general")}
                    onClick={() => onChange("fce_mode", "general")}
                  >
                    GENERAL FCE
                  </button>
                </div>
              );
            }
          },

          // {
          //   type: "info-text",
          //   text:
          //     "For Job Specific FCE and General FCE forms, they are editable as therapist needs to key-in input on different days.",
          // },

          ...(mode === "job"
            ? [
                {
                  type: "subheading",
                  label: "Job Specific FCE",
                },

                {
                  type: "textarea",
                  name: "job_work_history",
                  label: "Work History",
                  rows: 3,
                },

                {
                type: "custom",
                name: "job_header_group",
                render: () => (
                  <div style={{ marginBottom: 0 }}>
                    
                    {/* TOP GROUP HEADER */}
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "85px 135px repeat(11, 1fr)",
                        textAlign: "center",
                        fontWeight: 700,
                        fontSize: 13,
                      }}
                    >
                      <div></div>
                      <div></div>

                      <div
                        style={{
                          gridColumn: "3 / span 4",
                          background: "#f4b400",
                          padding: "6px",
                          border: "1px solid #999",
                        }}
                      >
                        Job Demands
                      </div>

                      <div
                        style={{
                          gridColumn: "7 / span 4",
                          background: "#f4b400",
                          padding: "6px",
                          border: "1px solid #999",
                        }}
                      >
                        Demonstrated Physical Abilities
                      </div>

                      <div
                        style={{
                          gridColumn: "11 / span 3",
                          background: "#f4b400",
                          padding: "6px",
                          border: "1px solid #999",
                        }}
                      >
                        Job Match
                      </div>
                    </div>

                    {/* SECOND HEADER ROW */}
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "85px 135px repeat(11, 1fr)",
                        textAlign: "center",
                        fontWeight: 700,
                        background: "#d1d1d1",
                      }}
                    >
                      <div style={{ padding: 2, border: "1px solid #999", fontSize: 12 }}>
                        Physical Demand
                      </div>

                      <div style={{ padding: 2, border: "1px solid #999", fontSize: 12 }}>
                        Job Task
                      </div>

                      {[...ratingCols, ...ratingCols, ...yesNoModCols].map((item, i) => (
                        <div
                          key={i}
                          style={{ padding: 2, border: "1px solid #999", fontSize: 12 }}
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                ),
              },

                ...makeJobSpecificRows(),

                {
                  type: "textarea",
                  name: "job_conclusion",
                  label: "Conclusion",
                  rows: 4,
                },
              ]
            : []),

/* =========================================================
             GENERAL FCE
          ========================================================= */

...(mode === "general"
  ? [
      {
        type: "subheading",
        label: "General FCE",
      },

      {
        type: "textarea",
        name: "general_work_history",
        label: "Work History",
        rows: 3,
      },

      /* HEADER */
{
  type: "custom",
  name: "general_header",
  render: () => (
    <div style={{ marginBottom: 0 }}>

      {/* TOP GROUP HEADER */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "85px 195px repeat(4,1fr)",
          textAlign: "center",
          fontWeight: 700,
          fontSize: 13,
        }}
      >
        <div></div>
        <div></div>

        <div
          style={{
            gridColumn: "3 / span 4",
            background: "#000",
            color: "#fff",
            padding: "6px",
            border: "1px solid #999",
          }}
        >
          Demonstrated Physical Abilities
        </div>
      </div>

      {/* SECOND HEADER ROW */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "85px 195px repeat(4,1fr)",
          textAlign: "center",
          fontWeight: 700,
          background: "#4f8cc9",
        }}
      >
        <div
          style={{
            padding: "2px",
            border: "1px solid #999",
            fontSize: 12,
          }}
        >
          Physical Demand
        </div>

        <div
          style={{
            padding: "2px",
            border: "1px solid #999",
            fontSize: 12,
          }}
        >
          Job Task
        </div>

        {ratingCols.map((c) => (
          <div
            key={c}
            style={{
              padding: "2px",
              border: "1px solid #999",
              fontSize: 12,
            }}
          >
            {c}
          </div>
        ))}
      </div>
    </div>
  ),
},
      ...makeGeneralRows(),

      {
        type: "textarea",
        name: "general_conclusion",
        label: "Conclusion",
        rows: 4,
      },
    ]
  : []),
        ],
      },
    ],
  };

  return (
    <CommonFormBuilder
      schema={schema}
      values={values}
      onChange={onChange}
      layout="nested"
    />
  );
}