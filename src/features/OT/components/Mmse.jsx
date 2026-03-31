import React, { useState, useRef, useLayoutEffect } from "react";

export default function MMSEAssessment({ onSave, onCancel }) {

  const scrollRef = useRef(null);

  // Orientation state (10 points)
  const [orientation, setOrientation] = useState({
    // Time orientation (5 points)
    q1a: false, // What year is it?
    q1b: false, // What season is it?
    q1c: false, // What is today's date?
    q1d: false, // What day of the week is it?
    q1e: false, // What month of the year is it?
    // Place orientation (5 points)
    q2a: false, // What state of Australia are we in?
    q2b: false, // What city are we in?
    q2c: false, // What suburb are we in?
    q2d: false, // What floor/ward are we on?
    q2e: false, // What is the name of this place?
  });

  // Registration state (3 points)
  const [registration, setRegistration] = useState({
    q3a: false, // Apple
    q3b: false, // Table
    q3c: false, // Penny
  });

  // Attention and Calculation state (5 points)
  const [attentionCalculation, setAttentionCalculation] = useState({
    method: 'serial7', // 'serial7' or 'world'
    serial7: {
      q4a: false, // 93
      q4b: false, // 86
      q4c: false, // 79
      q4d: false, // 72
      q4e: false, // 65
    },
    world: {
      q5a: false, // D
      q5b: false, // L
      q5c: false, // R
      q5d: false, // O
      q5e: false, // W
    }
  });

  // Recall state (3 points)
  const [recall, setRecall] = useState({
    q6a: false, // Apple
    q6b: false, // Table
    q6c: false, // Penny
  });

  // Language state (9 points)
  const [language, setLanguage] = useState({
    q7: false,  // Name wrist watch (1 point)
    q8: false,  // Name pencil (1 point)
    q9: false,  // Repeat phrase (1 point)
    q10: false, // Read and close eyes (1 point)
    q11a: false, // Takes paper in correct hand (1 point)
    q11b: false, // Folds paper in half (1 point)
    q11c: false, // Puts paper on lap (1 point)
    q12: false, // Write sentence (1 point)
    q13: false, // Copy pentagons (1 point)
  });

  const [pentagonImage, setPentagonImage] = useState(null);

  // Toggle orientation checkbox
  const toggleOrientation = (key) => {
    setOrientation(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Toggle registration checkbox
  const toggleRegistration = (key) => {
    setRegistration(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Toggle attention/calculation checkbox
  const toggleAttentionCalculation = (method, key) => {
    setAttentionCalculation(prev => ({
      ...prev,
      [method]: { ...prev[method], [key]: !prev[method][key] }
    }));
  };

  // Set attention method
  const setAttentionMethod = (method) => {
    setAttentionCalculation(prev => ({ ...prev, method }));
  };

  // Toggle recall checkbox
  const toggleRecall = (key) => {
    setRecall(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Toggle language checkbox
  const toggleLanguage = (key) => {
    setLanguage(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Calculate section scores
  const orientationScore = Object.values(orientation).filter(Boolean).length;
  
  const registrationScore = Object.values(registration).filter(Boolean).length;
  
  const attentionScore = attentionCalculation.method === 'serial7'
    ? Object.values(attentionCalculation.serial7).filter(Boolean).length
    : Object.values(attentionCalculation.world).filter(Boolean).length;
  
  const recallScore = Object.values(recall).filter(Boolean).length;
  
  const languageScore = Object.values(language).filter(Boolean).length;

  // Total score (max 30)
  const total = orientationScore + registrationScore + attentionScore + recallScore + languageScore;

  // Interpretation
  const interpretation = total >= 24 
    ? "No cognitive impairment" 
    : total >= 18 
    ? "Mild cognitive impairment" 
    : total >= 10 
    ? "Moderate cognitive impairment" 
    : "Severe cognitive impairment";

// Alternative fix - more robust
const scrollPositionRef = useRef(0);
const isRestoringScrollRef = useRef(false);

// Save scroll position before any checkbox change
const saveScrollPosition = () => {
  if (scrollRef.current && !isRestoringScrollRef.current) {
    scrollPositionRef.current = scrollRef.current.scrollTop;
  }
};

// Restore scroll position after state updates
useLayoutEffect(() => {
  if (scrollRef.current && scrollPositionRef.current > 0) {
    isRestoringScrollRef.current = true;
    scrollRef.current.scrollTo(0, scrollPositionRef.current);
    // Reset the flag after a short delay
    setTimeout(() => {
      isRestoringScrollRef.current = false;
    }, 100);
  }
}, [orientation, registration, attentionCalculation, recall, language]);

// Update your CheckboxRow
const CheckboxRow = ({ label, checked, onChange }) => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: '8px 0',
    borderBottom: '1px solid #f1f5f9'
  }}>
    <span style={{ fontSize: 14, color: '#334155', flex: 1 }}>{label}</span>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <input 
        type="checkbox" 
        checked={checked} 
        onChange={(e) => {
          // Save current scroll position before state change
          saveScrollPosition();
          onChange();
        }}
        style={{ width: 18, height: 18, cursor: 'pointer' }}
      />
    </div>
  </div>
);

  // Orientation Section
  const OrientationSection = () => {
    const timeQuestions = [
      { key: 'q1a', text: 'a) What year is it? (accept exact answer only)' },
      { key: 'q1b', text: 'b) What season is it? (last week of old season or first week of new season acceptable)' },
      { key: 'q1c', text: 'c) What is today\'s date? (accept previous or next day\'s date)' },
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
      <div style={{ 
        background: '#f8fafc', 
        border: '1px solid #e2e8f0', 
        borderRadius: 8, 
        padding: 16, 
        marginBottom: 24 
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, borderBottom: '2px solid #cbd5e1', paddingBottom: 8 }}>
          <h3 style={{ margin: 0, fontSize: 16, color: '#0f172a' }}>
            Orientation <span style={{ fontWeight: 400, fontSize: 13, color: '#64748B' }}>(allow 10 seconds for each response)</span>
          </h3>
          <div style={{ fontWeight: 600, fontSize: 13, color: '#0f172a' }}>
            Points <br/>
            <span style={{ fontSize: 11, fontWeight: 400 }}>(✓ = Pass)</span>
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <div style={{ fontWeight: 600, marginBottom: 8, fontSize: 14 }}>Time Orientation</div>
          {timeQuestions.map(q => (
            <CheckboxRow 
              key={q.key} 
              label={q.text} 
              checked={orientation[q.key]} 
              onChange={() => toggleOrientation(q.key)} 
            />
          ))}
        </div>

        <div>
          <div style={{ fontWeight: 600, marginBottom: 8, fontSize: 14 }}>Place Orientation</div>
          {placeQuestions.map(q => (
            <CheckboxRow 
              key={q.key} 
              label={q.text} 
              checked={orientation[q.key]} 
              onChange={() => toggleOrientation(q.key)} 
            />
          ))}
        </div>
        
        <div style={{ marginTop: 12, textAlign: 'right', fontSize: 13, color: '#64748B' }}>
          Orientation sub-total: <strong style={{ color: '#0f172a' }}>{orientationScore} / 10</strong>
        </div>
      </div>
    );
  };

// Registration Section
const RegistrationSection = () => (
  <div style={{ 
    background: '#f8fafc', 
    border: '1px solid #e2e8f0', 
    borderRadius: 8, 
    padding: 16, 
    marginBottom: 24 
  }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, borderBottom: '2px solid #cbd5e1', paddingBottom: 8 }}>
      <h3 style={{ margin: 0, fontSize: 16, color: '#0f172a' }}>Registration</h3>
      <div style={{ fontWeight: 600, fontSize: 13, color: '#0f172a' }}>
        Points <br/>
        <span style={{ fontSize: 11, fontWeight: 400 }}>(✓ = Pass)</span>
      </div>
    </div>

    <p style={{ fontSize: 14, color: '#475569', marginBottom: 12 }}>
      <strong>I am going to name three objects. After I have said them, I want you to repeat them. 
      Remember what they are because I am going to ask you to name them in a few minutes.</strong>
      <br/><br/>
      Say slowly at about 1 second intervals: APPLE - TABLE - PENNY
    </p>

    {/* Checkboxes in a row */}
    <div style={{ 
      display: 'flex', 
      gap: 30, 
      alignItems: 'center', 
      marginBottom: 16,
      flexWrap: 'wrap'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 14, color: '#334155' }}>Apple</span>
        <input 
          type="checkbox" 
          checked={registration.q3a} 
          onChange={() => toggleRegistration('q3a')}
          style={{ width: 18, height: 18, cursor: 'pointer' }}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 14, color: '#334155' }}>Table</span>
        <input 
          type="checkbox" 
          checked={registration.q3b} 
          onChange={() => toggleRegistration('q3b')}
          style={{ width: 18, height: 18, cursor: 'pointer' }}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 14, color: '#334155' }}>Penny</span>
        <input 
          type="checkbox" 
          checked={registration.q3c} 
          onChange={() => toggleRegistration('q3c')}
          style={{ width: 18, height: 18, cursor: 'pointer' }}
        />
      </div>
    </div>
    
    <div style={{ textAlign: 'right', fontSize: 13, color: '#64748B' }}>
      Registration sub-total: <strong style={{ color: '#0f172a' }}>{registrationScore} / 3</strong>
    </div>
  </div>
);

// Attention and Calculation Section
const AttentionCalculationSection = () => {
  const [selectedMethod, setSelectedMethod] = useState('serial7');
  
  const [serial7Scores, setSerial7Scores] = useState({
    q4a: false, q4b: false, q4c: false, q4d: false, q4e: false,
  });

  const [worldScores, setWorldScores] = useState({
    q5a: false, q5b: false, q5c: false, q5d: false, q5e: false,
  });

  const toggleSerial7 = (key) => {
    setSerial7Scores(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleWorld = (key) => {
    setWorldScores(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const attentionScore = selectedMethod === 'serial7'
    ? Object.values(serial7Scores).filter(Boolean).length
    : Object.values(worldScores).filter(Boolean).length;

  return (
    <div style={{ 
      background: '#f8fafc', 
      border: '1px solid #e2e8f0', 
      borderRadius: 8, 
      padding: 16, 
      marginBottom: 24 
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, borderBottom: '2px solid #cbd5e1', paddingBottom: 8 }}>
        <h3 style={{ margin: 0, fontSize: 16, color: '#0f172a' }}>Attention and Calculation</h3>
        <div style={{ fontWeight: 600, fontSize: 13, color: '#0f172a' }}>
          Points <br/>
          <span style={{ fontSize: 11, fontWeight: 400 }}>(✓ = Pass)</span>
        </div>
      </div>

      {/* Question 4 - Serial 7s */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 14, color: '#334155', marginBottom: 12 }}>
        <strong>Can you subtract 7 from 100, and then subtract 7 from the answer you get, and keep subtracting 7 until I tell you to stop?</strong>
        </div>
        
        {/* Serial 7 checkboxes in a row */}
        <div style={{ 
          display: 'flex', 
          gap: 20, 
          alignItems: 'center', 
          marginLeft: 20,
          flexWrap: 'wrap'
        }}>
          {['93', '86', '79', '72', '65'].map((val, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 13, color: '#64748B' }}></span>
              <span style={{ fontSize: 14, color: '#334155', minWidth: 35 }}>{val}</span>
              <input 
                type="checkbox" 
                checked={serial7Scores[`q4${String.fromCharCode(97+idx)}`]} 
                onChange={() => toggleSerial7(`q4${String.fromCharCode(97+idx)}`)}
                style={{ width: 18, height: 18, cursor: 'pointer' }}
              />
            </div>
          ))}
        </div>
      </div>

      <div style={{ textAlign: 'center', margin: '16px 0', fontWeight: 600, color: '#64748B' }}>OR</div>

      {/* Question 5 - WORLD backwards */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 14, color: '#334155', marginBottom: 8 }}>
         <strong>I am going to spell a word forwards and I want you to spell it backwards.</strong>
        </div>
        <p style={{ fontSize: 13, color: '#475569', marginBottom: 8, fontStyle: 'italic' }}>
         <strong>The word is WORLD – W – O – R – L – D. (You may help the person spell the word correctly). 
          Now spell it backwards.</strong>
        </p>
        <p style={{ fontSize: 12, color: '#64748B', marginBottom: 12 }}>
          Repeat if necessary. Allow 30 seconds to spell it backwards. If the consumer cannot spell "world" with assistance, score 0. 
          Score one for each letter in correct order. Maximum score five.
        </p>
        
        {/* WORLD backwards checkboxes in a row */}
        <div style={{ 
          display: 'flex', 
          gap: 20, 
          alignItems: 'center', 
          marginLeft: 20,
          flexWrap: 'wrap'
        }}>
          {['D', 'L', 'R', 'O', 'W'].map((letter, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 13, color: '#64748B' }}></span>
              <span style={{ fontSize: 14, color: '#334155', minWidth: 25, textAlign: 'center' }}>{letter}</span>
              <input 
                type="checkbox" 
                checked={worldScores[`q5${String.fromCharCode(97+idx)}`]} 
                onChange={() => toggleWorld(`q5${String.fromCharCode(97+idx)}`)}
                style={{ width: 18, height: 18, cursor: 'pointer' }}
              />
            </div>
          ))}
        </div>
      </div>
      
      <div style={{ textAlign: 'right', fontSize: 13, color: '#64748B' }}>
        Attention and Calculation sub-total: <strong style={{ color: '#0f172a' }}>{attentionScore} / 5</strong>
      </div>
    </div>
  );
};

