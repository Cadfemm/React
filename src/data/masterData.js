export const ICD_LIST = [
  "Stroke Comprehensive",
  "Traumatic Brain Injury Comprehensive",
  "Spinal Cord Injury Long-Term Comprehensive",
  "Multiple Sclerosis Comprehensive",
  "Musculoskeletal post-Acute Comprehensive",
  "Low Back Pain Comprehensive",
  "Osteoarthritis Comprehensive",
  "Cardiopulmonary post-acute Comprehensive",
  "Diabetes Mellitus Comprehensive",
  "Children / Youth with Cerebral Palsy Comprehensive",
  "Vertigo Comprehensive",
  "Hearing Loss Comprehensive",
  "Vocational Rehabilitation Comprehensive",
  "Hand Condition Comprehensive",
  "Depression Comprehensive",
  "Bipolar Disorders Comprehensive"
];

export const GROUPED_ICD_TO_DEPT = {
  "Stroke": ["Physio Therapy", "Occupational Therapy", "Speech & Language Therapy", "Psychology","Doctor","Dietetics","Optometry"],
  "Brain Injury": ["Physio Therapy", "Speech & Language Therapy", "Psychology"],
  "Spinal Cord Injury": ["Physio Therapy", "Nursing / Medical Assistant"],
  "Multiple Sclerosis": ["Physio Therapy", "Occupational Therapy"],
  "Musculoskeletal post-Acute Comprehensive": ["Physio Therapy"],
  "Low Back Pain Comprehensive": ["Physio Therapy"],
  "Osteoarthritis Comprehensive": ["Physio Therapy"],
  "Cardiopulmonary Comprehensive": ["Physio Therapy","Psychology", "Dietetics"],
  "Diabetes": ["Dietetics", "Physio Therapy"],
  "Cerebral Palsy": ["Occupational Therapy", "Physio Therapy"],
  "Vertigo Comprehensive": ["Physio Therapy","Psychology"],
  "Hearing Loss Comprehensive": ["Audiology"],
  "Vocational Rehabilitation Comprehensive": ["Vocational+Work Rehab"],
  "Hand Condition Comprehensive": ["Occupational Therapy", "Physio Therapy"],
  "Depression": ["Psychology"],
  "Bipolar Disorders": ["Psychology"]
};

