import React, { useState } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

const SCHEMA = {
  title: "Borang Persetujuan Prosedur / Procedure Consent Form — Dry Needling Therapy",
  actions: [
    { type: "back",  label: "Back"  },
    { type: "clear", label: "Clear" },
    { type: "save",  label: "Save"  },
  ],
  sections: [
    {
      fields: [

        /* ── 1. Introduction ── */
        {
          type: "info-text",
          text:
            "1. Pengenalan (Introduction)\n\n" +
            "Dengan menandatangani dokumen ini, saya dengan ini mengesahkan bahawa saya telah diberikan penerangan secara terperinci, mencukupi serta dapat difahami sepenuhnya berkenaan satu bentuk intervensi terapi fizikal yang dikenali sebagai Dry Needling (selepas ini dirujuk sebagai \"Prosedur\"), yang merupakan satu kaedah rawatan fizikal atau terapi yang melibatkan penggunaan jarum steril sekali guna yang dimasukkan ke dalam lapisan kulit atau tisu di bawahnya, tanpa sebarang suntikan ubat, dengan tujuan untuk membantu mengurangkan kesakitan, meningkatkan pergerakan, serta menangani ketidakselesaan atau ketidakupayaan fizikal. Saya dimaklumkan bahawa, seperti mana-mana rawatan perubatan lain, prosedur ini juga boleh melibatkan risiko atau kesan sampingan. Walaupun risiko tersebut jarang berlaku, saya faham bahawa ia tetap wujud dan penting untuk difahami sebelum saya memberikan persetujuan untuk menjalani rawatan ini.\n\n" +
            "By signing this document, I hereby confirm that I have been provided with a detailed, sufficient and fully understandable explanation regarding a form of physical therapy intervention known as Dry Needling (hereinafter referred to as \"the Procedure\"), which is a method of physical treatment or therapy involving the use of single-use sterile needles inserted into the skin or underlying tissues, without the injection of any medication, with the aim of helping to reduce pain, improve movement and address physical discomfort or disability. I have been informed that, like any other medical treatment, this Procedure may also involve certain risks or side effects. Although such risks are rare, I understand that they do exist and it is important for me to comprehend them fully before giving my consent to undergo this treatment.",
        },

        /* ── 2. Risks ── */
        {
          type: "info-text",
          text:
            "2. Risiko Prosedur (Risks of Procedure):\n" +
            "a) Penggunaan jarum di dalam apa-apa prosedur melibatkan risiko jangkitan yang sangat kecil. Namun, untuk memastikan keselamatan pesakit, hanya jarum steril pakai buang yang baharu akan digunakan di dalam Prosedur ini. Kes jangkitan adalah sangat jarang berlaku.\n" +
            "Using needles in any procedure carries a very small risk of infection. However, to ensure patient safety in the Procedure, only new, single-use sterile needles will be used. Infections are extremely rare.\n\n" +
            "b) Terdapat kemungkinan di mana jarum mungkin secara tidak sengaja tertusuk ke dalam salur darah (arteri atau vena) atau saraf. Jika ini berlaku pada salur darah, lebam (hematoma) mungkin muncul, tetapi pendarahan biasanya akan berhenti dengan cepat setelah tekanan diberikan pada kawasan tersebut. Jika jarum terkena saraf, pesakit mungkin akan merasa sensasi seperti mencucuk-cucuk (parestesia), namun ini selalunya bersifat sementara.\n\n" +
            "A needle may be placed inadvertently in an artery, nerve or vein. If an artery or vein is punctured, a haematoma (bruise) will develop, the bleeding will cease quickly with adequate compression. If a needle contacts a nerve, it may cause paraesthesia (a prickling sensation) which may continue for a brief moment.\n\n" +
            "c) Jika jarum dimasukkan berdekatan dengan dinding dada, terdapat kemungkinan yang sangat jarang berlaku di mana udara boleh memasuki rongga dada (pneumotoraks). Keadaan ini boleh dirawat dengan segera.\n\n" +
            "When a needle is placed close to the chest wall, there is a rare possibility of a pneumothorax (air in the chest cavity). All these complications are readily reversible.\n\n" +
            "d) Selepas menjalani Prosedur ini, pesakit mungkin mengalami peningkatan kesakitan atau ketidakselesaan selama 1 hingga 2 hari sebelum merasai kelegaan. Kesakitan ini biasanya mirip dengan rasa sengal otot selepas bersenam (muscle soreness).\n\n" +
            "The Procedure may cause an increase in pain for one or two days, followed by an improvement in the overall pain state. The increased pain is likened to the muscular soreness post exercise.",
        },

        /* ── Health Declaration ── */
        {
          type: "info-text",
          text:
            "Perisytiharan Berkenaan Status Kesihatan Semasa (Declaration of Current Health Status)\n" +
            "Bagi memastikan keselamatan serta kesesuaian pelaksanaan Prosedur ini, saya dengan ini membuat pernyataan berhubung keadaan kesihatan saya seperti berikut, dan mengesahkan bahawa semua maklumat yang diberikan adalah benar, lengkap dan tepat setakat pengetahuan saya:\n" +
            "To ensure the safety and suitability of the Procedure, I hereby declare the following information regarding my current health condition, and confirm that all information provided is true, complete, and accurate to the best of my knowledge:",
        },

        {
          name: "anticoagulants",
          label:
            "Saya sedang mengambil ubat pencair darah (antikoagulan).\n" +
            "I am currently taking blood-thinning medication (anticoagulants)?",
          type: "radio",
          labelAbove: true,
          options: [
            { label: "YES / YA",    value: "yes" },
            { label: "NO / TIDAK",  value: "no"  },
          ],
        },
        {
          name: "pregnant",
          label:
            "Saya sedang hamil atau terdapat kemungkinan saya sedang hamil.\n" +
            "I am currently pregnant or there is a possibility that I may be pregnant.",
          type: "radio",
          labelAbove: true,
          options: [
            { label: "YES / YA",    value: "yes" },
            { label: "NO / TIDAK",  value: "no"  },
          ],
        },
        {
          name: "immune_disorder",
          label:
            "Saya mempunyai penyakit atau gangguan berkaitan sistem imun, atau kekhuatiran berkenaan fungsi imunisasi tubuh saya.\n" +
            "I have a medical condition or disorder related to the immune system, or concerns about my body's immune function.",
          type: "radio",
          labelAbove: true,
          options: [
            { label: "YES / YA",    value: "yes" },
            { label: "NO / TIDAK",  value: "no"  },
          ],
        },
        {
          name: "communicable_disease",
          label:
            "Saya menghidap penyakit berjangkit yang boleh menular melalui cecair badan (seperti HIV, Hepatitis B atau Hepatitis C).\n" +
            "I have a communicable disease that can be transmitted through bodily fluids (such as HIV, Hepatitis B, or Hepatitis C).",
          type: "radio",
          labelAbove: true,
          options: [
            { label: "YES / YA",    value: "yes" },
            { label: "NO / TIDAK",  value: "no"  },
          ],
        },

        /* ── Indemnity statement ── */
        {
          type: "info-text",
          text:
            "Saya faham bahawa ketepatan maklumat yang diberikan adalah penting bagi memastikan bahawa Prosedur ini dapat dijalankan dengan selamat dan berkesan. Sekiranya terdapat kegagalan dalam mendedahkan maklumat yang relevan, saya akur bahawa ia mungkin akan menjejaskan keberkesanan Prosedur tersebut dan berpotensi membawa risiko komplikasi yang tidak dijangka kepada diri saya. Sehubungan itu, saya bersetuju bahawa Pusat Rehabilitasi PERKESO tidak akan dipertanggungjawabkan ke atas sebarang implikasi atau kesan yang mungkin timbul akibat daripada maklumat yang tidak benar, tidak lengkap atau tidak didedahkan oleh saya.\n\n" +
            "I acknowledge and accept that the accuracy and completeness of the information disclosed by me are essential to facilitate the safe and effective administration of the Procedure. I further understand that any omission, misrepresentation, or failure to disclose relevant medical information may compromise the efficacy of the Procedure and give rise to unforeseen complications. Accordingly, I hereby agree to release and indemnify Pusat Rehabilitasi PERKESO from any and all liability, claims, losses, or damages that may arise as a result of any false, incomplete, or undisclosed information provided by me.",
        },

        /* ── Consent statements ── */
        {
          type: "info-text",
          text:
            "Saya dengan ini mengesahkan bahawa saya telah menerima penerangan yang mencukupi, jelas dan difahami berkenaan prosedur, risiko serta manfaat berkaitan Prosedur tersebut.\n\n" +
            "I hereby confirm that I have received sufficient, clear and comprehensible information regarding the Procedure, including its nature, associated risks, and potential benefits.",
        },
        {
          type: "info-text",
          text:
            "Bersetuju untuk menjalani Prosedur Dry Needling seperti yang dicadangkan. Lokasi badan yang hendak dirawat adalah seperti berikut:\n\n" +
            "Consent to undergo the Procedure as recommended by the therapist. The location of the body to be treated is as follows:",
        },
        {
          type: "info-text",
          text:
            "Mengakui bahawa beberapa sesi rawatan bagi Prosedur ini mungkin diperlukan (sekiranya dinyatakan perlu oleh ahli terapi), dan oleh itu, persetujuan ini meliputi rawatan awal serta mana-mana rawatan susulan yang berkaitan pada masa akan datang.\n\n" +
            "Acknowledge that multiple sessions of the Procedure may be necessary (if advised), and therefore, this consent shall apply to the initial session as well as any subsequent related sessions.",
        },
        {
          type: "info-text",
          text:
            "Bersetuju untuk menanggung sendiri sebarang liabiliti berkaitan komplikasi yang tidak dijangka atau tidak diketahui, yang mungkin timbul akibat daripada pelaksanaan Prosedur ini, selaras dengan maklumat yang telah diberikan kepada saya.\n\n" +
            "Accept and assume full responsibility for any unforeseen or unknown complications that may arise from the Procedure, based on the information that has been explained to me.",
        },
        {
          type: "info-text",
          text:
            "Memahami dan bersetuju bahawa sebarang isu berkaitan undang-undang yang timbul daripada Prosedur ini adalah tertakluk kepada bidang kuasa eksklusif Mahkamah di Malaysia, dan setiap pihak akan menanggung kos guaman masing-masing, melainkan ditentukan sebaliknya oleh mahkamah.\n\n" +
            "Understand that any legal matters arising from the Procedure shall fall under the exclusive jurisdiction of the courts of Malaysia, and that each party shall bear their own legal costs, unless otherwise directed by the court.",
        },

        /* ── Client & Therapist details ── */
        { name: "client_name",    label: "Client's Name / Nama Klien",       type: "input" },
        { name: "client_ic",      label: "I.C Number / No K.P",              type: "input" },
        { name: "consent_date",   label: "Date / Tarikh",                     type: "date"  },
        { name: "therapist_name", label: "Therapist Name / Nama Ahli Terapi", type: "input" },
    
        /* ── Final declaration ── */
        {
          type: "info-text",
          text:
            "Hereby, I certify that / Dengan ini, saya mengesahkan bahawa:\n" +
            "I have read this form and fully agree with all the terms. / Saya telah membaca borang ini dan bersetuju sepenuhnya dengan semua syarat.",
        },
      ],
    },
  ],
};

