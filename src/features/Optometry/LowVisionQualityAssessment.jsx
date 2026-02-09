

// export default function LVQoLForm( layout = "root") {
//   const [values, setValues] = React.useState({});

//  const handleChange = (name, value) => {
//   // convert "5" -> 5, keep non-numeric like "na", "not_related" as-is
//   const normalized =
//     typeof value === "string" && !isNaN(value)
//       ? Number(value)
//       : value;

//   const next = { ...values, [name]: normalized };

//   const { total, category } = calculateLVQoL(next);
//   next.lvqol_total = total || "";
//   next.lvqol_category = category || "";

//   setValues(next);
// };


//   return (
//     <>
//       <CommonFormBuilder
//         schema={schema}
//         values={values}
//         onChange={handleChange}
//         submitted={false}
//           layout={layout}
//       />

   
//     </>
//   );
// }

import React from "react";
import CommonFormBuilder from "../CommonComponenets/FormBuilder";


const LVQOL_SCALE = [
  { label: { en: "None", ms: "Tiada" }, value: 5 },
  { label: { en: "Little", ms: "Sedikit" }, value: 4 },
  { label: { en: "Moderate", ms: "Sederhana" }, value: 3 },
  { label: { en: "Great", ms: "Sangat" }, value: 2 },
  { label: { en: "Very great", ms: "Amat sangat" }, value: 1 },
  { label: { en: "Not related", ms: "Tidak berkaitan" }, value: "not_related", required: true },
  { label: { en: "Not available", ms: "Tidak tersedia" }, value: "na", required: true }
];

 const LVQoLSchema = {
  /** 🔑 OPT-IN FLAG */
  enableLanguageToggle: true,

  title: {
    en: "Low Vision Quality of Life Questionnaire (LVQoL)",
    ms: "Soal Selidik Kualiti Hidup Penglihatan Rendah"
  },

 actions: [
  {
    type: "toggle-language",
    label: "Malay"
  }
],


  sections: [
    {
      title: {
        en: "Distance, Mobility & Lighting",
        ms: "Jarak, Pergerakan & Pencahayaan"
      },
      fields: [
        {
          type: "scale-table",
          name: "dml",
          columns: LVQOL_SCALE,
          rows: [
            { en: "With your vision in general", ms: "Dengan penglihatan anda secara am" },
            { en: "Doing tasks for a short period (e.g., reading)", ms: "Melakukan tugasan dalam tempoh singkat (contoh: membaca)" },
            { en: "Vision in low light at home", ms: "Penglihatan dalam cahaya malap di rumah" },
            { en: "Getting the right amount of light to be able to see", ms: "Mendapatkan jumlah pencahayaan yang sesuai untuk melihat" },
            { en: "With glare (e.g., dazzled by car light or the sun)", ms: "Dengan silau (contoh: silau cahaya lampu atau matahari)" },
            { en: "Seeing street signs", ms: "Melihat tanda jalan" },
            { en: "Seeing the television (appreciating the pictures)", ms: "Menonton televisyen (menikmati gambar)" },
            { en: "Seeing moving objects (e.g., cars on the road)", ms: "Melihat objek bergerak (contoh: kereta di jalan)" },
            { en: "Judging the depth or distance of items", ms: "Menilai kedalaman atau jarak objek" },
            { en: "Recognizing faces", ms: "Mengenali wajah" },
            { en: "Getting around outdoors because of your vision", ms: "Bergerak di luar rumah disebabkan oleh penglihatan" },
            { en: "Crossing a road with traffic because of your vision", ms: "Melintas jalan yang sibuk disebabkan oleh penglihatan" }
          ]
        }
      ]
    },

    {
      title: { en: "Adjustment", ms: "Penyesuaian" },
      fields: [
        {
          type: "scale-table",
          name: "adjustment",
          columns: LVQOL_SCALE,
          rows: [
            { en: "Unhappy with your situation in life", ms: "Tidak gembira dengan keadaan hidup anda" },
            { en: "Frustrated at not being able to do certain tasks", ms: "Kecewa kerana tidak dapat melakukan tugasan tertentu" },
            { en: "Restricted in visiting friends or family", ms: "Terhad dalam melawat rakan atau keluarga" },
            { en: "How well has your eye condition been explained to you", ms: "Sejauh mana keadaan mata anda telah diterangkan kepada anda" }
          ]
        }
      ]
    },

    {
      title: { en: "Reading & Fine Work", ms: "Membaca & Kerja Halus" },
      fields: [
        {
          type: "scale-table",
          name: "reading_fine_work",
          columns: LVQOL_SCALE,
          rows: [
            { en: "Reading large print (e.g., newspaper headlines)", ms: "Membaca cetakan besar (contoh: tajuk akhbar)" },
            { en: "Reading newspapers and books", ms: "Membaca surat khabar dan buku" },
            { en: "Reading labels (e.g., on medicine bottles)", ms: "Membaca label (contoh: pada botol ubat)" },
            { en: "Reading your letters and mail", ms: "Membaca surat dan mel anda" },
            { en: "Having problems using tools (e.g., threading a needle or cutting)", ms: "Mengalami masalah menggunakan alat (contoh: memasukkan benang atau memotong)" }
          ]
        }
      ]
    },

    {
      title: { en: "Daily Activities", ms: "Aktiviti Harian" },
      fields: [
        {
          type: "scale-table",
          name: "daily_activities",
          columns: LVQOL_SCALE,
          rows: [
            { en: "Finding the time for yourself", ms: "Mencari masa untuk diri sendiri" },
            { en: "Writing (e.g., cheques or cards)", ms: "Menulis (contoh: cek atau kad)" },
            { en: "Reading your own handwriting", ms: "Membaca tulisan tangan sendiri" },
            { en: "With your everyday activities (e.g., household chores)", ms: "Dengan aktiviti harian anda (contoh: kerja rumah)" }
          ]
        }
      ]
    }
  ]
};



