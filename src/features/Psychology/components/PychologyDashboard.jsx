import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import Patients from "./PsychologyPatients.jsx";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Filler
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Filler
);

function RecordingCard() {
  const [open, setOpen] = React.useState(false);
  const recordingsCount = 15;

  const styles = {
    card: {
      background: "#fff",
      borderRadius: 18,
      padding: 24,
      minHeight: 360,
      boxShadow: "none",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
      textAlign: "center"
    },

    header: {
      fontSize: 18,
      fontWeight: 600,
      color: "#111827"
    },

    countWrap: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 6,
      marginTop: 12
    },

    count: {
      fontSize: 25,
      fontWeight: 800,
      color: "#2563EB",
      lineHeight: 1
    },

    countLabel: {
      fontSize: 13,
      fontWeight: 600,
      color: "#070808ff"
    },

    infoBox: {
      marginTop: 18,
      background: "#F9FAFB",
      borderRadius: 14,
      padding: "14px 16px",
      display: "flex",
      alignItems: "center",
      gap: 10,
      width: "100%",
      color: "#374151",
      fontSize: 13
    },

    micIcon: {
      width: 36,
      height: 36,
      borderRadius: "50%",
      background: "#EEF2FF",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 18
    },

    button: {
      marginTop: 24,
      width: "100%",
      padding: "12px 16px",
      borderRadius: 12,
      border: "1px solid #2563EB",
      background: "#F5F8FF",
      color: "#2563EB",
      fontWeight: 600,
      fontSize: 14,
      cursor: "pointer",
      transition: "all 0.2s ease"
    }
  };

  return (
    <>
      <div style={styles.card}>
        {/* Header */}
        <div style={styles.header}>Session Recordings</div>

        {/* Count */}
        <div style={styles.countWrap}>
          <div style={styles.count}>{recordingsCount}</div>
          <div style={styles.countLabel}>Total recordings</div>
        </div>

        {/* Info */}
        <div style={styles.infoBox}>
          <div style={styles.micIcon}>🎙️</div>
          <div>Session audio will be securely saved</div>
        </div>

        {/* CTA */}
        <button
          style={styles.button}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#2563EB";
            e.currentTarget.style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#F5F8FF";
            e.currentTarget.style.color = "#2563EB";
          }}
          onClick={() => setOpen(true)}
        >
          Start New Recording
        </button>
      </div>

      {open && (
        <RecordingModal
          onClose={() => setOpen(false)}
          onSave={() => { }}
        />
      )}
    </>
  );
}

