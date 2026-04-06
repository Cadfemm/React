import React from "react";
import { useHistory } from "react-router-dom";
import PsychologyPatients from "../components/PsychologyPatients";

/** Same Optometry-style flow: one list → pick patient → cards (initial / follow-up / …). */
export default function PsychologyDepartmentPage({ patients, department }) {
  const history = useHistory();
  const list = (patients || []).filter((p) =>
    Array.isArray(p.departments) ? p.departments.includes(department) : false
  );

  return (
    <PsychologyPatients
      Patients={list}
      onBack={() => history.goBack()}
    />
  );
}