function calculateLVQoL(values) {
  const nums = Object.values(values).filter(v => typeof v === "number");
  const total = nums.reduce((a, b) => a + b, 0);

  let category = "Severe";
  if (total >= 94) category = "Normal";
  else if (total >= 63) category = "Mild";
  else if (total >= 32) category = "Moderate";

  return { total, category };
}

export default function LVQoLForm({ layout = "root" }) {
  const [values, setValues] = React.useState({});
  const [language, setLanguage] = React.useState("en");

  const handleChange = (name, value) => {
    const normalized =
      typeof value === "string" && !isNaN(value) ? Number(value) : value;

    const next = { ...values, [name]: normalized };
    const { total, category } = calculateLVQoL(next);

    next.lvqol_total = total;
    next.lvqol_category = category;

    setValues(next);
  };

const handleAction = (type) => {
  if (type === "toggle-language") {
    setLanguage(l => (l === "en" ? "ms" : "en"));
  }
};


  return (
    <>
      <CommonFormBuilder
        schema={LVQoLSchema}
        values={values}
        onChange={handleChange}
        onAction={handleAction}
        layout={layout}
        language={language}
      />

      {/* Summary */}
      <div style={{ width: "90%", margin: "24px auto", display: "flex", gap: 16 }}>
        <div style={pill("#E0F2FE", "#38BDF8", "#075985")}>
          Total Score: {values.lvqol_total ?? 0}
        </div>
        <div style={pill("#FFF7ED", "#FDBA74", "#9A3412")}>
          Severity: {values.lvqol_category ?? "-"}
        </div>
      </div>
    </>
  );
}

const pill = (bg, border, color) => ({
  flex: 1,
  background: bg,
  border: `1px solid ${border}`,
  borderRadius: 10,
  padding: "14px 18px",
  fontSize: 16,
  fontWeight: 700,
  color
});


const summaryWrap = {
  width: "90%",
  margin: "24px auto",
  padding: 20
};

const scoreRow = {
  display: "flex",
  gap: 16,
  flexWrap: "wrap"
};

const scorePill = {
  flex: 1,
  background: "#E0F2FE",
  border: "1px solid #38BDF8",
  borderRadius: 10,
  padding: "14px 18px",
  fontSize: 16,
  fontWeight: 700,
  color: "#075985",
  minWidth: 260
};

const severityPill = {
  flex: 1,
  background: "#FFF7ED",
  border: "1px solid #FDBA74",
  borderRadius: 10,
  padding: "14px 18px",
  fontSize: 16,
  fontWeight: 700,
  color: "#9A3412",
  minWidth: 260
};

