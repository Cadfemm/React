const SUBJECTIVE = {
  "sections": [
    {
      "fields": [
        {
          "name": "chief_complaint",
          "label": "Chief Complaint",
          "type": "input"
        },
        {
          "name": "hpi",
          "label": "History of Present Illness",
          "type": "input"
        },
        {
          "type": "subheading",
          "label": "Presenting Symptoms"
        },
        {
          "type": "subheading",
          "label": "External Eye Symptoms"
        },
        {
          "name": "external_eye_symptoms_checkboxes",
          "type": "checkbox-group",
          "options": [
            {
              "label": "Grittiness",
              "value": "grittiness"
            },
            {
              "label": "Burning",
              "value": "burning"
            },
            {
              "label": "Itchiness",
              "value": "itchiness"
            },
            {
              "label": "Dryness",
              "value": "dryness"
            },
            {
              "label": "Tearing",
              "value": "tearing"
            },
            {
              "label": "Infection",
              "value": "infection"
            },
            {
              "label": "Others",
              "value": "other_external_eye_symptoms"
            }
          ]
        },
        {
          "type": "input",
          "name": "external_eye_symptoms_specify",
          "label": "Specify",
          "showIf": {
            "and": {
              "field": "external_eye_symptoms_checkboxes",
              "includes": "other_external_eye_symptoms"
            }
          }
        },
        {
          "type": "subheading",
          "label": "Visual Symptoms"
        },
        {
          "name": "visual_ocular_symptoms",
          "type": "checkbox-group",
          "options": [
            {
              "label": "Vision screening",
              "value": "vision_screening"
            },
            {
              "label": "Blurry vision",
              "value": "blurry_vision"
            },
            {
              "label": "Double vision (Diplopia)",
              "value": "double_vision"
            },
            {
              "label": "Night vision difficulty",
              "value": "night_vision"
            },
            {
              "label": "Flash of light",
              "value": "flash_light"
            },
            {
              "label": "Floaters/spots in vision",
              "value": "floaters"
            },
            {
              "label": "Eye pain",
              "value": "eye_pain"
            },
            {
              "label": "Headaches",
              "value": "headaches"
            },
            {
              "label": "Squinting",
              "value": "squinting"
            },
            {
              "label": "Emmetropia (Normal Vision)",
              "value": "emmetropia"
            },
            {
              "label": "Others",
              "value": "other_visual_ocular_symptoms"
            }
          ]
        },
        {
          "type": "input",
          "name": "refraction_questions_specify",
          "label": "Specify",
          "showIf": {
            "and": {
              "field": "visual_ocular_symptoms",
              "includes": "other_visual_ocular_symptoms"
            }
          }
        },
        {
          "type": "subheading",
          "label": "Ocular Symptoms"
        },
        {
          "name": "ocular_symptoms",
          "type": "checkbox-group",
          "options": [
            {
              "label": "Grittiness",
              "value": "grittiness"
            },
            {
              "label": "Burning",
              "value": "burning"
            },
            {
              "label": "Itchiness",
              "value": "itchiness"
            },
            {
              "label": "Dryness",
              "value": "dryness"
            },
            {
              "label": "Tearing",
              "value": "tearing"
            },
            {
              "label": "Infection",
              "value": "infection"
            },
            {
              "label": "Eye pain",
              "value": "eye_pain"
            },
            {
              "label": "Others",
              "value": "other_ocular_symptoms"
            }
          ]
        },
        {
          "type": "input",
          "name": "ocular_symptoms_specify",
          "label": "Specify",
          "showIf": {
            "and": {
              "field": "ocular_symptoms",
              "includes": "other_ocular_symptoms"
            }
          }
        },
        {
          "type": "subheading",
          "label": "Patient Vision & Case History"
        },
        {
          "type": "date",
          "name": "last_eye_exam",
          "label": "Date of last eye examination"
        },
        {
          "type": "radio",
          "name": "spectacles_use",
          "label": "Spectacles use",
          "options": [
            {
              "label": "Yes",
              "value": "yes"
            },
            {
              "label": "No",
              "value": "no"
            }
          ]
        },
        {
          "type": "input",
          "name": "spectacle_prescription",
          "label": "Prescription",
          "showIf": {
            "field": "spectacles_use",
            "equals": "yes"
          }
        },
        {
          "type": "radio",
          "name": "contact_lens_use",
          "label": "Contact lens use",
          "options": [
            {
              "label": "Yes",
              "value": "yes"
            },
            {
              "label": "No",
              "value": "no"
            }
          ]
        },
        {
          "type": "row",
          "fields": [
            {
              "type": "input",
              "name": "contact_prescription",
              "label": "Prescription",
              "showIf": {
                "field": "contact_lens_use",
                "equals": "yes"
              }
            },
            {
              "type": "input",
              "name": "contact_type",
              "label": "Type",
              "showIf": {
                "field": "contact_lens_use",
                "equals": "yes"
              }
            }
          ]
        },
        {
          "type": "row",
          "fields": [
            {
              "type": "input",
              "name": "contact_wearing_frequency",
              "label": "Wearing frequency",
              "showIf": {
                "field": "contact_lens_use",
                "equals": "yes"
              }
            },
            {
              "type": "input",
              "name": "contact_modalities",
              "label": "Modalities",
              "showIf": {
                "field": "contact_lens_use",
                "equals": "yes"
              }
            }
          ]
        },
        {
          "type": "input",
          "name": "others_specify",
          "label": "Specify"
        },
        {
          "name": "pmh_from_registration",
          "label": "Medical History",
          "type": "input",
          "readOnly": true
        },
        {
          "name": "family_history_from_registration",
          "label": "Family History",
          "type": "input",
          "readOnly": true
        },
        {
          "name": "allergies_from_registration",
          "label": "Allergies",
          "type": "input",
          "readOnly": true
        },
        {
          "type": "subheading",
          "label": "Ocular History & Eye Conditions"
        },
        {
          "type": "subheading",
          "label": "Past Ocular History"
        },
        {
          "name": "past_ocular_history",
          "type": "checkbox-group",
          "options": [
            {
              "label": "Cataract",
              "value": "cataract"
            },
            {
              "label": "Corneal abrasion",
              "value": "corneal_abrasion"
            },
            {
              "label": "Dry eye",
              "value": "dry_eye"
            },
            {
              "label": "Eye turn",
              "value": "eye_turn"
            },
            {
              "label": "Glaucoma",
              "value": "glaucoma"
            },
            {
              "label": "Injury",
              "value": "injury"
            },
            {
              "label": "Iritis/Uveitis",
              "value": "iritis"
            },
            {
              "label": "Lazy eye",
              "value": "lazy_eye"
            },
            {
              "label": "Macular degeneration",
              "value": "macular_degeneration"
            },
            {
              "label": "Retinal defect/hole/tear",
              "value": "retinal_defect"
            },
            {
              "label": "Retinal detachment",
              "value": "retinal_detachment"
            },
            {
              "label": "Others",
              "value": "other_eye_disease"
            }
          ]
        },
        {
          "type": "input",
          "name": "past_ocular_history_specify",
          "label": "Specify",
          "showIf": {
            "and": {
              "field": "past_ocular_history",
              "includes": "other_eye_disease"
            }
          }
        },
        {
          "type": "subheading",
          "label": "Family Ocular History"
        },
        {
          "name": "family_ocular_history",
          "type": "checkbox-group",
          "options": [
            {
              "label": "Cataract",
              "value": "cataracts"
            },
            {
              "label": "Eye turn",
              "value": "eye_turn"
            },
            {
              "label": "Glaucoma",
              "value": "glaucoma"
            },
            {
              "label": "Iritis/Uveitis",
              "value": "iritis"
            },
            {
              "label": "Lazy eye",
              "value": "lazy_eye"
            },
            {
              "label": "Macular degeneration",
              "value": "macular_degeneration"
            },
            {
              "label": "Retinal detachment",
              "value": "retinal_detachment"
            },
            {
              "label": "Retinitis pigmentosa",
              "value": "retinitis_pigmentosa"
            },
            {
              "label": "Colour vision defect",
              "value": "colour_vision"
            },
            {
              "label": "Others",
              "value": "other_family_eye_disease"
            }
          ]
        },
        {
          "type": "input",
          "name": "family_ocular_history_specify",
          "label": "Specify",
          "showIf": {
            "and": {
              "field": "family_ocular_history",
              "includes": "other_family_eye_disease"
            }
          }
        },
        {
          "type": "button",
          "label": "Questionnaires",
          "name": "show_questionnaires",
          "toggleValue": true
        },
        {
          "type": "assessment-launcher",
          "name": "subjective_questionnaires",
          "showIf": {
            "field": "show_questionnaires",
            "equals": true
          },
          "options": [
            {
              "label": "Visual Function Questionnaire",
              "value": "VISUAL_FUNCTION"
            },
            {
              "label": "Low Vision Quality of Life Questionnaire (LVQoL)",
              "value": "LVQOL"
            },
            {
              "label": "Brain Injury Vision Symptoms Survey (BIVSS)",
              "value": "BRAIN_VISION"
            },
            {
              "label": "Binocular Vision Dysfunction Questionnaire (BVDQ)",
              "value": "BVDQ"
            },
            {
              "label": "Binocular Vision Questionnaire",
              "value": "BV_QUESTIONNAIRE"
            }
          ]
        }
      ]
    }
  ]
}

