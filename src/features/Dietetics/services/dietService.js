// dietService.js
const STORAGE_KEY = "diet_assessments";

/**
 * Save diet assessment as JSON (localStorage)
 */
export function saveDietAssessment(payload) {
  try {
    const existing =
      JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    const record = {
      id: Date.now(),
      ...payload,
      created_at: new Date().toISOString(),
    };

    existing.push(record);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));

    console.log("Diet assessment saved (JSON)", record);

    return record;
  } catch (err) {
    console.error("Local save failed", err);
    throw err;
  }
}

/**
 * Fetch diet assessments for a patient
 */
export function getDietAssessmentsByPatient(patientId) {
  const all =
    JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

  return all.filter(
    (a) => a.patient_id === patientId
  );
}

/**
 * Fetch latest assessment
 */
export function getLatestDietAssessment(patientId, type) {
  const all =
    JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

  return all
    .filter(
      (a) =>
        a.patient_id === patientId &&
        a.assessment_type === type
    )
    .sort((a, b) => b.id - a.id)[0];
}
