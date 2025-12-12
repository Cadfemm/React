import React, { useEffect, useState } from "react";
import axios from "axios";
import ICFTab from "./ICFTab";  // your existing component

const ICFTabWrapper = ({ patientId }) => {
  const [icdCode, setIcdCode] = useState(null);

  useEffect(() => {
    if (!patientId) return;

    axios
      .get(`http://127.0.0.1:5000/api/patient_icd_path/${patientId}`)
      .then((res) => {
        if (res.data && res.data.icd_code) {
          setIcdCode(res.data.icd_code);   // ✅ Correct key from your API
          console.log("Fetched ICD:", res.data.icd_code);
        } else {
          console.warn("No ICD code found for patient", patientId);
          setIcdCode(null);
        }
      })
      .catch((err) => console.error("Error fetching ICD for patient:", err));
  }, [patientId]);

  if (!icdCode) return <p>Loading ICD mapping...</p>;

  return <ICFTab patientId={patientId} icdCode={icdCode} />;
};

export default ICFTabWrapper;