const OBJECTIVE = {
  "sections": [
    {
      "fields": [
        {
          "type": "input",
          "name": "general_observation",
          "label": "General Observation"
        },
        {
          "name": "objective_sections",
          "type": "checkbox-group",
          "options": [
            {
              "label": "Entrance Test",
              "value": "entrance_test"
            }
          ]
        },
        {
          "type": "subheading",
          "label": "Visual Acuity",
          "showIf": {
            "field": "objective_sections",
            "includes": "entrance_test"
          }
        },
        {
          "type": "checkbox-group",
          "name": "visual_acuity_eyes",
          "label": "Visual Acuity",
          "inlineWithLabel": true,
          "options": [
            {
              "value": "RE",
              "label": "Right Eye"
            },
            {
              "value": "LE",
              "label": "Left Eye"
            },
            {
              "value": "BE",
              "label": "Both Eye"
            }
          ],
          "showIf": {
            "field": "objective_sections",
            "includes": "entrance_test"
          }
        },
        {
          "type": "refraction-12col",
          "name": "visual_acuity_re",
          "showIf": {
            "field": "visual_acuity_eyes",
            "includes": "RE",
            "and": {
              "field": "objective_sections",
              "includes": "entrance_test"
            }
          },
          "groups": [
            {
              "label": "Right Eye (RE)",
              "columns": [
                {
                  "key": "D"
                },
                {
                  "key": "N"
                },
                {
                  "key": "P"
                }
              ]
            }
          ],
          "rows": [
            {
              "label": "Habitual / Aided – Distance",
              "value": "ha_dist",
              "columns": [
                {
                  "type": "select",
                  "options": [
                    "6/3",
                    "6/4.5",
                    "6/6",
                    "6/7.5",
                    "6/9",
                    "6/12",
                    "6/15",
                    "6/18",
                    "6/24",
                    "6/30",
                    "6/45",
                    "6/60",
                    "6/120",
                    "CF at 1m",
                    "HM at 1m",
                    "LP",
                    "NPL"
                  ]
                },
                {
                  "type": "select",
                  "options": [
                    "+",
                    "-"
                  ]
                },
                {
                  "type": "select",
                  "options": [
                    1,
                    2,
                    3,
                    4,
                    5
                  ]
                }
              ]
            },
            {
              "label": "Habitual / Aided – Near",
              "value": "ha_near",
              "columns": [
                {
                  "type": "select",
                  "options": [
                    "N5 at 40cm",
                    "N6 at 40cm",
                    "N8 at 40cm",
                    "N10 at 40cm",
                    "N12 at 40cm",
                    "N14 at 40cm",
                    "N24 at 40cm",
                    "N36 at 40cm",
                    "Poorer than N36"
                  ]
                },
                {
                  "type": "input"
                },
                {
                  "type": "input"
                }
              ]
            },
            {
              "label": "Habitual / Aided – Pinhole",
              "value": "ha_pin",
              "remark": true
            },
            {
              "label": "Habitual / Aided – Remark",
              "value": "ha_remark",
              "remark": true
            },
            {
              "label": "Unaided – Distance",
              "value": "ua_dist",
              "columns": [
                {
                  "type": "select",
                  "options": [
                    "6/3",
                    "6/4.5",
                    "6/6",
                    "6/7.5",
                    "6/9",
                    "6/12",
                    "6/15",
                    "6/18",
                    "6/24",
                    "6/30",
                    "6/45",
                    "6/60",
                    "6/120",
                    "CF at 1m",
                    "HM at 1m",
                    "LP",
                    "NPL"
                  ]
                },
                {
                  "type": "select",
                  "options": [
                    "+",
                    "-"
                  ]
                },
                {
                  "type": "select",
                  "options": [
                    1,
                    2,
                    3,
                    4,
                    5
                  ]
                }
              ]
            },
            {
              "label": "Unaided – Near",
              "value": "ua_near",
              "columns": [
                {
                  "type": "select",
                  "options": [
                    "N5 at 40cm",
                    "N6 at 40cm",
                    "N8 at 40cm",
                    "N10 at 40cm",
                    "N12 at 40cm",
                    "N14 at 40cm",
                    "N24 at 40cm",
                    "N36 at 40cm",
                    "Poorer than N36"
                  ]
                },
                {
                  "type": "input"
                },
                {
                  "type": "input"
                }
              ]
            },
            {
              "label": "Unaided – Pinhole",
              "value": "ua_pin",
              "remark": true
            },
            {
              "label": "Unaided – Remark",
              "value": "ua_remark",
              "remark": true
            }
          ]
        },
        {
          "type": "refraction-12col",
          "name": "visual_acuity_le",
          "showIf": {
            "field": "visual_acuity_eyes",
            "includes": "LE",
            "and": {
              "field": "objective_sections",
              "includes": "entrance_test"
            }
          },
          "groups": [
            {
              "label": "Left Eye (LE)",
              "columns": [
                {
                  "key": "D"
                },
                {
                  "key": "N"
                },
                {
                  "key": "P"
                }
              ]
            }
          ],
          "rows": [
            {
              "label": "Habitual / Aided – Distance",
              "value": "ha_dist",
              "columns": [
                {
                  "type": "select",
                  "options": [
                    "6/3",
                    "6/4.5",
                    "6/6",
                    "6/7.5",
                    "6/9",
                    "6/12",
                    "6/15",
                    "6/18",
                    "6/24",
                    "6/30",
                    "6/45",
                    "6/60",
                    "6/120",
                    "CF at 1m",
                    "HM at 1m",
                    "LP",
                    "NPL"
                  ]
                },
                {
                  "type": "select",
                  "options": [
                    "+",
                    "-"
                  ]
                },
                {
                  "type": "select",
                  "options": [
                    1,
                    2,
                    3,
                    4,
                    5
                  ]
                }
              ]
            },
            {
              "label": "Habitual / Aided – Near",
              "value": "ha_near",
              "columns": [
                {
                  "type": "select",
                  "options": [
                    "N5 at 40cm",
                    "N6 at 40cm",
                    "N8 at 40cm",
                    "N10 at 40cm",
                    "N12 at 40cm",
                    "N14 at 40cm",
                    "N24 at 40cm",
                    "N36 at 40cm",
                    "Poorer than N36"
                  ]
                },
                {
                  "type": "input"
                },
                {
                  "type": "input"
                }
              ]
            },
            {
              "label": "Habitual / Aided – Pinhole",
              "value": "ha_pin",
              "remark": true
            },
            {
              "label": "Habitual / Aided – Remark",
              "value": "ha_remark",
              "remark": true
            },
            {
              "label": "Unaided – Distance",
              "value": "ua_dist",
              "columns": [
                {
                  "type": "select",
                  "options": [
                    "6/3",
                    "6/4.5",
                    "6/6",
                    "6/7.5",
                    "6/9",
                    "6/12",
                    "6/15",
                    "6/18",
                    "6/24",
                    "6/30",
                    "6/45",
                    "6/60",
                    "6/120",
                    "CF at 1m",
                    "HM at 1m",
                    "LP",
                    "NPL"
                  ]
                },
                {
                  "type": "select",
                  "options": [
                    "+",
                    "-"
                  ]
                },
                {
                  "type": "select",
                  "options": [
                    1,
                    2,
                    3,
                    4,
                    5
                  ]
                }
              ]
            },
            {
              "label": "Unaided – Near",
              "value": "ua_near",
              "columns": [
                {
                  "type": "select",
                  "options": [
                    "N5 at 40cm",
                    "N6 at 40cm",
                    "N8 at 40cm",
                    "N10 at 40cm",
                    "N12 at 40cm",
                    "N14 at 40cm",
                    "N24 at 40cm",
                    "N36 at 40cm",
                    "Poorer than N36"
                  ]
                },
                {
                  "type": "input"
                },
                {
                  "type": "input"
                }
              ]
            },
            {
              "label": "Unaided – Pinhole",
              "value": "ua_pin",
              "remark": true
            },
            {
              "label": "Unaided – Remark",
              "value": "ua_remark",
              "remark": true
            }
          ]
        },
        {
          "type": "refraction-12col",
          "name": "visual_acuity_be",
          "showIf": {
            "field": "visual_acuity_eyes",
            "includes": "BE",
            "and": {
              "field": "objective_sections",
              "includes": "entrance_test"
            }
          },
          "groups": [
            {
              "label": "Both Eye (BE)",
              "columns": [
                {
                  "key": "D"
                },
                {
                  "key": "N"
                },
                {
                  "key": "P"
                }
              ]
            }
          ],
          "rows": [
            {
              "label": "Habitual / Aided – Distance",
              "value": "ha_dist",
              "columns": [
                {
                  "type": "select",
                  "options": [
                    "6/3",
                    "6/4.5",
                    "6/6",
                    "6/7.5",
                    "6/9",
                    "6/12",
                    "6/15",
                    "6/18",
                    "6/24",
                    "6/30",
                    "6/45",
                    "6/60",
                    "6/120",
                    "CF at 1m",
                    "HM at 1m",
                    "LP",
                    "NPL"
                  ]
                },
                {
                  "type": "select",
                  "options": [
                    "+",
                    "-"
                  ]
                },
                {
                  "type": "select",
                  "options": [
                    1,
                    2,
                    3,
                    4,
                    5
                  ]
                }
              ]
            },
            {
              "label": "Habitual / Aided – Near",
              "value": "ha_near",
              "columns": [
                {
                  "type": "select",
                  "options": [
                    "N5 at 40cm",
                    "N6 at 40cm",
                    "N8 at 40cm",
                    "N10 at 40cm",
                    "N12 at 40cm",
                    "N14 at 40cm",
                    "N24 at 40cm",
                    "N36 at 40cm",
                    "Poorer than N36"
                  ]
                },
                {
                  "type": "input"
                },
                {
                  "type": "input"
                }
              ]
            },
            {
              "label": "Habitual / Aided – Pinhole",
              "value": "ha_pin",
              "remark": true
            },
            {
              "label": "Habitual / Aided – Remark",
              "value": "ha_remark",
              "remark": true
            },
            {
              "label": "Unaided – Distance",
              "value": "ua_dist",
              "columns": [
                {
                  "type": "select",
                  "options": [
                    "6/3",
                    "6/4.5",
                    "6/6",
                    "6/7.5",
                    "6/9",
                    "6/12",
                    "6/15",
                    "6/18",
                    "6/24",
                    "6/30",
                    "6/45",
                    "6/60",
                    "6/120",
                    "CF at 1m",
                    "HM at 1m",
                    "LP",
                    "NPL"
                  ]
                },
                {
                  "type": "select",
                  "options": [
                    "+",
                    "-"
                  ]
                },
                {
                  "type": "select",
                  "options": [
                    1,
                    2,
                    3,
                    4,
                    5
                  ]
                }
              ]
            },
            {
              "label": "Unaided – Near",
              "value": "ua_near",
              "columns": [
                {
                  "type": "select",
                  "options": [
                    "N5 at 40cm",
                    "N6 at 40cm",
                    "N8 at 40cm",
                    "N10 at 40cm",
                    "N12 at 40cm",
                    "N14 at 40cm",
                    "N24 at 40cm",
                    "N36 at 40cm",
                    "Poorer than N36"
                  ]
                },
                {
                  "type": "input"
                },
                {
                  "type": "input"
                }
              ]
            },
            {
              "label": "Unaided – Pinhole",
              "value": "ua_pin",
              "remark": true
            },
            {
              "label": "Unaided – Remark",
              "value": "ua_remark",
              "remark": true
            }
          ]
        },
        {
          "type": "subheading",
          "label": "Binocular & Ocular Function",
          "showIf": {
            "field": "objective_sections",
            "includes": "entrance_test"
          }
        },
        {
          "type": "grid-header",
          "cols": [
            "Right Eye (RE)",
            "Left Eye (LE)",
            "Remarks"
          ],
          "showIf": {
            "field": "objective_sections",
            "includes": "entrance_test"
          }
        },
        {
          "type": "grid-row",
          "name": "bruckner",
          "label": "Bruckner Test",
          "cols": [
            {
              "type": "single-select",
              "options": [
                "Full",
                "Dull",
                "Defective"
              ]
            },
            {
              "type": "single-select",
              "options": [
                "Full",
                "Dull",
                "Defective"
              ]
            },
            "input"
          ],
          "showIf": {
            "field": "objective_sections",
            "includes": "entrance_test"
          }
        },
        {
          "type": "grid-row",
          "name": "color_vision",
          "label": "Color Vision Test",
          "cols": [
            {
              "type": "single-select",
              "options": [
                "Passed",
                "Failed"
              ]
            },
            {
              "type": "single-select",
              "options": [
                "Passed",
                "Failed"
              ]
            },
            "input"
          ],
          "showIf": {
            "field": "objective_sections",
            "includes": "entrance_test"
          }
        },
        {
          "type": "grid-row",
          "name": "pupil_response",
          "label": "Pupil Response",
          "cols": [
            {
              "type": "single-select",
              "options": [
                "PERRL",
                "Anisocoria R>L",
                "Anisocoria L>R"
              ]
            },
            {
              "type": "single-select",
              "options": [
                "PERRL",
                "Anisocoria R>L",
                "Anisocoria L>R"
              ]
            },
            "input"
          ],
          "showIf": {
            "field": "objective_sections",
            "includes": "entrance_test"
          }
        },
        {
          "type": "grid-row",
          "name": "marcus_gunn",
          "label": "Marcus Gunn Test",
          "cols": [
            {
              "type": "single-select",
              "options": [
                "Normal",
                "Abnormal"
              ]
            },
            {
              "type": "single-select",
              "options": [
                "Normal",
                "Abnormal"
              ]
            },
            "input"
          ],
          "showIf": {
            "field": "objective_sections",
            "includes": "entrance_test"
          }
        },
        {
          "type": "grid-row",
          "name": "cover_distance",
          "label": "Cover Test – Distance",
          "cols": [
            "input",
            "input",
            "input"
          ],
          "showIf": {
            "field": "objective_sections",
            "includes": "entrance_test"
          }
        },
        {
          "type": "grid-row",
          "name": "cover_near",
          "label": "Cover Test – Near",
          "cols": [
            "input",
            "input",
            "input"
          ],
          "showIf": {
            "field": "objective_sections",
            "includes": "entrance_test"
          }
        },
        {
          "type": "grid-row",
          "name": "stereopsis",
          "label": "Stereopsis",
          "cols": [
            {
              "type": "single-select",
              "options": [
                "Presented",
                "Not presented"
              ]
            },
            {
              "type": "single-select",
              "options": [
                "Presented",
                "Not presented"
              ]
            },
            "input"
          ],
          "showIf": {
            "field": "objective_sections",
            "includes": "entrance_test"
          }
        },
        {
          "type": "grid-row",
          "name": "hirschberg",
          "label": "Hirschberg Test",
          "cols": [
            {
              "type": "single-select",
              "options": [
                "Centered",
                "Nasal",
                "Temporal",
                "Superior",
                "Inferior"
              ]
            },
            {
              "type": "single-select",
              "options": [
                "Centered",
                "Nasal",
                "Temporal",
                "Superior",
                "Inferior"
              ]
            },
            "input"
          ],
          "showIf": {
            "field": "objective_sections",
            "includes": "entrance_test"
          }
        },
        {
          "type": "grid-row",
          "name": "eom",
          "label": "EOM Test",
          "cols": [
            {
              "type": "single-select",
              "options": [
                "Normal",
                "Impaired"
              ]
            },
            {
              "type": "single-select",
              "options": [
                "Normal",
                "Impaired"
              ]
            },
            "input"
          ],
          "showIf": {
            "field": "objective_sections",
            "includes": "entrance_test"
          }
        },
        {
          "type": "grid-row",
          "name": "vor",
          "label": "VOR Test",
          "cols": [
            {
              "type": "single-select",
              "options": [
                "Normal",
                "Impaired"
              ]
            },
            {
              "type": "single-select",
              "options": [
                "Normal",
                "Impaired"
              ]
            },
            "input"
          ],
          "showIf": {
            "field": "objective_sections",
            "includes": "entrance_test"
          }
        },
        {
          "type": "row",
          "fields": [
            {
              "type": "radio",
              "name": "confrontation_re",
              "label": "Confrontational Test Right Eye",
              "options": [
                {
                  "label": "Full",
                  "value": "full"
                },
                {
                  "label": "Restricted",
                  "value": "restricted"
                }
              ]
            },
            {
              "type": "radio",
              "name": "confrontation_le",
              "label": "Confrontational Test Left Eye",
              "options": [
                {
                  "label": "Full",
                  "value": "full"
                },
                {
                  "label": "Restricted",
                  "value": "restricted"
                }
              ]
            }
          ]
        },
        {
          "type": "input",
          "name": "confrontation_clinical_findings",
          "label": "Clinical Findings"
        },
        {
          "type": "row",
          "fields": [
            {
              "type": "input",
              "name": "tonometry_re",
              "label": "Tonometry Right Eye (RE) (mmHg @ time)"
            },
            {
              "type": "input",
              "name": "tonometry_le",
              "label": "Tonometry Left Eye (LE) (mmHg @ time)"
            }
          ]
        },
        {
          "type": "input",
          "name": "additional_test",
          "label": "Additional Test"
        },
        {
          "type": "input",
          "name": "analysis_remark",
          "label": "Remark"
        },
        {
          "type": "assessment-launcher",
          "name": "optometry_assessments",
          "options": [
            {
              "label": "Binocular Vision Profile",
              "value": "BINOCULAR_VISION"
            },
            {
              "label": "Refraction Analysis",
              "value": "REFRACTION"
            },
            {
              "label": "Vision For Driving",
              "value": "VISION_DRIVING"
            },
            {
              "label": "Ocular Health Profile",
              "value": "OCULAR_HEALTH"
            },
            {
              "label": "Special Diagnostic",
              "value": "SPECIAL_DIAGNOSTIC"
            },
            {
              "label": "Low Vision/Blind Profile",
              "value": "LOW_VISION_ASSESSMENT"
            }
          ]
        }
      ]
    }
  ]
};