function RecordingModal({ onClose, onSave }) {
  const recorderRef = useRef(null);
  const chunksRef = useRef([]);

  const [patient, setPatient] = useState("");
  const [recording, setRecording] = useState(false);
  const [paused, setPaused] = useState(false);
  const [audioURL, setAudioURL] = useState(false);
  const [pulse, setPulse] = useState(true);

  const start = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);

    recorder.ondataavailable = e => chunksRef.current.push(e.data);
    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "audio/webm" });
      setAudioURL(URL.createObjectURL(blob));
      chunksRef.current = [];
    };

    recorder.start();
    recorderRef.current = recorder;
    setRecording(true);
    setPaused(false);
  };

  const pauseResume = () => {
    if (!recorderRef.current) return;
    paused ? recorderRef.current.resume() : recorderRef.current.pause();
    setPaused(!paused);
  };

  const stop = () => {
    recorderRef.current.stop();
    setRecording(false);
    setPaused(false);
  };

  const save = () => {
    onSave({ patient, audioURL, date: new Date().toLocaleString() });
    onClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(15,23,42,0.55)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000
      }}
    >
      <div
        style={{
          width: 460,
          background: "#fff",
          borderRadius: 20,
          padding: 28,
          boxShadow: "0 30px 70px rgba(0,0,0,0.25)"
        }}
      >
        {/* HEADER */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#0F172A" }}>
              New Session Recording
            </div>
            <div style={{ fontSize: 13, color: "#64748B", marginTop: 4 }}>
              Record and securely save patient session audio
            </div>
          </div>
          <span
            onClick={onClose}
            style={{ cursor: "pointer", fontSize: 22, color: "#94A3B8" }}
          >
            ×
          </span>
        </div>

        {/* INPUT */}
        <input
          placeholder="Patient name"
          value={patient}
          onChange={e => setPatient(e.target.value)}
          style={{
            marginTop: 18,
            width: "100%",
            padding: "12px 14px",
            borderRadius: 10,
            border: "1px solid #E5E7EB",
            fontSize: 14
          }}
        />

        {/* STATUS */}
        {recording && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 13,
              color: "#DC2626",
              marginTop: 14
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#DC2626",
                animation: pulse
                  ? "pulseAnim 1.2s infinite"
                  : "none"
              }}
            />
            Recording…
          </div>
        )}

        {/* CONTROLS */}
        {!recording ? (
          <button
            style={{
              marginTop: 24,
              width: "100%",
              padding: "12px 16px",
              borderRadius: 12,
              border: "1px solid #2563EB",
              background: "#F5F8FF",
              color: "#2563EB",
              fontWeight: 600,
              fontSize: 14,
              cursor: "pointer",
              transition: "all 0.2s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#2563EB";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#F5F8FF";
              e.currentTarget.style.color = "#2563EB";
            }}
            onClick={() => start()}
          >
            Start New Recording
          </button>

        ) : (
          <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
            <button
              onClick={pauseResume}
              style={{
                flex: 1,
                padding: "8px",
                background: "#FFF7ED",
                border: "1px solid #FED7AA",
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 600,
                color: "#B45309",
                cursor: "pointer"
              }}
            >
              {paused ? "▶ Resume" : "⏸ Pause"}
            </button>

            <button
              onClick={stop}
              style={{
                flex: 1,
                padding: "8px",
                background: "#FEF2F2",
                border: "1px solid #FECACA",
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 600,
                color: "#B91C1C",
                cursor: "pointer"
              }}
            >
              ⏹ Stop
            </button>
          </div>
        )}

        {audioURL && (
          <audio controls src={audioURL} style={{ width: "100%", marginTop: 12 }} />
        )}

        {/* FOOTER */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 16
          }}
        >
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: "#64748B",
              fontSize: 14,
              cursor: "pointer"
            }}
          >
            Cancel
          </button>

          <button
            onClick={save}
            disabled={!audioURL}
            style={{
              padding: "6px 14px",
              borderRadius: 8,
              border: "none",
              fontSize: 13,
              fontWeight: 600,
              background: audioURL ? "#E0E7FF" : "#F1F5F9",
              color: audioURL ? "#1E3A8A" : "#94A3B8",
              cursor: audioURL ? "pointer" : "not-allowed"
            }}
          >
            Save
          </button>
        </div>

        {/* INLINE ANIMATION */}
        <style>
          {`
            @keyframes pulseAnim {
              0% { transform: scale(1); opacity: 1; }
              50% { transform: scale(1.4); opacity: 0.6; }
              100% { transform: scale(1); opacity: 1; }
            }
          `}
        </style>
      </div>
    </div>
  );
}

