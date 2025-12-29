import React, { useMemo, useState,useEffect } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

export default function HAMDFormBuilder({ patient, onSubmit, onBack }) {
    const [values, setValues] = useState({});
    const [submitted, setSubmitted] = useState(false);

    /* ---------------- HAM-D 17 SCHEMA ---------------- */

    const HAMD_SCHEMA = {
        title: "Hamilton Depression Rating Scale - (HAM-D)",
        actions: [
            { type: "back", label: "Back" },
            { type: "clear", label: "Clear" },
            // { type: "print", label: "Print" },
            { type: "save", label: "Save" }
        ],
        fields: [
            {
                name: "q1",
                label: "1. Depressed Mood",
                type: "single-select",
                options: [
                    { label: "Absent", value: 0 },
                    { label: "Indicated only on questioning", value: 1 },
                    { label: "Spontaneously reported verbally", value: 2 },
                    { label: "Communicates feeling states non-verbally", value: 3 },
                    { label: "Virtually only these feeling states", value: 4 }
                ]
            },
            {
                name: "q2",
                label: "2. Feelings of Guilt",
                type: "single-select",
                options: [
                    { label: "Absent", value: 0 },
                    { label: "Self reproach", value: 1 },
                    { label: "Ideas of guilt or rumination", value: 2 },
                    { label: "Delusions of guilt", value: 3 },
                    { label: "Hallucinatory accusatory voices", value: 4 }
                ]
            },
            {
                name: "q3",
                label: "3. Suicide",
                type: "single-select",
                options: [
                    { label: "Absent", value: 0 },
                    { label: "Feels life not worth living", value: 1 },
                    { label: "Wishes he/she were dead", value: 2 },
                    { label: "Ideas or gestures of suicide", value: 3 },
                    { label: "Attempts at suicide", value: 4 }
                ]
            },
            {
                name: "q4",
                label: "4. Insomnia – Early",
                type: "single-select",
                options: [
                    { label: "No difficulty", value: 0 },
                    { label: "Occasional difficulty falling asleep", value: 1 },
                    { label: "Nightly difficulty falling asleep", value: 2 }
                ]
            },
            {
                name: "q5",
                label: "5. Insomnia – Middle",
                type: "single-select",
                options: [
                    { label: "No difficulty", value: 0 },
                    { label: "Restless / disturbed during night", value: 1 },
                    { label: "Waking during night", value: 2 }
                ]
            },
            {
                name: "q6",
                label: "6. Insomnia – Early Morning",
                type: "single-select",
                options: [
                    { label: "No difficulty", value: 0 },
                    { label: "Wakes early but returns to sleep", value: 1 },
                    { label: "Unable to return to sleep", value: 2 }
                ]
            },
            {
                name: "q7",
                label: "7. Work and Activities",
                type: "single-select",
                options: [
                    { label: "No difficulty", value: 0 },
                    { label: "Fatigue or weakness", value: 1 },
                    { label: "Loss of interest in activities", value: 2 },
                    { label: "Decreased productivity", value: 3 },
                    { label: "Stopped working", value: 4 }
                ]
            },
            {
                name: "q8",
                label: "8. Retardation",
                type: "single-select",
                options: [
                    { label: "Normal", value: 0 },
                    { label: "Slight retardation", value: 1 },
                    { label: "Obvious retardation", value: 2 },
                    { label: "Interview difficult", value: 3 },
                    { label: "Complete stupor", value: 4 }
                ]
            },
            {
                name: "q9",
                label: "9. Agitation",
                type: "single-select",
                options: [
                    { label: "None", value: 0 },
                    { label: "Fidgetiness", value: 1 },
                    { label: "Playing with hands/hair", value: 2 },
                    { label: "Moving about", value: 3 },
                    { label: "Hand wringing, nail biting", value: 4 }
                ]
            },
            {
                name: "q10",
                label: "10. Anxiety – Psychic",
                type: "single-select",
                options: [
                    { label: "No difficulty", value: 0 },
                    { label: "Subjective tension", value: 1 },
                    { label: "Worrying", value: 2 },
                    { label: "Apprehensive attitude", value: 3 },
                    { label: "Fears without questioning", value: 4 }
                ]
            },
            {
                name: "q11",
                label: "11. Anxiety – Somatic",
                type: "single-select",
                options: [
                    { label: "Absent", value: 0 },
                    { label: "Mild", value: 1 },
                    { label: "Moderate", value: 2 },
                    { label: "Severe", value: 3 },
                    { label: "Incapacitating", value: 4 }
                ]
            },
            {
                name: "q12",
                label: "12. Somatic Symptoms – GI",
                type: "single-select",
                options: [
                    { label: "None", value: 0 },
                    { label: "Loss of appetite", value: 1 },
                    { label: "Difficulty eating", value: 2 }
                ]
            },
            {
                name: "q13",
                label: "13. General Somatic Symptoms",
                type: "single-select",
                options: [
                    { label: "None", value: 0 },
                    { label: "Heaviness / aches", value: 1 },
                    { label: "Clear-cut symptoms", value: 2 }
                ]
            },
            {
                name: "q14",
                label: "14. Genital Symptoms",
                type: "single-select",
                options: [
                    { label: "Absent", value: 0 },
                    { label: "Mild", value: 1 },
                    { label: "Severe", value: 2 }
                ]
            },
            {
                name: "q15",
                label: "15. Hypochondriasis",
                type: "single-select",
                options: [
                    { label: "Not present", value: 0 },
                    { label: "Self absorption", value: 1 },
                    { label: "Preoccupation with health", value: 2 },
                    { label: "Frequent complaints", value: 3 },
                    { label: "Hypochondriacal delusions", value: 4 }
                ]
            },
            {
                name: "q16",
                label: "16. Loss of Weight",
                type: "single-select",
                options: [
                    { label: "No weight loss", value: 0 },
                    { label: "Probable weight loss", value: 1 },
                    { label: "Definite weight loss", value: 2 }
                ]
            },
            {
                name: "q17",
                label: "17. Insight",
                type: "single-select",
                options: [
                    { label: "Acknowledges illness", value: 0 },
                    { label: "Acknowledges illness but blames external factors", value: 1 },
                    { label: "Denies being ill", value: 2 }
                ]
            }
        ]
    };

    /* ---------------- SCORE ---------------- */

    const totalScore = useMemo(() => {
        return Object.values(values).reduce(
            (sum, v) => sum + (v !== undefined ? Number(v) : 0),
            0
        );
    }, [values]);
    const storageKey = patient
        ? `psychology_hamd_draft_${patient.name}`
        : null;

    useEffect(() => {
        if (!storageKey) return;

        const saved = localStorage.getItem(storageKey);
        if (saved) {
            const parsed = JSON.parse(saved);
            setValues(parsed.values || {});
            setSubmitted(false);
        }
    }, [storageKey]);
    const getSeverity = (score) => {
        if (score <= 7) return "Normal / In Remission";
        if (score <= 17) return "Mild Depression";
        if (score <= 24) return "Moderate Depression";
        return "Severe Depression";
    };

    const severity = getSeverity(totalScore);

    const onChange = (name, value) => {
        setValues(v => ({ ...v, [name]: Number(value) }));
    };

    const handleSubmit = () => {
        setSubmitted(true);
        onSubmit?.({ totalScore, severity, responses: values });
    };

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





    /* ---------------- UI ---------------- */

    return (
        // <>
        //   <CommonFormBuilder
        //     schema={HAMD_SCHEMA}
        //     values={values}
        //     onChange={onChange}
        //     submitted={submitted}
        //   />

        //   <div style={summaryWrap}>
        //     <div style={scoreRow}>
        //       <div style={scorePill}>Total Score: {totalScore}</div>
        //       <div style={severityPill}>Depression Severity: {severity}</div>
        //     </div>

        //     {!submitted && (
        //       <div style={submitRow}>
        //         <button style={submitBtn} onClick={handleSubmit}>
        //           Submit HAM-D Assessment
        //         </button>
        //       </div>
        //     )}
        //   </div>
        // </>
        <div style={mainContent}>
            <CommonFormBuilder
                schema={HAMD_SCHEMA}
                values={values}
                onChange={onChange}
                submitted={submitted}
                onAction={handleAction}
            >
                <div style={summaryWrap}>
                    <div style={scoreRow}>
                        <div style={scorePill}>
                            TOTAL SCORE : {totalScore}
                        </div>

                        <div style={severityPill}>
                            ANXIETY SEVERITY : {severity}
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