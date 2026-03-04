import React, { useState, useEffect } from "react";

export default function DLOTCAForm() {
  const memoryItems = ["Apple", "Pen", "Tie", "House", "Car"];

  const [form, setForm] = useState({
    day: "",
    year: "",
    state: "",
    moneyLeft: "",
    animals: "",
    recall: [],
    reverse98: "",
    reverse486: "",
    reverse8537: "",
    clockHours: "",
    clockMinutes: "",
    shapeX: "",
    largestShape: "",
    storyName: "",
    storyWork: "",
    storyReturn: "",
    storyState: "",
  });

  const [totalScore, setTotalScore] = useState(0);

  const handleChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const toggleRecall = (item) => {
    if (form.recall.includes(item)) {
      handleChange(
        "recall",
        form.recall.filter((i) => i !== item)
      );
    } else {
      handleChange("recall", [...form.recall, item]);
    }
  };

  useEffect(() => {
    calculateScore();
  }, [form]);

  const calculateScore = () => {
    let score = 0;

    if (form.day) score++;
    if (form.year === new Date().getFullYear().toString()) score++;
    if (form.state) score++;
    if (form.moneyLeft === "77") score++;

    const animals = Number(form.animals);
    if (animals >= 15) score += 3;
    else if (animals >= 10) score += 2;
    else if (animals >= 5) score += 1;

    score += form.recall.length;

    if (form.reverse98 === "89") score++;
    if (form.reverse486 === "684") score++;
    if (form.reverse8537 === "7358") score++;

    if (form.clockHours === "correct") score += 2;
    if (form.clockMinutes === "correct") score += 2;

    if (form.shapeX === "correct") score++;
    if (form.largestShape === "correct") score++;

    if (form.storyName.toLowerCase() === "kate") score++;
    if (form.storyWork.toLowerCase().includes("stockbroker")) score++;
    if (form.storyReturn.toLowerCase().includes("teenagers")) score++;
    if (form.storyState.toLowerCase().includes("sydney")) score++;

    setTotalScore(score);
  };

  const inputStyle = {
    padding: "8px 10px",
    border: "1px solid #cbd5e1",
    borderRadius: 6,
    width: 250,
  };

  const questionTitle = {
    fontWeight: 600,
    fontSize: 16,
    marginBottom: 8,
  };

  const dividerStyle = {
  border: "none",
  borderTop: "1px solid #5e8ac4",
  margin: "20px 0",
};

  return (
    <div
      style={{
        fontSize: 14,
        // lineHeight: 1.6,
    border: "1px solid #e5e7eb",
    borderRadius: "10px",
    padding: "16px",
    width: "100%",
    background: " #fff"      }}
    >
      <h2 style={{ marginBottom: 20 }}> SLUMS Assessment</h2>
     <hr style={dividerStyle} />
      {/* 1 */}
      <div>
        <div style={questionTitle}>1. What day of the week is it?</div>
        <input style={inputStyle} onChange={(e) => handleChange("day", e.target.value)} />
      </div>
<hr style={dividerStyle} />
      {/* 2 */}
      <div>
        <div style={questionTitle}>2. What is the year?</div>
        <input style={inputStyle} onChange={(e) => handleChange("year", e.target.value)} />
      </div>
<hr style={dividerStyle} />
      {/* 3 */}
      <div>
        <div style={questionTitle}>3. What State (or Territory) are we in?</div>
        <input style={inputStyle} onChange={(e) => handleChange("state", e.target.value)} />
      </div>
<hr style={dividerStyle} />
      {/* 4 */}
      <div style={{ marginTop: 20 }}>
        <div style={questionTitle}>
          4. Please remember these five objects:
        </div>
        <div style={{ display: "flex", gap: 20 }}>
          {memoryItems.map((item) => (
            <div key={item}>{item}</div>
          ))}
        </div>
      </div>
<hr style={dividerStyle} />
      {/* 5 */}
      <div style={{ marginTop: 20 }}>
        <div style={questionTitle}>
          5. You have $100 and buy apples for $3 and a T-shirt for $20.
        </div>
        <input
          style={inputStyle}
          placeholder="Money left?"
          onChange={(e) => handleChange("moneyLeft", e.target.value)}
        />
      </div>
<hr style={dividerStyle} />
      {/* 6 */}
      <div style={{ marginTop: 20 }}>
        <div style={questionTitle}>
          6. Please name as many animals as you can in one minute.
        </div>
        <input
          style={inputStyle}
          type="number"
          onChange={(e) => handleChange("animals", e.target.value)}
        />
      </div>
<hr style={dividerStyle} />
      {/* 7 */}
      <div style={{ marginTop: 20 }}>
        <div style={questionTitle}>
          7. What were the 5 objects I asked you to remember?
        </div>
        <div style={{ display: "flex", gap: 15 }}>
          {memoryItems.map((item) => (
            <label key={item}>
              <input type="checkbox" onChange={() => toggleRecall(item)} /> {item}
            </label>
          ))}
        </div>
      </div>
<hr style={dividerStyle} />
      {/* 8 */}
      <div style={{ marginTop: 20 }}>
        <div style={questionTitle}>8. Reverse these numbers:</div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          98 <input style={{ width: 100 }} onChange={(e) => handleChange("reverse98", e.target.value)} />
          486 <input style={{ width: 100 }} onChange={(e) => handleChange("reverse486", e.target.value)} />
          8537 <input style={{ width: 100 }} onChange={(e) => handleChange("reverse8537", e.target.value)} />
        </div>
      </div>
<hr style={dividerStyle} />
      {/* 9 CLOCK */}
      {/* Divider */}
<hr style={{ border: "none", borderTop: "1px solid #e2e8f0", margin: "30px 0" }} />

<div style={{ marginTop: 20 }}>
  <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 20 }}>
    9. Draw a clock showing 10 minutes past 11.
  </div>

  <div
    style={{
      display: "flex",
      gap: 60,
      alignItems: "flex-start",
    }}
  >
    {/* Clock Circle */}
    <div
      style={{
        width: 180,
        height: 180,
        border: "2px solid black",
        borderRadius: "50%",
      }}
    ></div>

    {/* Scoring Section */}
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 20,
        marginTop: 10,
      }}
    >
      {/* Hours */}
      <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
        <span style={{ width: 160, fontWeight: 500 }}>
          Hours marked?
        </span>

        <label style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <input
            type="radio"
            name="clockHours"
            value="correct"
            onChange={(e) =>
              handleChange("clockHours", e.target.value)
            }
          />
          Correct
        </label>

        <label style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <input
            type="radio"
            name="clockHours"
            value="incorrect"
            onChange={(e) =>
              handleChange("clockHours", e.target.value)
            }
          />
          Incorrect
        </label>
      </div>

      {/* Minutes */}
      <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
        <span style={{ width: 160, fontWeight: 500 }}>
          Time  correct?
        </span>

        <label style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <input
            type="radio"
            name="clockMinutes"
            value="correct"
            onChange={(e) =>
              handleChange("clockMinutes", e.target.value)
            }
          />
          Correct
        </label>

        <label style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <input
            type="radio"
            name="clockMinutes"
            value="incorrect"
            onChange={(e) =>
              handleChange("clockMinutes", e.target.value)
            }
          />
          Incorrect
        </label>
      </div>

      {/* Markers */}
      {/* <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
        <span style={{ width: 160, fontWeight: 500 }}>
          Markers correct?
        </span>

        <label style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <input
            type="radio"
            name="clockMarkers"
            value="correct"
            onChange={(e) =>
              handleChange("clockMarkers", e.target.value)
            }
          />
          Correct
        </label>

        <label style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <input
            type="radio"
            name="clockMarkers"
            value="incorrect"
            onChange={(e) =>
              handleChange("clockMarkers", e.target.value)
            }
          />
          Incorrect
        </label>
      </div> */}
    </div>
  </div>
