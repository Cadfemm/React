import React from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

/* ===================== SCHEMA ===================== */
const WISCI_SCHEMA = {
  title: "Walking Index for Spinal Cord Injury II (WISCI II)",
  sections: [
    {
        fields: [
            {
                name: "walking_index_spinal_cord",
                label: "Walking Index for Spinal Cord Injury",
                type: "single-select",
                options: [
                    { label: "0 - Client is unable to stand and/or participate in assisted walking.", value: 0 },
                    { label: "1 - Ambulates in parallel bars, with braces and physical assistance of two persons, less than 10 meters.", value: 1 },
                    { label: "2 - Ambulates in parallel bars, with braces and physical assistance of two persons, 10 meters.", value: 2 },
                    { label: "3 - Ambulates in parallel bars, with braces and physical assistance of one person, 10 meters.", value: 3 },
                    { label: "4 - Ambulates in parallel bars, no braces and physical assistance of one person, 10 meters.", value: 4 },
                    { label: "5 - Ambulates in parallel bars, with no braces and no physical assistance, 10 meters.", value: 5 },
                    { label: "6 - Ambulates with walker, with braces and physical assistance of one person, 10 meters.", value: 6 },
                    { label: "7 - Ambulates with two crutches, with braces and physical assistance of one person, 10 meters.", value: 7 },
                    { label: "8 - Ambulates with walker, no braces and physical assistance of one person, 10 meters.", value: 8 },
                    { label: "9 - Ambulates with walker, with braces and no physical assistance, 10 meters.", value: 9 },
                    { label: "10 - Ambulates with one cane/crutch, with braces and physical assistance of one person, 10 meters.", value: 10 },
                    { label: "11 - Ambulates with two crutches, no braces and physical assistance of one person, 10 meters.", value: 11 },
                    { label: "12 - Ambulates with two crutches, with braces and no physical assistance, 10 meters.", value: 12 },
                    { label: "13 - Ambulates with walker, no braces and no physical assistance, 10 meters.", value: 13 },
                    { label: "14 - Ambulates with one cane/crutch, no braces and physical assistance of one person, 10 meters.", value: 14 },
                    { label: "15 - Ambulates with one cane/crutch, with braces and no physical assistance, 10 meters.", value: 15 },
                    { label: "16 - Ambulates with two crutches, no braces and no physical assistance, 10 meters.", value: 16 },
                    { label: "17 - Ambulates with on devices, no braces and physical assistance of one person, 10 meters.", value: 17 },
                    { label: "18 - Ambulates with on devices, with braces and no physical assistance, 10 meters.", value: 18 },
                    { label: "19 - Ambulates with one cane/crutch, no braces and no physical assistance, 10 meters.", value: 19 },
                    { label: "20 - Ambulates with no devices, no braces and no physical assistance, 10 meters.", value: 20 }
                ]
            }
        ]
    }
  ]
};


/* ===================== COMPONENT ===================== */
export default function WISCIForm({ values, onChange }) {

  /* ===== AUTO TOTAL ===== */
  React.useEffect(() => {
    const total = Array.from({ length: 14 }, (_, i) =>
      Number(values[`wisci_${i + 1}`] || 0)
    ).reduce((a, b) => a + b, 0);

    if (values.wisci_total !== total) {
      onChange("wisci_total", total);
    }
  }, [values, onChange]);

  return (
    <CommonFormBuilder
      schema={WISCI_SCHEMA}
      values={values}
      layout="nested"
      onChange={onChange}
    />
  );
}
