import { useState, useCallback, useMemo, memo } from "react";
import CommonFormBuilder from "../CommonComponenets/FormBuilder";
import ScorePill from "../../shared/ui/ScorePill";

// Pure calculations — outside component
function sumScale(values, prefix) {
  return Object.entries(values || {}).reduce((acc, [key, val]) => {
    if (!key.startsWith(`${prefix}_`) || !/\d+$/.test(key)) return acc;
    const n = Number(val);
    return acc + (Number.isFinite(n) ? n : 0);
  }, 0);
}

function calculateBVD(values) {
  const total = sumScale(values, "bvdq");
  return { total, result: total >= 15 ? "Suggestive of BVD" : "Within normal range" };
}

function calculateSSI(values) {
  const total = sumScale(values, "ssi");
  return { total, result: total >= 15 ? "Suggestive of BVD" : "Within normal range" };
}

const BVDAssessment = memo(function BVDAssessment({ schema, onBack, layout = "root" }) {
  const [values, setValues] = useState({});

  const handleChange = useCallback((name, payload) => {
    setValues(prev => {
      const next = { ...prev };
      if (payload && typeof payload === "object" && "row" in payload) {
        const arr = Array.isArray(prev[name]) ? [...prev[name]] : [];
        arr[payload.row] = payload.value;
        next[name] = arr;
      } else {
        next[name] = payload;
      }
      const bvd = calculateBVD(next);
      const ssi = calculateSSI(next);
      next.bvdq_total  = bvd.total;
      next.bvdq_result = bvd.result;
      next.ssi_total   = ssi.total;
      next.ssi_result  = ssi.result;
      return next;
    });
  }, []);

  const summary = useMemo(() => ({
    bvdTotal:  values.bvdq_total  || 0,
    bvdResult: values.bvdq_result || "-",
    ssiTotal:  values.ssi_total   || 0,
    ssiResult: values.ssi_result  || "-",
  }), [values.bvdq_total, values.bvdq_result, values.ssi_total, values.ssi_result]);

  return (
    <>
      <CommonFormBuilder
        schema={schema}
        values={values}
        onChange={handleChange}
        layout={layout}
      />
      <div className="opto-score-row">
        <ScorePill label="BVDQ Total"  value={summary.bvdTotal}  color="blue"   />
        <ScorePill label="BVDQ Result" value={summary.bvdResult} color={summary.bvdTotal >= 15 ? "red" : "green"} />
        <ScorePill label="SSI Total"   value={summary.ssiTotal}  color="purple" />
        <ScorePill label="SSI Result"  value={summary.ssiResult} color={summary.ssiTotal >= 15 ? "red" : "green"} />
      </div>
    </>
  );
});

export default BVDAssessment;