</div>

     {/* Divider Above */}
<hr style={dividerStyle} />

<div style={{ marginTop: 10 }}>
  <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 12 }}>
    10. Place an X in the triangle.
  </div>

  {/* Shapes Row */}
 {/* Shapes Row */}
<div style={{ display: "flex", gap: 60, marginBottom: 20 }}>

  {/* Square */}
  <div
    style={{
      width: 110,
      height: 110,
      border: "2px solid black",
    }}
  ></div>

  {/* OUTLINE Triangle (not filled) */}
  <div
    style={{
      width: 110,
      height: 110,
      position: "relative",
    }}
  >
    <div
      style={{
        width: 0,
        height: 0,
        borderLeft: "55px solid transparent",
        borderRight: "55px solid transparent",
        borderBottom: "110px solid black",
        position: "absolute",
        top: 0,
      }}
    ></div>

    {/* Inner white cut to make it hollow */}
    <div
      style={{
        width: 0,
        height: 0,
        borderLeft: "52px solid transparent",
        borderRight: "52px solid transparent",
        borderBottom: "104px solid white",
        position: "absolute",
        top: 3,
        left: 3,
      }}
    ></div>
  </div>

  {/* Rectangle (not square) */}
  <div
    style={{
      width: 90,
      height: 110,
      border: "2px solid black",
    }}
  ></div>

