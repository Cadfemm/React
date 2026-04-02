import { useState } from "react";
import { CASP_SCHEMA } from "../schema/CASP_Schema";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

export default function CASPAssessment() {
    const [values, setValues] = useState({});
    const [showModal, setShowModal] = useState(false);

    const handleChange = (name, value) => {
        setValues(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFormAction = (actionType) => {
        if (actionType === "education_reference") {
            setShowModal(true);
        }
    };

    const totalScore = () => {
        let sum = 0;
        Object.entries(values).forEach(([_, value]) => {
            if (Number.isInteger(value)) sum += value;
        });
        return sum;
    };

    const computedValues = {
        ...values,
        total_casp_score: totalScore()
    };

    return (
        <>
            <CommonFormBuilder
                schema={CASP_SCHEMA}
                values={computedValues}
                onChange={handleChange}
                onAction={handleFormAction}   // ✅ IMPORTANT
                layout="nested"
            />

            {/* ✅ MODAL */}
            {showModal && (
                <div
                    style={{
                        position: "fixed",
                        inset: 0,
                        backgroundColor: "rgba(0,0,0,0.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 1300
                    }}
                    onClick={() => setShowModal(false)}
                >
                    <div
                        style={{
                            background: "#fff",
                            padding: 20,
                            borderRadius: 10,
                            maxWidth: "80vw",
                            maxHeight: "80vh",
                            overflow: "auto"
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3>Education Level Reference</h3>

                        {/* ✅ IMAGE + TEXT */}
                        <div style={{ marginBottom: 20 }}>
                            <p><b>Naming:</b></p>
                            <img src="/naming.png" style={{ width: "100%" }} />
                        </div>
                        <div style={{ marginBottom: 20 }}>
                            <p><b>Reproducing a Copy of a Cube:</b></p>
                            <img src="/cube.png" style={{ width: "100%" }} />
                        </div>
                        <div style={{ marginBottom: 20 }}>
                            <p><b>Graphic Series:</b></p>
                            <img src="/graphic.png" style={{ width: "100%" }} />
                        </div>
                        <div style={{ marginBottom: 20 }}>
                            <p><b>Image Recall:</b></p>
                            <img src="/imagerecall.png" style={{ width: "100%" }} />
                        </div>
                        <div style={{ marginBottom: 20 }}>
                            <p><b>Praxis:</b></p>
                            <img src="/praxis.png" style={{ width: "100%" }} />
                        </div>   
                        <div style={{ marginBottom: 20 }}>
                            <p><b>Calendar:</b></p>
                            <img src="/calendar.png" style={{ width: "100%" }} />
                        </div>                                               
                        <button onClick={() => setShowModal(false)}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}