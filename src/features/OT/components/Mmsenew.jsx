import React, { useState, useRef, useLayoutEffect } from "react";

// ─── Sub-components defined OUTSIDE the main component to prevent remounting ───

const CheckboxRow = ({ label, checked, onChange }) => (
  <div style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 0',
    borderBottom: '1px solid #f1f5f9'
  }}>
    <span style={{ fontSize: 14, color: '#334155', flex: 1 }}>{label}</span>
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      style={{ width: 18, height: 18, cursor: 'pointer' }}
    />
  </div>
);

const InfoIcon = ({ text }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  return (
    <div style={{ position: 'relative', display: 'inline-block', marginLeft: 6 }}>
      <div
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: 16, height: 16, borderRadius: '50%', background: '#94a3b8',
          color: 'white', fontSize: 11, fontWeight: 600, cursor: 'help', flexShrink: 0
        }}
      >
        i
      </div>
      {showTooltip && (
        <div style={{
          position: 'absolute', top: '50%', left: '100%', transform: 'translateY(-50%)',
          background: '#1e293b', color: 'white', padding: '8px 12px', borderRadius: 6,
          fontSize: 12, maxWidth: 280, whiteSpace: 'normal', zIndex: 1000,
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)', marginLeft: 10, lineHeight: 1.4
        }}>
          {text}
          <div style={{
            position: 'absolute', top: '50%', right: '100%', transform: 'translateY(-50%)',
            border: '6px solid transparent', borderRightColor: '#1e293b'
          }} />
        </div>
      )}
    </div>
  );
};

const OrientationSection = ({ orientation, toggleOrientation, orientationScore }) => {
  const timeQuestions = [
    { key: 'q1a', text: 'a) What year is it? (accept exact answer only)' },
    { key: 'q1b', text: 'b) What season is it? (last week of old season or first week of new season acceptable)' },
    { key: 'q1c', text: "c) What is today's date? (accept previous or next day's date)" },
    { key: 'q1d', text: 'd) What day of the week is it? (accept exact answer only)' },
    { key: 'q1e', text: 'e) What month of the year is it? (first day of new month or last day of previous month acceptable)' },
  ];
  const placeQuestions = [
    { key: 'q2a', text: 'a) What state of Australia are we in? (accept exact answer only)' },
    { key: 'q2b', text: 'b) What city are we in? (accept exact answer only)' },
    { key: 'q2c', text: 'c) What suburb are we in? (accept exact answer only)' },
    { key: 'q2d', text: 'd) What floor of the building are we on or what ward are we on? (accept exact answer only)' },
    { key: 'q2e', text: 'e) What is the name of this place? (accept exact answer only)' },
  ];
  return (
    <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: 16, marginBottom: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, borderBottom: '2px solid #cbd5e1', paddingBottom: 8 }}>
        <h3 style={{ margin: 0, fontSize: 16, color: '#0f172a' }}>
          Orientation <span style={{ fontWeight: 400, fontSize: 13, color: '#64748B' }}>(allow 10 seconds for each response)</span>
        </h3>
        <div style={{ fontWeight: 600, fontSize: 13, color: '#0f172a' }}>Points<br /><span style={{ fontSize: 11, fontWeight: 400 }}>(✓ = Pass)</span></div>
      </div>
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontWeight: 600, marginBottom: 8, fontSize: 14 }}>Time Orientation</div>
        {timeQuestions.map(q => (
          <CheckboxRow key={q.key} label={q.text} checked={orientation[q.key]} onChange={() => toggleOrientation(q.key)} />
        ))}
      </div>
      <div>
        <div style={{ fontWeight: 600, marginBottom: 8, fontSize: 14 }}>Place Orientation</div>
        {placeQuestions.map(q => (
          <CheckboxRow key={q.key} label={q.text} checked={orientation[q.key]} onChange={() => toggleOrientation(q.key)} />
        ))}
      </div>
      <div style={{ marginTop: 12, textAlign: 'right', fontSize: 13, color: '#64748B' }}>
        Orientation sub-total: <strong style={{ color: '#0f172a' }}>{orientationScore} / 10</strong>
      </div>
    </div>
  );
};

