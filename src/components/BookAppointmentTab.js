import React from "react";
import axios from "axios";
import { Field } from "../pages/Menu";
const API = "http://127.0.0.1:5000"; // backend base URL

const api = axios.create({
  baseURL: API,
});


function BookAppointmentTab({ patient }) {
  // simple local state for demo behavior
  const [subjective, setSubjective] = React.useState("Low back pain after manual handling incident.");
  const [objective, setObjective] = React.useState("SLR 70° R; core weakness; no neuro deficit.");

  return (
    <div style={{ padding: "12px" }}>
      {/* PAGE TITLE */}
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 18, fontWeight: 700 }}>Integrated EMR · RAP · TPS</div>
        <div className="dim" style={{ fontSize: 12 }}>
          This version explicitly includes “Book Appointment” and “Order Investigations” buttons at all key workflow locations.
        </div>
      </div>

      {/* Patient Registry */}
      <section className="card" style={{ marginBottom: 12 }}>
        <div className="cardheading"><h2 className="title">Patient Registry</h2></div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 ,margin: "0px 25px"}}>
          {/* Patient card 1 */}
          <div className="box soft" style={{ justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontWeight: 600 }}>Jhon Doe — <span className="dim">PT-0001</span></div>
              <div className="dim" style={{ fontSize: 12 }}>PERKESO RTW</div>
            </div>
            <div style={{ display: "flex", gap: 8 , marginTop:20}}>
              <button className="btn ba">Book Appointment</button>
              <button className="btn oi">Order Investigations</button>
            </div>
          </div>

          {/* Patient card 2 */}
          <div className="box soft" style={{ justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontWeight: 600 }}>Siti Nur H — <span className="dim">PT-0002</span></div>
              <div className="dim" style={{ fontSize: 12 }}>Self / PERKESO</div>
            </div>
            <div style={{ display: "flex", gap: 8 ,marginTop:20}}>
              <button className="btn ba">Book Appointment</button>
              <button className="btn oi">Order Investigations</button>
            </div>
          </div>
        </div>
      </section>

      {/* Encounter / Assessment (SOAP-lite) */}
      <section className="card" style={{ marginBottom: 12 }}>
        <div className="cardheading">
          <h2 className="title">Encounter / Assessment</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, alignItems: "start" ,margin: "0px 25px"}}>
          <div>
            <div className="label">Subjective</div>
            <textarea className="input ta" rows={3} value={subjective} onChange={e=>setSubjective(e.target.value)} />
          </div>
          <div>
            <div className="label">Objective</div>
            <textarea className="input ta" rows={3} value={objective} onChange={e=>setObjective(e.target.value)} />
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, marginTop: 10, justifyContent: "flex-end" ,margin: "0px 25px"}}>
          <button className="btn ba">Schedule Follow-up</button>
          <button className="btn oi">Order Investigations</button>
        </div>
      </section>

      {/* Problem List (ICD-11) */}
      <section className="card" style={{ marginBottom: 12, position: "relative" }}>
        <div className="cardheading"><h2 className="title">Problem List (ICD-11)</h2></div>

        <div style={{ display: "grid", gap: 8 , margin:"0px 20px"}}>
          {/* Row 1 */}
          <div className="box soft" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontWeight: 600 }}>MG30.01 — Lumbar disc protrusion</div>
              <div className="dim" style={{ fontSize: 12 }}>Onset: 2025-07-02</div>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              <button className="btn ba">Book related session</button>
              <button className="btn oi">Order X-ray</button>
              <button className="btn oi">Order Investigations</button>
            </div>
          </div>

          {/* Row 2 */}
          <div className="box soft" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontWeight: 600 }}>FA11 — Low back pain</div>
              <div className="dim" style={{ fontSize: 12 }}>Onset: 2025-06-20</div>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              <button className="btn ba">Plan session</button>
              <button className="btn oi">Order Labs</button>
            </div>
          </div>
        </div>

        {/* floating actions (mimic +New Appointment / +Order Investigations) */}
        <div style={{ position: "fixed", right: 16, bottom: 16 , zIndex: 9999,              // <-- keep above all cards
    display: "flex",
    flexDirection: "column",
    gap: 12}}>
          <div style={{  marginBottom:20 }}>
            <button style={{  backgroundColor:"green" , color:"#fff" ,marginBottom:20 ,padding:"7px 15px"}}className="btn ba">+ New Appointment</button>
            <button style={{  backgroundColor:"#fff", border:"2px solid green" }}className="btn oi">+ Order Investigations</button>
          </div>
        </div>
      </section>

      {/* Interventions (ICHI) */}
      <section className="card" style={{ marginBottom: 12 }}>
        <div className="cardheading"><h2 className="title">Interventions (ICHI)</h2></div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12,margin:"0px 20px " }}>
          {/* Therapeutic exercise */}
          <div className="box soft" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ fontWeight: 600 }}>7500 — Therapeutic exercise</div>
            <div className="dim" style={{ fontSize: 12 }}>3×/week • 45min</div>
            <div style={{ display: "flex", gap: 6 }}>
              <button className="btn ba">Book</button>
              <button className="btn oi">Order pre-proc labs</button>
            </div>
          </div>

          {/* Work conditioning */}
          <div className="box soft" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ fontWeight: 600 }}>7510 — Work conditioning</div>
            <div className="dim" style={{ fontSize: 12 }}>2×/week • 60min</div>
            <div style={{ display: "flex", gap: 6 }}>
              <button className="btn ba">Book</button>
            </div>
          </div>

          {/* Ergonomics education */}
          <div className="box soft" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ fontWeight: 600 }}>7W03 — Ergonomics education</div>
            <div className="dim" style={{ fontSize: 12 }}>1×/week</div>
            <div style={{ display: "flex", gap: 6 }}>
              <button className="btn ba">Book</button>
            </div>
          </div>
        </div>
      </section>

      {/* TPS — Task Performance */}
      <section className="card" style={{ marginBottom: 12 }}>
        <div className="cardheading"><h2 className="title">TPS — Task Performance</h2></div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 ,margin:"0px 20px "}}>
          <div className="box soft" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontWeight: 600 }}>Lift 10kg crate</div>
              <div className="dim" style={{ fontSize: 12 }}>Result: Completed with mild pain</div>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              <button className="btn ba">Book Next TPS</button>
              <button className="btn oi">Order ECG</button>
            </div>
          </div>

          <div className="box soft" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontWeight: 600 }}>Overhead reach 1 min</div>
              <div className="dim" style={{ fontSize: 12 }}>Result: Requires pacing</div>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              <button className="btn ba">Book Retest</button>
            </div>
          </div>
        </div>
      </section>

      {/* RAP / RTW Plan */}
      <section className="card" style={{ marginBottom: 12 }}>
        <div className="cardheading"><h2 className="title">RAP / RTW Plan</h2></div>

        <div className="box soft" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" ,margin:"0px 20px "}}>
          <div>
            <div style={{ fontWeight: 600 }}>RTW — Milestone: 30 days</div>
            <div className="dim" style={{ fontSize: 12 }}>Target: Light duty</div>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <button className="btn ba">Create RTW schedule</button>
            <button className="btn oi">Order FCE</button>
          </div>
        </div>
      </section>

      {/* Discharge & Follow-up */}
      <section className="card">
        <div className="cardheading"><h2 className="title">Discharge & Follow-up</h2></div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
          <div className="box soft" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" ,margin:"0px 20px "}}>
            <div>
              <div style={{ fontWeight: 600 }}>30 day phone review</div>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              <button className="btn ba">Book 30d</button>
            </div>
          </div>

          <div className="box soft" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontWeight: 600 }}>60 day onsite review</div>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              <button className="btn ba">Book 60d</button>
              <button className="btn oi">Order 6-week XR</button>
            </div>
          </div>

          <div className="box soft" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontWeight: 600 }}>90 day sustainability check</div>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              <button className="btn ba">Book 90d</button>
            </div>
          </div>
        </div>

        <div className="dim" style={{ fontSize: 12, marginTop: 8 }}>
          CARF: 30 / 60 / 90 checks
        </div>
      </section>
    </div>
  );
}
export default BookAppointmentTab;