import React, { useEffect, useState } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";
import DryNeedling from "./DryNeedling";
import WallClimbing from "./WallClimbing";

import BergBalanceScale from "./BBS";
import FIMAssessment from "../../OT/components/Fim";
import MoCAAssessment from "../../OT/components/MocA";
import MMSEAssessment from "./Mmsenew";
// import ModifiedBarthelIndex from "./ModifiedBarthelIndex";

const CONTAINER_SCHEMA = { title: "Patient Information", sections: [] };
const SPINAL_ASSESSMENT_REGISTRY = {
  bbs:   BergBalanceScale,
  moca:  MoCAAssessment,
  fim:   FIMAssessment,
  mmse:  MMSEAssessment,

};

const CONSENT_AND_REFERRAL_SCHEMA = {
  title: "",
  sections: [{
    fields: [
      {
        name: "consent_obtained",
        label: "Consent",
        type: "single-select",
        options: [
          { label: "Dry Needling", value: "dry_needling" },
          { label: "Wall Climbing", value: "wall_climbing" }
        ]
      },
      {
        type: "custom",
        name: "_open_saved_consent",
        render: ({ values, onChange: _onChange }) => {
          const hasDry = !!values.dry_needling_consent;
          const hasWall = !!values.wall_climbing_consent;
          if (!hasDry && !hasWall) return null;
          return (
            <div style={{ marginBottom: 8 }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: "#0F172A", marginBottom: 8 }}>
                Open Saved Consent
              </div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {hasDry && (
                  <button
                    type="button"
                    style={savedBtn}
                    onClick={() => _onChange("_open_consent_trigger", "dry_needling")}
                  >
                    Open Dry Needling Consent
                  </button>
                )}
                {hasWall && (
                  <button
                    type="button"
                    style={savedBtn}
                    onClick={() => _onChange("_open_consent_trigger", "wall_climbing")}
                  >
                    Open Wall Climbing Consent
                  </button>
                )}
              </div>
            </div>
          );
        }
      },
      {
        name: "dr_hep_reviewed",
        type: "checkbox-group",
        options: [{ label: "Home Exercise Program (HEP) reviewed and demonstrated", value: "yes" }]
      },
      { type: "subheading", label: "Referral Information" },
      { name: "referred_by", label: "Referred by", type: "input", readOnly: true },
      { name: "referral_reasons", label: "Referral Reasons", type: "input", readOnly: true }
    ]
  }]
};

const FUNCTIONAL_STATUS_OPTIONS = [
  { label: "Independent", value: "independent" },
  { label: "Supervision", value: "supervision" },
  { label: "Assist", value: "assist" },
  { label: "Dependent", value: "dependent" }
];

