export function getAtvConsentStorageKey(patient) {
  const id = patient?.id || patient?._id || patient?.patient_id || "";
  return id ? `pt_atv_consent_${id}` : null;
}

export function loadAtvConsent(patient) {
  try {
    const key = getAtvConsentStorageKey(patient);
    if (!key) return null;
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveAtvConsent(patient, consentValues) {
  const key = getAtvConsentStorageKey(patient);
  if (!key) return null;
  const payload = {
    ...(consentValues || {}),
    submittedAt: (consentValues && consentValues.submittedAt) || new Date().toISOString(),
    saved: true,
  };
  try {
    localStorage.setItem(key, JSON.stringify(payload));
  } catch {
    // ignore storage failures (private mode / quota)
  }
  return payload;
}

