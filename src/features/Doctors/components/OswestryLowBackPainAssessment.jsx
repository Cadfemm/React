import React, { useMemo } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

export default function OswestryLowBackPainAssessment({ values, onChange }) {
  const schema = useMemo(() => {
    return {
      title: "Oswestry Low Back Pain Disability Questionnaire",
      sections: [
        {
          fields: [
            {
              name: "oswestry_pain_intensity",
              label: "Section 1 – Pain Intensity",
              type: "radio",
 labelAbove:true,              options: [
                { label: "I can tolerate the pain I have without having to use pain medication.", value: 0 },
                { label: "The pain is bad but I manage without having to take pain medication.", value: 1 },
                { label: "Pain medication provides me complete relief from pain.", value: 2 },
                { label: "Pain medication provides me moderate relief from pain.", value: 3 },
                { label: "Pain medication provides me little relief from pain.", value: 4 },
                { label: "Pain medication has no effect on the pain", value: 5 }
              ]
            },
            {
              name: "oswestry_personal_care",
              label: "Section 2 – Personal Care (Washing, Dressing, etc.)",
              type: "radio",
             
              labelAbove:true,
              options: [
                { label: "I can take care of myself normally without causing increased pain.", value: 0 },
                { label: "I can take care of myself normally but it increases my pain.", value: 1 },
                { label: "It is painful to take care of myself and I am slow and careful.", value: 2 },
                { label: "I need help but I am able to manage most of my personal care.", value: 3 },
                { label: "I need help every day in most aspects of my care.", value: 4 },
                { label: "I do not get dressed, wash with difficulty and stay in bed.", value: 5 }
              ]
            },
            {
              name: "oswestry_lifting",
              label: "Section 3 – Lifting",
              type: "radio",
               labelAbove:true,
              options: [
                { label: "I can lift heavy weights without increased pain.", value: 0 },
                { label: "I can lift heavy weights but it causes increased pain.", value: 1 },
                { label: "Pain prevents me from lifting heavy weights off the floor, but I can manage if weights are conveniently positioned, e.g. on a table.", value: 2 },
                { label: "Pain prevents me from lifting heavy weights but I can manage light to medium weights if they are conveniently positioned.", value: 3 },
                { label: "I can lift only very light weights.", value: 4 },
                { label: "I cannot lift or carry anything at all.", value: 5 }
              ]
            },
            {
              name: "oswestry_walking",
              label: "Section 4 - Walking",
              type: "radio",
               labelAbove:true,
              options: [
                { label: "Pain does not prevent me walking any distance.", value: 0 },
                { label: "Pain prevents me walking more than 1 mile.", value: 1 },
                { label: "Pain prevents me walking more than ½ mile", value: 2 },
                { label: "Pain prevents me walking more than ¼ mile", value: 3 },
                { label: "I can only walk using crutches or a cane.", value: 4 },
                { label: "I am in bed most of the time and have to crawl to the toilet.", value: 5 }
              ]
            },
            {
              name: "oswestry_sitting",
              label: "Section 5 - Sitting",
              type: "radio",
               labelAbove:true,
              options: [
                { label: "I can sit in any chair as long as I like.", value: 0 },
                { label: "I can only sit in my favorite chair as long as I like.", value: 1 },
                { label: "Pain prevents me sitting more than 1 hour.", value: 2 },
                { label: "Pain prevents me from sitting more than ½ hour.", value: 3 },
                { label: "Pain prevents me from sitting more than 10 mins.", value: 4 },
                { label: "Pain prevents me from sitting at all.", value: 5 }
              ]
            },
            {
              name: "oswestry_standing",
              label: "Section 6 – Standing",
              type: "radio",
               labelAbove:true,
              options: [
                { label: "I can stand as long as I want without increased pain.", value: 0 },
                { label: "I can stand as long as I want but increases my pain.", value: 1 },
                { label: "Pain prevents me from standing for more than 1 hour.", value: 2 },
                { label: "Pain prevents me from standing for more than ½ hour.", value: 3 },
                { label: "Pain prevents me from standing for more than 10 mins.", value: 4 },
                { label: "Pain prevents me from standing at all.", value: 5 }
              ]
            },
            {
              name: "oswestry_sleeping",
              label: "Section 7 – Sleeping",
              type: "radio",
               labelAbove:true,
              options: [
                { label: "Pain does not prevent me from sleeping well.", value: 0 },
                { label: "I can sleep well only by using pain medication.", value: 1 },
                { label: "Even when I take pain medication, I sleep less than 6 hours.", value: 2 },
                { label: "Even when I take pain medication, I sleep less than 4 hours.", value: 3 },
                { label: "Even when I take pain medication, I sleep less than 2 hours.", value: 4 },
                { label: "Pain prevents me from sleeping at all", value: 5 }
              ]
            },
            {
              name: "oswestry_social_life",
              label: "Section 8 – Social Life",
              type: "radio",
               labelAbove:true,
              options: [
                { label: "My social life is normal and does not increase my pain.", value: 0 },
                { label: "My social life is normal, but it increases my level of pain.", value: 1 },
                { label: "Pain prevents me from participating in more energetic activities (ex sports, dancing, etc.", value: 2 },
                { label: "Pain prevents me from going out very often.", value: 3 },
                { label: "Pain has restricted my social life to my home.", value: 4 },
                { label: "I have hardly any social life because of my pain.", value: 5 }
              ]
            },
            {
              name: "oswestry_traveling",
              label: "Section 9 – Traveling",
              type: "radio",
               labelAbove:true,
              options: [
                { label: "I can travel anywhere without increased pain.", value: 0 },
                { label: "I can travel anywhere but it increases my pain.", value: 1 },
                { label: "Pain restricts travel over 2 hours.", value: 2 },
                { label: "Pain restricts travel over 1 hour.", value: 3 },
                { label: "Pain restricts my travel to short necessary journeys under ½ hour.", value: 4 },
                { label: "Pain prevents all travel except for visits to the doctor/therapist or hospital.", value: 5 }
              ]
            },
            {
              name: "oswestry_employment",
              label: "Section 10 – Employment/Homemaking",
              type: "radio",
               labelAbove:true,
              options: [
                { label: "My normal homemaking/job activities do not cause pain.", value: 0 },
                { label: "My normal homemaking/job activities increase my pain, but I can still perform all that is required of me.", value: 1 },
                { label: "I can perform most of my homemaking/job duties, but pain prevents me from performing more physically stressful activities (ex. Lifting, vacuuming).", value: 2 },
                { label: "Pain prevents me from doing anything but light duties.", value: 3 },
                { label: "Pain prevents me from doing even light duties.", value: 4 },
                { label: "Pain prevents me from performing any job/homemaking chores.", value: 5 }
              ]
            }
          ]
        }
      ]
    };
  }, []);

  const calculateScore = () => {
    const fields = [
      "oswestry_pain_intensity",
      "oswestry_personal_care",
      "oswestry_lifting",
      "oswestry_walking",
      "oswestry_sitting",
      "oswestry_standing",
      "oswestry_sleeping",
      "oswestry_social_life",
      "oswestry_traveling",
      "oswestry_employment"
    ];
    
    let total = 0;
    fields.forEach(field => {
      const val = values[field];
      if (val !== undefined && val !== null) {
        total += Number(val);
      }
    });
    
    const maxScore = fields.length * 5;
    return { score: total, maxScore, percentage: maxScore > 0 ? Math.round((total / maxScore) * 100) : 0 };
  };

  const { score, maxScore, percentage } = calculateScore();

  return (
    <div>
      <CommonFormBuilder
        schema={schema}
        values={values}
        onChange={onChange}
        layout="nested"
      />
      <div style={{ background: "#eff6ff", border: "2px solid #3b82f6", borderRadius: 10, padding: "16px 20px", marginTop: 20, textAlign: "center" }}>
        <div style={{ fontSize: 28, fontWeight: 700, color: "#1d4ed8" }}>{percentage}%</div>
        <div style={{ fontSize: 12, color: "#6b7280", marginTop: 4 }}>Disability Score: {score} / {maxScore}</div>
      </div>
    </div>
  );
}
