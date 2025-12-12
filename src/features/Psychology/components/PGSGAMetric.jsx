import React, { useState } from "react";

export default function PGSGAMetric() {

  const [data, setData] = useState({});

  const setField = (section, field, value) => {
    setData(prev => ({
      ...prev,
      [section]: {
        ...(prev[section] || {}),
        [field]: value
      }
    }));
  };

  // UI helper
  const RadioRow = ({ section, field, label, options }) => (
    <tr>
      <td>{label}</td>
      {options.map(o => (
        <td key={o}>
          <input
            type="radio"
            name={`${section}-${field}`}
            value={o}
            onChange={() => setField(section, field, o)}
          /> {o}
        </td>
      ))}
    </tr>
  );

  return (
    <div style={{ padding: 20 }}>

      <h2>Subjective Global Assessment (SGA)</h2>

      {/* SUBCUTANEOUS FAT */}
      <h3>Subcutaneous Fat</h3>
      <table className="sga-table">
        <thead>
          <tr>
            <th>Area</th>
            <th>Normal</th>
            <th>Mild/Moderate</th>
            <th>Severe</th>
          </tr>
        </thead>

        <tbody>
          <RadioRow
            section="fat"
            field="eyes"
            label="Under the eyes"
            options={["Normal", "Mild", "Severe"]}
          />

          <RadioRow
            section="fat"
            field="triceps"
            label="Triceps"
            options={["Normal", "Mild", "Severe"]}
          />

          <RadioRow
            section="fat"
            field="ribs"
            label="Ribs / Lower back"
            options={["Normal", "Mild", "Severe"]}
          />
        </tbody>
      </table>

      {/* MUSCLE WASTING */}
      <h3>Muscle Wasting</h3>
      <table className="sga-table">
        <thead>
          <tr>
            <th>Area</th>
            <th>Normal</th>
            <th>Mild</th>
            <th>Severe</th>
          </tr>
        </thead>

        <tbody>
          <RadioRow section="muscle" field="temple" label="Temple" options={["Normal", "Mild", "Severe"]}/>
          <RadioRow section="muscle" field="clavicle" label="Clavicle" options={["Normal", "Mild", "Severe"]}/>
          <RadioRow section="muscle" field="shoulder" label="Shoulder" options={["Normal", "Mild", "Severe"]}/>
          <RadioRow section="muscle" field="scapula" label="Scapula" options={["Normal", "Mild", "Severe"]}/>
        </tbody>
      </table>

      {/* FLUID RETENTION */}
      <h3>Fluid Retention</h3>
      <table className="sga-table">
        <thead>
          <tr>
            <th>Area</th>
            <th>Normal</th>
            <th>Mild</th>
            <th>Severe</th>
          </tr>
        </thead>

        <tbody>
          <RadioRow section="fluid" field="edema" label="Edema" options={["Normal", "Mild", "Severe"]}/>
          <RadioRow section="fluid" field="ascites" label="Ascites" options={["Normal", "Mild", "Severe"]}/>
        </tbody>
      </table>

      {/* TEXT SECTIONS FROM PAGE 2 */}
      <h3>SGA Questions</h3>

      <label>Weight change past 6 months</label>
      <input className="input" onChange={e => setField("questions", "w6", e.target.value)}/>

      <label>Weight change past 2 weeks</label>
      <input className="input" onChange={e => setField("questions", "w2", e.target.value)}/>

      <label>Dietary intake</label>
      <input className="input" onChange={e => setField("questions", "diet", e.target.value)}/>

      <label>GI Symptoms</label>
      <input className="input" onChange={e => setField("questions", "gi", e.target.value)}/>

      <label>Functional capacity</label>
      <input className="input" onChange={e => setField("questions", "func", e.target.value)}/>

      <label>Change past 2 weeks</label>
      <input className="input" onChange={e => setField("questions", "change", e.target.value)}/>

      <br/><br/>

      <button className="btn">Save SGA Assessment</button>

    </div>
  );
}