const HOME_ASSESSMENT_SCHEMA = {
  title: "Home Assessment",
  sections: [{
    fields: [
      { type: "subheading", label: "Occupational Profile" },
      {
        name: "ha_pre_morbid_function",
        label: "Pre-morbid function",
        type: "radio",
        options: [
          { label: "Independent", value: "independent" },
          { label: "Semi-dependent", value: "semi_dependent" },
          { label: "Dependent", value: "dependent" }
        ]
      },
      {
        name: "ha_current_main_concerns",
        label: "Current main concerns (patient/caregiver report)",
        type: "input"
      },
      { type: "subheading", label: "Patient Goals" },
      { name: "ha_short_term_goals", label: "Short term goals", type: "input" },
      { name: "ha_long_term_goals", label: "Long term goals", type: "input" },
      {
        name: "ha_roles",
        label: "Roles",
        type: "radio",
        options: [
          { label: "Worker", value: "worker" },
          { label: "Caregiver", value: "caregiver" },
          { label: "Retired", value: "retired" }
        ]
      },

      { type: "subheading", label: "Home Environment Overview" },
      {
        name: "ha_residence_type",
        label: "Type of residence",
        type: "radio",
        options: [
          { label: "Terrace house", value: "terrace_house" },
          { label: "Flat", value: "flat" },
          { label: "Apartment", value: "apartment" },
          { label: "Others", value: "others" }
        ]
      },
      {
        name: "ha_residence_type_others",
        label: "Others (specify)",
        type: "input",
        showIf: { field: "ha_residence_type", equals: "others" }
      },
      {
        name: "ha_living_arrangement",
        label: "Living arrangement",
        type: "radio",
        options: [
          { label: "Alone", value: "alone" },
          { label: "With family", value: "with_family" },
          { label: "Paid caregiver", value: "paid_caregiver" }
        ]
      },
      { name: "ha_number_of_storeys", label: "Number of storeys", type: "input" },
      {
        name: "ha_bedroom_location",
        label: "Bedroom location",
        type: "radio",
        options: [
          { label: "Ground floor", value: "ground_floor" },
          { label: "Upstairs", value: "upstairs" }
        ]
      },

      { type: "subheading", label: "Access to Home" },
      {
        name: "ha_access_to_home",
        label: "Access to home",
        type: "checkbox-group",
        options: [
          { label: "Steps", value: "steps" },
          { label: "Ramp present", value: "ramp_present" },
          { label: "Lift access", value: "lift_access" }
        ]
      },
      {
        name: "ha_steps_number",
        label: "Steps (number)",
        type: "input",
        showIf: { field: "ha_access_to_home", includes: "steps" }
      },
      {
        name: "ha_steps_handrail",
        label: "Handrail",
        type: "radio",
        options: [
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" }
        ],
        showIf: { field: "ha_access_to_home", includes: "steps" }
      },
      {
        name: "ha_surface_condition",
        label: "Surface condition",
        type: "radio",
        options: [
          { label: "Even", value: "even" },
          { label: "Uneven", value: "uneven" }
        ]
      },

      { type: "subheading", label: "Functional Status (ADL / IADL)" },
      { type: "subheading", label: "Basic ADL" },
      { type: "grid-header", cols: ["Task", "Independent", "Supervision", "Assist", "Dependent"] },
      { name: "ha_adl_bathing", label: "Bathing", type: "radio-matrix", options: FUNCTIONAL_STATUS_OPTIONS },
      { name: "ha_adl_dressing", label: "Dressing", type: "radio-matrix", options: FUNCTIONAL_STATUS_OPTIONS },
      { name: "ha_adl_toileting", label: "Toileting", type: "radio-matrix", options: FUNCTIONAL_STATUS_OPTIONS },
      { name: "ha_adl_feeding", label: "Feeding", type: "radio-matrix", options: FUNCTIONAL_STATUS_OPTIONS },
      { name: "ha_adl_mobility", label: "Mobility", type: "radio-matrix", options: FUNCTIONAL_STATUS_OPTIONS },

      { type: "subheading", label: "Instrumental ADL (IADL)" },
      { type: "grid-header", cols: ["Task", "Independent", "Supervision", "Assist", "Dependent"] },
      { name: "ha_iadl_cooking", label: "Cooking", type: "radio-matrix", options: FUNCTIONAL_STATUS_OPTIONS },
      { name: "ha_iadl_medication_management", label: "Medication management", type: "radio-matrix", options: FUNCTIONAL_STATUS_OPTIONS },
      { name: "ha_iadl_housekeeping", label: "Housekeeping", type: "radio-matrix", options: FUNCTIONAL_STATUS_OPTIONS },
      { name: "ha_iadl_shopping", label: "Shopping", type: "radio-matrix", options: FUNCTIONAL_STATUS_OPTIONS },
      { name: "ha_iadl_driving", label: "Driving", type: "radio-matrix", options: FUNCTIONAL_STATUS_OPTIONS },
       {
          type: "subheading",
          label: "Physical & Cognitive Findings"
        },
        { type: "subheading", label: "Functional Strength " },
        {
          name: "muscle_strength",
          label: "Muscle strength:",
          type: "radio",
          options: [
            {
              label: "Functional for ADL",
              value: "functional_for_adl"
            },
            {
              label: "Reduced affecting function",
              value: "reduced_affecting_function"
            },
            {
              label: "Severely limited",
              value: "severely_limited"
            }
          ]
        },
        {
          name: "muscle_strength_affected_areas",
          label: "Affected Areas",
          type: "input",
          placeholder: "Enter affected areas"
        },
        {
          name: "muscle_strength_functional_impact",
          label: "Functional Impact Noted In",
          type: "input",
          placeholder: "Enter functional impact"
        },
          { type: "subheading", label: "Balance & Postural Control " },
            {
          name: "static_sitting_balance",
          label: "Static Sitting Balance",
          type: "radio",
          options: [
            { label: "Good", value: "good" },
            { label: "Fair", value: "fair" },
            { label: "Poor", value: "poor" }
          ]
        },
        {
          name: "dynamic_sitting_balance",
          label: "Dynamic Sitting Balance",
          type: "radio",
          options: [
            { label: "Good", value: "good" },
            { label: "Fair", value: "fair" },
            { label: "Poor", value: "poor" }
          ]
        },
       
        {
          name: "static_standing_balance",
          label: "Static Standing Balance",
          type: "radio",
          options: [
            { label: "Good", value: "good" },
            { label: "Fair", value: "fair" },
            { label: "Poor", value: "poor" }
          ]
        },
        {
          name: "dynamic_standing_balance",
          label: "Dynamic Standing Balance",
          type: "radio",
          options: [
            { label: "Good", value: "good" },
            { label: "Fair", value: "fair" },
            { label: "Poor", value: "poor" }
          ]
        },
        {
          name: "protective_reactions",
          label: "Protective Reactions",
          type: "radio",
          options: [
            { label: "Intact", value: "intact" },
            { label: "Delayed", value: "delayed" },
            { label: "Absent", value: "absent" }
          ]
        },
        {
          name: "functional_implications",
          label: "Functional Implications",
          type: "checkbox-group",
          options: [
            {
              label: "Risk of falls during transfers",
              value: "risk_of_falls_during_transfers"
            },
            {
              label: "Requires supervision during bathing",
              value: "requires_supervision_during_bathing"
            },
            {
              label: "Unable to perform standing ADLs safely",
              value: "unable_to_perform_standing_adls_safely"
            }
          ]
        },
         { type: "subheading", label: "Transfer Skills (Occupation-Based Performance)" },
          {
          name: "bed_mobility",
          label: "Bed Mobility",
          type: "radio",
          options: [
            { label: "Independent", value: "independent" },
            { label: "Needs Assistance", value: "needs_assistance" },
            { label: "Dependent", value: "dependent" }
          ]
        },
        {
          name: "sit_to_stand_transfer",
          label: "Sit ↔ Stand Transfer",
          type: "radio",
          options: [
            { label: "Independent", value: "independent" },
            { label: "Supervision", value: "supervision" },
            { label: "Assistance Required", value: "assistance_required" }
          ]
        },
        {
          name: "toilet_transfer",
          label: "Toilet Transfer",
          type: "radio",
          options: [
            { label: "Independent", value: "independent" },
            { label: "Supervision", value: "supervision" },
            { label: "Assistance Required", value: "assistance_required" }
          ]
        },
        {
          name: "shower_bath_transfer",
          label: "Shower / Bath Transfer",
          type: "radio",
          options: [
            { label: "Independent", value: "independent" },
            { label: "Supervision", value: "supervision" },
            { label: "Assistance Required", value: "assistance_required" }
          ]
        },
        {
          name: "compensatory_strategies_used",
          label: "Compensatory Strategies Used",
          type: "checkbox-group",
          options: [
            {
              label: "Uses furniture for support",
              value: "uses_furniture_for_support"
            },
            {
              label: "Requires caregiver physical lifting",
              value: "requires_caregiver_physical_lifting"
            },
            {
              label: "Uses assistive device",
              value: "uses_assistive_device"
            },
            {
              label: "Not safe without supervision",
              value: "not_safe_without_supervision"
            }
          ]
        },
        {
          type: "subheading",
          label: "Mobility & Functional Ambulation"
        },
        {
          name: "mobility_status",
          label: "Mobility Status",
          type: "radio",
          options: [
            { label: "Independent Ambulation", value: "independent_ambulation" },
            { label: "Supervised Ambulation", value: "supervised_ambulation" },
            { label: "Assisted Ambulation", value: "assisted_ambulation" },
            { label: "Wheelchair Dependent", value: "wheelchair_dependent" },
            { label: "Bedbound", value: "bedbound" }
          ]
        },

        {
          type: "subheading",
          label: "Mobility Aid"
        },
        {
          name: "current_mobility_aid",
          label: "Current Mobility Aid",
          type: "input",
          placeholder: "Enter current mobility aid"
        },
        {
          name: "mobility_aid_dependency",
          label: "Level of Dependency on Aid",
          type: "checkbox-group",
          options: [
            {
              label: "Uses Independently and Safely",
              value: "uses_independently_and_safely"
            },
            {
              label: "Uses but Requires Supervision",
              value: "uses_but_requires_supervision"
            },
            {
              label: "Inappropriate / Unsafe Use Observed",
              value: "inappropriate_unsafe_use_observed"
            }
          ]
        },
        {
          name: "ot_recommendation",
          label: "OT Recommendation",
          type: "input",
          placeholder: "Enter OT recommendation"
        },

        {
          type: "subheading",
          label: "Cognitive"
        },
        {
          name: "orientation",
          label: "Orientation",
          type: "radio",
          options: [
            { label: "Intact", value: "intact" },
            { label: "Impaired", value: "impaired" }
          ]
        },
        {
          name: "memory",
          label: "Memory",
          type: "radio",
          options: [
            { label: "Intact", value: "intact" },
            { label: "Impaired", value: "impaired" }
          ]
        },
        {
          name: "attention",
          label: "Attention",
          type: "radio",
          options: [
            { label: "Intact", value: "intact" },
            { label: "Impaired", value: "impaired" }
          ]
        },
        {
          name: "safety_awareness",
          label: "Safety Awareness",
          type: "radio",
          options: [
            { label: "Good", value: "good" },
            { label: "Poor", value: "poor" }
          ]
        },
        { type: "subheading", label: "Home Safety Assessment" },

        { type: "subheading", label: "Entrance" },

             {
          name: "entrance_door_width_cm",
          label: "Door Width (cm)",
          type: "input",
          placeholder: "Enter door width in cm"
        },
        {
          name: "entrance_hazards",
          label: "Hazards Identified",
          type: "radio",
          options: [
            { label: "Steps Present", value: "steps_present" },
            { label: "Poor Lighting", value: "poor_lighting" },
            { label: "Others", value: "others" }
          ]
        },
        {
          name: "entrance_steps_risk",
          label: "Risk Associated with Steps",
          type: "input",
          placeholder: "Describe risk",
          showIf: {
            field: "entrance_hazards",
            includes: "steps_present"
          }
        },
        {
          name: "entrance_other_details",
          label: "Other Entrance Issues",
          type: "input",
          placeholder: "Enter other issues",
          showIf: {
            field: "entrance_hazards",
            includes: "others"
          }
        },
        {
          name: "entrance_recommendation",
          label: "Recommendation",
          type: "input",
          placeholder: "Enter recommendation",
          speechToText: true,
          ocr: true
        },
        {
          name: "entrance_photo",
          label: "Insert Photo",
          type: "attach-file",
          accept: "image/*",
          capture: "environment"
        },

        /* ───────────── Living Area ───────────── */
        { type: "subheading", label: "Living Area" },

        {
          name: "living_area_hazards",
          label: "Hazards Identified",
          type: "radio",
          options: [
            { label: "Cluttered Environment", value: "cluttered_environment" },
            { label: "Loose Rugs", value: "loose_rugs" },
            { label: "Poor Lighting", value: "poor_lighting" },
            { label: "Others", value: "others" }
          ]
        },
        {
          name: "living_area_other_details",
          label: "Other Living Area Issues",
          type: "input",
          placeholder: "Enter other issues",
          showIf: {
            field: "living_area_hazards",
            includes: "others"
          }
        },
        {
          name: "living_area_recommendation",
          label: "Recommendation",
          type: "input",
          placeholder: "Enter recommendation",
          speechToText: true,
          ocr: true
        },
        {
          name: "living_area_photo",
          label: "Insert Photo",
          type: "attach-file",
          accept: "image/*",
          capture: "environment"
        },

        /* ───────────── Bathroom ───────────── */
        { type: "subheading", label: "Bathroom" },

        {
          name: "bathroom_door_width_cm",
          label: "Door Width (cm)",
          type: "input",
          placeholder: "Enter door width in cm"
        },
        {
          name: "bathroom_hazards",
          label: "Hazards Identified",
          type: "radio",
          options: [
            { label: "No Grab Bars", value: "no_grab_bars" },
            { label: "Slippery Floor", value: "slippery_floor" },
            { label: "High / Low Toilet Seat", value: "high_low_toilet_seat" },
            { label: "Others", value: "others" }
          ]
        },
        {
          name: "bathroom_other_details",
          label: "Other Bathroom Issues",
          type: "input",
          placeholder: "Enter other issues",
          showIf: {
            field: "bathroom_hazards",
            includes: "others"
          }
        },
        {
          name: "bathroom_recommendation",
          label: "Recommendation",
          type: "input",
          placeholder: "Enter recommendation",
          speechToText: true,
          ocr: true
        },
        {
          name: "bathroom_photo",
          label: "Insert Photo",
          type: "attach-file",
          accept: "image/*",
          capture: "environment"
        },

        /* ───────────── Bedroom ───────────── */
        { type: "subheading", label: "Bedroom" },

        {
          name: "bedroom_door_width_cm",
          label: "Door Width (cm)",
          type: "input",
          placeholder: "Enter door width in cm"
        },
        {
          name: "bedroom_hazards",
          label: "Hazards Identified",
          type: "radio",
          options: [
            { label: "Bed Too High / Low", value: "bed_too_high_low" },
            { label: "Limited Turning Space", value: "limited_turning_space" },
            { label: "Others", value: "others" }
          ]
        },
        {
          name: "bedroom_other_details",
          label: "Other Bedroom Issues",
          type: "input",
          placeholder: "Enter other issues",
          showIf: {
            field: "bedroom_hazards",
            includes: "others"
          }
        },
        {
          name: "bedroom_recommendation",
          label: "Recommendation",
          type: "input",
          placeholder: "Enter recommendation",
          speechToText: true,
          ocr: true
        },
        {
          name: "bedroom_photo",
          label: "Insert Photo",
          type: "attach-file",
          accept: "image/*",
          capture: "environment"
        },

        /* ───────────── Kitchen ───────────── */
        { type: "subheading", label: "Kitchen" },

        {
          name: "kitchen_hazards",
          label: "Hazards Identified",
          type: "checkbox-group",
          options: [
            {
              label: "Unsafe Access to Items / Unsafe Storage",
              value: "unsafe_access_storage"
            },
            {
              label: "Risk of Burns / Falls",
              value: "risk_of_burns_falls"
            },
            {
              label: "Difficulty Reaching Items",
              value: "difficulty_reaching_items"
            },
            { label: "Others", value: "others" }
          ]
        },
        {
          name: "kitchen_other_details",
          label: "Other Kitchen Issues",
          type: "input",
          placeholder: "Enter other issues",
          showIf: {
            field: "kitchen_hazards",
            includes: "others"
          }
        },
        {
          name: "kitchen_recommendation",
          label: "Recommendation",
          type: "input",
          placeholder: "Enter recommendation",
          speechToText: true,
          ocr: true
        },
        {
          name: "kitchen_photo",
          label: "Insert Photo",
          type: "attach-file",
          accept: "image/*",
          capture: "environment"
        },
         { type: "subheading", label: "Outcome Measures" },
         {
          name: "spinal_scales_launcher",
          type: "assessment-launcher",
          options: [
            { label: "Functional Independence Measure (FIM)",    value: "fim"  },
            { label: "Montreal Cognitive Assessment (MoCA)",     value: "moca" },
            { label: "Mini Mental Status Examination (MMSE)",    value: "mmse" },
            { label: "Modified Barthel Index (MBI)",             value: "barthel"  },
            { label: "Berg Balance Scale (BBS)",                 value: "bbs"  },
          ]
        },
        { type: "subheading", label: "Assistive Devicess" },
        {
          name: "recommended_assistive_devices",
          label: "Recommended",
          type: "checkbox-group",
          options: [
            { label: "Wheelchair", value: "wheelchair" },
            { label: "Commode", value: "commode" },
            { label: "Cushion", value: "cushion" },
            { label: "Transfer Aid", value: "transfer_aid" },
            { label: "Grab Bars", value: "grab_bars" },
            { label: "Raised Toilet Seat", value: "raised_toilet_seat" },
            { label: "Others", value: "others" }
          ]
        },

        {
          name: "wheelchair_type",
          label: "Wheelchair Type",
          type: "input",
          placeholder: "Enter wheelchair type",
          showIf: {
            field: "recommended_assistive_devices",
            includes: "wheelchair"
          }
        },
        {
          name: "wheelchair_size",
          label: "Wheelchair Size",
          type: "input",
          placeholder: "Enter wheelchair size",
          showIf: {
            field: "recommended_assistive_devices",
            includes: "wheelchair"
          }
        },

        {
          name: "cushion_type",
          label: "Cushion Type",
          type: "input",
          placeholder: "Enter cushion type",
          showIf: {
            field: "recommended_assistive_devices",
            includes: "cushion"
          }
        },
        {
          name: "cushion_size",
          label: "Cushion Size",
          type: "input",
          placeholder: "Enter cushion size",
          showIf: {
            field: "recommended_assistive_devices",
            includes: "cushion"
          }
        },

        /* Transfer Aid */
        {
          name: "transfer_aid_details",
          label: "Transfer Aid",
          type: "input",
          placeholder: "Enter transfer aid details",
          showIf: {
            field: "recommended_assistive_devices",
            includes: "transfer_aid"
          }
        },

        /* Grab Bars */
        {
          name: "grab_bars_details",
          label: "Grab Bars",
          type: "input",
          placeholder: "Enter grab bar details",
          showIf: {
            field: "recommended_assistive_devices",
            includes: "grab_bars"
          }
        },

        /* Raised Toilet Seat */
        {
          name: "raised_toilet_seat_details",
          label: "Raised Toilet Seat",
          type: "input",
          placeholder: "Enter raised toilet seat details",
          showIf: {
            field: "recommended_assistive_devices",
            includes: "raised_toilet_seat"
          }
        },

        /* Others */
        {
          name: "assistive_devices_other_details",
          label: "Other Assistive Devices",
          type: "input",
          placeholder: "Enter other assistive devices",
          showIf: {
            field: "recommended_assistive_devices",
            includes: "others"
          }
        },

        {
          name: "assistive_devices_other_details",
          label: "Other Assistive Devices",
          type: "input",
          placeholder: "Enter other assistive devices",
          showIf: {
            field: "recommended_assistive_devices",
            includes: "others"
          }
        },
         {
          type: "subheading",
          label: "Risk Analysis"
        },
        {
          name: "falls_risk",
          label: "Falls Risk",
          type: "radio",
          options: [
            { label: "Low", value: "low" },
            { label: "Moderate", value: "moderate" },
            { label: "High", value: "high" }
          ]
        },
        {
          name: "environmental_risk",
          label: "Environmental Risk",
          type: "radio",
          options: [
            { label: "Low", value: "low" },
            { label: "Moderate", value: "moderate" },
            { label: "High", value: "high" }
          ]
        },
        {
          name: "clinical_justification",
          label: "Clinical Justification",
          type: "input",
          placeholder: "Enter clinical justification",
          speechToText: true,
          ocr: true
        },

        /* ───────────── Clinical Impression ───────────── */
        {
          type: "subheading",
          label: "Clinical Impression"
        },
        {
          name: "clinical_impression",
          label: "Clinical Impression",
          type: "input",
          placeholder: "Enter clinical impression",
          speechToText: true,
          ocr: true
        },

        /* ───────────── Recommendations ───────────── */
        {
          type: "subheading",
          label: "Recommendations"
        },
        {
          name: "home_modifications",
          label: "Home Modifications",
          type: "input",
          placeholder: "Enter home modification recommendations",
          speechToText: true,
          ocr: true
        },
        {
          name: "adl_training",
          label: "ADL Training",
          type: "input",
          placeholder: "Enter ADL training recommendations",
          speechToText: true,
          ocr: true
        },
        {
          name: "caregiver_education",
          label: "Caregiver Education",
          type: "input",
          placeholder: "Enter caregiver education recommendations",
          speechToText: true,
          ocr: true
        },
        {
          name: "follow_up",
          label: "Follow-up",
          type: "input",
          placeholder: "Enter follow-up plan",
          speechToText: true,
          ocr: true
        },

        /* ───────────── Signature ───────────── */
        {
          type: "subheading",
          label: "Signature"
        },
        {
          name: "assessor_name",
          label: "Assessor",
          type: "input",
          placeholder: "Enter assessor name"
        },
        {
          name: "designation",
          label: "Designation",
          type: "input",
          defaultValue: "Occupational Therapist",
          placeholder: "Occupational Therapist"
        },
        {
          name: "assessment_date",
          label: "Date",
          type: "date"
        }
    ]
  }]
};