</div>

  {/* Radios Row */}
  {/* <div style={{ display: "flex", gap: 80 }}> */}
    {/* X placed correctly */}
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <span style={{ fontWeight: 500 }}>X placed correctly?</span>

      <label style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <input
          type="radio"
          name="shapeX"
          value="correct"
          onChange={(e) => handleChange("shapeX", e.target.value)}
        />
        Correct
      </label>

      <label style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <input
          type="radio"
          name="shapeX"
          value="incorrect"
          onChange={(e) => handleChange("shapeX", e.target.value)}
        />
        Incorrect
      </label>
    </div>

    {/* Largest figure correct */}
  {/* </div> */}
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <span style={{ fontWeight: 500 }}>
        Largest figure correct?
      </span>

      <label style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <input
          type="radio"
          name="largestShape"
          value="correct"
          onChange={(e) =>
            handleChange("largestShape", e.target.value)
          }
        />
        Correct
      </label>

      <label style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <input
          type="radio"
          name="largestShape"
          value="incorrect"
          onChange={(e) =>
            handleChange("largestShape", e.target.value)
          }
        />
        Incorrect
      </label>
    </div>
</div>
<hr style={dividerStyle} />
      {/* 11 STORY */}
      <div style={{ marginTop: 40 }}>
        <div style={questionTitle}>
          11. Story (Read aloud to patient)
        </div>

        <div style={{ background: "#f1f5f9", padding: 16, borderRadius: 8 }}>
          Kate was a very successful stockbroker. She made a lot of money on
          the stock market. She then met Fred, a devastatingly handsome man.
          She married him and had three children. They lived in Sydney.
          She then stopped work and stayed at home to bring up her children.
          When they were teenagers, she went back to work.
        </div>

        <div style={{ marginTop: 20 }}>

  {/* Row 1 */}
  <div style={rowStyle}>
    <div style={fieldStyle}>
      <label>1. Name:</label>
      <input
        style={inputStyle}
        onChange={(e) => handleChange("storyName", e.target.value)}
      />
    </div>

    <div style={fieldStyle}>
      <label>2. Work:</label>
      <input
        style={inputStyle}
        onChange={(e) => handleChange("storyWork", e.target.value)}
      />
    </div>
  </div>

  {/* Row 2 */}
  <div style={rowStyle}>
    <div style={fieldStyle}>
      <label>3.Returned:</label>
      <input
        style={inputStyle}
        onChange={(e) => handleChange("storyReturn", e.target.value)}
      />
    </div>

    <div style={fieldStyle}>
      <label>4. State:</label>
      <input
        style={inputStyle}
        onChange={(e) => handleChange("storyState", e.target.value)}
      />
    </div>
  </div>

</div>
      </div>

      <h3 style={{ marginTop: 40 }}>TOTAL SCORE: {totalScore}</h3>
    </div>
  );
}
const rowStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 20,
  marginBottom: 14
};

const fieldStyle = {
  display: "flex",
  alignItems: "center",
  gap: 10
};