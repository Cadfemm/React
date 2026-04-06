import React from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

const ffqTableGroups = [
  { label: "Never (0 time/week)", columns: [{ key: "" }] },
  { label: "Seldom (1-2 times/week)", columns: [{ key: "" }] },
  { label: "Occasionally (3-4 times/week)", columns: [{ key: "" }] },
  { label: "Frequent (>5 times/week)", columns: [{ key: "" }] },
  { label: "Remarks (free text)", columns: [{ key: "" }] },
];

const ffqRow = (value, label) => ({
  value,
  label,
  columns: [
    { type: "radio", value: "never" },
    { type: "radio", value: "seldom" },
    { type: "radio", value: "occasionally" },
    { type: "radio", value: "frequent" },
    {},
  ],
});

const FFQ_SCHEMA = {
  title: "Food Frequency Questionnaire (FFQ)",
  fields: [
    {
      type: "info-text",
      text: "Frequency guide: Never (0 time/week), Seldom (1-2 times/week), Occasionally (3-4 times/week), Frequent (>5 times/week).",
    },
    {
      type: "accordion",
      name: "ffq_diabetes_section",
      label: "Diabetes",
      defaultOpen: true,
      children: [
        {
          type: "refraction-12col",
          name: "ffq_diabetes_table",
          cornerLabel: "Food checklist",
          cornerLikeGroupHeader: true,
          showColumnHeaders: true,
          groups: ffqTableGroups,
          rows: [
            ffqRow("sweetened_beverages", "Sweetened beverages (e.g. soft drinks, fruit juice, energy drinks, etc.)"),
            ffqRow("sweets_desserts", "Sweets & desserts (e.g. candy, cakes, ice-cream, chocolate, etc.)"),
            ffqRow("refined_sugar", "Refined sugar (e.g. honey, jam, syrups, etc.)"),
            ffqRow("pastry_cookies", "Pastry & cookies (e.g. seri muka, kuih lapis, doughnut, etc.)"),
            ffqRow("hidden_sugar_foods", "Hidden sugar foods (e.g. ketchup, sauce, flavored yogurt, etc.)"),
            ffqRow("others", "Others"),
          ],
        },
      ],
    },
    {
      type: "accordion",
      name: "ffq_hypertension_section",
      label: "Hypertension",
      defaultOpen: false,
      children: [
        {
          type: "refraction-12col",
          name: "ffq_hypertension_table",
          cornerLabel: "Food checklist",
          cornerLikeGroupHeader: true,
          showColumnHeaders: true,
          groups: ffqTableGroups,
          rows: [
            ffqRow("processed_packaged_foods", "Processed & packaged foods (e.g. chips, frozen foods, instant noodles, etc.)"),
            ffqRow("fast_foods", "Fast foods (e.g. pizza, burger, french fries, etc.)"),
            ffqRow("canned_preserved_foods", "Canned & preserved foods (e.g. canned vegetables, fruits, meat, fish, etc.)"),
            ffqRow("sauce_condiments_pickles", "Sauce, condiments & pickles (e.g. soy sauce, ketchup, fish or oyster sauce, etc.)"),
            ffqRow("salted_snacks", "Salted snacks (e.g. salted nuts, salted peanuts)"),
            ffqRow("dairy_animal_products", "Dairy & animal products (e.g. cheese, salted butter, etc.)"),
            ffqRow("others", "Others"),
          ],
        },
      ],
    },
    {
      type: "accordion",
      name: "ffq_hypercholesterolemia_section",
      label: "Hypercholesterolemia",
      defaultOpen: false,
      children: [
        {
          type: "refraction-12col",
          name: "ffq_hypercholesterolemia_table",
          cornerLabel: "Food checklist",
          cornerLikeGroupHeader: true,
          showColumnHeaders: true,
          groups: ffqTableGroups,
          rows: [
            ffqRow("fried_foods", "Fried foods (e.g. banana fritter, fried noodles, etc.)"),
            ffqRow("fast_foods_junk", "Fast foods & junk foods (e.g. burger, pizza, french fries, etc.)"),
            ffqRow("internal_organs", "Internal organs (e.g. liver, brain, kidney, etc.)"),
            ffqRow("fatty_processed_meats", "Fatty & processed meats (e.g. red meat, sausage, bacon, ham, etc.)"),
            ffqRow("full_fat_dairy", "Full-fat dairy (e.g. full cream milk, cheese, condensed milk, etc.)"),
            ffqRow("baked_packaged_foods", "Baked & packaged foods (e.g. cake, pastries, biscuits, etc.)"),
            ffqRow("others", "Others"),
          ],
        },
      ],
    },
    {
      type: "accordion",
      name: "ffq_gout_section",
      label: "Gout (High Purine Foods)",
      defaultOpen: false,
      children: [
        {
          type: "refraction-12col",
          name: "ffq_gout_table",
          cornerLabel: "Food checklist",
          cornerLikeGroupHeader: true,
          showColumnHeaders: true,
          groups: ffqTableGroups,
          rows: [
            ffqRow("internal_organs", "Internal organs (e.g. liver, brain, kidney, etc.)"),
            ffqRow("seafoods", "Seafoods (e.g. sardines, anchovies, mackerel, tuna, etc.)"),
            ffqRow("red_processed_meats", "Red & processed meats (e.g. mutton, beef, pork, sausage, etc.)"),
            ffqRow("alcohol", "Alcohol (e.g. beer, home brewed, etc.)"),
            ffqRow("others", "Others (e.g. yeast, yeast extract, etc.)"),
          ],
        },
      ],
    },
  ],
};

export default function FFQAssessment({ values, onChange }) {
  return (
    <CommonFormBuilder
      schema={FFQ_SCHEMA}
      values={values}
      onChange={onChange}
      submitted={false}
      layout="nested"
    />
  );
}