function PatientAttendanceCard() {
  const attended = 92;
  const missed = 28;
  const total = attended + missed;
  const percent = Math.round((attended / total) * 100);
  // match Total Cases sizing
  const size = 200;
  const stroke = 16;
  const radius = 78; // same as donutR in parent
  const circumference = 2 * Math.PI * radius;
  const attendedDash = (percent / 100) * circumference;

  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, text: "" });
  const ref = useRef(null);

  const showTip = (e, text) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setTooltip({ visible: true, x: e.clientX - rect.left + 8, y: e.clientY - rect.top + 8, text });
  };
  const moveTip = (e) => {
    if (!tooltip.visible || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setTooltip(t => ({ ...t, x: e.clientX - rect.left + 8, y: e.clientY - rect.top + 8 }));
  };
  const hideTip = () => setTooltip({ visible: false, x: 0, y: 0, text: "" });

  const styles = {
    card: {
      width: "100%",
      maxWidth: 'none',
      minHeight: 360,
      background: "#fff",
      borderRadius: 18,
      padding: 20,
      boxShadow: "none",
      display: "flex",
      flexDirection: "column",
      alignItems: 'center'
    },
    sectionTitle: { fontSize: 16, fontWeight: 600, color: '#111827', marginBottom: 14 },
    donutWrap: { position: 'relative', display: 'flex', justifyContent: 'center', padding: '8px 0' },
    donutCenter: { position: 'absolute', top: '50%', transform: 'translateY(-50%)', textAlign: 'center' },
    percent: { fontSize: 32, fontWeight: 800, color: '#111827' },
    percentLabel: { fontSize: 13, color: '#6B7280' },
    legendRow: { display: 'flex', justifyContent: 'center', gap: 20, marginTop: 16 },
    legendItem: { display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#374151' },
    dot: { width: 10, height: 10, borderRadius: '50%' },
    footer: { width: '100%', textAlign: 'center', marginTop: 10, color: '#6B7280' }
  };

  return (
    <div style={styles.card}>
      <div style={styles.sectionTitle}>Patient Attendance</div>

      <div style={styles.donutWrap} ref={ref} onMouseMove={moveTip} onMouseLeave={hideTip}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <circle cx={size / 2} cy={size / 2} r={radius} stroke="#E5E7EB" strokeWidth={stroke} fill="none" />
          <circle
            cx={size / 2} cy={size / 2} r={radius}
            stroke="#10ad32ff" strokeWidth={stroke} fill="none"
            strokeDasharray={`${attendedDash} ${circumference}`}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
            strokeLinecap="round"
            onMouseEnter={(e) => showTip(e, `Attended: ${attended} (${percent}%)`)}
            onMouseMove={moveTip}
            onMouseLeave={hideTip}
            style={{ cursor: 'pointer' }}
          />
          <circle
            cx={size / 2} cy={size / 2} r={radius}
            stroke="#e93636ff" strokeWidth={stroke} fill="none"
            strokeDasharray={`${circumference - attendedDash} ${circumference}`}
            strokeDashoffset={`-${attendedDash}`}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
            strokeLinecap="round"
            onMouseEnter={(e) => showTip(e, `Missed: ${missed} (${100 - percent}%)`)}
            onMouseMove={moveTip}
            onMouseLeave={hideTip}
            style={{ cursor: 'pointer' }}
          />
        </svg>

        <div style={styles.donutCenter}>
          <div style={styles.percent}>{percent}%</div>
          <div style={styles.percentLabel}>Attendance</div>
        </div>

        {tooltip.visible && (
          <div style={{ position: 'absolute', left: tooltip.x, top: tooltip.y, background: 'rgba(0,0,0,0.75)', color: '#fff', padding: '6px 8px', borderRadius: 6, fontSize: 12, pointerEvents: 'none', transform: 'translate(-50%,-120%)', whiteSpace: 'nowrap' }}>{tooltip.text}</div>
        )}
      </div>

      <div style={styles.legendRow}>
        <div style={styles.legendItem}><span style={{ ...styles.dot, background: '#059669' }} />Attended <strong style={{ marginLeft: 6, color: '#059669' }}>{attended}</strong></div>
        <div style={styles.legendItem}><span style={{ ...styles.dot, background: '#DC2626' }} />Missed <strong style={{ marginLeft: 6, color: '#DC2626' }}>{missed}</strong></div>
      </div>

      <div style={styles.footer}>Total scheduled today: <strong>{total}</strong> patients</div>
    </div>
  );
}

function AppointmentCard() {
  const styles = {
    card: {
      background: "#fff",
      borderRadius: 18,
      padding: 24,
      minHeight: 360,
      boxShadow: "none",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
      textAlign: "center"
    },

    header: {
      fontSize: 18,
      fontWeight: 600,
      color: "#111827"
    },

    countWrap: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 6,
      marginTop: 12
    },

    count: {
      fontSize: 25,
      fontWeight: 800,
      color: "#2563EB",
      lineHeight: 1
    },

    countLabel: {
      fontSize: 13,
      fontWeight: 600,
      color: "#070808ff"
    },

    infoBox: {
      marginTop: 18,
      background: "#F9FAFB",
      borderRadius: 14,
      padding: "14px 16px",
      display: "flex",
      alignItems: "center",
      gap: 10,
      width: "100%",
      color: "#374151",
      fontSize: 13
    },

    micIcon: {
      width: 36,
      height: 36,
      borderRadius: "50%",
      background: "#EEF2FF",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 18
    },

    button: {
      marginTop: 24,
      width: "100%",
      padding: "12px 16px",
      borderRadius: 12,
      border: "1px solid #2563EB",
      background: "#F5F8FF",
      color: "#2563EB",
      fontWeight: 600,
      fontSize: 14,
      cursor: "pointer",
      transition: "all 0.2s ease"
    }
  };
  return (
        <div style={styles.card}>
        {/* Header */}
        <div style={styles.header}>Schedule Appointments</div>

        {/* Count */}
        <div style={styles.countWrap}>
                    <div style={styles.micIcon}>📅</div>

          <div style={styles.count}>{25}</div>
          <div style={styles.countLabel}>Total Appointments</div>
        </div>

        {/* Info */}
        {/* <div style={styles.infoBox}> */}
          {/* <div>Session audio will be securely saved</div> */}
        {/* </div> */}

        {/* CTA */}
        <button
          style={styles.button}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#2563EB";
            e.currentTarget.style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#F5F8FF";
            e.currentTarget.style.color = "#2563EB";
          }}
        >
          Schedule  Appointment
        </button>
      </div>

  );
}

