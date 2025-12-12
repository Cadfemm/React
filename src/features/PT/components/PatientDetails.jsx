// PatientDetails.jsx
import React, { useEffect, useMemo, useState } from "react";
import { icdData, ICD_LIST, ICF_DETAILS } from "../../../data/masterData"; // adjust path if needed
import AssessmentRenderer from "./AssessmentRenderer"; // adjust path if needed

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

  // selection UI
  var [selectedICD, setSelectedICD] = useState("");
  var [selectedICFsFilter, setSelectedICFsFilter] = useState([]);
  var [icfDropdownOpen, setIcfDropdownOpen] = useState(false);

  // active single ICF view
  var [selectedICF, setSelectedICF] = useState(null);
  var [activeAssessTab, setActiveAssessTab] = useState("subjective");
  var [selectedAssessment, setSelectedAssessment] = useState(null);

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

  // debugging state
  var [debugOpen, setDebugOpen] = useState(false);
  var [lastSaveLog, setLastSaveLog] = useState([]); // array of {when, assessmentName, icfs, icds, ichi}
  var [lastError, setLastError] = useState(null);
  var [lastAction, setLastAction] = useState(null);

  // data mapping for selected ICD
  var mapping = selectedICD ? (icdData && icdData[selectedICD] ? icdData[selectedICD][department] : null) : null;
  var allIcfList = mapping && mapping.ICF ? Object.keys(mapping.ICF) : [];

  // merged mapping across all ICDs for department (used when no ICD selected)
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
        if (Array.isArray(parsed)) setSubmittedRows(parsed);
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
    } catch (err) {
      console.warn("Failed to persist submissions:", err);
      setLastError("Failed to persist submissions: " + (err && err.message ? err.message : String(err)));
    }
  }, [submittedRows, submissionsStorageKey]);

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

      for (var a = 0; a < affectedIcfLabels.length; a++) {
        var icfLabelA = affectedIcfLabels[a];
        var icfObjA = null;
        if (mappingToUse && mappingToUse.ICF && mappingToUse.ICF[icfLabelA]) icfObjA = mappingToUse.ICF[icfLabelA];

        var short = extractICFCode(icfLabelA);
        if (short && icfShortsForRow.indexOf(short) === -1) icfShortsForRow.push(short);
        if (icfLabelsFullForRow.indexOf(icfLabelA) === -1) icfLabelsFullForRow.push(icfLabelA);

        // find ICD(s) that contain this ICF in master data
        var icdListLocal = ICD_LIST || [];
        for (var ii = 0; ii < icdListLocal.length; ii++) {
          var icdKey = icdListLocal[ii];
          var md = icdData && icdData[icdKey] ? icdData[icdKey][department] : null;
          if (md && md.ICF && md.ICF[icfLabelA]) {
            icdSetForRow.add(icdKey);
            if (!icfObjA) icfObjA = md.ICF[icfLabelA];
          }
        }

        // selectedICD fallback
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

      // build final submission row
      var row = {
        id: Date.now() + "_" + Math.random().toString(36).slice(2, 8),
        assessmentName: assessmentName,
        formData: typeof formData !== "undefined" && formData !== null ? formData : null,
        icds: Array.from(icdSetForRow),
        icfShorts: icfShortsForRow,
        icfLabelsFull: icfLabelsFullForRow,
        ichiCodes: Array.from(ichiCodesForRow),
        ichiFullLabels: ichiFullLabelsArr,
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

  // clear persisted (dev)
  function clearAllPersistedForPatient() {
    try {
      localStorage.removeItem(storageKey);
      localStorage.removeItem(submissionsStorageKey);
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
    } catch (err) { console.warn("clear error", err); setLastError("clear error: " + (err && err.message ? err.message : String(err))); }
  }

  // final related ICHI for active ICF
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

  // multiselect helpers
  function toggleIcfFilter(icfLabel) {
    setSelectedICFsFilter(function (prev) {
      if (!prev) prev = [];
      if (prev.indexOf(icfLabel) !== -1) return prev.filter(function (i) { return i !== icfLabel; });
      return prev.concat([icfLabel]);
    });
  }
  function selectAllIcfFilters() { setSelectedICFsFilter(allIcfList.slice()); }
  function clearAllIcfFilters() { setSelectedICFsFilter([]); }

  // if selectedICF is filtered out, clear selection
  useEffect(function () {
    if (selectedICF && visibleIcfList && visibleIcfList.indexOf(selectedICF) === -1) {
      setSelectedICF(null);
      setSelectedAssessment(null);
    }
  }, [visibleIcfList, selectedICF]);

  // when ICD changes, reset multiselect and dropdown
  useEffect(function () {
    setSelectedICFsFilter([]);
    setIcfDropdownOpen(false);
  }, [selectedICD]);

  // ---------------- Render ----------------
  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <button onClick={onBack} style={{ marginRight: 12 }}>← Back</button>
          <strong style={{ fontSize: 16 }}>{(patient && patient.name) ? patient.name : "Patient"}</strong>
        </div>
        <div>
          <button onClick={clearAllPersistedForPatient} title="Clear all persisted data for this patient">Clear saved (dev)</button>
        </div>
      </div>

      <hr style={{ margin: "12px 0" }} />

      {/* ICD selector */}
      {/* <div style={{ marginBottom: 12 }}>
        <label style={{ display: "block", fontWeight: "600" }}>Select ICD:</label>
        <select
          value={selectedICD}
          onChange={(e) => {
            setSelectedICD(e.target.value);
            setSelectedICFsFilter([]);
            setIcfDropdownOpen(false);
            setSelectedICF(null);
            setSelectedAssessment(null);
            setIchiStatus({});
            setSavedAssessments([]);
            setFormDataByAssessment({});
            setUnboldedApplicability({});
            setManualAddedIchi([]);
          }}
          style={{ width: "100%", padding: 8, borderRadius: 6 }}
        >
          <option value="">-- Select ICD --</option>
          {ICD_LIST && ICD_LIST.map(function (icd) { return <option key={icd} value={icd}>{icd}</option>; })}
        </select>
      </div> */}

      {/* Multiselect dropdown for ICFs (only visible after an ICD is selected) */}
      {selectedICD && allIcfList && allIcfList.length > 0 && (
        <div style={{ marginBottom: 14 }}>
          <label style={{ display: "block", fontWeight: "600", marginBottom: 6 }}>Pick ICFs (for quick ICF tab navigation)</label>

          <div style={{ position: "relative", width: 360 }}>
            <div
              onClick={() => setIcfDropdownOpen(o => !o)}
              style={{
                border: "1px solid #ccc",
                padding: "8px 10px",
                borderRadius: 6,
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "#fff"
              }}
            >
              <div style={{ color: "#333" }}>
                {(!selectedICFsFilter || selectedICFsFilter.length === 0) ? <em>Select ICF</em> : (selectedICFsFilter.length + " selected")}
              </div>
              <div style={{ fontSize: 12, color: "#666" }}>{icfDropdownOpen ? "▲" : "▼"}</div>
            </div>

            {icfDropdownOpen && (
              <div style={{ position: "absolute", top: "44px", left: 0, width: "100%", zIndex: 40, border: "1px solid #ddd", background: "#fff", boxShadow: "0 6px 18px rgba(0,0,0,0.08)", borderRadius: 6, padding: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <button onClick={selectAllIcfFilters} style={{ padding: "6px 8px", borderRadius: 6 }}>Select all</button>
                  <button onClick={clearAllIcfFilters} style={{ padding: "6px 8px", borderRadius: 6 }}>Clear</button>
                </div>

                <div style={{ maxHeight: 260, overflowY: "auto", paddingRight: 6 }}>
                  {allIcfList.map(function (icf) {
                    var checked = selectedICFsFilter && selectedICFsFilter.indexOf(icf) !== -1;
                    return (
                      <label key={icf} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, cursor: "pointer" }}>
                        <input type="checkbox" checked={checked} onChange={() => toggleIcfFilter(icf)} />
                        <span style={{ fontSize: 14 }}>{icf}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Show visible ICFs as tabs (buttons). If no ICF is selected in the multi-select, show a hint and nothing else. */}
      {selectedICD && (
        <>
          {(!visibleIcfList || visibleIcfList.length === 0) ? (
            <div style={{ marginBottom: 12, color: "#666", fontStyle: "italic" }}>
              No ICF selected (for tab navigation). Use the ICF dropdown above to choose one or more ICFs to work with tabs. (Tip: use "Select all" to show all.)
            </div>
          ) : (
            <div style={{ marginBottom: 12 }}>
              <label style={{ display: "block", fontWeight: "600", marginBottom: 8 }}>Selected ICF's</label>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {visibleIcfList.map(function (icf) {
                  return (
                    <button
                      key={icf}
                      onClick={() => setSelectedICF(icf)}
                      style={{
                        padding: "8px 12px",
                        borderRadius: 6,
                        border: selectedICF === icf ? "2px solid #333" : "1px solid #ccc",
                        background: selectedICF === icf ? "#007bff" : "#fff",
                        color: selectedICF === icf ? "#fff" : "#333",
                        cursor: "pointer"
                      }}
                    >
                      {icf}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}

      {/* ASSESSMENTS PANEL (visible even when no ICF selected) */}
      {mappingToUse && (
        <div style={{ marginTop: 8 }}>
          <div style={{ marginBottom: 10 }}>
            <button onClick={() => setActiveAssessTab("subjective")} style={{ marginRight: 8, padding: "8px 12px", borderRadius: 6, background: activeAssessTab === "subjective" ? "#007bff" : "#fff", color: activeAssessTab === "subjective" ? "#fff" : "#000" }}>Subjective</button>
            <button onClick={() => setActiveAssessTab("objective")} style={{ padding: "8px 12px", borderRadius: 6, background: activeAssessTab === "objective" ? "#007bff" : "#fff", color: activeAssessTab === "objective" ? "#fff" : "#000" }}>Objective</button>
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
                      background: selectedAssessment === a ? "#e6f0ff" : "#007bff",
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

          {/* <div style={{ marginBottom: 12 }}>
            <button
              onClick={() => {
                if (selectedAssessment) saveAssessment(selectedAssessment, formDataByAssessment[selectedAssessment] || null);
                else alert("Select an assessment to save");
              }}
              style={{ padding: "8px 12px", borderRadius: 6, background: "#007bff", color: "#fff", border: "none", cursor: "pointer" }}
            >
              Save Selected Assessment (quick)
            </button>
          </div> */}

          <div>
            <AssessmentRenderer selected={selectedAssessment} onSave={saveAssessment} initialFormData={formDataByAssessment[selectedAssessment] || null} />
          </div>
        </div>
      )}

      {/* Submissions table: always visible (below assessments) */}
      <div style={{ marginTop: 20 }}>
        <h4>Submitted assessments (auto-linked ICD / ICF / ICHI)</h4>
        {(!submittedRows || submittedRows.length === 0) ? (
          <p style={{ color: "#666" }}>No submissions yet.</p>
        ) : (
          <div style={{ overflowX: "auto", border: "1px solid #eee", borderRadius: 6 }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ textAlign: "left", background: "#fafafa" }}>
                  <th style={{ padding: 8, borderBottom: "1px solid #eee" }}>When</th>
                  <th style={{ padding: 8, borderBottom: "1px solid #eee" }}>Assessment</th>
                  <th style={{ padding: 8, borderBottom: "1px solid #eee" }}>ICDs</th>
                  <th style={{ padding: 8, borderBottom: "1px solid #eee" }}>ICFs</th>
                  <th style={{ padding: 8, borderBottom: "1px solid #eee" }}>ICHI</th>
                  <th style={{ padding: 8, borderBottom: "1px solid #eee" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {submittedRows.map(function (row) {
                  return (
                    <tr key={row.id}>
                      <td style={{ padding: 8, borderTop: "1px solid #f5f5f5", verticalAlign: "top" }}>{new Date(row.timestamp).toLocaleString()}</td>
                      <td style={{ padding: 8, borderTop: "1px solid #f5f5f5" }}>{row.assessmentName}</td>
                      <td style={{ padding: 8, borderTop: "1px solid #f5f5f5" }}>{(row.icds || []).join(", ")}</td>
                      <td style={{ padding: 8, borderTop: "1px solid #f5f5f5" }}>{(row.icfShorts || []).join(", ")}</td>
                      <td style={{ padding: 8, borderTop: "1px solid #f5f5f5" }}>{(row.ichiFullLabels || row.ichi || []).join(", ")}</td>
                      <td style={{ padding: 8, borderTop: "1px solid #f5f5f5" }}>
                        <button onClick={() => alert(JSON.stringify(row, null, 2))} style={{ padding: "6px 8px", borderRadius: 6 }}>View</button>
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
                  <button onClick={() => setActiveAssessTab("subjective")} style={{ marginRight: 8, padding: "8px 12px", borderRadius: 6, background: activeAssessTab === "subjective" ? "#007bff" : "#fff", color: activeAssessTab === "subjective" ? "#fff" : "#000" }}>Subjective</button>
                  <button onClick={() => setActiveAssessTab("objective")} style={{ padding: "8px 12px", borderRadius: 6, background: activeAssessTab === "objective" ? "#007bff" : "#fff", color: activeAssessTab === "objective" ? "#fff" : "#000" }}>Objective</button>
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

      {/* Debug panel
      <div style={{ marginTop: 18 }}>
        <button onClick={() => setDebugOpen(o => !o)} style={{ padding: "6px 8px", borderRadius: 6 }}>{debugOpen ? "Hide Debug" : "Show Debug"}</button>
        {debugOpen && (
          <div style={{ marginTop: 10, padding: 12, background: "#fff7e6", border: "1px solid #ffdca8", borderRadius: 6 }}>
            <div><strong>Last action:</strong> {lastAction || "(none)"}</div>
            <div style={{ marginTop: 6 }}><strong>Last error:</strong> {lastError || "(none)"}</div>
            <div style={{ marginTop: 8 }}>
              <strong>Last saves (latest last):</strong>
              {(!lastSaveLog || lastSaveLog.length === 0) ? <div style={{ color: "#666" }}>No saves yet</div> :
                <ul>{lastSaveLog.map(function (e, idx) { return <li key={idx}><strong>{e.assessmentName}</strong> at {new Date(e.when).toLocaleString()} → ICF(s): {(e.icfs || []).join(", ")} ICD(s): {(e.icds || []).join(", ")}</li>; })}</ul>}
            </div>

            <div style={{ marginTop: 8 }}>
              <strong>LocalStorage keys (patient):</strong>
              <div style={{ marginTop: 6 }}>
                <div><code>{storageKey}</code></div>
                <div style={{ maxHeight: 160, overflowY: "auto", marginTop: 6, background: "#fff", padding: 8, borderRadius: 4, border: "1px solid #eee" }}>
                  <pre style={{ margin: 0, fontSize: 12 }}>{(function() { try { return localStorage.getItem(storageKey) || "(empty)"; } catch (e) { return "(no access)"; } })()}</pre>
                </div>

                <div style={{ marginTop: 8 }}><code>{submissionsStorageKey}</code></div>
                <div style={{ maxHeight: 160, overflowY: "auto", marginTop: 6, background: "#fff", padding: 8, borderRadius: 4, border: "1px solid #eee" }}>
                  <pre style={{ margin: 0, fontSize: 12 }}>{(function() { try { return localStorage.getItem(submissionsStorageKey) || "(empty)"; } catch (e) { return "(no access)"; } })()}</pre>
                </div>
              </div>
            </div>
          </div>
        )}
      </div> */}
    </div>
  );
}
