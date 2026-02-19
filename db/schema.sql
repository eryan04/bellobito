
-- PostgreSQL schema for BelloBito compatibility tests
CREATE TABLE IF NOT EXISTS tests (
  id SERIAL PRIMARY KEY,
  name1 VARCHAR(150) NOT NULL,
  name2 VARCHAR(150) NOT NULL,
  score SMALLINT NOT NULL,
  method VARCHAR(100) DEFAULT NULL,
  extras JSONB DEFAULT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_tests_created_at ON tests(created_at);
CREATE INDEX IF NOT EXISTS idx_tests_names_lower ON tests(LOWER(name1), LOWER(name2));
