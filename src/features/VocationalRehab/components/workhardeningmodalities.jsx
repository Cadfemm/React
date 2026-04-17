import React from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";

export default function WorkHardeningModalities({
  values = {},
  onChange,
}) {
  const schema = {
    title: "Work Hardening Modalities",
    sections: [
      {
        fields: [
          {
            type: "subheading",
            label: "BTE PRIMUS RS",
          },

          {
            type: "file-upload",
            name: "bte_primus_rs_files",
            label: "File link (pdf / jpeg)",
          },

          {
            type: "info-text",
            // text: "Maximum 50 files (pdf & jpeg format) can be uploaded here.",
          },

          {
            type: "subheading",
            label: "BTE EVALTECH",
          },

          {
            type: "file-upload",
            name: "bte_evaltech_files",
            label: "File link (pdf / jpeg)",
          },

          {
            type: "info-text",
            // text: "Maximum 50 files (pdf & jpeg format) can be uploaded here.",
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