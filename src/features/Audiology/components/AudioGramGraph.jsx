import React, { useState } from "react";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  LogarithmicScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  LogarithmicScale,
  Title,
  Tooltip,
  Legend
);

const frequencies = [250, 500, 1000, 2000, 3000, 4000, 6000, 8000];

export default function AudiogramGraph() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (ear, freq, inputValue) => {
    const numericValue = Number(inputValue);

    if (numericValue < -10 || numericValue > 120) {
      setErrors((prev) => ({
        ...prev,
        [`${ear}-${freq}`]: "Range: -10 to 120",
      }));
      return;
    }

    setErrors((prev) => ({
      ...prev,
      [`${ear}-${freq}`]: null,
    }));

    setValues((prev) => ({
      ...prev,
      [ear]: {
        ...prev?.[ear],
        [freq]: numericValue,
      },
    }));
  };

  const chartData = {
    datasets: [
      {
        label: "Air Right",
        data: frequencies.map((freq) => ({
          x: freq,
          y: values?.right?.[freq] ?? null,
        })),
        borderColor: "red",
        backgroundColor: "red",
        pointStyle: "circle",
        spanGaps: true,
      },
      {
        label: "Air Left",
        data: frequencies.map((freq) => ({
          x: freq,
          y: values?.left?.[freq] ?? null,
        })),
        borderColor: "blue",
        backgroundColor: "blue",
        pointStyle: "cross",
        spanGaps: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        type: "linear",
        min: 250,
        max: 8000,
        title: {
          display: true,
          text: "Frequency (Hz)",
        },
        ticks: {
          callback: (value) => value,
        },
      },
      y: {
        reverse: true,
        min: -10,
        max: 120,
        title: {
          display: true,
          text: "Hearing Level (dB HL)",
        },
      },
    },
  };

  return (
    <div style={{ padding: 20 }}>
      {/* HEADER */}
      <div style={styles.gridHeader}>
        <div>Frequency</div>
        <div>Air Conduction Right (dB HL)</div>
        <div>Air Conduction Left (dB HL)</div>
      </div>

      {/* ROWS */}
      {frequencies.map((freq) => (
        <div key={freq} style={styles.gridRow}>
          <div>{freq}</div>

          {/* Right */}
          <div>
            <input
              type="number"
              min="-10"
              max="120"
              value={values?.right?.[freq] ?? ""}
              onChange={(e) =>
                handleChange("right", freq, e.target.value)
              }
              style={styles.input}
            />
            {errors[`right-${freq}`] && (
              <div style={styles.error}>
                {errors[`right-${freq}`]}
              </div>
            )}
          </div>

          {/* Left */}
          <div>
            <input
              type="number"
              min="-10"
              max="120"
              value={values?.left?.[freq] ?? ""}
              onChange={(e) =>
                handleChange("left", freq, e.target.value)
              }
              style={styles.input}
            />
            {errors[`left-${freq}`] && (
              <div style={styles.error}>
                {errors[`left-${freq}`]}
              </div>
            )}
          </div>
        </div>
      ))}

      {/* GRAPH */}
      <div style={{ marginTop: 40 }}>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}

const styles = {
  gridHeader: {
    display: "grid",
    gridTemplateColumns: "1fr 2fr 2fr",
    fontWeight: "bold",
    marginBottom: 8,
  },
  gridRow: {
    display: "grid",
    gridTemplateColumns: "1fr 2fr 2fr",
    marginBottom: 10,
    alignItems: "center",
  },
  input: {
    width: "90px",
    padding: 4,
  },
  error: {
    fontSize: 10,
    color: "red",
  },
};