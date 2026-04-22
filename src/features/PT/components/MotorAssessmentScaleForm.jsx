import React from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

const MAS_OPTIONS = [
  { label: "0", value: "0" },
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
  { label: "5", value: "5" },
  { label: "6", value: "6" },
];

const SUPINE_TO_SIDE_INFO = {
  title: "Criteria for Scoring — Supine to Side Lying",
  content: [
    "1. Pulls himself into side lying. Starting position must be supine lying, not knees flexed. Patient pulls himself into side lying with intact arm, moves affected leg with intact leg.",
    "2. Moves leg across actively and the lower half of the body follows. Starting position as above. Arm is left behind.",
    "3. Arm is lifted across body with other arm, leg is moved actively and body follows in block. Starting position as above.",
    "4. Moves arm across body actively and the rest of body follows in a block. Starting position as above.",
    "5. Moves arm and leg and rolls to side but overbalances. Starting position as above. Shoulder protracts and arm flexes forward.",
    "6. Rolls to side in 3 seconds. Starting position as above. Must not use hands.",
  ]
};

const SUPINE_TO_SITTING_INFO = {
  title: "Criteria for Scoring — Supine to Sitting over Side of Bed",
  content: [
    "1. Side lying, lifts head sideways but cannot sit up. Patient assisted to side lying.",
    "2. Side lying to sitting over side of bed. Therapist assists patient with movement. Patient controls head position throughout.",
    "3. Side lying to sitting over side of bed. Therapist gives stand-by help by assisting legs over side of bed.",
    "4. Side lying to sitting over side of bed. With no stand-by help.",
    "5. Supine to sitting over side of bed. With no stand-by help.",
    "6. Supine to sitting over side of bed within 10 seconds. With no stand-by help.",
  ]
};

const BALANCED_SITTING_INFO = {
  title: "Criteria for Scoring — Balanced Sitting",
  content: [
    "1. Sitting only with support. Therapist should assist patient into sitting.",
    "2. Sits unsupported for 10 seconds. Without holding on, knees and feet together, feet can be supported on floor.",
    "3. Sits unsupported with weight well forward and evenly distributed. Weight should be well forward at the hips, head and thoracic spine extended, weight evenly distributed on both sides.",
    "4. Sits unsupported, turns head and trunk to look behind. Feet supported and together on floor. Do not allow legs to abduct or feet to move. Have hands resting on thighs, do not allow hands to move onto plinth.",
    "5. Sits unsupported, reaches forward to touch floor, and returns to starting position. Feet supported on floor. Do not allow patient to hold on. Do not allow legs and feet to move, support affected arm if necessary. Hand must touch floor at least 10 cm [4 in] in front of feet.",
    "6. Sits on stool unsupported, reaches sideways to touch floor, and returns to starting position. Feet supported on floor. Do not allow patient to hold on. Do not allow legs and feet to move, support affected arm if necessary. Patient must reach sideways not forward.",
  ]
};

const SITTING_TO_STANDING_INFO = {
  title: "Criteria for Scoring — Sitting to Standing",
  content: [
    "1. Gets to standing with help from therapist. Any method.",
    "2. Gets to standing with stand-by help. Weight unevenly distributed, uses hands for support.",
    "3. Gets to standing. Do not allow uneven weight distribution or help from hands.",
    "4. Gets to standing and stands for 5 seconds with hips and knees extended. Do not allow uneven weight distribution.",
    "5. Sitting to standing to sitting with no stand-by help. Do not allow uneven weight distribution. Full extension of hips and knees.",
    "6. Sitting to standing to sitting with no stand-by help three times in 10 seconds. Do not allow uneven weight distribution.",
  ]
};

const WALKING_INFO = {
  title: "Criteria for Scoring — Walking",
  content: [
    "1. Stands on affected leg and steps forward with other leg. Weight-bearing hip must be extended. Therapist may give stand-by help.",
    "2. Walks with stand-by help from one person.",
    "3. Walks 3 m (10 ft) alone or uses any aid but no stand-by help.",
    "4. Walks 5 m (16 ft) with no aid in 15 seconds.",
    "5. Walks 10 m (33 ft) with no aid, turns around, picks up a small sandbag from floor, walks back in 25 seconds. May use either hand.",
    "6. Walks up and down four steps with or without an aid but without holding on the rail three times in 35 seconds.",
  ]
};

