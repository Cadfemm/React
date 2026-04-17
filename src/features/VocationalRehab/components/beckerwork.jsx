import React, { useEffect } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

// Helper to calculate domain totals
const calcDomainTotal = (values, prefix, count) => {
  let total = 0;
  for (let i = 1; i <= count; i++) {
    total += Number(values[`${prefix}_${i}`] || 0);
  }
  return total;
};

const buildQ = (name, num, title, desc = "", opts = []) => {
  if (Array.isArray(desc)) {
    opts = desc;
    desc = "";
  }

  return [
  {
    type: "grid-header",
    label: "",
    cols: opts,
    wideLabel: false,
    // Match the RadioMatrixRow's 200px label width when wideLabel is false
    template: "200px repeat(5, 1fr)",
    style: { marginBottom: 2, paddingBottom: 4 }
  },
  {
    type: "radio-matrix",
    name: `${name}_${num}`,
    label: `${num}. ${title}`,
    helper: desc,
    options: [
      { value: 0, label: "0" },
      { value: 1, label: "1" },
      { value: 2, label: "2" },
      { value: 3, label: "3" },
      { value: 4, label: "4" }
    ],
    matrixHeaderLabel: "Score",
    wideLabel: false, // Uses 200px label width in CommonFormBuilder
  }
  ];
};