// Recall Section
const RecallSection = () => (
  <div style={{ 
    background: '#f8fafc', 
    border: '1px solid #e2e8f0', 
    borderRadius: 8, 
    padding: 16, 
    marginBottom: 24 
  }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, borderBottom: '2px solid #cbd5e1', paddingBottom: 8 }}>
      <h3 style={{ margin: 0, fontSize: 16, color: '#0f172a' }}>Recall</h3>
      <div style={{ fontWeight: 600, fontSize: 13, color: '#0f172a' }}>
        Points <br/>
        <span style={{ fontSize: 11, fontWeight: 400 }}>(✓ = Pass)</span>
      </div>
    </div>

    <p style={{ fontSize: 14, color: '#475569', marginBottom: 12 }}>
      <strong>Now, what were the three objects I asked you to remember?</strong>
    </p>
    <p style={{ fontSize: 12, color: '#64748B', marginBottom: 12 }}>
          Score one point for each correct response, regardless of order. Allow 10 seconds for response. Maximum 
          score of three.
        </p>

    {/* Checkboxes in a row */}
    <div style={{ 
      display: 'flex', 
      gap: 30, 
      alignItems: 'center', 
      marginBottom: 16,
      flexWrap: 'wrap'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 14, color: '#334155' }}>Apple</span>
        <input 
          type="checkbox" 
          checked={recall.q6a} 
          onChange={(e) => {
            
            toggleRecall('q6a');
          }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          style={{ width: 18, height: 18, cursor: 'pointer' }}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 14, color: '#334155' }}>Table</span>
        <input 
          type="checkbox" 
          checked={recall.q6b} 
          onChange={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleRecall('q6b');
          }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          style={{ width: 18, height: 18, cursor: 'pointer' }}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 14, color: '#334155' }}>Penny</span>
        <input 
          type="checkbox" 
          checked={recall.q6c} 
          onChange={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleRecall('q6c');
          }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          style={{ width: 18, height: 18, cursor: 'pointer' }}
        />
      </div>
    </div>
    
    <div style={{ textAlign: 'right', fontSize: 13, color: '#64748B' }}>
      Recall sub-total: <strong style={{ color: '#0f172a' }}>{recallScore} / 3</strong>
    </div>
  </div>
);