export default function PsychologyDashboard({
  patients = [],
  onSelectPatient,
  onOpenPatients,
  onOpenFollowUps
}) {

  const cards = [
    {
      title: "My Appointments",
      value: 12,
      icon: "📅",
      color: "#2563EB"
    },
    {
      title: "Billing",
      value: 5,
      icon: "💳",
      color: "#EF4444"
    },
    {
      title: "ICD 10 Count",
      value: 48,
      icon: "📘",
      color: "#10B981"
    },
    {
      title: "Psychological Assessment",
      value: 8,
      icon: "🧠",
      color: "#8B5CF6"
    },
    {
      title: "Treatment Plans",
      value: 14,
      icon: "📄",
      color: "#F59E0B"
    },
    {
      title: "Reports",
      value: 22,
      icon: "📊",
      color: "#3B82F6"
    }
  ];
  const [selectedMetric, setSelectedMetric] = useState("referrals");

  const labels = ["Day -5", "Day -4", "Day -3", "Day -2", "Day -1", "Today"];

  const chartDataMap = {
    cases: {
      label: "Total Cases",
      data: [980, 1020, 1080, 1150, 1210, 1250],
      color: "#2563EB"
    },
    referrals: {
      label: "Referral Requests",
      data: [20, 24, 18, 30, 28, 35],
      color: "#F59E0B"
    },
    attendance: {
      label: "Patient Attendance",
      data: [85, 88, 82, 90, 92, 95],
      color: "#059669"
    }
  };
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#6B7280" }
      },
      y: {
        grid: { color: "#E5E7EB" },
        ticks: { color: "#6B7280" }
      }
    }
  };


  const activeChart = chartDataMap[selectedMetric];
  const lineChartData = {
    labels,
    datasets: [
      {
        label: activeChart.label,
        data: activeChart.data,
        borderColor: activeChart.color,
        backgroundColor: `${activeChart.color}20`,
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "#fff",
        pointBorderWidth: 2
      }
    ]
  };
  const total = 1250;
  const recovered = 845;
  const active = 405;

  const recoveredPercent = (recovered / total) * 100;
  const activePercent = (active / total) * 100;

  const donutSize = 200;
  const donutCx = donutSize / 2;
  const donutR = 78;
  const donutStroke = 16;
  const circumference = 2 * Math.PI * donutR;
  const dashRecovered = (recoveredPercent / 100) * circumference;
  const dashActive = (activePercent / 100) * circumference;

  const styles = {
    wrapper: {
      padding: "24px",
    },

    row: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      gap: "18px"
    },

    card: {
      minHeight: "120px",
      background: "#fff",
      borderRadius: "14px",
      display: "flex",
      boxShadow: "none",
      border: "1px solid #EEF2F7",
      overflow: "hidden",
      transition: "all 0.25s ease"
    },

    leftStrip: {
      width: "5px"
    },

    content: {
      padding: "18px",
      flex: 1
    },

    topRow: {
      display: "flex",
      alignItems: "center",
      gap: "12px"
    },

    icon: {
      width: "40px",
      height: "40px",
      borderRadius: "10px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "18px"
    },

    title: {
      flex: 1,
      fontSize: "15px",
      fontWeight: "600",
      color: "#1F2937",
      maxWidth: "160px",
      lineHeight: "1.3",
      overflow: "hidden",
      textOverflow: "ellipsis",
      paddingBottom: "4px"
    },

    value: {
      fontSize: "14px",
      fontWeight: "700",
      color: "#111827"
    },

    subText: {
      marginTop: "6px",
      fontSize: "12px",
      color: "#6B7280"
    },

    row2: {
      paddingTop: "24px",
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "12px",
      alignItems: "stretch"
    },


    donutCard: {
      width: "100%",
      maxWidth: "none",
      minHeight: "360px",
      background: "#fff",
      borderRadius: "18px",
      padding: "20px",
      boxShadow: "none",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },

    sectionTitle: {
      fontSize: "16px",
      fontWeight: "600",
      color: "#111827",
      marginBottom: "14px"
    },

    donutWrap: {
      position: "relative",
      display: "flex",
      justifyContent: "center",
      padding: "8px 0"
    },

    donutCenter: {
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      textAlign: "center"
    },

    totalValue: {
      fontSize: "32px",
      fontWeight: "800",
      color: "#111827"
    },

    totalLabel: {
      fontSize: "13px",
      color: "#6B7280"
    },

    legend: {
      display: "flex",
      justifyContent: "center",
      gap: "20px",
      marginTop: "16px"
    },

    legendItem: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      fontSize: "13px",
      color: "#374151"
    },

    dot: {
      width: "10px",
      height: "10px",
      borderRadius: "50%"
    },
    chartCard: {
      flex: 1,
      minWidth: "420px",
      background: "#fff",
      borderRadius: "18px",
      padding: "18px",
      boxShadow: "none",
      display: "flex",
      flexDirection: "column"
    },

    chartHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "12px"
    },

    select: {
      padding: "6px 10px",
      borderRadius: "8px",
      border: "1px solid #E5E7EB",
      fontSize: "13px",
      outline: "none",
      cursor: "pointer"
    },

    chartWrap: {
      height: "260px"
    },

    row3: {
      paddingTop: "24px",
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "12px",
      alignItems: "stretch"
    }


  }
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, text: "" });
  const history = useHistory();