const RegistrationSection = ({ registration, toggleRegistration, registrationScore }) => (
  <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: 16, marginBottom: 24 }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, borderBottom: '2px solid #cbd5e1', paddingBottom: 8 }}>
      <h3 style={{ margin: 0, fontSize: 16, color: '#0f172a' }}>Registration</h3>
      <div style={{ fontWeight: 600, fontSize: 13, color: '#0f172a' }}>Points<br /><span style={{ fontSize: 11, fontWeight: 400 }}>(✓ = Pass)</span></div>
    </div>
    <p style={{ fontSize: 14, color: '#475569', marginBottom: 12 }}>
      <strong>I am going to name three objects. After I have said them, I want you to repeat them. Remember what they are because I am going to ask you to name them in a few minutes.</strong>
      <br /><br />
      Say slowly at about 1 second intervals: APPLE - TABLE - PENNY
    </p>
    <div style={{ display: 'flex', gap: 30, alignItems: 'center', marginBottom: 16, flexWrap: 'wrap' }}>
      {[['q3a', 'Apple'], ['q3b', 'Table'], ['q3c', 'Penny']].map(([key, label]) => (
        <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 14, color: '#334155' }}>{label}</span>
          <input type="checkbox" checked={registration[key]} onChange={() => toggleRegistration(key)} style={{ width: 18, height: 18, cursor: 'pointer' }} />
        </div>
      ))}
    </div>
    <div style={{ textAlign: 'right', fontSize: 13, color: '#64748B' }}>
      Registration sub-total: <strong style={{ color: '#0f172a' }}>{registrationScore} / 3</strong>
    </div>
  </div>
);

const AttentionCalculationSection = ({ attentionCalculation, toggleAttentionCalculation, attentionScore }) => (
  <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: 16, marginBottom: 24 }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, borderBottom: '2px solid #cbd5e1', paddingBottom: 8 }}>
      <h3 style={{ margin: 0, fontSize: 16, color: '#0f172a' }}>Attention and Calculation</h3>
      <div style={{ fontWeight: 600, fontSize: 13, color: '#0f172a' }}>Points<br /><span style={{ fontSize: 11, fontWeight: 400 }}>(✓ = Pass)</span></div>
    </div>

    {/* Serial 7s */}
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontSize: 14, color: '#334155', marginBottom: 12 }}>
        <strong>Can you subtract 7 from 100, and then subtract 7 from the answer you get, and keep subtracting 7 until I tell you to stop?</strong>
      </div>
      <div style={{ display: 'flex', gap: 20, alignItems: 'center', marginLeft: 20, flexWrap: 'wrap' }}>
        {['93', '86', '79', '72', '65'].map((val, idx) => {
          const key = `q4${String.fromCharCode(97 + idx)}`;
          return (
            <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 14, color: '#334155', minWidth: 35 }}>{val}</span>
              <input
                type="checkbox"
                checked={attentionCalculation.serial7[key]}
                onChange={() => toggleAttentionCalculation('serial7', key)}
                style={{ width: 18, height: 18, cursor: 'pointer' }}
              />
            </div>
          );
        })}
      </div>
    </div>

    <div style={{ textAlign: 'center', margin: '16px 0', fontWeight: 600, color: '#64748B' }}>OR</div>

    {/* WORLD backwards */}
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontSize: 14, color: '#334155', marginBottom: 8 }}>
        <strong>I am going to spell a word forwards and I want you to spell it backwards.</strong>
      </div>
      <p style={{ fontSize: 13, color: '#475569', marginBottom: 8, fontStyle: 'italic' }}>
        <strong>The word is WORLD – W – O – R – L – D. (You may help the person spell the word correctly). Now spell it backwards.</strong>
      </p>
      <p style={{ fontSize: 12, color: '#64748B', marginBottom: 12 }}>
        Repeat if necessary. Allow 30 seconds to spell it backwards. If the consumer cannot spell "world" with assistance, score 0.
        Score one for each letter in correct order. Maximum score five.
      </p>
      <div style={{ display: 'flex', gap: 20, alignItems: 'center', marginLeft: 20, flexWrap: 'wrap' }}>
        {['D', 'L', 'R', 'O', 'W'].map((letter, idx) => {
          const key = `q5${String.fromCharCode(97 + idx)}`;
          return (
            <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 14, color: '#334155', minWidth: 25, textAlign: 'center' }}>{letter}</span>
              <input
                type="checkbox"
                checked={attentionCalculation.world[key]}
                onChange={() => toggleAttentionCalculation('world', key)}
                style={{ width: 18, height: 18, cursor: 'pointer' }}
              />
            </div>
          );
        })}
      </div>
    </div>

    <div style={{ textAlign: 'right', fontSize: 13, color: '#64748B' }}>
      Attention and Calculation sub-total: <strong style={{ color: '#0f172a' }}>{attentionScore} / 5</strong>
    </div>
  </div>
);

