import React, { useState, useRef } from "react";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS, LineElement, PointElement, LinearScale,
  CategoryScale, Tooltip, Filler, ArcElement, Legend,
} from "chart.js";
import {
  FaArrowUp, FaArrowDown, FaChevronRight, FaMicrophone,
  FaPlus, FaShareSquare, FaInbox,
} from "react-icons/fa";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Filler, ArcElement, Legend);

/* ─────────────────────────────────────────────────────────────
   PropTypes / shape docs (no runtime dep needed)

   kpiCards: [{label, value, sub, icon: ReactNode, accent, trend:"up"|"down", trendVal}]
   donutCards: [{title, total, segments:[{label,value,color}], footer?}]
   appointments: [{time, name, type, status, va}]
   pendingActions: [{label, count, color, icon: ReactNode}]
   chartMetrics: {[key]: {label, data:[], color}}
   chartLabels: string[]
   monthlyStats: [{label, value, icon: ReactNode, color}]
   recordingsCount: number
   appointmentsCount: number
   departmentName: string
   onViewAllPatients: fn
───────────────────────────────────────────────────────────── */

/* ── KPI Card ── */
function KpiCard({ label, value, sub, icon, accent, trend, trendVal, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl p-4 shadow-card"
      style={{ borderLeft: `4px solid ${accent}`, cursor: onClick ? "pointer" : "default" }}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1 min-w-0">
          <div className="text-[11px] font-medium uppercase tracking-wide text-gray-500 mb-1">{label}</div>
          <div className="text-[22px] font-extrabold text-gray-900 leading-tight">{value}</div>
          {sub && <div className="text-[11px] text-gray-400 mt-0.5">{sub}</div>}
        </div>
        <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ml-3"
          style={{ background: accent + "18", color: accent }}>
          {icon}
        </div>
      </div>
      {trendVal !== undefined && (
        <div className="flex items-center gap-1 mt-2">
          {trend === "up"
            ? <FaArrowUp size={9} className="text-emerald-500" />
            : <FaArrowDown size={9} className="text-red-500" />}
          <span className={`text-[11px] font-semibold ${trend === "up" ? "text-emerald-500" : "text-red-500"}`}>
            {trendVal}
          </span>
          <span className="text-[11px] text-gray-400">vs yesterday</span>
        </div>
      )}
    </div>
  );
}

/* ── Section Header ── */
function SectionHeader({ title, action, onAction }) {
  return (
    <div className="flex justify-between items-center mb-3">
      <div className="text-[12px] font-bold uppercase tracking-wider text-gray-700">{title}</div>
      {action && (
        <button onClick={onAction} className="flex items-center gap-1 text-[12px] font-semibold text-blue-600 bg-transparent border-0 cursor-pointer p-0">
          {action} <FaChevronRight size={9} />
        </button>
      )}
    </div>
  );
}

/* ── Donut Card ── */
function DonutCard({ title, total, segments, footer }) {
  const circ = 2 * Math.PI * 68;
  const [tip, setTip] = useState(null);
  const ref = useRef(null);
  let offset = 0;
  const arcs = segments.map(seg => {
    const dash = (seg.value / total) * circ;
    const arc = { ...seg, dash, offset };
    offset += dash;
    return arc;
  });
  return (
    <div className="bg-white rounded-xl p-4 shadow-card">
      <SectionHeader title={title} />
      <div className="relative flex justify-center" ref={ref}>
        <svg width={180} height={180} viewBox="0 0 180 180">
          <circle cx={90} cy={90} r={68} stroke="#f0f0f0" strokeWidth={14} fill="none" />
          {arcs.map((arc, i) => (
            <circle key={i} cx={90} cy={90} r={68}
              stroke={arc.color} strokeWidth={14} fill="none"
              strokeDasharray={`${arc.dash} ${circ}`}
              strokeDashoffset={-arc.offset}
              transform="rotate(-90 90 90)"
              strokeLinecap="round"
              style={{ cursor: "pointer" }}
              onMouseEnter={e => {
                const rect = ref.current.getBoundingClientRect();
                setTip({ x: e.clientX - rect.left, y: e.clientY - rect.top, text: `${arc.label}: ${arc.value}` });
              }}
              onMouseLeave={() => setTip(null)}
            />
          ))}
        </svg>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="text-2xl font-extrabold text-gray-900 leading-none">{total}</div>
          <div className="text-[12px] text-gray-400 mt-0.5">Patients</div>
        </div>
        {tip && (
          <div className="absolute pointer-events-none whitespace-nowrap text-[12px] text-white px-2 py-1 rounded-md"
            style={{ background: "rgba(17,24,39,0.85)", left: tip.x, top: tip.y, transform: "translate(-50%,-130%)", zIndex: 10 }}>
            {tip.text}
          </div>
        )}
      </div>
      <div className="flex justify-center gap-4 flex-wrap mt-2">
        {segments.map((seg, i) => (
          <div key={i} className="flex items-center gap-1.5 text-[12px] text-gray-600">
            <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: seg.color }} />
            {seg.label}
            <strong className="ml-1" style={{ color: seg.color }}>{seg.value}</strong>
          </div>
        ))}
      </div>
      {footer && <div className="text-[12px] text-gray-400 text-center mt-2">{footer}</div>}
    </div>
  );
}