export default function BeckerWorkAdjustmentProfile({
  values = {},
  onChange,
}) {
  // Auto-calculate totals whenever question values change
  useEffect(() => {
    const ha = calcDomainTotal(values, "ha", 10);
    const ir = calcDomainTotal(values, "ir", 12);
    const co = calcDomainTotal(values, "co", 19);
    const wp = calcDomainTotal(values, "wp", 22);
    const grand = ha + ir + co + wp;

    if (values.ha_total !== ha) onChange("ha_total", ha);
    if (values.ir_total !== ir) onChange("ir_total", ir);
    if (values.co_total !== co) onChange("co_total", co);
    if (values.wp_total !== wp) onChange("wp_total", wp);
    if (values.grand_total !== grand) onChange("grand_total", grand);
  }, [values, onChange]);

  const schema = {
    title: "Becker Work Adjustment Profile",
    fields: [

      // ── DOMAIN 1: WORK HABITS / ATTITUDES (HA) ──
      {
        type: "accordion",
        label: "WORK HABITS/ATTITUDES DOMAIN (HA)",
        children: [
          ...buildQ("ha", 1, "PERSONAL HYGIENE:Bathes, washes, and uses deodorants to maintain body cleanliness", [
            "Neglects body care; Dirty", "Often unclean; Body odor", "Usually clean; Occasional odor",
            "Frequently clean; No body odor", "Regularly clean; No body odor"
          ]),
          ...buildQ("ha", 2, "APPROPRIATE CLOTHING: Wears appropriate dress in the work situations", [
            "Never wears proper clothing", "Often dress is inappropriate", "Usually dress is appropriate",
            "Frequently wears proper dress", "Regularly wears proper dress"
          ]),
          ...buildQ("ha", 3, "PERSONAL APPEARANCE: Maintains a neat appearance and personal grooming", [
            "Ill-groomed; Sloppy", "Often unkempt", "Usually well-groomed",
            "Well-groomed; Neat", "Exceptional personal appearance"
          ]),
          ...buildQ("ha", 4, "PUNCTUALITY: Promptness for reporting to work at starting times in the morning, after lunch, and after break periods for a randomly selected 20-day work period", [
            "Always late: No concept of time", "Often late", "Generally on time",
            "Nearly always on time", "Consistently on time"
          ]),
          ...buildQ("ha", 5, "MOTIVATION: Initiative and interest when performing job assignments", [
            "Indifferent; Needs constant pushing", "Often needs prodding to do assigned work", "Somewhat motivated with assigned work",
            "Considerably motivated with assigned work", "Highly motivated; Seeks additional new work"
          ]),
          ...buildQ("ha", 6, "ATTENDENCE: Frequently of absences for a randomly selected 20-day work period", [
            "Has more than 5 absences", "Has 3-5 absences", "Has 2 absences",
            "Has 1 absences", "Attends regularly; No absences"
          ]),
          ...buildQ("ha", 7, "DEPENDABILITY: Fulfills assignments in a reliable and dependable manner", [
            "Requires close supervision; Unreliable", "Requires frequent checking", "Generally reliable",
            "Seldom needs checking", "Highly reliable; Conscientious"
          ]),
          ...buildQ("ha", 8, "WORK POSTURE: Works with good posture and positioning", [
            "Poor posture; Slouched", "Awkward posture", "Fairly good posture",
            "Good posture", "Excellent posture"
          ]),
          ...buildQ("ha", 9, "EATING HABITS: Demonstrates appropriate use of utensils, acceptable table habits, and polite requests for table items", [
            "Poor eating habits, Untidy", "Often untidy eating habits", "Fairly good manners and eating habits",
            "Good manners and eating habits", "Exceptional manners and eating habits"
          ]),
          ...buildQ("ha", 10, "RESTROOM USE:Demonstrates self-care toileting tasks- uses toilet tissue appropriately, flushes toilet after use, washes and dries hands, closes door", [
            "Consistently neglects most toileting tasks", "Often neglects some toileting tasks", "Occasionally neglects a toileting task",
            "Seldom neglects a toileting task", "Consistently performs all toileting tasks"
          ]),
          { type: "score-box", name: "ha_total", label: "WORK HABITS/ATTITUDES DOMAIN - RAW SCORE TOTAL" },
        ],
      },

      // ── DOMAIN 2: INTERPERSONAL RELATIONS (IR) ──
      {
        type: "accordion",
        label: "INTERPERSONAL RELATIONS DOMAIN (IR)",
        children: [
          ...buildQ("ir", 1, "PERSONAL RELATIONS: Courteous and respectful toward co-workers and supervisors", [
            "Rude; Uses profanity", "Often impolite", "Ordinarily polite",
            "Courteous; Polite", "Exceptional relations"
          ]),
          ...buildQ("ir", 2, "GROUP ACCEPTANCE: Approval and acceptance by co-workers", [
            "Avoided by others; Disliked", "Has few friends; Tolerated by others", "Generally liked by others",
            "Well-liked by most", "Sought after by others"
          ]),
          ...buildQ("ir", 3, "COOPERATION – Supervisors: Attitude toward supervisors as authority figures", [
            "Defiant; Antagonistic", "Often critical of authority", "Ordinarily cooperative",
            "Respectful; Cooperates well", "Highly cooperative"
          ]),
          ...buildQ("ir", 4, "TRUSTWORTHY: Reliable and trusting in relations with others", [
            "Cannot be trusted", "Questionable at times", "Generally trustworthy",
            "Reliable; Dependable", "Consistently trustworthy"
          ]),
          ...buildQ("ir", 5, "COOPERATION – Co-workers: Ability to get along with others", [
            "Troublemaker; Poor relations", "Has difficulty; Quick to argue", "Usually cooperative",
            "Gets along well", "Excellent relations"
          ]),
          ...buildQ("ir", 6, "CONCERN FOR OTHERS: Interest in co-workers welfare", [
            "Self-centered; Not concerned", "Indifferent", "Somewhat concerned",
            "Attentive; Group oriented", "Actively concerned"
          ]),
          ...buildQ("ir", 7, "ACCEPTING CORRECTION: Accepts criticism and correction from supervisors", [
            "Refuses; Poor acceptance", "Indifferent; Apathetic", "Generally accepting",
            "Accepts well", "Actively accepting"
          ]),
          ...buildQ("ir", 8, "EMOTIONAL STABILITY: Reaction to handling problems or frustration in the work situation", [
            "Hyperemotional; May be unresponsive", "Is easily upset", "Usually well-balanced",
            "Good control of feelings", "Exceptionally stable"
          ]),
          ...buildQ("ir", 9, "SOCIAL PARTICIPATION: Interacts with co-workers in social activities", [
            "Does not join in", "Limits participation", "Usually participates",
            "Frequently joins in", "Always join in"
          ]),
          ...buildQ("ir", 10, "HELPING OTHERS: Offers help or work assistance to co-workers without being told", [
            "Offers no help", "Seldom offers help", "Usually offers help",
            "Frequently offers help", "Actively helpful"
          ]),
          ...buildQ("ir", 11, "CHANGES IN ROUTINE: Response to change in work routine or job assignment", [
            "Actively refuses; Becomes upset", "Displays reluctance; Grudgingly accepts", "Accepts change, but needs encouragement",
            "Accepts change", "Willingly accepts change"
          ]),
          ...buildQ("ir", 12, "MAJOR DISRUPTIVE BEHAVIOR: Frequency of major disruptive behavior for a randomly selected work week", [
            "6 or more times per week", "3-5 times per week", "2 times per week",
            "1 time per week", "0 time per week"
          ]),
          { type: "score-box", name: "ir_total", label: "INTERPERSONAL RELATIONS DOMAIN - RAW SCORE TOTAL" },
        ],
      },

      // ── DOMAIN 3: COGNITIVE SKILLS (CO) ──
      {
        type: "accordion",
        label: "COGNITIVE SKILLS DOMAIN (CO)",
        children: [
          ...buildQ("co", 1, "NUMBERS: Ability to add, subtract, multiply, and divide correctly", [
            "No concept of numbers", "Does simple addition", "Simple addition and subtraction",
            "Adds, subtracts, and multiplies", "Uses all number skills"
          ]),
          ...buildQ("co", 2, "COMMUNICATION MODE: Uses gestures, signs, or verbal expression to communicate", [
            "Uses non-verbal language", "Some verbal and manual", "Generally verbal",
            "Uses verbal expression well", "Excellent verbal use"
          ]),
          ...buildQ("co", 3, "MEMORY: Remembers orally given information or work instructions", [
            "Poor memory; Limited recall", "Often forgets simple information", "Usually recalls procedures and information",
            "Good recall of information", "Excellent recall for details"
          ]),
          ...buildQ("co", 4, "READING LEVEL: Reads with comprehension or understanding", [
            "Non-reader", "Reads various survival signs", "Reads grade levels 3-5",
            "Reads grade levels 6-8", "Reads above 8th grade"
          ]),
          ...buildQ("co", 5, "TIME CONCEPT: Knows the meaning of the concepts – yesterday, tomorrow, day after tomorrow, and days of the week", [
            "No understanding of time concepts", "Understands one out of four concepts", "Understands two out of four concepts",
            "Understands three out of four concepts", "Understands all time concepts"
          ]),
          ...buildQ("co", 6, "WRITING: Ability to communicate in print or cursive writing", [
            "No attempt to write or print", "Writes or prints own name", "Writes or prints up to two words",
            "Writes or prints simple messages", "Writes letters with correct grammar"
          ]),
          ...buildQ("co", 7, "TELLING TIME: Tells time correctly on a standard face clock or watch", [
            "Cannot tell time", "Tells time by the hour", "Tells time to the half hour",
            "Tells time by 5-minute intervals", "Tells time to the minutes"
          ]),
          ...buildQ("co", 8, "TELEPHONE: Receives and makes phone calls and uses telephone white and yellow pages", [
            "Answers phone; Takes no messages", "Converses; Takes simple messages", "Uses phone to call familiar numbers",
            "Uses pay telephone", "Gets information from directories"
          ]),
          ...buildQ("co", 9, "MEASURING: Ability to measure items of different lengths accurately", [
            "Grossly limited", "Measures to the inch", "Measures to the 1/2 inch",
            "Measures to the 1/4 inch", "Measures to the 1/16 inch"
          ]),
          ...buildQ("co", 10, "MANAGING MONEY: Banking, budgeting, and daily money handling tasks", [
            "Cannot manage money", "Manages with close supervision", "Manages with occasional supervision",
            "Manages with minimal supervision", "Manages own money"
          ]),
          ...buildQ("co", 11, "DISCRIMINATION SKILLS: Ability to match or sort items by size", [
            "Grossly limited", "Frequently makes errors", "Makes few errors",
            "Nearly perfect discrimination", "Perfect discrimination"
          ]),
          ...buildQ("co", 12, "COMMUNICATING BASIC NEEDS: Informs supervisor of thirst, hunger, toilet, illness, or other basic needs", [
            "Does not make needs known", "Seldom describes needs", "Generally makes needs known",
            "Often describes needs", "Regularly states needs"
          ]),
          ...buildQ("co", 13, "FOLLOWING VERBAL INSTRUCTIONS: Ability to carry out work instructions", [
            "Becomes confused; Unable to follow", "Has difficulty with simple instructions", "Follows most instructions fairly well",
            "Follows most instructions well", "Skillfully follows all instructions"
          ]),
          ...buildQ("co", 14, "KNOWLEDGE OF WORK: Understands the current job and methods or materials used", [
            "Almost none; Inferior", "Somewhat limited", "Generally knowledgeable",
            "Good understanding of most phases", "Excellent understanding of all phases"
          ]),
          ...buildQ("co", 15, "TRANSFER OF SKILLS: Ability to transfer skills acquired on one task to a new task", [
            "Unable to transfer with help", "Transfers with much help", "Transfers with moderate help",
            "Transfers with little help", "Actively transfers skills"
          ]),
          ...buildQ("co", 16, "SOLVING PROBLEMS: Solves own problems with job tasks or co-workers", [
            "Almost never", "Seldom finds solutions", "Usually makes progress",
            "Solves most problems", "Solves all problems"
          ]),
          ...buildQ("co", 17, "LEARNING JOB TASKS: Ability to learn job assignments with help", [
            "Unable to learn", "Slow in learning", "Moderate learner",
            "Fast learner", "Very rapid learner"
          ]),
          ...buildQ("co", 18, "JUDGEMENT: Ability to make work-related decisions", [
            "Disorganized; Consistently makes incorrect decisions", "Somewhat limited; Frequently makes incorrect decisions", "Generally logical; Usually makes correct decisions",
            "Plans well; Frequently makes correct decisions", "Resourceful; Consistently makes correct decisions"
          ]),
          ...buildQ("co", 19, "INDEPENDENT TRAVEL: Uses public or private conveyance independently to work", [
            "Cannot travel independently", "Uses public transit between learned sites", "Uses public transit between unfamiliar sites",
            "Uses personal transportation", "Makes long distance trips"
          ]),
          { type: "score-box", name: "co_total", label: "COGNITIVE SKILLS DOMAIN - RAW SCORE TOTAL" },
        ],
      },

      // ── DOMAIN 4: WORK PERFORMANCE SKILLS (WP) ──
      {
        type: "accordion",
        label: "WORK PERFORMANCE SKILLS DOMAIN (WP)",
        children: [
          ...buildQ("wp", 1, "CORRECTING ERRORS: Controls own quality of work", [
            "Almost never", "Makes few corrections", "Corrects most errors",
            "Corrects all but a few", "Corrects all errors"
          ]),
          ...buildQ("wp", 2, "QUALITY OF WORK: Maintains production standards of neatness and accuracy of tasks or product produced", [
            "Consistently inferior work", "Frequently below requirements", "Meets requirements",
            "Frequently above requirements", "Regularly above requirements"
          ]),
          ...buildQ("wp", 3, "INITIATING TASK: Self-initiates daily work routine", [
            "Almost never", "Often needs to be shown", "Usually initiates",
            "Often initiates; Self-reliant", "Always initiates; Highly self-directed"
          ]),
          ...buildQ("wp", 4, "QUANTITY OF WORK: Maintains production rates of volume or amount of acceptable work completed", [
            "Limited output; Below 25% of norm", "Low output; 25-49% of norm", "Moderate output; 50-75% of norm",
            "High output; 76-90% of norm", "Extended output; Over 90% of norm"
          ]),
          ...buildQ("wp", 5, "ASKING FOR MATERIALS: Makes requests for needed materials or supplies to complete assignment", [
            "Does not ask; Sits idle", "Seldom asks; Wastes time", "Ordinarily asks",
            "Frequently asks", "Actively seeks needed materials"
          ]),
          ...buildQ("wp", 6, "DEPENDABILITY: Fulfills assignments in a reliable and dependable manner", [
            "Unreliable; Requires close supervision", "Requires frequent checking", "Generally reliable",
            "Seldom needs checking", "Highly reliable; Conscientious"
          ]),
          ...buildQ("wp", 7, "INDEPENDENT FUNCTIONING: Amount of supervision required after initial instruction period", [
            "Requires constant supervision", "Often requires assistance", "Occasionally requires assistance",
            "Seldom requires assistance", "Independent; Requires no assistance"
          ]),
          ...buildQ("wp", 8, "REQUEST HELP WHEN NEEDED: Seeks necessary help or assistance from supervisors in the work area", [
            "Does not seek needed help", "Seldom seeks needed help", "Usually seeks needed help",
            "Frequently seeks needed help", "Always seeks needed help"
          ]),
          ...buildQ("wp", 9, "TOOL RETURN: Returns tools or supplies to appropriate location after use", [
            "Requires constant reminding", "Requires frequent reminding", "Generally returns items",
            "Nearly always returns items", "Regularly returns items"
          ]),
          ...buildQ("wp", 10, "ATTENDING TO TASK: Amount of effort applied to the job assignment", [
            "Inattentive; Distractable", "Often wastes time", "Generally keeps busy",
            "Steady worker", "Extremely industrious"
          ]),
          ...buildQ("wp", 11, "MAINTAINING WORK AREA: Cleans up work area during and after production", [
            "Does not clean up", "Does some cleaning", "Does a fair job",
            "Does a good job", "Does a thorough cleaning"
          ]),
          ...buildQ("wp", 12, "TIME CLOCK: Clocks in and out correctly when arriving in the morning and leaving after work", [
            "Consistently makes errors", "Oftens makes errors", "Occasionally makes errors",
            "Rarely makes errors", "Makes no errors"
          ]),
          ...buildQ("wp", 13, "WORK STEADINESS: The amount of time spent in steady or productive work during a randomly selected work period", [
            "Minimal; Less than 10 minutes", "Low Moderate; 11-30 minutes", "Moderate; 31-60 minutes",
            "High Moderate; 61-120 minutes", "Extended; More than 2 hrs."
          ]),
          ...buildQ("wp", 14, "CARE OF EQUIPMENT: Uses tools and equipment properly on job assignment", [
            "Breaks equipment; Careless", "Often misuses equipment", "Occasionally misuses equipment",
            "Rarely misuses equipment", "Consistent proper use"
          ]),
          ...buildQ("wp", 15, "SAFETY PRACTICE: Compliance with safety rules and regulations to minimize accidents", [
            "Does not comply", "Seldom complies; Takes chances", "Usually careful; Takes few chances",
            "Careful worker; Rarely takes chances", "Complies with all regulations"
          ]),
          ...buildQ("wp", 16, "COMMUNICATING PROBLEMS: Reports problems in the work area to supervisors", [
            "Rarely or never reports problems; 0-24% of the time", "Seldom reports problems; 25-49% of the time", "Usually reports problems; 50-75% of the time",
            "Often reports problems; 76-89% of the time", "Always reports problems; 90-100% of the time"
          ]),
          ...buildQ("wp", 17, "PHYSICAL STAMINA: Physical capacity to maintain a fairly consistent work pace for a normal work day", [
            "Minimal endurance and energy", "Tires easily; Often needs rest", "Fairly good endurance",
            "Good endurance; Rarely needs to rest", "Exceptionally vigor and energy"
          ]),
          ...buildQ("wp", 18, "FINE MOTOR SKILL: Finger manipulation of small parts or small products assembling", [
            "Poor finger dexterity", "Has difficulty; Slow", "Fairly good dexterity",
            "Good precision skill", "Excellent precision skill"
          ]),
          ...buildQ("wp", 19, "MANUAL SKILL: Working with the hand or hands in stapling, sorting, or machine operating and other manual tasks", [
            "Limited manual skill", "Clumsy; Very slow", "Generally good manual skill",
            "Good manual skill", "Excellent manual skill"
          ]),
          ...buildQ("wp", 20, "GROSS MOTOR SKILL: Coordination of arms and legs in tasks requiring lifting, carrying, pushing, or pulling", [
            "Poor motor coordination", "Awkward; Unsteady", "Fairly good coordination",
            "Good motor coordination", "Exceptional motor coordination"
          ]),
          ...buildQ("wp", 21, "WORK STATION: Remains in the immediate work area and does not wander", [
            "Wanders constantly", "Often wanders from work area", "Occasionally may leave work area",
            "Seldom leaves work station", "Regularly at work station"
          ]),
          ...buildQ("wp", 22, "PHYSICAL STRENGTH: Ability to lift, carry, push, or pull objects of various weights", [
            "Sedentary work; Lift to 10lbs.", "Light work; Lift to 20lbs.", "Medium work; Lift to 50lbs.",
            "Heavy work; Lift to 75lbs.", "Very heavy work; Lift to over 75lbs."
          ]),
          { type: "score-box", name: "wp_total", label: "WORK PERFORMANCE SKILLS DOMAIN - RAW SCORE TOTAL" },
        ],
      },

      // ── FINAL RESULTS ──
      {
  type: "accordion",
  label: "INDIVIDUAL PROFILE FORM",
  children: [
    {
      type: "score-box",
      name: "grand_total",
      label: "TOTAL PROFILE SCORE",
    },

    {
      type: "custom",
      render: ({ values, onChange }) => (
        <>
          <label style={{ fontWeight: 600, marginBottom: 8, display: "block" }}>
            Insert Result Sheet
          </label>

          <CommonFormBuilder
            schema={{
              fields: [
                {
                  type: "file-upload-modal",
                  name: "result_sheet",
                },
              ],
            }}
            values={values}
            onChange={onChange}
            layout="nested"
          />
        </>
      ),
    },

    {
      type: "custom",
      render: ({ values, onChange }) => (
        <>
          <label style={{ fontWeight: 600, marginBottom: 8, display: "block" }}>
            Interpretation of Results
          </label>

          <textarea
            value={values.interpretation || ""}
            onChange={(e) => onChange("interpretation", e.target.value)}
            style={{
              width: "100%",
              minHeight: "140px",
              borderRadius: "8px",
              border: "1px solid #d1d5db",
              padding: "10px",
            }}
          />
        </>
      ),
    },
  ],
},
    ],
  };

  return (
    <CommonFormBuilder
      schema={schema}
      values={values}
      onChange={onChange}
      layout="nested"
    />
  );
}