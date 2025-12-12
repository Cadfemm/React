import React, { useState } from "react";

export default function HearingAssessment() {
  const styles = {
    card: {
      background: "#fff",
      border: "1px solid #dcdcdc",
      borderRadius: 8,
      padding: "18px 20px",
      marginBottom: 20,
    
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 700,
      marginBottom: 12,
      color: "#1a1a1a",
    },
    groupTitle: {
      fontSize: 15,
      fontWeight: 700,
      marginTop: 12,
      marginBottom: 8,
      color: "#333",
    },
    row: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "8px 0",
      borderBottom: "1px solid #eee",
    },
    label: {
      fontSize: 14,
      color: "#222",
      flex: 1,
    },
    radioGroup: {
      minWidth: 120,
      display: "flex",
      justifyContent: "space-between",
    },
    radio: {
      marginLeft: 10,
    },
  };

  // All questionnaire items stored in a structured array
  const sections = [
    {
      
      groups: [
        {
          title: "General Symptoms",
          items: [
            "Otalgia",
            "Pruritis",
            "Otorrhea",
            "Hearing loss (unspecified)",
            "Conductive hearing loss (unilateral/bilateral)",
            "Sensorineural hearing loss",
            "Mixed hearing loss",
            "Noise-induced hearing loss",
            "Deaf mutism, not elsewhere classified",
            "Presbycusis",
          ],
        },
        {
          title: "Balance / Vestibular",
          items: [
            "Tinnitus",
            "Vertigo",
            "Unsteadiness / imbalance",
            "Fullness or blocked ear sensation",
          ],
        },
      ],
    },
    {
      header: "EXTERNAL EAR CONDITIONS",
      groups: [
        {
          items: [
            "Deformity (Microtia / Anotia)",
            "Haematoma of pinna",
            "Otitis externa",
          ],
        },
      ],
    },
    {
      header: "MIDDLE EAR CONDITIONS",
      groups: [
        {
          items: [
            "Acute otitis media",
            "Otitis media with effusion",
            "Chronic suppurative otitis media",
            "Tympanic membrane perforation",
            "Cholesteatoma",
            "Tympanosclerosis",
            "Grommet in situ",
          ],
        },
      ],
    },
  ];

  const [answers, setAnswers] = useState({});

  const updateAnswer = (question, value) => {
    setAnswers((prev) => ({ ...prev, [question]: value }));
  };

  return (
    <div style={{  margin: "0 auto" }}>
         <h2 style={styles.title}>Hearing</h2>
      {sections.map((section, si) => (
        <div key={si} style={styles.card}>
           
          <div style={styles.sectionTitle}>{section.header}</div>

          {section.groups.map((g, gi) => (
            <div key={gi}>
              {g.title && <div style={styles.groupTitle}>{g.title}</div>}

              {g.items.map((item, qi) => (
                <div key={qi} style={styles.row}>
                  <div style={styles.label}>{item}</div>

                  <div style={styles.radioGroup}>
                    <label>
                      <input
                        style={styles.radio}
                        type="radio"
                        name={item}
                        value="YES"
                        checked={answers[item] === "YES"}
                        onChange={() => updateAnswer(item, "YES")}
                      />{" "}
                      YES
                    </label>

                    <label>
                      <input
                        style={styles.radio}
                        type="radio"
                        name={item}
                        value="NO"
                        checked={answers[item] === "NO"}
                        onChange={() => updateAnswer(item, "NO")}
                      />{" "}
                      NO
                    </label>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
