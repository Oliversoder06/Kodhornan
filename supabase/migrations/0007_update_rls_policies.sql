-- Update RLS policies to allow public read access
-- Users can see everyone's progress/code (useful for admin/teacher/collaboration)
-- Write access remains restricted to the owner

-- 1. exercise_progress
drop policy if exists "Users can read their own progress" on exercise_progress;
create policy "Everyone can read exercise_progress"
on exercise_progress for select
using (true);

-- 2. saved_code
drop policy if exists "Users can read their own saved code" on saved_code;
create policy "Everyone can read saved_code"
on saved_code for select
using (true);

-- 3. exercise_analytics
drop policy if exists "Users can read their own analytics" on exercise_analytics;
create policy "Everyone can read exercise_analytics"
on exercise_analytics for select
using (true);
