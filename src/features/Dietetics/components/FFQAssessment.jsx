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
              ffqRow("internal_organs", "Internal Organs (e.g. Liver, brain, kidney etc)"),
              ffqRow("seafoods", "Seafoods (e.g. Sardines, anchovies, mackerel, tuna etc)"),
              ffqRow("red_processed_meats", "Red & Processed Meats (e.g. Mutton, beef, pork, sausage etc)"),
              ffqRow("alcohol", "Alcohol (e.g. Beer, home brewed etc)"),
              ffqRow("sweets_desserts", "Sweets & Desserts (e.g. Candy, cakes, ice-cream, Chocolate etc)"),
              ffqRow("sugary_drinks", "Sugary drinks (e.g. cordial, carbonated drink, flavoured drink, bubble tea etc)"),
              ffqRow("others", "Others (e.g. Yeast, yeast extract etc)"),
            ],
        },
      ],
    },
    {
      type: "accordion",
      name: "ffq_overweight_obesity_section",
      label: "Overweight/Obesity",
      defaultOpen: false,
      children: [
        {
          type: "refraction-12col",
          name: "ffq_overweight_obesity_table",
          cornerLabel: "Food checklist",
          cornerLikeGroupHeader: true,
          showColumnHeaders: true,
          groups: ffqTableGroups,
          rows: [
            ffqRow("fast_foods", "Fast Foods (e.g. Pizza, burger, french fries etc)"),
            ffqRow("processed_foods", "Processed Foods (e.g. Nuggets, Sausage, Hashbrown etc)"),
            ffqRow("chips_snacks", "Chips/snacks"),
            ffqRow("sweets_chocolate", "Sweets/chocolate (e.g. candies, chocolate bar, ice cream etc)"),
            ffqRow("sugary_drinks", "Sugary drinks (e.g. cordial, carbonated drink, flavoured drink, bubble tea etc)"),
            ffqRow("creamy_cheese_dishes", "Creamy/cheese-based dishes (e.g. carbonara, cheese cake, buttermilk, naan etc)"),
            ffqRow("others", "Others"),
          ],
        },
      ],
    },
    {
      type: "accordion",
      name: "ffq_cp_feeding_section",
      label: "Cerebral Palsy / Feeding Difficulty",
      defaultOpen: false,
      children: [
        {
          type: "refraction-12col",
          name: "ffq_cp_feeding_table",
          cornerLabel: "Food checklist",
          cornerLikeGroupHeader: true,
          showColumnHeaders: true,
          groups: ffqTableGroups,
          rows: [
            ffqRow("thin_liquids", "Thin liquids (e.g. water, fruit juice without pulp, thin soup broth etc)"),
            ffqRow("smooth_purees", "Smooth purees (e.g. blended porridge - no lumps, smooth yogurt, pureed sweet potato, commercial stage 1 baby jar etc)"),
            ffqRow("soft_bite_sized", "Soft & Bite-Sized (e.g. steamed fish (deboned), soft tofu, moist rice, riped banana, steamed carrots/pumpkin, boiled potatoes etc)"),
            ffqRow("mixed_textures", "Mixed Textures (e.g. soups with bits - mee soto, macaroni soup, oranges/watermelon etc)"),
            ffqRow("dry_crumbly", "Dry & Crumbly (e.g. biscuits/crackers, crisps/chips, karipap etc)"),
            ffqRow("others", "Others"),
          ],
        },
      ],
    },

    {
      type: "accordion",
      name: "ffq_allergy_section",
      label: "Food Allergies / Intolerance  (Paediatric Allergy)",
      defaultOpen: false,
      children: [
        {
          type: "refraction-12col",
          name: "ffq_allergy_table",
          cornerLabel: "Food checklist",
          cornerLikeGroupHeader: true,
          showColumnHeaders: true,
          groups: ffqTableGroups,
          rows: [
           ffqRow("milk_dairy", "Milk & dairy products (e.g. milk, cheese, yogurt, ice cream, condensed milk etc)"),
           ffqRow("egg_foods", "Egg-containing foods (e.g. cake, custard, mayonnaise, omelette, egg tarts etc)"),
           ffqRow("nuts_legumes", "Nuts & legumes (e.g. peanut butter, peanut snacks, almond, cashew, soy beans, tofu etc)"),
           ffqRow("wheat_gluten", "Wheat & gluten-containing foods (e.g. bread, noodles, biscuits, kuih, roti canai, pastries etc)"),
           ffqRow("seafood", "Seafood (e.g. fish, shrimp, crab products, shellfish etc)"),
           ffqRow("others", "Others"),
          ],
        },
      ],
    },

    {
      type: "accordion",
      name: "ffq_dental_section",
      label: "Dental Caries / Oral Health Issues",
      defaultOpen: false,
      children: [
        {
          type: "refraction-12col",
          name: "ffq_dental_table",
          cornerLabel: "Food checklist",
          cornerLikeGroupHeader: true,
          showColumnHeaders: true,
          groups: ffqTableGroups,
          rows: [
            ffqRow("sticky_sweets", "Sticky sweets (e.g. gummy candy, toffee, caramel)"),
            ffqRow("frequent_snacking", "Frequent snacking on sugary foods"),
            ffqRow("sugary_sipping", "Sugary drinks sipping throughout the day"),
            ffqRow("sweetened_milk", "Sweetened milk drinks (e.g. chocolate milk, flavored milk)"),
            ffqRow("refined_starch", "Refined starch snacks (e.g. white bread, crackers)"),
            ffqRow("sweet_spreads", "Sweet spreads (e.g. jam, kaya, condensed milk)"),
            ffqRow("sticky_dried_fruits", "Sticky dried fruits (e.g. raisins, dried mango)"),
            ffqRow("others", "Others"),
          ],
        },
      ],
    },

    {
      type: "accordion",
      name: "ffq_gi_section",
      label: "Diarrhea / GI Sensitivity",
      defaultOpen: false,
      children: [
        {
          type: "refraction-12col",
          name: "ffq_gi_table",
          cornerLabel: "Food checklist",
          cornerLikeGroupHeader: true,
          showColumnHeaders: true,
          groups: ffqTableGroups,
          rows: [
            ffqRow("high_sugar_foods", "High sugar foods (e.g. sweet drinks, sweets)"),
            ffqRow("fried_foods", "High fat fried foods"),
            ffqRow("spicy_foods", "Spicy foods (e.g. chili-based dishes)"),
            ffqRow("artificial_sweeteners", "Artificial sweeteners (e.g. sugar-free candy, diet drinks)"),
            ffqRow("caffeine_drinks", "Caffeine-containing drinks (e.g. tea, chocolate drinks)"),
            ffqRow("cold_foods", "Very cold foods (e.g. ice drinks, ice cream)"),
            ffqRow("lactose_foods", "Lactose-containing foods (e.g. milk, soft cheese)"),
            ffqRow("gas_foods", "Gas-producing foods (e.g. beans, cabbage, legumes)"),
            ffqRow("others", "Others"),
          ],
        },
      ],
    },

    {
      type: "accordion",
      name: "ffq_ftt_section",
      label: "Failure to Thrive (FTT)",
      defaultOpen: false,
      children: [
        {
          type: "refraction-12col",
          name: "ffq_ftt_table",
          cornerLabel: "Food checklist",
          cornerLikeGroupHeader: true,
          showColumnHeaders: true,
          groups: ffqTableGroups,
          rows: [
            ffqRow("milk_formula", "Milk/formula (e.g. Breastfeeding, Formula Milk, Dairy Milk etc)"),
            ffqRow("protein_intake", "Protein Intake (e.g. Egg, chicken, fish, tempeh, tofu etc)"),
            ffqRow("energy_dense", "Energy Densed Food/Snack (e.g. Rice, noodle, cooking oil, butter, cheese, peanut butter, almond butter, yogurt, cream-based porridge etc)"),
            ffqRow("fiber", "Fiber (e.g. fruits & vegetables)"),
            ffqRow("beverages", "Beverages (e.g. juice, plain water, sugary drinks, malted drink etc)"),
            ffqRow("foods_skipped", "Foods often skipped (e.g. breakfast foods, school snacks)"),
            ffqRow("picky_eating", "Picky-eating restricted foods (e.g. very limited food variety)"),
            ffqRow("foods_diluted", "Foods diluted with water (e.g. thin porridge, watery milk)"),
            ffqRow("low_protein", "Low-protein foods (e.g. plain biscuits, plain rice only meals)"),
            ffqRow("frequent_snacks", "Frequent snacks (e.g. biscuits, bread, kuih, cakes, crackers, nuggets, fries, maggi etc)"),
            ffqRow("others", "Others"),
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

