-- Schema refactoring migration
-- 1. Drop unused error_codes column from exercise_analytics
-- 2. Drop error and state columns from saved_code (now stored in output JSON)
-- 3. Convert output column to JSONB

-- Drop unused error_codes from exercise_analytics
ALTER TABLE exercise_analytics DROP COLUMN IF EXISTS error_codes;

-- Drop error and state from saved_code (will be stored in output JSON)
ALTER TABLE saved_code DROP COLUMN IF EXISTS error;
ALTER TABLE saved_code DROP COLUMN IF EXISTS state;

-- Convert output from TEXT to JSONB
-- Step 1: Drop the default value first
ALTER TABLE saved_code ALTER COLUMN output DROP DEFAULT;

-- Step 2: Convert the column type
ALTER TABLE saved_code ALTER COLUMN output TYPE jsonb USING 
  CASE 
    WHEN output = '' OR output IS NULL THEN NULL
    ELSE jsonb_build_object(
      'state', '',
      'output', output,
      'technical_error', NULL,
      'clarified_error', NULL
    )
  END;

-- Step 3: Set new default to NULL for the JSONB column
ALTER TABLE saved_code ALTER COLUMN output SET DEFAULT NULL;
