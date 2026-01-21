import * as React from "react";
import { useHistory } from "react-router-dom";

export default function HomeDashboard() {
  const history = useHistory();
  return (
    <div className="home-wrap" style={{minHeight:"100vh", background:"#f6f8fb"}}>
      {/* Top Navbar */}
      {/* <header style={{background:"#fff", borderBottom:"1px solid #e6e9ef"}}>
        <div style={{maxWidth:1280, margin:"0 auto", padding:"10px 16px", display:"flex", alignItems:"center", gap:18}}>
          <div style={{display:"flex", alignItems:"center", gap:8, fontWeight:800}}>
            <div style={{background:"#0b62ff", color:"#fff", padding:"6px 10px", borderRadius:8}}>PERKESO</div>
            <div>Rehab</div>
            <div className="dim" style={{marginLeft:8}}>— EMR · RAP · TPS</div>
            <div className="dim" style={{marginLeft:8}}>— Admin Console</div>
          </div>

          <nav style={{display:"flex", gap:16, marginLeft:24}}>
            {["Home","Patients","Appointments","Orders","TPS","RAP / RTW","Case Mgmt","Resources","Billing","Reports","Compliance","Integrations","Settings"].map(x=>(
              <a key={x} className="top-link" href="#" style={{fontSize:14, color:"#0f172a", textDecoration:"none"}}>{x}</a>
            ))}
          </nav>

          <div style={{marginLeft:"auto", display:"flex", alignItems:"center", gap:10}}>
            <div style={{position:"relative"}}>
              <Search size={16} style={{position:"absolute", left:10, top:10, opacity:.6}}/>
              <input placeholder="Search (patients, orders, …)" style={{
                padding:"8px 12px 8px 32px", border:"1px solid #e6e9ef", borderRadius:8, width:300, fontSize:13
              }}/>
            </div>
            <button className="btn" style={{display:"flex", alignItems:"center", gap:6}}><Plus size={16}/>New</button>
            <button className="btn">Admin</button>
          </div>
        </div>
      </header> */}

      {/* Body */}
      <div style={{ margin:"16px auto", padding:"0 16px",}}>
   <div style={{display:"flex", justifyContent:"flex-end", margin: "2px 12px"}}>
<button onClick={() => history.push("/menu/new")}
  className="btn topbtn" style={{padding: "5px 15px",marginBottom:15,
    backgroundColor: "#3A3FAD",
    color:" #fff",
    margin: "5px",}}>
  New Patient
</button>

  <button onClick={() => history.push("/menu/existing")} className="btn topbtn" style={{padding: "5px 15px",marginBottom:15,
    backgroundColor: "#3A3FAD",
    color:" #fff",
    margin: "5px",}} >
  Existing Patient
</button>



  </div> 

        {/* RIGHT CONTENT (dashboard cards like image 1) */}
        <main>
          {/* Welcome + System status + Alerts column */}
          <div style={{display:"grid", gridTemplateColumns:"1fr 360px", gap:16}}>
            <section style={{background:"#fff", border:"1px solid #e6e9ef", borderRadius:12, padding:16}}>
              <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                <div>
                  <div style={{fontSize:18, fontWeight:700}}>Welcome, Chief Therapist</div>
                  <div className="dim" style={{fontSize:13}}>Overview — Integrated EMR · RAP · TPS (PERKESO)</div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div className="dim" style={{fontSize:12}}>System status</div>
                  <div style={{fontSize:13, fontWeight:600}}>All services operational <span style={{color:"#16a34a"}}>✔</span></div>
                  <div className="dim" style={{fontSize:12}}>Last sync: 2025-09-08 08:12</div>
                </div>
              </div>

              {/* KPI cards row */}
              <div style={{display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginTop:12}}>
                {[
                  {title:"Active Therapy Sessions (today)", value:"48", note:"Utilization: 82%"},
                  {title:"Pending Appointments", value:"12", note:"No-shows: 2"},
                  {title:"Investigation Orders (pending)", value:"9", note:"Awaiting scheduling / specimens"},
                  {title:"Open RTW cases", value:"27", note:"30/60/90 tracking"}
                ].map((c,i)=>(
                  <div key={i} style={{border:"1px solid #eef1f6", borderRadius:10, padding:12}}>
                    <div className="dim" style={{fontSize:12}}>{c.title}</div>
                    <div style={{fontSize:28, fontWeight:800, margin:"6px 0"}}>{c.value}</div>
                    <div className="dim" style={{fontSize:12}}>{c.note}</div>
                  </div>
                ))}
              </div>

              {/* Clinics + Resource utilization */}
              <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginTop:12}}>
                <div style={{border:"1px solid #eef1f6", borderRadius:10, padding:12}}>
                  <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                    <div style={{fontWeight:700}}>Today’s Clinics — Overview</div>
                    <div className="dim" style={{fontSize:12}}>Filter: Dept</div>
                  </div>
                  <div className="dim" style={{fontSize:13, marginTop:6, lineHeight:1.6}}>
                    • Physio AM — Slots 08:00–12:00 — Booked 18/20<br/>
                    • OT PM — Slots 13:00–17:00 — Booked 10/12<br/>
                    • Nursing — Procedures — Booked 6/8
                  </div>
                  <button className="btn" style={{marginTop:10}}>Open Scheduler</button>
                </div>

                <div style={{border:"1px solid #eef1f6", borderRadius:10, padding:12}}>
                  <div style={{fontWeight:700}}>Resource Utilization</div>
                  <div className="dim" style={{fontSize:12}}>Rooms / Equip</div>
                  <div className="dim" style={{fontSize:13, marginTop:6, lineHeight:1.6}}>
                    • TPS Lab — 75% booked<br/>
                    • Hydrotherapy pool — 40% booked<br/>
                    • DME inventory — Low: 3 items
                  </div>
                  <button className="btn" style={{marginTop:10}}>Manage Resources</button>
                </div>
              </div>

              {/* Quick actions */}
              <div style={{border:"1px solid #eef1f6", borderRadius:10, padding:12, marginTop:12}}>
                <div style={{fontWeight:700, marginBottom:8}}>Quick actions</div>
                <div style={{display:"flex", gap:10, flexWrap:"wrap"}}>
                  <button className="btn">Bulk schedule</button>
                  <button className="btn">Create RTW plan</button>
                  <button className="btn">Audit & Compliance</button>
                  <button className="btn">Generate report</button>
                </div>
              </div>

              {/* Compliance */}
              <div style={{border:"1px solid #eef1f6", borderRadius:10, padding:12, marginTop:12}}>
                <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                  <div style={{fontWeight:700}}>Compliance — CARF / RTW checks</div>
                  <div className="dim" style={{fontSize:12}}>Next review: 30 days</div>
                </div>
                <ul className="dim" style={{fontSize:13, marginTop:6, lineHeight:1.7}}>
                  <li>30-day follow-ups scheduled: 18/20</li>
                  <li>60-day onsite checks pending: 5</li>
                  <li>90-day sustainability reviews: 7</li>
                </ul>
              </div>

              {/* Footer note */}
              <div className="dim" style={{fontSize:12, marginTop:12}}>
                PERKESO Rehab — Integrated EMR • RAP • TPS • Demo
              </div>
            </section>

            {/* Alerts / Staffing / Integrations column */}
            <aside style={{display:"grid", gap:12, alignSelf:"start"}}>
              <div style={{background:"#fff", border:"1px solid #e6e9ef", borderRadius:12, padding:12}}>
                <div style={{fontWeight:700, marginBottom:8}}>Alerts & Tasks</div>
                <div style={{display:"grid", gap:10}}>
                  <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                    <div><b>Order ORD-2002</b> needs scheduling — Patient PT-0002</div>
                    <button className="btn">Schedule</button>
                  </div>
                  <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                    <div><b>Provider shortage</b> — Physio PM, 2 shifts unfilled</div>
                    <button className="btn">Fix Roster</button>
                  </div>
                  <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                    <div><b>CARF audit</b> — prepare documents</div>
                    <button className="btn">View</button>
                  </div>
                </div>
              </div>

              <div style={{background:"#fff", border:"1px solid #e6e9ef", borderRadius:12, padding:12}}>
                <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                  <div style={{fontWeight:700}}>Staffing & Rosters</div>
                  <div className="dim">Today</div>
                </div>
                <ul className="dim" style={{fontSize:13, marginTop:6, lineHeight:1.7}}>
                  <li>Therapists on duty: 12</li>
                  <li>Case Managers: 3</li>
                  <li>Available locums: 1</li>
                </ul>
                <button className="btn" style={{marginTop:8}}>Manage Rosters</button>
              </div>

              <div style={{background:"#fff", border:"1px solid #e6e9ef", borderRadius:12, padding:12}}>
                <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                  <div style={{fontWeight:700}}>Integrations</div>
                  <div className="dim">Health IT</div>
                </div>
                <ul className="dim" style={{fontSize:13, marginTop:6, lineHeight:1.7}}>
                  <li>HL7/FHIR: Enabled</li>
                  <li>Google/Outlook Sync: Enabled</li>
                  <li>Fleet: Connected</li>
                </ul>
                <button className="btn" style={{marginTop:8}}>Manage Integrations</button>
              </div>

              <div className="dim" style={{fontSize:12, textAlign:"right"}}>Need help? Contact IT Ops</div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}

/* Optional: a couple of light utility styles (or rely on your existing .btn/.dim) */
