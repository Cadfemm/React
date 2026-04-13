import * as React from "react";
import {
  User, Layers, ShieldCheck, FileText, FileStack,
  Briefcase, ChevronRight, ChevronDown, CircleCheckBig, LayoutGrid,
} from "lucide-react";

const DEPARTMENTS = [
  "Customer Service", "Nursing", "Medical Assistant", "Doctor",
  "Physiotherapy", "Work & Vocational Rehab", "Occupational Therapy",
  "Optometry", "Prosthetics & Orthotics", "Audiology",
  "Dietetics", "Speech & Language Therapy", "Psychology",
];

const NAV = [
  { key: "PERSONAL",  label: "Patient Demographics",        icon: <User size={17} />           },
  { key: "PHARMACY",  label: "Pharmacy",                    icon: <Layers size={17} />         },
  { key: "TPS",       label: "Task Performance Simulation", icon: <CircleCheckBig size={17} /> },
  { key: "RAP",       label: "RTW",                         icon: <Briefcase size={17} />, badge: true },
  { key: "DOCUMENTS", label: "Documents",                   icon: <FileStack size={17} />      },
  { key: "SUMMARY",   label: "Patient Summary",             icon: <FileText size={17} />       },
  { key: "RAPFINAL",  label: "RAP • Case",                  icon: <Briefcase size={17} />      },
  { key: "AUDIT",     label: "Audit Trial",                 icon: <ShieldCheck size={17} />    },
];

function SidebarNav({ tab, setTab, rapPercent, username }) {
  const [deptOpen, setDeptOpen] = React.useState(false);

  const visibleDepts = username === "rmsuser"
    ? DEPARTMENTS.filter(d => d === "Customer Service" || d === "Optometry")
    : DEPARTMENTS;

  const isDeptActive = visibleDepts.includes(tab);

  return (
    <aside style={rail}>
      {/* MAIN MENU label */}
      <div style={menuLabel}>MAIN MENU</div>

      <div style={{ flex: 1, overflowY: "auto", overflowX: "visible", paddingBottom: 16 }}>
        <nav style={{ display: "flex", flexDirection: "column", padding: "2px 8px" }}>

          {/* ── Departments — inline expandable ── */}
          <button
            style={{
              ...navItem,
              background: isDeptActive ? "#eff6ff" : "transparent",
            }}
            onClick={() => setDeptOpen(o => !o)}
          >
            <span style={{ ...iconWrap, color: "#0058ff" }}><LayoutGrid size={17} /></span>
            <span style={{ ...navText, color: isDeptActive ? "#0058ff" : "#212529", fontWeight: isDeptActive ? 600 : 400 }}>
              Departments
            </span>
            {deptOpen
              ? <ChevronDown size={15} style={{ color: "#adb5bd", marginLeft: "auto" }} />
              : <ChevronRight size={15} style={{ color: "#adb5bd", marginLeft: "auto" }} />
            }
          </button>

          {/* Inline department list */}
          {deptOpen && (
            <div style={deptList}>
              {visibleDepts.map(dept => (
                <button
                  key={dept}
                  style={{
                    ...deptItem,
                    background: tab === dept ? "#0058ff" : "transparent",
                    color: tab === dept ? "#fff" : "#212529",
                    fontWeight: tab === dept ? 600 : 400,
                  }}
                  onClick={() => { setTab(dept); setDeptOpen(false); }}
                >
                  {dept}
                </button>
              ))}
            </div>
          )}

          {/* ── Regular nav items ── */}
          {NAV.map(item => {
            const isActive = tab === item.key;
            return (
              <button
                key={item.key}
                style={{
                  ...navItem,
                  background: isActive ? "#0058ff" : "transparent",
                }}
                onClick={() => setTab(item.key)}
              >
                <span style={{ ...iconWrap, color: isActive ? "#fff" : "#0058ff" }}>
                  {item.icon}
                </span>
                <span style={{ ...navText, color: isActive ? "#fff" : "#212529", fontWeight: isActive ? 600 : 400 }}>
                  {item.label}
                </span>
                {item.badge && rapPercent != null && (
                  <span style={{ ...badgePill, marginLeft: "auto", marginRight: 6 }}>{rapPercent}%</span>
                )}
                <ChevronRight size={15} style={{ color: isActive ? "rgba(255,255,255,0.55)" : "#adb5bd", marginLeft: item.badge ? 0 : "auto" }} />
              </button>
            );
          })}

        </nav>
      </div>
    </aside>
  );
}

/* ── Styles ── */
const rail = {
  background: "#fff",
  borderRight: "1px solid #e9ecef",
  width: 260,
  position: "sticky",
  top: 0,
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  paddingTop: 48,
  fontFamily: "Inter, Roboto, sans-serif",
  flexShrink: 0,
};

const menuLabel = {
  padding: "0 16px 8px",
  fontSize: 10,
  fontWeight: 700,
  color: "#adb5bd",
  letterSpacing: "1px",
  textTransform: "uppercase",
};

const navItem = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  padding: "10px 12px",
  margin: "1px 0",
  borderRadius: 8,
  cursor: "pointer",
  border: "none",
  width: "100%",
  textAlign: "left",
  transition: "background .12s",
};

const iconWrap = {
  width: 20,
  height: 20,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
};

const navText = {
  fontSize: 14,
  flex: 1,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

const deptList = {
  marginLeft: 30,
  marginBottom: 4,
  display: "flex",
  flexDirection: "column",
  gap: 1,
  borderLeft: "2px solid #e9ecef",
  paddingLeft: 8,
};

const deptItem = {
  display: "block",
  width: "100%",
  padding: "8px 10px",
  borderRadius: 6,
  border: "none",
  cursor: "pointer",
  fontSize: 13,
  textAlign: "left",
  transition: "background .1s",
};

const badgePill = {
  padding: "2px 8px",
  borderRadius: 999,
  background: "#eef2ff",
  border: "1px solid #c7d2fe",
  color: "#3730a3",
  fontSize: 11,
  fontWeight: 600,
};

export default SidebarNav;
