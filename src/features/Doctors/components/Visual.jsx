import React, { useState } from "react";

export default function VisualAssessment() {
  // ---- Master list of questions grouped by categories ---- //
  const sections = [
    {
      title: "Ocular Pain",
      items: ["Ocular Pain"]
    },
    {
      title: "Visual Disturbance",
      items: [
        "Diplopia",
        "Blurred Vision / Haloes around lights",
        "Sudden onset visual loss",
        "Gradual onset visual loss",
        "Flashes and floaters",
        "Blindness (complete, both eyes)",
        "Severe visual impairment, monocular",
        "Moderate visual impairment, monocular",
        "Unspecified visual impairment (binocular)"
      ]
    },
    {
      title: "Eyelid Conditions",
      items: [
        "Ptosis",
        "Chalazion",
        "Blepharitis",
        "Entropion / Ectropion of eyelid",
        "Lagophthalmos (lid lag)",
        "Proptosis / Exophthalmos",
        "Periorbital oedema / inflammation"
      ]
    },
    {
      title: "Visual Field Abnormalities",
      items: [
        "Normal visual field",
        "Central visual field defect",
        "Peripheral visual field loss",
        "Bitemporal hemianopia",
        "Homonymous hemianopia",
        "Quadrantanopia",
        "Tunnel vision",
        "Blind spot enlargement",
        "Colour desaturation (red desaturation)",
        "Functional (non-organic) visual loss"
      ]
    },
    {
      title: "Eye Movement & Squint Disorders",
      items: [
        "Concomitant squint (strabismus)",
        "Paralytic squint",
        "Diplopia",
        "Ocular muscle palsy (III, IV, VI)",
        "Nystagmus",
        "Oculocephalic (doll’s-eye) reflex"
      ]
    },
    {
      title: "Pupillary Abnormalities",
      items: [
        "Miosis",
        "Mydriasis",
        "Anisocoria",
        "Fixed pupils",
        "Relative Afferent Pupillary Defect (RAPD / Marcus Gunn pupil)",
        "Light reflex (direct and consensual)",
        "Accommodation reflex",
        "Other congenital malformations of iris (coloboma)",
        "Horner syndrome",
        "III nerve palsy",
        "Optic atrophy",
        "Anomalies of pupillary function in diseases elsewhere"
      ]
    },
    {
      title: "Ocular Muscle Paralysis",
      items: [
        "Superior rectus palsy / paresis",
        "Inferior rectus palsy / paresis",
        "Medial rectus palsy / paresis",
        "Inferior oblique palsy / paresis",
        "Superior oblique palsy / paresis",
        "Lateral rectus palsy / paresis",
        "Combined or unspecified ocular muscle paralysis"
      ]
    },
    {
      title: "Vision Aids",
      items: [
        "Colour blindness / Colour vision defect",
        "Presence of spectacles and contact lenses",
        "Fitting and adjustment of spectacles and contact lenses"
      ]
    }
  ];

  // ---- State for responses ---- //
  const [responses, setResponses] = useState({});

  const handleChange = (question, answer) => {
    setResponses((prev) => ({ ...prev, [question]: answer }));
  };

  // ---- Internal CSS ---- //
  const styles = {
    container: {
      background: "#fff",
      padding: 20,
      borderRadius: 8,
      border: "1px solid #ddd",
      fontFamily: "Inter, sans-serif",
      margin: "20px auto"
    },
    section: {
      marginBottom: 22,
      paddingBottom: 10,
      borderBottom: "1px solid #eee"
    },
    title: {
      fontSize: 18,
      fontWeight: 700,
      marginBottom: 12
    },
    questionRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "8px 0",
      fontSize: 14
    },
    radios: {
      display: "flex",
      gap: 12,
      alignItems: "center"
    },
    radioLabel: {
      cursor: "pointer"
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Visual Symptoms Assessment</h2>

      {sections.map((section) => (
        <div key={section.title} style={styles.section}>
          <div style={styles.title}>{section.title}</div>

          {section.items.map((q) => (
            <div key={q} style={styles.questionRow}>
              <div>{q}</div>

              {/* YES/NO RADIO BUTTONS */}
              <div style={styles.radios}>
                <label style={styles.radioLabel}>
                  <input
                    type="radio"
                    name={q}
                    value="YES"
                    checked={responses[q] === "YES"}
                    onChange={() => handleChange(q, "YES")}
                  />{" "}
                  YES
                </label>

                <label style={styles.radioLabel}>
                  <input
                    type="radio"
                    name={q}
                    value="NO"
                    checked={responses[q] === "NO"}
                    onChange={() => handleChange(q, "NO")}
                  />{" "}
                  NO
                </label>
              </div>
            </div>
          ))}
        </div>
      ))}

      {/* <pre style={{ background: "#f7f7f7", padding: 10, fontSize: 12 }}>
        {JSON.stringify(responses, null, 2)}
      </pre> */}
    </div>
  );
}
