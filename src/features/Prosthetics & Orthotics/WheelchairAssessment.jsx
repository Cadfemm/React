import React, { useState, useEffect } from "react";
import CommonFormBuilder from "../CommonComponenets/FormBuilder";

/* ================= HELPERS ================= */
const pad = (n) => n.toString().padStart(2, "0");

const getNow = () => {
  const d = new Date();

  return {
    date: `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`,
    time: `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`,
    datetime: `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
  };
};
/* ================= PATIENT INFO ================= */
const CONTAINER_SCHEMA = {
  title: "Patient Information",
  sections: [],
};

/* ================= COMPONENT ================= */
export default function WheelchairAssessment({ patient, onBack }) {
  const now = getNow();

  // 🔒 true = LOCKED (manual), false = LIVE
  const [isTimeLocked, setIsTimeLocked] = useState(true);

  const [values, setValues] = useState({
    order_date: now.date,
    order_time_h: now.hours,
    order_time_m: now.minutes,
    order_time_s: now.seconds,
  });

  /* 🔥 AUTO TIME UPDATE */
  useEffect(() => {
    if (isTimeLocked) return; // stop when locked

    const updateNow = () => {
      const now = getNow();
      setValues((prev) => ({
        ...prev,
        order_time_h: now.hours,
        order_time_m: now.minutes,
        order_time_s: now.seconds,
      }));
    };

    updateNow(); // instant update

    const interval = setInterval(updateNow, 1000);

    return () => clearInterval(interval);
  }, [isTimeLocked]);

  const ITEM_QTY_RULES = {
  front_castor_solid_tyre: { min: 1, max: 5 },
  padded_desk_armrest: { min: 1, max: 5 },
  sealed_bearing_castor: { min: 1, max: 5 },
  sealed_bearing_fork: { min: 1, max: 5 },
  sealed_bearing_rear_wheel: { min: 1, max: 5 },
  sealed_bearing_standard: { min: 1, max: 5 },
  tyre_pneumatic: { min: 1, max: 5 },
  tube_wheelchair: { min: 1, max: 5 },
  padded_nylon_seat: { min: 1, max: 5 },
  padded_nylon_back_16: { min: 1, max: 5 },
  padded_nylon_back_18: { min: 1, max: 5 },
  plastic_bar: { min: 1, max: 5 },
  quick_release_axle: { min: 1, max: 5 },
  rear_seat_guide: { min: 1, max: 5 },
  screw_nut: { min: 1, max: 5 },

  washer: { min: 1, max: 10 },
  anti_tipper: { min: 1, max: 2 },
};
const selectedItem = values.major_items?.[0]; // minimal: first selected
const rule = ITEM_QTY_RULES[selectedItem] || { min: 1, max: 5 };
  /* ================= SCHEMA ================= */
  const WHEELCHAIR_SCHEMA = {
    title: "Wheelchair Service",
    actions: [{ type: "back", label: "Back" }],
    sections: [
      {
        fields: [
          /* SERVICE TYPE */
          {
            name: "service_type",
            label: "Type of Service",
            type: "radio",
            options: [
              { label: "Walk-in", value: "walkin" },
              { label: "Booking", value: "booking" },
              { label: "Private Patient", value: "private" },
            ],
          },

          /* CATEGORY */
          {
            name: "category",
            label: "Service Category",
            type: "radio",
            options: [
              { label: "Minor", value: "minor" },
              { label: "Major", value: "major" },
              { label: "Modify", value: "modify" },
              { label: "Training", value: "training" },
            ],
          },

          
          /* ⏱ DATE + TIME */
          {
            type: "row",
            cols: 1,
            fields: [
              {
                name: "order_date",
                label: "Date",
                type: "datetime-local"
              }
            ],
            showIf: {
              field: "category",
              oneOf: ["training", "major", "minor", "modify"]
            }
          },

            /* ---------- MAJOR ---------- */
            {
            name: "major_items",
            label: "Major Service Items",
            type: "checkbox-group",
            options: [
                { label: "Front Castor Solid Tyre", value: "front_castor_solid_tyre" },
                { label: "Padded Desk Length Armrest", value: "padded_desk_armrest" },
                { label: "Sealed Bearing Castor", value: "sealed_bearing_castor" },
                { label: "Sealed Bearing Fork/Stem", value: "sealed_bearing_fork" },
                { label: "Sealed Bearing Rear Wheel", value: "sealed_bearing_rear_wheel" },
                { label: "Sealed Bearing Standard", value: "sealed_bearing_standard" },
                { label: "Tyre Pneumatic", value: "tyre_pneumatic" },
                { label: "Tube Wheelchair", value: "tube_wheelchair" },
                { label: "Padded Nylon Seat (16\", 18\")", value: "padded_nylon_seat" },
                { label: "Padded Nylon Back 16\"", value: "padded_nylon_back_16" },
                { label: "Padded Nylon Back 18\"", value: "padded_nylon_back_18" },
                { label: "Plastic Bar (16\", 18\", 20\")", value: "plastic_bar" },
                { label: "Quick Release Axle", value: "quick_release_axle" },
                { label: "Rear Seat Guide", value: "rear_seat_guide" },
                { label: "Screw / Nut", value: "screw_nut" },
                { label: "Washer", value: "washer" },
                { label: "Anti Tipper", value: "anti_tipper" }
            ],
            showIf: { field: "category", equals: "major" },
            },

            /* 🔥 PER-ITEM QUANTITY (ONLY ONCE) */
           {
            type: "custom",
            showIf: { field: "category", equals: "major" },

            render: ({ values, onChange }) => {
                const selected = values.major_items || [];

                if (!selected.length) return null;

                const ITEM_QTY_RULES = {
                washer: { min: 1, max: 10 },
                anti_tipper: { min: 1, max: 2 }
                };

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
                        const rule = ITEM_QTY_RULES[item] || { min: 1, max: 5 };
                        const qty = values.major_qty_map?.[item] ?? rule.min;

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
                            {/* ITEM NAME */}
                            <div style={{ flex: 1, fontSize: 13 }}>
                            {item.replaceAll("_", " ")}
                            </div>

                            {/* INPUT */}
                            <input
                            type="number"
                            min={rule.min}
                            max={rule.max}
                            value={qty}
                            style={{
                                width: 60,
                                padding: 4,
                                borderRadius: 4,
                                border: "1px solid #ccc"
                            }}
                            onChange={(e) => {
                                const val = Number(e.target.value);

                                onChange("major_qty_map", {
                                ...values.major_qty_map,
                                [item]: val,
                                });
                            }}
                            />

                            {/* RANGE */}
                            <span style={{ fontSize: 12, color: "#666" }}>
                            ({rule.min}-{rule.max})
                            </span>
                        </div>
                        );
                    })}
                    </div>
                </div>
                );
            }
            },

          /* ---------- MODIFY ---------- */
            {
            name: "mod_items",
            label: "Modification Items",
            type: "checkbox-group",
            options: [
                { label: "Front Castor", value: "front_castor" },
                { label: "Padded Desk Length Armrest", value: "padded_desk_armrest" },
                { label: "Sealed Bearing Castor", value: "sealed_bearing_castor" },
                { label: "Sealed Bearing Fork/Stem", value: "sealed_bearing_fork" },
                { label: "Sealed Bearing Rear Wheel", value: "sealed_bearing_rear_wheel" },
                { label: "Sealed Bearing Standard", value: "sealed_bearing_standard" },
                { label: "Sportrim Wheelchair", value: "sportrim_wheelchair" },
                { label: "Brake", value: "brake" },
                { label: "Padded Nylon Seat (16\", 18\")", value: "padded_nylon_seat" },
                { label: "Padded Nylon Back 16\"", value: "padded_nylon_back_16" },
                { label: "Padded Nylon Back 18\"", value: "padded_nylon_back_18" },
                { label: "Plastic Bar (16\", 18\", 20\")", value: "plastic_bar" },
                { label: "Quick Release Axle", value: "quick_release_axle" },
                { label: "Rear Seat Guide", value: "rear_seat_guide" }
            ],
            showIf: { field: "category", equals: "modify" },
            },

           {
            type: "custom",
            showIf: { field: "category", equals: "modify" },

            render: ({ values, onChange }) => {
                const selected = values.mod_items || [];

                if (!selected.length) return null;

                const ITEM_QTY_RULES = {
                brake: { min: 1, max: 2 } // special case
                };

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
                        const rule = ITEM_QTY_RULES[item] || { min: 1, max: 5 };
                        const qty = values.mod_qty_map?.[item] ?? rule.min;

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
                            {/* ITEM NAME */}
                            <div style={{ flex: 1, fontSize: 13 }}>
                            {item.replaceAll("_", " ")}
                            </div>

                            {/* INPUT */}
                            <input
                            type="number"
                            min={rule.min}
                            max={rule.max}
                            value={qty}
                            style={{
                                width: 60,
                                padding: 4,
                                borderRadius: 4,
                                border: "1px solid #ccc"
                            }}
                            onChange={(e) => {
                                const val = Number(e.target.value);

                                onChange("mod_qty_map", {
                                ...values.mod_qty_map,
                                [item]: val,
                                });
                            }}
                            />

                            {/* RANGE */}
                            <span style={{ fontSize: 12, color: "#666" }}>
                            ({rule.min}-{rule.max})
                            </span>
                        </div>
                        );
                    })}
                    </div>
                </div>
                );
            }
            },

          /* ---------- TRAINING ---------- */
          {
            name: "training_items",
            label: "Training Sessions",
            type: "checkbox-group",
            options: [
              { label: "Ping Pong Training With Wheelchair", value: "pingpong" },
              { label: "Repair Wheelchair Class", value: "repair" },
              { label: "Wheelchair Care Class", value: "care" },
              { label: "How To Clean Wheelchair", value: "cleaning" },
            ],
            showIf: { field: "category", equals: "training" },
          },

          /* COMMON */
          {
            name: "remarks",
            label: "Remarks",
            type: "textarea",
          },
        ],
      },
    ],
  };

  /* ================= HANDLERS ================= */
const onChange = (name, value) => {
  setValues((prev) => {
    const updated = { ...prev, [name]: value };

    // CATEGORY SWITCH
    if (name === "category") {
      const now = getNow();
      const key = `order_date_${value}`;

      // load existing category timestamp
      if (prev[key]) {
        updated.order_date = prev[key];
      } else {
        updated.order_date = now.datetime;
        updated[key] = now.datetime;
      }

      updated.major_items = [];
      updated.mod_items = [];
      updated.training_items = [];
    }

    // USER CHANGED DATE
    if (name === "order_date") {
      const cat = prev.category;
      const key = `order_date_${cat}`;

      updated.order_date = value;
      updated[key] = value;
    }

    return updated;
  });
};
  /* ================= PATIENT INFO ================= */
  function PatientInfo() {
    if (!patient) return <div>No Patient Data</div>;

    return (
      <div style={{ marginBottom: 12 }}>
        {/* Assessment type banner */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "#E0F2FE", border: "1px solid #BAE6FD",
          borderRadius: 999, padding: "5px 14px", marginBottom: 14,
          fontSize: 13, fontWeight: 600, color: "#0369A1"
        }}>
          🦽 Wheelchair Assessment
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 12,
          fontSize: 14
        }}>
          <div><b>Name:</b> {patient.name}</div>
          <div><b>IC:</b> {patient.id}</div>
          <div><b>DOB:</b> {patient?.dob}</div>
          <div><b>Age / Gender:</b> {patient?.age} / {patient?.sex}</div>
          <div><b>ICD:</b> {patient?.icd}</div>
          <div><b>Date of Assessment:</b> {patient?.date_of_assessment}</div>
          <div><b>Scheme:</b> {patient?.scheme}</div>
          <div><b>Weight:</b> {patient?.weight}</div>
          <div><b>Diagnosis:</b> {patient?.diagnosis_history || "-"}</div>
        </div>
      </div>
    );
  }

  /* ================= UI ================= */
  return (
    <div style={{ padding: 24, background: "#F8FAFC", minHeight: "100vh" }}>
      {/* Page header with back button */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12,
            background: "#E0F2FE", display: "flex", alignItems: "center",
            justifyContent: "center", fontSize: 22
          }}>🦽</div>
          <div>
            <div style={{ fontSize: 20, fontWeight: 800, color: "#0F172A" }}>Wheelchair Assessment</div>
            <div style={{ fontSize: 13, color: "#64748B" }}>Prosthetics &amp; Orthotics Department</div>
          </div>
        </div>
        <button
          onClick={onBack}
          style={{
            background: "transparent", border: "1px solid #CBD5E1",
            padding: "8px 14px", borderRadius: 10, fontSize: 14,
            fontWeight: 600, cursor: "pointer", color: "#2563EB"
          }}
        >
          ← Back to Patients
        </button>
      </div>

      <CommonFormBuilder
        schema={CONTAINER_SCHEMA}
        values={values}
        onChange={onChange}
      >
        <PatientInfo />
      </CommonFormBuilder>

      <CommonFormBuilder
        schema={WHEELCHAIR_SCHEMA}
        values={values}
        onChange={onChange}
        onAction={(type) => {
          if (type === "toggle-time-lock") {
            setIsTimeLocked((prev) => !prev);
          }
          if (type === "back") onBack();
        }}
      />
    </div>
  );
}