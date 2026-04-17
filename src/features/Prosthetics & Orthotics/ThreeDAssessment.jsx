import React, { useMemo, useState, useEffect } from "react";
import CommonFormBuilder from "../CommonComponenets/FormBuilder";

/* ================= PATIENT INFO CONTAINER ================= */
const CONTAINER_SCHEMA = {
  title: "Patient Information",
  sections: []
};

/* ================= COMPONENT ================= */
export default function WheelchairAssessment({ patient, onBack }) {
  const [values, setValues] = useState({});

  /* =========================================================
     🔥 DYNAMIC MASTER DATA
     In real project replace with API fetch:
     GET /3d-items
     POST /3d-items
     PUT /3d-items/:id
     DELETE /3d-items/:id
  ========================================================= */
  const [itemOptions, setItemOptions] = useState(() => {
    const saved = localStorage.getItem("itemOptions");

    return saved
      ? JSON.parse(saved)
      : [
          { id: 1, label: "Nailclipper", value: "nailclipper" }
        ];
  });

  const [serviceOptions, setServiceOptions] = useState(() => {
    const saved = localStorage.getItem("serviceOptions");

    return saved
      ? JSON.parse(saved)
      : [
          { id: 1, label: "3D Scan", value: "scan" },
          { id: 2, label: "3D Design", value: "design" },
          { id: 3, label: "3D Printing", value: "printing" },
          { id: 4, label: "Modification", value: "modification" },
          { id: 5, label: "Customization", value: "customization" },
          { id: 6, label: "Installation", value: "installation" },
          { id: 7, label: "Test Fitting", value: "test_fitting" },
          { id: 8, label: "Assessment", value: "assessment" },
          { id: 9, label: "3D Printing Item", value: "item" },
          { id: 10, label: "Adjustment", value: "adjustment" }
        ];
  });

  const [groupOptions, setGroupOptions] = useState(() => {
    const saved = localStorage.getItem("groupOptions");

    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            label: "3D Scanning Application Training",
            value: "scan_training"
          },
          {
            id: 2,
            label: "Computer Aided Design Training",
            value: "cad_training"
          },
          {
            id: 3,
            label: "3D Printer Operation Training",
            value: "printer_training"
          },
          {
            id: 4,
            label: "3D Printing Technique Training",
            value: "technique_training"
          }
        ];
  });

  const [newName, setNewName] = useState("");

  /* =====================================================
    AUTO SAVE TO LOCAL STORAGE
  ===================================================== */

  useEffect(() => {
    localStorage.setItem(
      "serviceOptions",
      JSON.stringify(serviceOptions)
    );
  }, [serviceOptions]);

  useEffect(() => {
    localStorage.setItem(
      "groupOptions",
      JSON.stringify(groupOptions)
    );
  }, [groupOptions]);

  /* =========================================================
     HELPERS
  ========================================================= */
  const slugify = (text) =>
    text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "_")
      .replace(/[^\w]/g, "");

  const addOption = (type) => {
    if (!newName.trim()) return;

    const obj = {
      id: Date.now(),
      label: newName.trim(),
      value: slugify(newName)
    };

    if (type === "item") {
      setItemOptions((p) => [...p, obj]);
    }

    if (type === "service") {
      setServiceOptions((p) => [...p, obj]);
    }

    if (type === "group") {
      setGroupOptions((p) => [...p, obj]);
    }

    setNewName("");
  };

  const editOption = (type, row) => {
    const name = prompt("Edit name", row.label);
    if (!name) return;

    const updated = {
      ...row,
      label: name,
      value: slugify(name)
    };

    const updater = (list) =>
      list.map((x) => (x.id === row.id ? updated : x));

    if (type === "item") setItemOptions(updater);
    if (type === "service") setServiceOptions(updater);
    if (type === "group") setGroupOptions(updater);
  };

  const deleteOption = (type, row) => {
    if (!window.confirm(`Delete ${row.label}?`)) return;

    const remover = (list) => list.filter((x) => x.id !== row.id);

    if (type === "item") setItemOptions(remover);
    if (type === "service") setServiceOptions(remover);
    if (type === "group") setGroupOptions(remover);
  };

  /* =========================================================
     FORM SCHEMA (DYNAMIC)
  ========================================================= */
  const THREE_D_SCHEMA = useMemo(
    () => ({
      title: "3D Service",
      actions: [{ type: "back", label: "Back" }, { type: "save", label: "Save" }],
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

            /* ================= ITEM SELECT ================= */
            {
              name: "type",
              label: "Type of Service",
              type: "checkbox-group",
              options: itemOptions,
              showIf: {
                field: "category",
                equals: "item"
              }
            },

            

            /* ================= SERVICE ================= */
            {
              name: "service_items",
              label: "Items",
              type: "checkbox-group",
              options: serviceOptions,
              showIf: {
                field: "category",
                equals: "service"
              }
            },

            /* ================= GROUP ================= */
            {
              name: "group_items",
              label: "Group Sessions",
              type: "checkbox-group",
              options: groupOptions,
              showIf: {
                field: "category",
                equals: "group"
              }
            },

            /* =================================================
               🔥 ADD / EDIT / DELETE MASTER ITEMS
            ================================================= */
            {
              type: "custom",
              render: ({ values }) => {
                const category = values.category;
                if (!category) return null;

                let list = [];
                if (category === "item") list = itemOptions;
                if (category === "service") list = serviceOptions;
                if (category === "group") list = groupOptions;

                return (
                  <div style={{ marginTop: 15 }}>
                    <label style={{ fontWeight: 600 }}>
                      Add New {category}
                    </label>

                    <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                      <input
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        placeholder="Enter new name"
                        style={{
                          flex: 1,
                          padding: 8,
                          border: "1px solid #ccc",
                          borderRadius: 6
                        }}
                      />

                      <button
                        type="button"
                        onClick={() => addOption(category)}
                      >
                        Add
                      </button>
                    </div>

                    {/* <div style={{ marginTop: 10 }}>
                      {list.map((row) => (
                        <div
                          key={row.id}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            padding: 8,
                            border: "1px solid #eee",
                            marginBottom: 6,
                            borderRadius: 6
                          }}
                        >
                          <div>{row.label}</div>

                          <div style={{ display: "flex", gap: 8 }}>
                            <button
                              type="button"
                              onClick={() => editOption(category, row)}
                            >
                              Edit
                            </button>

                            <button
                              type="button"
                              onClick={() => deleteOption(category, row)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div> */}
                  </div>
                );
              }
            },

           /* =================================================
              🔥 ITEM QTY (MULTI SELECT LIKE SERVICE/GROUP)
            ================================================= */
            {
              type: "custom",
              showIf: {
                field: "category",
                equals: "item"
              },
              render: ({ values, onChange }) => {
                const selected = values.type || [];

                if (!selected.length) return null;

                return (
                  <div style={{ marginTop: 12 }}>
                    <label>Quantity</label>

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3,1fr)",
                        gap: 10,
                        marginTop: 8
                      }}
                    >
                      {selected.map((item) => {
                        const qty = values.item_qty_map?.[item] ?? 1;

                        return (
                          <div key={item}>
                            <div>{item.replaceAll("_", " ")}</div>

                            <input
                              type="number"
                              min={1}
                              value={qty}
                              onChange={(e) =>
                                onChange("item_qty_map", {
                                  ...values.item_qty_map,
                                  [item]: Number(e.target.value)
                                })
                              }
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              }
            },

            /* =================================================
               🔥 SERVICE QTY
            ================================================= */
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
                    <label>Quantity</label>

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3,1fr)",
                        gap: 10,
                        marginTop: 8
                      }}
                    >
                      {selected.map((item) => {
                        const qty = values.service_qty_map?.[item] ?? 1;

                        return (
                          <div key={item}>
                            <div>{item}</div>

                            <input
                              type="number"
                              min={1}
                              value={qty}
                              onChange={(e) =>
                                onChange("service_qty_map", {
                                  ...values.service_qty_map,
                                  [item]: Number(e.target.value)
                                })
                              }
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              }
            },

            /* =================================================
               🔥 GROUP QTY
            ================================================= */
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
                    <label>Quantity</label>

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3,1fr)",
                        gap: 10,
                        marginTop: 8
                      }}
                    >
                      {selected.map((item) => {
                        const qty = values.group_qty_map?.[item] ?? 1;

                        return (
                          <div key={item}>
                            <div>{item}</div>

                            <input
                              type="number"
                              min={1}
                              value={qty}
                              onChange={(e) =>
                                onChange("group_qty_map", {
                                  ...values.group_qty_map,
                                  [item]: Number(e.target.value)
                                })
                              }
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
              name: "order_date",
              label: "Select Order Date",
              type: "date"
            },

            {
              name: "remarks",
              label: "Remarks",
              type: "textarea"
            }
          ]
        }
      ]
    }),
    [itemOptions, serviceOptions, groupOptions, newName]
  );

  /* =========================================================
     CHANGE HANDLER
  ========================================================= */
  const onChange = (name, value) => {
    setValues((v) => {
      const updated = { ...v, [name]: value };

      if (name === "category") {
        updated.type = "";
        updated.service_items = [];
        updated.group_items = [];
      }

      return updated;
    });
  };

  /* =========================================================
     PATIENT INFO
  ========================================================= */
  function PatientInfo() {
    if (!patient) return <div>No Patient Data</div>;

    return (
      <div style={{ padding: 10 }}>
        <b>Name:</b> {patient.name}
      </div>
    );
  }

  /* =========================================================
     UI
  ========================================================= */
  return (
    <div>
      <CommonFormBuilder
        schema={CONTAINER_SCHEMA}
        values={values}
        onChange={onChange}
      >
        <PatientInfo />
      </CommonFormBuilder>

      <CommonFormBuilder
        schema={THREE_D_SCHEMA}
        values={values}
        onChange={onChange}
        onAction={(type) => {
          if (type === "back") onBack?.();

          if (type === "save") {
            console.log(values);

            alert("Saved Successfully");
          }
        }}
      />
    </div>
  );
}