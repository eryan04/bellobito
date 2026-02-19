const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  host: process.env.PGHOST,
  port: process.env.PGPORT ? Number(process.env.PGPORT) : undefined,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE
});

async function query(text, params = []) {
  const res = await pool.query(text, params);
  if (res.command === 'INSERT') {
    return { insertId: res.rows[0] ? res.rows[0].id : null, rowCount: res.rowCount, rows: res.rows };
  }
  return res.rows;
}

module.exports = {
  pool,
  query
};