export default function HomeAssessment({ patient,onSubmit }) {
  const [values, setValues] = useState({});
    const [submitted, setSubmitted] = useState(false);
  const [showConsentModal, setShowConsentModal] = useState(false);
  const dryNeedlingRef = React.useRef({});
  const wallClimbingRef = React.useRef({});

  useEffect(() => {
    if (!patient) return;
    setValues(v => ({
      ...v,
      referred_by: patient.case_manager || "",
      referral_reasons: patient.diagnosis_history || patient.icd || ""
    }));
  }, [patient]);

  const onChange = (name, value) => {
    setValues(v => ({ ...v, [name]: value }));
    if (name === "consent_obtained" && value && value !== values.consent_obtained) {
      setShowConsentModal(true);
    }
    if (name === "_open_consent_trigger" && value) {
      setValues(v => ({ ...v, consent_obtained: value }));
      setShowConsentModal(true);
    }
  };

  const [patientHistory, setPatientHistory] = useState({
    past_medical_history: patient?.medical_history || "",
    past_family_history: patient?.family_medical_history || "",
    alerts_and_allergies: patient?.alerts_and_allergies_history || ""
  });

  function PatientInformationBlock({ patient: currentPatient, history, setHistory }) {
    if (!currentPatient) return null;
    const formatDate = (dateStr) => {
      if (!dateStr) return "-";
      try {
        return new Date(dateStr).toLocaleDateString();
      } catch {
        return "-";
      }
    };

    return (
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12, fontSize: 14 }}>
          <div><b>Name:</b> {currentPatient.name}</div>
          <div><b>IC:</b> {currentPatient.id}</div>
          <div><b>DOB:</b> {formatDate(currentPatient.dob)}</div>
          <div><b>Age / Gender:</b> {currentPatient.age} / {currentPatient.sex}</div>
          <div><b>ICD:</b> {currentPatient.icd}</div>
          <div><b>Date of Assessment:</b> {new Date().toLocaleDateString()}</div>
          <div><b>Date of Onset:</b> {formatDate(currentPatient.date_of_onset)}</div>
          <div><b>Duration of Diagnosis:</b> -</div>
          <div><b>Primary Diagnosis:</b> {currentPatient.diagnosis_history || "-"}</div>
          <div><b>Secondary Diagnosis:</b> {currentPatient.medical_history || "-"}</div>
          <div><b>Dominant Side:</b> {currentPatient.dominant_side || "-"}</div>
          <div><b>Language Preference:</b> {currentPatient.language_preference || "-"}</div>
          <div><b>Education Level:</b> {currentPatient.education_background || "-"}</div>
          <div><b>Occupation:</b> {currentPatient.occupation || "-"}</div>
          <div><b>Work Status:</b> {currentPatient.employment_status || "-"}</div>
          <div><b>Driving Status:</b> {currentPatient.driving_status || "-"}</div>
          <div><b>Marital Status:</b> {currentPatient.marital_status || "-"}</div>
          <div><b>PP/OB:</b> {currentPatient.pp_ob || "-"}</div>
          <div style={{ gridColumn: "1 / -1", marginTop: 10 }}>
            <h3>Patient History</h3>
            <div>
              <b>Past Medical History</b>
              <input
                style={taStyle}
                value={history.past_medical_history}
                onChange={e => setHistory(p => ({ ...p, past_medical_history: e.target.value }))}
              />
            </div>
            <div>
              <b>Family History</b>
              <input
                style={taStyle}
                value={history.past_family_history}
                onChange={e => setHistory(p => ({ ...p, past_family_history: e.target.value }))}
              />
            </div>
            <div>
              <b>Allergies</b>
              <input
                style={taStyle}
                value={history.alerts_and_allergies}
                onChange={e => setHistory(p => ({ ...p, alerts_and_allergies: e.target.value }))}
              />
            </div>
            <button style={alertBtn}>🚨 Alerts</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: "100%" }}>
      <CommonFormBuilder schema={CONTAINER_SCHEMA} values={{}} onChange={() => {}}>
        <PatientInformationBlock
          patient={patient}
          history={patientHistory}
          setHistory={setPatientHistory}
          
        />
      </CommonFormBuilder>
      

      <CommonFormBuilder schema={CONSENT_AND_REFERRAL_SCHEMA} values={values} onChange={onChange} />
      <CommonFormBuilder schema={HOME_ASSESSMENT_SCHEMA} values={values} onChange={onChange}
        assessmentRegistry={SPINAL_ASSESSMENT_REGISTRY}
      />
       <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
          <button
            type="button"
            style={submitBtn}
            onClick={() => {
              setSubmitted(true);
              onSubmit?.(values);
              alert("Home assessment submitted");
            }}
          >
            Submit
          </button>
        </div>

      
    </div>
  );
}