/* ── Appointment Table ── */
const STATUS_STYLE = {
  Completed:    { bg: "#d1fae5", color: "#065f46" },
  "In Progress":{ bg: "#dbeafe", color: "#1e40af" },
  Waiting:      { bg: "#fef3c7", color: "#92400e" },
  "No Show":    { bg: "#fee2e2", color: "#991b1b" },
  Scheduled:    { bg: "#f3f4f6", color: "#374151" },
};

function AppointmentTable({ appointments, onViewAll }) {
  return (
    <div className="bg-white rounded-xl shadow-card p-4">
      <SectionHeader title="Today's Appointments" action="View All" onAction={onViewAll} />
      <table className="w-full text-[13px] border-collapse">
        <thead>
          <tr>
            {["Time", "Patient", "Examination Type", "Status", "VA"].map(h => (
              <th key={h} className="text-left px-2.5 py-2 text-[11px] font-semibold text-gray-400 uppercase tracking-wide border-b-2 border-gray-100 bg-gray-50">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {appointments.map((a, i) => {
            const sc = STATUS_STYLE[a.status] || STATUS_STYLE.Scheduled;
            return (
              <tr key={i} className="border-b border-gray-50 hover:bg-blue-50/30 transition-colors">
                <td className="px-2.5 py-2.5">
                  <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-[12px] font-semibold">{a.time}</span>
                </td>
                <td className="px-2.5 py-2.5 font-semibold text-gray-800">{a.name}</td>
                <td className="px-2.5 py-2.5 text-gray-500">{a.type}</td>
                <td className="px-2.5 py-2.5">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold"
                    style={{ background: sc.bg, color: sc.color }}>{a.status}</span>
                </td>
                <td className="px-2.5 py-2.5 font-semibold text-gray-600">{a.va}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/* ── Pending Actions ── */
function PendingActions({ items }) {
  return (
    <div className="bg-white rounded-xl shadow-card p-4">
      <SectionHeader title="Pending Actions" />
      <div className="flex flex-col gap-2.5">
        {items.map((p, i) => (
          <div key={i} className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg"
            style={{ background: p.color + "0d", borderLeft: `3px solid ${p.color}` }}>
            <span style={{ color: p.color }}>{p.icon}</span>
            <span className="flex-1 text-[13px] text-gray-600">{p.label}</span>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full"
              style={{ background: p.color + "20", color: p.color }}>{p.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Patient Flow Chart ── */
function PatientFlowCard({ labels, datasets }) {
  const data = { labels, datasets };
  const opts = {
    responsive: true, maintainAspectRatio: false,
    plugins: {
      legend: { position: "top", labels: { boxWidth: 10, font: { size: 12 }, color: "#374151" } },
      tooltip: { mode: "index", intersect: false },
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: "#9ca3af", font: { size: 11 } } },
      y: { grid: { color: "#f3f4f6" }, ticks: { color: "#9ca3af", font: { size: 11 } }, beginAtZero: true },
    },
  };
  return (
    <div className="bg-white rounded-xl shadow-card p-4">
      <SectionHeader title="Patient Flow — This Week" />
      <div style={{ height: 200 }}>
        <Line data={data} options={opts} />
      </div>
    </div>
  );
}

/* ── Referral Summary ── */
function ReferralCard({ incoming, outgoing }) {
  return (
    <div className="bg-white rounded-xl shadow-card p-4">
      <SectionHeader title="Referral Summary" />
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-400 uppercase tracking-wide mb-2">
            <FaInbox size={11} /> Incoming
          </div>
          {incoming.map((r, i) => (
            <div key={i} className="flex justify-between items-center py-1.5 border-b border-gray-50">
              <span className="text-[12px] text-gray-600">{r.source}</span>
              <span className="inline-block px-2 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700">{r.count}</span>
            </div>
          ))}
        </div>
        <div>
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-400 uppercase tracking-wide mb-2">
            <FaShareSquare size={11} /> Outgoing
          </div>
          {outgoing.map((r, i) => (
            <div key={i} className="flex justify-between items-center py-1.5 border-b border-gray-50">
              <span className="text-[12px] text-gray-600">{r.dest}</span>
              <span className="inline-block px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700">{r.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Recording Card ── */
function RecordingCard({ count }) {
  const [open, setOpen] = useState(false);
  const recorderRef = useRef(null);
  const chunksRef = useRef([]);
  const [recording, setRecording] = useState(false);
  const [paused, setPaused] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [patient, setPatient] = useState("");

  const start = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    recorder.ondataavailable = e => chunksRef.current.push(e.data);
    recorder.onstop = () => {
      setAudioURL(URL.createObjectURL(new Blob(chunksRef.current, { type: "audio/webm" })));
      chunksRef.current = [];
    };
    recorder.start();
    recorderRef.current = recorder;
    setRecording(true);
  };
  const pauseResume = () => { paused ? recorderRef.current.resume() : recorderRef.current.pause(); setPaused(!paused); };
  const stop = () => { recorderRef.current.stop(); setRecording(false); };

  return (
    <>
      <div className="bg-white rounded-xl shadow-card p-4 flex flex-col gap-2">
        <SectionHeader title="Session Recordings" />
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-blue-50 text-blue-600 flex-shrink-0">
            <FaMicrophone size={18} />
          </div>
          <div>
            <div className="text-3xl font-extrabold text-gray-900 leading-none">{count}</div>
            <div className="text-[12px] text-gray-400 mt-0.5">Total recordings this month</div>
          </div>
        </div>
        <div className="text-[12px] text-gray-400 bg-gray-50 rounded-lg px-3 py-2">
          Audio recordings are encrypted and stored securely per HIPAA guidelines.
        </div>
        <button onClick={() => setOpen(true)}
          className="dash-btn-outline flex items-center justify-center gap-1.5 mt-1 px-3 py-2 rounded-lg text-[13px] font-semibold cursor-pointer">
          <FaPlus size={10} /> Start New Recording
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 flex items-center justify-center z-50" style={{ background: "rgba(15,23,42,0.5)" }}>
          <div className="bg-white rounded-2xl p-6 w-[440px] shadow-modal">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[16px] font-bold text-gray-900">New Session Recording</span>
              <button onClick={() => setOpen(false)} className="text-gray-400 text-2xl leading-none bg-transparent border-0 cursor-pointer">×</button>
            </div>
            <input placeholder="Patient name" value={patient} onChange={e => setPatient(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-[14px] outline-none" />
            {recording && (
              <div className="flex items-center gap-2 mt-3 text-red-600 text-[13px]">
                <span className="w-2 h-2 rounded-full bg-red-600 inline-block animate-pulse" /> Recording in progress…
              </div>
            )}
            <div className="flex gap-2 mt-3">
              {!recording
                ? <button onClick={start} className="flex-1 py-2 rounded-lg bg-blue-600 text-white text-[13px] font-semibold border-0 cursor-pointer">Start Recording</button>
                : <>
                  <button onClick={pauseResume} className="flex-1 py-2 rounded-lg border border-orange-200 bg-orange-50 text-orange-700 text-[13px] font-semibold cursor-pointer">{paused ? "Resume" : "Pause"}</button>
                  <button onClick={stop} className="flex-1 py-2 rounded-lg border border-red-200 bg-red-50 text-red-700 text-[13px] font-semibold cursor-pointer">Stop</button>
                </>
              }
            </div>
            {audioURL && <audio controls src={audioURL} className="w-full mt-3" />}
            <div className="flex justify-end mt-3">
              <button disabled={!audioURL} onClick={() => setOpen(false)}
                className="px-4 py-2 rounded-lg text-[13px] font-semibold border-0 cursor-pointer"
                style={{ background: audioURL ? "#2563eb" : "#e5e7eb", color: audioURL ? "#fff" : "#9ca3af" }}>
                Save Recording
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ── Monthly Stats Grid ── */
function MonthlyStats({ stats }) {
  return (
    <div className="bg-white rounded-xl shadow-card p-4 flex-1">
      <SectionHeader title="Clinical Performance — This Month" />
      <div className="grid grid-cols-4 gap-3">
        {stats.map((m, i) => (
          <div key={i} className="flex items-center gap-2.5 p-3 bg-gray-50 rounded-lg">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: m.color + "18", color: m.color }}>
              {m.icon}
            </div>
            <div>
              <div className="text-[16px] font-bold text-gray-900">{m.value}</div>
              <div className="text-[11px] text-gray-400 leading-tight">{m.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN EXPORT — DepartmentDashboard
══════════════════════════════════════════════════════════════ */
export default function DepartmentDashboard({
  departmentName = "Department",
  kpiCards = [],
  donutCards = [],
  appointments = [],
  pendingActions = [],
  patientFlowLabels = [],
  patientFlowDatasets = [],
  referralIncoming = [],
  referralOutgoing = [],
  trendMetrics = {},
  trendLabels = [],
  monthlyStats = [],
  recordingsCount = 0,
  onViewAllPatients,
  onNewAppointment,
}) {
  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  return (
    <div className="flex flex-col gap-4 p-5 bg-[#f5f7fa] min-h-full">

      {/* ── Page header ── */}
      <div className="flex justify-between items-center">
        <div>
          <div className="text-xl font-bold text-gray-900">{departmentName}</div>
          <div className="text-[12px] text-gray-400 mt-0.5">{today}</div>
        </div>
        <div className="flex gap-2.5">
          {onViewAllPatients && (
            <button onClick={onViewAllPatients}
              className="dash-btn-outline flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[13px] font-semibold cursor-pointer">
              View All Patients
            </button>
          )}
          {onNewAppointment && (
            <button onClick={onNewAppointment}
              onMouseEnter={e => { e.currentTarget.style.background = "#1d4ed8"; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#2563eb"; e.currentTarget.style.color = "#fff"; }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-blue-600 text-white text-[13px] font-semibold border-0 cursor-pointer transition-colors">
              <FaPlus size={11} /> New Appointment
            </button>
          )}
        </div>
      </div>

      {/* ── KPI row ── */}
      <div className="grid grid-cols-4 gap-3">
        {kpiCards.map((c, i) => <KpiCard key={i} {...c} />)}
      </div>

      {/* ── Appointments + Pending ── */}
      <div className="grid gap-4" style={{ gridTemplateColumns: "1fr 300px" }}>
        <AppointmentTable appointments={appointments} onViewAll={onViewAllPatients} />
        <PendingActions items={pendingActions} />
      </div>

      {/* ── Flow + Diagnosis donuts + Referrals ── */}
      <div className="grid grid-cols-3 gap-4">
        <PatientFlowCard labels={patientFlowLabels} datasets={patientFlowDatasets} />
        {donutCards.map((d, i) => <DonutCard key={i} {...d} />)}
        <ReferralCard incoming={referralIncoming} outgoing={referralOutgoing} />
      </div>

      {/* ── Recordings + Monthly stats ── */}
      <div className="grid gap-4" style={{ gridTemplateColumns: "300px 1fr" }}>
        <RecordingCard count={recordingsCount} />
        <MonthlyStats stats={monthlyStats} />
      </div>

      {/* ── Trend chart ── */}
      {/* {Object.keys(trendMetrics).length > 0 && (
        <TrendChartCard metrics={trendMetrics} labels={trendLabels} />
      )} */}

    </div>
  );
}
