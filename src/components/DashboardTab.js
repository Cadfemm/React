import React from "react";
export default
function DashboardTab({ patient, icdPath, icdCode, icfSummary, ichiSummary, rapPercent, rapData }) {
  const [upcoming, setUpcoming] = React.useState([]);

  // Static "Active standards" chips
  const chips = React.useMemo(() => ([
    { k: "ICD-11", v: "8B00.0" },
    { k: "ICF",   v: "b1108, b7401, b749, b303" },
    { k: "ICHI",  v: "MUB.AA.ZZ, MUC.AA.ZZ" },
    { k: "CARF RTW", v: "30/60/90 day" }
  ]), []);

  // Helper
  const addDays = (dt, n) => new Date(dt.getFullYear(), dt.getMonth(), dt.getDate() + n);

  // Build Upcoming list (kept as-is, still uses rapData)
  React.useEffect(() => {
    const base = [
      { date: addDays(new Date(), 1), event: "Workplace Ergonomics Visit" },
      { date: addDays(new Date(), 3), event: "TPS Session #2" },
      { date: addDays(new Date(), 6), event: "Medical Review — Fitness to Work update" }
    ];
    if (rapData?.start_date) {
      base.unshift({ date: new Date(rapData.start_date), event: "Light-duty placement start" });
    }
    const sorted = base
      .filter(x => x.date && !isNaN(x.date))
      .sort((a, b) => a.date - b.date)
      .map(x => ({ date: x.date.toISOString().slice(0, 10), event: x.event }));
    setUpcoming(sorted.slice(0, 5));
  }, [rapData?.start_date]);

  return (
    <section className="dash-wrap">
      {/* At a glance card */}
      <div className="dash-card">
        <div className="glance-head">
          <div className="glance-l">
            <div className="g-title">At a Glance</div>

            <div className="g-row">
              <div className="g-label">PATIENT</div>
              <div className="g-block">
                <div className="g-name">John Doe</div>
                <div className="g-meta">
                  ID: IND0001 · DoB: 13-07-1982 · Male
                </div>
                <div className="g-meta">
                  Employer: Kilang Sdn Bhd · Payor: PERKESO RTW
                </div>
              </div>
            </div>

            <div className="g-row">
              <div className="g-label">ACTIVE STANDARDS</div>
              <div className="g-tags">
                {chips.map((c, i) => (
                  <span className="tag" key={i}>
                    <b>{c.k}:</b>&nbsp;{c.v}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="glance-r">
            <div className="rtw-title">RTW Readiness</div>
            <div className="rtw-bar">
              <div
                className="rtw-fill"
                style={{ width: `${Math.max(0, Math.min(100, rapPercent))}%` }}
              />
            </div>
            <div className="rtw-note">
              {rapPercent}% ready
              <span className="dim">
                {" "}
                (computed from TPS, medical, workplace, family, employer, vocational)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming card */}
      <div className="dash-card">
        <div className="g-title">Upcoming</div>
        <table className="dash-table">
          <thead>
            <tr><th style={{ width: "24%" }}>Date</th><th>Event</th></tr>
          </thead>
          <tbody>
            {upcoming.length === 0 ? (
              <tr><td colSpan={2} className="muted">No events scheduled.</td></tr>
            ) : upcoming.map((r, i) => (
              <tr key={i}>
                <td>{r.date}</td>
                <td>{r.event}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}