const taStyle = {
  width: "100%",
  minHeight: 90,
  marginTop: 6,
  marginBottom: 12,
  padding: "10px 12px",
  borderRadius: 6,
  border: "1px solid #d1d5db",
  fontSize: 14,
  resize: "vertical"
};
const alertBtn = {
  marginTop: 10,
  padding: "10px 20px",
  borderRadius: 6,
  border: "1.5px solid #007bff",
  background: "#007bff",
  color: "#fff",
  fontWeight: 600,
  cursor: "pointer"
};
const modalOverlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.55)",
  zIndex: 9999,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 20
};
const modalBox = {
  background: "#fff",
  width: "95%",
  maxWidth: 1100,
  maxHeight: "92vh",
  borderRadius: 14,
  padding: 24,
  position: "relative",
  overflow: "hidden",
  boxShadow: "0 20px 50px rgba(0,0,0,0.25)"
};
const modalClose = {
  position: "absolute",
  top: 1,
  right: 4,
  border: "none",
  background: "#ef4444",
  color: "#fff",
  width: 29,
  height: 30,
  borderRadius: "50%",
  cursor: "pointer",
  fontWeight: 700,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 0
};
const saveCloseBtn = {
  padding: "10px 18px",
  border: "none",
  borderRadius: 8,
  background: "#2563eb",
  color: "#fff",
  fontWeight: 700,
  cursor: "pointer"
};
const savedBtn = {
  padding: "10px 14px",
  borderRadius: 8,
  border: "1px solid #2563eb",
  background: "#eff6ff",
  color: "#2563eb",
  fontWeight: 700,
  fontSize: 14,
  cursor: "pointer",
  whiteSpace: "nowrap"
};
const submitBtn = { padding: "12px 32px", background: "#2563EB", color: "#fff", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: "pointer" };
