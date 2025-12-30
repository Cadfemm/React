// PatientDetails.jsx
import React, { useEffect, useMemo, useState, useRef } from "react";
import { icdData, ICD_LIST, ICF_DETAILS } from "../../../data/masterData"; // adjust path if needed
import AssessmentRenderer from "./AssessmentRenderer"; // adjust path if needed
import PatientReports from "../../PatientReports"; // 🔁 adjust path if needed

// helper: extract ICF short code
function extractICFCode(icfLabel) {
  if (!icfLabel) return "";
  var parts = icfLabel.split("–");
  if (!parts || parts.length === 0) parts = icfLabel.split("-");
  if (!parts || parts.length === 0) return icfLabel.trim();
  return parts[0].trim();
}


export default function PatientDetails(props) {
  var patient = props.patient || {};
  var department = props.department || "services";
  var onBack = props.onBack || function () {};
  const setField = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));
const styles = {
  input: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 6,
    border: "1px solid #ccc",
  },
  readonlyInput: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 6,
    border: "1px solid #ccc",
    background: "#eee",
    color: "#333",
  },
  textarea: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 6,
    border: "1px solid #ccc",
  },
  small: {
    fontSize: 12,
    color: "#555",
  },
};
const btnReport = {
  padding: "8px 16px",
  background: "#0277bd",
  color: "white",
  borderRadius: 6,
  border: "none",
  cursor: "pointer",
  fontWeight: 600,
};
  const dietOptions = [
    "Diabetic",
    "Low Salt",
    "Low Fat",
    "Low Purine",
    "High Protein",
    "Low Protein",
    "RTF Regime",
    "Addons (Supplements)",
    "Others",
    "Special Diet",
    "Special Request",
  ];

  const meals = [
    { key: "breakfast", label: "BREAKFAST" },
    { key: "morning_tea", label: "MORNING TEA" },
    { key: "lunch", label: "LUNCH" },
    { key: "afternoon_tea", label: "AFTERNOON TEA" },
    { key: "dinner", label: "DINNER" },
    { key: "supper", label: "SUPPER" },
  ];
  // selection UI (single ICD kept for compatibility)
  var [selectedICD, setSelectedICD] = useState("");
  var [selectedICFsFilter, setSelectedICFsFilter] = useState([]);
  var [icfDropdownOpen, setIcfDropdownOpen] = useState(false);
    var [actionInitiateNutrition, setActionInitiateNutrition] = useState(false);
    var [actionOrderConsult, setActionOrderConsult] = useState(false);
    var [actionMonitorIntake, setActionMonitorIntake] = useState(false);
    var [actionSupplements, setActionSupplements] = useState(false);
    var [actionDocumentPlan, setActionDocumentPlan] = useState(false);

  // ICD multi-select (checkbox dropdown)
  const icdDropdownRef = useRef(null);
  const [icdDropdownOpen, setIcdDropdownOpen] = useState(false);
  const [selectedICDs, setSelectedICDs] = useState([]);
// Notes for each plan item
const [noteInitiateNutrition, setNoteInitiateNutrition] = useState("");
const [noteOrderConsult, setNoteOrderConsult] = useState("");
const [noteMonitorIntake, setNoteMonitorIntake] = useState("");
const [noteSupplements, setNoteSupplements] = useState("");
const [noteDocumentPlan, setNoteDocumentPlan] = useState("");
// Notes for each plan item
const [showProgressReports, setShowProgressReports] = useState(false);