// Info Icon Component with Tooltip
const InfoIcon = ({ text }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div style={{ position: 'relative', display: 'inline-block', marginLeft: 6 }}>
      <div
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 16,
          height: 16,
          borderRadius: '50%',
          background: '#94a3b8',
          color: 'white',
          fontSize: 11,
          fontWeight: 600,
          cursor: 'help',
          flexShrink: 0
        }}
      >
        i
      </div>
      {showTooltip && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '100%',
          transform: 'translateY(-50%)',
          background: '#1e293b',
          color: 'white',
          padding: '8px 12px',
          borderRadius: 6,
          fontSize: 12,
          maxWidth: 280,
          whiteSpace: 'normal',
          zIndex: 1000,
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          marginLeft: 10,
          lineHeight: 1.4
        }}>
          {text}
          {/* Arrow pointing left toward the icon */}
          <div style={{
            position: 'absolute',
            top: '50%',
            right: '100%',
            transform: 'translateY(-50%)',
            border: '6px solid transparent',
            borderRightColor: '#1e293b'
          }} />
        </div>
      )}
    </div>
  );
};

// Language Section
const LanguageSection = () => (
  <div style={{ 
    background: '#f8fafc', 
    border: '1px solid #e2e8f0', 
    borderRadius: 8, 
    padding: 16, 
    marginBottom: 24 
  }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, borderBottom: '2px solid #cbd5e1', paddingBottom: 8 }}>
      <h3 style={{ margin: 0, fontSize: 16, color: '#0f172a' }}>Language</h3>
      <div style={{ fontWeight: 600, fontSize: 13, color: '#0f172a' }}>
        Points <br/>
        <span style={{ fontSize: 11, fontWeight: 400 }}>(✓ = Pass)</span>
      </div>
    </div>

    {/* Questions 7-10 */}
    <div style={{ marginBottom: 20 }}>
      {/* Question 7 */}
      <div style={{ marginBottom: 16, padding: '12px', background: 'white', borderRadius: 6 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, color: '#334155', marginBottom: 4 }}>
              Show the consumer a wrist watch. What is this called?
              <InfoIcon text="Accept 'wrist watch' or 'watch'. Do not accept 'clock' or 'time'." />
            </div>
            {/* <div style={{ fontSize: 12, color: '#64748B', fontStyle: 'italic' }}>
              Allow 10 seconds for response. Accept 'wrist watch' or 'watch'. Do not accept 'clock' or 'time'.
              
            </div> */}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 12, color: '#64748B' }}></span>
            <input 
              type="checkbox" 
              checked={language.q7} 
              onChange={() => toggleLanguage('q7')}
              style={{ width: 18, height: 18, cursor: 'pointer' }}
            />
          </div>
        </div>
      </div>

      {/* Question 8 */}
      <div style={{ marginBottom: 16, padding: '12px', background: 'white', borderRadius: 6 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, color: '#334155', marginBottom: 4 }}>
              Show the client a pencil. What is this called?
            </div>
            <div style={{ fontSize: 12, color: '#64748B', fontStyle: 'italic' }}>
              Allow 10 seconds for response. Accept 'pencil' only, not 'pen'.
              <InfoIcon text="Accept 'pencil' only. Do not accept 'pen'." />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 12, color: '#64748B' }}></span>
            <input 
              type="checkbox" 
              checked={language.q8} 
              onChange={() => toggleLanguage('q8')}
              style={{ width: 18, height: 18, cursor: 'pointer' }}
            />
          </div>
        </div>
      </div>

      {/* Question 9 */}
      <div style={{ marginBottom: 16, padding: '12px', background: 'white', borderRadius: 6 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, color: '#334155', marginBottom: 4 }}>
              I would like you to repeat a phrase after me: "No ifs, ands or buts"
            </div>
            <div style={{ fontSize: 12, color: '#64748B', fontStyle: 'italic' }}>
              Allow 10 seconds for response. Answer must be exact.
              <InfoIcon text="Score one point for correct repetition. Answer must be exact." />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 12, color: '#64748B' }}></span>
            <input 
              type="checkbox" 
              checked={language.q9} 
              onChange={() => toggleLanguage('q9')}
              style={{ width: 18, height: 18, cursor: 'pointer' }}
            />
          </div>
        </div>
      </div>

      {/* Question 10 */}
      <div style={{ marginBottom: 16, padding: '12px', background: 'white', borderRadius: 6 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, color: '#334155', marginBottom: 4 }}>
              Read the words on this page and do what it says.
            </div>
            <div style={{ 
              fontSize: 24, 
              fontWeight: 700, 
              color: '#0f172a', 
              textAlign: 'center', 
              margin: '12px 0',
              padding: '12px',
              background: '#f1f5f9',
              borderRadius: 6
            }}>
              Close your eyes
            </div>
            <div style={{ fontSize: 12, color: '#64748B', fontStyle: 'italic' }}>
              May repeat up to 3 times. Allow 10 seconds.
              <InfoIcon text="If consumer reads and does not close eyes, you may repeat it to a maximum of three times. Score only one point if consumer closes eyes." />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 12, color: '#64748B' }}></span>
            <input 
              type="checkbox" 
              checked={language.q10} 
              onChange={() => toggleLanguage('q10')}
              style={{ width: 18, height: 18, cursor: 'pointer' }}
            />
          </div>
        </div>
      </div>
    </div>

    {/* Question 11 - Three-Step Command */}
    <div style={{ marginBottom: 20, padding: '16px', background: 'white', borderRadius: 6 }}>
      <div style={{  marginBottom: 8, fontSize: 14, color: '#0f172a' }}>
        Read the full statement before handing respondent blank piece of paper.
        <InfoIcon text="Do not repeat or coach. Allow 30 seconds." />
      </div>
      <p style={{ fontSize: 13, color: '#475569', marginBottom: 12, padding: '10px', background: '#f8fafc', borderRadius: 4 }}>
        <strong>I am going to hand you a piece of paper. When I do, take the piece of paper in your right hand, fold the paper in half with both hands and put the paper down on your lap.</strong>
      </p>
      
      <div style={{ marginLeft: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
          <span style={{ fontSize: 14, color: '#334155' }}>Takes the paper in correct hand</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 12, color: '#64748B' }}></span>
            <input 
              type="checkbox" 
              checked={language.q11a} 
              onChange={() => toggleLanguage('q11a')}
              style={{ width: 18, height: 18, cursor: 'pointer' }}
            />
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
          <span style={{ fontSize: 14, color: '#334155' }}>Folds the paper in half</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 12, color: '#64748B' }}></span>
            <input 
              type="checkbox" 
              checked={language.q11b} 
              onChange={() => toggleLanguage('q11b')}
              style={{ width: 18, height: 18, cursor: 'pointer' }}
            />
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0' }}>
          <span style={{ fontSize: 14, color: '#334155' }}>Puts paper down on lap</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 12, color: '#64748B' }}></span>
            <input 
              type="checkbox" 
              checked={language.q11c} 
              onChange={() => toggleLanguage('q11c')}
              style={{ width: 18, height: 18, cursor: 'pointer' }}
            />
          </div>
        </div>
      </div>
    </div>

    {/* Question 12 - Write Sentence */}
    <div style={{ marginBottom: 20, padding: '12px', background: 'white', borderRadius: 6 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, color: '#334155', marginBottom: 4 }}>
            Hand consumer a piece of paper and a pencil. Write any complete sentence on that piece of paper.
          </div>
          <div style={{ fontSize: 12, color: '#64748B', fontStyle: 'italic' }}>
            Allow 30 seconds. The sentence should have a subject and a verb, and make sense. Spelling and grammatical errors are okay.
            <InfoIcon text="The sentence should have a subject and a verb, and make sense. Spelling and grammatical errors are okay." />
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 12, color: '#64748B' }}></span>
          <input 
            type="checkbox" 
            checked={language.q12} 
            onChange={() => toggleLanguage('q12')}
            style={{ width: 18, height: 18, cursor: 'pointer' }}
          />
        </div>
      </div>
    </div>