const [showPatients, setShowPatients] = useState(false);

  const donutRef = useRef(null);

  const showTooltip = (e, text) => {
    if (!donutRef.current) return;
    const rect = donutRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left + 8;
    const y = e.clientY - rect.top + 8;
    setTooltip({ visible: true, x, y, text });
  };

  const moveTooltip = (e) => {
    if (!tooltip.visible || !donutRef.current) return;
    const rect = donutRef.current.getBoundingClientRect();
    setTooltip(t => ({ ...t, x: e.clientX - rect.left + 8, y: e.clientY - rect.top + 8 }));
  };

  const hideTooltip = () => setTooltip({ visible: false, x: 0, y: 0, text: "" });

  return (
    <>
     {showPatients ? (
      <Patients onBack={() => setShowPatients(false)} />
    ) : (
      <div style={styles.wrapper}>
        <div style={styles.row}>
          {cards.map((card, i) => (
            <div
              key={i}
              style={{
                ...styles.card,
                cursor: card.title === "My Appointments" ? "pointer" : "default"
              }}
             onClick={() => {
  if (card.title === "My Appointments") {
    setShowPatients(true);
  }
}}

            >


              <div
                style={{
                  ...styles.leftStrip,
                  background: card.color
                }}
              />

              <div style={styles.content}>
                <div style={styles.topRow}>
                  <div
                    style={{
                      ...styles.icon,
                      background: `${card.color}15`
                    }}
                  >
                    {card.icon}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <div style={styles.title}>{card.title}</div>
                    <div style={styles.value}>{card.value}</div>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
        <div style={styles.row2}>
          {/* DONUT */}
          <div style={styles.donutCard}>
            <div style={styles.sectionTitle}>Total Cases</div>

            <div style={styles.donutWrap} ref={donutRef} onMouseMove={moveTooltip} onMouseLeave={hideTooltip}>
              <svg width={donutSize} height={donutSize} viewBox={`0 0 ${donutSize} ${donutSize}`}>
                <circle cx={donutCx} cy={donutCx} r={donutR} stroke="#E5E7EB" strokeWidth={donutStroke} fill="none" />
                <circle
                  cx={donutCx}
                  cy={donutCx}
                  r={donutR}
                  stroke="#47dbf5ff"
                  strokeWidth={donutStroke}
                  fill="none"
                  strokeDasharray={`${dashRecovered} ${circumference}`}
                  transform={`rotate(-90 ${donutCx} ${donutCx})`}
                  strokeLinecap="round"
                  onMouseEnter={(e) => showTooltip(e, `Recovered: ${recovered} (${recoveredPercent.toFixed(1)}%)`)}
                  onMouseMove={moveTooltip}
                  onMouseLeave={hideTooltip}
                  style={{ cursor: 'pointer' }}
                />
                <circle
                  cx={donutCx}
                  cy={donutCx}
                  r={donutR}
                  stroke="#f09226ff"
                  strokeWidth={donutStroke}
                  fill="none"
                  strokeDasharray={`${dashActive} ${circumference}`}
                  strokeDashoffset={`-${dashRecovered}`}
                  transform={`rotate(-90 ${donutCx} ${donutCx})`}
                  strokeLinecap="round"
                  onMouseEnter={(e) => showTooltip(e, `Active: ${active} (${activePercent.toFixed(1)}%)`)}
                  onMouseMove={moveTooltip}
                  onMouseLeave={hideTooltip}
                  style={{ cursor: 'pointer' }}
                />
              </svg>

              <div style={styles.donutCenter}>
                <div style={styles.totalValue}>{total}</div>
                <div style={styles.totalLabel}>Patients</div>
              </div>

              {tooltip.visible && (
                <div
                  style={{
                    position: 'absolute',
                    left: tooltip.x,
                    top: tooltip.y,
                    background: 'rgba(0,0,0,0.75)',
                    color: '#fff',
                    padding: '6px 8px',
                    borderRadius: 6,
                    fontSize: 12,
                    pointerEvents: 'none',
                    transform: 'translate(-50%, -120%)',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {tooltip.text}
                </div>
              )}

            </div>

            <div style={styles.legend}>
              <div style={styles.legendItem}>
                <span style={{ ...styles.dot, background: "#2bbde2ff" }} />
                Recovered <strong>{recovered}</strong>
              </div>
              <div style={styles.legendItem}>
                <span style={{ ...styles.dot, background: "#D97706" }} />
                Active <strong>{active}</strong>
              </div>
            </div>
          </div>
          {/* RIGHT SIDE LINE CHART */}
          <PatientAttendanceCard />
          <RecordingCard />

        </div>

        <div style={styles.row3}>
          <div style={{ ...styles.chartCard, gridColumn: '1 / span 2' }}>
            <div style={styles.chartHeader}>
              <div style={styles.sectionTitle}>{activeChart.label} (Last 6 Days)</div>

              <select
                style={styles.select}
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
              >
                <option value="referrals">Referral Requests</option>
                <option value="attendance">Patient Attendance</option>
                <option value="cases">Total Cases</option>
              </select>
            </div>

            <div style={styles.chartWrap}>
              <Line data={lineChartData} options={chartOptions} />
            </div>
          </div>
          <AppointmentCard />

        </div>

      </div>
    )}
    </>

  );
}
