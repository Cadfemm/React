// AssignmentLauncher.jsx
export default function AssignmentLauncher({ type, onClose }) {
  return (
    <div style={{ padding: 20, background: "#fff", border: "1px solid #ccc" }}>
      <h3>Assignment Launcher</h3>
      <p>Type: {type}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
}