const ASSESSMENT = {
  "sections": [
    {
      "fields": [
        {
          "type": "input",
          "name": "clinical_impression",
          "label": "Clinical Impression"
        },
        {
          "type": "subheading",
          "label": "Problem Listing"
        },
        {
          "name": "problem_listing",
          "type": "checkbox-group",
          "options": [
            {
              "label": "Ammetropia",
              "value": "ammetropia"
            },
            {
              "label": "Emmetropia",
              "value": "emmetropia"
            },
            {
              "label": "Presbyopia",
              "value": "presbyopia"
            },
            {
              "label": "Others",
              "value": "others"
            }
          ]
        },
        {
          "name": "problem_listing_others",
          "label": "Specify",
          "type": "input",
          "showIf": {
            "field": "problem_listing",
            "includes": "others"
          }
        },
        {
          "type": "radio",
          "name": "functional_vision_status",
          "label": "Functional Vision Status",
          "options": [
            {
              "label": "Within normal limit(s)",
              "value": "within_normal_limits"
            },
            {
              "label": "Red-flag",
              "value": "red_flag"
            },
            {
              "label": "Normal",
              "value": "normal"
            },
            {
              "label": "Abnormal",
              "value": "abnormal"
            }
          ]
        },
        {
          "type": "textarea",
          "name": "functional_vision_details",
          "label": "Details",
          "showIf": {
            "field": "functional_vision_status",
            "equals": "abnormal"
          }
        }
      ]
    }
  ]
};

