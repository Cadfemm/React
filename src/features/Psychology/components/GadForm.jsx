import React, { useEffect, useMemo, useState } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

export default function GAD7FormBuilder({ patient, onSubmit, onBack }) {
    const [values, setValues] = useState({});
    const [submitted, setSubmitted] = useState(false);

    /* ---------------- STORAGE KEY ---------------- */
    const storageKey = patient
        ? `psychology_gad7_draft_${patient.name}`
        : null;

    /* ---------------- SCHEMA ---------------- */
    const GAD7_SCHEMA = {
        title: "Generalized Anxiety Disorder (GAD-7)",
        // actions: [
        //     { type: "back", label: "Back" },
        //     { type: "clear", label: "Clear" },
        //     { type: "print", label: "Print" },
        //     { type: "save", label: "Save" }
        // ],
        sections: [
            {
                fields: [
                    "Feeling nervous, anxious, or on edge.",
                    "Not being able to stop or control worrying.",
                    "Worrying too much about different things.",
                    "Trouble relaxing.",
                    "Being so restless that it is hard to sit still.",
                    "Becoming easily annoyed or irritable.",
                    "Feeling afraid, as if something awful might happen."
                ].map((text, index) => ({
                    name: `q${index + 1}`,
                    label: `${index + 1}. ${text}`,
                    type: "radio-matrix",
                    options: [
                        { label: "Not at all (0)", value: 0 },
                        { label: "Several days (1)", value: 1 },
                        { label: "More than half the days (2)", value: 2 },
                        { label: "Nearly every day (3)", value: 3 }
                    ]
                }))
            }
        ]
    };

    /* ---------------- LOAD DRAFT ---------------- */
    useEffect(() => {
        if (!storageKey) return;

        const saved = localStorage.getItem(storageKey);
        if (saved) {
            const parsed = JSON.parse(saved);
            setValues(parsed.values || {});
            setSubmitted(false);
        }
    }, [storageKey]);

    /* ---------------- CHANGE ---------------- */
    const onChange = (name, value) => {
        setValues(v => ({ ...v, [name]: Number(value) }));
    };

    /* ---------------- SCORE ---------------- */
    const totalScore = useMemo(
        () =>
            Object.values(values).reduce(
                (sum, v) => sum + (v ?? 0),
                0
            ),
        [values]
    );

    const severity = useMemo(() => {
        if (totalScore <= 4) return "Minimal / None";
        if (totalScore <= 9) return "Mild";
        if (totalScore <= 14) return "Moderate";
        return "Severe";
    }, [totalScore]);

    /* ---------------- ACTION HANDLER ---------------- */
    const handleAction = (type) => {
        switch (type) {
            case "back":
                onBack?.();
                break;

            case "clear":
                setValues({});
                setSubmitted(false);
                if (storageKey) localStorage.removeItem(storageKey);
                onSubmit?.({ totalScore: 0, severity: "Minimal / None" });
                break;

            case "print":
                window.print();
                break;

            case "save":
                if (!storageKey) return;

                localStorage.setItem(
                    storageKey,
                    JSON.stringify({
                        values,
                        updatedAt: new Date().toISOString()
                    })
                );
                alert("GAD-7 draft saved successfully");
                break;

            default:
                break;
        }
    };

    /* ---------------- SUBMIT ---------------- */
    const handleSubmit = () => {
        setSubmitted(true);

        const result = { totalScore, severity };

        onSubmit?.(result);

        alert(
            `GAD-7 Submitted\n\nScore: ${totalScore}\nSeverity: ${severity}`
        );
    };

    /* ---------------- UI ---------------- */
    return (
        <div style={mainContent}>
            <CommonFormBuilder
                schema={GAD7_SCHEMA}
                values={values}
                onChange={onChange}
                layout="nested"
                submitted={submitted}
                onAction={handleAction}
            >
                {/* -------- SUMMARY -------- */}
                <div style={summaryWrap}>
                    <div style={scoreRow}>
                        <div style={scorePill}>
                            Total Score: {totalScore}
                        </div>

                        <div style={severityPill}>
                            Anxiety Severity: {severity}
                        </div>
                    </div>

                    <div style={submitRow}>
                        <button style={submitBtn} onClick={handleSubmit}>
                            Submit
                        </button>
                    </div>
                </div>
            </CommonFormBuilder>
        </div>
    );
}

/* ---------------- STYLES ---------------- */

const mainContent = {
    margin: "0 auto",
};

const summaryWrap = {
  width: "90%",
  margin: "24px auto 0",
  padding: 20
};

const scoreRow = {
  display: "flex",
  gap: 16,
  flexWrap: "wrap"
};
const severityPill = {
  flex: 1,
  background: "#FFF7ED",        // light orange
  border: "1px solid #FED7AA",  // orange border
  borderRadius: 10,
  padding: "14px 18px",
  fontSize: 16,
  fontWeight: 700,
   color: "#1f2937",         // dark orange text
  minWidth: 260
};


const scorePill = {
  flex: 1,
  background: "#f1f5ff",
  border: "1px solid #d6e2ff",
  borderRadius: 10,
  padding: "14px 18px",
  fontSize: 16,
  fontWeight: 700,
  color: "#1f2937",
  minWidth: 260
};

const submitRow = {
  display: "flex",
  justifyContent: "flex-end",
  marginTop: 24
};

const submitBtn = {
  padding: "12px 34px",
  background: "#2563EB",
  color: "#fff",
  border: "none",
  borderRadius: 10,
  fontSize: 15,
  fontWeight: 700
};

