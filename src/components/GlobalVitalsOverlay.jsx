import React from "react";
import VitalsTab from "./VitalsTab";

export default function GlobalVitalsOverlay({ open, onClose, patient }) {
  if (!open) return null;

  return (
    <div style={overlay}>
      <div style={panel}>
        <button onClick={onClose} style={closeBtn}>
          ✖ Close
        </button>

        <VitalsTab
          patientId={patient.id}
          encounterId={patient.encounterId || null}
        />
      </div>
    </div>
  );
}

const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.4)",
  zIndex: 9999,
};

const panel = {
  background: "#fff",
  width: "90%",
  height: "90%",
  margin: "auto",
  marginTop: "3%",
  borderRadius: 8,
  overflow: "auto",
};

const closeBtn = {
  margin: 10,
  padding: "6px 12px",
};