// NEW: goals + free-text plan
const [shortTermGoals, setShortTermGoals] = useState("");
const [longTermGoals, setLongTermGoals] = useState("");
const [otherPlan, setOtherPlan] = useState("");

  function toggleSelectedICD(icd) {
    setSelectedICDs((prev) => {
      if (!prev) prev = [];
      if (prev.indexOf(icd) !== -1) return prev.filter((i) => i !== icd);
      return prev.concat([icd]);
    });
  }
  function selectAllICDs() {
    setSelectedICDs(ICD_LIST ? ICD_LIST.slice() : []);
  }
  function clearAllICDs() {
    setSelectedICDs([]);
  }

  // close ICD dropdown when clicking outside
  useEffect(() => {
    function onDocClick(e) {
      if (!icdDropdownRef.current) return;
      if (!icdDropdownRef.current.contains(e.target)) setIcdDropdownOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  // active single ICF view
  var [selectedICF, setSelectedICF] = useState(null);
  var [activeAssessTab, setActiveAssessTab] = useState("subjective");
  var [selectedAssessment, setSelectedAssessment] = useState(null);
 const [form, setForm] = useState({})
  // working-state per active ICF
  var [ichiStatus, setIchiStatus] = useState({});
  var [savedAssessments, setSavedAssessments] = useState([]);
  var [formDataByAssessment, setFormDataByAssessment] = useState({});
  var [unboldedApplicability, setUnboldedApplicability] = useState({});
  var [manualAddedIchi, setManualAddedIchi] = useState([]);

  // persisted per-patient map
  var [icfSavedMap, setIcfSavedMap] = useState({});

  // submissions table state (persisted separately)
  var [submittedRows, setSubmittedRows] = useState([]);

  // NEW: left ICHI multi-select UI state
  var [selectedSubmissionIndex, setSelectedSubmissionIndex] = useState(null);
  var [selectedLeftIchiCodes, setSelectedLeftIchiCodes] = useState([]);

  // debugging state
  var [debugOpen, setDebugOpen] = useState(false);
  var [lastSaveLog, setLastSaveLog] = useState([]); // array of {when, assessmentName, icfs, icds, ichi}
  var [lastError, setLastError] = useState(null);
  var [lastAction, setLastAction] = useState(null);

  // --- NEW final-submission state & edit-mode ---
  var [finalSubmissionInfo, setFinalSubmissionInfo] = useState(null); // { when: ISOstring }
  var [editMode, setEditMode] = useState(false); // toggled by Edit button (only available within 6 hours)
  // ----------------------------------------------------------------

  // data mapping for selected ICD (single)
  var mapping = selectedICD ? (icdData && icdData[selectedICD] ? icdData[selectedICD][department] : null) : null;
  var allIcfList = mapping && mapping.ICF ? Object.keys(mapping.ICF) : [];

  // merged mapping across all ICDs for department (used when no single ICD selected)
  var mergedMappingAcrossICDs = useMemo(function () {
    var out = { ICF: {} };
    if (!ICD_LIST || !icdData) return out;

    for (var i = 0; i < ICD_LIST.length; i++) {
      var icdKey = ICD_LIST[i];
      var m = icdData && icdData[icdKey] ? icdData[icdKey][department] : null;
      if (m && m.ICF) {
        var icfKeys = Object.keys(m.ICF);
        for (var j = 0; j < icfKeys.length; j++) {
          var icfLabel = icfKeys[j];
          if (!out.ICF[icfLabel]) out.ICF[icfLabel] = m.ICF[icfLabel];
        }
      }
    }
    return out;
  }, [ICD_LIST, icdData, department]);

  // mappingToUse for assessments listing (selected ICD mapping or merged mapping)
  var mappingToUse = mapping || mergedMappingAcrossICDs;

  // Build a map code -> full label(s) by scanning mergedMappingAcrossICDs (used to display full label for codes)
  var globalIchiLabelMap = useMemo(function () {
    var map = {}; // code -> first full label found
    var mm = mergedMappingAcrossICDs && mergedMappingAcrossICDs.ICF ? mergedMappingAcrossICDs.ICF : {};
    var icfKeys = Object.keys(mm || {});
    for (var ik = 0; ik < icfKeys.length; ik++) {
      var icfObj = mm[icfKeys[ik]];
      var ichiArr = (icfObj && icfObj.ICHI) ? icfObj.ICHI : [];
      for (var b = 0; b < ichiArr.length; b++) {
        var blk = ichiArr[b] || "";
        var lines = (blk || "").split("\n").map(function (l) { return l.trim(); }).filter(Boolean);
        for (var ln = 0; ln < lines.length; ln++) {
          var line = lines[ln];
          var code = (line.split("–")[0] || line.split("-")[0] || "").trim();
          if (code && !map[code]) map[code] = line;
        }
      }
    }
    return map;
  }, [mergedMappingAcrossICDs]);

  // visibleIcfList (based on multiselect) - if filter empty -> show none
  var visibleIcfList = useMemo(function () {
    if (!allIcfList || allIcfList.length === 0) return [];
    if (!selectedICFsFilter || selectedICFsFilter.length === 0) return [];
    var out = [];
    for (var i = 0; i < allIcfList.length; i++) {
      var icf = allIcfList[i];
      if (selectedICFsFilter.indexOf(icf) !== -1) out.push(icf);
    }
    return out;
  }, [allIcfList, selectedICFsFilter]);

  var activeICF = selectedICF && mapping && mapping.ICF ? mapping.ICF[selectedICF] : null;
  var shortICF = selectedICF ? extractICFCode(selectedICF) : null;
  var icfMeta = shortICF && ICF_DETAILS ? ICF_DETAILS[shortICF] : null;

  var storageKey = "patient_" + (patient && patient.id ? patient.id : "anon") + "_icf_map_v1";
  var submissionsStorageKey = storageKey + "_submissions_v1";
  var finalSubmissionStorageKey = storageKey + "_final_v1";
  var followupStorageKey = storageKey + "_is_followup_v1";

  // ------------------ load persisted icfSavedMap ------------------
  useEffect(function () {
    try {
      var raw = localStorage.getItem(storageKey);
      if (raw) {
        var parsed = JSON.parse(raw);
        if (parsed && typeof parsed === "object") setIcfSavedMap(parsed);
      }
    } catch (err) {
      console.warn("Failed to load persisted icf map:", err);
      setLastError("Failed to load persisted icf map: " + (err && err.message ? err.message : String(err)));
    }

    // reset selection UI
    setSelectedICD("");
    setSelectedICFsFilter([]);
    setIcfDropdownOpen(false);
    setSelectedICF(null);
    setSelectedAssessment(null);
    setActiveAssessTab("subjective");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey, patient && patient.id]);

  // persist icfSavedMap on change
  useEffect(function () {
    try {
      localStorage.setItem(storageKey, JSON.stringify(icfSavedMap));
    } catch (err) {
      console.warn("Failed to persist icfSavedMap:", err);
      setLastError("Failed to persist icfSavedMap: " + (err && err.message ? err.message : String(err)));
    }
  }, [icfSavedMap, storageKey]);

  // ------------------ load/persist submissions ------------------
  useEffect(function () {
    try {
      var raw = localStorage.getItem(submissionsStorageKey);
      if (raw) {
        var parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setSubmittedRows(parsed);
          if (parsed.length > 0) setSelectedSubmissionIndex(parsed.length - 1);
        }
      }
    } catch (err) {
      console.warn("Failed to load submissions:", err);
      setLastError("Failed to load submissions: " + (err && err.message ? err.message : String(err)));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submissionsStorageKey, patient && patient.id]);

  useEffect(function () {
    try {
      localStorage.setItem(submissionsStorageKey, JSON.stringify(submittedRows));
      if (submittedRows && submittedRows.length > 0) {
        setSelectedSubmissionIndex(submittedRows.length - 1);
      } else {
        setSelectedSubmissionIndex(null);
      }
      setSelectedLeftIchiCodes([]);
    } catch (err) {
      console.warn("Failed to persist submissions:", err);
      setLastError("Failed to persist submissions: " + (err && err.message ? err.message : String(err)));
    }
  }, [submittedRows, submissionsStorageKey]);

  // ------------------ load final-submission & followup flags ------------------
  useEffect(function () {
    try {
      var rawFinal = localStorage.getItem(finalSubmissionStorageKey);
      if (rawFinal) {
        var parsed = JSON.parse(rawFinal);
        setFinalSubmissionInfo(parsed);
      } else {
        setFinalSubmissionInfo(null);
      }

      var rawFollow = localStorage.getItem(followupStorageKey);
      if (rawFollow) {
        // nothing to set here, other components can query if needed
      }
    } catch (err) {
      console.warn("Failed to load final/followup flags:", err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finalSubmissionStorageKey, followupStorageKey, patient && patient.id]);

  // ------------------ when switching to an ICF, load persisted working state or initialize ------------------
  useEffect(function () {
    if (!activeICF || !shortICF) {
      setIchiStatus({});
      setSavedAssessments([]);
      setFormDataByAssessment({});
      setUnboldedApplicability({});
      setManualAddedIchi([]);
      return;
    }

    var initialIchi = {};
    var icihi = activeICF.ICHI || [];
    for (var i = 0; i < icihi.length; i++) {
      var item = icihi[i];
      var lines = (item || "").split("\n").map(function (l) { return l.trim(); }).filter(Boolean);
      for (var j = 0; j < lines.length; j++) {
        var line = lines[j];
        var code = (line.split("–")[0] || line.split("-")[0] || "").trim();
        if (code) initialIchi[code] = "grey";
      }
    }

    var saved = icfSavedMap && icfSavedMap[shortICF] ? icfSavedMap[shortICF] : null;
    if (saved) {
      setIchiStatus(saved.ichiStatus || initialIchi);
      setSavedAssessments(saved.savedAssessments || []);
      setFormDataByAssessment(saved.formDataByAssessment || {});
      setUnboldedApplicability(saved.unboldedApplicability || {});
      setManualAddedIchi(saved.manualAddedIchi || []);
    } else {
      setIchiStatus(initialIchi);
      setSavedAssessments([]);
      setFormDataByAssessment({});
      setUnboldedApplicability({});
      setManualAddedIchi([]);
    }

    setSelectedAssessment(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeICF, shortICF]);

  // persist current working state for this ICF into icfSavedMap whenever any piece changes
  useEffect(function () {
    if (!shortICF) return;
    setIcfSavedMap(function (prev) {
      var out = Object.assign({}, prev);
      out[shortICF] = { ichiStatus: ichiStatus, savedAssessments: savedAssessments, formDataByAssessment: formDataByAssessment, unboldedApplicability: unboldedApplicability, manualAddedIchi: manualAddedIchi };
      return out;
    });
  }, [ichiStatus, savedAssessments, formDataByAssessment, unboldedApplicability, manualAddedIchi, shortICF]);

  // ------------------ saveAssessment ------------------
  function saveAssessment(assessmentName, formData) {
    // Prevent saves if patient finalised and not in editMode
    if (finalSubmissionInfo && !editMode) {
      setLastError("Cannot save: patient finalized. Edit window closed or editing disabled.");
      alert("Patient has been finalised. Editing is locked. Use 'Patient Summary' or ask an admin to reopen editing.");
      return;
    }

    setLastError(null);
    setLastAction("Attempting save: " + assessmentName);
    console.log("[PatientDetails] saveAssessment called:", assessmentName, formData);

    try {
      if (!assessmentName) {
        console.warn("[saveAssessment] no assessmentName provided");
        setLastError("saveAssessment called with empty assessmentName");
        return;
      }

      // determine affected ICF labels across mappingToUse
      var allIcfLabelsForSearch = mappingToUse && mappingToUse.ICF ? Object.keys(mappingToUse.ICF) : [];
      var affectedIcfLabels = [];
      for (var i = 0; i < allIcfLabelsForSearch.length; i++) {
        var icfLabel = allIcfLabelsForSearch[i];
        var icfObj = mappingToUse && mappingToUse.ICF ? mappingToUse.ICF[icfLabel] : null;
        var arr = icfObj && icfObj.Assessments && icfObj.Assessments[activeAssessTab] ? icfObj.Assessments[activeAssessTab] : [];
        if (arr.indexOf(assessmentName) !== -1) affectedIcfLabels.push(icfLabel);
      }

      // fallback to selectedICF if not listed anywhere
      if (!affectedIcfLabels || affectedIcfLabels.length === 0) {
        if (selectedICF && mapping && mapping.ICF && mapping.ICF[selectedICF]) {
          affectedIcfLabels = [selectedICF];
        } else {
          console.warn("[saveAssessment] no affected ICFs found and no selectedICF fallback");
          setLastError("No affected ICFs found for " + assessmentName);
          return;
        }
      }

      // prepare collections for submission row
      var icdSetForRow = new Set();
      var icfShortsForRow = [];
      var icfLabelsFullForRow = [];
      var ichiCodesForRow = new Set();
      var ichiFullLabelMap = {}; // code -> Set

      // if user explicitly selected ICDs via the new multiselect, prefer those for saving the submission
      if (selectedICDs && selectedICDs.length > 0) {
        selectedICDs.forEach(function (d) { icdSetForRow.add(d); });
      }

      for (var a = 0; a < affectedIcfLabels.length; a++) {
        var icfLabelA = affectedIcfLabels[a];
        var icfObjA = null;
        if (mappingToUse && mappingToUse.ICF && mappingToUse.ICF[icfLabelA]) icfObjA = mappingToUse.ICF[icfLabelA];

        var short = extractICFCode(icfLabelA);
        if (short && icfShortsForRow.indexOf(short) === -1) icfShortsForRow.push(short);
        if (icfLabelsFullForRow.indexOf(icfLabelA) === -1) icfLabelsFullForRow.push(icfLabelA);

        // find ICD(s) that contain this ICF in master data (only add if not already present)
        var icdListLocal = ICD_LIST || [];
        for (var ii = 0; ii < icdListLocal.length; ii++) {
          var icdKey = icdListLocal[ii];
          var md = icdData && icdData[icdKey] ? icdData[icdKey][department] : null;
          if (md && md.ICF && md.ICF[icfLabelA]) {
            icdSetForRow.add(icdKey);
            if (!icfObjA) icfObjA = md.ICF[icfLabelA];
          }
        }

        // selectedICD fallback (single)
        if (icdSetForRow.size === 0 && selectedICD) {
          var selMd = icdData && icdData[selectedICD] ? icdData[selectedICD][department] : null;
          if (selMd && selMd.ICF && selMd.ICF[icfLabelA]) icdSetForRow.add(selectedICD);
        }

        // related codes from Relations
        var relatedRawA = (icfObjA && icfObjA.Relations && icfObjA.Relations[assessmentName]) ? icfObjA.Relations[assessmentName] : [];
        for (var r = 0; r < relatedRawA.length; r++) {
          var rel = relatedRawA[r];
          var code = (rel && (rel.split("–")[0] || rel.split("-")[0] || "").trim());
          if (code) {
            ichiCodesForRow.add(code);

            // capture full ICHI lines from icfObjA.ICHI
            var ichiBlock = (icfObjA && icfObjA.ICHI) ? icfObjA.ICHI : [];
            for (var ib = 0; ib < ichiBlock.length; ib++) {
              var block = ichiBlock[ib] || "";
              var lines = (block || "").split("\n").map(function (l) { return l.trim(); }).filter(Boolean);
              for (var ln = 0; ln < lines.length; ln++) {
                var lnText = lines[ln];
                if (lnText.indexOf(code) === 0) {
                  if (!ichiFullLabelMap[code]) ichiFullLabelMap[code] = new Set();
                  ichiFullLabelMap[code].add(lnText);
                }
              }
            }
          }
        }

        // also scan all ICHI lines in the ICF for completeness
        if (icfObjA && icfObjA.ICHI) {
          var icfIchiArr = icfObjA.ICHI || [];
          for (var ii3 = 0; ii3 < icfIchiArr.length; ii3++) {
            var blk = icfIchiArr[ii3] || "";
            var lines2 = (blk || "").split("\n").map(function (l) { return l.trim(); }).filter(Boolean);
            for (var ln2 = 0; ln2 < lines2.length; ln2++) {
              var line2 = lines2[ln2];
              var code2 = (line2.split("–")[0] || line2.split("-")[0] || "").trim();
              if (code2) {
                if (!ichiFullLabelMap[code2]) ichiFullLabelMap[code2] = new Set();
                ichiFullLabelMap[code2].add(line2);
              }
            }
          }
        }
      } // end affectedIcfLabels loop

      // derive arrays
      var icdArrayForRow = Array.from(icdSetForRow);
      if (icdArrayForRow.length === 0 && selectedICD) icdArrayForRow = [selectedICD];
      var ichiCodesArr = Array.from(ichiCodesForRow);

      // build full label array deduped
      var ichiFullLabelsArr = [];
      for (var ki = 0; ki < ichiCodesArr.length; ki++) {
        var codek = ichiCodesArr[ki];
        var sset = ichiFullLabelMap[codek];
        if (sset && sset.size > 0) {
          sset.forEach(function (lbl) {
            if (ichiFullLabelsArr.indexOf(lbl) === -1) ichiFullLabelsArr.push(lbl);
          });
        } else {
          if (ichiFullLabelsArr.indexOf(codek) === -1) ichiFullLabelsArr.push(codek);
        }
      }

      // ---------- compute leftover ICHI (present in ICF but not matched via Relations) ----------
      var allIchiCodesArr = Object.keys(ichiFullLabelMap || {});
      var leftIchiCodesArr = allIchiCodesArr.filter(function (c) { return ichiCodesArr.indexOf(c) === -1; });

      var leftIchiFullLabelsArr = [];
      for (var li = 0; li < leftIchiCodesArr.length; li++) {
        var codeLi = leftIchiCodesArr[li];
        var ssetLi = ichiFullLabelMap[codeLi];
        if (ssetLi && ssetLi.size > 0) {
          ssetLi.forEach(function (lbl) {
            if (leftIchiFullLabelsArr.indexOf(lbl) === -1) leftIchiFullLabelsArr.push(lbl);
          });
        } else {
          if (leftIchiFullLabelsArr.indexOf(codeLi) === -1) leftIchiFullLabelsArr.push(codeLi);
        }
      }
      // -----------------------------------------------------------------------------------------------

      // update per-ICF saved map (preserve old behavior)
      setIcfSavedMap(function (prevMap) {
        var nextMap = Object.assign({}, prevMap);
        for (var b = 0; b < affectedIcfLabels.length; b++) {
          var icfLabelB = affectedIcfLabels[b];
          var icfObjB = mappingToUse && mappingToUse.ICF ? mappingToUse.ICF[icfLabelB] : null;
          if (!icfObjB) {
            var icdListLocal2 = ICD_LIST || [];
            for (var kk = 0; kk < icdListLocal2.length; kk++) {
              var ik = icdListLocal2[kk];
              var md2 = icdData && icdData[ik] ? icdData[ik][department] : null;
              if (md2 && md2.ICF && md2.ICF[icfLabelB]) {
                icfObjB = md2.ICF[icfLabelB];
                break;
              }
            }
          }

          var shortB = extractICFCode(icfLabelB);
          var prev = nextMap[shortB] || { ichiStatus: {}, savedAssessments: [], formDataByAssessment: {}, unboldedApplicability: {}, manualAddedIchi: [] };

          if (!prev.ichiStatus || Object.keys(prev.ichiStatus).length === 0) {
            var initialIchiB = {};
            var ichiB = (icfObjB && icfObjB.ICHI) ? icfObjB.ICHI : [];
            for (var ii2 = 0; ii2 < ichiB.length; ii2++) {
              var item = ichiB[ii2];
              var lines = (item || "").split("\n").map(function (l) { return l.trim(); }).filter(Boolean);
              for (var jj = 0; jj < lines.length; jj++) {
                var line = lines[jj];
                var code = (line.split("–")[0] || line.split("-")[0] || "").trim();
                if (code) initialIchiB[code] = prev.ichiStatus && prev.ichiStatus[code] ? prev.ichiStatus[code] : "grey";
              }
            }
            prev.ichiStatus = Object.assign({}, initialIchiB, prev.ichiStatus || {});
          }

          var relatedRawB = (icfObjB && icfObjB.Relations && icfObjB.Relations[assessmentName]) ? icfObjB.Relations[assessmentName] : [];
          var relatedCodesB = [];
          for (var rr = 0; rr < relatedRawB.length; rr++) {
            var relb = relatedRawB[rr];
            var c = (relb && (relb.split("–")[0] || relb.split("-")[0] || "").trim()) || null;
            if (c) relatedCodesB.push(c);
          }

          var updatedIchiStatus = Object.assign({}, prev.ichiStatus);
          for (var idxc = 0; idxc < relatedCodesB.length; idxc++) {
            updatedIchiStatus[relatedCodesB[idxc]] = "bold";
          }

          var combined = [].concat(prev.savedAssessments || [], [assessmentName]);
          var uniq = Array.from(new Set(combined));

          var updatedFormDataByAssessment = Object.assign({}, prev.formDataByAssessment || {});
          updatedFormDataByAssessment[assessmentName] = typeof formData !== "undefined" && formData !== null ? formData : (prev.formDataByAssessment ? prev.formDataByAssessment[assessmentName] : {});

          nextMap[shortB] = Object.assign({}, prev, {
            ichiStatus: updatedIchiStatus,
            savedAssessments: uniq,
            formDataByAssessment: updatedFormDataByAssessment
          });
        }
        return nextMap;
      });

      // update UI working state for currently selected ICF so user sees immediate effect
      if (selectedICF) {
        var icfObjSel = mapping && mapping.ICF ? mapping.ICF[selectedICF] : null;
        if (!icfObjSel) {
          if (mergedMappingAcrossICDs && mergedMappingAcrossICDs.ICF && mergedMappingAcrossICDs.ICF[selectedICF]) icfObjSel = mergedMappingAcrossICDs.ICF[selectedICF];
        }
        var relatedRawSel = (icfObjSel && icfObjSel.Relations && icfObjSel.Relations[assessmentName]) ? icfObjSel.Relations[assessmentName] : [];
        var relatedCodesSel = [];
        for (var s = 0; s < relatedRawSel.length; s++) {
          var rels = relatedRawSel[s];
          var codeSel = (rels && (rels.split("–")[0] || rels.split("-")[0] || "").trim()) || null;
          if (codeSel) relatedCodesSel.push(codeSel);
        }

        if (relatedCodesSel.length > 0) {
          setIchiStatus(function (prev) {
            var next = Object.assign({}, prev);
            for (var p = 0; p < relatedCodesSel.length; p++) { next[relatedCodesSel[p]] = "bold"; }
            return next;
          });
        }

        setSavedAssessments(function (prev) {
          if (prev.indexOf(assessmentName) !== -1) return prev;
          return prev.concat([assessmentName]);
        });

        setFormDataByAssessment(function (prev) {
          var next = Object.assign({}, prev);
          next[assessmentName] = typeof formData !== "undefined" && formData !== null ? formData : (prev[assessmentName] || {});
          return next;
        });
      }

      // build final submission row (includes leftover ICHI fields)
      var row = {
        id: Date.now() + "_" + Math.random().toString(36).slice(2, 8),
        assessmentName: assessmentName,
        formData: typeof formData !== "undefined" && formData !== null ? formData : null,
        icds: Array.from(icdSetForRow),
        icfShorts: icfShortsForRow,
        icfLabelsFull: icfLabelsFullForRow,
        ichiCodes: Array.from(ichiCodesForRow),
        ichiFullLabels: ichiFullLabelsArr,
        leftIchiCodes: leftIchiCodesArr,
        leftIchiFullLabels: leftIchiFullLabelsArr,
        timestamp: new Date().toISOString()
      };

      setSubmittedRows(function (prev) {
        return prev.concat([row]);
      });

      // update lastSaveLog for debugging (keep last 10)
      setLastSaveLog(function (prev) {
        var entry = { when: new Date().toISOString(), assessmentName: assessmentName, icds: Array.from(icdSetForRow), icfs: icfShortsForRow, ichi: ichiFullLabelsArr };
        var next = (prev || []).concat([entry]);
        if (next.length > 10) next = next.slice(next.length - 10);
        return next;
      });

      setLastAction("Saved " + assessmentName + " → " + icfShortsForRow.join(", "));
      console.log("[saveAssessment] saved row:", row);
    } catch (err) {
      console.error("[saveAssessment] error:", err);
      setLastError("saveAssessment error: " + (err && err.message ? err.message : String(err)));
    }
  } // end saveAssessment

  // unbolded codes list memo
  var unboldedCodes = useMemo(function () {
    var keys = Object.keys(ichiStatus || {});
    var out = [];
    for (var i = 0; i < keys.length; i++) {
      var code = keys[i];
      if (ichiStatus[code] !== "bold") out.push(code);
    }
    return out;
  }, [ichiStatus]);

  function setApplicability(code, value) {
    setUnboldedApplicability(function (prev) { return Object.assign({}, prev, { [code]: value }); });
  }

  function finalSaveUnbolded() {
    if (!shortICF) {
      alert("Select an ICF first.");
      return;
    }
    var toAdd = unboldedCodes.filter(function (code) { return unboldedApplicability[code] === "applicable"; });
    if (!toAdd || toAdd.length === 0) {
      // still store applicability choices
      setIcfSavedMap(function (prev) {
        var next = Object.assign({}, prev);
        next[shortICF] = Object.assign({}, next[shortICF] || {}, { ichiStatus: ichiStatus, savedAssessments: savedAssessments, formDataByAssessment: formDataByAssessment, unboldedApplicability: unboldedApplicability, manualAddedIchi: manualAddedIchi });
        return next;
      });
      alert("No 'Applicable' unbolded ICHI selected. Applicability saved.");
      return;
    }

    setIchiStatus(function (prev) {
      var next = Object.assign({}, prev);
      for (var i = 0; i < toAdd.length; i++) { next[toAdd[i]] = "bold"; }
      return next;
    });

    setManualAddedIchi(function (prev) {
      var s = new Set(prev || []);
      for (var i = 0; i < toAdd.length; i++) s.add(toAdd[i]);
      return Array.from(s);
    });

    console.log("Added applicable unbolded codes:", toAdd);
    alert((toAdd.length || 0) + " ICHI added to related list.");
  }

  function markAllNotApplicable() {
    var next = Object.assign({}, unboldedApplicability);
    for (var i = 0; i < unboldedCodes.length; i++) { next[unboldedCodes[i]] = "not_applicable"; }
    setUnboldedApplicability(next);
  }
// final related ICHI for active ICF (missing in current file — add this)
var finalRelatedIchi = useMemo(function () {
  if (!activeICF) return manualAddedIchi || [];
  var sset = new Set(manualAddedIchi || []);
  for (var i = 0; i < (savedAssessments || []).length; i++) {
    var aName = savedAssessments[i];
    var arr = activeICF.Relations && activeICF.Relations[aName] ? activeICF.Relations[aName] : [];
    for (var j = 0; j < arr.length; j++) {
      var r = arr[j];
      var code = (r && (r.split("–")[0] || r.split("-")[0] || "").trim());
      if (code) sset.add(code);
    }
  }
  return Array.from(sset);
}, [activeICF, savedAssessments, manualAddedIchi]);

  // NEW: left selection helpers
  function toggleLeftIchiSelection(code) {
    setSelectedLeftIchiCodes(function (prev) {
      var next = prev ? prev.slice() : [];
      if (next.indexOf(code) !== -1) return next.filter(function (c) { return c !== code; });
      next.push(code);
      return next;
    });
  }

  function addSelectedLeftIchiToManual() {
    if (!selectedLeftIchiCodes || selectedLeftIchiCodes.length === 0) {
      alert("Select at least one Left ICHI to add.");
      return;
    }

    // update manualAddedIchi (dedupe)
    setManualAddedIchi(function (prev) {
      var s = new Set(prev || []);
      selectedLeftIchiCodes.forEach(function (c) { s.add(c); });
      return Array.from(s);
    });

    // update ichiStatus to bold for codes
    setIchiStatus(function (prev) {
      var next = Object.assign({}, prev);
      selectedLeftIchiCodes.forEach(function (c) {
        next[c] = "bold";
      });
      return next;
    });

    // persist into icfSavedMap for current shortICF if present
    if (shortICF) {
      setIcfSavedMap(function (prev) {
        var next = Object.assign({}, prev);
        var prevEntry = next[shortICF] || { ichiStatus: {}, savedAssessments: [], formDataByAssessment: {}, unboldedApplicability: {}, manualAddedIchi: [] };
        var mergedManual = new Set(prevEntry.manualAddedIchi || []);
        selectedLeftIchiCodes.forEach(function (c) { mergedManual.add(c); });
        prevEntry.manualAddedIchi = Array.from(mergedManual);

        var updatedIchiStatus = Object.assign({}, prevEntry.ichiStatus || {});
        selectedLeftIchiCodes.forEach(function (c) { updatedIchiStatus[c] = "bold"; });
        prevEntry.ichiStatus = updatedIchiStatus;

        next[shortICF] = prevEntry;
        return next;
      });
    }

    alert((selectedLeftIchiCodes.length) + " ICHI added to Manual additions and marked bold.");
    setSelectedLeftIchiCodes([]);
  }

  // NEW: remove single manual added ICHI (from manualAddedIchi array and persisted map)
  function removeManualAddedIchi(codeToRemove) {
    setManualAddedIchi(function (prev) {
      var nextArr = (prev || []).filter(function (c) { return c !== codeToRemove; });
      // update persisted icfSavedMap entry for current shortICF
      if (shortICF) {
        setIcfSavedMap(function (pm) {
          var nextMap = Object.assign({}, pm);
          var entry = nextMap[shortICF] || { ichiStatus: {}, savedAssessments: [], formDataByAssessment: {}, unboldedApplicability: {}, manualAddedIchi: [] };
          entry.manualAddedIchi = (entry.manualAddedIchi || []).filter(function (c) { return c !== codeToRemove; });
          // optionally set ichiStatus back to grey (only if present)
          if (entry.ichiStatus && entry.ichiStatus[codeToRemove]) entry.ichiStatus[codeToRemove] = "grey";
          nextMap[shortICF] = entry;
          return nextMap;
        });
      }
      // update ichiStatus in UI as well
      setIchiStatus(function (prevStatus) {
        var nextStatus = Object.assign({}, prevStatus);
        if (nextStatus[codeToRemove]) nextStatus[codeToRemove] = "grey";
        return nextStatus;
      });
      return nextArr;
    });
  }

  // assessmentsToShow: all unique assessments from mappingToUse (no ICF filter)
  var assessmentsToShow = useMemo(function () {
    var seen = new Set();
    var result = [];
    if (!mappingToUse || !mappingToUse.ICF) return result;
    var keys = Object.keys(mappingToUse.ICF);
    for (var i = 0; i < keys.length; i++) {
      var icfLabel = keys[i];
      var icfObj = mappingToUse.ICF[icfLabel];
      var arr = (icfObj && icfObj.Assessments && icfObj.Assessments[activeAssessTab]) ? icfObj.Assessments[activeAssessTab] : [];
      for (var j = 0; j < arr.length; j++) {
        var aName = arr[j];
        if (!seen.has(aName)) {
          seen.add(aName);
          result.push(aName);
        }
      }
    }
    return result;
  }, [mappingToUse, activeAssessTab]);
function saveProgressReport() {
  if (!patient || !patient.id) {
    alert("No patient selected.");
    return;
  }

  const key = `patient_${patient.id}_reports`;
  const existing = JSON.parse(localStorage.getItem(key) || "[]");

  // ✅ FETCH latest diet initial assessment
  const dietInitialKey = `patient_${patient.id}_diet_initial`;
  const dietInitial = JSON.parse(localStorage.getItem(dietInitialKey) || "null");

  const report = {
    createdBy: "Doctor",
    type: "progress",
    timestamp: new Date().toISOString(),

    // ✅ STORE FULL SNAPSHOT
    patientSnapshot: {
      id: patient.id,
      name: patient.name,
      age: patient.age,
      sex: patient.sex,
      ward: patient.ward,
      diagnosis: patient.icd,
    },

    // ✅ STORE FULL DIET INITIAL FORM
    dietInitial,

    plan: {
      initiateNutrition: actionInitiateNutrition ? noteInitiateNutrition : "",
      orderConsult: actionOrderConsult ? noteOrderConsult : "",
      monitorIntake: actionMonitorIntake ? noteMonitorIntake : "",
      supplements: actionSupplements ? noteSupplements : "",
      documentPlan: actionDocumentPlan ? noteDocumentPlan : "",
      otherPlan,
    },

    goals: {
      shortTerm: shortTermGoals,
      longTerm: longTermGoals,
    },
  };

  const next = [...existing, report];
  localStorage.setItem(key, JSON.stringify(next));

  alert("✅ Progress report saved with Patient + Diet Initial + Goals");
}




  // clear persisted (dev)
  function clearAllPersistedForPatient() {
    try {
      localStorage.removeItem(storageKey);
      localStorage.removeItem(submissionsStorageKey);
      localStorage.removeItem(finalSubmissionStorageKey);
      localStorage.removeItem(followupStorageKey);
      setIcfSavedMap({});
      setIchiStatus({});
      setSavedAssessments([]);
      setFormDataByAssessment({});
      setUnboldedApplicability({});
      setManualAddedIchi([]);
      setSelectedICFsFilter([]);
      setSubmittedRows([]);
      setLastSaveLog([]);
      setLastError(null);
      setLastAction("Cleared persisted data");
      setFinalSubmissionInfo(null);
      setEditMode(false);
      alert("All persisted data for this patient cleared.");
    } catch (err) { console.warn("clear error", err); setLastError("clear error: " + (err && err.message ? err.message : String(err))); }
  }

  // ------------------ Final submission handling ------------------
  function finalizePatientSubmission() {
    if (!window.confirm("Finalise patient submission? After finalising, editing will be locked after 6 hours. Proceed?")) return;
    var info = { when: new Date().toISOString() };
    setFinalSubmissionInfo(info);
    localStorage.setItem(finalSubmissionStorageKey, JSON.stringify(info));
    // mark patient as followup
    localStorage.setItem(followupStorageKey, JSON.stringify({ followup: true, at: info.when }));
    alert("Patient finalised. You can edit for up to 6 hours from now using the Edit button.");
  }

  // returns true if edit button should be visible (within 6 hours of final submission)
  function isEditWindowOpen() {
    if (!finalSubmissionInfo || !finalSubmissionInfo.when) return false;
    var then = new Date(finalSubmissionInfo.when).getTime();
    var now = Date.now();
    var ms6hr = 6 * 60 * 60 * 1000;
    return (now - then) <= ms6hr;
  }

  // toggle edit mode (only allowed if within 6 hours)
  function handleToggleEditMode() {
    if (!finalSubmissionInfo) {
      // nothing to toggle (patient not finalised) — enable edit mode
      setEditMode(true);
      alert("Edit mode enabled for this patient.");
      return;
    }
    if (!isEditWindowOpen()) {
      alert("Edit window closed (more than 6 hours since final submission). Editing not allowed.");
      return;
    }
    setEditMode(!editMode);
    if (!editMode) alert("Edit mode enabled. Save your changes. When finished, you may 'Finalise' again.");
  }

  // build patient summary HTML and open print window (user can save as PDF using browser)
  function generatePatientSummaryPDF() {
    // Compose HTML for the summary
    var html = `
      <html>
      <head>
        <title>Patient Summary - ${patient.name || "Patient"}</title>
        <style>
          body { font-family: Arial, Helvetica, sans-serif; padding: 24px; color: #111 }
          h1 { margin-top:0; }
          .section { margin-bottom: 18px; }
          table { width:100%; border-collapse: collapse; margin-top:8px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align:left; vertical-align: top; }
          th { background: #f6f6f6; }
        </style>
      </head>
      <body>
        <h1>Patient Summary</h1>
        <div class="section"><strong>Name:</strong> ${patient.name || ""} <br/><strong>ID:</strong> ${patient.id || ""} <br/><strong>Department:</strong> ${department}</div>

        <div class="section">
          <h3>Final status</h3>
          <div>Finalised: ${finalSubmissionInfo ? "YES" : "NO"}</div>
          ${finalSubmissionInfo ? `<div>Finalised at: ${new Date(finalSubmissionInfo.when).toLocaleString()}</div>` : ""}
        </div>

        <div class="section">
          <h3>Submissions</h3>
          ${submittedRows && submittedRows.length > 0 ? `
            <table>
              <thead><tr><th>Time</th><th>Assessment</th><th>ICFs</th><th>ICHI (relations)</th><th>Left ICHI</th></tr></thead>
              <tbody>
                ${submittedRows.map(r => `<tr>
                  <td>${new Date(r.timestamp).toLocaleString()}</td>
                  <td>${r.assessmentName}</td>
                  <td>${(r.icfShorts || []).join(", ")}</td>
                  <td>${(r.ichiFullLabels || r.ichi || []).join(", ")}</td>
                  <td>${(r.leftIchiFullLabels || []).join(", ")}</td>
                </tr>`).join("")}
              </tbody>
            </table>` : "<div>No submissions recorded.</div>"
        }
        </div>

        <div class="section">
          <h3>Manual additions</h3>
          ${manualAddedIchi && manualAddedIchi.length > 0 ? `<ul>${manualAddedIchi.map(c => `<li>${c} — ${globalIchiLabelMap[c] || ""}</li>`).join("")}</ul>` : "<div>None</div>"}
        </div>

        <div class="section">
          <h3>Per-ICF saved state</h3>
          ${Object.keys(icfSavedMap || {}).length > 0 ? `<pre>${JSON.stringify(icfSavedMap, null, 2)}</pre>` : "<div>None</div>"}
        </div>

        <div style="margin-top:24px;"><em>Generated at ${new Date().toLocaleString()}</em></div>
      </body>
      </html>
    `;

    var newWin = window.open("", "_blank", "noopener,noreferrer");
    if (!newWin) {
      alert("Popup blocked. Allow popups or use the browser print/save functionality.");
      return;
    }
    newWin.document.open();
    newWin.document.write(html);
    newWin.document.close();
    // Give the new window a moment to render then call print
    setTimeout(function () {
      try { newWin.focus(); newWin.print(); } catch (err) { console.warn("print error", err); }
    }, 400);
  }

  // when patient is finalised and user confirms, mark as followup in localStorage
  useEffect(function () {
    if (finalSubmissionInfo) {
      localStorage.setItem(followupStorageKey, JSON.stringify({ followup: true, at: finalSubmissionInfo.when }));
    }
  }, [finalSubmissionInfo, followupStorageKey]);

  // assessmentsToShow: (same as before)
  // ... (already defined earlier) - no changes

  // ---------------- Render ----------------
  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <button onClick={onBack} style={{ marginRight: 12 }}>← Back</button>
          <strong style={{ fontSize: 16 }}>{(patient && patient.name) ? patient.name : "Patient"}</strong>
          {finalSubmissionInfo ? <span style={{ marginLeft: 10, color: "#2b7a0b" }}> — Finalised</span> : null}
          {editMode ? <span style={{ marginLeft: 10, color: "#a25b00" }}> — Edit mode</span> : null}
        </div>

        <div style={{ display: "flex", gap: 8 }}>
          {/* Finalise / Edit / Patient summary actions */}
          {!finalSubmissionInfo ? (
            <button
              onClick={finalizePatientSubmission}
              style={{ padding: "8px 12px", borderRadius: 6, background: "#0050ff", color: "#fff" }}
            >
              Final submission
            </button>
          ) : (
            <>
              {/* Edit button visible only inside 6 hour window */}
              {isEditWindowOpen() ? (
                <button
                  onClick={handleToggleEditMode}
                  style={{ padding: "8px 12px", borderRadius: 6, background: editMode ? "#ffc107" : "#28a745", color: "#fff" }}
                >
                  {editMode ? "Exit Edit" : "Edit"}
                </button>
              ) : (
                <button title="Edit window closed" disabled style={{ padding: "8px 12px", borderRadius: 6, background: "#ddd", color: "#888" }}>Edit (closed)</button>
              )}

              {/* Patient summary always available */}
              <button
                onClick={generatePatientSummaryPDF}
                style={{ padding: "8px 12px", borderRadius: 6, background: "#6c757d", color: "#fff" }}
              >
                Patient Summary (PDF)
              </button>
            </>
          )}

          <button onClick={clearAllPersistedForPatient} title="Clear all persisted data for this patient">Clear saved (dev)</button>
        </div>
      </div>

      <hr style={{ margin: "12px 0" }} />

      {/* ICD multiselect checkbox dropdown */}
      <div style={{ marginBottom: 12, position: "relative" }} ref={icdDropdownRef}>
        <p>Doctors Selected ICD: Stroke</p>
        <label style={{ display: "block", fontWeight: "600", marginBottom: 6 }}>Select ICD</label>

        <div
          onClick={() => setIcdDropdownOpen(o => !o)}
          style={{
            border: "1px solid #ccc",
            padding: "8px 10px",
            borderRadius: 6,
            cursor: "pointer",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "#fff",
            minHeight: 44
          }}
        >
          <div style={{ color: "#333" }}>
            {selectedICDs && selectedICDs.length > 0
              ? (selectedICDs.length === 1 ? selectedICDs[0] : `${selectedICDs.length} selected`)
              : <em style={{ color: "#666" }}>Select ICD(s)</em>}
          </div>
          <div style={{ fontSize: 12, color: "#666" }}>{icdDropdownOpen ? "▲" : "▼"}</div>
        </div>

        {icdDropdownOpen && (
          <div style={{
            position: "absolute",
            top: 52,
            left: 0,
            width: 360,
            zIndex: 1000,
            border: "1px solid #ddd",
            background: "#fff",
            boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
            borderRadius: 6,
            padding: 10,
            maxHeight: 320,
            overflow: "auto"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <button type="button" onClick={selectAllICDs} style={{ padding: "6px 8px", borderRadius: 6 }}>Select all</button>
              <button type="button" onClick={clearAllICDs} style={{ padding: "6px 8px", borderRadius: 6 }}>Clear</button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {ICD_LIST && ICD_LIST.map(icd => {
                const checked = selectedICDs && selectedICDs.indexOf(icd) !== -1;
                return (
                  <label key={icd} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", padding: "6px 4px", borderRadius: 4 }}>
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleSelectedICD(icd)}
                    />
                    <span style={{ fontSize: 14 }}>{icd}</span>
                  </label>
                );
              })}
            </div>

            <div style={{ marginTop: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <small style={{ color: "#666" }}>
                {selectedICDs && selectedICDs.length > 0 ? `${selectedICDs.length} selected` : "None selected"}
              </small>
              <button type="button" onClick={() => setIcdDropdownOpen(false)} style={{ padding: "6px 8px", borderRadius: 6 }}>Done</button>
            </div>
          </div>
        )}

        {/* visible summary under dropdown */}
        <div style={{ marginTop: 8, fontSize: 13, color: "#333" }}>
          Selected: {selectedICDs.length === 0 ? <em>None</em> : selectedICDs.join(", ")}
        </div>
      </div>

      {/* ASSESSMENTS PANEL (visible even when no ICF selected) */}
      {mappingToUse && (
        <div style={{ marginTop: 8 }}>
          <div style={{ marginBottom: 10 }}>
            <button onClick={() => setActiveAssessTab("subjective")} style={{ marginRight: 8, padding: "8px 12px", borderRadius: 6, background: activeAssessTab === "subjective" ? "#007bff" : "#fff", color: activeAssessTab === "subjective" ? "#fff" : "#000" }}>Assessments</button>
            <button onClick={() => setActiveAssessTab("objective")} style={{ padding: "8px 12px", borderRadius: 6, background: activeAssessTab === "objective" ? "#007bff" : "#fff", color: activeAssessTab === "objective" ? "#fff" : "#000" }}>Assessments (Equipment)</button>
          </div>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
            {assessmentsToShow.length === 0 ? <div style={{ color: "#666" }}>No assessments available for the selected tab.</div> :
              assessmentsToShow.map(function (a) {
                return (
                  <button
                    key={a}
                    onClick={() => setSelectedAssessment(a)}
                    style={{
                      padding: "8px 10px",
                      borderRadius: 6,
                      background: selectedAssessment === a ? "#0c3161ff" : "#007bff",
                      border: selectedAssessment === a ? "2px solid #333" : "1px solid #007bff",
                      cursor: "pointer",
                      color: "#fff"
                    }}
                  >
                    {a}
                  </button>
                );
              })
            }
          </div>

          <div>
            {/* if finalized and not in edit mode, disable the AssessmentRenderer by showing a notice */}
            {(finalSubmissionInfo && !editMode) ? (
              <div style={{ padding: 12, borderRadius: 6, background: "#fff3cd", border: "1px solid #ffeeba" }}>
                <strong>Patient finalised — editing locked.</strong>
                <div style={{ marginTop: 8 }}>You cannot save new assessments. Use Patient Summary to export or wait for an admin to reopen editing.</div>
              </div>
            ) : (
              <AssessmentRenderer selected={selectedAssessment} onBack={() => setSelectedAssessment(null)} onSave={saveAssessment} initialFormData={formDataByAssessment[selectedAssessment] || null} />
            )}
          </div>
        </div>
      )}

      {/* Submissions table: always visible (below assessments) */}
      <div style={{ marginTop: 20 }}>
        <b><p>Submitted assessments (auto-linked ICF / ICHI)</p></b>
        {(!submittedRows || submittedRows.length === 0) ? (
          <p style={{ color: "#666" }}>No submissions yet.</p>
        ) : (
          <div style={{ overflowX: "auto", border: "1px solid #eee", borderRadius: 6 }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ textAlign: "left", background: "#fafafa" }}>
                  <th style={{ padding: 8, borderBottom: "1px solid #eee" }}>Submitted Time</th>
                  <th style={{ padding: 8, borderBottom: "1px solid #eee" }}>Assessment</th>
                  <th style={{ padding: 8, borderBottom: "1px solid #eee" }}>ICFs</th>
                  <th style={{ padding: 8, borderBottom: "1px solid #eee" }}>ICHI</th>
                  <th style={{ padding: 8, borderBottom: "1px solid #eee" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {submittedRows.map(function (row, idx) {
                  return (
                    <tr key={row.id}>
                      <td style={{ padding: 8, borderTop: "1px solid #f5f5f5", verticalAlign: "top" }}>{new Date(row.timestamp).toLocaleString()}</td>
                      <td style={{ padding: 8, borderTop: "1px solid #f5f5f5" }}>{row.assessmentName}</td>
                      <td style={{ padding: 8, borderTop: "1px solid #f5f5f5" }}>{(row.icfShorts || []).join(", ")}</td>
                      <td style={{ padding: 8, borderTop: "1px solid #f5f5f5" }}>{(row.ichiFullLabels || row.ichi || []).join(", ")}</td>
                      <td style={{ padding: 8, borderTop: "1px solid #f5f5f5" }}>
                    
                        {/* <button onClick={() => { setSelectedSubmissionIndex(idx); setSelectedLeftIchiCodes([]); window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }); }} style={{ padding: "6px 8px", borderRadius: 6 }}>Select Left ICHI</button> */}
                        <button onClick={() => alert(JSON.stringify(row, null, 2))} style={{ padding: "6px 8px", borderRadius: 6, marginLeft: 8 }}>View</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

        <div style={{padding:20, background: "white",
          padding: 20,
          marginTop:20,
          borderRadius: 10,
          border: "1px solid #ddd",
          marginBottom: 20,
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)"}} className="card">

<div
  style={{
    padding: 20,
    background: "white",
    marginTop: 20,
    borderRadius: 10,
    border: "1px solid #ddd",
    marginBottom: 20,
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
  }}
  className="card"
>
  <h3>Intervention</h3>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: 12,
      marginTop: 8,
    }}
  >
    {/* 1. Initiate nutritional intervention */}
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
        <input
          type="checkbox"
          checked={actionInitiateNutrition}
          onChange={() =>
            setActionInitiateNutrition(!actionInitiateNutrition)
          }
        />
        <div>
          <div style={{ fontWeight: 700 }}>
            Initiate nutritional intervention
          </div>
          <div style={styles.small}>
            Start targeted interventions (meals, supplements)
          </div>
        </div>
      </label>

      {actionInitiateNutrition && (
        <textarea
          style={styles.textarea}
          placeholder="Add details for this intervention..."
          value={noteInitiateNutrition}
          onChange={(e) => setNoteInitiateNutrition(e.target.value)}
        />
      )}
    </div>

    {/* 2. Order nutrition consult */}
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
        <input
          type="checkbox"
          checked={actionOrderConsult}
          onChange={() => setActionOrderConsult(!actionOrderConsult)}
        />
        <div>
          <div style={{ fontWeight: 700 }}>Order nutrition consult</div>
          <div style={styles.small}>Within 24–72 hours</div>
        </div>
      </label>

      {actionOrderConsult && (
        <textarea
          style={styles.textarea}
          placeholder="Add details for this intervention..."
          value={noteOrderConsult}
          onChange={(e) => setNoteOrderConsult(e.target.value)}
        />
      )}
    </div>

    {/* 3. Monitor oral intake */}
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
        <input
          type="checkbox"
          checked={actionMonitorIntake}
          onChange={() => setActionMonitorIntake(!actionMonitorIntake)}
        />
        <div>
          <div style={{ fontWeight: 700 }}>Monitor oral intake</div>
          <div style={styles.small}>Record intake daily</div>
        </div>
      </label>

      {actionMonitorIntake && (
        <textarea
          style={styles.textarea}
          placeholder="Add details for this intervention..."
          value={noteMonitorIntake}
          onChange={(e) => setNoteMonitorIntake(e.target.value)}
        />
      )}
    </div>

    {/* 4. Start supplements / consider enteral */}
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
        <input
          type="checkbox"
          checked={actionSupplements}
          onChange={() => setActionSupplements(!actionSupplements)}
        />
        <div>
          <div style={{ fontWeight: 700 }}>
            Start supplements / consider enteral
          </div>
          <div style={styles.small}>If intake insufficient</div>
        </div>
      </label>

      {actionSupplements && (
        <textarea
          style={styles.textarea}
          placeholder="Add details for this intervention..."
          value={noteSupplements}
          onChange={(e) => setNoteSupplements(e.target.value)}
        />
      )}
    </div>

    {/* 5. Document follow-up plan (full-width) */}
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 6,
        
      }}
    >
      <label style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
        <input
          type="checkbox"
          checked={actionDocumentPlan}
          onChange={() => setActionDocumentPlan(!actionDocumentPlan)}
        />
        <div>
          <div style={{ fontWeight: 700 }}>Document follow-up plan</div>
          <div style={styles.small}>
            Include re-screen schedule & responsible clinician
          </div>
        </div>
      </label>

      {actionDocumentPlan && (
        <textarea
          style={styles.textarea}
          placeholder="Add details for this intervention..."
          value={noteDocumentPlan}
          onChange={(e) => setNoteDocumentPlan(e.target.value)}
        />
      )}
    </div>
<div>
  <div style={{ fontWeight: 700 }}>Other Plan</div>
  <textarea
    style={styles.textarea}
    placeholder="Any other plan / instructions..."
    value={otherPlan}
    onChange={(e) => setOtherPlan(e.target.value)}
  />
</div>

  </div>

  {/* Short Term & Long Term Goals textareas can stay below if you still want them */}
</div>


               
                  {/* <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12, marginTop: 8 }}>
          <label style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <input type="checkbox" checked={actionInitiateNutrition} onChange={function () { setActionInitiateNutrition(!actionInitiateNutrition); }} />
            <div>
              <div style={{ fontWeight: 700 }}>Initiate nutritional intervention</div>
              <div style={styles.small}>Start targeted interventions (meals, supplements)</div>
            </div>
          </label>

          <label style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <input type="checkbox" checked={actionOrderConsult} onChange={function () { setActionOrderConsult(!actionOrderConsult); }} />
            <div>
              <div style={{ fontWeight: 700 }}>Order nutrition consult</div>
              <div style={styles.small}>Within 24–72 hours</div>
            </div>
          </label>

          <label style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <input type="checkbox" checked={actionMonitorIntake} onChange={function () { setActionMonitorIntake(!actionMonitorIntake); }} />
            <div>
              <div style={{ fontWeight: 700 }}>Monitor oral intake</div>
              <div style={styles.small}>Record intake daily</div>
            </div>
          </label>

          <label style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <input type="checkbox" checked={actionSupplements} onChange={function () { setActionSupplements(!actionSupplements); }} />
            <div>
              <div style={{ fontWeight: 700 }}>Start supplements / consider enteral</div>
              <div style={styles.small}>If intake insufficient</div>
            </div>
          </label>

          <label style={{ display: "flex", gap: 10, alignItems: "flex-start", gridColumn: "1 / -1" }}>
            <input type="checkbox" checked={actionDocumentPlan} onChange={function () { setActionDocumentPlan(!actionDocumentPlan); }} />
            <div>
              <div style={{ fontWeight: 700 }}>Document follow-up plan</div>
              <div style={styles.small}>Include re-screen schedule & responsible clinician</div>
            </div>
          </label>
        </div> */}

        {/* MEAL DURATION ALERT */}
        <div className="card">
          <h5>Meal-Plan Modifications</h5>

          {meals.map((meal) => (
            <div key={meal.key} style={{ marginBottom: 16 }}>
              <div style={mealGrid}>
                <div style={mealLabel}>{meal.label}</div>

                <select
                  style={styles.input}
                  value={form[`${meal.key}_diet`]}
                  onChange={(e) => setField(`${meal.key}_diet`, e.target.value)}
                >
                  <option value="">Select Diet...</option>
                  {dietOptions.map((opt) => (
                    <option key={opt}>{opt}</option>
                  ))}
                </select>

                <input
                  type="time"
                  style={styles.input}
                  value={form[`${meal.key}_time`]}
                  onChange={(e) => setField(`${meal.key}_time`, e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="card">
          <h3>Meal Duration & Kitchen Alert</h3>

          <div style={{ display: "flex", gap: 16 }}>
            <div style={{ flex: 1 }}>
              <label>From Date</label>
              <input
                type="date"
                style={styles.input}
                value={form.from_date}
                onChange={(e) => setField("from_date", e.target.value)}
              />
            </div>

            <div style={{ flex: 1 }}>
              <label>To Date</label>
              <input
                type="date"
                style={styles.input}
                value={form.to_date}
                onChange={(e) => setField("to_date", e.target.value)}
              />
            </div>
          </div>

          <button style={btnOrange} onClick={() => alert("Alert sent to kitchen!")}>
            Send Alert to Kitchen
          </button>
        </div>


<h3 style={{ paddingTop: 20 }}>Short Term Goals</h3>

<textarea
  style={styles.textarea}
  value={shortTermGoals}
  onChange={(e) => setShortTermGoals(e.target.value)}
/>

<h3 style={{ paddingTop: 40 }}>Long Term Goals</h3>

<textarea
  style={styles.textarea}
  value={longTermGoals}
  onChange={(e) => setLongTermGoals(e.target.value)}
/>

<h3 style={{ paddingTop: 40 }}>Assessment</h3>

<textarea
  style={styles.textarea}

/>

<h3 style={{ paddingTop: 40 }}>Plan</h3>

<textarea
  style={styles.textarea}
/>


<div style={{ marginTop: 16 }}>
  {/* row only for the buttons */}
  <div
    style={{
      display: "flex",
      justifyContent: "flex-end",
      gap: 8,
    }}
  >
    <button
      style={{
        padding: "8px 16px",
        background: "#2e7d32",
        color: "white",
        borderRadius: 6,
        border: "none",
        cursor: "pointer",
        fontWeight: 600,
      }}
      onClick={saveProgressReport}
    >
      💾 Save Report
    </button>

    <button
      style={btnReport}
      onClick={() => setShowProgressReports(true)}
    >
      📈 View Report
    </button>
  </div>

  {/* card appears below the button row */}
  {showProgressReports && (
    <div className="card" style={{ marginTop: 12, marginBottom: 20 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <button
          onClick={() => setShowProgressReports(false)}
          style={{
            padding: "4px 10px",
            background: "#ccc",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
            fontSize: 12,
          }}
        >
          ✖ Close
        </button>
      </div>

      <PatientReports patient={patient} mode="progress" />
    </div>
  )}
</div>


                          {/* <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12, marginTop: 8 }}>
          <label style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <input type="checkbox" checked={actionInitiateTNutrition} onChange={function () { setActionInitiateTNutrition(!actionInitiateTNutrition); }} />
            <div>
              <div style={{ fontWeight: 700 }}>Initiate nutritional intervention</div>
              <div style={styles.small}>Start targeted interventions (meals, supplements)</div>
            </div>
          </label>

          <label style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <input type="checkbox" checked={actionTOrderConsult} onChange={function () { setActionTOrderConsult(!actionTOrderConsult); }} />
            <div>
              <div style={{ fontWeight: 700 }}>Order nutrition consult</div>
              <div style={styles.small}>Within 24–72 hours</div>
            </div>
          </label>

          <label style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <input type="checkbox" checked={actionTMonitorIntake} onChange={function () { setActionTMonitorIntake(!actionTMonitorIntake); }} />
            <div>
              <div style={{ fontWeight: 700 }}>Monitor oral intake</div>
              <div style={styles.small}>Record intake daily</div>
            </div>
          </label>

          <label style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <input type="checkbox" checked={actionTSupplements} onChange={function () { setActionTSupplements(!actionTSupplements); }} />
            <div>
              <div style={{ fontWeight: 700 }}>Start supplements / consider enteral</div>
              <div style={styles.small}>If intake insufficient</div>
            </div>
          </label>

          <label style={{ display: "flex", gap: 10, alignItems: "flex-start", gridColumn: "1 / -1" }}>
            <input type="checkbox" checked={actionTDocumentPlan} onChange={function () { setActionTDocumentPlan(!actionTDocumentPlan); }} />
            <div>
              <div style={{ fontWeight: 700 }}>Document follow-up plan</div>
              <div style={styles.small}>Include re-screen schedule & responsible clinician</div>
            </div>
          </label>
        </div> */}




           {/* <p style={{paddingTop:40}}>Any Additions</p>
          <textarea
            style={styles.textarea}
            value={form.diagnosis_signs}
            onChange={(e) => setField("diagnosis_signs", e.target.value)}
          /> */}

{/* <div style={{ border: '1px solid #ddd', padding: '20px', width: '80%', margin: 'auto', backgroundColor: '#f9f9f9' }}>
    <h3>Interventions</h3>
    <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
        <li><input type="checkbox" /> Initiate nutritional intervention (Start targeted interventions: meals, supplements)</li>
        <li><input type="checkbox" /> Monitor oral intake (Record intake daily)</li>
        <li><input type="checkbox" /> Document follow-up plan (Include re-screen schedule & responsible clinician)</li>
        <li><input type="checkbox" /> Order nutrition consult (Within 24-72 hours)</li>
        <li><input type="checkbox" /> Start supplements / consider enteral (If intake insufficient)</li>
    </ul>
</div> */}


        </div>

      {/* Left ICHI multi-select panel */}
      <div style={{ marginTop: 18, padding: 12, border: "1px solid #ddd", borderRadius: 8, background: "#fff" }}>
        <h4 style={{ marginTop: 0 }}>Remaining ICHI</h4>
        {(!submittedRows || submittedRows.length === 0) ? (
          <div style={{ color: "#666" }}>No submissions available to pick Left ICHI from.</div>
        ) : (
          <div>
            <div style={{ marginBottom: 10, display: "flex", gap: 8, alignItems: "center" }}>
              <label style={{ fontWeight: 600 }}>Pick submission:</label>
              <select
                value={selectedSubmissionIndex === null ? "" : selectedSubmissionIndex}
                onChange={(e) => {
                  var idx = e.target.value === "" ? null : parseInt(e.target.value, 10);
                  setSelectedSubmissionIndex(idx);
                  setSelectedLeftIchiCodes([]);
                }}
                style={{ padding: "6px 8px", borderRadius: 6 }}
              >
                <option value="">-- choose submission --</option>
                {submittedRows.map(function (row, idx) {
                  return <option key={row.id} value={idx}>{new Date(row.timestamp).toLocaleString()} — {row.assessmentName}</option>;
                })}
              </select>

              <div style={{ marginLeft: "auto", color: "#666", fontSize: 13 }}>
                Selected: {selectedSubmissionIndex === null ? <em>None</em> : new Date(submittedRows[selectedSubmissionIndex].timestamp).toLocaleString()}
              </div>
            </div>

            {selectedSubmissionIndex === null ? (
              <div style={{ color: "#666" }}>Choose a submission above to view and select its Left ICHI.</div>
            ) : (
              (function renderLeftIchiList() {
                var row = submittedRows[selectedSubmissionIndex];
                var leftLabels = row && row.leftIchiFullLabels ? row.leftIchiFullLabels : [];
                var leftCodes = row && row.leftIchiCodes ? row.leftIchiCodes : [];

                if (!leftLabels || leftLabels.length === 0) {
                  return <div style={{ color: "#666" }}>No Left ICHI for this submission.</div>;
                }

                // Build list of {code, label} ensuring alignment (if only labels exist, we show labels and use label as id)
                var items = [];
                for (var i = 0; i < leftLabels.length; i++) {
                  var lbl = leftLabels[i];
                  var code = (leftCodes && leftCodes[i]) ? leftCodes[i] : (lbl.split(" ")[0] || lbl);
                  items.push({ code: code, label: lbl });
                }

                return (
                  <div>
                    <div style={{ maxHeight: 260, overflowY: "auto", padding: 8, border: "1px solid #f0f0f0", borderRadius: 6, background: "#fafafa" }}>
                      {items.map(function (it) {
                        var checked = selectedLeftIchiCodes && selectedLeftIchiCodes.indexOf(it.code) !== -1;
                        return (
                          <label key={it.code} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 4px", borderBottom: "1px dashed #eee" }}>
                            <input type="checkbox" checked={checked} onChange={() => toggleLeftIchiSelection(it.code)} />
                            <span style={{ fontSize: 14 }}>{it.label}</span>
                          </label>
                        );
                      })}
                    </div>

                    <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
                      <button onClick={addSelectedLeftIchiToManual} style={{ padding: "8px 12px", borderRadius: 6, background: "#28a745", color: "#fff" }}>Add selected to Manual additions</button>
                      <button onClick={() => setSelectedLeftIchiCodes([])} style={{ padding: "8px 12px", borderRadius: 6 }}>Clear selection</button>
                    </div>

                    <div style={{ marginTop: 10, color: "#666" }}>
                      <small>Tip: After adding, open the active ICF to see the codes reflected under 'ICHIs related to saved assessments (including manual additions)'.</small>
                    </div>
                  </div>
                );
              })()
            )}
          </div>
        )}
      </div>

      {/* NEW: Table showing manual additions (manualAddedIchi) */}
      <div style={{ marginTop: 16, padding: 12, border: "1px solid #ddd", borderRadius: 8, background: "#fff" }}>
        <h4 style={{ marginTop: 0 }}>Added ICHI (manual additions)</h4>
        {(!manualAddedIchi || manualAddedIchi.length === 0) ? (
          <div style={{ color: "#666" }}>No manual additions yet.</div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ textAlign: "left", background: "#fafafa" }}>
                  <th style={{ padding: 8, borderBottom: "1px solid #eee" }}>ICHI Code</th>
                  <th style={{ padding: 8, borderBottom: "1px solid #eee" }}>Full label</th>
                  <th style={{ padding: 8, borderBottom: "1px solid #eee" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {manualAddedIchi.map(function (code) {
                  var label = globalIchiLabelMap[code] || code;
                  return (
                    <tr key={code}>
                      <td style={{ padding: 8, borderTop: "1px solid #f5f5f5", verticalAlign: "top" }}>{code}</td>
                      <td style={{ padding: 8, borderTop: "1px solid #f5f5f5" }}>{label}</td>
                      <td style={{ padding: 8, borderTop: "1px solid #f5f5f5" }}>
                        <button onClick={() => removeManualAddedIchi(code)} style={{ padding: "6px 8px", borderRadius: 6 }}>Remove</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Active ICF details */}
      {activeICF && (
        <div style={{ marginTop: 8 }}>
          {icfMeta && (
            <div style={{ marginBottom: 18, padding: 12, borderRadius: 8, background: "#fbfbfb", border: "1px solid #eee" }}>
              <div><strong>ICF code:</strong> {shortICF}</div>
              {icfMeta.title && <div><strong>Title:</strong> {icfMeta.title}</div>}
              {icfMeta.hierarchy && (
                <div>
                  <strong>Hierarchy:</strong>
                  <div>{icfMeta.hierarchy.map(function (item, index) { return <div key={index}>{item}</div>; })}</div>
                </div>
              )}
            </div>
          )}

          <div>
            <div style={{ marginBottom: 16 }}>
              <h4 style={{ margin: "6px 0" }}>ICHI for {selectedICF}</h4>

              <div style={{ marginTop: 8 }}>
                <div style={{ marginBottom: 10 }}>
                  <button onClick={() => setActiveAssessTab("subjective")} style={{ marginRight: 8, padding: "8px 12px", borderRadius: 6, background: activeAssessTab === "subjective" ? "#007bff" : "#fff", color: activeAssessTab === "subjective" ? "#fff" : "#000" }}>Assessment</button>
                  <button onClick={() => setActiveAssessTab("objective")} style={{ padding: "8px 12px", borderRadius: 6, background: activeAssessTab === "objective" ? "#007bff" : "#fff", color: activeAssessTab === "objective" ? "#fff" : "#000" }}>Equipment Based Assessment</button>
                </div>

                <div style={{ marginTop: 20, padding: 12, borderRadius: 8, border: "1px dashed #ccc" }}>
                  <h4 style={{ marginTop: 0 }}>Saved assessments (for this ICF)</h4>
                  {(!savedAssessments || savedAssessments.length === 0) ? <p>None yet</p> : <ul>{savedAssessments.map(function (s) { return <li key={s}>{s}</li>; })}</ul>}

                  <h4 style={{ marginTop: 12 }}>ICHIs related to saved assessments (including manual additions)</h4>
                  {(!finalRelatedIchi || finalRelatedIchi.length === 0) ? <p>None yet</p> : <ul>{finalRelatedIchi.map(function (code) { return <li key={code}><strong>{code}</strong>{(manualAddedIchi || []).indexOf(code) !== -1 ? " (manually added)" : ""}</li>; })}</ul>}
                </div>
              </div>
            </div>

            <div>
              <h4 style={{ marginTop: 0 }}>Unbolded ICHI (set applicability)</h4>
              <div style={{ padding: 12, border: "1px solid #eee", borderRadius: 8, maxHeight: 520, overflowY: "auto" }}>
                {(!unboldedCodes || unboldedCodes.length === 0) ? <p>All ICHIs are bolded — none left to classify.</p> : (
                  <div>
                    {unboldedCodes.map(function (code) {
                      var fullLabel = code;
                      var found = false;
                      var icihi2 = activeICF.ICHI || [];
                      for (var ii3 = 0; ii3 < icihi2.length && !found; ii3++) {
                        var item2 = icihi2[ii3];
                        var lines2 = (item2 || "").split("\n").map(function (l) { return l.trim(); }).filter(Boolean);
                        for (var jj2 = 0; jj2 < lines2.length; jj2++) {
                          var line2 = lines2[jj2];
                          if (line2.indexOf(code) === 0) { fullLabel = line2; found = true; break; }
                        }
                      }
                      var current = unboldedApplicability[code] || "unknown";
                      return (
                        <div key={code} style={{ marginBottom: 12, paddingBottom: 8, borderBottom: "1px dashed #eee" }}>
                          <div style={{ marginBottom: 6 }}><strong>{fullLabel}</strong></div>
                          <div>
                            <label style={{ marginRight: 8 }}>
                              <input type="radio" name={"app_" + code} checked={current === "applicable"} onChange={() => setApplicability(code, "applicable")} /> Applicable
                            </label>
                            <label>
                              <input type="radio" name={"app_" + code} checked={current === "not_applicable"} onChange={() => setApplicability(code, "not_applicable")} /> Not applicable
                            </label>
                            <span style={{ marginLeft: 8, color: "#666" }}>{current === "unknown" ? "(not set)" : ""}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
                <button onClick={finalSaveUnbolded} style={{ padding: "8px 12px", borderRadius: 6, background: "#28a745", color: "#fff" }}>Final Save Unbolded ICHI</button>
                <button onClick={markAllNotApplicable} style={{ padding: "8px 12px", borderRadius: 6 }}>Mark all Not Applicable</button>
              </div>

              <div style={{ marginTop: 14, padding: 10, border: "1px dashed #eee", borderRadius: 6 }}>
                <strong>Manual additions</strong>
                {(!manualAddedIchi || manualAddedIchi.length === 0) ? <p style={{ marginTop: 8 }}>None yet</p> : <ul style={{ marginTop: 8 }}>{manualAddedIchi.map(function (c) { return <li key={c}>{c}</li>; })}</ul>}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
const btnOrange = {
  padding: "10px 22px",
  background: "#ff7a00",
  color: "white",
  borderRadius: 6,
  cursor: "pointer",
  marginTop: 12,
  border: "none",
};
const mealGrid = {
  display: "grid",
  gridTemplateColumns: "140px 1fr 130px",
  gap: 10,
  alignItems: "center",
};

const mealLabel = {
  background: "#280836",
  color: "white",
  padding: "8px",
  borderRadius: 6,
  textAlign: "center",
  fontSize: 14,
  fontWeight: 700,
};