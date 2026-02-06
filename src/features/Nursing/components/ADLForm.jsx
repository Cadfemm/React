import React, { useState, useEffect } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

export default function ADLForm({ patient, onSubmit, onBack }) {
  const [values, setValues] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const storageKey = patient?.id
    ? `nursing_adl_draft_${patient.id}`
    : null;

  useEffect(() => {
    if (!storageKey) return;
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      const parsed = JSON.parse(saved);
      setValues(parsed.values || {});
      setSubmitted(false);
    }
  }, [storageKey]);

  const onChange = (name, value) => {
    setValues(v => ({ ...v, [name]: value }));
  };

  const handleAction = (type) => {
    switch (type) {
      case "back":
        onBack?.();
        break;
      case "clear":
        setValues({});
        setSubmitted(false);
        if (storageKey) localStorage.removeItem(storageKey);
        break;
      case "save":
        if (!storageKey) return;
        localStorage.setItem(
          storageKey,
          JSON.stringify({ values, updatedAt: new Date().toISOString() })
        );
        alert("ADL draft saved successfully");
        break;
      default:
        break;
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    const payload = {
      patientId: patient.id,
      scale: "ADL",
      values,
      submittedAt: new Date().toISOString()
    };
    if (storageKey) {
      localStorage.setItem(storageKey, JSON.stringify({ values }));
    }
    alert("ADL submitted successfully");
    onSubmit?.(payload);
  };

  const ADL_SCHEMA = {
    title: "Activities of Daily Living (ADL)",
    sections: [
      {
        title: "TRANSFERRING TO CHAIR/WHEELCHAIR/COMMODE",
        fields: [
          {
            name: "transferring",
            label: "",
            type: "radio",
            options: [
              { label: "Self Transfer", value: "self_transfer" },
              { label: "Need Supervision", value: "need_supervision" },
              { label: "1 Man Lift", value: "1_man_lift" },
              { label: "Pro Turner", value: "pro_turner" },
              { label: "Hoist-Lift", value: "hoist_lift" },
              { label: "Vegetative State/Bed Ridden", value: "vegetative_state_bed_ridden" }
            ]
          }
        ]
      },
      {
        title: "HOSTEL SIMULATION",
        fields: [
          {
            name: "hostel_simulation",
            label: "",
            type: "radio",
            options: [
              { label: "Normal Bed", value: "normal_bed" },
              { label: "Adjustable Bed", value: "adjustable_bed" }
            ]
          }
        ]
      },
      {
        title: "AMBULATION",
        fields: [
          {
            name: "ambulation",
            label: "",
            type: "radio",
            options: [
              { label: "Normal", value: "normal" },
              { label: "Walking Aid", value: "walking_aid" },
              { label: "Wheelchair", value: "wheelchair" },
              { label: "Bed Ridden", value: "bed_ridden" }
            ]
          },
          {
            name: "ambulation_walking_aid",
            label: "Walking Aid:",
            type: "radio",
            showIf: { field: "ambulation", equals: "walking_aid" },
            options: [
              { label: "Walking Stick/Cane", value: "walking_stick_cane" },
              { label: "Quadripod", value: "quadripod" },
              { label: "Walking Frame", value: "walking_frame" },
              { label: "Elbow Crutches", value: "elbow_crutches" },
              { label: "Axillary Crutches", value: "axillary_crutches" }
            ]
          },
          {
            name: "ambulation_wheelchair",
            label: "Wheelchair:",
            type: "radio",
            showIf: { field: "ambulation", equals: "wheelchair" },
            options: [
              { label: "Self Propelled", value: "self_propelled" },
              { label: "Unable to Self Propel", value: "unable_to_self_propel" },
              { label: "Electric Wheelchair", value: "electric_wheelchair" }
            ]
          }
        ]
      },
      {
        title: "FEEDING",
        fields: [
          {
            name: "feeding",
            label: "",
            type: "radio",
            options: [
              { label: "Taking Orally", value: "taking_orally" },
              { label: "Nasogastric Tube", value: "nasogastric_tube" },
              { label: "PEG Tube", value: "peg_tube" }
            ]
          },
          {
            name: "feeding_taking_orally",
            label: "Taking Orally:",
            type: "radio",
            showIf: { field: "feeding", equals: "taking_orally" },
            options: [
              { label: "Able to Feed Oneself", value: "able_to_feed_oneself" },
              { label: "Need Assistance", value: "need_assistance" },
              { label: "Need Assistive Device", value: "need_assistive_device" }
            ]
          }
        ]
      },
      {
        title: "TOILETING",
        fields: [
          {
            name: "toileting",
            label: "",
            type: "checkbox-group",
            inlineWithLabel: true,
            options: [
              { label: "Pass Motion", value: "pass_motion" },
              { label: "Bowel Continence", value: "bowel_continence" },
              { label: "Pass Urine", value: "pass_urine" },
              { label: "Bladder Continence", value: "bladder_continence" }
            ]
          },
          // --- PASS MOTION branch ---
          {
            name: "pass_motion_method",
            label: "Pass Motion:",
            type: "radio",
            showIf: { field: "toileting", includes: "pass_motion" },
            options: [
              { label: "Toilet", value: "toilet" },
              { label: "Diapers", value: "diapers" }
            ]
          },
          {
            name: "pass_motion_toilet_type",
            label: "Toilet:",
            type: "radio",
            showIf: { field: "pass_motion_method", equals: "toilet" },
            options: [
              { label: "Toilet Bowl", value: "toilet_bowl" },
              { label: "Commode", value: "commode" }
            ]
          },
          {
            name: "pass_motion_toilet_bowl_clean",
            label: "Toilet Bowl:",
            type: "radio",
            showIf: { field: "pass_motion_toilet_type", equals: "toilet_bowl" },
            options: [
              { label: "Self-Cleaning", value: "self_cleaning" },
              { label: "Need Help to Clean", value: "need_help_to_clean" }
            ]
          },
          {
            name: "pass_motion_commode_clean",
            label: "Commode:",
            type: "radio",
            showIf: { field: "pass_motion_toilet_type", equals: "commode" },
            options: [
              { label: "Self-Cleaning", value: "self_cleaning" },
              { label: "Need Help to Clean", value: "need_help_to_clean" }
            ]
          },
          {
            name: "pass_motion_diapers",
            label: "Diapers:",
            type: "radio",
            showIf: { field: "pass_motion_method", equals: "diapers" },
            options: [
              { label: "Self Change/Clean", value: "self_change_clean" },
              { label: "Need Assist to Change/Clean", value: "need_assist_to_change_clean" }
            ]
          },
          {
            name: "bowel_continence_method",
            label: "Bowel Continence:",
            type: "radio",
            showIf: { field: "toileting", includes: "bowel_continence" },
            options: [
              { label: "Spontaneous Controllable", value: "spontaneous_controllable" },
              { label: "Suppository", value: "suppository" },
              { label: "Enemas", value: "enemas" },
              { label: "Manual Evacuation", value: "manual_evacuation" },
              { label: "Stoma Bag", value: "stoma_bag" }
            ]
          },
          {
            name: "bladder_continence_method",
            label: "Bladder Continence:",
            type: "radio",
            showIf: { field: "toileting", includes: "bladder_continence" },
            options: [
              { label: "Spontaneous Controllable", value: "spontaneous_controllable" },
              { label: "CISC/CIC", value: "cisc_cic" },
              { label: "CBD", value: "cbd" }
            ]
          },
          {
            name: "pass_urine_method",
            label: "Pass Urine:",
            type: "radio",
            showIf: { field: "toileting", includes: "pass_urine" },
            options: [
              { label: "Toilet", value: "toilet" },
              { label: "Urinal", value: "urinal" },
              { label: "Diapers", value: "diapers" },
              { label: "CISC", value: "cisc" },
              { label: "CBD/SPC", value: "cbd_spc" }
            ]
          },
          {
            name: "pass_urine_toilet_type",
            label: "Toilet:",
            type: "radio",
            showIf: { field: "pass_urine_method", equals: "toilet" },
            options: [
              { label: "Toilet Bowl", value: "toilet_bowl" },
              { label: "Commode", value: "commode" }
            ]
          },
          {
            name: "pass_urine_toilet_bowl_clean",
            label: "Toilet Bowl:",
            type: "radio",
            showIf: { field: "pass_urine_toilet_type", equals: "toilet_bowl" },
            options: [
              { label: "Self-Cleaning", value: "self_cleaning" },
              { label: "Need Help to Clean", value: "need_help_to_clean" }
            ]
          },
          {
            name: "pass_urine_commode_clean",
            label: "Commode:",
            type: "radio",
            showIf: { field: "pass_urine_toilet_type", equals: "commode" },
            options: [
              { label: "Self-Cleaning", value: "self_cleaning" },
              { label: "Need Help to Clean", value: "need_help_to_clean" }
            ]
          },
          {
            name: "pass_urine_urinal",
            label: "Urinal:",
            type: "radio",
            showIf: { field: "pass_urine_method", equals: "urinal" },
            options: [
              { label: "Self Done", value: "self_done" },
              { label: "Need Assist", value: "need_assist" }
            ]
          },
          {
            name: "pass_urine_diapers",
            label: "Diapers:",
            type: "radio",
            showIf: { field: "pass_urine_method", equals: "diapers" },
            options: [
              { label: "Self Change/Clean", value: "self_change_clean" },
              { label: "Need Assist to Change/Clean", value: "need_assist_to_change_clean" }
            ]
          },
          {
            name: "pass_urine_cisc",
            label: "CISC:",
            type: "radio",
            showIf: { field: "pass_urine_method", equals: "cisc" },
            options: [
              { label: "Self Perform", value: "self_perform" },
              { label: "Need Assist", value: "need_assist" }
            ]
          },
          {
            name: "pass_urine_cbd_spc",
            label: "CBD/SPC:",
            type: "radio",
            showIf: { field: "pass_urine_method", equals: "cbd_spc" },
            options: [
              { label: "Self Perform", value: "self_perform" },
              { label: "Need Assist", value: "need_assist" }
            ]
          }
        ]
      },
      {
        title: "BATHING",
        fields: [
          {
            name: "bathing",
            label: "",
            type: "checkbox-group",
            inlineWithLabel: true,
            options: [
              { label: "Take Off Clothes", value: "take_off_clothes" },
              { label: "Shower", value: "shower" },
              { label: "Bed Bath", value: "bed_bath" }
            ]
          },
          {
            name: "bathing_take_off_clothes",
            label: "Take Off Clothes:",
            type: "radio",
            showIf: { field: "bathing", includes: "take_off_clothes" },
            options: [
              { label: "Able to Take Off All Garments Including Diapers", value: "able_all_garments" },
              { label: "Garment", value: "garment" }
            ]
          },
          {
            name: "bathing_garment_type",
            label: "Garment:",
            type: "checkbox-group",
            inlineWithLabel: true,
            showIf: { field: "bathing_take_off_clothes", equals: "garment" },
            options: [
              { label: "Upper Garment", value: "upper_garment" },
              { label: "Lower Garment", value: "lower_garment" },
              { label: "Diapers", value: "diapers" }
            ]
          },
          {
            name: "bathing_upper_garment_assist",
            label: "Upper Garment:",
            type: "radio",
            showIf: { field: "bathing_garment_type", includes: "upper_garment" },
            options: [
              { label: "Need Minor Assist", value: "need_minor_assist" },
              { label: "Total Assist", value: "total_assist" }
            ]
          },
          {
            name: "bathing_lower_garment_assist",
            label: "Lower Garment:",
            type: "radio",
            showIf: { field: "bathing_garment_type", includes: "lower_garment" },
            options: [
              { label: "Need Minor Assist", value: "need_minor_assist" },
              { label: "Total Assist", value: "total_assist" }
            ]
          },
          {
            name: "bathing_garment_diapers_assist",
            label: "Diapers:",
            type: "radio",
            showIf: { field: "bathing_garment_type", includes: "diapers" },
            options: [
              { label: "Need Minor Assist", value: "need_minor_assist" },
              { label: "Total Assist", value: "total_assist" }
            ]
          },
          {
            name: "bathing_shower",
            label: "Shower:",
            type: "radio",
            showIf: { field: "bathing", includes: "shower" },
            options: [
              { label: "Self Bath", value: "self_bath" },
              { label: "Need Assistance to Bath", value: "need_assistance_to_bath" }
            ]
          },
          {
            name: "bathing_self_bath",
            label: "Self Bath:",
            type: "radio",
            showIf: { field: "bathing_shower", equals: "self_bath" },
            options: [
              { label: "Standing", value: "standing" },
              { label: "Sitting on Bath Chair", value: "sitting_on_bath_chair" }
            ]
          },
          {
            name: "bathing_need_assistance",
            label: "Need Assistance to Bath:",
            type: "radio",
            showIf: { field: "bathing_shower", equals: "need_assistance_to_bath" },
            options: [
              { label: "Able to Bath with Minor Assist", value: "able_minor_assist" },
              { label: "Requires Total Bathing", value: "requires_total_bathing" }
            ]
          },
          {
            name: "bathing_bed_bath",
            label: "Bed Bath:",
            type: "radio",
            showIf: { field: "bathing", includes: "bed_bath" },
            options: [
              { label: "On Bed Sponging", value: "on_bed_sponging" },
              { label: "Assisted Bath Trolley", value: "assisted_bath_trolley" }
            ]
          }
        ]
      },
      {
        title: "DRESSING/GROOMING",
        fields: [
          {
            name: "dressing_grooming",
            label: "",
            type: "checkbox-group",
            inlineWithLabel: true,
            options: [
              { label: "Upper Garment", value: "upper_garment" },
              { label: "Lower Garment", value: "lower_garment" },
              { label: "Diapers", value: "diapers" }
            ]
          },
          {
            name: "dressing_upper_garment",
            label: "Upper Garment:",
            type: "checkbox-group",
            inlineWithLabel: true,
            showIf: { field: "dressing_grooming", includes: "upper_garment" },
            options: [
              { label: "Shirts", value: "shirts" },
              { label: "Inner Garments/Bra/Sports Bra", value: "inner_garments_bra" },
              { label: "Shoulder Support/Hand Splint", value: "shoulder_support_hand_splint" }
            ]
          },
          {
            name: "dressing_shirts",
            label: "Shirts:",
            type: "radio",
            showIf: { field: "dressing_upper_garment", includes: "shirts" },
            options: [
              { label: "Self-Put On", value: "self_put_on" },
              { label: "Need Assist", value: "need_assist" },
              { label: "Total Assist", value: "total_assist" }
            ]
          },
          {
            name: "dressing_shirts_self_put_on",
            label: "Self-Put On:",
            type: "radio",
            showIf: { field: "dressing_shirts", equals: "self_put_on" },
            options: [
              { label: "Able to Do Buttoning", value: "able_to_do_buttoning" },
              { label: "Unable to Do Buttoning", value: "unable_to_do_buttoning" }
            ]
          },
          {
            name: "dressing_inner_garments",
            label: "Inner Garments/Bra/Sports Bra:",
            type: "radio",
            showIf: { field: "dressing_upper_garment", includes: "inner_garments_bra" },
            options: [
              { label: "Self-Put On", value: "self_put_on" },
              { label: "Need Assist", value: "need_assist" },
              { label: "Total Assist", value: "total_assist" }
            ]
          },
          {
            name: "dressing_shoulder_support",
            label: "Shoulder Support/Hand Splint:",
            type: "radio",
            showIf: { field: "dressing_upper_garment", includes: "shoulder_support_hand_splint" },
            options: [
              { label: "Self-Put On", value: "self_put_on" },
              { label: "Need Assist", value: "need_assist" },
              { label: "Total Assist", value: "total_assist" }
            ]
          },
          {
            name: "dressing_lower_garment",
            label: "Lower Garment:",
            type: "checkbox-group",
            inlineWithLabel: true,
            showIf: { field: "dressing_grooming", includes: "lower_garment" },
            options: [
              { label: "Pants", value: "pants" },
              { label: "AFO", value: "afo" },
              { label: "Stump Shrinker", value: "stump_shrinker" }
            ]
          },
          {
            name: "dressing_pants",
            label: "Pants:",
            type: "radio",
            showIf: { field: "dressing_lower_garment", includes: "pants" },
            options: [
              { label: "Self Put On", value: "self_put_on" },
              { label: "Need Minor Assist", value: "need_minor_assist" },
              { label: "Total Assist", value: "total_assist" }
            ]
          },
          {
            name: "dressing_afo",
            label: "AFO:",
            type: "radio",
            showIf: { field: "dressing_lower_garment", includes: "afo" },
            options: [
              { label: "Self Put On", value: "self_put_on" },
              { label: "Need Minor Assist", value: "need_minor_assist" },
              { label: "Total Assist", value: "total_assist" }
            ]
          },
          {
            name: "dressing_stump_shrinker",
            label: "Stump Shrinker:",
            type: "radio",
            showIf: { field: "dressing_lower_garment", includes: "stump_shrinker" },
            options: [
              { label: "Need Minor Assist", value: "need_minor_assist" },
              { label: "Total Assist", value: "total_assist" }
            ]
          },
          {
            name: "dressing_diapers",
            label: "Diapers:",
            type: "radio",
            showIf: { field: "dressing_grooming", includes: "diapers" },
            options: [
              { label: "Self Put On", value: "self_put_on" },
              { label: "Need Minor Assist", value: "need_minor_assist" },
              { label: "Total Assist", value: "total_assist" }
            ]
          }
        ]
      },
      {
        title: "MEDICATION",
        fields: [
          {
            name: "medication",
            label: "",
            type: "checkbox-group",
            inlineWithLabel: true,
            options: [
              { label: "Self-Taking", value: "self_taking" },
              { label: "Carer-Serve", value: "carer_serve" },
              { label: "Medication Box", value: "medication_box" },
              { label: "Nurse-Serve", value: "nurse_serve" }
            ]
          },
          {
            name: "medication_self_taking",
            label: "Self-Taking:",
            type: "radio",
            showIf: { field: "medication", includes: "self_taking" },
            options: [
              { label: "Taken On-Time", value: "taken_on_time" },
              { label: "Frequent Off-Scheduled Time", value: "frequent_off_scheduled_time" },
              { label: "Phone Reminder Alert", value: "phone_reminder_alert" }
            ]
          },
          {
            name: "medication_carer_serve",
            label: "Carer-Serve:",
            type: "radio",
            showIf: { field: "medication", includes: "carer_serve" },
            options: [
              { label: "Served On-Time", value: "served_on_time" },
              { label: "Frequent Off-Scheduled Time", value: "frequent_off_scheduled_time" }
            ]
          },
          {
            name: "medication_box_keeper",
            label: "Medication Box:",
            type: "radio",
            showIf: { field: "medication", includes: "medication_box" },
            options: [
              { label: "Self Keep", value: "self_keep" },
              { label: "Nurse Keep", value: "nurse_keep" }
            ]
          },
          {
            name: "medication_self_keep",
            label: "Self Keep:",
            type: "radio",
            showIf: { field: "medication_box_keeper", equals: "self_keep" },
            options: [
              { label: "Taken On-Time", value: "taken_on_time" },
              { label: "Phone Reminder Alert", value: "phone_reminder_alert" },
              { label: "Weekly Refill", value: "weekly_refill" }
            ]
          },
          {
            name: "medication_self_keep_weekly_refill",
            label: "Weekly Refill:",
            type: "radio",
            showIf: { field: "medication_self_keep", equals: "weekly_refill" },
            options: [
              { label: "Self Refill", value: "self_refill" },
              { label: "Nurse Refill", value: "nurse_refill" }
            ]
          },
          {
            name: "medication_nurse_keep",
            label: "Nurse Keep:",
            type: "radio",
            showIf: { field: "medication_box_keeper", equals: "nurse_keep" },
            options: [
              { label: "Weekly Refill", value: "weekly_refill" },
              { label: "Taking at Counter", value: "taking_at_counter" },
              { label: "Served to Bed", value: "served_to_bed" }
            ]
          },
          {
            name: "medication_nurse_keep_weekly_refill",
            label: "Weekly Refill:",
            type: "radio",
            showIf: { field: "medication_nurse_keep", equals: "weekly_refill" },
            options: [
              { label: "Self Refill", value: "self_refill" },
              { label: "Nurse Refill", value: "nurse_refill" }
            ]
          },
          {
            name: "medication_nurse_keep_taking_at_counter",
            label: "Taking at Counter:",
            type: "radio",
            showIf: { field: "medication_nurse_keep", equals: "taking_at_counter" },
            options: [
              { label: "Taken On Time", value: "taken_on_time" },
              { label: "Nurse Call", value: "nurse_call" }
            ]
          },
          {
            name: "medication_nurse_serve",
            label: "Nurse-Serve:",
            type: "radio",
            showIf: { field: "medication", includes: "nurse_serve" },
            options: [
              { label: "Need Crushing", value: "need_crushing" },
              { label: "No Crushing Needed", value: "no_crushing_needed" }
            ]
          }
        ]
      },
      {
        title: "Remarks",
        fields: [
          {
            name: "remarks",
            label: "",
            type: "textarea",
            placeholder: "Enter remarks..."
          }
        ]
      }
    ]
  };

  return (
    <div style={{ margin: "0 auto" }}>
      <CommonFormBuilder
        schema={ADL_SCHEMA}
        values={values}
        onChange={onChange}
        submitted={submitted}
        onAction={handleAction}
        layout="nested"
      >
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 24 }}>
          <button
            style={{
              padding: "12px 34px",
              background: "#2563EB",
              color: "#fff",
              border: "none",
              borderRadius: 10,
              fontSize: 15,
              fontWeight: 700
            }}
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </CommonFormBuilder>
    </div>
  );
}