export default function DryNeedling({ patient, onBack, onSubmit, onValuesChange, initialValues = {} }) {
  const [values,    setValues]    = useState(() => ({
    ...(initialValues || {}),
    client_name: initialValues?.client_name || patient?.name || "",
    client_ic:   initialValues?.client_ic   || patient?.id   || "",
  }));
  const [submitted, setSubmitted] = useState(false);
  const storageKey = patient ? `dry_needling_consent_${patient.id}` : null;

  const onChange = (name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
    onValuesChange?.({ ...values, [name]: value });
  };

    const handleAction = (type) => {
    if (type === "submit") {
        handleSubmit();
        return;
    }
    if (type === "back") {
        onBack?.();
        return;
    }
    if (type === "clear") {
        setValues({});
        setSubmitted(false);
        if (storageKey) localStorage.removeItem(storageKey);
        return;
    }
    if (type === "save") {
        if (storageKey) {
            localStorage.setItem(
            storageKey,
            JSON.stringify({ values, updatedAt: new Date() })
            );
        }
        alert("Consent form draft saved.");
        
        onSubmit?.(values);
        return;
        }
    };

  const handleSubmit = () => {
    if (!values.client_name || !values.client_ic) {
      alert("Please fill in the client name and IC number.");
      return;
    }
    setSubmitted(true);
    if (storageKey)
      localStorage.setItem(storageKey, JSON.stringify({ values, submittedAt: new Date() }));
    onSubmit?.(values);
    alert("Consent form submitted successfully.");
  };

  return (
    <div style={{ width: "100%" }}>
      <CommonFormBuilder
        schema={SCHEMA}
        values={values}
        onChange={onChange}
        submitted={submitted}
        onAction={handleAction}
      >
      </CommonFormBuilder>
    </div>
  );
}
