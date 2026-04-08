import React, { useState } from "react";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const frequencies = [250, 500, 1000, 2000, 3000, 4000,5000, 6000,7000, 8000];

const earTypes = ["airRight", "airLeft", "boneRight", "boneLeft"];

const columnLabels = {
  airRight: "Air Conduction Right (dB HL)",
  airLeft: "Air Conduction Left (dB HL)",
  boneRight: "Bone Conduction Right (dB HL)",
  boneLeft: "Bone Conduction Left (dB HL)",
};

export default function AudiogramGraph() {
  const [values, setValues] = useState({
    airRight: {},
    airLeft: {},
    boneRight: {},
    boneLeft: {},
  });
  const [errors, setErrors] = useState({});

  const handleChange = (type, freq, inputValue) => {
    if (inputValue === "") {
      setErrors((prev) => ({ ...prev, [`${type}-${freq}`]: null }));
      setValues((prev) => ({
        ...prev,
        [type]: { ...prev[type], [freq]: undefined },
      }));
      return;
    }

    const numericValue = Number(inputValue);

    if (numericValue < -10 || numericValue > 120) {
      setErrors((prev) => ({
        ...prev,
        [`${type}-${freq}`]: "Range: -10 to 120",
      }));
      return;
    }

    setErrors((prev) => ({ ...prev, [`${type}-${freq}`]: null }));
    setValues((prev) => ({
      ...prev,
      [type]: { ...prev[type], [freq]: numericValue },
    }));
  };

  const chartData = {
    datasets: [
      {
        label: "Air Right",
        data: frequencies.map((freq) => ({
          x: freq,
          y: values.airRight[freq] ?? null,
        })),
        borderColor: "red",
        backgroundColor: "red",
        pointStyle: "circle",
        pointRadius: 5,
        borderWidth: 2,
        spanGaps: true,
      },
      {
        label: "Air Left",
        data: frequencies.map((freq) => ({
          x: freq,
          y: values.airLeft[freq] ?? null,
        })),
        borderColor: "blue",
        backgroundColor: "blue",
        pointStyle: "crossRot",
        pointRadius: 5,
        borderWidth: 2,
        spanGaps: true,
      },
      {
        label: "Bone Right",
        data: frequencies.map((freq) => ({
          x: freq,
          y: values.boneRight[freq] ?? null,
        })),
        borderColor: "red",
        backgroundColor: "red",
        pointStyle: "circle",
        pointRadius: 5,
        borderWidth: 2,
        spanGaps: true,
      },
      {
        label: "Bone Left",
        data: frequencies.map((freq) => ({
          x: freq,
          y: values.boneLeft[freq] ?? null,
        })),
         borderColor: "blue",
        backgroundColor: "blue",
        pointStyle: "crossRot",
        pointRadius: 5,
        borderWidth: 2,
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
          callback: (value) =>
            frequencies.includes(value) ? value : "",
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
        ticks: {
          stepSize: 10,
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
        labels: {
        // usePointStyle: true,
      },
      },
    },
  };

  return (
    <div style={{ padding: 20 }}>
      {/* HEADER */}
      <div style={styles.gridHeader}>
        <div>Frequency</div>
        {earTypes.map((type) => (
          <div
            key={type}
            style={{
              color: type.includes("Right") ? "black" : "black",
            }}
          >
            {columnLabels[type]}
          </div>
        ))}
      </div>

      {/* ROWS */}
      {frequencies.map((freq) => (
        <div key={freq} style={styles.gridRow}>
          <div>{freq}</div>

          {earTypes.map((type) => (
            <div key={type}>
              <input
                type="number"
                min="-10"
                max="120"
                value={values[type][freq] ?? ""}
                onChange={(e) => handleChange(type, freq, e.target.value)}
                style={styles.input}
              />
              {errors[`${type}-${freq}`] && (
                <div style={styles.error}>{errors[`${type}-${freq}`]}</div>
              )}
            </div>
          ))}
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
    gridTemplateColumns: "80px repeat(4, 1fr)",
    fontWeight: "bold",
    marginBottom: 8,
    gap: 8,
    fontSize: 13,
  },
  gridRow: {
    display: "grid",
    gridTemplateColumns: "80px repeat(4, 1fr)",
    marginBottom: 10,
    alignItems: "center",
    gap: 8,
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