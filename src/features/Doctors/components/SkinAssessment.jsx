import React, { useMemo, useState } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";
import maculeRef from "../../../assets/Macule.jpg";
import papuleRef from "../../../assets/Papule.jpg";
import plaqueRef from "../../../assets/Plaque.jpg";
import vesicleRef from "../../../assets/Vesicle.png";
import bullaRef from "../../../assets/Bulla.png";
import pustuleRef from "../../../assets/Pustule.jpg";
import whealRef from "../../../assets/Wheal.jpg";
import noduleRef from "../../../assets/Nodule.jpg";
import scaleRef from "../../../assets/Scale.jpg";
import crustRef from "../../../assets/Crust.png";
import ulcerRef from "../../../assets/Ulcer.png";
import humanBodyImage from "../../../assets/Human Body.jpg";
import feetImage from "../../../assets/feet_image.gif";
import pressureInjuryStage1 from "../../../assets/PressureInjurystage1.png";
import pressureInjuryStage2 from "../../../assets/PressureInjurystage2.png";

function SkinLesionAssessmentForm({ values, onChange }) {
  return (
    <CommonFormBuilder
      schema={{
        title: "",
        sections: [
          {
            fields: [
              { type: "subheading", label: "Skin Lesion / Rash Assessment" },
              { name: "skin_lesion_location", label: "Location", type: "input" },
              { name: "skin_lesion_description", label: "Description", type: "textarea" },
            ],
          },
        ],
      }}
      values={values}
      onChange={onChange}
      layout="nested"
    />
  );
}

function WoundAssessmentForm({ values, onChange }) {
  return (
    <CommonFormBuilder
      schema={{
        title: "",
        sections: [
          {
            fields: [
              { type: "subheading", label: "Wound Assessment" },
              { name: "wound_location", label: "Location", type: "input" },
              { name: "wound_description", label: "Description", type: "textarea" },
            ],
          },
        ],
      }}
      values={values}
      onChange={onChange}
      layout="nested"
    />
  );
}

const YES_NO = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" },
];

const LESION_REFERENCE_IMAGES = {
  macule: maculeRef,
  papule: papuleRef,
  plaque: plaqueRef,
  vesicle: vesicleRef,
  bulla: bullaRef,
  pustule: pustuleRef,
  wheal: whealRef,
  nodule: noduleRef,
  scale: scaleRef,
  crust: crustRef,
  ulcer: ulcerRef,
};

const LESION_LABELS = {
  macule: "Macule",
  papule: "Papule",
  plaque: "Plaque",
  vesicle: "Vesicle",
  bulla: "Bulla",
  pustule: "Pustule",
  wheal: "Wheal",
  nodule: "Nodule",
  scale: "Scale",
  crust: "Crust",
  ulcer: "Ulcer",
};

