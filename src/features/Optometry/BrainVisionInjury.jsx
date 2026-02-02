import React, { useState } from "react";
import CommonFormBuilder from "../CommonComponenets/FormBuilder";

export default function BrainVisionInjury ({ onBack, layout = "root" }) {
  const [values, setValues] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [language, setLanguage] = useState("en");
const BIVSS_SCALE = [
  { label: { en: "Never", ms: "Tidak pernah" }, value: 0 },
  { label: { en: "Rarely", ms: "Jarang" }, value: 1 },
  { label: { en: "Sometimes", ms: "Kadang-kadang" }, value: 2 },
  { label: { en: "Often", ms: "Kerap" }, value: 3 },
  { label: { en: "Always", ms: "Sentiasa" }, value: 4 }
];

const BIVSS_SCHEMA = {
  enableLanguageToggle: true,

  title: {
    en: "Brain Injury Vision Symptoms Survey (BIVSS)",
    ms: "Soal Selidik Bahasa Melayu bagi Gejala Penglihatan dalam Kalangan Pesakit yang Mengalami Kecederaan Otak"
  },

  actions: [
    { type: "toggle-language" }
  ],

  sections: [
    // ================= VISION CLARITY =================
    {
      title: {
        en: "VISION CLARITY",
        ms: "KEJELASAN PENGLIHATAN"
      },
      fields: [
        {
          type: "scale-table",
          name: "vision_clarity",
          columns: BIVSS_SCALE,
          rows: [
            {
              en: "Distance vision is blurred and unclear even with glasses",
              ms: "Penglihatan jarak jauh kabur dan tidak jelas walaupun dengan pemakaian kaca mata"
            },
            {
              en: "Near vision is blurred and unclear even with glasses",
              ms: "Penglihatan jarak dekat kabur dan tidak jelas walaupun dengan pemakaian kaca mata"
            },
            {
              en: "Vision clarity changes throughout the day",
              ms: "Kejelasan penglihatan berubah-ubah sepanjang hari"
            },
            {
              en: "Night vision is unclear / unable to see well in low light",
              ms: "Penglihatan pada waktu malam tidak jelas / tidak dapat melihat dengan baik dalam cahaya malap"
            }
          ]
        }
      ]
    },

    // ================= VISUAL COMFORT =================
    {
      title: {
        en: "VISUAL COMFORT",
        ms: "KESELESAAN PENGLIHATAN"
      },
      fields: [
        {
          type: "scale-table",
          name: "visual_comfort",
          columns: BIVSS_SCALE,
          rows: [
            {
              en: "Eyes feel uncomfortable, painful, or tired",
              ms: "Mata terasa tidak selesa, sakit atau letih"
            },
            {
              en: "Headache or dizziness after using the eyes",
              ms: "Sakit kepala atau pening selepas menggunakan mata"
            },
            {
              en: "Eye pain or soreness after prolonged use",
              ms: "Rasa sakit atau pedih pada mata selepas penggunaan berpanjangan"
            },
            {
              en: "Tight or heavy feeling around the eyes",
              ms: "Rasa tegang atau berat di sekitar mata"
            }
          ]
        }
      ]
    },

    // ================= DOUBLE VISION =================
    {
      title: {
        en: "DOUBLE VISION",
        ms: "PENGLIHATAN BERGANDA"
      },
      fields: [
        {
          type: "scale-table",
          name: "double_vision",
          columns: BIVSS_SCALE,
          rows: [
            {
              en: "Double vision especially when eyes feel tired",
              ms: "Penglihatan menjadi berganda terutamanya apabila mata berasa letih"
            },
            {
              en: "Need to close one eye to see clearly",
              ms: "Terpaksa menutup sebelah mata untuk melihat dengan jelas"
            },
            {
              en: "Words appear to move when reading",
              ms: "Tulisan kelihatan seperti bergerak ketika membaca"
            }
          ]
        }
      ]
    },

    // ================= LIGHT SENSITIVITY =================
    {
      title: {
        en: "LIGHT SENSITIVITY",
        ms: "SENSITIVITI TERHADAP CAHAYA"
      },
      fields: [
        {
          type: "scale-table",
          name: "light_sensitivity",
          columns: BIVSS_SCALE,
          rows: [
            {
              en: "Discomfort (glare) with indoor lighting",
              ms: "Rasa tidak selesa (silau) dengan cahaya di dalam bangunan"
            },
            {
              en: "Need to wear dark glasses outdoors",
              ms: "Terpaksa memakai cermin mata hitam apabila berada di luar"
            },
            {
              en: "Indoor lighting interferes with vision",
              ms: "Cahaya di dalam bangunan mengganggu penglihatan"
            }
          ]
        }
      ]
    },

    // ================= DRY EYES =================
    {
      title: {
        en: "DRY EYES",
        ms: "MATA KERING"
      },
      fields: [
        {
          type: "scale-table",
          name: "dry_eyes",
          columns: BIVSS_SCALE,
          rows: [
            {
              en: "Eyes feel dry and painful",
              ms: "Mata terasa kering dan pedih"
            },
            {
              en: "Frequently feel the urge to blink",
              ms: "Kerap terasa hendak berkelip"
            },
            {
              en: "Frequently rub the eyes",
              ms: "Kerap menggosok mata"
            }
          ]
        }
      ]
    },

    // ================= DEPTH PERCEPTION =================
    {
      title: {
        en: "DEPTH PERCEPTION",
        ms: "KEBOLEHAN MENGANGGAR JARAK"
      },
      fields: [
        {
          type: "scale-table",
          name: "depth_perception",
          columns: BIVSS_SCALE,
          rows: [
            {
              en: "Difficulty judging position of objects",
              ms: "Sukar menilai kedudukan sesuatu objek"
            },
            {
              en: "Unsteady when walking / easily trip or stumble",
              ms: "Kurang yakin ketika berjalan / mudah tersandung atau terjatuh"
            },
            {
              en: "Handwriting becomes messy",
              ms: "Tulisan menjadi tidak kemas"
            }
          ]
        }
      ]
    },

    // ================= PERIPHERAL VISION =================
    {
      title: {
        en: "PERIPHERAL VISION",
        ms: "PENGLIHATAN SISI"
      },
      fields: [
        {
          type: "scale-table",
          name: "peripheral_vision",
          columns: BIVSS_SCALE,
          rows: [
            {
              en: "Side vision appears blurred or objects seem to move",
              ms: "Penglihatan sisi kelihatan kabur atau objek seolah-olah bergerak"
            },
            {
              en: "Objects in front are not always directly in front",
              ms: "Objek yang dilihat di hadapan tidak semestinya berada tepat di hadapan"
            }
          ]
        }
      ]
    },

    // ================= READING =================
    {
      title: {
        en: "READING",
        ms: "PEMBACAAN"
      },
      fields: [
        {
          type: "scale-table",
          name: "reading",
          columns: BIVSS_SCALE,
          rows: [
            {
              en: "Poor concentration or easily distracted while reading",
              ms: "Daya tumpuan rendah atau mudah terganggu ketika membaca"
            },
            {
              en: "Difficulty or slowness when reading and writing",
              ms: "Mengalami kesukaran atau kelambatan ketika membaca dan menulis"
            },
            {
              en: "Poor comprehension or cannot remember what was read",
              ms: "Kurang pemahaman atau tidak dapat mengingati apa yang dibaca"
            },
            {
              en: "Lose place or skip words while reading",
              ms: "Keliru atau terlepas perkataan ketika membaca"
            },
            {
              en: "Need to use finger to keep place while reading",
              ms: "Perlu menggunakan jari untuk mengekalkan kedudukan semasa membaca"
            }
          ]
        }
      ]
    }
  ]
};

const handleAction = (type) => {
  if (type === "toggle-language") {
    setLanguage(l => (l === "en" ? "ms" : "en"));
  }
};

  const onChange = (name, value) => {
    setValues(v => ({ ...v, [name]: value }));
  };

  const onAction = (type) => {
    if (type === "submit") {
      setSubmitted(true);
      console.log("PAED IA Speech & Language", values);
    }

    if (type === "back") {
      onBack?.();   
    }
  };


  return (
    <CommonFormBuilder
      schema={BIVSS_SCHEMA}
      values={values}
      onChange={onChange}
      submitted={submitted}
        onAction={handleAction}
        layout={layout}
                language={language}

    />
  );
}
