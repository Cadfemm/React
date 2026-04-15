import React, { useState } from "react";
import CommonFormBuilder from "../CommonComponenets/FormBuilder";

/* ================= PATIENT INFO CONTAINER ================= */
const CONTAINER_SCHEMA = {
  title: "Patient Information",
  sections: []
};

/* ================= 3D FORM SCHEMA ================= */
const THREE_D_SCHEMA = {
  title: "3D Service",
  actions: [
    { type: "back", label: "Back" },
    // { type: "save", label: "Save" }
  ],
  sections: [
    {
      fields: [
        {
          name: "category",
          label: "Category of Service",
          type: "single-select",
          options: [
            { label: "PNO 3D Printing Item", value: "item" },
            { label: "PNO 3D Printing Service", value: "service" },
            { label: "PNO 3D Printing Group Sessions", value: "group" }
          ]
        },

        /* ---------- TYPE (ONLY FOR ITEM) ---------- */
        {
          name: "type",
          label: "Type of Service",
          type: "single-select",
          options: [
            { label: "Nailclipper", value: "nailclipper" }
          ],
          showIf: {
            field: "category",
            equals: "item"
          }
        },

        /* ---------- SERVICE MULTI SELECT ---------- */
        {
          name: "service_items",
          label: "Items",
          type: "checkbox-group",
          options: [
            { label: "3D Scan", value: "scan" },
            { label: "3D Design", value: "design" },
            { label: "3D Printing", value: "printing" },
            { label: "Modification", value: "modification" },
            { label: "Customization", value: "customization" },
            { label: "Installation", value: "installation" },
            { label: "Test Fitting", value: "test_fitting" },
            { label: "Assessment", value: "assessment" },
            { label: "3D Printing Item", value: "item" },
            { label: "Adjustment", value: "adjustment" }
          ],
          showIf: {
            field: "category",
            equals: "service"
          }
        },

        /* ---------- GROUP SESSION ---------- */
        {
          name: "group_items",
          label: "Group Sessions",
          type: "checkbox-group",
          options: [
            { label: "3D Scanning Application Training", value: "scan_training" },
            { label: "Computer Aided Design Training", value: "cad_training" },
            { label: "3D Printer Operation Training", value: "printer_training" },
            { label: "3D Printing Technique Training", value: "technique_training" }
          ],
          showIf: {
            field: "category",
            equals: "group"
          }
        },

        /* ---------- COMMON FIELDS ---------- */
        {
          name: "order_date",
          label: "Select Order Date",
          type: "date"
        },
        {
        type: "custom",
        showIf: {
            field: "category",
            equals: "item",
        },

        render: ({ values, onChange }) => {
            const selected = values.type; // ✅ single value

            if (!selected) return null;

            const qty = values.item_qty_map?.[selected] ?? 1;

            return (
                <div
                style={{
                    marginTop: 10,
                    display: "flex",
                    flexDirection: "column", // ✅ IMPORTANT
                    gap: 6,
                    width: 300
                }}
                >
                {/* LABEL */}
                <label style={{ fontWeight: 500 }}>
                    Quantity
                </label>

                {/* INPUT */}
                <input
                    type="number"
                    min={1}
                    max={10}
                    value={qty}
                    style={{
                    width: "100%",
                    padding: 8,
                    borderRadius: 6,
                    border: "1px solid #ccc"
                    }}
                    onChange={(e) => {
                    const val = Number(e.target.value);

                    onChange("item_qty_map", {
                        ...values.item_qty_map,
                        [selected]: val
                    });
                    }}
                />
                </div>
            );
        }
        },
        {
        type: "custom",
        showIf: {
            field: "category",
            equals: "service"
        },

        render: ({ values, onChange }) => {
            const selected = values.service_items || [];

            if (!selected.length) return null;

            return (
            <div style={{ marginTop: 12 }}>
                
                {/* ✅ LABEL (ONLY ONCE) */}
                <label
                style={{
                    fontWeight: 500,
                    display: "block",
                    marginBottom: 6
                }}
                >
                Quantity
                </label>

                {/* ✅ GRID CONTAINER */}
                <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: 12
                }}
                >
                {selected.map((item) => {
                    const qty = values.service_qty_map?.[item] ?? 1;

                    return (
                    <div
                        key={item}
                        style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        border: "1px solid #eee",
                        padding: 8,
                        borderRadius: 6,
                        background: "#fafafa"
                        }}
                    >
                        {/* ITEM LABEL */}
                        <div style={{ flex: 1, fontSize: 13 }}>
                        {item.replaceAll("_", " ")}
                        </div>

                        {/* INPUT */}
                        <input
                        type="number"
                        min={1}
                        max={10}
                        value={qty}
                        style={{
                            width: 60,
                            padding: 4,
                            borderRadius: 4,
                            border: "1px solid #ccc"
                        }}
                        onChange={(e) => {
                            const val = Number(e.target.value);

                            onChange("service_qty_map", {
                            ...values.service_qty_map,
                            [item]: val
                            });
                        }}
                        />
                    </div>
                    );
                })}
                </div>
            </div>
            );
        }
        },
                {
        type: "custom",
        showIf: {
            field: "category",
            equals: "group"
        },

        render: ({ values, onChange }) => {
            const selected = values.group_items || [];

            if (!selected.length) return null;

            return (
            <div style={{ marginTop: 12 }}>
                
                {/* ✅ LABEL (ONLY ONCE) */}
                <label
                style={{
                    fontWeight: 500,
                    display: "block",
                    marginBottom: 6
                }}
                >
                Quantity
                </label>

                {/* ✅ GRID */}
                <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: 12
                }}
                >
                {selected.map((item) => {
                    const qty = values.group_qty_map?.[item] ?? 1;

                    return (
                    <div
                        key={item}
                        style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        border: "1px solid #eee",
                        padding: 8,
                        borderRadius: 6,
                        background: "#fafafa"
                        }}
                    >
                        {/* ITEM */}
                        <div style={{ flex: 1, fontSize: 13 }}>
                        {item.replaceAll("_", " ")}
                        </div>

                        {/* INPUT */}
                        <input
                        type="number"
                        min={1}
                        max={10}
                        value={qty}
                        style={{
                            width: 60,
                            padding: 4,
                            borderRadius: 4,
                            border: "1px solid #ccc"
                        }}
                        onChange={(e) => {
                            const val = Number(e.target.value);

                            onChange("group_qty_map", {
                            ...values.group_qty_map,
                            [item]: val
                            });
                        }}
                        />
                    </div>
                    );
                })}
                </div>
            </div>
            );
        }
        },
        {
          name: "remarks",
          label: "Remarks",
          type: "textarea"
        }
      ]
    }
  ]
};

