import React from "react";
import CommonFormBuilder from "../CommonComponenets/FormBuilder";


export default function BVDAssessment({ schema, layout = "root"}) {
    /* ---------------- CALCULATIONS ---------------- */
  function sumScale(values, prefix) {
    return Object.entries(values || {}).reduce((acc, [key, val]) => {
      // Only count radio answers like "ssi_0", not derived fields like "ssi_total"
      const isAnswerKey = key.startsWith(`${prefix}_`) && /\d+$/.test(key);
      if (!isAnswerKey) return acc;
      const numeric = Number(val);
      return acc + (Number.isFinite(numeric) ? numeric : 0);
    }, 0);
  }

  function calculateBVD(values) {
    const total = sumScale(values, "bvdq");
    const result = total >= 15 ? "Suggestive of BVD" : "Within normal range";
    return { total, result };
  }

  function calculateSSI(values) {
    const total = sumScale(values, "ssi");
    const result = total >= 15 ? "Suggestive of BVD" : "Within normal range";
    return { total, result };
  }
    
  const [values, setValues] = React.useState({});

  const handleChange = (name, payload) => {
    const next = { ...values };

    // scale-table sends: { row, value }
    if (payload && typeof payload === "object" && "row" in payload) {
      const prev = Array.isArray(values[name]) ? values[name] : [];
      const updated = [...prev];
      updated[payload.row] = payload.value;
      next[name] = updated;
    } else {
      // normal fields
      next[name] = payload;
    }

    const bvd = calculateBVD(next);
    const ssi = calculateSSI(next);

    next.bvdq_total = bvd.total;
    next.bvdq_result = bvd.result;
    next.ssi_total = ssi.total;
    next.ssi_result = ssi.result;

    setValues(next);
  };
  return (
    <>
      <CommonFormBuilder
        schema={schema}
        values={values}
        onChange={handleChange}
          layout={layout}
      />

      <div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(260px, 1fr))",
    gap: 16,
    margin: "24px 0"
  }}
>
  <div style={pill}>BVDQ Total: {values.bvdq_total || 0}</div>
  <div style={pill}>BVDQ Result: {values.bvdq_result || "-"}</div>
  <div style={pill}>SSI Total: {values.ssi_total || 0}</div>
  <div style={pill}>SSI Result: {values.ssi_result || "-"}</div>
</div>

    </>
  );
}

const pill = {
  padding: "14px 18px",
  borderRadius: 12,
  border: "1px solid #CBD5E1",
  fontWeight: 700,
  background: "#F8FAFC",
  display: "flex",
  alignItems: "center",
  minHeight: 52
};

