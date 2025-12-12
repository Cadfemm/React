import React from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
const API = "http://127.0.0.1:5000"; // backend base URL

const api = axios.create({
  baseURL: API,
});
function PatientSummary({ patient, icdPath, icdCode, icfSummary, ichiSummary, gasSummary = [], }) {
  const dob = (patient.dob_year && patient.dob_month && patient.dob_day)
    ? `${patient.dob_year}-${patient.dob_month}-${patient.dob_day}` : "";
const exportToPDF = () => {
  const doc = new jsPDF();

  const margin = 10;
  const pageHeight = doc.internal.pageSize.height;
  let yPos = margin;

  const lineHeight = 6; // Adjust line spacing
  const spaceBetweenSections = 10; // Space between different sections

  // Set Title and Patient Info
  doc.setFontSize(16);
  doc.text("Patient Summary", margin, yPos);
  yPos += lineHeight + spaceBetweenSections;

  doc.setFontSize(12);
  doc.text(`Patient ID: ${patient.patient_id || "—"}`, margin, yPos);
  yPos += lineHeight;
  doc.text(`Name: ${patient.patient_name || "—"}`, margin, yPos);
  yPos += lineHeight;
  doc.text(`Date of Birth: ${dob || "—"}`, margin, yPos);
  yPos += lineHeight;
  doc.text(`Gender: ${patient.gender || "—"}`, margin, yPos);
  yPos += lineHeight;
  doc.text(`Marital Status: ${patient.marital || "—"}`, margin, yPos);
  yPos += lineHeight;
  doc.text(`Nationality: ${patient.nationality || "—"}`, margin, yPos);
  yPos += lineHeight;
  doc.text(`Occupation: ${patient.occupation || "—"}`, margin, yPos);
  yPos += lineHeight;

  doc.text(`Register Date: ${reg || "—"}`, margin, yPos);
  yPos += spaceBetweenSections;

  // Add ICD
  doc.text("ICD:", margin, yPos);
  yPos += lineHeight;
  doc.text(breadcrumb || "—", margin, yPos);
  yPos += spaceBetweenSections;

  // Add ICF Summary
  doc.text("ICF Selections:", margin, yPos);
  yPos += lineHeight;
  if (icfSummary.length === 0) {
    doc.text("No ICF selection recorded.", margin, yPos);
    yPos += lineHeight;
  } else {
    icfSummary.forEach((x, i) => {
      doc.text(`${x.parent_icf}: ${x.parent_name}`, margin, yPos);
      yPos += lineHeight;
      doc.text(`${x.child_icf}: ${x.child_name}`, margin, yPos);
      yPos += lineHeight;
      if (x.range || x.qualifier_label) {
        doc.text(`Qualifier: ${x.qualifier_label || "—"}`, margin, yPos);
        yPos += lineHeight;
        if (x.range) doc.text(`Range: ${x.range}`, margin, yPos);
        yPos += lineHeight;
        if (Number.isFinite(x.score)) doc.text(`Score: ${x.score}`, margin, yPos);
        yPos += lineHeight;
      }
    });
  }
  yPos += spaceBetweenSections;

  // Add ICHI Summary
  doc.text("ICHI Actions:", margin, yPos);
  yPos += lineHeight;
  if (ichiSummary.selected.length === 0) {
    doc.text("No ICHI selected.", margin, yPos);
    yPos += lineHeight;
  } else {
    ichiSummary.selected.forEach((r, i) => {
      doc.text(`${r.ichi_code} — ${r.ichi_name}`, margin, yPos);
      yPos += lineHeight;
    });
  }
if (yPos > pageHeight - 20) {
  doc.addPage();
  yPos = margin;
}

  yPos += spaceBetweenSections;

  // Add Modalities
  doc.text("Modalities:", margin, yPos);
  yPos += lineHeight;
  if (ichiSummary.modalities.length === 0) {
    doc.text("No modalities selected.", margin, yPos);
    yPos += lineHeight;
  } else {
    ichiSummary.modalities.forEach((m, i) => {
      doc.text(`${m.label} — ${m.range_label || "—"} | ${m.duration_label || "—"}`, margin, yPos);
      yPos += lineHeight;
    });
  }

  yPos += spaceBetweenSections;

  // Add Clinical Note / Plan
  doc.text("Clinical Note / Plan:", margin, yPos);
  yPos += lineHeight;
  doc.text(ichiSummary.note || "No note provided.", margin, yPos);
  yPos += spaceBetweenSections;

  // Add GAS Goals
  doc.text("GAS Goals:", margin, yPos);
  yPos += lineHeight;
  if (gasSummary.length === 0) {
    doc.text("No GAS goals recorded.", margin, yPos);
    yPos += lineHeight;
  } else {
    gasSummary.forEach((g, i) => {
      doc.text(`${g.icf_child_code}: ${g.score > 0 ? `+${g.score}` : g.score} — ${g.label}`, margin, yPos);
      yPos += lineHeight;
    });
  }

  // Finalize and Download PDF
  doc.save(`patient_summary_${patient.patient_id || "unknown"}.pdf`);
};


  const reg = (patient.reg_year && patient.reg_month && patient.reg_day)
    ? `${patient.reg_year}-${patient.reg_month}-${patient.reg_day}` : "";
 
  const breadcrumb = icdPath.length
    ? icdPath.map(x => x.label).join("  ›  ")
    : (icdCode || "—");
 
  return (
    <section className="card">
      <div className="cardheading">
      <div className="card-head ">
       <h2 className="title">Patient summary</h2>
        <button className="btn ai" disabled title="AI mode (coming soon)">AI mode</button>
      </div>
      <p className="subtitle">A compact key sheet containing demographics and selections.</p>
 </div>
      {/* Patient */}
      <div className="grid2" style={{padding:25}}>
        <div className="box" style={{border:"1px solid rgb(206 203 237 / 63%)",padding:10,borderRadius:6}}>
          <div className="box-title">Patient details</div>
          <div className="kv"><span>Patient ID</span><strong>{patient.patient_id || "—"}</strong></div>
          <div className="kv"><span>Name</span><strong>{patient.patient_name || "—"}</strong></div>
          <div className="kv"><span>Register date</span><strong>{reg || "—"}</strong></div>
          <div className="kv"><span>Date of birth</span><strong>{dob || "—"}</strong></div>
          <div className="kv"><span>Gender</span><strong>{patient.gender || "—"}</strong></div>
          <div className="kv"><span>Marital status</span><strong>{patient.marital || "—"}</strong></div>
          <div className="kv"><span>Nationality</span><strong>{patient.nationality || "—"}</strong></div>
          <div className="kv"><span>Occupation</span><strong>{patient.occupation || "—"}</strong></div>
        </div>
 
        <div className="box" style={{border:"1px solid rgb(206 203 237 / 63%)",padding:10,borderRadius:6}}>
          <div className="box-title">ICD</div>
          <div style={{whiteSpace:"pre-wrap"}}>{breadcrumb}</div>
        </div>
      </div>
 
      {/* ICF */}
      <div className="box" style={{border:"1px solid rgb(206 203 237 / 63%)",padding:10,borderRadius:6,margin:"10px 25px"}}>
        <div className="box-title">ICF Selections</div>
        {icfSummary.length === 0 ? (
          <div className="muted">No ICF selection recorded.</div>
        ) : (
          <div className="icf-list">
            {icfSummary.map((x, i) => (
              <div className="icf-row" key={`${x.parent_icf}-${x.child_icf}-${i}`}>
                <div className="icf-head">
                  <span className="badge">{x.parent_icf}</span> {x.parent_name}
                </div>
                <div className="icf-sub">
                  <span className="badge soft">{x.child_icf}</span> {x.child_name}
                </div>
                {(x.range || x.qualifier_label) && (
                  <div className="icf-sub">
                    <span className="kv-inline"><b>Qualifier:</b> {x.qualifier_label || "—"}</span>
                    {x.range ? <span className="kv-inline"><b>Range:</b> {x.range}</span> : null}
                    {Number.isFinite(x.score) ? <span className="kv-inline"><b>Score:</b> {x.score}</span> : null}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
 
      {/* ICHI + Modalities */}
      <div className="grid2" style={{border:"1px solid rgb(206 203 237 / 63%)",padding:10,borderRadius:6, margin:"10px 25px"}}>
        <div className="box">
          <div className="box-title">ICHI Actions</div>
          {(!ichiSummary.selected || ichiSummary.selected.length===0) ? (
            <div className="muted">No ICHI selected.</div>
          ) : (
            <ul className="flat">
              {ichiSummary.selected.map((r,i)=>(
                <li key={`${r.icf_code}-${r.ichi_code}-${i}`}>
                  <strong>{r.ichi_code}</strong> — {r.ichi_name} <span className="dim">[{r.icf_code}]</span>
                </li>
              ))}
            </ul>
          )}
        </div>
 
        <div className="box">
          <div className="box-title">Modalities</div>
          {(!ichiSummary.modalities || ichiSummary.modalities.length===0) ? (
            <div className="muted">No modalities selected.</div>
          ) : (
            <div style={{display:"flex", flexWrap:"wrap", gap:6}}>
{ichiSummary.modalities.map((m,i)=>(
  <span key={`${m.value}-${i}`} className="chip">
    {m.label}
    { (m.range_label || m.duration_label) &&
      <span className="dim"> — {m.range_label || "—"} | {m.duration_label || "—"}</span>
    }
  </span>
))}

            </div>
          )}
        </div>
      </div>
 
      {/* Notes */}
      <div className="box" style={{border:"1px solid rgb(206 203 237 / 63%)",padding:10,borderRadius:6, margin:"10px 25px"}}>
        <div className="box-title">Clinical Note / Plan</div>
        <div className="note-view">
          {ichiSummary.note ? ichiSummary.note : <span className="muted">No note provided.</span>}
        </div>
      </div>
      {/* Assessments */}
<div className="box" style={{border:"1px solid rgb(206 203 237 / 63%)",padding:10,borderRadius:6 ,margin:"10px 25px"}}>
  <div className="box-title">Assessments</div>
  {(!ichiSummary.assessments || ichiSummary.assessments.length===0) ? (
    <div className="muted">No assessments recorded.</div>
  ) : (
    <ul className="flat">
      {ichiSummary.assessments.map((a, i) => (
        <li key={`${a.assessment}-${i}`}>
          <b>{a.assessment}</b>
          <ul className="flat" style={{marginTop:6, marginLeft:10}}>
            {a.items.map((it, j) => (
              <li key={`${a.assessment}-${it.input}-${j}`}>
                {it.input}{Number.isFinite(it.score) ? ` — score: ${it.score}` : ""}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  )}
</div>
<>
      {/* existing sections ... */}
     <div className="box" style={{border:"1px solid rgb(206 203 237 / 63%)",padding:10,borderRadius:6, margin:"10px 25px"}}> 
      <div className="box-title">GAS Goals</div>
      {!gasSummary.length && <div>-</div>}
      {gasSummary.map(g => (
        <div key={g.icf_child_code}>
          {g.icf_child_code}: {g.score > 0 ? `+${g.score}` : g.score} — {g.label}
        </div>
      ))}
    </div>
    <button className="btnexport" onClick={exportToPDF}>
  Export to PDF
</button>

    </>
    </section>
  );
}
export default PatientSummary;