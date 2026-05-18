import React, { useState } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

const schema = {
  title: "Rehabilitation Discharge Checklist",
//   subtitle: "Pusat Rehabilitasi PERKESO Tun Abdul Razak",
    actions: [
    {
      type: "back",
      label: "Back"
    }
  ],

  sections: [
    {
      title: "SECTION A: DISCHARGE PREPARATION",
      fields: [
        {
          type: "radio",
          name: "personal_belongings_status",
          label: "Personal belongings packed and checked",
          options: [
            { label: "Done", value: "done" },
            { label: "Given", value: "given" },
            { label: "Not Applicable", value: "na" }
          ]
        },
        {
          type: "input",
          name: "personal_belongings_remarks",
          label: "Specify",
          showIf: {
            field: "personal_belongings_status",
            equals: "na"
          }
        },

        {
          type: "radio",
          name: "storage_form_status",
          label: "Storage form completed (if applicable)",
          options: [
            { label: "Done", value: "done" },
            { label: "Given", value: "given" },
            { label: "Not Applicable", value: "na" }
          ]
        },
        {
          type: "input",
          name: "storage_form_remarks",
          label: "Specify",
          showIf: {
            field: "storage_form_status",
            equals: "na"
          }
        },
        {
          type: "radio",
          name: "shared_borrowed",
          label: "Shared / borrowed items ",
          options: [
            { label: "Done", value: "done" },
            { label: "Given", value: "given" },
            { label: "Not Applicable", value: "na" }
          ]
        },
        {
          type: "input",
          name: "shared_borrowed_remarks",
          label: "Specify",
          showIf: {
            field: "shared_borrowed",
            equals: "na"
          }
        },        
      ]
    },

    {
      title: "SECTION B: DOCUMENTS & MEDICATIONS",
      fields: [
        {
          type: "radio",
          name: "discharge_summary_status",
          label: "Discharge summary / hospital memo",
          options: [
            { label: "Done", value: "done" },
            { label: "Given", value: "given" },
            { label: "Not Applicable", value: "na" }
          ]
        },
        {
          type: "input",
          name: "discharge_summary_remarks",
          label: "Specify",
          showIf: {
            field: "discharge_summary_status",
            equals: "na"
          }
        },

        {
          type: "radio",
          name: "followup_card_status",
          label: "Follow-up appointment card",
          options: [
            { label: "Done", value: "done" },
            { label: "Given", value: "given" },
            { label: "Not Applicable", value: "na" }
          ]
        },
        {
          type: "input",
          name: "followup_card_remarks",
          label: "Specify",
          showIf: {
            field: "followup_card_status",
            equals: "na"
          }
        },

        {
          type: "radio",
          name: "medications_status",
          label: "Medications supplied and explained",
          options: [
            { label: "Done", value: "done" },
            { label: "Given", value: "given" },
            { label: "Not Applicable", value: "na" }
          ]
        },
        {
          type: "input",
          name: "medications_remarks",
          label: "Specify",
          showIf: {
            field: "medications_status",
            equals: "na"
          }
        },

        {
          type: "radio",
          name: "prescription_slip_status",
          label: "Prescription slip",
          options: [
            { label: "Done", value: "done" },
            { label: "Given", value: "given" },
            { label: "Not Applicable", value: "na" }
          ]
        },
        {
          type: "input",
          name: "prescription_slip_remarks",
          label: "Specify",
          showIf: {
            field: "prescription_slip_status",
            equals: "na"
          }
        },

        {
          type: "radio",
          name: "diagnostic_reports_status",
          label: "Diagnostic reports / Films",
          options: [
            { label: "Done", value: "done" },
            { label: "Given", value: "given" },
            { label: "Not Applicable", value: "na" }
          ]
        },
        {
          type: "input",
          name: "diagnostic_reports_remarks",
          label: "Specify",
          showIf: {
            field: "diagnostic_reports_status",
            equals: "na"
          }
        },

        {
          type: "radio",
          name: "blood_results_status",
          label: "Blood results",
          options: [
            { label: "Done", value: "done" },
            { label: "Given", value: "given" },
            { label: "Not Applicable", value: "na" }
          ]
        },
        {
          type: "input",
          name: "blood_results_remarks",
          label: "Specify",
          showIf: {
            field: "blood_results_status",
            equals: "na"
          }
        }
      ]
    },

    {
      title: "SECTION C: EQUIPMENT RETURN",
      fields: [
        {
          type: "radio",
          name: "passport_status",
          label: 'Client Passport Endorsed "DISCHARGE" / Caregiver pass card',
          options: [
            { label: "Done", value: "done" },
            { label: "Given", value: "given" },
            { label: "Not Applicable", value: "na" }
          ]
        },
        {
          type: "input",
          name: "passport_remarks",
          label: "Specify",
          showIf: {
            field: "passport_status",
            equals: "na"
          }
        },

        {
          type: "radio",
          name: "locker_key_status",
          label: "Locker key",
          options: [
            { label: "Done", value: "done" },
            { label: "Given", value: "given" },
            { label: "Not Applicable", value: "na" }
          ]
        },
        {
          type: "input",
          name: "locker_key_remarks",
          label: "Specify",
          showIf: {
            field: "locker_key_status",
            equals: "na"
          }
        },

        {
          type: "radio",
          name: "facility_items_status",
          label: "Facility clothing , remote TV , etc",
          options: [
            { label: "Done", value: "done" },
            { label: "Given", value: "given" },
            { label: "Not Applicable", value: "na" }
          ]
        },
        {
          type: "input",
          name: "facility_items_remarks",
          label: "Specify",
          showIf: {
            field: "facility_items_status",
            equals: "na"
          }
        },

        {
          type: "radio",
          name: "remote_controls_status",
          label: "Remote controls",
          options: [
            { label: "Done", value: "done" },
            { label: "Given", value: "given" },
            { label: "Not Applicable", value: "na" }
          ]
        },
        {
          type: "input",
          name: "remote_controls_remarks",
          label: "Specify",
          showIf: {
            field: "remote_controls_status",
            equals: "na"
          }
        },

        {
          type: "radio",
          name: "mobility_aid_status",
          label: "Mobility Aid / Assistive device",
          options: [
            { label: "Done", value: "done" },
            { label: "Given", value: "given" },
            { label: "Not Applicable", value: "na" }
          ]
        },
        {
          type: "input",
          name: "mobility_aid_remarks",
          label: "Specify",
          showIf: {
            field: "mobility_aid_status",
            equals: "na"
          }
        },

        {
          type: "radio",
          name: "air_mattress_status",
          label: "Air Mattress",
          options: [
            { label: "Done", value: "done" },
            { label: "Given", value: "given" },
            { label: "Not Applicable", value: "na" }
          ]
        },
        {
          type: "input",
          name: "air_mattress_remarks",
          label: "Specify",
          showIf: {
            field: "air_mattress_status",
            equals: "na"
          }
        }
      ]
    },

    {
      title: "SECTION D: REHABILITATION READINESS, COMMUNITY & DISCHARGE SAFETY",
      fields: [
        {
          type: "radio",
          name: "caregiver_training_status",
          label: "Caregiver training Rehabilitation Related Patient  Education",
          options: [
            { label: "Done", value: "done" },
            { label: "Given", value: "given" },
            { label: "Not Applicable", value: "na" }
          ]
        },
        {
          type: "input",
          name: "caregiver_training_remarks",
          label: "Specify",
          showIf: {
            field: "caregiver_training_status",
            equals: "na"
          }
        },

        {
          type: "radio",
          name: "assistive_training_status",
          label: "Assistive devices training",
          options: [
            { label: "Done", value: "done" },
            { label: "Given", value: "given" },
            { label: "Not Applicable", value: "na" }
          ]
        },
        {
          type: "input",
          name: "assistive_training_remarks",
          label: "Specify",
          showIf: {
            field: "assistive_training_status",
            equals: "na"
          }
        }
      ]
    },

    {
      title: "FINAL VERIFICATION",
      fields: [
                {
          type: "row",
          fields: [
            {
              type: "input",
              name: "client_signature",
              label: "Client / Caregiver Signature"
            },
            {
              type: "input",
              name: "staff_signature",
              label: "Staff Signature"
            }
          ]
        },
        {
          type: "row",
          fields: [
            {
              type: "input",
              name: "client_name",
              label: "Client / Caregiver Name"
            },
            {
              type: "input",
              name: "staff_name",
              label: "Staff Name"
            }
          ]
        },

        {
          type: "row",
          fields: [
            {
              type: "date",
              name: "client_date",
              label: "Client / Caregiver Date"
            },
            {
              type: "date",
              name: "staff_date",
              label: "Staff Date"
            }
          ]
        },
      ]
    }
  ]
};

export default function RehabilitationDischargeChecklist({
  patient,
  onBack,
}) {

  const [values, setValues] = useState({});

  const onChange = (name, value) => {
    setValues((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAction = (type) => {
    if (type === "back") {
      onBack?.();
    }
  };

  return (
    <CommonFormBuilder
      schema={schema}
      values={values}
      onChange={onChange}
      onAction={handleAction}
      layout="nested"
    />
  );
}