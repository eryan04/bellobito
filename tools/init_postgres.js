const fs = require('fs');
const path = require('path');
const { Client } = require('pg');

const sqlFile = path.join(__dirname, '..', 'db', 'init_postgres.sql');

if (!fs.existsSync(sqlFile)) {
  console.error('Postgres SQL file not found:', sqlFile);
  process.exit(1);
}

const sql = fs.readFileSync(sqlFile, 'utf8');

const client = new Client({
  connectionString: process.env.DATABASE_URL || process.env.PGHOST && `postgresql://${process.env.PGUSER || 'postgres'}:${process.env.PGPASSWORD || ''}@${process.env.PGHOST}:${process.env.PGPORT || 5432}/${process.env.PGDATABASE || 'postgres'}`
});

async function run() {
  try {
    await client.connect();
    await client.query(sql);
    console.log('OK: Postgres schema initialized');
  } catch (err) {
    console.error('Failed to initialize Postgres DB:', err.message || err);
    process.exitCode = 1;
  } finally {
    await client.end();
  }
}

run();
