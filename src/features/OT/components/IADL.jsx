import React, { useState, useEffect } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

export default function IADLAssessment() {

  const [values, setValues] = useState({});

  const handleChange = (name, value) => {
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Score mapping - each field maps its option value to a score
  const scoreMap = {
    telephone: { a: 1, b: 1, c: 1, d: 0 },
    shopping: { a: 1, b: 0, c: 0, d: 0 },
    food: { a: 1, b: 0, c: 0, d: 0 },
    housekeeping: { a: 1, b: 1, c: 0, d: 0 },
    laundry: { a: 1, b: 1, c: 0 },
    transport: { a: 1, b: 1, c: 1, d: 0 },
    medication: { a: 1, b: 0, c: 0 },
    finance: { a: 1, b: 1, c: 0 }
  };

  const calculateTotal = (vals) => {
    const keys = [
      "telephone",
      "shopping",
      "food",
      "housekeeping",
      "laundry",
      "transport",
      "medication",
      "finance"
    ];

    let total = 0;
    keys.forEach(k => {
      const value = vals[k];
      total += (scoreMap[k] && scoreMap[k][value]) ? scoreMap[k][value] : 0;
    });

    return total;
  };

  useEffect(() => {

    const total = calculateTotal(values);

    setValues(prev => {

      if (prev.iadl_total === total) return prev;

      return {
        ...prev,
        iadl_total: total
      };

    });

  }, [values]);

  const IADL_SCHEMA = {

    title: "Lawton - Brody Instrumental Activities of Daily Living (IADL) Scale",

    sections: [

      {
        title: "A. Ability to Use Telephone",
        fields: [
          {
            type: "radio",
            name: "telephone",
            options: [
              { label: "Operates telephone on own initiative", value: "a" },
              { label: "Dials a few well known numbers", value: "b" },
              { label: "Answers telephone but does not dial", value: "c" },
              { label: "Does not use telephone at all", value: "d" }
            ]
          }
        ]
      },

      {
        title: "B. Shopping",
        fields: [
          {
            type: "radio",
            name: "shopping",
            options: [
              { label: "Takes care of all shopping independently", value: "a" },
              { label: "Shops independently for small purchases", value: "b" },
              { label: "Needs to be accompanied on shopping", value: "c" },
              { label: "Unable to shop", value: "d" }
            ]
          }
        ]
      },

      {
        title: "C. Food Preparation",
        fields: [
          {
            type: "radio",
            name: "food",
            options: [
              { label: "Plans and prepares meals independently", value: "a" },
              { label: "Prepares meals if supplied ingredients", value: "b" },
              { label: "Heats and serves prepared meals only", value: "c" },
              { label: "Needs meals prepared", value: "d" }
            ]
          }
        ]
      },

      {
        title: "D. Housekeeping",
        fields: [
          {
            type: "radio",
            name: "housekeeping",
            options: [
              { label: "Maintains house alone with occasional assistance", value: "a" },
              { label: "Performs light daily tasks", value: "b" },
              { label: "Needs help with housekeeping", value: "c" },
              { label: "Does not participate in housekeeping", value: "d" }
            ]
          }
        ]
      },

      {
        title: "E. Laundry",
        fields: [
          {
            type: "radio",
            name: "laundry",
            options: [
              { label: "Does personal laundry completely", value: "a" },
              { label: "Launders small items only", value: "b" },
              { label: "             Laundry must be done by others", value: "c" }
            ]
          }
        ]
      },

      {
        title: "F. Mode of Transportation",
        fields: [
          {
            type: "radio",
            name: "transport",
            options: [
              { label: "Travels independently", value: "a" },
              { label: "Arranges own travel via taxi", value: "b" },
              { label: "Travels on public transport when accompanied", value: "c" },
              { label: "Does not travel at all", value: "d" }
            ]
          }
        ]
      },

      {
        title: "G. Responsibility for Medication",
        fields: [
          {
            type: "radio",
            name: "medication",
            options: [
              { label: "Responsible for taking medication correctly", value: "a" },
              { label: "Medication prepared in advance", value: "b" },
              { label: "Not capable of dispensing medication", value: "c" }
            ]
          }
        ]
      },

      {
        title: "H. Ability to Handle Finances",
        fields: [
          {
            type: "radio",
            name: "finance",
            options: [
              { label: "Manages financial matters independently", value: "a" },
              { label: "Manages small purchases but needs help", value: "b" },
              { label: "Incapable of handling money", value: "c" }
            ]
          }
        ]
      },

      {
        title: "Results",
        fields: [
          {
            type: "score-box",
            name: "iadl_total",
            label: "Total IADL Score"
          },
          {
            type: "textarea",
            name: "comments",
            label: "Comments"
          }
        ]
      }

    ]

  };

  return (
    <CommonFormBuilder
      schema={IADL_SCHEMA}
      values={values}
      onChange={handleChange}
      showScores
      layout="nested"
    />
  );

}