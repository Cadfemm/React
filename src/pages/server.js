const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

// -------------------------------
// GET Root Level ICD codes (Level = 1)
// -------------------------------
app.get("/icd/roots", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT code AS key, description AS label 
       FROM icd_codes 
       WHERE level = 1 
       ORDER BY code;`
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// -------------------------------
// GET Children of a parent code
// -------------------------------
app.get("/icd/children/:parentCode", async (req, res) => {
  const { parentCode } = req.params;
  try {
    const result = await pool.query(
      `SELECT code AS key, description AS label 
       FROM icd_codes 
       WHERE parent_code = $1 
       ORDER BY code;`,
      [parentCode]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// -------------------------------
// GET Full Path of a code (breadcrumb)
// -------------------------------
app.get("/icd/path/:code", async (req, res) => {
  const { code } = req.params;
  try {
    const result = await pool.query(
      `WITH RECURSIVE icd_path AS (
         SELECT code, description, parent_code, level
         FROM icd_codes
         WHERE code = $1
         UNION ALL
         SELECT i.code, i.description, i.parent_code, i.level
         FROM icd_codes i
         INNER JOIN icd_path p ON i.code = p.parent_code
       )
       SELECT code AS key, description AS label, level 
       FROM icd_path
       ORDER BY level;`,
      [code]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error" });
  }
});

// -------------------------------
// Start Server
// -------------------------------
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`✅ ICD API running on http://localhost:${PORT}`);
});