export default function SkinAssessment({ onChange }) {
  const [values, setValues] = useState({});
  const [activeLesionImage, setActiveLesionImage] = useState(null);
  const [isLesionModalOpen, setIsLesionModalOpen] = useState(false);
  const [showPressureInjuryModal, setShowPressureInjuryModal] = useState(false);

  const selectedLesion = values.lesion_morphology;
  const selectedLesionLabel = selectedLesion ? LESION_LABELS[selectedLesion] : null;

  const assessmentRegistry = useMemo(() => {
    return {
      skin_lesion_assessment: SkinLesionAssessmentForm,
      wound_assessment: WoundAssessmentForm,
    };
  }, []);

  const schema = useMemo(() => {
    return {
      title: "",
      sections: [
        {
          fields: [
            {
              name: "skin_lesion_or_rash_present",
              label: "Skin Lesion/Rash Present",
              type: "radio",
              options: YES_NO,
            },
            {
              name: "open_wound_present_initial",
              label: "Open Wound Present",
              type: "radio",
              options: YES_NO,
            },

            { type: "subheading", label: "GENERAL SKIN ASSESSMENT" },

            {
              name: "skin_integrity",
              label: "Skin Integrity",
              type: "radio",
              options: [
                { label: "Intact", value: "intact" },
                { label: "Dry", value: "dry" },
                { label: "Fragile", value: "fragile" },
                { label: "Macerated", value: "macerated" },
                { label: "Rash", value: "rash" },
                { label: "Erythema", value: "erythema" },
              ],
            },
            {
              name: "skin_colour",
              label: "Skin Colour",
              type: "radio",
              labelAbove: true,
              options: [
                { label: "Normal", value: "normal" },
                { label: "Pallor", value: "pallor" },
                { label: "Cyanosis", value: "cyanosis" },
                { label: "Jaundice", value: "jaundice" },
                { label: "Hyperpigmentation", value: "hyperpigmentation" },
                { label: "Hypopigmentation", value: "hypopigmentation" },
              ],
            },
            {
              name: "skin_temperature",
              label: "Skin Temperature",
              type: "radio",
              options: [
                { label: "Warm", value: "warm" },
                { label: "Cool", value: "cool" },
              ],
            },
            {
              name: "skin_turgor",
              label: "Skin Turgor",
              type: "radio",
              options: [
                { label: "Normal", value: "normal" },
                { label: "Reduced", value: "reduced" },
              ],
            },
            {
              name: "edema",
              label: "Edema",
              type: "radio",
              labelAbove: true,
              options: [
                { label: "None", value: "none" },
                { label: "1+ (Mild)", value: "1_mild" },
                { label: "2+ (Moderate)", value: "2_moderate" },
                { label: "3+ (Severe)", value: "3_severe" },
                { label: "4+ (Very Severe)", value: "4_very_severe" },
              ],
            },
            {
              name: "skin_surface",
              label: "Skin Surface",
              type: "radio",
              options: [
                { label: "Smooth", value: "smooth" },
                { label: "Scaling", value: "scaling" },
                { label: "Crusting", value: "crusting" },
                { label: "Blistering", value: "blistering" },
                { label: "Non-scaling", value: "non_scaling" },
                { label: "Migratory Rash", value: "migratory_rash" },
              ],
            },
            {
              name: "skin_sensation",
              label: "Skin Sensation",
              type: "radio",
              options: [
                { label: "Reduced Sensation", value: "reduced_sensation" },
                { label: "Numbness", value: "numbness" },
                { label: "None", value: "none" },
              ],
            },

            {
              name: "skin_moisture",
              label: "Skin Moisture",
              type: "radio",
              options: [
                { label: "Excess Moisture", value: "excess_moisture" },
                { label: "None", value: "none" },
              ],
            },
            {
              type: "subheading",
              label: "Lesion Assessment",
              showIf: {
                or: [
                  { field: "skin_lesion_or_rash_present", equals: "yes" },
                  { field: "skin_integrity", oneOf: ["rash", "erythema"] },
                  {
                    field: "skin_surface",
                    oneOf: ["scaling", "crusting", "blistering", "non_scaling", "migratory_rash"],
                  },
                ],
              },
            },
            {
              name: "lesion_morphology",
              label: "Lesion Morphology (Standard Dermatology)",
              type: "radio",
              labelAbove: true,
              showIf: {
                or: [
                  { field: "skin_lesion_or_rash_present", equals: "yes" },
                  { field: "skin_integrity", oneOf: ["rash", "erythema"] },
                  {
                    field: "skin_surface",
                    oneOf: ["scaling", "crusting", "blistering", "non_scaling", "migratory_rash"],
                  },
                ],
              },
              options: [
                {
                  label: "Macule",
                  value: "macule",
                  tooltip: "Flat discoloration of the skin without elevation or depression (e.g., freckle).",
                },
                {
                  label: "Papule",
                  value: "papule",
                  tooltip: "Small, raised solid lesion less than 1 cm in diameter.",
                },
                {
                  label: "Plaque",
                  value: "plaque",
                  tooltip: "Raised, flat-topped lesion greater than 1 cm in diameter.",
                },
                {
                  label: "Vesicle",
                  value: "vesicle",
                  tooltip: "Small fluid-filled blister less than 1 cm in diameter.",
                },
                {
                  label: "Bulla",
                  value: "bulla",
                  tooltip: "Large fluid-filled blister greater than 1 cm in diameter.",
                },
                {
                  label: "Pustule",
                  value: "pustule",
                  tooltip: "Pus-filled lesion, often inflamed (e.g., acne pustule).",
                },
                {
                  label: "Wheal",
                  value: "wheal",
                  tooltip: "Transient, edematous, raised lesion with central pallor and surrounding erythema (e.g., urticaria).",
                },
                {
                  label: "Nodule",
                  value: "nodule",
                  tooltip: "Deep, solid lesion usually greater than 1 cm, extending into the dermis or subcutis.",
                },
                {
                  label: "Scale",
                  value: "scale",
                  tooltip: "Flaking or shedding of the stratum corneum (outer layer of epidermis).",
                },
                {
                  label: "Crust",
                  value: "crust",
                  tooltip: "Dried exudate (serum, blood, or pus) on the skin surface (e.g., impetigo).",
                },
                {
                  label: "Ulcer",
                  value: "ulcer",
                  tooltip: "Loss of epidermis and at least part of the dermis, resulting in a deeper tissue defect.",
                },
              ],
            },
            {
              type: "info-text",
              name: "lesion_selected_label",
              label: selectedLesionLabel || "",
              text: "",
              showIf: {
                or: [
                  {
                    field: "lesion_morphology",
                    exists: true,
                  },
                  {
                    field: "skin_lesion_or_rash_present",
                    equals: "yes",
                  },
                  {
                    field: "skin_integrity",
                    oneOf: ["rash", "erythema"],
                  },
                  {
                    field: "skin_surface",
                    oneOf: ["scaling", "crusting", "blistering", "non_scaling", "migratory_rash"],
                  },
                ],
              },
            },
            {
              type: "row",
              showIf: {
                or: [
                  { field: "skin_lesion_or_rash_present", equals: "yes" },
                  { field: "skin_integrity", oneOf: ["rash", "erythema"] },
                  {
                    field: "skin_surface",
                    oneOf: ["scaling", "crusting", "blistering", "non_scaling", "migratory_rash"],
                  },
                ],
              },
              fields: [
                {
                  type: "button",
                  label: "Reference image",
                  action: "lesion_reference_popup",
                  showIf: {
                    field: "lesion_morphology",
                    exists: true,
                  },
                },
                {
                  type: "attach-file",
                  name: "lesion_morphology_image",
                  label: "Upload image",
                  accept: "image/*",
                  multiple: false,
                  previewSize: { width: 320, height: 320 },
                  hideInputAfterSelect: false,
                  showIf: {
                    field: "lesion_morphology",
                    oneOf: ["macule", "papule", "plaque", "vesicle", "bulla", "pustule", "wheal", "nodule", "scale", "crust", "ulcer"],
                  },
                },
              ],
            },

            {
              name: "lesion_distribution",
              label: "Lesion Distribution",
              type: "radio",
              labelAbove: true,
              showIf: {
                or: [
                  { field: "skin_lesion_or_rash_present", equals: "yes" },
                  { field: "skin_integrity", oneOf: ["rash", "erythema"] },
                  {
                    field: "skin_surface",
                    oneOf: ["scaling", "crusting", "blistering", "non_scaling", "migratory_rash"],
                  },
                ],
              },
              options: [
                { label: "Localized", value: "localized" },
                { label: "Generalized", value: "generalized" },
                { label: "Dermatomal", value: "dermatomal" },
                { label: "Symmetrical", value: "symmetrical" },
                { label: "Flexural", value: "flexural" },
                { label: "Extensor surfaces", value: "extensor_surfaces" },
              ],
            },
            {
              name: "lesion_duration",
              label: "Lesion Duration",
              type: "radio",
              showIf: {
                or: [
                  { field: "skin_lesion_or_rash_present", equals: "yes" },
                  { field: "skin_integrity", oneOf: ["rash", "erythema"] },
                  {
                    field: "skin_surface",
                    oneOf: ["scaling", "crusting", "blistering", "non_scaling", "migratory_rash"],
                  },
                ],
              },
              options: [
                { label: "Acute (<6 weeks)", value: "acute_lt_6w" },
                { label: "Chronic (>6 weeks)", value: "chronic_gt_6w" },
              ],
            },
            {
              name: "lesion_associated_symptoms",
              label: "Associated Symptoms",
              type: "checkbox-group",
              showIf: {
                or: [
                  { field: "skin_lesion_or_rash_present", equals: "yes" },
                  { field: "skin_integrity", oneOf: ["rash", "erythema"] },
                  {
                    field: "skin_surface",
                    oneOf: ["scaling", "crusting", "blistering", "non_scaling", "migratory_rash"],
                  },
                ],
              },
              options: [
                { label: "Itching (Pruritus)", value: "itching" },
                { label: "Pain", value: "pain" },
                { label: "Burning", value: "burning" },
                { label: "Tenderness", value: "tenderness" },
                { label: "Fever", value: "fever" },
              ],
            },

            {
              type: "subheading",
              label: "Skin Disease Condition",
              showIf: {
                or: [
                  { field: "skin_lesion_or_rash_present", equals: "yes" },
                  { field: "skin_integrity", oneOf: ["rash", "erythema"] },
                  {
                    field: "skin_surface",
                    oneOf: ["scaling", "crusting", "blistering", "non_scaling", "migratory_rash"],
                  },
                ],
              },
            },
            {
              name: "skin_disease_inflammatory_allergic",
              label: "Inflammatory / Allergic",
              type: "checkbox-group",
              showIf: {
                or: [
                  { field: "skin_lesion_or_rash_present", equals: "yes" },
                  { field: "skin_integrity", oneOf: ["rash", "erythema"] },
                  {
                    field: "skin_surface",
                    oneOf: ["scaling", "crusting", "blistering", "non_scaling", "migratory_rash"],
                  },
                ],
              },
              options: [
                { label: "Eczema (Dermatitis)", value: "eczema" },
                { label: "Urticaria (Wheals)", value: "urticaria" },
                { label: "Urticaria factitia (Dermatographism)", value: "urticaria_factitia" },
                { label: "Angioedema", value: "angioedema" },
              ],
            },
            {
              name: "angioedema_involvement",
              label: "Involvement",
              type: "checkbox-group",
              options: [
                { label: "Lips", value: "lips" },
                { label: "Tongue", value: "tongue" },
                { label: "Mouth", value: "mouth" },
                { label: "Eyelids", value: "eyelids" },
              ],
              showIf: { field: "skin_disease_inflammatory_allergic", includes: "angioedema" },
            },
            {
              name: "angioedema_ace_inhibitor_use",
              label: "Medication history ACE inhibitor use",
              type: "radio",
              options: [
                { label: "Yes", value: "yes" },
                { label: "No", value: "no" },
              ],
              showIf: { field: "skin_disease_inflammatory_allergic", includes: "angioedema" },
            },
            {
              name: "angioedema_possible_cause",
              label: "Possible cause",
              type: "checkbox-group",
              options: [
                { label: "ACE inhibitor induced", value: "ace_inhibitor_induced" },
                { label: "Hereditary angioedema (HAE)", value: "hae" },
                { label: "Acquired angioedema (AAE)", value: "aae" },
              ],
              showIf: { field: "skin_disease_inflammatory_allergic", includes: "angioedema" },
            },

            {
              name: "infectious_skin_conditions",
              label: "Infectious Skin Conditions",
              type: "checkbox-group",
              showIf: {
                or: [
                  { field: "skin_lesion_or_rash_present", equals: "yes" },
                  { field: "skin_integrity", oneOf: ["rash", "erythema"] },
                  {
                    field: "skin_surface",
                    oneOf: ["scaling", "crusting", "blistering", "non_scaling", "migratory_rash"],
                  },
                ],
              },
              options: [
                { label: "Fungal infection", value: "fungal_infection" },
                { label: "Tinea (Ringworm)", value: "tinea" },
                { label: "Impetigo", value: "impetigo" },
                { label: "Herpes simplex", value: "herpes_simplex" },
                { label: "Chickenpox", value: "chickenpox" },
              ],
            },
            {
              name: "chickenpox_indicators",
              label: "Chickenpox indicators",
              type: "checkbox-group",
              options: [
                { label: "Acute fever", value: "acute_fever" },
                { label: "Vesicular rash", value: "vesicular_rash" },
                { label: "Itchy rash", value: "itchy_rash" },
                { label: "Scarlet fever", value: "scarlet_fever" },
                { label: "Infectious mononucleosis", value: "infectious_mononucleosis" },
                { label: "Viral pharyngitis", value: "viral_pharyngitis" },
              ],
              showIf: { field: "infectious_skin_conditions", includes: "chickenpox" },
            },

            {
              type: "subheading",
              label: "Other Skin Conditions",
              showIf: {
                or: [
                  { field: "skin_lesion_or_rash_present", equals: "yes" },
                  { field: "skin_integrity", oneOf: ["rash", "erythema"] },
                  {
                    field: "skin_surface",
                    oneOf: ["scaling", "crusting", "blistering", "non_scaling", "migratory_rash"],
                  },
                ],
              },
            },
            {
              type: "row",
              showIf: {
                or: [
                  { field: "skin_lesion_or_rash_present", equals: "yes" },
                  { field: "skin_integrity", oneOf: ["rash", "erythema"] },
                  {
                    field: "skin_surface",
                    oneOf: ["scaling", "crusting", "blistering", "non_scaling", "migratory_rash"],
                  },
                ],
              },
              fields: [
                {
                  name: "other_skin_conditions_autoimmune",
                  label: "Autoimmune / Chronic",
                  type: "checkbox-group",
                  options: [{ label: "Psoriasis", value: "psoriasis" }],
                },
                {
                  name: "other_skin_conditions_neoplastic",
                  label: "Neoplastic",
                  type: "checkbox-group",
                  options: [
                    { label: "Melanoma", value: "melanoma" },
                    { label: "Basal cell carcinoma", value: "basal_cell_carcinoma" },
                  ],
                },
              ],
            },
            {
              type: "row",
              showIf: {
                or: [
                  { field: "skin_lesion_or_rash_present", equals: "yes" },
                  { field: "skin_integrity", oneOf: ["rash", "erythema"] },
                  {
                    field: "skin_surface",
                    oneOf: ["scaling", "crusting", "blistering", "non_scaling", "migratory_rash"],
                  },
                ],
              },
              fields: [
                {
                  name: "other_skin_conditions_structural",
                  label: "Structural",
                  type: "checkbox-group",
                  options: [
                    { label: "Epidermal cyst", value: "epidermal_cyst" },
                    { label: "Follicular accentuation", value: "follicular_accentuation" },
                  ],
                },
                {
                  name: "other_skin_conditions_tick_borne",
                  label: "Tick-borne",
                  type: "checkbox-group",
                  options: [{ label: "Lyme disease (Erythema migrans)", value: "lyme_disease" }],
                },
              ],
            },
            {
              type: "row",
              showIf: {
                or: [
                  { field: "skin_lesion_or_rash_present", equals: "yes" },
                  { field: "skin_integrity", oneOf: ["rash", "erythema"] },
                  {
                    field: "skin_surface",
                    oneOf: ["scaling", "crusting", "blistering", "non_scaling", "migratory_rash"],
                  },
                ],
              },
              fields: [
                {
                  name: "other_skin_conditions_drug_reaction",
                  label: "Drug Reaction",
                  type: "checkbox-group",
                  options: [{ label: "Drug eruption", value: "drug_eruption" }],
                },
              ],
            },

            {
              type: "subheading",
              label: "Wound Assessment Module",
              showIf: {
                or: [
                  { field: "open_wound_present_initial", equals: "yes" },
                  { field: "skin_moisture", equals: "excess_moisture" },
                ],
              },
            },
            {
              name: "wound_onset",
              label: "Onset",
              type: "radio",
              showIf: {
                or: [
                  { field: "open_wound_present_initial", equals: "yes" },
                  { field: "skin_moisture", equals: "excess_moisture" },
                ],
              },
              options: [
                { label: "Acute", value: "acute" },
                { label: "Chronic", value: "chronic" },
              ],
            },
            {
              name: "wound_number",
              label: "Number of wounds",
              type: "radio",
              showIf: {
                or: [
                  { field: "open_wound_present_initial", equals: "yes" },
                  { field: "skin_moisture", equals: "excess_moisture" },
                ],
              },
              options: [
                { label: "Single", value: "single" },
                { label: "Multiple", value: "multiple" },
              ],
            },
            /* ===== SINGLE WOUND (NON-DYNAMIC) ===== */
            {
              type: "subheading",
              label: "Wound Location",
              showIf: {
                field: "wound_number",
                equals: "single",
                and: {
                  or: [
                    { field: "open_wound_present_initial", equals: "yes" },
                    { field: "skin_moisture", equals: "excess_moisture" },
                  ],
                },
              },
            },
            {
              name: "single_wound_anatomical_site",
              label: "Anatomical site",
              type: "input",
              showIf: {
                field: "wound_number",
                equals: "single",
                and: {
                  or: [
                    { field: "open_wound_present_initial", equals: "yes" },
                    { field: "skin_moisture", equals: "excess_moisture" },
                  ],
                },
              },
            },
            {
              type: "row",
              showIf: {
                field: "wound_number",
                equals: "single",
                and: {
                  or: [
                    { field: "open_wound_present_initial", equals: "yes" },
                    { field: "skin_moisture", equals: "excess_moisture" },
                  ],
                },
              },
              fields: [
                {
                  name: "single_wound_body_map_human",
                  label: "Body Map Selection",
                  type: "draw-canvas",
                  backgroundImage: humanBodyImage,
                  width: 320,
                  height: 260,
                },
                {
                  name: "single_wound_body_map_feet",
                  label: "Foot map (draw)",
                  type: "draw-canvas",
                  backgroundImage: feetImage,
                  width: 320,
                  height: 260,
                },
              ],
            },
            {
              name: "single_wound_anatomical_location",
              label: "Anatomical location",
              type: "checkbox-group",
              options: [
                { label: "Sacrum", value: "sacrum" },
                { label: "Heel", value: "heel" },
                { label: "Ischial tuberosity", value: "ischial_tuberosity" },
                { label: "Trochanter", value: "trochanter" },
                { label: "Foot", value: "foot" },
                { label: "Leg", value: "leg" },
              ],
              showIf: {
                field: "wound_number",
                equals: "single",
                and: {
                  or: [
                    { field: "open_wound_present_initial", equals: "yes" },
                    { field: "skin_moisture", equals: "excess_moisture" },
                  ],
                },
              },
            },
            {
              type: "subheading",
              label: "Wound Measurements",
              showIf: {
                field: "wound_number",
                equals: "single",
                and: {
                  or: [
                    { field: "open_wound_present_initial", equals: "yes" },
                    { field: "skin_moisture", equals: "excess_moisture" },
                  ],
                },
              },
            },
            {
              type: "row",
              showIf: {
                field: "wound_number",
                equals: "single",
                and: {
                  or: [
                    { field: "open_wound_present_initial", equals: "yes" },
                    { field: "skin_moisture", equals: "excess_moisture" },
                  ],
                },
              },
              fields: [
                {
                  name: "single_wound_length_cm",
                  label: "Length (cm)",
                  type: "input",
                },
                {
                  name: "single_wound_width_cm",
                  label: "Width (cm)",
                  type: "input",
                },
                {
                  name: "single_wound_depth_cm",
                  label: "Depth (cm)",
                  type: "input",
                },
              ],
            },
            {
              type: "row",
              showIf: {
                field: "wound_number",
                equals: "single",
                and: {
                  or: [
                    { field: "open_wound_present_initial", equals: "yes" },
                    { field: "skin_moisture", equals: "excess_moisture" },
                  ],
                },
              },
              fields: [
                {
                  name: "single_wound_undermining_cm",
                  label: "Undermining (cm)",
                  type: "input",
                },
                {
                  name: "single_wound_tunnelling_cm",
                  label: "Tunnelling (cm)",
                  type: "input",
                },
                {
                  name: "single_wound_surface_area_cm2",
                  label: "Surface area (cm²)",
                  type: "input",
                  readOnly: true,
                },
              ],
            },
            {
              name: "single_wound_type",
              label: "Wound Type",
              type: "checkbox-group",
              options: [
                { label: "Pressure Injury", value: "pressure_injury" },
                { label: "Diabetic Foot Ulcer", value: "diabetic_foot_ulcer" },
                { label: "Venous Ulcer", value: "venous_ulcer" },
                { label: "Arterial Ulcer", value: "arterial_ulcer" },
                { label: "Surgical Wound", value: "surgical_wound" },
                { label: "Traumatic Wound", value: "traumatic_wound" },
                { label: "Burn", value: "burn" },
                { label: "Other", value: "other" },
              ],
              showIf: {
                field: "wound_number",
                equals: "single",
                and: {
                  or: [
                    { field: "open_wound_present_initial", equals: "yes" },
                    { field: "skin_moisture", equals: "excess_moisture" },
                  ],
                },
              },
            },
            {
              name: "single_wound_type_other",
              label: "Other – specify",
              type: "input",
              showIf: {
                field: "single_wound_type",
                includes: "other",
              },
            },
            {
              type: "button",
              label: "Reference image",
              action: "pressure_injury_reference",
              showIf: {
                field: "single_wound_type",
                includes: "pressure_injury",
              },
            },
            {
              name: "single_pressure_injury_classification",
              label: "Pressure Injury Classification",
              type: "radio",
              labelAbove: true,
              options: [
                { label: "Stage 1 – Non-blanchable erythema", value: "stage_1" },
                { label: "Stage 2 – Partial thickness loss", value: "stage_2" },
                { label: "Stage 3 – Full thickness skin loss", value: "stage_3" },
                { label: "Stage 4 – Full thickness tissue loss", value: "stage_4" },
                { label: "Unstageable", value: "unstageable" },
                { label: "Deep Tissue Pressure Injury", value: "deep_tissue" },
              ],
              showIf: {
                field: "single_wound_type",
                includes: "pressure_injury",
              },
            },
            {
              type: "subheading",
              label: "Wound Bed Assessment",
              showIf: {
                field: "wound_number",
                equals: "single",
                and: {
                  or: [
                    { field: "open_wound_present_initial", equals: "yes" },
                    { field: "skin_moisture", equals: "excess_moisture" },
                  ],
                },
              },
            },
            {
              name: "single_tissue_type",
              label: "Tissue Type",
              type: "radio",
              options: [
                { label: "Granulation", value: "granulation" },
                { label: "Slough", value: "slough" },
                { label: "Necrotic tissue", value: "necrotic" },
                { label: "Epithelial tissue", value: "epithelial" },
              ],
              showIf: {
                field: "wound_number",
                equals: "single",
                and: {
                  or: [
                    { field: "open_wound_present_initial", equals: "yes" },
                    { field: "skin_moisture", equals: "excess_moisture" },
                  ],
                },
              },
            },
            {
              type: "subheading",
              label: "Percentage (%)",
              showIf: {
                field: "wound_number",
                equals: "single",
                and: {
                  or: [
                    { field: "open_wound_present_initial", equals: "yes" },
                    { field: "skin_moisture", equals: "excess_moisture" },
                  ],
                },
              },
            },
            {
              type: "row",
              showIf: {
                field: "wound_number",
                equals: "single",
                and: {
                  or: [
                    { field: "open_wound_present_initial", equals: "yes" },
                    { field: "skin_moisture", equals: "excess_moisture" },
                  ],
                },
              },
              fields: [
                {
                  name: "single_granulation_percent",
                  label: "Granulation (%)",
                  type: "input",
                },
                {
                  name: "single_slough_percent",
                  label: "Slough (%)",
                  type: "input",
                },
                {
                  name: "single_necrosis_percent",
                  label: "Necrosis (%)",
                  type: "input",
                },
              ],
            },
            {
              type: "subheading",
              label: "Exudate Assessment",
              showIf: {
                field: "wound_number",
                equals: "single",
                and: {
                  or: [
                    { field: "open_wound_present_initial", equals: "yes" },
                    { field: "skin_moisture", equals: "excess_moisture" },
                  ],
                },
              },
            },
            {
              name: "single_exudate_amount",
              label: "Amount",
              type: "radio",
              options: [
                { label: "None", value: "none" },
                { label: "Mild", value: "mild" },
                { label: "Moderate", value: "moderate" },
                { label: "Heavy", value: "heavy" },
              ],
              showIf: {
                field: "wound_number",
                equals: "single",
                and: {
                  or: [
                    { field: "open_wound_present_initial", equals: "yes" },
                    { field: "skin_moisture", equals: "excess_moisture" },
                  ],
                },
              },
            },
            {
              name: "single_exudate_type",
              label: "Type",
              type: "radio",
              options: [
                { label: "Serous", value: "serous" },
                { label: "Serosanguineous", value: "serosanguineous" },
                { label: "Purulent", value: "purulent" },
              ],
              showIf: {
                field: "wound_number",
                equals: "single",
                and: {
                  or: [
                    { field: "open_wound_present_initial", equals: "yes" },
                    { field: "skin_moisture", equals: "excess_moisture" },
                  ],
                },
              },
            },
            {
              name: "single_exudate_odor",
              label: "Odor",
              type: "radio",
              options: [
                { label: "None", value: "none" },
                { label: "Mild", value: "mild" },
                { label: "Foul", value: "foul" },
              ],
              showIf: {
                field: "wound_number",
                equals: "single",
                and: {
                  or: [
                    { field: "open_wound_present_initial", equals: "yes" },
                    { field: "skin_moisture", equals: "excess_moisture" },
                  ],
                },
              },
            },
            {
              name: "single_wound_edge",
              label: "Wound Edge",
              type: "radio",
              options: [
                { label: "Advancing", value: "advancing" },
                { label: "Rolled (Epibole)", value: "rolled" },
                { label: "Undermined", value: "undermined" },
              ],
              showIf: {
                field: "wound_number",
                equals: "single",
                and: {
                  or: [
                    { field: "open_wound_present_initial", equals: "yes" },
                    { field: "skin_moisture", equals: "excess_moisture" },
                  ],
                },
              },
            },
            {
              name: "single_peri_wound_skin",
              label: "Peri-wound skin",
              type: "radio",
              options: [
                { label: "Normal", value: "normal" },
                { label: "Macerated", value: "macerated" },
                { label: "Erythematous", value: "erythematous" },
                { label: "Indurated", value: "indurated" },
                { label: "Calloused", value: "calloused" },
              ],
              showIf: {
                field: "wound_number",
                equals: "single",
                and: {
                  or: [
                    { field: "open_wound_present_initial", equals: "yes" },
                    { field: "skin_moisture", equals: "excess_moisture" },
                  ],
                },
              },
            },
            {
              name: "single_wound_pain_score",
              label: "Wound Pain (0–10)",
              type: "scale-slider",
              min: 0,
              max: 10,
              step: 1,
              showValue: true,
              showIf: {
                field: "wound_number",
                equals: "single",
                and: {
                  or: [
                    { field: "open_wound_present_initial", equals: "yes" },
                    { field: "skin_moisture", equals: "excess_moisture" },
                  ],
                },
              },
            },
            {
              name: "single_factors_delaying_healing",
              label: "Factors Delaying Healing",
              type: "checkbox-group",
              options: [
                { label: "Immobility", value: "immobility" },
                { label: "Poor Nutrition", value: "poor_nutrition" },
                { label: "Diabetes", value: "diabetes" },
                { label: "Incontinence", value: "incontinence" },
                { label: "Vascular disease", value: "vascular_disease" },
                { label: "Respiratory disease", value: "respiratory_disease" },
                { label: "Anemia", value: "anemia" },
                { label: "Infection", value: "infection" },
                { label: "Edema", value: "edema" },
                { label: "Medication (steroids, chemotherapy, inotropes)", value: "medication" },
              ],
              showIf: {
                field: "wound_number",
                equals: "single",
                and: {
                  or: [
                    { field: "open_wound_present_initial", equals: "yes" },
                    { field: "skin_moisture", equals: "excess_moisture" },
                  ],
                },
              },
            },

            /* ===== MULTIPLE WOUNDS (DYNAMIC SECTION) ===== */
            {
              type: "dynamic-section",
              name: "wound_blocks",
              showIf: {
                field: "wound_number",
                equals: "multiple",
                and: {
                  or: [
                    { field: "open_wound_present_initial", equals: "yes" },
                    { field: "skin_moisture", equals: "excess_moisture" },
                  ],
                },
              },
              fields: [
                { type: "subheading", label: "Wound Location" },
                {
                  name: "anatomical_site",
                  label: "Anatomical site",
                  type: "input",
                },
                {
                  type: "row",
                  fields: [
                    {
                      name: "body_map_human",
                      label: "Body Map Selection",
                      type: "draw-canvas",
                      backgroundImage: humanBodyImage,
                      width: 320,
                      height: 260,
                    },
                    {
                      name: "body_map_feet",
                      label: "Foot map (draw)",
                      type: "draw-canvas",
                      backgroundImage: feetImage,
                      width: 320,
                      height: 260,
                    },
                  ],
                },
                {
                  name: "anatomical_location",
                  label: "Anatomical location",
                  type: "checkbox-group",
                  options: [
                    { label: "Sacrum", value: "sacrum" },
                    { label: "Heel", value: "heel" },
                    { label: "Ischial tuberosity", value: "ischial_tuberosity" },
                    { label: "Trochanter", value: "trochanter" },
                    { label: "Foot", value: "foot" },
                    { label: "Leg", value: "leg" },
                  ],
                },

                { type: "subheading", label: "Wound Measurements" },
                {
                  type: "row",
                  fields: [
                    {
                      name: "length_cm",
                      label: "Length (cm)",
                      type: "input",
                    },
                    {
                      name: "width_cm",
                      label: "Width (cm)",
                      type: "input",
                    },
                    {
                      name: "depth_cm",
                      label: "Depth (cm)",
                      type: "input",
                    },
                  ],
                },
                {
                  type: "row",
                  fields: [
                    {
                      name: "undermining_cm",
                      label: "Undermining (cm)",
                      type: "input",
                    },
                    {
                      name: "tunnelling_cm",
                      label: "Tunnelling (cm)",
                      type: "input",
                    },
                    {
                      name: "surface_area_cm2",
                      label: "Surface area (cm²)",
                      type: "input",
                      readOnly: true,
                    },
                  ],
                },

                {
                  name: "wound_type",
                  label: "Wound Type",
                  type: "checkbox-group",
                  options: [
                    { label: "Pressure Injury", value: "pressure_injury" },
                    { label: "Diabetic Foot Ulcer", value: "diabetic_foot_ulcer" },
                    { label: "Venous Ulcer", value: "venous_ulcer" },
                    { label: "Arterial Ulcer", value: "arterial_ulcer" },
                    { label: "Surgical Wound", value: "surgical_wound" },
                    { label: "Traumatic Wound", value: "traumatic_wound" },
                    { label: "Burn", value: "burn" },
                    { label: "Other", value: "other" },
                  ],
                },
                {
                  name: "wound_type_other",
                  label: "Other – specify",
                  type: "input",
                  showIf: { field: "wound_type", includes: "other" },
                },
                {
                  type: "button",
                  label: "Reference image",
                  action: "pressure_injury_reference",
                  showIf: { field: "wound_type", includes: "pressure_injury" },
                },
                {
                  name: "pressure_injury_classification",
                  label: "Pressure Injury Classification",
                  type: "radio",
                  labelAbove: true,
                  options: [
                    { label: "Stage 1 – Non-blanchable erythema", value: "stage_1" },
                    { label: "Stage 2 – Partial thickness loss", value: "stage_2" },
                    { label: "Stage 3 – Full thickness skin loss", value: "stage_3" },
                    { label: "Stage 4 – Full thickness tissue loss", value: "stage_4" },
                    { label: "Unstageable", value: "unstageable" },
                    { label: "Deep Tissue Pressure Injury", value: "deep_tissue" },
                  ],
                  showIf: { field: "wound_type", includes: "pressure_injury" },
                },
                { type: "subheading", label: "Wound Bed Assessment" },
                {
                  name: "tissue_type",
                  label: "Tissue Type",
                  type: "radio",
                  options: [
                    { label: "Granulation", value: "granulation" },
                    { label: "Slough", value: "slough" },
                    { label: "Necrotic tissue", value: "necrotic" },
                    { label: "Epithelial tissue", value: "epithelial" },
                  ],
                },
                { type: "subheading", label: "Percentage (%)" },
                {
                  type: "row",
                  fields: [
                    {
                      name: "granulation_percent",
                      label: "Granulation (%)",
                      type: "input",
                    },
                    {
                      name: "slough_percent",
                      label: "Slough (%)",
                      type: "input",
                    },
                    {
                      name: "necrosis_percent",
                      label: "Necrosis (%)",
                      type: "input",
                    },
                  ],
                },

                { type: "subheading", label: "Exudate Assessment" },
                {
                  name: "exudate_amount",
                  label: "Amount",
                  type: "radio",
                  options: [
                    { label: "None", value: "none" },
                    { label: "Mild", value: "mild" },
                    { label: "Moderate", value: "moderate" },
                    { label: "Heavy", value: "heavy" },
                  ],
                },
                {
                  name: "exudate_type",
                  label: "Type",
                  type: "radio",
                  options: [
                    { label: "Serous", value: "serous" },
                    { label: "Serosanguineous", value: "serosanguineous" },
                    { label: "Purulent", value: "purulent" },
                  ],
                },
                {
                  name: "exudate_odor",
                  label: "Odor",
                  type: "radio",
                  options: [
                    { label: "None", value: "none" },
                    { label: "Mild", value: "mild" },
                    { label: "Foul", value: "foul" },
                  ],
                },

                {
                  name: "wound_edge",
                  label: "Wound Edge",
                  type: "radio",
                  options: [
                    { label: "Advancing", value: "advancing" },
                    { label: "Rolled (Epibole)", value: "rolled" },
                    { label: "Undermined", value: "undermined" },
                  ],
                },
                {
                  name: "peri_wound_skin",
                  label: "Peri-wound skin",
                  type: "radio",
                  options: [
                    { label: "Normal", value: "normal" },
                    { label: "Macerated", value: "macerated" },
                    { label: "Erythematous", value: "erythematous" },
                    { label: "Indurated", value: "indurated" },
                    { label: "Calloused", value: "calloused" },
                  ],
                },

                {
                  name: "wound_pain_score",
                  label: "Wound Pain (0–10)",
                  type: "scale-slider",
                  min: 0,
                  max: 10,
                  step: 1,
                  showValue: true,
                },

                {
                  name: "factors_delaying_healing",
                  label: "Factors Delaying Healing",
                  type: "checkbox-group",
                  options: [
                    { label: "Immobility", value: "immobility" },
                    { label: "Poor Nutrition", value: "poor_nutrition" },
                    { label: "Diabetes", value: "diabetes" },
                    { label: "Incontinence", value: "incontinence" },
                    { label: "Vascular disease", value: "vascular_disease" },
                    { label: "Respiratory disease", value: "respiratory_disease" },
                    { label: "Anemia", value: "anemia" },
                    { label: "Infection", value: "infection" },
                    { label: "Edema", value: "edema" },
                    { label: "Medication (steroids, chemotherapy, inotropes)", value: "medication" },
                  ],
                },
              ],
            },

            {
              name: "provisional_diagnosis",
              label: "Provisional Diagnosis",
              type: "textarea",
            },
            { type: "subheading", label: "Intervention Plan" },
            {
              name: "intervention_infection_control",
              label: "Infection Control",
              type: "radio",
              options: [
                { label: "Wound debridement", value: "wound_debridement" },
                { label: "Antimicrobial dressing", value: "antimicrobial_dressing" },
                { label: "Infection management", value: "infection_management" },
              ],
            },
            {
              name: "intervention_pressure_relief",
              label: "Pressure Relief",
              type: "radio",
              options: [
                { label: "2-hourly repositioning", value: "two_hourly_repositioning" },
                { label: "Offloading device", value: "offloading_device" },
              ],
            },
            {
              name: "intervention_rehabilitation",
              label: "Rehabilitation",
              type: "radio",
              options: [
                { label: "Bed mobility training", value: "bed_mobility_training" },
                { label: "Transfer training", value: "transfer_training" },
              ],
            },
            {
              name: "intervention_lifestyle",
              label: "Lifestyle",
              type: "checkbox-group",
              options: [
                { label: "Stop smoking", value: "stop_smoking" },
                { label: "Weight management", value: "weight_management" },
              ],
            },
            {
              name: "intervention_medical",
              label: "Medical",
              type: "checkbox-group",
              options: [
                { label: "Nutrition optimization", value: "nutrition_optimization" },
                { label: "Glycemic control", value: "glycemic_control" },
              ],
            },
            {
              name: "intervention_wound_care",
              label: "Wound Care",
              type: "checkbox-group",
              options: [
                { label: "Dressing selection", value: "dressing_selection" },
                { label: "Negative pressure wound therapy", value: "npwt" },
                { label: "Monitor Wound using PUSH tool", value: "monitor_push_tool" },
              ],
            },
          ],
        },
      ],
    };
  }, [selectedLesionLabel]);

  const handleChange = (name, value) => {
    setValues((prev) => {
      let next = { ...prev, [name]: value };

      // Auto-calculate surface area (length × width) for single wound
      if (name === "single_wound_length_cm" || name === "single_wound_width_cm") {
        const len = name === "single_wound_length_cm" ? value : prev.single_wound_length_cm;
        const wid = name === "single_wound_width_cm" ? value : prev.single_wound_width_cm;
        const l = parseFloat(len);
        const w = parseFloat(wid);
        if (!Number.isNaN(l) && !Number.isNaN(w)) {
          next = { ...next, single_wound_surface_area_cm2: String(l * w) };
        }
      }

      // Auto-calculate surface area for each block in multiple wounds
      if (name === "wound_blocks") {
        const blocks = (value || []).map((block) => {
          const len = parseFloat(block?.length_cm);
          const wid = parseFloat(block?.width_cm);
          const surface =
            !Number.isNaN(len) && !Number.isNaN(wid) ? String(len * wid) : block?.surface_area_cm2 ?? "";
          return { ...block, surface_area_cm2: surface };
        });
        next = { ...next, wound_blocks: blocks };
      }

      onChange?.(next);
      return next;
    });

    if (name === "skin_sensation" && (value === "reduced_sensation" || value === "numbness")) {
      window.alert("Diabetic Foot Risk Alert: Reduced sensation / numbness reported.");
    }

    if (name === "lesion_associated_symptoms" || name === "infectious_skin_conditions") {
      const associated =
        name === "lesion_associated_symptoms" ? value : (values.lesion_associated_symptoms || []);
      const infectious =
        name === "infectious_skin_conditions" ? value : (values.infectious_skin_conditions || []);
      const hasFever = Array.isArray(associated) && associated.includes("fever");
      const hasInfection = Array.isArray(infectious) && infectious.length > 0;
      if (hasFever && hasInfection) {
        window.alert("Sepsis risk alert: Fever with infectious skin condition – urgent medical evaluation recommended.");
      }
    }

    if (name === "wound_blocks") {
      const blocks = value || [];
      const hasInfectedBlock = blocks.some(
        (b) => b?.exudate_type === "purulent" && b?.exudate_odor === "foul"
      );
      if (hasInfectedBlock) {
        window.alert("Possible wound infection: Purulent exudate with foul odor. Please consider urgent review.");
      }
    }

    if (name === "single_exudate_type" || name === "single_exudate_odor") {
      const typeVal = name === "single_exudate_type" ? value : values.single_exudate_type;
      const odorVal = name === "single_exudate_odor" ? value : values.single_exudate_odor;
      if (typeVal === "purulent" && odorVal === "foul") {
        window.alert("Possible wound infection: Purulent exudate with foul odor. Please consider urgent review.");
      }
    }
  };

  const handleFormAction = (actionType) => {
    if (actionType === "lesion_reference_popup") {
      const selectedLesion = values.lesion_morphology;
      if (!selectedLesion) return;
      const img = LESION_REFERENCE_IMAGES[selectedLesion];
      if (img) {
        setActiveLesionImage(img);
        setIsLesionModalOpen(true);
      }
    }
    if (actionType === "pressure_injury_reference") {
      setShowPressureInjuryModal(true);
    }
  };

  return (
    <>
      <CommonFormBuilder
        schema={schema}
        values={values}
        onChange={handleChange}
        assessmentRegistry={assessmentRegistry}
        onAction={handleFormAction}
      />

      {isLesionModalOpen && activeLesionImage && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1300,
          }}
          onClick={() => setIsLesionModalOpen(false)}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 12,
              padding: 16,
              maxWidth: "90vw",
              maxHeight: "90vh",
              boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ marginBottom: 12, fontWeight: 600 }}>Reference Lesion Image</div>
            <img
              src={activeLesionImage}
              alt="Lesion reference"
              style={{ maxWidth: "100%", maxHeight: "70vh", display: "block" }}
            />
            <div style={{ textAlign: "right", marginTop: 12 }}>
              <button
                type="button"
                onClick={() => setIsLesionModalOpen(false)}
                style={{
                  padding: "6px 14px",
                  borderRadius: 6,
                  border: "1px solid #ccc",
               
                  cursor: "pointer",
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showPressureInjuryModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1300,
          }}
          onClick={() => setShowPressureInjuryModal(false)}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 12,
              padding: 16,
              maxWidth: "90vw",
              maxHeight: "90vh",
              overflow: "auto",
              boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ marginBottom: 12, fontWeight: 600 }}>Pressure Injury Reference Images</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center" }}>
              <img
                src={pressureInjuryStage1}
                alt="Pressure Injury Stage 1"
                style={{ maxWidth: "100%",  objectFit: "contain" }}
              />
              <img
                src={pressureInjuryStage2}
                alt="Pressure Injury Stage 2"
                style={{ maxWidth: "100%", maxHeight: "60vh", objectFit: "contain" }}
              />
            </div>
            <div style={{ textAlign: "right", marginTop: 12 }}>
              <button
                type="button"
                onClick={() => setShowPressureInjuryModal(false)}
                style={{
                  padding: "6px 14px",
                  borderRadius: 6,
                  border: "1px solid #ccc",
                
                  cursor: "pointer",
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

