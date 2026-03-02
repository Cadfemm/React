import React, { useState } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

export default function HeadNeckAssessment({ layout = "root" }) {
  const [values, setValues] = useState({});

  const onChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const HEAD_NECK_SCHEMA = {
    title: "Focussed Head & Neck Assessment",
    sections: [
      // ═══════════════════════════════════════════════════════════════
      // SUBJECTIVE (Patient Reported)
      // ═══════════════════════════════════════════════════════════════
      {
        title: "SUBJECTIVE (Patient Reported)",
        fields: [
          {
            name: "hn_subj_head_face",
            label: "Head / Face",
            type: "checkbox-group",
            options: [
              { label: "Headache", value: "headache" },
              { label: "Facial pain", value: "facial_pain" },
              { label: "Facial numbness", value: "facial_numbness" },
              { label: "Facial weakness", value: "facial_weakness" },
              { label: "Jaw pain", value: "jaw_pain" },
              { label: "Difficulty chewing", value: "difficulty_chewing" },
              { label: "Others", value: "others" }
            ]
          },
          {
            name: "hn_subj_head_face_others",
            label: "Others (specify)",
            type: "input",
            showIf: { field: "hn_subj_head_face", includes: "others" }
          },
          {
            name: "hn_subj_vision_eyes",
            label: "Vision / Eyes",
            type: "checkbox-group",
            options: [
              { label: "No visual complaints", value: "none" },
              { label: "Blurred vision", value: "blurred_vision" },
              { label: "Double vision", value: "double_vision" },
              { label: "Eye pain", value: "eye_pain" },
              { label: "Eye redness", value: "eye_redness" },
              { label: "Light sensitivity", value: "light_sensitivity" }
            ]
          },
          {
            name: "hn_subj_ears_hearing",
            label: "Ears / Hearing",
            type: "checkbox-group",
            options: [
              { label: "No hearing issues", value: "none" },
              { label: "Hearing loss", value: "hearing_loss" },
              { label: "Ringing in ears (tinnitus)", value: "tinnitus" },
              { label: "Ear pain", value: "ear_pain" },
              { label: "Ear fullness", value: "ear_fullness" },
              { label: "Ear drainage", value: "ear_drainage" }
            ]
          },
          {
            name: "hn_subj_nose_sinuses",
            label: "Nose / Sinuses",
            type: "checkbox-group",
            options: [
              { label: "No nasal complaints", value: "none" },
              { label: "Nasal congestion", value: "nasal_congestion" },
              { label: "Nasal discharge", value: "nasal_discharge" },
              { label: "Nosebleeds", value: "nosebleeds" },
              { label: "Sinus pressure/pain", value: "sinus_pressure_pain" },
              { label: "Loss of smell", value: "loss_of_smell" }
            ]
          },
          {
            name: "hn_subj_mouth_throat",
            label: "Mouth / Throat",
            type: "checkbox-group",
            options: [
              { label: "No oral complaints", value: "none" },
              { label: "Mouth sores", value: "mouth_sores" },
              { label: "Sore throat", value: "sore_throat" },
              { label: "Hoarseness", value: "hoarseness" },
              { label: "Difficulty swallowing", value: "difficulty_swallowing" },
              { label: "Dry mouth", value: "dry_mouth" },
              { label: "Tooth pain", value: "tooth_pain" }
            ]
          },
          {
            name: "hn_subj_neck",
            label: "Neck",
            type: "checkbox-group",
            options: [
              { label: "No neck complaints", value: "none" },
              { label: "Neck pain", value: "neck_pain" },
              { label: "Neck stiffness", value: "neck_stiffness" },
              { label: "Swollen glands", value: "swollen_glands" },
              { label: "Limited neck movement", value: "limited_neck_movement" },
              { label: "Neck masses", value: "neck_masses" }
            ]
          }
        ]
      },
      // ═══════════════════════════════════════════════════════════════
      // OBJECTIVE (Clinician Observed)
      // ═══════════════════════════════════════════════════════════════
      {
        title: "OBJECTIVE (Clinician Observed)",
        fields: [
          { type: "subheading", label: "Head / Face" },
          {
            name: "hn_obj_head_face",
            label: "Head / Face",
            type: "checkbox-group",
            options: [
              { label: "Head normocephalic", value: "normocephalic" },
              { label: "Facial symmetry intact", value: "facial_symmetry_intact" },
              { label: "Facial droop present", value: "facial_droop_present" },
              { label: "Lesions present", value: "lesions_present" },
              { label: "Involuntary movements", value: "involuntary_movements" }
            ]
          },
          {
            name: "hn_obj_hair_scalp",
            label: "Hair / Scalp",
            type: "checkbox-group",
            options: [
              { label: "Clean", value: "clean" },
              { label: "Even distribution", value: "even_distribution" },
              { label: "Alopecia patches", value: "alopecia_patches" },
              { label: "Lice/nits", value: "lice_nits" },
              { label: "Scalp lesions", value: "scalp_lesions" },
              { label: "Skin breakdown", value: "skin_breakdown" }
            ]
          },
          {
            name: "hn_obj_cn_vii",
            label: "Cranial Nerve VII (Facial)",
            type: "checkbox-group",
            options: [
              { label: "Symmetric smile", value: "symmetric_smile" },
              { label: "Symmetric eye closure", value: "symmetric_eye_closure" },
              { label: "Symmetric frown", value: "symmetric_frown" },
              { label: "Weakness present", value: "weakness_present" }
            ]
          },
          {
            name: "hn_obj_temporal_artery",
            label: "Temporal Artery",
            type: "radio",
            labelAbove: true,
            options: [
              { label: "Palpable bilaterally", value: "palpable_bilaterally" },
              { label: "Tender", value: "tender" },
              { label: "Non-palpable", value: "non_palpable" }
            ]
          },
          {
            name: "hn_obj_cn_v",
            label: "Cranial Nerve V (Trigeminal)",
            type: "checkbox-group",
            options: [
              { label: "Masseter strength intact", value: "masseter_intact" },
              { label: "Opens mouth against resistance", value: "opens_mouth_resistance" },
              { label: "Weakness present", value: "weakness_present" },
              { label: "TMJ tenderness", value: "tmj_tenderness" },
              { label: "TMJ clicking/grating", value: "tmj_clicking_grating" }
            ]
          },
          {
            name: "hn_obj_sinuses",
            label: "Sinuses",
            type: "radio",
            labelAbove: true,
            options: [
              { label: "Frontal sinuses non-tender", value: "frontal_non_tender" },
              { label: "Maxillary sinuses non-tender", value: "maxillary_non_tender" },
              { label: "Tenderness present", value: "tenderness_present" }
            ]
          },
          { type: "subheading", label: "Eyes" },
          {
            name: "hn_obj_eyes",
            label: "Eyes",
            type: "checkbox-group",
            options: [
              { label: "Eyelids symmetric", value: "eyelids_symmetric" },
              { label: "Ptosis", value: "ptosis" },
              { label: "Swelling", value: "swelling" },
              { label: "Redness", value: "redness" },
              { label: "Sclera white", value: "sclera_white" },
              { label: "Scleral icterus", value: "scleral_icterus" },
              { label: "Conjunctiva pink", value: "conjunctiva_pink" },
              { label: "Conjunctival redness", value: "conjunctival_redness" },
              { label: "Pupils equal", value: "pupils_equal" },
              { label: "Pupils unequal (anisocoria)", value: "pupils_unequal" },
              { label: "Round", value: "round" },
              { label: "Irregular", value: "irregular" },
              { label: "Clear", value: "clear" },
              { label: "Cloudy", value: "cloudy" },
              { label: "PERRLA", value: "perrla" },
              { label: "Reactive to light (direct)", value: "reactive_direct" },
              { label: "Reactive to light (consensual)", value: "reactive_consensual" },
              { label: "Accommodation intact", value: "accommodation_intact" },
              { label: "Non-reactive", value: "non_reactive" },
              { label: "Extraocular movements intact (CN III, IV, VI)", value: "eom_intact" },
              { label: "Limited ROM", value: "limited_rom" },
              { label: "Nystagmus present", value: "nystagmus_present" },
              { label: "Strabismus present", value: "strabismus_present" }
            ]
          },
          {
            name: "hn_obj_pupil_size_mm",
            label: "Pupil size (mm)",
            type: "input",
            placeholder: "e.g. 3-4"
          },
          { type: "subheading", label: "Ears" },
          {
            name: "hn_obj_ears",
            label: "Ears",
            type: "checkbox-group",
            options: [
              { label: "External ears normal", value: "external_normal" },
              { label: "Drainage present", value: "drainage_present" },
              { label: "Lesions present", value: "lesions_present" },
              { label: "Pinna non-tender", value: "pinna_non_tender" },
              { label: "Tragus non-tender", value: "tragus_non_tender" },
              { label: "Mastoid non-tender", value: "mastoid_non_tender" },
              { label: "Mastoid tenderness", value: "mastoid_tenderness" },
              { label: "Hearing intact to whisper", value: "hearing_intact" },
              { label: "Hearing deficit", value: "hearing_deficit" },
              { label: "Tympanic membrane pearly gray", value: "tm_pearly_gray" },
              { label: "TM dull/red/bulging", value: "tm_dull_red_bulging" },
              { label: "Perforation present", value: "perforation_present" },
              { label: "Cone of light present", value: "cone_of_light_present" }
            ]
          },
          { type: "subheading", label: "Nose" },
          {
            name: "hn_obj_nose",
            label: "Nose",
            type: "checkbox-group",
            options: [
              { label: "Nose midline", value: "nose_midline" },
              { label: "Septal deviation", value: "septal_deviation" },
              { label: "Nasal discharge", value: "nasal_discharge" },
              { label: "Redness", value: "redness" },
              { label: "Polyps", value: "polyps" },
              { label: "Nares patent bilaterally", value: "nares_patent_bilateral" },
              { label: "Obstruction present", value: "obstruction_present" },
              { label: "Cranial Nerve I intact (olfaction)", value: "cn_i_intact" },
              { label: "Impaired smell", value: "impaired_smell" }
            ]
          },
          { type: "subheading", label: "Mouth / Throat" },
          {
            name: "hn_obj_mouth_throat",
            label: "Mouth / Throat",
            type: "checkbox-group",
            options: [
              { label: "Lips pink, moist", value: "lips_pink_moist" },
              { label: "Cyanotic", value: "cyanotic" },
              { label: "Cracked", value: "cracked" },
              { label: "Lesions", value: "lesions" },
              { label: "Oral mucosa pink", value: "oral_mucosa_pink" },
              { label: "Pale", value: "pale" },
              { label: "Dry", value: "dry" },
              { label: "Teeth intact", value: "teeth_intact" },
              { label: "Caries present", value: "caries_present" },
              { label: "Loose/broken teeth", value: "loose_broken_teeth" },
              { label: "Tongue midline", value: "tongue_midline" },
              { label: "Moist", value: "moist" },
              { label: "Beefy red", value: "beefy_red" },
              { label: "Palate intact", value: "palate_intact" },
              { label: "Tonsils without exudate", value: "tonsils_no_exudate" },
              { label: "Tonsillar exudate", value: "tonsillar_exudate" },
              { label: "Uvula midline", value: "uvula_midline" },
              { label: "Cranial Nerve XII intact (tongue movement)", value: "cn_xii_intact" },
              { label: "Deviation present", value: "deviation_present" },
              { label: "Cranial Nerves IX & X intact (ah response, swallow, voice)", value: "cn_ix_x_intact" },
              { label: "Hoarseness", value: "hoarseness" },
              { label: "Dysphagia", value: "dysphagia" }
            ]
          },
          { type: "subheading", label: "Neck" },
          {
            name: "hn_obj_neck",
            label: "Neck",
            type: "checkbox-group",
            options: [
              { label: "Trachea midline", value: "trachea_midline" },
              { label: "Tracheal deviation", value: "tracheal_deviation" },
              { label: "Neck masses", value: "neck_masses" },
              { label: "Goiter", value: "goiter" },
              { label: "Full neck ROM", value: "full_neck_rom" },
              { label: "Limited ROM", value: "limited_rom" },
              { label: "Cranial Nerve XI intact (shoulder shrug, head turn)", value: "cn_xi_intact" },
              { label: "Weakness present", value: "weakness_present" },
              { label: "Jugular veins not distended", value: "jvd_not_present" },
              { label: "Jugular vein distention present", value: "jvd_present" }
            ]
          },
          { type: "subheading", label: "Lymph Nodes" },
          {
            name: "hn_obj_lymph_nodes",
            label: "Lymph Nodes",
            type: "checkbox-group",
            options: [
              { label: "Non-palpable", value: "non_palpable" },
              { label: "Enlarged", value: "enlarged" },
              { label: "Tender", value: "tender" },
              { label: "Fixed", value: "fixed" },
              { label: "Preauricular", value: "preauricular" },
              { label: "Postauricular", value: "postauricular" },
              { label: "Occipital", value: "occipital" },
              { label: "Parotid", value: "parotid" },
              { label: "Tonsillar", value: "tonsillar" },
              { label: "Submandibular", value: "submandibular" },
              { label: "Submental", value: "submental" },
              { label: "Superficial cervical", value: "superficial_cervical" },
              { label: "Deep cervical", value: "deep_cervical" },
              { label: "Posterior cervical", value: "posterior_cervical" },
              { label: "Supraclavicular", value: "supraclavicular" }
            ]
          },
          { type: "subheading", label: "Thyroid" },
          {
            name: "hn_obj_thyroid",
            label: "Thyroid",
            type: "checkbox-group",
            options: [
              { label: "Not palpable", value: "not_palpable" },
              { label: "Enlarged", value: "enlarged" },
              { label: "Nodules present", value: "nodules_present" },
              { label: "Tender", value: "tender" }
            ]
          },
          { type: "subheading", label: "Carotid Arteries" },
          {
            name: "hn_obj_carotid",
            label: "Carotid Arteries",
            type: "checkbox-group",
            options: [
              { label: "Pulse 2+ bilaterally", value: "pulse_2_plus_bilateral" },
              { label: "Weak", value: "weak" },
              { label: "Bounding", value: "bounding" },
              { label: "Unequal", value: "unequal" },
              { label: "Bruit absent", value: "bruit_absent" },
              { label: "Bruit present", value: "bruit_present" }
            ]
          }
        ]
      }
    ]
  };

  return (
    <CommonFormBuilder
      schema={HEAD_NECK_SCHEMA}
      values={values}
      onChange={onChange}
      layout={layout}
    />
  );
}
