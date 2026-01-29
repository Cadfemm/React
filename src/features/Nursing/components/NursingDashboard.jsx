import React, { useState } from "react";
import NursingPatientspage from "../pages/NursingPatientspage";

export default function NursingDashboard({ patients }) {
  return <NursingPatientspage patients={patients} department="Nursing" />;
}
