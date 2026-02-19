import React, { useEffect, useState } from "react";
import CommonFormBuilder from "../../CommonComponenets/FormBuilder";
import { createWorker } from "tesseract.js";

/* ===================== OPTIONS ===================== */

const INTACT_IMPAIRED = [
  { label: "Intact", value: "intact" },
  { label: "Impaired", value: "impaired" }
];

const NORMAL_ABNORMAL = [
  { label: "Normal", value: "normal" },
  { label: "Abnormal", value: "abnormal" }
];

const YES_NO = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" }
];

const IMPAIRED_LOCATION = [
  { label: "Right", value: "right" },
  { label: "Left", value: "left" },
  { label: "Bilateral", value: "bilateral" }
];

/* ===================== COMPONENT ===================== */

export default function AudiologyDepartmentAdultPage({ patient, onSubmit, onBack }) {
  const [values, setValues] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState("subjective");
  const [processingOCR, setProcessingOCR] = useState(false);

  /* ---------------- STORAGE ---------------- */
  const storageKey = patient
    ? `audiology_assessment_draft_${patient.id}`
    : null;

  useEffect(() => {
    if (!storageKey) return;
    const saved = localStorage.getItem(storageKey);
    const savedValues = saved ? (JSON.parse(saved).values || {}) : {};
    
    // Always merge patient data, taking precedence for read-only fields
    if (patient) {
      setValues({
        ...savedValues,
        pmh_from_registration:
          patient.medical_history || "No data available",
        family_social_from_registration:
          patient.diagnosis_history || "No data available"
      });
    } else {
      setValues(savedValues);
    }
  }, [storageKey, patient]);

  // Extract tympanometry values from OCR text
  const extractTympanometryValues = (text) => {
    const values = {};
    
    console.log('OCR Text extracted:', text);
    console.log('OCR Text length:', text.length);
    
    // Split text into lines for better analysis
    const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    console.log('OCR Lines:', lines);
    
    // Strategy 1: Look for explicit labels with values
    // Use pattern that captures decimals properly: [\d]+\.[\d]+ for decimals, [\d]+ for integers
    const volumePatterns = [
      /Volume[:\s]*([\d]+\.[\d]+|[\d]+)\s*ml/i,
      /Volume[:\s]*([\d]+\.[\d]+|[\d]+)ml/i,
      /Vol[:\s]*([\d]+\.[\d]+|[\d]+)\s*ml/i,
      /Vol[:\s]*([\d]+\.[\d]+|[\d]+)ml/i
    ];
    
    for (const pattern of volumePatterns) {
      const match = text.match(pattern);
      if (match) {
        values.volume = match[1]; // Keep as string to preserve exact decimal
        console.log('Extracted Volume (label method):', values.volume);
        break;
      }
    }
    
    // Strategy 2: Look for decimal numbers near "ml" (for Volume and Compliance)
    // Extract ml values once to use for both Volume and Compliance
    // Use pattern that properly captures decimals: [\d]+\.[\d]+ for decimals, [\d]+ for integers
    const mlMatches = text.match(/([\d]+\.[\d]+|[\d]+)\s*ml/gi);
    let mlNumbers = [];
    
    if (mlMatches) {
      console.log('Found ml values:', mlMatches);
      // Extract numbers from matches - preserve original string format
      mlNumbers = mlMatches.map(m => {
        // Match the number part (decimal or integer)
        const numMatch = m.match(/([\d]+\.[\d]+|[\d]+)/);
        if (numMatch) {
          const numValue = parseFloat(numMatch[1]);
          return numValue > 0 && numValue < 10 ? { str: numMatch[1], num: numValue } : null;
        }
        return null;
      }).filter(n => n !== null); // Volume/Compliance are typically 0-10
      
      if (mlNumbers.length > 0) {
        // Sort for easier processing (by numeric value)
        mlNumbers.sort((a, b) => b.num - a.num);
        console.log('Sorted ml numbers:', mlNumbers.map(n => n.str));
      }
    }
    
    if (!values.volume && mlMatches && mlMatches.length > 0) {
      // Volume is usually the larger value (typically 0.5-2.0), Compliance is smaller (0.1-1.0)
      // Look for context clues - if "Volume" appears before a number, use that
      const volumeIndex = text.toLowerCase().indexOf('volume');
      
      if (volumeIndex !== -1) {
        // Find the number closest to "Volume" text - preserve exact decimal
        const textAfterVolume = text.substring(volumeIndex);
        const volumeNumMatch = textAfterVolume.match(/([\d]+\.[\d]+|[\d]+)\s*ml/i);
        if (volumeNumMatch) {
          values.volume = volumeNumMatch[1]; // Keep as string to preserve decimals
          console.log('Extracted Volume (context method):', values.volume);
        }
      } else if (mlNumbers && mlNumbers.length > 0) {
        // If no "Volume" label, find the larger decimal value
        // mlNumbers is already sorted descending
        const largerValue = mlNumbers[0];
        if (largerValue.num >= 0.5 && largerValue.num <= 2.0) {
          values.volume = largerValue.str; // Use original string to preserve decimals
          console.log('Extracted Volume (fallback - larger value):', values.volume);
        }
      }
    }
    
    // Extract Pressure - try multiple patterns
    const pressurePatterns = [
      /Pressure[:\s]*([\d.-]+)\s*daPa/i,
      /Pressure[:\s]*([\d.-]+)daPa/i,
      /Press[:\s]*([\d.-]+)\s*daPa/i,
      /Press[:\s]*([\d.-]+)daPa/i
    ];
    
    for (const pattern of pressurePatterns) {
      const match = text.match(pattern);
      if (match) {
        values.pressure = match[1];
        console.log('Extracted Pressure (label method):', values.pressure);
        break;
      }
    }
    
    // Strategy 2 for Pressure: Look for small numbers near "daPa" (Pressure is typically -200 to 200)
    if (!values.pressure) {
      const daPaMatches = text.match(/([\d.-]+)\s*daPa/gi);
      if (daPaMatches) {
        console.log('Found daPa values:', daPaMatches);
        // Look for the number closest to "Pressure" text
        const pressureIndex = text.toLowerCase().indexOf('pressure');
        if (pressureIndex !== -1) {
          const textAfterPressure = text.substring(pressureIndex);
          const pressureNumMatch = textAfterPressure.match(/([\d.-]+)\s*daPa/i);
          if (pressureNumMatch) {
            values.pressure = pressureNumMatch[1];
            console.log('Extracted Pressure (context method):', values.pressure);
          }
        } else {
          // If no "Pressure" label, take the first small number (not Gradient which is larger)
          for (const match of daPaMatches) {
            const numMatch = match.match(/([\d.-]+)/);
            if (numMatch) {
              const num = parseFloat(numMatch[1]);
              // Pressure is typically small (-200 to 200, can be 0), Gradient is larger (50-200)
              // Exclude common gradient values (77, 81, etc.)
              if (Math.abs(num) <= 200 && num !== 77 && num !== 81 && (Math.abs(num) < 50 || num === 0)) {
                values.pressure = numMatch[1];
                console.log('Extracted Pressure (fallback method):', values.pressure);
                break;
              }
            }
          }
        }
      }
    }
    
    // Extract Compliance - try multiple patterns
    // Use pattern that captures decimals properly
    const compliancePatterns = [
      /Compliance[:\s]*([\d]+\.[\d]+|[\d]+)\s*ml/i,
      /Compliance[:\s]*([\d]+\.[\d]+|[\d]+)ml/i,
      /Comp[:\s]*([\d]+\.[\d]+|[\d]+)\s*ml/i,
      /Comp[:\s]*([\d]+\.[\d]+|[\d]+)ml/i
    ];
    
    for (const pattern of compliancePatterns) {
      const match = text.match(pattern);
      if (match) {
        values.compliance = match[1]; // Keep as string to preserve exact decimal
        console.log('Extracted Compliance (label method):', values.compliance);
        break;
      }
    }
    
    // Strategy 2 for Compliance: Look for decimal numbers near "ml" that aren't Volume
    if (!values.compliance) {
      const complianceIndex = text.toLowerCase().indexOf('compliance');
      if (complianceIndex !== -1) {
        const textAfterCompliance = text.substring(complianceIndex);
        // Match decimal numbers (preserve exact format)
        const complianceNumMatch = textAfterCompliance.match(/([\d]+\.[\d]+|[\d]+)\s*ml/i);
        if (complianceNumMatch) {
          values.compliance = complianceNumMatch[1]; // Keep as string to preserve decimals
          console.log('Extracted Compliance (context method):', values.compliance);
        }
      } else if (mlNumbers && mlNumbers.length >= 1) {
        // If we have ml values, find the one that's not Volume
        // Compliance is typically smaller (0.1-1.0)
        // Sort ascending to prioritize smaller values (compliance)
        const sortedAscending = [...mlNumbers].sort((a, b) => a.num - b.num);
        
        for (const mlValue of sortedAscending) {
          if (mlValue.num >= 0.1 && mlValue.num <= 1.0) {
            // Check if this isn't the volume we already found
            const volumeNum = values.volume ? parseFloat(values.volume) : null;
            if (!volumeNum || Math.abs(volumeNum - mlValue.num) > 0.1) {
              values.compliance = mlValue.str; // Use original string to preserve decimals
              console.log('Extracted Compliance (fallback method):', values.compliance);
              break;
            }
          }
        }
        
        // If still not found and we have at least 2 ml values, the smaller one is likely compliance
        if (!values.compliance && mlNumbers.length >= 2) {
          const volumeNum = values.volume ? parseFloat(values.volume) : null;
          for (const mlValue of sortedAscending) {
            if (mlValue.num >= 0.1 && mlValue.num < 1.0) {
              if (!volumeNum || Math.abs(volumeNum - mlValue.num) > 0.05) {
                values.compliance = mlValue.str;
                console.log('Extracted Compliance (secondary fallback):', values.compliance);
                break;
              }
            }
          }
        }
      }
    }
    
    // Fallback: Try to extract from common patterns in tympanometry reports
    // Sometimes values appear as: "0.74 ml" on a line with "Volume" nearby
    if (!values.volume || !values.pressure || !values.compliance) {
      // Look for lines that might contain the values
      for (const line of lines) {
        // Volume pattern: decimal number with ml
        if (!values.volume && /[\d.]+.*ml/i.test(line)) {
          // Try to find volume label first
          if (/volume/i.test(line)) {
            const volMatch = line.match(/([\d]+\.[\d]+|[\d]+)\s*ml/i);
            if (volMatch && parseFloat(volMatch[1]) >= 0.1 && parseFloat(volMatch[1]) < 5) {
              values.volume = volMatch[1]; // Keep as string to preserve exact decimal
              console.log('Extracted Volume (line scan with label):', values.volume);
            }
          } else if (!/compliance/i.test(line)) {
            // If no compliance label, check if it's a volume value
            const volMatch = line.match(/([\d]+\.[\d]+|[\d]+)\s*ml/i);
            if (volMatch) {
              const volValue = parseFloat(volMatch[1]);
              // Volume is typically 0.5-2.0 and larger than compliance
              if (volValue >= 0.1 && volValue < 5) {
                values.volume = volMatch[1]; // Keep as string to preserve exact decimal
                console.log('Extracted Volume (line scan):', values.volume);
              }
            }
          }
        }
        
        // Pressure pattern: number with daPa (but not Gradient)
        if (!values.pressure && /[\d.-]+.*daPa/i.test(line) && !/gradient/i.test(line)) {
          const pressMatch = line.match(/([\d.-]+)\s*daPa/i);
          if (pressMatch && Math.abs(parseFloat(pressMatch[1])) < 200) {
            values.pressure = pressMatch[1];
            console.log('Extracted Pressure (line scan):', values.pressure);
          }
        }
        
        // Compliance pattern: smaller decimal with ml
        // Look for compliance even if volume is on the same line
        if (!values.compliance && /[\d.]+.*ml/i.test(line)) {
          // Try to find compliance label first
          if (/compliance/i.test(line)) {
            const compMatch = line.match(/([\d]+\.[\d]+|[\d]+)\s*ml/i);
            if (compMatch && parseFloat(compMatch[1]) >= 0.1 && parseFloat(compMatch[1]) <= 1.0) {
              values.compliance = compMatch[1]; // Keep as string to preserve exact decimal
              console.log('Extracted Compliance (line scan with label):', values.compliance);
            }
          } else if (!/volume/i.test(line)) {
            // If no volume label, check if it's a compliance value
            const compMatch = line.match(/([\d]+\.[\d]+|[\d]+)\s*ml/i);
            if (compMatch) {
              const compValue = parseFloat(compMatch[1]);
              // Compliance is typically 0.1-1.0 and smaller than volume
              const volumeNum = values.volume ? parseFloat(values.volume) : null;
              if (compValue >= 0.1 && compValue <= 1.0 && (!volumeNum || compValue < volumeNum)) {
                values.compliance = compMatch[1]; // Keep as string to preserve exact decimal
                console.log('Extracted Compliance (line scan):', values.compliance);
              }
            }
          }
        }
      }
    }
    
    // Last resort: Look for any decimal numbers in typical tympanometry ranges
    // This is a fallback when OCR doesn't read labels clearly
    if (!values.volume || !values.pressure || !values.compliance) {
      // Find all decimal numbers in the text - preserve original strings
      const allDecimals = text.match(/[\d]+\.[\d]+/g) || [];
      const allIntegers = text.match(/\b[\d]+\b/g) || [];
      
      // Create objects with both string and numeric values
      const allNumberObjects = [
        ...allDecimals.map(str => ({ str, num: parseFloat(str) })),
        ...allIntegers.map(str => ({ str, num: parseFloat(str) }))
      ];
      
      console.log('All numbers found in text:', allNumberObjects.map(n => n.str));
      
      // Volume: typically 0.5-2.0 ml (Ear Canal Volume)
      if (!values.volume) {
        const volumeCandidates = allNumberObjects.filter(n => n.num >= 0.5 && n.num <= 2.0);
        if (volumeCandidates.length > 0) {
          // Take the one closest to typical volume range (0.7-1.0)
          const bestVolume = volumeCandidates.reduce((best, curr) => {
            const bestDist = Math.abs(best.num - 0.75);
            const currDist = Math.abs(curr.num - 0.75);
            return currDist < bestDist ? curr : best;
          });
          values.volume = bestVolume.str; // Use original string to preserve decimals
          console.log('Extracted Volume (number scan fallback):', values.volume);
        }
      }
      
      // Compliance: typically 0.1-1.0 ml (Static Compliance) - includes 0.44
      if (!values.compliance) {
        const complianceCandidates = allNumberObjects.filter(n => n.num >= 0.1 && n.num <= 1.0);
        if (complianceCandidates.length > 0) {
          // Exclude the volume value if we found it
          const volumeNum = values.volume ? parseFloat(values.volume) : null;
          const filteredCandidates = complianceCandidates.filter(n => 
            !volumeNum || Math.abs(volumeNum - n.num) > 0.1
          );
          
          if (filteredCandidates.length > 0) {
            // Take the smaller value (Compliance is typically smaller than Volume)
            const bestCompliance = filteredCandidates.reduce((best, curr) => 
              curr.num < best.num ? curr : best
            );
            values.compliance = bestCompliance.str; // Use original string to preserve decimals
            console.log('Extracted Compliance (number scan fallback):', values.compliance);
          }
        }
      }
      
      // Pressure: typically -200 to 200 daPa (Peak Pressure) - can be 0
      if (!values.pressure) {
        const pressureCandidates = allNumberObjects.filter(n => 
          Math.abs(n.num) >= 0 && Math.abs(n.num) < 200 && n.num !== 77 && n.num !== 81
        );
        if (pressureCandidates.length > 0) {
          // Take the smallest absolute value (pressure is usually close to 0, can be 0)
          const bestPressure = pressureCandidates.reduce((best, curr) => {
            return Math.abs(curr.num) < Math.abs(best.num) ? curr : best;
          });
          values.pressure = bestPressure.str; // Use original string to preserve exact value
          console.log('Extracted Pressure (number scan fallback):', values.pressure);
        }
      }
    }
    
    // Final validation and fallback - if we still don't have values, try very aggressive extraction
    if (!values.volume || !values.compliance) {
      console.log('=== AGGRESSIVE FALLBACK EXTRACTION ===');
      // Find ALL decimal numbers with ml in the entire text
      const allMlPattern = text.match(/([\d]+\.[\d]+|[\d]+)\s*ml/gi);
      if (allMlPattern) {
        console.log('All ml patterns found:', allMlPattern);
        const mlValues = allMlPattern.map(m => {
          const numMatch = m.match(/([\d]+\.[\d]+|[\d]+)/);
          return numMatch ? { str: numMatch[1], num: parseFloat(numMatch[1]) } : null;
        }).filter(n => n !== null && n.num > 0 && n.num < 10);
        
        console.log('Processed ml values:', mlValues);
        
        // If we have 2 ml values and volume is missing, the larger is likely volume
        if (!values.volume && mlValues.length >= 1) {
          mlValues.sort((a, b) => b.num - a.num);
          const candidate = mlValues[0];
          if (candidate.num >= 0.5 && candidate.num <= 2.0) {
            values.volume = candidate.str;
            console.log('AGGRESSIVE: Extracted Volume:', values.volume);
          }
        }
        
        // If we have ml values and compliance is missing, find the smaller one
        if (!values.compliance && mlValues.length >= 1) {
          mlValues.sort((a, b) => a.num - b.num);
          const volumeNum = values.volume ? parseFloat(values.volume) : null;
          for (const candidate of mlValues) {
            if (candidate.num >= 0.1 && candidate.num <= 1.0) {
              if (!volumeNum || Math.abs(volumeNum - candidate.num) > 0.05) {
                values.compliance = candidate.str;
                console.log('AGGRESSIVE: Extracted Compliance:', values.compliance);
                break;
              }
            }
          }
        }
      }
    }
    
    // Final check for pressure - make sure we're not picking gradient
    if (!values.pressure) {
      const allDaPaPattern = text.match(/([\d.-]+)\s*daPa/gi);
      if (allDaPaPattern) {
        console.log('All daPa patterns found:', allDaPaPattern);
        const daPaValues = allDaPaPattern.map(m => {
          const numMatch = m.match(/([\d.-]+)/);
          return numMatch ? { str: numMatch[1], num: parseFloat(numMatch[1]) } : null;
        }).filter(n => n !== null);
        
        // Find the one closest to "Pressure" text, or the smallest non-gradient value
        const pressureIndex = text.toLowerCase().indexOf('pressure');
        if (pressureIndex !== -1) {
          const textAfterPressure = text.substring(pressureIndex, pressureIndex + 100);
          const pressureMatch = textAfterPressure.match(/([\d.-]+)\s*daPa/i);
          if (pressureMatch) {
            values.pressure = pressureMatch[1];
            console.log('AGGRESSIVE: Extracted Pressure from context:', values.pressure);
          }
        } else {
          // Take smallest absolute value that's not a gradient (77, 81, etc.)
          const validPressures = daPaValues.filter(v => 
            Math.abs(v.num) <= 200 && v.num !== 77 && v.num !== 81 && (Math.abs(v.num) < 50 || v.num === 0)
          );
          if (validPressures.length > 0) {
            const best = validPressures.reduce((best, curr) => 
              Math.abs(curr.num) < Math.abs(best.num) ? curr : best
            );
            values.pressure = best.str;
            console.log('AGGRESSIVE: Extracted Pressure (smallest):', values.pressure);
          }
        }
      }
    }
    
    console.log('Final extracted values:', values);
    console.log('Volume type:', typeof values.volume, 'Value:', values.volume);
    console.log('Pressure type:', typeof values.pressure, 'Value:', values.pressure);
    console.log('Compliance type:', typeof values.compliance, 'Value:', values.compliance);
    return values;
  };

  // Process tympanometry image with OCR
  const processTympanometryImage = async (file, earSide) => {
    console.log(`Starting OCR processing for ${earSide} ear...`);
    setProcessingOCR(true);
    try {
      console.log('Creating Tesseract worker...');
      const worker = await createWorker('eng');
      
      // Configure OCR for better text recognition
      await worker.setParameters({
        tessedit_char_whitelist: '0123456789.ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz:mlPaGradientVolumePressureCompliance ',
        tessedit_pageseg_mode: '6', // Assume uniform block of text
      });
      
      console.log('Recognizing text from image (first attempt)...');
      let { data: { text } } = await worker.recognize(file);
      console.log('First OCR attempt, extracted text length:', text.length);
      
      // If first attempt doesn't find values, try with different settings
      if (!text.match(/Volume|Pressure|Compliance|[\d]+\.[\d]+\s*ml|[\d.-]+\s*daPa/i)) {
        console.log('Trying OCR with different page segmentation mode...');
        await worker.setParameters({
          tessedit_pageseg_mode: '11', // Sparse text
        });
        const result2 = await worker.recognize(file);
        if (result2.data.text.length > text.length) {
          text = result2.data.text;
          console.log('Second OCR attempt found more text, length:', text.length);
        }
      }
      
      await worker.terminate();
      console.log('OCR completed, final extracted text length:', text.length);
      
      const extracted = extractTympanometryValues(text);
      console.log('=== EXTRACTION RESULTS ===');
      console.log('Extracted values:', extracted);
      console.log('Volume:', extracted.volume, 'Type:', typeof extracted.volume);
      console.log('Pressure:', extracted.pressure, 'Type:', typeof extracted.pressure);
      console.log('Compliance:', extracted.compliance, 'Type:', typeof extracted.compliance);
      console.log('========================');
      
      if (extracted.volume || extracted.pressure || extracted.compliance) {
        setValues(v => {
          const updates = {};
          
          // Update Ear Canal Volume (ecv)
          if (extracted.volume) {
            const volumeStr = String(extracted.volume); // Ensure it's a string
            updates.ecv = {
              ...(v.ecv || {}),
              [`ecv_${earSide === 'right' ? 'r' : 'l'}`]: volumeStr
            };
            console.log(`Setting ecv_${earSide === 'right' ? 'r' : 'l'} to:`, volumeStr, 'Type:', typeof volumeStr);
          }
          
          // Update Peak Pressure (peak_pressure)
          if (extracted.pressure) {
            const pressureStr = String(extracted.pressure); // Ensure it's a string
            updates.peak_pressure = {
              ...(v.peak_pressure || {}),
              [`peak_pressure_${earSide === 'right' ? 'r' : 'l'}`]: pressureStr
            };
            console.log(`Setting peak_pressure_${earSide === 'right' ? 'r' : 'l'} to:`, pressureStr, 'Type:', typeof pressureStr);
          }
          
          // Update Static Compliance (static_compliance)
          if (extracted.compliance) {
            const complianceStr = String(extracted.compliance); // Ensure it's a string
            updates.static_compliance = {
              ...(v.static_compliance || {}),
              [`static_compliance_${earSide === 'right' ? 'r' : 'l'}`]: complianceStr
            };
            console.log(`Setting static_compliance_${earSide === 'right' ? 'r' : 'l'} to:`, complianceStr, 'Type:', typeof complianceStr);
          }
          
          if (Object.keys(updates).length > 0) {
            console.log('Updating values:', updates);
            console.log('Current values before update:', v);
            const newValues = { ...v, ...updates };
            console.log('New values after update:', newValues);
            
            // Show success message
            const extractedCount = Object.keys(extracted).filter(k => extracted[k]).length;
            setTimeout(() => {
              alert(`Successfully extracted ${extractedCount} value(s) from ${earSide} ear tympanometry image:\n${extracted.volume ? `Volume: ${extracted.volume} ml\n` : ''}${extracted.pressure ? `Pressure: ${extracted.pressure} daPa\n` : ''}${extracted.compliance ? `Compliance: ${extracted.compliance} ml` : ''}`);
            }, 100);
            
            return newValues;
          }
          
          console.log('No updates to apply');
          return v;
        });
      } else {
        console.warn('No values extracted from image');
        console.warn('OCR Text was:', text);
        console.warn('OCR Text length:', text.length);
        alert(`Could not extract values from the image.\n\nOCR found text: "${text.substring(0, 200)}..."\n\nPlease check the browser console (F12) for detailed logs or enter values manually.`);
      }
    } catch (error) {
      console.error('Error processing tympanometry image:', error);
      alert(`Error processing image: ${error.message}. Please enter values manually.`);
    } finally {
      setProcessingOCR(false);
      console.log('OCR processing completed');
    }
  };

  const AUTO_PROBLEM_PREFIXES = [
    'Ear Infection:', 'Echo or Ear Fullness:', 'Otalgia:', 'Otorrhea:', 'Tinnitus:',
    'Loudness Discomfort:', 'Hearing Difficulties:', 'Communication Difficulties:',
    'Vestibular Symptoms:', 'Duration/Frequency:', 'Triggers:',
    'Audiometry Impressions (Right):', 'Audiometry Impressions (Left):', 'Reliability:'
  ];

  const formatLocationLabel = (v) => {
    if (!v) return '';
    const map = { right: 'Right', left: 'Left', bilateral: 'Bilateral', in_head: 'In the Head' };
    return map[v] || (typeof v === 'string' ? v.charAt(0).toUpperCase() + v.slice(1) : v);
  };

  const updateProblemListFromFormValues = (currentProblemList, v) => {
    const lines = (currentProblemList || '').split('\n').map(l => l.trim()).filter(Boolean);
    const withoutAuto = lines.filter(l => !AUTO_PROBLEM_PREFIXES.some(p => l.startsWith(p)));

    const add = (prefix, val) => { if (val) withoutAuto.push(`${prefix} ${val}`); };

    if (v.ear_infection && v.ear_infection !== 'none') add('Ear Infection:', formatLocationLabel(v.ear_infection));
    if (v.ear_fullness && v.ear_fullness !== 'none') add('Echo or Ear Fullness:', formatLocationLabel(v.ear_fullness));
    if (v.ear_pain && v.ear_pain !== 'none') add('Otalgia:', formatLocationLabel(v.ear_pain));
    if (v.otorrhea && v.otorrhea !== 'none') add('Otorrhea:', formatLocationLabel(v.otorrhea));
    if (v.tinnitus && v.tinnitus !== 'none') add('Tinnitus:', formatLocationLabel(v.tinnitus));
    if (v.loudness_discomfort && v.loudness_discomfort !== 'none') add('Loudness Discomfort:', formatLocationLabel(v.loudness_discomfort));
    if (v.hearing_difficulties && v.hearing_difficulties !== 'none') add('Hearing Difficulties:', formatLocationLabel(v.hearing_difficulties));

    const commLabels = { in_quiet: 'In quiet', in_noise: 'In noise', group: 'Group', telephone: 'Telephone' };
    if (v.communication_difficulties && v.communication_difficulties !== 'none') add('Communication Difficulties:', commLabels[v.communication_difficulties] || v.communication_difficulties);

    const vestLabels = { '1': 'Vertigo', '2': 'Imbalance', '3': 'Dizziness', '4': 'Oscillopsia' };
    if (v.vestibular_symptoms && v.vestibular_symptoms !== '0') add('Vestibular Symptoms:', vestLabels[v.vestibular_symptoms] || v.vestibular_symptoms);

    if (v.duration_frequency && String(v.duration_frequency).trim()) add('Duration/Frequency:', String(v.duration_frequency).trim());

    const trigLabels = { '1': 'Positional', '2': 'Head movement', '3': 'Visual stimuli', '4': 'Spontaneous' };
    if (v.triggers && v.triggers !== '0') add('Triggers:', trigLabels[v.triggers] || v.triggers);

    if (v.impression_r && String(v.impression_r).trim()) add('Audiometry Impressions (Right):', String(v.impression_r).trim());
    if (v.impression_l && String(v.impression_l).trim()) add('Audiometry Impressions (Left):', String(v.impression_l).trim());

    if (v.reliability) add('Reliability:', v.reliability);

    return withoutAuto.join('\n').trim();
  };

  const onChange = async (name, value) => {
    console.log('onChange called:', { name, value, isFile: value instanceof File, type: value?.type, constructor: value?.constructor?.name });
    
    // Check if this is a tympanometry file upload
    // Handle both image files and check the name pattern
    const isRightTympanometry = name === 'tympanometry_report_right';
    const isLeftTympanometry = name === 'tympanometry_report_left';
    
    if ((isRightTympanometry || isLeftTympanometry) && value) {
      // Check if it's a File object
      const isFile = value instanceof File || (value && typeof value === 'object' && value.constructor?.name === 'File');
      const isImage = isFile && (value.type?.startsWith('image/') || value.name?.match(/\.(jpg|jpeg|png|gif|bmp|webp)$/i));
      
      console.log('Tympanometry upload detected:', { name, isFile, isImage, fileType: value?.type, fileName: value?.name });
      
      if (isFile && isImage) {
        const earSide = isRightTympanometry ? 'right' : 'left';
        console.log(`Processing ${earSide} tympanometry image...`);
        setValues(v => ({ ...v, [name]: value }));
        await processTympanometryImage(value, earSide);
      } else {
        // Still save the file even if it's not an image (could be PDF)
        setValues(v => ({ ...v, [name]: value }));
      }
    } else {
      const problemListFields = [
        'ear_infection', 'ear_fullness', 'ear_pain', 'otorrhea', 'tinnitus',
        'loudness_discomfort', 'hearing_difficulties', 'communication_difficulties',
        'vestibular_symptoms', 'duration_frequency', 'triggers',
        'impression_r', 'impression_l', 'reliability'
      ];
      setValues(v => {
        const next = { ...v, [name]: value };
        if (problemListFields.includes(name)) {
          next.problem_list = updateProblemListFromFormValues(v.problem_list, next);
        }
        return next;
      });
    }
  };

  const handleAction = (type) => {
    if (type === "back") onBack?.();

    if (type === "clear") {
      setValues({});
      setSubmitted(false);
      localStorage.removeItem(storageKey);
    }

    if (type === "save") {
      localStorage.setItem(
        storageKey,
        JSON.stringify({ values, updatedAt: new Date() })
      );
      alert("Audiology draft saved");
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    onSubmit?.(values);
    alert("Audiology assessment submitted");
  };

  /* ===================== SCHEMAS ===================== */

const SUBJECTIVE_SCHEMA = {
  actions: [
    { type: "back", label: "Back" },
    { type: "clear", label: "Clear" },
    { type: "save", label: "Save" }
  ],
  sections: [
    /* ===================== A. OTOLOGY ===================== */
    {
      title: "A. Otology",
      fields: [
        {
          name: "ear_infection",
          label: "Ear Infection",
          type: "radio",
          options: [
            { label: "No", value: "none" },
            ...IMPAIRED_LOCATION
          ]
        },
        {
          name: "ear_infection_notes",
          label: "",
          type: "textarea",
          showIf: { 
            field: "ear_infection", 
            oneOf: ["right", "left", "bilateral"] 
          }
        },

        {
          name: "ear_fullness",
          label: "Echo or Ear Fullness",
          type: "radio",
          options: [
            { label: "No", value: "none" },
            ...IMPAIRED_LOCATION
          ]
        },
        {
          name: "ear_fullness_notes",
          label: "",
          type: "textarea",
          showIf: { 
            field: "ear_fullness", 
            oneOf: ["right", "left", "bilateral"] 
          }
        },

        {
          name: "head_neck_injury",
          label: "Head or Neck Injury",
          type: "textarea"
        },

        {
          name: "ear_pain",
          label: "Otalgia",
          type: "radio",
          options: [
            { label: "No", value: "none" },
            ...IMPAIRED_LOCATION
          ]
        },
        {
          name: "ear_pain_notes",
          label: "",
          type: "textarea",
          showIf: { 
            field: "ear_pain", 
            oneOf: ["right", "left", "bilateral"] 
          }
        },

        {
          name: "otorrhea",
          label: "Otorrhea",
          type: "radio",
          options: [
            { label: "No", value: "none" },
            ...IMPAIRED_LOCATION
          ]
        },
        {
          name: "otorrhea_notes",
          label: "",
          type: "textarea",
          showIf: { 
            field: "otorrhea", 
            oneOf: ["right", "left", "bilateral"] 
          }
        },

        {
          name: "otology_others",
          label: "Others",
          type: "textarea"
        }
      ]
    },

    /* ===================== B. HEARING ===================== */
    {
      title: "B. Hearing",
      fields: [
        {
          name: "tinnitus",
          label: "Tinnitus",
          type: "radio",
          options: [
            { label: "No", value: "none" },
            { label: "Right", value: "right" },
            { label: "Left", value: "left" },
            { label: "Bilateral", value: "bilateral" },
            { label: "In the Head", value: "in_head" }
          ]
        },
        {
          name: "tinnitus_notes",
          label: "",
          type: "textarea",
          showIf: { 
            field: "tinnitus", 
            oneOf: ["right", "left", "bilateral", "in_head"] 
          }
        },

        {
          name: "loudness_discomfort",
          label: "Loudness Discomfort",
          type: "radio",
          options: [
            { label: "No", value: "none" },
            ...IMPAIRED_LOCATION
          ]
        },
        {
          name: "loudness_notes",
          label: "",
          type: "textarea",
          showIf: { 
            field: "loudness_discomfort", 
            oneOf: ["right", "left", "bilateral"] 
          }
        },

        {
          name: "hearing_difficulties",
          label: "Hearing Difficulties",
          type: "radio",
          options: [
            { label: "No", value: "none" },
            ...IMPAIRED_LOCATION
          ]
        },
        {
          name: "hearing_difficulties_notes",
          label: "",
          type: "textarea",
          showIf: { 
            field: "hearing_difficulties", 
            oneOf: ["right", "left", "bilateral"] 
          }
        },

        {
          name: "communication_difficulties",
          label: "Communication Difficulties",
          type: "radio",
          options: [
            { label: "None", value: "none" },
            { label: "In quiet", value: "in_quiet" },
            { label: "In noise", value: "in_noise" },
            { label: "Group", value: "group" },
            { label: "Telephone", value: "telephone" }
          ]
        },
        {
          name: "communication_notes",
          label: "",
          type: "textarea",
          showIf: { 
            field: "communication_difficulties", 
            oneOf: ["in_quiet", "in_noise", "group", "telephone"] 
          }
        },

        {
          name: "exposure_loud_sounds",
          label: "Exposure to Loud Sounds",
          type: "radio",
          options: [
            { label: "No", value: "none" },
            { label: "Occupational", value: "occupational" },
            { label: "Recreational", value: "recreational" }
          ]
        },
        {
          name: "exposure_notes",
          label: "",
          type: "textarea",
          showIf: { 
            field: "exposure_loud_sounds", 
            oneOf: ["occupational", "recreational"] 
          }
        },

        {
          name: "family_social_from_registration",
          label: "Family History (From Customer Service)",
          type: "textarea",
          readOnly: true
        },

        {
          name: "family_history_notes",
          label: "",
          type: "textarea",
          showIf: { field: "family_history", exists: true }
        },

        {
          name: "psychosocial_impact",
          label: "Psychosocial Impact",
          type: "radio",
          options: [
            { label: "No", value: "0" },
            { label: "Withdrawal", value: "1" },
            { label: "Stress", value: "2" },
            { label: "Anxiety", value: "3" },
            { label: "Low self-confidence", value: "4" }
          ]
        },
        {
          name: "psychosocial_notes",
          label: "",
          type: "textarea",
          showIf: { field: "psychosocial_impact", exists: true }
        },

        {
          name: "environmental_context",
          label: "Environmental Context",
          type: "radio",
          options: [
            { label: "No", value: "0" },
            { label: "Noisy environment", value: "1" },
            { label: "Supportive family", value: "2" },
            { label: "Uses assistive device", value: "3" }
          ]
        },
        {
          name: "environmental_notes",
          label: "",
          type: "textarea",
          showIf: { field: "environmental_context", exists: true }
        },

        {
          name: "presence_amplification",
          label: "Presence of Amplification",
          type: "radio",
          options: [
            { label: "Yes", value: "1" },
            { label: "No", value: "0" }
          ]
        },
        {
          name: "amplification_notes",
          label: "",
          type: "textarea",
          showIf: { field: "presence_amplification", equals: "1" }
        }
      ]
    },

    /* ===================== C. VESTIBULAR ===================== */
    {
      title: "C. Vestibular",
      fields: [
        {
          name: "vestibular_symptoms",
          label: "Symptoms",
          type: "radio",
          options: [
            { label: "No", value: "0" },
            { label: "Vertigo", value: "1" },
            { label: "Imbalance", value: "2" },
            { label: "Dizziness", value: "3" },
            { label: "Oscillopsia", value: "4" }
          ]
        },
        {
          name: "vestibular_notes",
          label: "",
          type: "textarea",
          showIf: { field: "vestibular_symptoms", exists: true }
        },

        {
          name: "duration_frequency",
          label: "Duration / Frequency",
          type: "textarea"
        },

        {
          name: "triggers",
          label: "Triggers",
          type: "radio",
          options: [
            { label: "No", value: "0" },
            { label: "Positional", value: "1" },
            { label: "Head movement", value: "2" },
            { label: "Visual stimuli", value: "3" },
            { label: "Spontaneous", value: "4" }
          ]
        },
        {
          name: "trigger_notes",
          label: "",
          type: "textarea",
          showIf: { field: "triggers", exists: true }
        },

        {
          name: "falls_history",
          label: "Fall History",
          type: "textarea"
        },

        {
          name: "vestibular_others",
          label: "Others",
          type: "textarea"
        }
      ]
    },
        {
      
      fields: [
        {
          type: "row",
          columns: 2,
          fields: [
            {
              type: "attach-file",
              name: "audiometry_report_right",
              accept: "application/pdf,image/*",
              title: "Audiometry - Right",
              multiple: false,
              previewSize: { width: 400, height: 400 },
              hideInputAfterSelect: true
            },
            {
              type: "attach-file",
              name: "audiometry_report_left",
              accept: "application/pdf,image/*",
              title: "Audiometry - Left",
              multiple: false,
              previewSize: { width: 400, height: 400 },
              hideInputAfterSelect: true
            }
          ]
        },
        {
          type: "row",
          fields: [
            {
              name: "impression_r",
              label: "Impression – Right Ear",
              type: "textarea"
            },
            {
              name: "impression_l",
              label: "Impression – Left Ear",
              type: "textarea"
            }
          ]
        },
        {
          name: "audiometry_type",
          label: "Type of Audiometry",
          type: "radio",
          options: [
            { label: "Screening", value: "screening" },
            { label: "Diagnostic Pure Tone", value: "pta" },
            { label: "Play", value: "play" },
            { label: "Visual Reinforcement (VR)", value: "vra" }
          ]
        },

        {
          name: "masking",
          label: "Masking",
          type: "radio",
          options: [
            { label: "Unmasked", value: "unmasked" },
            { label: "Masking", value: "masked" }
          ]
        },
        {
          name: "reliability",
          label: "Reliability",
          type: "radio",
          options: [
            { label: "Good", value: "Good" },
            { label: "Fair", value: "Fair" },
            { label: "Poor", value: "Poor" }
          ]
        },
      ]
    }
  ]
};


const DB_HL_OPTIONS = [
  { label: "-20", value: -20 },
  { label: "-15", value: -15 },
  { label: "-10", value: -10 },
  { label: "-5", value: -5 },
  { label: "0", value: 0 },
  { label: "5", value: 5 },
  { label: "10", value: 10 },
  { label: "15", value: 15 },
  { label: "20", value: 20 },
  { label: "25", value: 25 },
  { label: "30", value: 30 },
  { label: "35", value: 35 },
  { label: "40", value: 40 },
  { label: "45", value: 45 },
  { label: "50", value: 50 },
  { label: "55", value: 55 },
  { label: "60", value: 60 },
  { label: "65", value: 65 },
  { label: "70", value: 70 },
  { label: "75", value: 75 },
  { label: "80", value: 80 },
  { label: "85", value: 85 },
  { label: "90", value: 90 },
  { label: "95", value: 95 },
  { label: "100", value: 100 },
  { label: "105", value: 105 },
  { label: "110", value: 110 },
  { label: "115", value: 115 },
  { label: "120", value: 120 }
];
const AUDIO_FREQUENCIES = [250, 500, 1000, 2000, 3000, 4000, 6000, 8000];

const OBJECTIVE_SCHEMA = {
  actions: SUBJECTIVE_SCHEMA.actions,
  sections: [
    /* ===================== OTOSCOPIC EXAMINATION ===================== */
    {
      title: "Otoscopic Examination",
      fields: [
        {
          type: "row",
          columns: 2,
          fields: [
            {
              type: "attach-file",
              name: "otoscopic_examination_right",
              accept: "application/pdf,image/*",
              title: "Otoscopic Examination - Right",
              multiple: false,
              previewSize: { width: 400, height: 400 },
              hideInputAfterSelect: true
            },
            {
              type: "attach-file",
              name: "otoscopic_examination_left",
              accept: "application/pdf,image/*",
              title: "Otoscopic Examination - Left",
              multiple: false,
              previewSize: { width: 400, height: 400 },
              hideInputAfterSelect: true
            }
          ]
        }, 
        {
          type: "paired-select",
          right: { name: "external_canal_r", title: "External Ear Canal – Right" },
          left: { name: "external_canal_l", title: "External Ear Canal – Left" },
          options: [
            { label: "Clear", value: "clear" },
            { label: "Inflamed", value: "inflamed" },
            { label: "Minimal cerumen", value: "minimal_cerumen" },
            { label: "Impacted cerumen", value: "impacted_cerumen" },
            { label: "Discharge present", value: "discharge" },
            { label: "Swelling", value: "swelling" }
          ]
        },

        {
          type: "paired-select",
          right: { name: "tm_appearance_r", title: "Tympanic Membrane (TM) Appearance – Right" },
          left: { name: "tm_appearance_l", title: "Tympanic Membrane (TM) Appearance – Left" },
          options: [
            { label: "Intact", value: "intact" },
            { label: "Perforated", value: "perforated" },
            { label: "Dull", value: "dull" },
            { label: "Retracted", value: "retracted" },
            { label: "Bulging", value: "bulging" },
            { label: "Opaque", value: "opaque" }
          ]
        },

        {
          type: "paired-select",
          right: { name: "tm_colour_r", title: "TM Colour – Right" },
          left: { name: "tm_colour_l", title: "TM Colour – Left" },
          options: [
            { label: "Pearly grey", value: "pearly_grey" },
            { label: "Reddened", value: "red" },
            { label: "Yellowish", value: "yellow" },
            { label: "Bluish", value: "blue" },
            { label: "White patches", value: "white_patches" }
          ]
        },

        {
          type: "paired-text",
          pairs: [
            { name: "otoscopy_other_r", title: "Other Findings – Right" },
            { name: "otoscopy_other_l", title: "Other Findings – Left" }
          ]
        }
      ]
    },

    /* ===================== TYMPANOMETRY ===================== */
    {
      title: "Tympanometry",
      fields: [
        {
          type: "row",
          columns: 2,
          fields: [
            {
              type: "attach-file",
              name: "tympanometry_report_right",
              accept: "application/pdf,image/*",
              title: "Tympanometry - Right",
              multiple: false,
              previewSize: { width: 400, height: 400 },
              hideInputAfterSelect: true
            },
            {
              type: "attach-file",
              name: "tympanometry_report_left",
              accept: "application/pdf,image/*",
              title: "Tympanometry - Left",
              multiple: false,
              previewSize: { width: 400, height: 400 },
              hideInputAfterSelect: true
            }
          ]
        },
        {
          type: "paired-select",
          right: { name: "tymp_type_r", title: "Right Ear" },
          left: { name: "tymp_type_l", title: "Left Ear" },

          options: [
            { label: "Type A", value: "A" },
            { label: "Type As", value: "As" },
            { label: "Type Ad", value: "Ad" },
            { label: "Type B (Normal ECV)", value: "B_normal" },
            { label: "Type B (Small ECV)", value: "B_small" },
            { label: "Type B (Large ECV)", value: "B_large" },
            { label: "Type C", value: "C" }
          ]
        },

        {
          type: "paired-text",
          name: "peak_pressure",
          pairs: [
          { name: "peak_pressure_r", title: "Peak Pressure (daPa) – Right" },
          { name: "peak_pressure_l", title: "Peak Pressure (daPa) – Left" }
      ]},

        {
          type: "paired-text",
          name: "static_compliance",
          pairs: [
          { name: "static_compliance_r", title: "Static Compliance (ml / cm³) – Right" },
        { name: "static_compliance_l", title: "Static Compliance (ml / cm³) – Left" }]
        },

        {
          type: "paired-text",
          name: "ecv",
          pairs: [
            { name: "ecv_r", title: "Ear Canal Volume (ml / cm³) – Right" },
          { name: "ecv_l", title: "Ear Canal Volume (ml / cm³) – Left" }]
        }
      ]
    },

    /* ===================== OAE ===================== */
    {
      title: "OAE Screening",
      fields: [
        {
          type: "row",
          columns: 2,
          fields: [
            {
              type: "attach-file",
              name: "oae_right_upload",
              accept: "application/pdf,image/*",
              title: "OAE – Right Ear",
              multiple: false
            },
            {
              type: "attach-file",
              name: "oae_left_upload",
              accept: "application/pdf,image/*",
              title: "OAE – Left Ear",
              multiple: false
            }
          ]
        },
        {
          type: "row",
          fields: [
            {
              name: "oae_right",
              label: "",
              type: "radio",
              options: [
                { label: "Pass", value: "pass" },
                { label: "Refer", value: "refer" },
                { label: "Could Not test", value: "could_not_test" }
              ]
            },
            {
              name: "oae_left",
              label: "",
              type: "radio",
              options: [
                { label: "Pass", value: "pass" },
                { label: "Refer", value: "refer" },
                { label: "Could Not test", value: "could_not_test" }
              ]
            }
          ]
        },
        {
          type: "row",
          columns: 2,
          fields: [
            {
              type: "attach-file",
              name: "dpoae_right_upload",
              accept: "application/pdf,image/*",
              title: "DPOAE – Right Ear",
              multiple: false
            },
            {
              type: "attach-file",
              name: "dpoae_left_upload",
              accept: "application/pdf,image/*",
              title: "DPOAE – Left Ear",
              multiple: false
            }
          ]
        },
        {
          type: "row",
          fields: [
            {
              name: "dpoae_right",
              label: "",
              type: "radio",
              options: [
                { label: "Pass", value: "pass" },
                { label: "Refer", value: "refer" },
                { label: "Could Not test", value: "could_not_test" }
              ]
            },
            {
              name: "dpoae_left",
              label: "",
              type: "radio",
              options: [
                { label: "Pass", value: "pass" },
                { label: "Refer", value: "refer" },
                { label: "Could Not test", value: "could_not_test" }
              ]
            }
          ]
        },
        {
          type: "row",
          columns: 2,
          fields: [
            {
              type: "attach-file",
              name: "teoae_right_upload",
              accept: "application/pdf,image/*",
              title: "TEOAE – Right Ear",
              multiple: false
            },
            {
              type: "attach-file",
              name: "teoae_left_upload",
              accept: "application/pdf,image/*",
              title: "TEOAE – Left Ear",
              multiple: false
            }
          ]
        },
        {
          type: "row",
          fields: [
            {
              name: "teoae_right",
              label: "",
              type: "radio",
              options: [
                { label: "Pass", value: "pass" },
                { label: "Refer", value: "refer" },
                { label: "Could Not test", value: "could_not_test" }
              ]
            },
            {
              name: "teoae_left",
              label: "",
              type: "radio",
              options: [
                { label: "Pass", value: "pass" },
                { label: "Refer", value: "refer" },
                { label: "Could Not test", value: "could_not_test" }
              ]
            }
          ]
        }
      ]
    }

  ]
};


  const ASSESSMENT_SCHEMA = {
    actions: SUBJECTIVE_SCHEMA.actions,
    fields: [
      {
        name: "problem_list",
        label: "Problem Listing",
        type: "textarea"
      },
      {
        name: "clinical_impression",
        label: "Clinical Impression",
        type: "textarea"
      }
    ]
  };

  const PLAN_SCHEMA = {
    actions: SUBJECTIVE_SCHEMA.actions,
    fields: [
      {
        name: "plan_short_term_goals",
        label: "Short Term Goals",
        type: "textarea"
      },
      {
        name: "plan_target_date_short_term",
        label: "Target Date (Short Term)",
        type: "date"
      },
      {
        name: "plan_long_term_goals",
        label: "Long Term Goals",
        type: "textarea"
      },
      {
        name: "plan_target_date_long_term",
        label: "Target Date (Long Term)",
        type: "date"
      },
      {
        name: "plan_list",
        label: "Intervention Plan",
        type: "textarea"
      },
      {
        name: "plan_options",
        label: "Required further assessment",
        type: "multi-select-dropdown",
        options: [
          { label: "Otoscopic Examination", value: "otoscopic" },
          { label: "Tympanometry", value: "tympanometry" },
          { label: "Audiometry", value: "audiometry" },
          { label: "Acoustic Reflex", value: "acoustic_reflex" },
          { label: "OAE Screening", value: "oae_screening" },
          { label: "Eustachian tube Function", value: "eustachian_tube" },
          { label: "Auditory steady-state response", value: "assr" },
          { label: "Auditory brainstem response", value: "abr" },
          { label: "Electrophysiology for hearing", value: "electrophysiology" },
          { label: "Special test", value: "special_test" },
          { label: "Hearing Handicap Inventory for Adults (HHIA)", value: "hhia" },
          { label: "Client oriented scale of improvement (COSI)", value: "cosi" },
          { label: "Tinnitus", value: "tinnitus" },
          { label: "Hyperacusis", value: "hyperacusis" },
          { label: "Vestibular", value: "vestibular" },
          { label: "Speech Test", value: "speech_test" }
        ]
      },
      {
        name: "plan_tinnitus_options",
        label: "Tinnitus Options",
        type: "multi-select-dropdown",
        showIf: { field: "plan_options", includes: "tinnitus" },
        options: [
          { label: "Tinnitus Handicap Inventory (THI)", value: "thi" },
          { label: "Tinnitus Functional Index (TFI)", value: "tfi" },
          { label: "Tinnitus Visual Analog Scale (VAS)", value: "tinnitus_vas" },
          { label: "Tinnitus Annoyance", value: "tinnitus_annoyance" },
          { label: "Tinnitus Awareness", value: "tinnitus_awareness" }
        ]
      },
      {
        name: "plan_hyperacusis_options",
        label: "Hyperacusis Options",
        type: "multi-select-dropdown",
        showIf: { field: "plan_options", includes: "hyperacusis" },
        options: [
          { label: "Modified Khalfa Hyperacusis Questionnaire", value: "khalfa" },
          { label: "Hyperacusis Questionnaire (HQ)", value: "hq" },
          { label: "Visual Analog Scale (VAS) – Loudness Discomfort", value: "vas_loudness" },
          { label: "Visual Analog Scale (VAS) – Annoyance", value: "vas_annoyance" }
        ]
      },
      {
        name: "plan_vestibular_options",
        label: "Vestibular Options",
        type: "multi-select-dropdown",
        showIf: { field: "plan_options", includes: "vestibular" },
        options: [
          { label: "Dizziness Handicap Inventory (DHI)", value: "dhi" },
          { label: "Visual Vertigo Analogue Score (VVAS)", value: "vvas" },
          { label: "Vertigo Handicap Questionnaire (VHQ)", value: "vhq" },
          { label: "Malay Version Vertigo Symptom Scale (MVVSS)", value: "mvvss" },
          { label: "Vestibular Evaluation", value: "vestibular_eval" },
          { label: "Dynamic Visual Acuity (DVA)", value: "dva" },
          { label: "Video Head Impulse Test (vHIT)", value: "vhit" },
          { label: "Posturography", value: "posturography" },
          { label: "Functional Gait Assessment", value: "fga" },
          { label: "cVEMP", value: "cvemp" },
          { label: "oVEMP", value: "ovemp" },
          { label: "Videonystagmography", value: "videonystagmography" }
        ]
      },
      {
        name: "plan_special_test_details",
        label: "Special Test Details",
        type: "textarea",
        placeholder: "Enter special test details...",
        showIf: { field: "plan_options", includes: "special_test" }
      },
      {
        name: "plan_next_follow_up",
        label: "Next Follow-Up",
        type: "date"
      },
      {
        name: "plan_required_referral",
        label: "Required Referral",
        type: "radio",
        options: [
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" }
        ]
      },
      {
        name: "plan_required_referral_details",
        label: "",
        type: "input",
        placeholder: "Specify referral details...",
        showIf: { field: "plan_required_referral", equals: "yes" }
      }
    ]
  };

  const schemaMap = {
    subjective: SUBJECTIVE_SCHEMA,
    objective: OBJECTIVE_SCHEMA,
    assessment: ASSESSMENT_SCHEMA,
    plan: PLAN_SCHEMA
  };

  /* ===================== PATIENT INFO ===================== */
  const AUDIO_CONTAINER_SCHEMA = {
    title: "Patient Information",
    sections: []
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString();
  };

  const today = new Date();

  const calculateDuration = (onset) => {
    if (!onset) return "-";
    const onsetDate = new Date(onset);
    const diffMs = today - onsetDate;

    if (diffMs < 0) return "-";

    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (years > 0) return `${years} yr ${months % 12} mo`;
    if (months > 0) return `${months} mo`;
    return `${days} days`;
  };

  function AudioPatientInfo({ patient }) {
    if (!patient) return null;

    const handleDoctorsReport = () => {
      alert("Report will be generating soon");
    };

    return (
      <div style={section}>
        <div style={patientGrid}>
          <div><b>Name:</b> {patient.name}</div>
          <div><b>IC:</b> {patient.id}</div>
          <div><b>DOB:</b> {formatDate(patient.dob)}</div>
          <div><b>Age / Gender:</b> {patient.age} / {patient.sex}</div>
          <div><b>ICD:</b> {patient.icd}</div>
          <div><b>Marital Status:</b> {patient.marital_status || patient.marital || "-"}</div>
          <div><b>Occupation:</b> {patient.occupation || "-"}</div>
          <div><b>Place of Residence:</b> {patient.residence || patient.place_of_residence || "-"}</div>
          <div><b>Date of Assessment:</b> {today.toLocaleDateString()}</div>
          <div style={{ gridColumn: "1 / -1" }}>
            <button style={doctorsReportBtn} onClick={handleDoctorsReport}>
              Doctors Reports
            </button>
          </div>
        </div>
      </div>
    );
  }

function AudiometryFrequencyTable({ value = {}, onChange }) {
  const frequencies = [250, 500, 1000, 2000, 3000, 4000, 6000, 8000];

  const columns = [
    { key: "ac_right", label: "Air Conduction Right (dB HL)" },
    { key: "ac_left", label: "Air Conduction Left (dB HL)" },
    { key: "bc_right", label: "Bone Conduction Right (dB HL)" },
    { key: "bc_left", label: "Bone Conduction Left (dB HL)" }
  ];

  const options = [
    -20, -15, -10, -5, 0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60,
    65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120
  ].map(v => ({ label: String(v), value: v }));

  return (
    <div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "120px repeat(4, 170px)",
          fontSize: 14,
          fontWeight: 600,
          gap:20,
          marginBottom: 8
        }}
      >
        <div>Frequency (Hz)</div>
        {columns.map(c => (
          <div key={c.key}>{c.label}</div>
        ))}
      </div>

      {frequencies.map(freq => (
        <div
          key={freq}
          style={{
            display: "grid",
            gridTemplateColumns: "120px repeat(4, 170px)",
            gap:20,
            gap: 12,
            marginBottom: 6
          }}
        >
          <div style={{ fontSize: 14, fontWeight: 500 }}>{freq}</div>

          {columns.map(col => (
            <select
              key={col.key}
              value={value?.[freq]?.[col.key] ?? ""}
              style={{
                width: 170,
                gap:20,
                padding: "6px 8px",
                fontSize: 14
              }}
              onChange={e =>
                onChange("pta_matrix", {
                  ...value,
                  [freq]: {
                    ...value[freq],
                    [col.key]: Number(e.target.value)
                  }
                })
              }
            >
              <option value="">–</option>
              {options.map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          ))}
        </div>
      ))}
    </div>
  );
}



  /* ===================== RENDER ===================== */

  return (
<div style={mainContent}>
  {/* ===== PATIENT INFORMATION CARD ===== */}
  <CommonFormBuilder
    schema={AUDIO_CONTAINER_SCHEMA}
    values={{}}
    onChange={() => {}}
  >
    <AudioPatientInfo patient={patient} />
  </CommonFormBuilder>

  {/* ===== TABS ===== */}
  <div style={tabBar}>
    {["subjective", "objective", "assessment", "plan"].map(tab => (
      <div
        key={tab}
        style={activeTab === tab ? tabActive : tabBtn}
        onClick={() => setActiveTab(tab)}
      >
        {tab.toUpperCase()}
      </div>
    ))}
  </div>

  {/* ===== TAB CONTENT ===== */}
  {processingOCR && (
    <div style={{
      padding: "12px 16px",
      marginBottom: "16px",
      background: "#e0f2fe",
      border: "1px solid #0ea5e9",
      borderRadius: "8px",
      color: "#0c4a6e",
      fontWeight: 600,
      textAlign: "center"
    }}>
      🔄 Processing image with OCR... Please wait
    </div>
  )}
  <CommonFormBuilder
    schema={schemaMap[activeTab]}
    values={values}
    onChange={onChange}
    submitted={submitted}
    onAction={handleAction}
  >




    {/* Submit button stays */}
    <div style={submitRow}>
      <button style={submitBtn} onClick={handleSubmit}>
        Submit Audiology Assessment
      </button>
    </div>
  </CommonFormBuilder>
</div>

  );
}

/* ===================== STYLES ===================== */

const mainContent = { margin: "0 auto",width:"100%" };

const tabBar = {
  display: "flex",
  gap: 12,
  justifyContent: "center",
  borderBottom: "1px solid #ddd",
  marginBottom: 12
};

const tabBtn = {
  padding: "10px 22px",
  fontWeight: 600,
  cursor: "pointer",
  color: "#0f172a"
};

const tabActive = {
  ...tabBtn,
  borderBottom: "3px solid #2451b3",
  color: "#2451b3"
};

const submitRow = {
  display: "flex",
  justifyContent: "flex-end",
  marginTop: 20
};

const submitBtn = {
  padding: "12px 32px",
  background: "#2563EB",
  color: "#fff",
  border: "none",
  borderRadius: 10,
  fontSize: 15,
  fontWeight: 700
};

const section = {
  marginBottom: 24
};const patientGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 12,
  fontSize: 14
};const doctorsReportBtn = {
  padding: "10px 20px",
  background: "#2563EB",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  fontSize: 14,
  fontWeight: 600,
  cursor: "pointer",
  marginTop: 8
};