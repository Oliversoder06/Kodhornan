-- Create exercises table to store all lesson exercises in the database
-- This migration moves exercise definitions from code to database for admin management

CREATE TABLE exercises (
  id TEXT PRIMARY KEY,
  lesson INTEGER NOT NULL,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('lätt', 'medel', 'svår')),
  title TEXT,
  instructions TEXT NOT NULL,
  starter_code TEXT NOT NULL,
  expected_output TEXT NOT NULL,
  hint TEXT,
  hints TEXT[],
  unlock_key TEXT,
  tag TEXT,
  concept TEXT CHECK (concept IS NULL OR concept IN ('Variabler', 'Output', 'Villkor', 'Jämförelser', 'Loopar', 'Metoder')),
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create index for efficient querying by lesson
CREATE INDEX idx_exercises_lesson ON exercises(lesson);
CREATE INDEX idx_exercises_lesson_sort ON exercises(lesson, sort_order);

-- Enable RLS
ALTER TABLE exercises ENABLE ROW LEVEL SECURITY;

-- Policy: Everyone can read exercises (public curriculum)
CREATE POLICY "Exercises are publicly readable"
ON exercises
FOR SELECT
USING (true);

-- Policy: Only service role can modify (admin via server actions)
-- This is implicit - no insert/update/delete policies means only service role can modify

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_exercises_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at
CREATE TRIGGER exercises_updated_at
  BEFORE UPDATE ON exercises
  FOR EACH ROW
  EXECUTE FUNCTION update_exercises_updated_at();