const PLAN = {
  "sections": [
    {
      "fields": [
        {
          "type": "subheading",
          "label": "Short Term Goals (2–4 Weeks)"
        },
        {
          "type": "dynamic-goals",
          "name": "short_term_goals"
        },
        {
          "type": "subheading",
          "label": "Long Term Goals (6–12 Weeks)"
        },
        {
          "type": "dynamic-goals",
          "name": "long_term_goals"
        },
        {
          "type": "textarea",
          "name": "intervention_plan",
          "label": "Intervention Plan"
        },
        {
          "type": "radio",
          "name": "need_further_assessment",
          "label": "Required Further Assessments",
          "options": [
            {
              "label": "Yes",
              "value": "yes"
            },
            {
              "label": "No",
              "value": "no"
            }
          ]
        },
        {
          "type": "multi-select-dropdown",
          "name": "assessment_list",
          "label": "Further Assessments",
          "showIf": {
            "field": "need_further_assessment",
            "equals": "yes"
          },
          "options": [
            {
              "label": "Refraction",
              "value": "refraction"
            },
            {
              "label": "Ocular Health Assessment",
              "value": "ocular_health_assessment"
            },
            {
              "label": "Ocular Coherence Tomography",
              "value": "ocular_coherence_tomography"
            },
            {
              "label": "Hess Chart",
              "value": "hess_chart"
            },
            {
              "label": "Visual Evoked Potential / Electroretinogram",
              "value": "visual_evoked_potential_electroretinogram"
            },
            {
              "label": "Right Eye Vision System",
              "value": "right_eye_vision_system"
            },
            {
              "label": "Corneal Topography",
              "value": "corneal_topography"
            },
            {
              "label": "Ocular Efficiency Test",
              "value": "ocular_efficiency_test"
            },
            {
              "label": "DEM Test",
              "value": "dem_test"
            },
            {
              "label": "Visual Field Assessment",
              "value": "visual_field_assessment"
            },
            {
              "label": "Microperimeter",
              "value": "microperimeter"
            },
            {
              "label": "Neuroptix Pupillometer",
              "value": "neuroptix_pupillometer"
            },
            {
              "label": "Color Vision Test",
              "value": "color_vision_test"
            },
            {
              "label": "Binocular Vision Assessment",
              "value": "binocular_vision_assessment"
            },
            {
              "label": "Low Vision Assessment",
              "value": "low_vision_assessment"
            },
            {
              "label": "Others",
              "value": "others"
            }
          ]
        },
        {
          "type": "input",
          "name": "assessment_list_other",
          "label": "Specify Other Assessment",
          "showIf": {
            "field": "assessment_list",
            "includes": "Others"
          }
        },
        {
          "type": "date",
          "name": "next_follow_up",
          "label": "Next Follow-Up",
          "format": "DD/MM/YYYY"
        },
        {
          "type": "radio",
          "name": "required_referral",
          "label": "Required Referral",
          "options": [
            {
              "label": "Yes",
              "value": "yes"
            },
            {
              "label": "No",
              "value": "no"
            }
          ]
        },
        {
          "type": "textarea",
          "name": "referral_text",
          "label": "Referral",
          "showIf": {
            "field": "required_referral",
            "equals": "yes"
          }
        }
      ]
    }
  ]
};

export default {
  PLAN,
  OBJECTIVE,
  SUBJECTIVE,
  ASSESSMENT,
};