/* ================= COMPONENT ================= */
export default function WheelchairAssessment({ patient, onBack }) {
  const [values, setValues] = useState({});

  /* ---------- HANDLE CHANGE ---------- */
  const onChange = (name, value) => {
    setValues((v) => {
      const updated = { ...v, [name]: value };

      // reset dependent fields when category changes
      if (name === "category") {
        updated.type = "";
        updated.service_items = [];
        updated.group_items = [];
      }

      return updated;
    });
  };

  /* ---------- PATIENT INFO ---------- */
  function PatientInfo() {
    if (!patient) return <div>No Patient Data</div>;

    return (
      <div style={{ marginBottom: 12 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 12,
            fontSize: 14
          }}
        >
          <div><b>Name:</b> {patient.name}</div>
          <div><b>IC:</b> {patient.id}</div>
          <div><b>DOB:</b> {patient?.dob}</div>
          <div><b>Age / Gender:</b> {patient?.age} / {patient?.sex}</div>
          <div><b>ICD:</b> {patient?.icd}</div>
          <div><b>Date of Assessment:</b> {patient?.date_of_assessment}</div>
          <div><b>Date of Onset:</b> {patient?.date_of_onset}</div>
          <div><b>Primary Diagnosis:</b> {patient?.diagnosis_history || "-"}</div>
          <div><b>Secondary Diagnosis:</b> {patient?.medical_history || "-"}</div>
        </div>
      </div>
    );
  }

  /* ---------- UI ---------- */
  return (
    <div style={{ padding: 0 }}>
      {/* <button onClick={onBack}>← Back</button> */}

      {/* ✅ PATIENT INFO (SAME AS ORTHOTICS) */}
      <CommonFormBuilder
        schema={CONTAINER_SCHEMA}
        values={values}
        onChange={onChange}
      >
        <PatientInfo />
      </CommonFormBuilder>

      {/* ✅ 3D FORM */}
      <CommonFormBuilder
        schema={THREE_D_SCHEMA}
        values={values}
        onChange={onChange}
        onAction={(type) => {
          if (type === "back") onBack();
          if (type === "save") {
            console.log("SAVE DATA:", {
              patient,
              form: values
            });
            alert("3D Service Saved");
          }
        }}
      />
    </div>
  );
}