// export const ICD_TO_DEPT = {
//   "Stroke Comprehensive": ["Physio Therapy", "Occupational Therapy", "Speech & Language Therapy", "Psychology", "Dietetics"],
//   "Traumatic Brain Injury Comprehensive": ["Physio Therapy", "Speech & Language Therapy", "Psychology"],
//   "Spinal Cord Injury Long-Term Comprehensive": ["Physio Therapy", "Nursing / Medical Assistant"],
//   "Multiple Sclerosis Comprehensive": ["Physio Therapy", "Occupational Therapy"],
//   "Musculoskeletal post-Acute Comprehensive": ["Physio Therapy"],
//   "Low Back Pain Comprehensive": ["Physio Therapy"],
//   "Osteoarthritis Comprehensive": ["Physio Therapy"],
//   "Cardiopulmonary post-acute Comprehensive": ["Physio Therapy","Psychology", "Dietetics"],
//   "Diabetes Mellitus Comprehensive": ["Dietetics", "Physio Therapy"],
//   "Children / Youth with Cerebral Palsy Comprehensive": ["Occupational Therapy", "Physio Therapy"],
//   "Vertigo Comprehensive": ["Physio Therapy","Psychology"],
//   "Hearing Loss Comprehensive": ["Audiology"],
//   "Vocational Rehabilitation Comprehensive": ["Vocational+Work Rehab"],
//   "Hand Condition Comprehensive": ["Occupational Therapy", "Physio Therapy"],
//   "Depression Comprehensive": ["Psychology"],
//   "Bipolar Disorders Comprehensive": ["Psychology"]
// };

 export const icdData =  {
  "Cardiopulmonary post-acute Comprehensive": {
    "Dietetics": {
      "ICF": {
        "b440 – Respiration Functions":
      {       
      "ICHI": [
        "KTC.AM.ZZ – Observation of swallowing\nSMG.AM.ZZ – Observation of drinking\nSMF.AM.ZZ – Observation of eating\nVEA.AM.ZZ – Observation of eating behaviors\nSDG.AM.ZZ – Observation of carrying out daily routine\nKTN.PM.ZZ / KTN.PP.ZZ – Weight maintenance education/counselling\nSMF.PM.ZZ – Education about eating\nSOA.PM.ZZ / SOA.PP.ZZ – Education/counselling about preparing meals\nVEA.PM.ZZ / VEA.PP.ZZ – Education/counselling about eating behaviours\nETB.PM.ZZ / ETB.PP.ZZ – Education/counselling about metabolic functions\nVEB.PM.ZZ – Education about physical activity behaviours\nUAB.TI.ZZ – Prescription of food\nVEA.TI.ZZ – Prescription for eating behaviours\nUAA.VB.ZZ – Awareness regarding substances for consumption\nVEA.VB.ZZ – Awareness to influence eating behaviours"
      ],
"Assessments": {
   "subjective":[ "NRS", "PG-SGA-Metric-version","MST" ],
   "objective":[ "Growth Chart", "BIA" ]
},
"Relations": {
   "NRS": ["PZA.AB.ZZ - whole body measurement", 
"SMF. AN.ZZ - interview about eating",
"ATI.AN.ZZ - Interview in relation to energy and drive functions", 
"PZA.DA.ZZ - Adninistering nutritional requirments"],
   "PG-SGA-Metric-version": ["PZA.AB.ZZ - whole body measurement",
"SMF.AN.ZZ - Interview in relation to eating", 
"VEA.AN.ZZ Interview in relation to eating behaviours",

"ATI.AN.ZZ Interview in relation to energy and drive functions", 
"PZA.AE.AH Physical examination of whole body, UAB.PM.ZZ Education about food"],
   "MST": ["PZA.AB.ZZ - Whole-body measurement",

"PZA.DA.ZZ - Administering nutritional requirements",
"UAB.DA.ZZ - Food modification",
"UAB.PM.ZZ - Education about food",
"KT2.PP.ZZ - Counselling for digestive system functions"],
   "test2": []
}
    },
     "b445 – Respiratory muscle Functions":{
"ICHI": [
        "KTC.AM.ZZ – Observation of swallowing\nSMF.AM.ZZ – Observation of eating\nSMG.AM.ZZ – Observation of drinking\nKTB.AM.ZZ – Observation of ingestion\nSDG.AM.ZZ – Observation of carrying out daily routine\nSOA.AM.ZZ – Observation of preparing meals\nVEA.AM.ZZ – Observation of eating behaviours\nKTC.AN.ZZ – Interview in relation to swallowing\nSMF.AN.ZZ – Interview in relation to eating\nSMG.AN.ZZ – Interview in relation to drinking\nSDG.AN.ZZ – Interview on daily routine\nATI.AN.ZZ – Interview about energy & drive\nITA.AN.ZZ – Interview about blood pressure (only if relevant to postural breathlessness)\nPZA.DA.ZZ – Administering nutritional requirements\nUAB.DA.ZZ – Food modification (e.g., texture changes for safe swallowing)\nSMF.PM.ZZ – Education about eating\nSOA.PM.ZZ – Education about preparing meals\nKTN.PM.ZZ – Education about weight maintenance\nUAB.PM.ZZ – Education about food\nVEA.PM.ZZ – Education about eating behaviours\nETB.PM.ZZ – Education about metabolic impacts of respiratory effort\nVEB.PM.ZZ – Education about physical activity around meals\nSOA.PP.ZZ – Counselling about preparing meals\nVEA.PP.ZZ – Counselling on eating behaviours\nKTN.PP.ZZ – Weight management counselling\nETB.PP.ZZ – Counselling about metabolic impacts of respiratory effort\nUAB.TI.ZZ – Prescription of food\nVEA.TI.ZZ – Prescription for eating behaviours\nUAA.TI.ZZ – Prescription of substances for consumption (e.g., supplements)\nVEA.VB.ZZ – Awareness on eating behaviours\nUAA.VB.ZZ – Awareness about substances for consumption\nVEA.RD.ZZ – Providing goods supporting eating behaviours\nVEA.TB.ZZ – Planning in relation to eating behaviours\nVEA.TM.ZZ – Environment modification to support safe breathing during meals"
      ],
"Assessments": {
   "subjective":[ "test", "test","MST" ],
   "objective":[ "test", "test2" ]
},
"Relations": {
   "NRS": ["PZA.AB.ZZ - whole body measurement", 
"SMF. AN.ZZ - interview about eating",
"ATI.AN.ZZ - Interview in relation to energy and drive functions", 
"PZA.DA.ZZ - Adninistering nutritional requirments"],
   "PG-SGA-Metric-version": ["PZA.AB.ZZ - whole body measurement",
"SMF.AN.ZZ - Interview in relation to eating", 
"VEA.AN.ZZ Interview in relation to eating behaviours",
"KTC.AN.ZZ Interview in relation to swallowing",
"ATI.AN.ZZ Interview in relation to energy and drive functions", 
"PZA.AE.AH Physical examination of whole body, UAB.PM.ZZ Education about food" ],
   "MST": ["PZA.AB.ZZ - Whole-body measurement",
"PZA.DA.ZZ - Administering nutritional requirements",
"UAB.DA.ZZ - Food modification",
"UAB.PM.ZZ - Education about food",
"KT2.PP.ZZ - Counselling for digestive system functions"],
   "test2": []
}
     },
    "e1109 - Products or substances for personal consumption, unspecified":{},
    "b530 - Weight maintenance functions":{},
    "b4308 - Other specified haematological system functions":{}
  },
    "Doctor": {
      "ICF": [
        "b440 – Respiration Functions"
      ],
      "ICHI": [
        "JTB.AA.ZZ Assessment of respiration function\nJTB.AB.ZZ Measurement of respiration function\nJTB.AC.ZZ Test of respiration function\nJTB.AI.ZZ Monitoring of respiration function\nJTB.AM.ZZ Observation of respiration function\nJTB.AN.ZZ Interview in relation to respiration function\nJTB.DE.AC Artificial ventilation\nJTB.JB.ZZ Postural drainage\nJTB.PG.ZZ Assisting and leading exercise for respiration function\nJTB.PH.ZZ Training of respiration function\nJTB.PM.ZZ Education about respiration function\nJTB.PN.ZZ Advising about respiration function\nJTB.ZY.ZY Other interventions on respiration function, not elsewhere classified\nJTC.AA.ZZ Assessment of respiratory muscle function\nJTC.AB.ZZ Respiratory pressure measurement\nJTC.AC.ZZ Test of respiratory muscle function\nJTC.PG.ZZ Assisting and leading exercise for respiratory muscles\nJTG.AA.ZZ Assessment of coughing, sneezing, expectorating and other functions related to breathing\nJTG.PG.ZZ Assisting and leading exercise for additional respiratory functions\nJTG.PH.ZZ Training for coughing, sneezing, expectorating and other functions related to breathing\nJTG.RB.ZZ Practical support with coughing, sneezing, expectorating and other respiratory functions related to breathing\nJT2.ZZ.ZZ Interventions on functions of respiratory system, not elsewhere classified\nJZZ.AA.ZZ Assessment of respiratory system, not elsewhere classified"
      ],
      "Assessments": [
        "Initial Assessment\nSubjective Assessment questions"
      ]
    },
    "Audiology": {
      "ICF": [
        "b440 – Respiration Functions (if related to URI)"
      ],
      "ICHI": [],
      "Assessments": [
        "Otoscopic Examination"
      ]
    },
    "Physio Therapy": {
      "ICF": [
        "b440 – Respiration Functions"
      ],
      "ICHI": [
        "JTB.AA.ZZ (Assessment of respiration function)\nJTB.PH.ZZ (Training of respiration function)\nJTB.AB.ZZ (Measurement of respiration function)"
      ],
      "Assessments": {
   "subjective":[ "6M Walk" ],
   "objective":[ "test", "test2" ]
},
"Relations": {
   "6M Walk": ["KTC.AM.ZZ", "SMG.AM.ZZ"],
   "PG-SGA-Metric-version": ["PZA.AB.ZZ - whole body measurement",
"SMF.AN.ZZ - Interview in relation to eating", 
"VEA.AN.ZZ Interview in relation to eating behaviours",
"KTC.AN.ZZ Interview in relation to swallowing",
"ATI.AN.ZZ Interview in relation to energy and drive functions", 
"PZA.AE.AH Physical examination of whole body, UAB.PM.ZZ Education about food" ],
   "MST": ["KTC.AM.ZZ – Observation of swallowing"],
   "test2": []
}
    },
    "Speech therapy": {
      "ICF": [
        "b440 – Respiration Functions"
      ],
      "ICHI": [
        "JT2.AA.ZZ Assessment of functions of the respiratory system, not elsewhere classified  \nJT2.AB.ZZ Measurement of functions of the respiratory system, not elsewhere classified\nJT2.AC.ZZ Test of functions of the respiratory system, not elsewhere classified\nJT2.PG.ZZ Assisting and leading exercise for functions of the respiratory system, not elsewhere classified\nJT2.PH.ZZ Training of functions of the respiratory system, not elsewhere classified"
      ],
      "Assessments": [
        "A. Respiratory Observations\nB. Objective Voice Measures \nC. Perceptual Voice Measures\nTRACHEOSTOMY WEANING EVALUATION"
      ]
    },
    "Nursing": {
      "ICF": [
        "b440 – Respiration Functions"
      ],
      "ICHI": [
        "Orthostatic hypotension prevention — graded tilt/positioning & compression; DVT prophylaxis bundle — SCDs + pharmacologic per protocol; Pulmonary hygiene & respiratory muscle training.\nb420 (Blood pressure functions) → ICHI interventions typically cover measurement/monitoring, self-measurement training, provision of BP monitoring device, lifestyle counselling, pharmacological management (medication administration/adjustment), diagnostic ambulatory BP monitoring referral, and urgent BP crisis management"
      ],
      "Assessments": [
        "Cardiovascular / Autonomic / Pulmonary\nManagement"
      ]
    }
  }
},

  "Stroke Comprehensive": {
    "Dietetics": {
      "ICF": {
        "b445 – Respiration Functions":
      {       
      "ICHI": [
        "KTC.AM.ZZ – Observation of swallowing\nSMG.AM.ZZ – Observation of drinking\nSMF.AM.ZZ – Observation of eating\nVEA.AM.ZZ – Observation of eating behaviors\nSDG.AM.ZZ – Observation of carrying out daily routine\nKTN.PP.ZZ – Weight maintenance education/counselling\nSMF.PM.ZZ – Education about eating\nSOA.PM.ZZ / SOA.PP.ZZ – Education/counselling about preparing meals\nVEA.PM.ZZ / VEA.PP.ZZ – Education/counselling about eating behaviours\nETB.PM.ZZ / ETB.PP.ZZ – Education/counselling about metabolic functions\nVEB.PM.ZZ – Education about physical activity behaviours\nUAB.TI.ZZ – Prescription of food\nVEA.TI.ZZ – Prescription for eating behaviours\nUAA.VB.ZZ – Awareness regarding substances for consumption\nVEA.VB.ZZ – Awareness to influence eating behaviours"
      ],
      "Assessments": {
        "subjective":[
        "NRS","PG-SGA-Metric-version"
      ],"objective":[ 
      ]
    }
    },
     "b445 – Respiratory muscle Functions":{
"ICHI": [
        "KTC.AM.ZZ – Observation of swallowing\nSMF.AM.ZZ – Observation of eating\nSMG.AM.ZZ – Observation of drinking\nKTB.AM.ZZ – Observation of ingestion\nSDG.AM.ZZ – Observation of carrying out daily routine\nSOA.AM.ZZ – Observation of preparing meals\nVEA.AM.ZZ – Observation of eating behaviours\nITA.AN.ZZ – Interview about blood pressure (only if relevant to postural breathlessness)\nPZA.DA.ZZ – Administering nutritional requirements\nUAB.DA.ZZ – Food modification (e.g., texture changes for safe swallowing)\nSMF.PM.ZZ – Education about eating\nSOA.PM.ZZ – Education about preparing meals\nKTN.PM.ZZ – Education about weight maintenance\nUAB.PM.ZZ – Education about food\nVEA.PM.ZZ – Education about eating behaviours\nETB.PM.ZZ – Education about metabolic impacts of respiratory effort\nVEB.PM.ZZ – Education about physical activity around meals\nSOA.PP.ZZ – Counselling about preparing meals\nVEA.PP.ZZ – Counselling on eating behaviours\nKTN.PP.ZZ – Weight management counselling\nETB.PP.ZZ – Counselling about metabolic impacts of respiratory effort\nUAB.TI.ZZ – Prescription of food\nVEA.TI.ZZ – Prescription for eating behaviours\nUAA.TI.ZZ – Prescription of substances for consumption (e.g., supplements)\nVEA.VB.ZZ – Awareness on eating behaviours\nUAA.VB.ZZ – Awareness about substances for consumption\nVEA.RD.ZZ – Providing goods supporting eating behaviours\nVEA.TB.ZZ – Planning in relation to eating behaviours\nVEA.TM.ZZ – Environment modification to support safe breathing during meals"
      ],
      "Assessments": [
        "NRS\nPG-SGA-Metric-version\nGrowth Chart\nBIA"
      ]
     }},
    "Doctor": {
      "ICF": [
        "b440 – Respiration Functions"
      ],
      "ICHI": [
        "JTB.AA.ZZ Assessment of respiration function\nJTB.AB.ZZ Measurement of respiration function\nJTB.AC.ZZ Test of respiration function\nJTB.AI.ZZ Monitoring of respiration function\nJTB.AM.ZZ Observation of respiration function\nJTB.AN.ZZ Interview in relation to respiration function\nJTB.DE.AC Artificial ventilation\nJTB.JB.ZZ Postural drainage\nJTB.PG.ZZ Assisting and leading exercise for respiration function\nJTB.PH.ZZ Training of respiration function\nJTB.PM.ZZ Education about respiration function\nJTB.PN.ZZ Advising about respiration function\nJTB.ZY.ZY Other interventions on respiration function, not elsewhere classified\nJTC.AA.ZZ Assessment of respiratory muscle function\nJTC.AB.ZZ Respiratory pressure measurement\nJTC.AC.ZZ Test of respiratory muscle function\nJTC.PG.ZZ Assisting and leading exercise for respiratory muscles\nJTG.AA.ZZ Assessment of coughing, sneezing, expectorating and other functions related to breathing\nJTG.PG.ZZ Assisting and leading exercise for additional respiratory functions\nJTG.PH.ZZ Training for coughing, sneezing, expectorating and other functions related to breathing\nJTG.RB.ZZ Practical support with coughing, sneezing, expectorating and other respiratory functions related to breathing\nJT2.ZZ.ZZ Interventions on functions of respiratory system, not elsewhere classified\nJZZ.AA.ZZ Assessment of respiratory system, not elsewhere classified"
      ],
      "Assessments": [
        "Initial Assessment\nSubjective Assessment questions"
      ]
    },
    "Audiology": {
      "ICF": [
        "b440 – Respiration Functions (if related to URI)"
      ],
      "ICHI": [],
      "Assessments": [
        "Otoscopic Examination"
      ]
    },
    "Physio Therapy": {
      "ICF": [
        "b440 – Respiration Functions"
      ],
      "ICHI": [
        "JTB.AA.ZZ (Assessment of respiration function)\nJTB.PH.ZZ (Training of respiration function)\nJTB.AB.ZZ (Measurement of respiration function)"
      ],
      "Assessments": [
        "1. Rating of Perceived Exertion (RPE);\n2. 6 Minute Walking Test (6MWT);\n3. Manual counting"
      ]
    },
    "Speech therapy": {
      "ICF": [
        "b440 – Respiration Functions"
      ],
      "ICHI": [
        "JT2.AA.ZZ Assessment of functions of the respiratory system, not elsewhere classified  \nJT2.AB.ZZ Measurement of functions of the respiratory system, not elsewhere classified\nJT2.AC.ZZ Test of functions of the respiratory system, not elsewhere classified\nJT2.PG.ZZ Assisting and leading exercise for functions of the respiratory system, not elsewhere classified\nJT2.PH.ZZ Training of functions of the respiratory system, not elsewhere classified"
      ],
      "Assessments": [
        "A. Respiratory Observations\nB. Objective Voice Measures \nC. Perceptual Voice Measures\nTRACHEOSTOMY WEANING EVALUATION"
      ]
    },
    "Nursing": {
      "ICF": [
        "b440 – Respiration Functions"
      ],
      "ICHI": [
        "Orthostatic hypotension prevention — graded tilt/positioning & compression; DVT prophylaxis bundle — SCDs + pharmacologic per protocol; Pulmonary hygiene & respiratory muscle training.\nb420 (Blood pressure functions) → ICHI interventions typically cover measurement/monitoring, self-measurement training, provision of BP monitoring device, lifestyle counselling, pharmacological management (medication administration/adjustment), diagnostic ambulatory BP monitoring referral, and urgent BP crisis management"
      ],
      "Assessments": [
        "Cardiovascular / Autonomic / Pulmonary\nManagement"
      ]
    }
  }
}

}

export const ICF_DETAILS = {
  "b440": {
    hierarchy: [
      "Body Functions",
      "Functions of the cardiovascular, haematological, immunological and respiratory systems",
      "Functions of the respiratory system"
    ],
    title: "b440 – Respiration Functions",
  },

  "b445": {
    hierarchy: [
      "Body Functions",
      "Functions of the cardiovascular, haematological, immunological and respiratory systems",
      "Functions of the respiratory system"
    ],
    title: "b445 – Respiratory Muscle Functions",
  }
};
