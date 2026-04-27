import React, { useState } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

const SCHEMA = {
  title: "Acknowledgment of Risk and Release — Wall Climbing / Rappelling",
  actions: [
    { type: "back",  label: "Back"  },
    { type: "clear", label: "Clear" },
    { type: "save",  label: "Save"  },
  ],
  sections: [
    {
      fields: [

        /* ── Intro ── */
        {
          type: "info-text",
          text:
            "There are significant elements of risk in any activities at the Pusat Rehabilitasi PERKESO Sdn. Bhd. Climbing Wall. It is not always within the power of the PERKESO Climbing Wall Staff to protect all participants at all times from the hazards of wall climbing or rappelling. The risk involved in wall climbing includes known and unknown dangers such as loss of or damage to equipment, accidental injury, permanent trauma, or loss of life.",
        },

        /* ── Acknowledge of Risk heading + list ── */
        {
          type: "info-text",
          text:
            "ACKNOWLEDGE OF RISK\n\n" +
            "I hereby acknowledge and agree that the use of the PERKESO Climbing Wall has inherent risks. I have full knowledge of the nature and extent of all risks associated with wall climbing, including but not limited to:\n\n" +
            "• Injury from falling from high elevations (up to 6 meters) and impacting against the wall or landing surface\n" +
            "• Injury in the form of cuts, bruises, abrasions, muscle/tendon strain, and rope burns\n" +
            "• Injury from equipment or other debris falling from above the climber and belayer\n" +
            "• Injury from choosing not to wear a helmet. Helmets are provided free and by choosing not to wear a helmet, I am exposing myself to an increased risk\n" +
            "• Injury from choosing to wear my personal harness. By using my personal harness I am responsible for inspecting the harness and monitoring its upkeep\n" +
            "• Failure to follow the above safety policies and procedures and/or follow directions from the PERKESO Climbing Team personnel\n" +
            "• The presence, actions, or falls of other participants\n" +
            "• Misuse of equipment or facilities in the climbing area\n" +
            "• Injury caused by belayer (climbing partner) negligence. I understand that it is important that I choose my climbing partner carefully, and that I am responsible in verifying their wall certification and skill level\n" +
            "• Fatigue, chill and/or dizziness, which may diminish reaction time and increase the risk of accident\n" +
            "• Slips, trips, falls or painful crashes while using the facilities or equipment in the climbing area",
        },

        /* ── Assumption of Risk heading + 3 numbered points ── */
        {
          type: "info-text",
          text:
            "ASSUMPTION OF RISK AND RESPONSIBILITY\n\n" +
            "In recognition of the inherent risks of the above activity and in consideration of my use of the PERKESO Climbing Wall, I the undersigned user, agree to release and on behalf of myself, my heirs, representatives, executors, administrators, and assigns hereby do release Pusat Rehabilitasi PERKESO Sdn. Bhd., its officers, employees, participants and all other persons or entities acting in any capacity on its behalf from any cause of action, claims, demands of any nature related to my use of the climbing wall, including injury or damage due to the negligence of Pusat Rehabilitasi PERKESO Sdn. Bhd. and its employees, as follow:\n\n" +
            "1. I acknowledge that wall climbing/rappelling entails known and unanticipated risks, which could result in physical or emotional injury, paralysis, death or damage to myself, to property or to third parties. I hereby certify that I have full knowledge of the nature of risks of the climbing wall and further understand that such risks simply cannot be eliminated without jeopardizing the essential qualities of the activity.\n\n" +
            "2. I expressly agree and promise to accept and assume all of the risks existing in this activity. My participation in this activity is purely voluntary and I elect to participate in spite of the risks.\n\n" +
            "3. Should Pusat Rehabilitasi PERKESO Sdn. Bhd. or anyone acting on its behalf, be required to incur attorney's fees and costs to enforce this agreement, I agree to indemnify and hold such harmless for all fees and costs.",
        },

        /* ── Certification statement ── */
        {
          type: "info-text",
          text:
            "I certify that I have fully understood the forgoing policies, acknowledgement of risks, and assumption of risk and responsibility. I agree to abide by the policies and procedures listed above and follow all directions of the climbing wall staff. I further understand that the terms of this agreement are legally binding.",
        },

        /* ── Participant details ── */
        { name: "participant_name", label: "Participant's Name / Nama Peserta", type: "input" },
        { name: "participant_ic",   label: "I.C Number / No K.P",               type: "input" },
        { name: "consent_date",     label: "Date / Tarikh",                      type: "date"  },

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

export default function WallClimbing({ patient, onBack, onSubmit, onValuesChange, initialValues = {} }) {
  const [values,    setValues]    = useState(() => ({
    ...(initialValues || {}),
    participant_name: initialValues?.participant_name || patient?.name || "",
    participant_ic:   initialValues?.participant_ic   || patient?.id   || "",
  }));
  const [submitted, setSubmitted] = useState(false);
  const storageKey = patient ? `wall_climbing_consent_${patient.id}` : null;

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
    if (!values.participant_name || !values.participant_ic) {
      alert("Please fill in the participant name and IC number.");
      return;
    }
    setSubmitted(true);
    if (storageKey)
      localStorage.setItem(storageKey, JSON.stringify({ values, submittedAt: new Date() }));
    onSubmit?.(values);
    alert("Wall climbing consent form submitted successfully.");
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
