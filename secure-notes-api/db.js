const { Pool } = require("pg");

let pool;

if (process.env.DATABASE_URL) {
  // Production (Render + Neon)
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
} else {
  // Local development
  pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "secure_notes",
    password: process.env.DB_PASSWORD,
    port: 5432,
  });
}

module.exports = pool;