const RecallSection = ({ recall, toggleRecall, recallScore }) => (
  <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: 16, marginBottom: 24 }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, borderBottom: '2px solid #cbd5e1', paddingBottom: 8 }}>
      <h3 style={{ margin: 0, fontSize: 16, color: '#0f172a' }}>Recall</h3>
      <div style={{ fontWeight: 600, fontSize: 13, color: '#0f172a' }}>Points<br /><span style={{ fontSize: 11, fontWeight: 400 }}>(✓ = Pass)</span></div>
    </div>
    <p style={{ fontSize: 14, color: '#475569', marginBottom: 12 }}>
      <strong>Now, what were the three objects I asked you to remember?</strong>
    </p>
    <p style={{ fontSize: 12, color: '#64748B', marginBottom: 12 }}>
      Score one point for each correct response, regardless of order. Allow 10 seconds for response. Maximum score of three.
    </p>
    <div style={{ display: 'flex', gap: 30, alignItems: 'center', marginBottom: 16, flexWrap: 'wrap' }}>
      {[['q6a', 'Apple'], ['q6b', 'Table'], ['q6c', 'Penny']].map(([key, label]) => (
        <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 14, color: '#334155' }}>{label}</span>
          <input type="checkbox" checked={recall[key]} onChange={() => toggleRecall(key)} style={{ width: 18, height: 18, cursor: 'pointer' }} />
        </div>
      ))}
    </div>
    <div style={{ textAlign: 'right', fontSize: 13, color: '#64748B' }}>
      Recall sub-total: <strong style={{ color: '#0f172a' }}>{recallScore} / 3</strong>
    </div>
  </div>
);

