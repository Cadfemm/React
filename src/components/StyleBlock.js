import { Style } from "@material-ui/icons";
import React from "react";
function StyleBlock() {
  return (
    <style>{`
      :root { --bg:#f6fbff; --ink:#000332; --ink2:#5a6b85; --stroke:#e6eef7; --focus:#2563eb; }
      * { box-sizing:border-box; }
      body { margin:0; background:var(--bg); font-family:system-ui, Segoe UI, Roboto, Helvetica, Arial, sans-serif; }
      .page { display:grid; grid-template-columns:300px 1fr; min-height:100vh;background-color:#F1F4F4 !important; }
      .rail { background:#fff; box-shadow: 2px 0 8px rgb(0 0 0 / 3%);color:#cbd5e1;gap:12px; 
               position:sticky; top:0; padding-top:45px; height:100vh; display:flex; flex-direction:column;  }
      .brand { color:#e2e8f0; font-weight:900; letter-spacing:.2px; padding:10px 12px; border-radius:12px;
               background:rgba(255,255,255,.04); box-shadow:inset 0 0 0 1px rgba(255,255,255,.05); }
      .tabs { display:flex; flex-direction:column;  }
      .tab {
  appearance:none;
  padding:16px 10px;
  font-size:14px;
  width:100%;
  text-align:left;
  background:#fff;
  color:#000332 !important;
  border:0;
  border-radius:12px;
  cursor:pointer;
  transition:background .18s, color .18s, box-shadow .18s, transform .02s;
  display:flex; align-items:center; gap:8px; /* NEW */
}

      .tab:hover { background:rgb(190 205 207 / 22%); color:#fff; }
      .tab:active { transform:translateY(1px); }
      .tab.active { color:#fff; background:rgb(190 205 207 / 22%);
                    box-shadow: inset 0 0 0 1px rgba(255,255,255,.12), 0 10px 24px rgba(2,132,199,.18); }
      .tab:focus-visible { outline:none; box-shadow:0 0 0 3px rgba(56,189,248,.45); }
 
      // .main { padding:24px; }
      .card { background:transparent; border:none; }
      .title { margin:0 0 6px; color:#3A3FAD; font-size:1.5rem; line-height:1.8em}
      .subtitle { margin:0 0 14px; color:var(--ink2); }
      .note { margin-top:10px; border:1px solid #e0e7ff; background:#f6f9ff; padding:10px; border-radius:10px; color:#3b5bcc; }
 /* Inner top tabs (image-2 style) */
.innerTabs { display:flex; gap:16px; flex-wrap:wrap;background:#EEF6FF;font-weight:500; color:#000332; border-bottom:1px solid #EEF6FF; }
.innerTab { appearance:none; background:transparent; border:0; padding:8px 10px; font-weight:500; color:#000332; border-radius:8px; }
.innerTab.active {  color:#000332; border-bottom:3px solid #3A3FAD;border-radius:0; }
.innerTab:disabled {  cursor:not-allowed;font-weight:500; color:#000332; }
.innerTab:hover { background:rgb(190 205 207 / 22%);  }

/* Blue strip titles like the screenshot */
.barTitle { font-weight:600; color:#000332; padding:40px 10px 20px 10px;  }
/* Outer panel to mimic the bordered card in the screenshot */
.landing-frame {


  padding: 24px 24px 32px;
  background: #ffffff;
 
  border-radius: 4px;
}

/* Title + subtitle centered */
.landing-header {
  text-align: center;
  margin-bottom: 12px;
}
.landing-header h1 {
  margin: 0 0 4px 0;
  font-weight: 700;
  font-size: 50px; /* adjust if needed */
  color: #3A3FAD;
}
.landing-header p {
  margin: 0;
  color: #000;
  font-size: 25px;
}

/* Two-column body: image left, buttons right */
.landing-body {
  display: grid;
  grid-template-columns: 1fr 500px;
  gap: 32px;
  align-items: center;
  margin-top: 56px;
}

/* Illustration */
.landing-hero img {
  display: block;
  width: 650px;
  height: 400px;
  margin: 0 auto;
  border-radius: 4px; /* optional */
}

/* Buttons column */
.landing-actions {
  display: flex;
  flex-direction: column;
  gap: 24px;
  justify-content: center;
}

/* Outline buttons (rounded, orange border like screenshot) */
.cta-btn {
  width: 100%;
  padding: 16px 20px;
  background: #fff;
  border: 0.8px solid #3A3FAD;         /* orange outline */
  border-left:4px solid #f14f2c;
  color: #111827;
  font-size: 16px;
  border-radius: 12px;
  cursor: pointer;
  transition: box-shadow .15s ease, transform .05s ease, background .15s ease;
}
.cta-btn:hover {
  background: #fff8f5;
  box-shadow: 0 4px 14px rgba(0,0,0,0.06);
}
.cta-btn:active {
  transform: translateY(1px);
}

/* Responsive: stack on small screens */
@media (max-width: 820px) {
  .landing-body { grid-template-columns: 1fr; }
  .landing-actions { max-width: 320px; margin: 0 auto; width: 100%; }
}


      .row { display:grid; grid-template-columns:260px 1fr; gap:14px; align-items:center; margin:12px 25px; }
      .label { font-weight:500; color:#000332;font-size:16px; display:flex; align-items:center; gap:8px; }
      .input { width:100%; padding:0px 10px; border-radius:12px; border:1px solid #dbe6f3; background:#fff;height:40px;font-size:15px;  }
      .input:focus { outline:none; border-color:var(--focus); box-shadow:0 0 0 3px rgba(37,99,235,.12); }
      .triple { display:flex; gap:8px; align-items:center; }
      .form { margin:0; padding:5px 10px 10px 10px; border-radius:10px; box-shadow:0 !important; display:block; }
      .actions { display:flex; gap:10px; padding-top:10px; }
      .btn {
    appearance: none;
    background: transparent;
    border: 0;
    padding: 8px 10px;
    
    font-weight: 500;
    color: #000332;
    border-radius: 8px;
}

/* --- VITALS UI --- */
.vitals { --bg:#fbfdff; --bd:#e6eef6; --text:#0f172a; --muted:#6b7a90; --ring:#90b4ff; }
.vitals .section { background: var(--bg); border: 1px solid var(--bd); border-radius: 12px; padding: 12px 16px; }
.vitals .grid { display:grid; grid-template-columns: repeat(12, minmax(0,1fr)); gap: 10px; }
.vitals .field { display:flex; flex-direction:column; }
.vitals .label-sm { font-size:13px; color:#323e4e; margin:2px 0 4px; }
.vitals .control { position:relative; }
.vitals .input-sm, .vitals .select-sm, .vitals .ta-sm {
  width:100%; height:34px; padding:6px 10px; border:1px solid #9daab7; border-radius:6px;
  background:#fff; outline:0; font-size:13px;
}
.vitals .ta-sm { height:auto; resize:vertical; }
.vitals .input-sm:focus, .vitals .select-sm:focus, .vitals .ta-sm:focus {
  background:#fff; border-color:var(--ring); box-shadow:0 0 0 3px rgba(59,130,246,.15);
}
.vitals .num { text-align:right; }
.vitals .addon { position:absolute; right:8px; top:7px; font-size:12px; color:#9aa4b2; pointer-events:none; }
.vitals .right { text-align:right; }
.vitals .chip-info { font-size:12px; color:#94a3b8; }
.vitals .btn-link { border:0; background:transparent; color:#2563eb; cursor:pointer; padding:0 4px; height:auto; }
.vitals .vtable { width:100%; border-collapse:separate; border-spacing:0 8px; }
.vitals .vtable th { font-size:12px; color:#fff; font-weight:600; padding:0 6px 2px;  }
.vitals .vrow { display:grid; grid-template-columns: 120px repeat(3, 1fr); gap:10px;row-gap: 20px;margin-bottom:20px;  align-items:center; }
.vitals .vrow .pos { color:var(--text); font-size:13px; padding-left:6px; }


      .btn.active {
    color: #000332;
    border-bottom: 3px solid #3A3FAD;
    border-radius: 0;
}
 .ba{
    border: 2px solid #1a1c1a;
    background-color: #fff;
    color: #343fac;
    padding: 0px 5px;
}
    .oi {
    border: 2px solid #2c2828;
}
      /* chips */
      .chip { display:inline-flex; align-items:center; gap:6px; padding:4px 8px;
               border:1px solid #cfe1ff; border-radius:10px;  }
      .chip-x { border:0; background:transparent; cursor:pointer; font-weight:800;
    color: #000332 !important;
    margin: 0px !important; }
 
      /* multiselect */
      .ms { position:relative; }
      .catTabs {
  display:flex; gap:8px; flex-wrap:wrap; margin:4px 0 10px;
}
  .buttonbar{
    display: flex
;
    gap: 16px;
   
    flex-wrap: wrap;
    background: #EEF6FF;
    font-weight: 500;
    color: #000332;
    border-bottom: 1px solid #EEF6FF;
}
.catTab {
  padding:8px 12px; border-radius:10px;
  border:1px solid #dbe6f3; background:#fff; cursor:pointer;
  font-weight:700; color:#000332;
}
.catTab.active {
  background:#000332; border-color:#000332; color:#fff;
}
  /* RAP layout — airy, not congested */
.rap-wrap { padding: 0 10px 10px; }
.rap-header { display:flex; align-items:center; justify-content:space-between; margin: 20px 25px 10px; }
.pill.right { padding:6px 10px; border-radius:999px; background:#eef6ff; border:1px solid #cfe1ff; color:#000332; font-weight:500; }

.rap-card { margin: 12px 5px; padding: 16px; background:#fff; border-radius:10px; border:1px solid #e6eef7; }
.check-grid {
  display:grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px 18px;
  margin-top: 8px;
}
.check { display:flex; gap:10px; align-items:center; color:#000332; }
.check input { transform: translateY(1px); }
/* Dashboard */
.dash-wrap { padding: 0 10px 10px; }
.dash-card {
  background:#fff; border:1px solid #e6eef7; border-radius:12px;
  padding:16px; margin: 12px 25px;
}
  
  .user{
  cursor: pointer; 
      
      height: 250px; 
      border: 1px solid #ddd; 
      border-radius: 8px; 
      padding: 20px; 
      textAlign: center; 
      boxShadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      background: #fff;}
.glance-head { display:flex; gap:20px; align-items:flex-start; justify-content:space-between; }
.g-title { font-weight:600; color:#000332; margin-bottom:10px; }
.g-row { display:grid; grid-template-columns: 160px 1fr; gap:12px; margin:10px 0; }
.g-label { font-size:12px; color:#6b7280; letter-spacing:.2px; font-weight:600; }
.g-name { font-weight:700; color:#0f172a; }
.g-meta { color:#475569; font-size:13px; margin-top:2px; }
.g-tags { display:flex; gap:6px; flex-wrap:wrap; }
.tag {
  display:inline-flex; gap:6px; padding:4px 8px;
  border-radius:9999px; background:#f7fafc; border:1px solid #e6eef7; color:#0f172a;
}
.topbtn{
padding: 5px 15px;
    background-color: #3A3FAD;
    color: #fff;
    margin: 5px;
}
.glance-r { min-width: 280px; max-width: 360px; }
.rtw-title { font-weight:600; color:#000332; margin-bottom:6px; text-align:right; }
.rtw-bar { height:10px; border-radius:999px; background:#eef2ff; border:1px solid #dbe6f3; overflow:hidden; }
.rtw-fill { height:100%; background:#3A3FAD; }
.rtw-note { margin-top:6px; font-size:12px; color:#374151; text-align:right; }

.dash-table { width:100%; border-collapse:separate; border-spacing:0; margin-top:6px; }
.dash-table th, .dash-table td { border-bottom:1px solid #eef3fb; padding:10px; text-align:left; font-size:14px; }
.dash-table thead th { background:#f7fafc; color:#334155; font-weight:600; }

.progress-row { display:grid; grid-template-columns: 160px 1fr 60px; gap:12px; align-items:center; margin-top:14px; }
.progress { position:relative; height:10px; border-radius:8px; background:#eef2ff; overflow:hidden; border:1px solid #dbe6f3; }
.progress .bar { position:absolute; top:0; left:0; bottom:0; background:#3A3FAD; }
.pct { font-weight:600; color:#000332; text-align:right; }

.rap-form .row { display:grid; grid-template-columns: 220px 1fr; gap:14px; align-items:center; margin:10px 0; }
@media (max-width: 900px) {
  .rap-form .row { grid-template-columns: 1fr; }
  .check-grid { grid-template-columns: 1fr; }
  .progress-row { grid-template-columns: 1fr; }
  .pct { text-align:left; }
}
.audit-wrap .cardheading { display:flex; align-items: baseline; gap:16px; }
.audit-wrap .subtitle { color:#708090; margin-left:auto; font-size:12px; }
.audit-mode button { margin-left:6px; padding:4px 10px; border-radius:9999px; border:1px solid #ddd; background:#fff; cursor:pointer; }
.audit-mode .on { background:#eef2ff; border-color:#c7d2fe; }

.audit-timeline { position:relative; padding-left: 12px; }
.audit-timeline::before { content:""; position:absolute; left: 21px; top: 0; bottom: 0; width: 2px; background:#e6e8eb; }
.audit-day { padding-left: 36px; margin: 14px 0; }
.date-badge { display:inline-block; padding:2px 10px; border-radius:9999px; background:#f3f4f6; font-weight:600; font-size:12px; margin-bottom:8px; }
.audit-item { position:relative; background:#fff; border:1px solid #eee; border-radius:10px; padding:10px 12px; margin:10px 0; box-shadow:0 1px 2px rgba(0,0,0,0.03); }
.audit-item .dot { position:absolute; left:-30px; top:14px; width:10px; height:10px; border-radius:50%; background:#4f46e5; box-shadow:0 0 0 4px #eef2ff; }
.audit-item .when { font-size:12px; color:#6b7280; margin-bottom:4px; }
.audit-item .what { font-weight:500; }

.audit-table table { width:100%; border-collapse: collapse; }
.audit-table thead th { text-align:left; padding:10px; background:#15803d; color:#fff; }
.audit-table tbody td { padding:10px; border-bottom:1px solid #eee; vertical-align: top; }
.audit-table tbody tr:hover { background:#fafafa; }

/* Audit Trail */
.audit-wrap { padding-bottom: 10px; }
.audit-list { list-style:none; margin: 10px 25px; padding:0; }
.audit-list li { display:flex; gap:12px; align-items:flex-start; padding:10px 0; position:relative; }
.audit-list li + li { border-top: 1px dashed #e8eef8; }
.audit-list .dot { width:10px; height:10px; border-radius:50%; background:#3A3FAD; margin-top:8px; }
.audit-list .entry .when { font-weight:600; color:#000332; }
.audit-list .entry .what { color:#374151; margin-top:2px; }

.catTab:disabled { opacity:.5; cursor:not-allowed; }
      .ms-btn { width:100%; text-align:left; padding:10px 12px; border-radius:12px; border:1px solid #dbe6f3; background:#fff;color:#00345f; }
      .ms-caret { float:right; opacity:.6; }
      .ms-pop { position:absolute; z-index:20; margin-top:6px; width:100%; background:#fff; border:1px solid #dbe6f3;
                border-radius:12px; box-shadow:0 10px 28px rgba(12,46,87,.08); }
      .ms-hdr { padding:10px; border-bottom:1px solid #eef3fb; display:flex; gap:8px; align-items:center; }
      .ms-search { flex:1; padding:8px 10px; border-radius:8px; border:1px solid #dbe6f3; }
      .ms-actions { display:flex; gap:6px; }
      .ms-mini { padding:6px 8px; border-radius:8px; border:1px solid #dbe6f3; background:#f9fbff; cursor:pointer; color:#00345f; }
      .ms-list { max-height:260px; overflow:auto; padding:8px 10px; }
      .ms-item { display:flex; gap:8px; align-items:center; padding:6px 4px;font-size: 14px; }
      .ms-empty { padding:12px; color:#6b7280; }
 .savebtn{
 border:1px solid #000;background:#fff;color:#000;}
      /* Summary page */
      .grid2 { display:grid; grid-template-columns: 1fr 1fr; gap:12px; }
      // .box { border:1px solid var(--stroke); background:#fff; border-radius:12px; padding:12px; }
      .box-title { font-weight:500; color:#000332; margin-bottom:8px; font-size:16px;}
 .cardheading {
    background-color: white;
    padding: 25px;
    margin: 10px 25px;
    border-radius: 6px;
    border-left: 4px solid #3A3FAD;
}
    .savebtn:hover{
    background:#000;
    color:#fff;}
    .ms-btn:hover { background: transparent !important; }
    h2{font-size:1.5rem !important;  }
      .kv { display:flex; justify-content:space-between; gap:14px; padding:6px 0; border-bottom:1px dashed #edf2fb; }
      .kv:last-child { border-bottom:0; }
      .kv > span { color:#4b5563; }
      .kv-inline { margin-right:12px; color:#374151; }
 
      .icf-list { display:flex; flex-direction:column; gap:10px; }
      .icf-row { padding:10px; border:1px solid #e9eef7; border-radius:10px;  }
      .icf-head { margin-bottom:4px; }
      .icf-sub { color:#334155; }
      .badge { display:inline-flex; align-items:center; gap:6px; padding:2px 8px; border-radius:12px; background:#eef6ff; border:1px solid #cfe1ff;color:#000332; font-size:12px; }
      .badge.soft { background:#f7fafc; border-color:#e5edf7; }
 
      .pill { padding:8px 12px; border:1px solid #dbe6f3; border-radius:12px; background:#fff; }
     ul.flat { list-style:none; margin:0; padding-left:25px; }
      ul.flat li { margin:6px 0; }
      .dim { color:#6b7280; }
      .muted { color:#6b7280; }
 
      /* Top bar inside card */
      .card-head { display:flex !important; align-items:center; justify-content:space-between; margin-bottom: 6px; }
      .btn.ai { opacity:.7; cursor:not-allowed; background:#f5f7fb; border-color:#dbe6f3; }

/* SOAP / TPS / RAP visuals to match your screenshots */
.soap-head, .tps-head, .rap-head {
  display:flex; align-items:center; justify-content:space-between;
  padding: 10px 25px 0 25px;
}
.soap-title { font-weight:600; color:#000332; font-size:16px; }

.soap-grid {
  display:grid; grid-template-columns: 1fr 1fr; gap:12px; padding: 10px 25px 0 25px;
}
.box.soft { background:#fff; border:1px solid #e9eef7; border-radius:12px; padding:12px; }

/* compact “tiny” button used in TPS head */
.btn.tiny { border:1px solid #dbe6f3; padding:6px 8px; border-radius:8px; background:#f6f9ff; }

/* tables */
.table { width:100%; border-collapse:separate; border-spacing:0; }
.table th, .table td { border-bottom:1px solid #eef3fb; padding:10px; text-align:left; font-size:14px; }
.table thead th { background:#f7fafc; color:#334155; font-weight:600; }

/* progress bar (RAP) */
.progress { display:grid; grid-template-columns: 1fr auto; gap:10px; align-items:center; padding:10px 0 0 0; }
.progress-label { grid-column:1 / 3; color:#000332; font-weight:600; margin-bottom:2px; }
.meter { height:10px; border-radius:999px; background:#eef3fb; overflow:hidden; }
.meter-fill { height:100%; background:#3A3FAD; }

/* left-rail percent bubble for RAP */
.nav-badge {
  margin-left:auto; margin-right:8px;
  padding:2px 8px; border-radius:999px; background:#eef6ff; border:1px solid #cfe1ff; color:#000332; font-size:12px;
}

/* documents */
.doc-head { display:flex; align-items:center; justify-content:space-between; }
.table.doc td, .table.doc th { padding-left:16px; padding-right:16px; }
.dropzone {
  margin-top:12px; border:2px dashed #dbe6f3; background:#f9fbff; color:#6b7280;
  border-radius:12px; padding:18px; text-align:center;
}
.svg-icon{color:#fff}
/* audit trail */
.timeline { margin: 10px 25px; position:relative; padding-left:16px; }
.t-item { display:flex; gap:12px; margin:14px 0; }
.t-dot { width:10px; height:10px; background:#3A3FAD; border-radius:50%; margin-top:6px; }
.t-body { }
.t-date { font-weight:600; color:#000332; margin-bottom:4px; }
.t-text { color:#334155; }

.btnexport{
    color: #3a3fad;
    background-color: #fff;
    padding: 10px;
    width: 150px;
    border: 1px solid #3a3fad;
    margin: 20px;
}
    .pharmacy-container {
  margin: 20px auto;

  background: #f7f9fb;
  padding: 20px;
  border-radius: 8px;
}

.pharmacy-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.pharmacy-table th {
  background-color: #2a6592;
  color: white;
  padding: 8px;
  text-align: left;
}

.pharmacy-table td {
  border: 1px solid #ccc;
  padding: 8px;
}

.pharmacy-table input {
  width: 100%;
  border: none;
  padding: 6px;
  border-radius: 4px;
  background-color: #fff;
  outline: none;
}

.add-btn {
  margin-top: 10px;
  padding: 8px 14px;
  background-color: #2a6592;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.remove-btn {
  background-color: #c0392b;
  color: white;
  border: none;
  padding: 6px 10px;
  border-radius: 4px;
  cursor: pointer;
}

.icon{
  color: #fff;
  margin-right: 8px;
  background-color: #3a3fad;
  border-radius: 50px;
  padding: 4px;
}
svg { color: #3a3fad; }

    svg{color: #3a3fad;
    }
      /* Textarea visual */
      .input.ta { resize: vertical; min-height: 100px; }
 
      /* Tiny gray helper text */
      .hint { font-size: 12px; color: #6b7280; margin-top: 6px; }
 
      .preview { margin-top:12px; background:#0b1f3a; color:#e8f0ff; padding:12px; border-radius:12px; overflow:auto; }
      @media (max-width:900px){ .row{ grid-template-columns:1fr; } }
    `}</style>
  );
}
export default StyleBlock;