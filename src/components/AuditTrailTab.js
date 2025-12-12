import { useEffect, useMemo, useState, useCallback } from "react";
import axios from "axios";

const API = "http://127.0.0.1:5000"; // backend base URL

const api = axios.create({
  baseURL: API,
});



function AuditTrailTab() {
  // Helper: parse "DD-MM-YY HH:mm" into a Date (assumes 20YY)
  const parseDMYhm = (s) => {
    const m = s.match(/^(\d{2})-(\d{2})-(\d{2})\s+(\d{2}):(\d{2})$/);
    if (!m) return new Date(NaN);
    const [, dd, mm, yy, HH, MM] = m;
    const year = 2000 + Number(yy);
    return new Date(year, Number(mm) - 1, Number(dd), Number(HH), Number(MM));
  };

  // Static, fixed entries (order will be re-sorted desc by time)
  const staticRows = [
    { ts: parseDMYhm("25-08-25 12:15"), action: "Patient New Scanned Documents Added" },
    { ts: parseDMYhm("25-08-25 10:25"), action: "RTW/Light-Duty proposal updated" },
    { ts: parseDMYhm("25-08-25 10:06"), action: "GAS Goals Updated" },
    { ts: parseDMYhm("25-08-25 09:57"), action: "New Task Performance Created" },
    { ts: parseDMYhm("25-08-25 09:45"), action: "ICF Goals Updated" },
  ]
  // sort desc (newest first)
  .filter(r => !isNaN(r.ts))
  .sort((a, b) => b.ts - a.ts);

  // group by day for timeline
  const byDay = staticRows.reduce((acc, r) => {
    const key = r.ts.toLocaleDateString();
    (acc[key] ||= []).push(r);
    return acc;
  }, {});

  const fmt = (d) =>
    d.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <section className="card audit-wrap">
      <div className="cardheading">
        <h2 className="title">Audit Trail</h2>
        
        {/* Mode toggle removed intentionally to force timeline forever */}
      </div>

      {/* Always show timeline */}
      <div className="audit-timeline">
        {Object.entries(byDay).map(([day, list]) => (
          <div className="audit-day" key={day}>
            <span className="date-badge">{day}</span>
            {list.map((r, i) => (
              <div className="audit-item" key={i}>
                <span className="dot" />
                <div className="when">{fmt(r.ts)}</div>
                <div className="what">{r.action}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
export default AuditTrailTab;