const LanguageSection = ({ language, toggleLanguage, languageScore }) => (
  <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, padding: 16, marginBottom: 24 }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, borderBottom: '2px solid #cbd5e1', paddingBottom: 8 }}>
      <h3 style={{ margin: 0, fontSize: 16, color: '#0f172a' }}>Language</h3>
      <div style={{ fontWeight: 600, fontSize: 13, color: '#0f172a' }}>Points<br /><span style={{ fontSize: 11, fontWeight: 400 }}>(✓ = Pass)</span></div>
    </div>

    {/* Q7 */}
    <div style={{ marginBottom: 16, padding: '12px', background: 'white', borderRadius: 6 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, color: '#334155', marginBottom: 4 }}>
            Show the consumer a wrist watch. What is this called?
            <InfoIcon text="Accept 'wrist watch' or 'watch'. Do not accept 'clock' or 'time'." />
          </div>
        </div>
        <input type="checkbox" checked={language.q7} onChange={() => toggleLanguage('q7')} style={{ width: 18, height: 18, cursor: 'pointer' }} />
      </div>
    </div>

    {/* Q8 */}
    <div style={{ marginBottom: 16, padding: '12px', background: 'white', borderRadius: 6 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, color: '#334155', marginBottom: 4 }}>Show the client a pencil. What is this called?</div>
          <div style={{ fontSize: 12, color: '#64748B', fontStyle: 'italic' }}>
            Allow 10 seconds for response. Accept 'pencil' only, not 'pen'.
            <InfoIcon text="Accept 'pencil' only. Do not accept 'pen'." />
          </div>
        </div>
        <input type="checkbox" checked={language.q8} onChange={() => toggleLanguage('q8')} style={{ width: 18, height: 18, cursor: 'pointer' }} />
      </div>
    </div>

    {/* Q9 */}
    <div style={{ marginBottom: 16, padding: '12px', background: 'white', borderRadius: 6 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, color: '#334155', marginBottom: 4 }}>I would like you to repeat a phrase after me: "No ifs, ands or buts"</div>
          <div style={{ fontSize: 12, color: '#64748B', fontStyle: 'italic' }}>
            Allow 10 seconds for response. Answer must be exact.
            <InfoIcon text="Score one point for correct repetition. Answer must be exact." />
          </div>
        </div>
        <input type="checkbox" checked={language.q9} onChange={() => toggleLanguage('q9')} style={{ width: 18, height: 18, cursor: 'pointer' }} />
      </div>
    </div>

    {/* Q10 */}
    <div style={{ marginBottom: 16, padding: '12px', background: 'white', borderRadius: 6 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, color: '#334155', marginBottom: 4 }}>Read the words on this page and do what it says.</div>
          <div style={{ fontSize: 24, fontWeight: 700, color: '#0f172a', textAlign: 'center', margin: '12px 0', padding: '12px', background: '#f1f5f9', borderRadius: 6 }}>
            Close your eyes
          </div>
          <div style={{ fontSize: 12, color: '#64748B', fontStyle: 'italic' }}>
            May repeat up to 3 times. Allow 10 seconds.
            <InfoIcon text="If consumer reads and does not close eyes, you may repeat it to a maximum of three times." />
          </div>
        </div>
        <input type="checkbox" checked={language.q10} onChange={() => toggleLanguage('q10')} style={{ width: 18, height: 18, cursor: 'pointer', marginLeft: 12 }} />
      </div>
    </div>

    {/* Q11 Three-step */}
    <div style={{ marginBottom: 20, padding: '16px', background: 'white', borderRadius: 6 }}>
      <div style={{ marginBottom: 8, fontSize: 14, color: '#0f172a' }}>
        Read the full statement before handing respondent blank piece of paper.
        <InfoIcon text="Do not repeat or coach. Allow 30 seconds." />
      </div>
      <p style={{ fontSize: 13, color: '#475569', marginBottom: 12, padding: '10px', background: '#f8fafc', borderRadius: 4 }}>
        <strong>I am going to hand you a piece of paper. When I do, take the piece of paper in your right hand, fold the paper in half with both hands and put the paper down on your lap.</strong>
      </p>
      <div style={{ marginLeft: 20 }}>
        {[['q11a', 'Takes the paper in correct hand'], ['q11b', 'Folds the paper in half'], ['q11c', 'Puts paper down on lap']].map(([key, label], i, arr) => (
          <div key={key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: i < arr.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
            <span style={{ fontSize: 14, color: '#334155' }}>{label}</span>
            <input type="checkbox" checked={language[key]} onChange={() => toggleLanguage(key)} style={{ width: 18, height: 18, cursor: 'pointer' }} />
          </div>
        ))}
      </div>
    </div>

    {/* Q12 */}
    <div style={{ marginBottom: 20, padding: '12px', background: 'white', borderRadius: 6 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, color: '#334155', marginBottom: 4 }}>Hand consumer a piece of paper and a pencil. Write any complete sentence on that piece of paper.</div>
          <div style={{ fontSize: 12, color: '#64748B', fontStyle: 'italic' }}>
            Allow 30 seconds. The sentence should have a subject and a verb, and make sense. Spelling and grammatical errors are okay.
            <InfoIcon text="The sentence should have a subject and a verb, and make sense. Spelling and grammatical errors are okay." />
          </div>
        </div>
        <input type="checkbox" checked={language.q12} onChange={() => toggleLanguage('q12')} style={{ width: 18, height: 18, cursor: 'pointer', marginLeft: 12 }} />
      </div>
    </div>

    {/* Q13 */}
    <div style={{ marginBottom: 16, padding: '16px', background: 'white', borderRadius: 6 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, color: '#334155', marginBottom: 4 }}>
            Refer to diagram shown below. Here's a drawing. Please copy the drawing on the same paper.
            <InfoIcon text="Correct if two convex, five-sided figures and intersection makes a four-sided figure. Allow 1 minute maximum." />
          </div>
          <div style={{ fontSize: 12, color: '#64748B', marginBottom: 12 }}>Hand drawing to respondent. Allow 1 minute maximum.</div>
          <div style={{ textAlign: 'center', margin: '16px 0' }}>
            <img src="/mmse-pentagon.png" alt="Pentagon design to copy" style={{ width: 200, border: '2px solid #CBD5E1', borderRadius: 10, padding: 12, background: '#fff' }} />
          </div>
        </div>
        <input type="checkbox" checked={language.q13} onChange={() => toggleLanguage('q13')} style={{ width: 18, height: 18, cursor: 'pointer', marginLeft: 12 }} />
      </div>
    </div>

    <div style={{ textAlign: 'right', fontSize: 13, color: '#64748B', paddingTop: 12, borderTop: '2px solid #e2e8f0' }}>
      Language sub-total: <strong style={{ color: '#0f172a', fontSize: 16 }}>{languageScore} / 9</strong>
    </div>
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

export default function MMSEAssessment({ onSave, onCancel }) {
  const scrollRef = useRef(null);

  const [orientation, setOrientation] = useState({
    q1a: false, q1b: false, q1c: false, q1d: false, q1e: false,
    q2a: false, q2b: false, q2c: false, q2d: false, q2e: false,
  });

  const [registration, setRegistration] = useState({ q3a: false, q3b: false, q3c: false });

  // Unified attention state — both serial7 and world tracked; score uses the higher of the two
  const [attentionCalculation, setAttentionCalculation] = useState({
    serial7: { q4a: false, q4b: false, q4c: false, q4d: false, q4e: false },
    world:   { q5a: false, q5b: false, q5c: false, q5d: false, q5e: false },
  });

  const [recall, setRecall] = useState({ q6a: false, q6b: false, q6c: false });

  const [language, setLanguage] = useState({
    q7: false, q8: false, q9: false, q10: false,
    q11a: false, q11b: false, q11c: false,
    q12: false, q13: false,
  });

  // Toggles
  const toggleOrientation = (key) => setOrientation(prev => ({ ...prev, [key]: !prev[key] }));
  const toggleRegistration = (key) => setRegistration(prev => ({ ...prev, [key]: !prev[key] }));
  const toggleAttentionCalculation = (method, key) =>
    setAttentionCalculation(prev => ({
      ...prev,
      [method]: { ...prev[method], [key]: !prev[method][key] }
    }));
  const toggleRecall = (key) => setRecall(prev => ({ ...prev, [key]: !prev[key] }));
  const toggleLanguage = (key) => setLanguage(prev => ({ ...prev, [key]: !prev[key] }));

  // Scores
  const orientationScore = Object.values(orientation).filter(Boolean).length;
  const registrationScore = Object.values(registration).filter(Boolean).length;
  const serial7Score = Object.values(attentionCalculation.serial7).filter(Boolean).length;
  const worldScore  = Object.values(attentionCalculation.world).filter(Boolean).length;
  // Use whichever method has a higher score (clinician picks one; we reflect the better)
  const attentionScore = Math.max(serial7Score, worldScore);
  const recallScore = Object.values(recall).filter(Boolean).length;
  const languageScore = Object.values(language).filter(Boolean).length;
  const total = orientationScore + registrationScore + attentionScore + recallScore + languageScore;

  const interpretation =
    total >= 24 ? "No cognitive impairment" :
    total >= 18 ? "Mild cognitive impairment" :
    total >= 10 ? "Moderate cognitive impairment" :
    "Severe cognitive impairment";

  return (
    <div style={{ maxWidth: 900, margin: '40px auto', border: '1px solid #E5E7EB', borderRadius: 16, background: '#fff', display: 'flex', flexDirection: 'column' }}>
      {/* HEADER */}
      <div style={{ padding: '18px 22px', borderBottom: '1px solid #E5E7EB', fontSize: 18, fontWeight: 700 }}>
        Mini-Mental State Examination (MMSE)
      </div>

      {/* BODY */}
      <div ref={scrollRef} style={{ padding: 20 }}>
        <OrientationSection orientation={orientation} toggleOrientation={toggleOrientation} orientationScore={orientationScore} />
        <RegistrationSection registration={registration} toggleRegistration={toggleRegistration} registrationScore={registrationScore} />
        <AttentionCalculationSection attentionCalculation={attentionCalculation} toggleAttentionCalculation={toggleAttentionCalculation} attentionScore={attentionScore} />
        <RecallSection recall={recall} toggleRecall={toggleRecall} recallScore={recallScore} />
        <LanguageSection language={language} toggleLanguage={toggleLanguage} languageScore={languageScore} />
      </div>

      {/* FOOTER */}
      <div style={{ borderTop: '1px solid #E5E7EB', padding: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc' }}>
        <div>
          <div style={{ fontSize: 16, marginBottom: 8 }}>
            <b>Total Score:</b> <span style={{ fontSize: 20, color: '#2563eb' }}>{total}</span> / 30
          </div>
          <div style={{ fontSize: 14, color: '#64748B' }}><b>Interpretation:</b> {interpretation}</div>
          <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>Score of 23 or less indicates cognitive impairment</div>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button onClick={onCancel} style={{ padding: '10px 20px', borderRadius: 6, border: '1px solid #cbd5e1', background: 'white', color: 'black', cursor: 'pointer', fontSize: 14, fontWeight: 500 }}>
            Cancel
          </button>
          <button
            onClick={() => onSave({
              total, interpretation,
              breakdown: { orientation, registration, attentionCalculation, recall, language },
              sectionScores: { orientation: orientationScore, registration: registrationScore, attentionCalculation: attentionScore, recall: recallScore, language: languageScore }
            })}
            style={{ padding: '10px 20px', borderRadius: 6, border: 'none', background: '#2563eb', color: 'white', cursor: 'pointer', fontWeight: 600, fontSize: 14 }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}