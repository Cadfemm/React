import React from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

export default function LOTCAForm({ values, onChange }) {

  const slider = (name, label, min, max) => {
    const rangeSize = Math.max(0, max - min);
    const lowMax = Math.floor(min + rangeSize / 3);
    const midMax = Math.floor(min + (2 * rangeSize) / 3);

    const ranges = [
      { min: min, max: Math.max(lowMax, min), color: "#dc2626", label: "Low" },
      { min: Math.max(lowMax + 1, min), max: Math.max(midMax, lowMax + 1), color: "#f59e0b", label: "Moderate" },
      { min: Math.max(midMax + 1, min), max: max, color: "#16a34a", label: "High" }
    ];

    return {
      type: "scale-slider",
      name,
      label,
      min,
      max,
      step: 1,
      showValue: true,
      ranges
    };
  };

  const schema = {
    title: "Loewenstein OT Cognitive Assessment (LOTCA)",

    sections: [

      // ================= ORIENTATION =================
      {
        title: "ORIENTATION",
        fields: [
          slider("orientation_place", "1. Orientation for Place (OP)", 1, 8),
          slider("orientation_time", "2. Orientation for Time (OT)", 1, 8)
        ]
      },

      // ================= VISUAL PERCEPTION =================
      {
        title: "VISUAL PERCEPTION",
        fields: [
          slider("object_identification", "3. Object Identification (OI)", 1, 4),
          slider("shape_identification", "4. Shape Identification (SI)", 1, 4),
          slider("overlapping_figures", "5. Overlapping Figures (OF)", 1, 4),
          slider("object_constancy", "6. Object Constancy (OC)", 1, 4)
        ]
      },

      // ================= SPATIAL PERCEPTION =================
      {
        title: "SPATIAL PERCEPTION",
        fields: [
          slider("directions_body", "7. Directions on Own Body (SP1)", 1, 4),
          slider("spatial_relations", "8. Spatial Relations (SP2)", 1, 4),
          slider("spatial_picture", "9. Spatial Relations on Picture (SP3)", 1, 4)
        ]
      },

      // ================= MOTOR PRAXIS =================
      {
        title: "MOTOR PRAXIS",
        fields: [
          slider("motor_imitation", "10. Motor Imitation (P1)", 1, 4),
          slider("utilization_objects", "11. Utilization of Objects (P2)", 1, 4),
          slider("symbolic_actions", "12. Symbolic Actions (P3)", 1, 4)
        ]
      },

      // ================= VISUOMOTOR ORGANIZATION =================
      {
        title: "VISUOMOTOR ORGANIZATION",
        fields: [
          slider("copy_geometric", "13. Copying Geometric Forms (GF)", 1, 4),
          slider("two_dim_model", "14. Two-Dimensional Model (TM)", 1, 4),
          slider("pegboard", "15. Pegboard Construction (PC)", 1, 4),
          slider("colored_block", "16. Colored Block Design (CB)", 1, 4),
          slider("plain_block", "17. Plain Block Design (PB)", 1, 4),
          slider("puzzle_reproduction", "18. Reproduction of a Puzzle (RP)", 1, 4),
          slider("drawing_clock", "19. Drawing a Clock (DC)", 1, 4),

          {
            type: "input",
            name: "visuomotor_time",
            label: "Time (seconds)"
          }
        ]
      },

      // ================= THINKING OPERATIONS =================
      {
        title: "THINKING OPERATIONS",
        fields: [
          slider("categorization", "20. Categorization (CA)", 1, 5),
          slider("roc_unstructured", "21. ROC Unstructured (RU)", 1, 5),
          slider("roc_structured", "22. ROC Structured (RS)", 1, 5),
          slider("pictorial_sequence_a", "23. Pictorial Sequence A (PS1)", 1, 4),
          slider("pictorial_sequence_b", "24. Pictorial Sequence B (PS2)", 1, 4),
          slider("geometric_sequence", "25. Geometric Sequence (GS)", 1, 4),
          slider("logic_questions", "26. Logic Questions (LQ)", 1, 4)
        ]
      },

      // ================= ATTENTION =================
      {
        title: "ATTENTION AND CONCENTRATION",
        fields: [
          slider("attention_concentration", "27. Attention and Concentration", 1, 4),

          {
            type: "radio",
            name: "assessment_sessions",
            label: "Assessment was performed in:",
            options: [
              { label: "One session", value: "one" },
              { label: "Two sessions or more", value: "two_or_more" }
            ]
          }
        ]
      }

    ]
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