const UPPER_ARM_INFO = {
  title: "Criteria for Scoring — Upper-Arm Function",
  content: [
    "1. Lying, protract shoulder girdle with arm in elevation. Therapist places arm in position and supports with elbow in extension.",
    "2. Lying, hold extended arm in elevation for 2 seconds. Therapist should place arm in position and patient must maintain position with some external rotation. Elbow must be held within 20 degrees of full extension.",
    "3. Flexion and extension of elbow to take palm to forehead with arm as in 2. Therapist should place arm in position and patient must maintain position with some external rotation and elbow extension. Do not allow excess shoulder elevation.",
    "4. Sitting, patient lifts arm to above position, holds it there for 10 seconds, and then lowers it. Patient must maintain position with some external rotation. Do not allow pronation.",
    "5. Sitting, patient lifts arm to above position, holds it there for 10 seconds and then lowers it. Patient must maintain position with some external rotation. Do not allow pronation.",
    "6. Standing, hand against wall. Maintain arm position while turning body toward wall. Have arm abducted to 90 degrees with palm flat against the wall.",
  ]
};

const ADVANCED_HAND_INFO = {
  title: "Criteria for Scoring — Advanced Hand Activities",
  content: [
    "1. Picking up the top of a pen and putting it down again. Patient stretches arm forward, picks up pen top, releases it on table close to body.",
    "2. Picking up one jellybean from a cup and placing it in another cup. Teacup contains eight jellybeans. Both cups must be at arms' length. Left hand takes jellybean from cup on right and releases it in cup on left.",
    "3. Drawing horizontal lines to stop at a vertical line 10 times in 20 seconds. At least five lines must touch and stop at vertical line.",
    "4. Holding a pencil, making rapid consecutive dots on a sheet of paper. Patient must do at least 2 dots a second for 5 seconds. Patient picks up pencil and positions it without assistance. Patient must hold pen as for writing. Patient must make a dot not a stroke.",
    "5. Taking a dessert spoon of liquid to the mouth. Do not allow head to lower towards spoon. Do not allow liquid to spill.",
    "6. Holding a comb and combing hair at back of head.",
  ]
};

const GENERAL_TONUS_INFO = {
  title: "Criteria for Scoring — General Tonus",
  content: [
    "1. Flaccid, limp, no resistance when body parts are handled.",
    "2. Some resistance felt as body parts are moved.",
    "3. Variable, sometimes flaccid, sometimes good tone, sometimes hypertonic.",
    "4. Consistently normal response.",
    "5. Hypertonic 50 percent of the time.",
    "6. Hypertonic at all times.",
  ]
};

const row = (name, label, rowInfo) => ({
  type: "radio-matrix",
  name,
  label,
  options: MAS_OPTIONS,
  showInfoInRow: !!rowInfo,
  ...(rowInfo ? { rowInfo } : {}),
});

const MOTOR_AS_SCHEMA = {
  title: "Motor Assessment Scale",
  fields: [
    row("motor_mas_1", "1. Supine to side lying", SUPINE_TO_SIDE_INFO),
    row("motor_mas_2", "2. Supine to sitting over side of bed", SUPINE_TO_SITTING_INFO),
    row("motor_mas_3", "3. Balanced sitting", BALANCED_SITTING_INFO),
    row("motor_mas_4", "4. Sitting to standing", SITTING_TO_STANDING_INFO),
    row("motor_mas_5", "5. Walking", WALKING_INFO),
    row("motor_mas_6", "6. Upper-arm function", UPPER_ARM_INFO),
    row("motor_mas_7", "7. Advanced hand activities", ADVANCED_HAND_INFO),
    row("motor_mas_8", "8. General tonus", GENERAL_TONUS_INFO),
  ],
};

export default function MotorAssessmentScaleForm({ values, onChange }) {
  return (
    <CommonFormBuilder
      schema={MOTOR_AS_SCHEMA}
      values={values}
      onChange={onChange}
      layout="nested"
    />
  );
}
