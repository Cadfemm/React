const { Pool } = require("pg");

// Configure PostgreSQL connection
const pool = new Pool({
  user: "postgres",      // your DB username
  host: "localhost",     // host
  database: "ICD",    // your DB name
  password: "Anusha@99",  // your DB password
  port: 5432,            // default Postgres port
});

module.exports = pool;