{/* Question 13 - Copy Design */}
<div style={{ marginBottom: 16, padding: '16px', background: 'white', borderRadius: 6 }}>
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: 14, color: '#334155', marginBottom: 4 }}>
        Refer to diagram shown below. Here's a drawing. Please copy the drawing on the same paper.
        <InfoIcon text="Correct if two convex, five-sided figures and intersection makes a four-sided figure. Allow 1 minute maximum." />
      </div>
            {/* Checkbox for scoring */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 8, marginTop: 12 }}>
        <input 
          type="checkbox" 
          checked={language.q13} 
          onChange={() => toggleLanguage('q13')}
          style={{ width: 18, height: 18, cursor: 'pointer' }}
        />
      </div>
      <div style={{ fontSize: 12, color: '#64748B', marginBottom: 12 }}>
        Hand drawing to respondent. Allow 1 minute maximum.
      </div>
      
      <div style={{ textAlign: 'center', margin: '16px 0' }}>
        <img
          src="/mmse-pentagon.png"
          alt="Pentagon design to copy"
          style={{
            width: 200,
            border: "2px solid #CBD5E1",
            borderRadius: 10,
            padding: 12,
            background: '#fff'
          }}
        />
      </div>
    </div>
  </div>
</div>
    
    <div style={{ textAlign: 'right', fontSize: 13, color: '#64748B', paddingTop: 12, borderTop: '2px solid #e2e8f0' }}>
      Language sub-total: <strong style={{ color: '#0f172a', fontSize: 16 }}>{languageScore} / 9</strong>
    </div>
  </div>
);

  return (
    <div
      style={{
        maxWidth: 900,
        margin: "40px auto",
        border: "1px solid #E5E7EB",
        borderRadius: 16,
        background: "#fff",
        display: "flex",
        flexDirection: "column"
      }}
    >
      {/* HEADER */}
      <div
        style={{
          padding: "18px 22px",
          borderBottom: "1px solid #E5E7EB",
          fontSize: 18,
          fontWeight: 700
        }}
      >
        Mini-Mental State Examination (MMSE)
      </div>

      {/* BODY */}
      <div
        ref={scrollRef}
        style={{
          padding: 20,
        }}
      >
        <OrientationSection />
        <RegistrationSection />
        <AttentionCalculationSection />
        <RecallSection />
        <LanguageSection />
      </div>

      {/* FOOTER */}
      <div
        style={{
          borderTop: "1px solid #E5E7EB",
          padding: 20,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: '#f8fafc'
        }}
      >
        <div>
          <div style={{ fontSize: 16, marginBottom: 8 }}>
            <b>Total Score:</b> <span style={{ fontSize: 20, color: '#2563eb' }}>{total}</span> / 30
          </div>
          <div style={{ fontSize: 14, color: '#64748B' }}>
            <b>Interpretation:</b> {interpretation}
          </div>
          <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>
            Score of 23 or less indicates cognitive impairment
          </div>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          <button 
            onClick={onCancel}
            style={{ 
              padding: '10px 20px', 
              borderRadius: 6, 
              border: '1px solid #cbd5e1', 
              background: 'white', 
              color: 'black',
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: 500
            }}
          >
            Cancel
          </button>

          <button
            onClick={() =>
              onSave({
                total,
                interpretation,
                breakdown: {
                  orientation,
                  registration,
                  attentionCalculation,
                  recall,
                  language
                },
                sectionScores: {
                  orientation: orientationScore,
                  registration: registrationScore,
                  attentionCalculation: attentionScore,
                  recall: recallScore,
                  language: languageScore
                },
                pentagonImage
              })
            }
            style={{ 
              padding: '10px 20px', 
              borderRadius: 6, 
              border: 'none', 
              background: '#2563eb', 
              color: 'white', 
              cursor: 'pointer', 
              fontWeight: 600,
              fontSize: 14
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}